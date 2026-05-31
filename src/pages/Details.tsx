import { lazy, Suspense } from 'react'
import { Cpu, Thermometer, Waves } from 'lucide-react'
import { LineChart } from '../components/LineChart'
import { useTelemetryAnalysis } from '../hooks/useTelemetryAnalysis'

const TelemetryInsights = lazy(() => import('../components/TelemetryInsights'))

function Details() {
  const { result } = useTelemetryAnalysis('details')
  const temperature = result.metrics.find((metric) => metric.label === 'Температура реактора')
  const pressure = result.metrics.find((metric) => metric.label === 'Давление линии')
  const load = result.metrics.find((metric) => metric.label === 'Энергетическая нагрузка')

  return (
    <section className="page-stack">
      <section className="panel object-header">
        <div>
          <p className="eyebrow">Контролируемый объект</p>
          <h2>Линия A / реактор R-12</h2>
          <p className="muted">Наблюдение за давлением, температурой, вибрацией и нагрузкой на участке линии.</p>
        </div>
        <div className="object-kpis">
          <span><Thermometer size={16} aria-hidden="true" /> {temperature?.value ?? 164} °C</span>
          <span><Waves size={16} aria-hidden="true" /> {pressure?.value ?? 7.8} МПа</span>
          <span><Cpu size={16} aria-hidden="true" /> {load?.value ?? 82}%</span>
        </div>
      </section>

      <Suspense fallback={<div className="inline-loading">Расчет показателей объекта...</div>}>
        <TelemetryInsights result={result} />
      </Suspense>

      <section className="panel chart-panel">
        <div className="panel-heading compact">
          <h2>Изменение параметров объекта</h2>
        </div>
        <LineChart
          data={result.trend}
          series={[
            { key: 'pressure', label: 'Давление', color: '#2563eb' },
            { key: 'temperature', label: 'Температура', color: '#dc2626' },
          ]}
        />
      </section>
    </section>
  )
}

export default Details
