import { lazy, Suspense } from 'react'
import { Download, FileChartColumn } from 'lucide-react'
import { useTelemetryAnalysis } from '../hooks/useTelemetryAnalysis'

const TelemetryInsights = lazy(() => import('../components/TelemetryInsights'))

function Reports() {
  const { result, pending } = useTelemetryAnalysis('reports')

  return (
    <section className="page-stack">
      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Результаты проверки</p>
            <h2>Показатели по разделам интерфейса</h2>
          </div>
          <button className="text-button" type="button">
            <Download size={16} aria-hidden="true" />
            Экспорт
          </button>
        </div>
        <Suspense fallback={<div className="inline-loading">Подготовка сводных показателей...</div>}>
          <TelemetryInsights result={result} />
        </Suspense>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Раздел</th>
                <th>LCP, с</th>
                <th>TBT, мс</th>
                <th>CLS</th>
                <th>Скрипты, КБ</th>
                <th>Оценка</th>
              </tr>
            </thead>
            <tbody>
              {result.reports.map((report) => (
                <tr key={report.route}>
                  <td>{report.route}</td>
                  <td>{report.lcp}</td>
                  <td>{report.tbt}</td>
                  <td>{report.cls.toFixed(2)}</td>
                  <td>{report.js}</td>
                  <td><span className="score">{report.score}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading compact">
          <h2>{pending ? 'Формирование материалов' : 'Подготовленные материалы'}</h2>
          <FileChartColumn size={18} aria-hidden="true" />
        </div>
        <div className="artifact-grid">
          <div>Отчеты проверки страниц</div>
          <div>Исходные данные измерений</div>
          <div>Сводные таблицы</div>
          <div>Проверка пороговых значений</div>
        </div>
      </section>
    </section>
  )
}

export default Reports
