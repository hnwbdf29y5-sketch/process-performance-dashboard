import {
  fallbackTelemetryResult,
  getShiftTelemetry,
  profileConfig,
  type TelemetryAnalysisResult,
  type TelemetryPoint,
  type TelemetryProfile,
  type TelemetryReportRow,
} from '../data/telemetry'
import type { ProcessEvent, ProcessMetric, Status, TrendPoint } from '../data/processData'

type ChannelKey = keyof Pick<TelemetryPoint, 'pressure' | 'temperature' | 'vibration' | 'load' | 'flow'>

function round(value: number, digits = 2) {
  const scale = 10 ** digits
  return Math.round(value * scale) / scale
}

function toStatus(value: number, warning: number, critical: number): Status {
  if (value >= critical) return 'critical'
  if (value >= warning) return 'warning'
  return 'normal'
}

function formatTime(second: number) {
  const hour = 6 + Math.floor(second / 3600)
  const minute = Math.floor((second % 3600) / 60)
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

function latestMetrics(points: TelemetryPoint[]): ProcessMetric[] {
  const latest = points.at(-1)
  const previous = points.at(-601) ?? latest
  if (!latest || !previous) return fallbackTelemetryResult.metrics

  return [
    {
      label: 'Давление линии',
      value: round(latest.pressure, 1),
      unit: 'МПа',
      limit: '6.8-8.4 МПа',
      status: latest.pressure < 6.8 || latest.pressure > 8.4 ? 'warning' : 'normal',
      delta: `${latest.pressure - previous.pressure >= 0 ? '+' : ''}${round(latest.pressure - previous.pressure, 1)}`,
    },
    {
      label: 'Температура реактора',
      value: Math.round(latest.temperature),
      unit: '°C',
      limit: '150-170 °C',
      status: toStatus(latest.temperature, 166, 171),
      delta: `${latest.temperature - previous.temperature >= 0 ? '+' : ''}${round(latest.temperature - previous.temperature, 1)}`,
    },
    {
      label: 'Вибрация насоса',
      value: round(latest.vibration, 1),
      unit: 'мм/с',
      limit: '< 4.5 мм/с',
      status: toStatus(latest.vibration, 4.1, 4.5),
      delta: `${latest.vibration - previous.vibration >= 0 ? '+' : ''}${round(latest.vibration - previous.vibration, 1)}`,
    },
    {
      label: 'Энергетическая нагрузка',
      value: Math.round(latest.load),
      unit: '%',
      limit: '< 88%',
      status: toStatus(latest.load, 84, 88),
      delta: `${latest.load - previous.load >= 0 ? '+' : ''}${round(latest.load - previous.load, 1)}`,
    },
  ]
}

function buildTrend(points: TelemetryPoint[]): TrendPoint[] {
  const buckets: TrendPoint[] = []
  const firstHour = 6

  for (let bucket = 0; bucket < 8; bucket += 1) {
    const start = bucket * 4500
    const end = Math.min(start + 4500, points.length)
    const slice = points.slice(start, end)
    const pressure = slice.reduce((sum, point) => sum + point.pressure, 0) / slice.length
    const temperature = slice.reduce((sum, point) => sum + point.temperature, 0) / slice.length
    const vibration = slice.reduce((sum, point) => sum + point.vibration, 0) / slice.length

    buckets.push({
      label: `${String(firstHour + bucket).padStart(2, '0')}:00`,
      pressure: round(((pressure - 6.7) / 2) * 100),
      temperature: round(((temperature - 150) / 24) * 100),
      vibration: round((vibration / 5.2) * 100),
    })
  }

  return buckets
}

function buildEvents(points: TelemetryPoint[]): ProcessEvent[] {
  const events: ProcessEvent[] = []

  for (let index = 0; index < points.length; index += 420) {
    const point = points[index]
    if (!point) continue

    if (point.temperature > 168) {
      events.push({
        time: formatTime(point.second),
        source: 'Реактор R-12',
        type: point.temperature > 171 ? 'critical' : 'warning',
        message: `Температура ${round(point.temperature, 1)} °C требует проверки режима охлаждения`,
      })
    }

    if (point.vibration > 4.15) {
      events.push({
        time: formatTime(point.second),
        source: 'Насос P-04',
        type: point.vibration > 4.5 ? 'critical' : 'warning',
        message: `Вибрация ${round(point.vibration, 1)} мм/с приблизилась к ограничению`,
      })
    }

    if (point.pressure < 7.05) {
      events.push({
        time: formatTime(point.second),
        source: 'Линия A',
        type: 'warning',
        message: `Давление снизилось до ${round(point.pressure, 1)} МПа`,
      })
    }
  }

  const normalEvents: ProcessEvent[] = [
    { time: '14:36', source: 'Энергоузел E-1', type: 'normal', message: 'Цикл балансировки нагрузки завершен' },
    { time: '13:47', source: 'Насос P-04', type: 'normal', message: 'Вибрация вернулась в допустимый диапазон' },
    { time: '13:10', source: 'Линия A', type: 'normal', message: 'Коррекция давления завершена' },
  ]

  return [...events.slice(-9).reverse(), ...normalEvents].slice(0, 10)
}

function channelValue(point: TelemetryPoint, channel: ChannelKey) {
  return point[channel]
}

function runWindowAnalysis(points: TelemetryPoint[], profile: TelemetryProfile) {
  const config = profileConfig[profile]
  let checksum = 0
  let alerts = 0
  let criticalAlerts = 0

  for (const channel of config.channels) {
    for (let index = config.windowSize; index < points.length; index += config.scanStep) {
      let sum = 0
      let sumSquares = 0
      let min = Number.POSITIVE_INFINITY
      let max = Number.NEGATIVE_INFINITY
      const start = index - config.windowSize

      for (let cursor = start; cursor < index; cursor += 1) {
        const value = channelValue(points[cursor], channel)
        sum += value
        sumSquares += value * value
        if (value < min) min = value
        if (value > max) max = value
      }

      const mean = sum / config.windowSize
      const variance = sumSquares / config.windowSize - mean * mean
      const deviation = Math.sqrt(Math.max(variance, 0))
      const spread = max - min
      checksum += Math.sqrt(Math.abs(mean * deviation) + spread + 1) * Math.sin((index + checksum) / 97)

      if (channel === 'temperature' && mean + deviation > 168) alerts += 1
      if (channel === 'temperature' && max > 172) criticalAlerts += 1
      if (channel === 'vibration' && mean + deviation > 4.2) alerts += 1
      if (channel === 'pressure' && min < 6.9) alerts += 1
    }
  }

  return {
    alerts,
    criticalAlerts,
    checksum: round(Math.abs(checksum), 3),
    scanStep: config.scanStep,
    windowSize: config.windowSize,
  }
}

function buildReports(summary: ReturnType<typeof runWindowAnalysis>): TelemetryReportRow[] {
  return [
    { route: '/dashboard', lcp: 1.35, tbt: 78, cls: 0.01, score: 98, js: 182 },
    { route: '/events', lcp: 1.24, tbt: 52, cls: 0, score: 99, js: 164 },
    { route: '/reports', lcp: 1.42, tbt: 88, cls: 0.01, score: 97, js: 190 },
    { route: '/settings', lcp: 1.08, tbt: 34, cls: 0, score: 100, js: 148 },
    { route: '/details/line-a', lcp: 1.48, tbt: 94, cls: 0.01, score: 97, js: 188 },
  ].map((row, index) => ({
    ...row,
    tbt: row.tbt + Math.round((summary.alerts % (index + 3)) * 2),
    js: row.js + Math.round(summary.windowSize / 240) + index,
  }))
}

export function analyzeTelemetry(profile: TelemetryProfile): TelemetryAnalysisResult {
  const startedAt = performance.now()
  const points = getShiftTelemetry()
  const summary = runWindowAnalysis(points, profile)
  const processingMs = round(performance.now() - startedAt, 1)

  return {
    metrics: latestMetrics(points),
    trend: buildTrend(points),
    events: buildEvents(points),
    reports: buildReports(summary),
    summary: {
      sampleCount: points.length,
      windowSize: summary.windowSize,
      scanStep: summary.scanStep,
      alerts: summary.alerts,
      criticalAlerts: summary.criticalAlerts,
      checksum: summary.checksum,
      processingMs,
    },
  }
}
