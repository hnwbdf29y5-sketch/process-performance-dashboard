import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const args = Object.fromEntries(process.argv.slice(2).map((arg) => {
  const [key, value] = arg.replace(/^--/, '').split('=')
  return [key, value]
}))

const reportsDir = path.resolve(args.reports ?? process.env.REPORTS_DIR ?? 'reports/lighthouse')
const reportName = args.name ?? process.env.STATS_NAME ?? 'optimized'
const outDir = path.resolve('reports')

function median(values) {
  const sorted = values.filter((value) => Number.isFinite(value)).sort((a, b) => a - b)
  if (sorted.length === 0) return 0
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}

function stats(values) {
  const clean = values.filter((value) => Number.isFinite(value))
  if (clean.length === 0) return { min: 0, median: 0, max: 0 }
  return {
    min: Math.min(...clean),
    median: median(clean),
    max: Math.max(...clean),
  }
}

function format(value, digits = 2) {
  return Number(value.toFixed(digits))
}

function csvEscape(value) {
  const text = String(value)
  return text.includes(',') || text.includes('"') ? `"${text.replaceAll('"', '""')}"` : text
}

async function readReports() {
  const files = (await readdir(reportsDir)).filter((file) => file.endsWith('-report.json')).sort()
  const reports = []

  for (const file of files) {
    const data = JSON.parse(await readFile(path.join(reportsDir, file), 'utf8'))
    const reportUrl = data.finalDisplayedUrl || data.finalUrl || data.requestedUrl
    if (!reportUrl || !data.categories?.performance || !data.audits) continue

    const resourceItems = data.audits['resource-summary']?.details?.items ?? []
    const resources = Object.fromEntries(resourceItems.map((item) => [
      item.resourceType,
      Math.round((item.transferSize ?? 0) / 1024),
    ]))

    reports.push({
      file,
      route: new URL(reportUrl).pathname,
      score: Math.round((data.categories.performance.score ?? 0) * 100),
      fcpMs: data.audits['first-contentful-paint']?.numericValue ?? 0,
      lcpMs: data.audits['largest-contentful-paint']?.numericValue ?? 0,
      tbtMs: data.audits['total-blocking-time']?.numericValue ?? 0,
      cls: data.audits['cumulative-layout-shift']?.numericValue ?? 0,
      speedIndexMs: data.audits['speed-index']?.numericValue ?? 0,
      scriptKb: resources.script ?? 0,
      imageKb: resources.image ?? 0,
      transferKb: Math.round((data.audits['total-byte-weight']?.numericValue ?? 0) / 1024),
      requests: data.audits['network-requests']?.details?.items?.length ?? 0,
    })
  }

  return reports
}

function groupByRoute(reports) {
  const byRoute = new Map()
  for (const report of reports) {
    const group = byRoute.get(report.route) ?? []
    group.push(report)
    byRoute.set(report.route, group)
  }
  return [...byRoute.entries()].sort(([a], [b]) => a.localeCompare(b))
}

function buildStats(reports) {
  return groupByRoute(reports).map(([route, group]) => ({
    route,
    runs: group.length,
    score: stats(group.map((report) => report.score)),
    fcpSec: stats(group.map((report) => report.fcpMs / 1000)),
    lcpSec: stats(group.map((report) => report.lcpMs / 1000)),
    tbtMs: stats(group.map((report) => report.tbtMs)),
    cls: stats(group.map((report) => report.cls)),
    speedIndexSec: stats(group.map((report) => report.speedIndexMs / 1000)),
    scriptKb: stats(group.map((report) => report.scriptKb)),
    imageKb: stats(group.map((report) => report.imageKb)),
    transferKb: stats(group.map((report) => report.transferKb)),
    requests: stats(group.map((report) => report.requests)),
  }))
}

function toRunsCsv(reports) {
  const header = [
    'route',
    'run',
    'score',
    'fcp_ms',
    'lcp_ms',
    'tbt_ms',
    'cls',
    'speed_index_ms',
    'script_kb',
    'image_kb',
    'transfer_kb',
    'requests',
    'file',
  ]
  const counters = new Map()
  const lines = [header.join(',')]

  for (const report of reports) {
    const nextRun = (counters.get(report.route) ?? 0) + 1
    counters.set(report.route, nextRun)
    lines.push([
      report.route,
      nextRun,
      report.score,
      Math.round(report.fcpMs),
      Math.round(report.lcpMs),
      Math.round(report.tbtMs),
      format(report.cls, 3),
      Math.round(report.speedIndexMs),
      report.scriptKb,
      report.imageKb,
      report.transferKb,
      report.requests,
      report.file,
    ].map(csvEscape).join(','))
  }

  return `${lines.join('\n')}\n`
}

function range(metric, digits = 0) {
  return `${format(metric.min, digits)} / ${format(metric.median, digits)} / ${format(metric.max, digits)}`
}

function toMarkdown(rows) {
  return [
    `# Статистика прогонов Lighthouse CI: ${reportName}`,
    '',
    'Формат min / median / max рассчитан по всем JSON-отчетам Lighthouse CI для каждого маршрута.',
    '',
    '| Маршрут | Прогонов | Оценка | LCP, с | TBT, мс | FCP, с | JS, КБ | Передача, КБ | Запросов | CLS |',
    '| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
    ...rows.map((row) => (
      `| ${row.route} | ${row.runs} | ${range(row.score)} | ${range(row.lcpSec, 2)} | ${range(row.tbtMs)} | ${range(row.fcpSec, 2)} | ${range(row.scriptKb)} | ${range(row.transferKb)} | ${range(row.requests)} | ${range(row.cls, 3)} |`
    )),
    '',
  ].join('\n')
}

const reports = await readReports()
const rows = buildStats(reports)

await mkdir(outDir, { recursive: true })
await writeFile(path.join(outDir, `${reportName}-runs.csv`), toRunsCsv(reports))
await writeFile(path.join(outDir, `${reportName}-stats.json`), `${JSON.stringify(rows, null, 2)}\n`)
await writeFile(path.join(outDir, `${reportName}-stats.md`), toMarkdown(rows))

console.log(`Записаны reports/${reportName}-runs.csv и reports/${reportName}-stats.md`)
