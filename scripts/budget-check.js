import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const reportsDir = path.resolve(process.env.REPORTS_DIR ?? 'reports/lighthouse')
const outDir = path.resolve('reports')
const summaryName = process.env.SUMMARY_NAME ?? 'performance-budget-check'
const outPath = path.join(outDir, `${summaryName}.md`)
const budgets = JSON.parse(await readFile(path.resolve('budgets.json'), 'utf8'))[0]

function median(values) {
  const sorted = values.filter((value) => Number.isFinite(value)).sort((a, b) => a - b)
  if (sorted.length === 0) return 0
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}

function status(value, limit, mode) {
  return mode === 'min' ? value >= limit : value <= limit
}

function formatStatus(value, limit, mode) {
  return status(value, limit, mode) ? 'выполнен' : 'превышен'
}

async function readReports() {
  const files = (await readdir(reportsDir)).filter((file) => file.endsWith('-report.json'))
  const reports = []

  for (const file of files) {
    const data = JSON.parse(await readFile(path.join(reportsDir, file), 'utf8'))
    const reportUrl = data.finalDisplayedUrl || data.finalUrl || data.requestedUrl
    if (!reportUrl || !data.audits) continue

    const resourceItems = data.audits['resource-summary']?.details?.items ?? []
    const resources = Object.fromEntries(resourceItems.map((item) => [
      item.resourceType,
      {
        count: item.requestCount ?? 0,
        sizeKb: Math.round((item.transferSize ?? 0) / 1024),
      },
    ]))

    reports.push({
      route: new URL(reportUrl).pathname,
      score: Math.round((data.categories.performance.score ?? 0) * 100),
      lcp: data.audits['largest-contentful-paint']?.numericValue ?? 0,
      tbt: data.audits['total-blocking-time']?.numericValue ?? 0,
      cls: data.audits['cumulative-layout-shift']?.numericValue ?? 0,
      resources,
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

  return [...byRoute.entries()].map(([route, group]) => {
    const resourceValue = (resourceType, field) => median(group.map((report) => report.resources[resourceType]?.[field] ?? 0))
    return {
      route,
      score: median(group.map((report) => report.score)),
      lcp: median(group.map((report) => report.lcp)),
      tbt: median(group.map((report) => report.tbt)),
      cls: median(group.map((report) => report.cls)),
      scriptSize: resourceValue('script', 'sizeKb'),
      stylesheetSize: resourceValue('stylesheet', 'sizeKb'),
      imageSize: resourceValue('image', 'sizeKb'),
      totalSize: resourceValue('total', 'sizeKb'),
      scriptCount: resourceValue('script', 'count'),
      totalCount: resourceValue('total', 'count'),
    }
  })
}

function makeRows(summary) {
  const sizeBudgets = Object.fromEntries(budgets.resourceSizes.map((item) => [item.resourceType, item.budget]))
  const countBudgets = Object.fromEntries(budgets.resourceCounts.map((item) => [item.resourceType, item.budget]))
  const timingBudgets = Object.fromEntries(budgets.timings.map((item) => [item.metric, item.budget]))

  return summary.flatMap((row) => [
    [row.route, 'LCP', `${Math.round(row.lcp)} мс`, `<= ${timingBudgets['largest-contentful-paint']} мс`, formatStatus(row.lcp, timingBudgets['largest-contentful-paint'], 'max')],
    [row.route, 'TBT', `${Math.round(row.tbt)} мс`, `<= ${timingBudgets['total-blocking-time']} мс`, formatStatus(row.tbt, timingBudgets['total-blocking-time'], 'max')],
    [row.route, 'CLS', row.cls.toFixed(3), `<= ${timingBudgets['cumulative-layout-shift']}`, formatStatus(row.cls, timingBudgets['cumulative-layout-shift'], 'max')],
    [row.route, 'Script transfer', `${row.scriptSize} КБ`, `<= ${sizeBudgets.script} КБ`, formatStatus(row.scriptSize, sizeBudgets.script, 'max')],
    [row.route, 'Image transfer', `${row.imageSize} КБ`, `<= ${sizeBudgets.image} КБ`, formatStatus(row.imageSize, sizeBudgets.image, 'max')],
    [row.route, 'Total transfer', `${row.totalSize} КБ`, `<= ${sizeBudgets.total} КБ`, formatStatus(row.totalSize, sizeBudgets.total, 'max')],
    [row.route, 'Total requests', `${row.totalCount}`, `<= ${countBudgets.total}`, formatStatus(row.totalCount, countBudgets.total, 'max')],
  ])
}

function toMarkdown(rows) {
  return [
    '# Проверка performance budget',
    '',
    'Пороговые значения взяты из `budgets.json`. Значения рассчитаны как медиана по Lighthouse CI JSON-отчетам.',
    '',
    '| Маршрут | Показатель | Значение | Порог | Статус |',
    '| --- | --- | ---: | ---: | --- |',
    ...rows.map((row) => `| ${row[0]} | ${row[1]} | ${row[2]} | ${row[3]} | ${row[4]} |`),
    '',
  ].join('\n')
}

const reports = await readReports()
const summary = summarize(reports)
const rows = makeRows(summary)
await mkdir(outDir, { recursive: true })
await writeFile(outPath, toMarkdown(rows))
console.log(`Записан файл ${outPath}`)
