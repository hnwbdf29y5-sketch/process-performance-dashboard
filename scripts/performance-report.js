import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const reportsDir = path.resolve(process.env.REPORTS_DIR ?? 'reports/lighthouse')
const outDir = path.resolve('reports')
const summaryName = process.env.SUMMARY_NAME ?? 'performance-summary'
const summaryPath = path.join(outDir, `${summaryName}.md`)
const jsonPath = path.join(outDir, `${summaryName}.json`)

const metricMap = {
  fcp: 'first-contentful-paint',
  lcp: 'largest-contentful-paint',
  tbt: 'total-blocking-time',
  cls: 'cumulative-layout-shift',
  si: 'speed-index',
}

function median(values) {
  const sorted = values.filter((value) => Number.isFinite(value)).sort((a, b) => a - b)
  if (sorted.length === 0) return 0
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}

function formatNumber(value, digits = 2) {
  return Number(value.toFixed(digits))
}

async function readReports() {
  const files = await readdir(reportsDir)
  const jsonFiles = files.filter((file) => file.endsWith('-report.json'))
  const reports = []

  for (const file of jsonFiles) {
    const raw = await readFile(path.join(reportsDir, file), 'utf8')
    const data = JSON.parse(raw)
    const reportUrl = data.finalDisplayedUrl || data.finalUrl || data.requestedUrl
    if (!reportUrl || !data.categories?.performance || !data.audits) continue
    const pathname = new URL(reportUrl).pathname
    reports.push({
      route: pathname,
      score: Math.round((data.categories.performance.score ?? 0) * 100),
      transferKb: Math.round((data.audits['total-byte-weight']?.numericValue ?? 0) / 1024),
      requests: data.audits['network-requests']?.details?.items?.length ?? 0,
      fcp: data.audits[metricMap.fcp]?.numericValue ?? 0,
      lcp: data.audits[metricMap.lcp]?.numericValue ?? 0,
      tbt: data.audits[metricMap.tbt]?.numericValue ?? 0,
      cls: data.audits[metricMap.cls]?.numericValue ?? 0,
      si: data.audits[metricMap.si]?.numericValue ?? 0,
    })
  }

  return reports
}

function summarize(reports) {
  const byRoute = new Map()
  for (const report of reports) {
    const group = byRoute.get(report.route) ?? []
    group.push(report)
    byRoute.set(report.route, group)
  }

  return [...byRoute.entries()].map(([route, group]) => ({
    route,
    runs: group.length,
    score: Math.round(median(group.map((item) => item.score))),
    fcp: formatNumber(median(group.map((item) => item.fcp)) / 1000),
    lcp: formatNumber(median(group.map((item) => item.lcp)) / 1000),
    tbt: Math.round(median(group.map((item) => item.tbt))),
    cls: formatNumber(median(group.map((item) => item.cls)), 3),
    si: formatNumber(median(group.map((item) => item.si)) / 1000),
    transferKb: Math.round(median(group.map((item) => item.transferKb))),
    requests: Math.round(median(group.map((item) => item.requests))),
  }))
}

function toMarkdown(rows) {
  const header = [
    '# Performance Summary',
    '',
    'Median values are calculated from Lighthouse CI JSON reports.',
    '',
    '| Route | Runs | Score | FCP, s | LCP, s | TBT, ms | CLS | Speed Index, s | Transfer, KB | Requests |',
    '| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
  ]
  const body = rows.map((row) => (
    `| ${row.route} | ${row.runs} | ${row.score} | ${row.fcp} | ${row.lcp} | ${row.tbt} | ${row.cls} | ${row.si} | ${row.transferKb} | ${row.requests} |`
  ))
  return [...header, ...body, ''].join('\n')
}

const reports = await readReports()
const summary = summarize(reports)
await mkdir(outDir, { recursive: true })
await writeFile(jsonPath, `${JSON.stringify(summary, null, 2)}\n`)
await writeFile(summaryPath, toMarkdown(summary))
console.log(`Wrote ${summaryPath}`)
