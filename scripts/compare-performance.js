import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const baselinePath = path.resolve('reports/baseline-summary.json')
const optimizedPath = path.resolve('reports/performance-summary.json')
const outPath = path.resolve('reports/performance-comparison.md')

function percentChange(before, after) {
  if (before === 0) return after === 0 ? '0%' : 'n/a'
  return `${(((before - after) / before) * 100).toFixed(1)}%`
}

function scoreDelta(before, after) {
  const delta = after - before
  return delta >= 0 ? `+${delta}` : `${delta}`
}

const baseline = JSON.parse(await readFile(baselinePath, 'utf8'))
const optimized = JSON.parse(await readFile(optimizedPath, 'utf8'))
const optimizedByRoute = new Map(optimized.map((item) => [item.route, item]))

const rows = baseline.map((before) => {
  const after = optimizedByRoute.get(before.route)
  return {
    route: before.route,
    scoreBefore: before.score,
    scoreAfter: after.score,
    scoreDelta: scoreDelta(before.score, after.score),
    tbtBefore: before.tbt,
    tbtAfter: after.tbt,
    tbtImprovement: percentChange(before.tbt, after.tbt),
    lcpBefore: before.lcp,
    lcpAfter: after.lcp,
    lcpImprovement: percentChange(before.lcp, after.lcp),
    scriptBefore: before.scriptKb,
    scriptAfter: after.scriptKb,
    scriptImprovement: percentChange(before.scriptKb, after.scriptKb),
    imageBefore: before.imageKb,
    imageAfter: after.imageKb,
    imageImprovement: percentChange(before.imageKb, after.imageKb),
    transferBefore: before.transferKb,
    transferAfter: after.transferKb,
    transferImprovement: percentChange(before.transferKb, after.transferKb),
  }
})

const markdown = [
  '# Сравнение показателей до и после оптимизации',
  '',
  '| Маршрут | Оценка до | Оценка после | Изменение оценки | TBT до, мс | TBT после, мс | Улучшение TBT | LCP до, с | LCP после, с | Изменение LCP | JS до, КБ | JS после, КБ | Улучшение JS | Images до, КБ | Images после, КБ | Передача до, КБ | Передача после, КБ | Улучшение передачи |',
  '| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
  ...rows.map((row) => (
    `| ${row.route} | ${row.scoreBefore} | ${row.scoreAfter} | ${row.scoreDelta} | ${row.tbtBefore} | ${row.tbtAfter} | ${row.tbtImprovement} | ${row.lcpBefore} | ${row.lcpAfter} | ${row.lcpImprovement} | ${row.scriptBefore} | ${row.scriptAfter} | ${row.scriptImprovement} | ${row.imageBefore} | ${row.imageAfter} | ${row.transferBefore} | ${row.transferAfter} | ${row.transferImprovement} |`
  )),
  '',
].join('\n')

await writeFile(outPath, markdown)
console.log(`Записан файл ${outPath}`)
