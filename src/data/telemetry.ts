import type { ProcessEvent, ProcessMetric, TrendPoint } from './processData'

export type TelemetryProfile = 'dashboard' | 'events' | 'reports' | 'settings' | 'details'

export type TelemetryPoint = {
  second: number
  pressure: number
  temperature: number
  vibration: number
  load: number
  flow: number
}

export type TelemetryReportRow = {
  route: string
  lcp: number
  tbt: number
  cls: number
  score: number
  js: number
}

export type TelemetrySummary = {
  sampleCount: number
  windowSize: number
  scanStep: number
  alerts: number
  criticalAlerts: number
  checksum: number
  processingMs: number
}

export type TelemetryAnalysisResult = {
  metrics: ProcessMetric[]
  trend: TrendPoint[]
  events: ProcessEvent[]
  reports: TelemetryReportRow[]
  summary: TelemetrySummary
}

type ProfileConfig = {
  windowSize: number
  scanStep: number
  channels: Array<keyof Pick<TelemetryPoint, 'pressure' | 'temperature' | 'vibration' | 'load' | 'flow'>>
}

export const profileConfig: Record<TelemetryProfile, ProfileConfig> = {
  dashboard: {
    windowSize: 1080,
    scanStep: 8,
    channels: ['pressure', 'temperature', 'vibration', 'load'],
  },
  events: {
    windowSize: 1200,
    scanStep: 8,
    channels: ['pressure', 'temperature', 'vibration', 'load'],
  },
  reports: {
    windowSize: 1320,
    scanStep: 10,
    channels: ['pressure', 'temperature', 'vibration', 'load', 'flow'],
  },
  settings: {
    windowSize: 420,
    scanStep: 18,
    channels: ['pressure', 'load'],
  },
  details: {
    windowSize: 1320,
    scanStep: 8,
    channels: ['pressure', 'temperature', 'vibration', 'flow'],
  },
}

let cachedTelemetry: TelemetryPoint[] | undefined

function round(value: number, digits = 2) {
  const scale = 10 ** digits
  return Math.round(value * scale) / scale
}

export function getShiftTelemetry() {
  if (cachedTelemetry) return cachedTelemetry

  const points: TelemetryPoint[] = []
  const secondsInShift = 10 * 60 * 60

  for (let second = 0; second < secondsInShift; second += 1) {
    const hour = second / 3600
    const waveA = Math.sin(second / 540)
    const waveB = Math.cos(second / 1150)
    const shortPulse = Math.sin(second / 73)
    const batchStep = Math.floor(second / 2700) % 4
    const loadWave = Math.sin(second / 2100)
    const disturbance = second > 16300 && second < 17800 ? 1 : 0
    const pressureDrop = second > 22300 && second < 23000 ? -0.42 : 0

    points.push({
      second,
      pressure: round(7.55 + waveA * 0.34 + waveB * 0.12 + batchStep * 0.08 + pressureDrop),
      temperature: round(158 + hour * 0.78 + waveB * 4.8 + disturbance * 5.5 + shortPulse * 0.9),
      vibration: round(2.75 + Math.abs(shortPulse) * 0.85 + disturbance * 0.55 + batchStep * 0.06),
      load: round(74 + loadWave * 5.2 + batchStep * 2.1 + disturbance * 3.4),
      flow: round(118 + waveA * 9.5 - batchStep * 2.4 + pressureDrop * 11),
    })
  }

  cachedTelemetry = points
  return points
}

export const fallbackTelemetryResult: TelemetryAnalysisResult = {
  metrics: [
    { label: 'Давление линии', value: 7.8, unit: 'МПа', limit: '6.8-8.4 МПа', status: 'normal', delta: '+0.3' },
    { label: 'Температура реактора', value: 164, unit: '°C', limit: '150-170 °C', status: 'warning', delta: '+4.1' },
    { label: 'Вибрация насоса', value: 3.2, unit: 'мм/с', limit: '< 4.5 мм/с', status: 'normal', delta: '-0.4' },
    { label: 'Энергетическая нагрузка', value: 82, unit: '%', limit: '< 88%', status: 'normal', delta: '+1.8' },
  ],
  trend: [
    { label: '08:00', pressure: 62, temperature: 58, vibration: 33 },
    { label: '09:00', pressure: 66, temperature: 61, vibration: 31 },
    { label: '10:00', pressure: 70, temperature: 68, vibration: 35 },
    { label: '11:00', pressure: 68, temperature: 74, vibration: 38 },
    { label: '12:00', pressure: 73, temperature: 79, vibration: 42 },
    { label: '13:00', pressure: 78, temperature: 82, vibration: 39 },
    { label: '14:00', pressure: 75, temperature: 76, vibration: 34 },
  ],
  events: [
    { time: '14:12', source: 'Реактор R-12', type: 'warning', message: 'Температура достигла предупредительной границы' },
    { time: '13:47', source: 'Насос P-04', type: 'normal', message: 'Вибрация вернулась в допустимый диапазон' },
    { time: '13:10', source: 'Линия A', type: 'normal', message: 'Коррекция давления завершена' },
    { time: '12:33', source: 'Фильтр F-02', type: 'critical', message: 'Зафиксировано кратковременное падение давления' },
  ],
  reports: [
    { route: '/dashboard', lcp: 1.4, tbt: 72, cls: 0.01, score: 98, js: 182 },
    { route: '/events', lcp: 1.2, tbt: 41, cls: 0, score: 99, js: 158 },
    { route: '/reports', lcp: 1.3, tbt: 48, cls: 0.01, score: 99, js: 166 },
    { route: '/settings', lcp: 1.1, tbt: 36, cls: 0, score: 100, js: 151 },
    { route: '/details/line-a', lcp: 1.5, tbt: 80, cls: 0.01, score: 97, js: 185 },
  ],
  summary: {
    sampleCount: 36000,
    windowSize: 960,
    scanStep: 12,
    alerts: 18,
    criticalAlerts: 2,
    checksum: 0,
    processingMs: 0,
  },
}
