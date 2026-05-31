import { AlertTriangle, CheckCircle2, Gauge } from 'lucide-react'
import { LineChart } from '../components/LineChart'
import { MetricCard } from '../components/MetricCard'
import { useTelemetryAnalysis } from '../hooks/useTelemetryAnalysis'

function Dashboard() {
  const { result, pending, mode } = useTelemetryAnalysis('dashboard')

  return (
    <section className="page-stack">
      <div className="metric-grid">
        {result.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <section className="panel chart-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Параметры линии</p>
            <h2>Изменение показателей за смену</h2>
          </div>
          <span className="status-pill good"><CheckCircle2 size={16} aria-hidden="true" /> {pending ? 'расчет' : 'стабильно'}</span>
        </div>
        <LineChart
          data={result.trend}
          series={[
            { key: 'pressure', label: 'Давление', color: '#2563eb' },
            { key: 'temperature', label: 'Температура', color: '#dc2626' },
            { key: 'vibration', label: 'Вибрация', color: '#059669' },
          ]}
        />
      </section>

      <div className="two-column">
        <section className="panel">
          <div className="panel-heading compact">
            <h2>Последние события</h2>
            <AlertTriangle size={18} aria-hidden="true" />
          </div>
          <div className="event-list compact-list">
            {result.events.slice(0, 4).map((event) => (
              <article className="event-row" key={`${event.time}-${event.source}`}>
                <span className={`event-dot ${event.type}`} />
                <div>
                  <strong>{event.source}</strong>
                  <p>{event.message}</p>
                </div>
                <time>{event.time}</time>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading compact">
            <h2>Порядок проверки</h2>
            <Gauge size={18} aria-hidden="true" />
          </div>
          <ol className="process-steps">
            <li>{mode === 'baseline' ? 'Расчет телеметрии в интерфейсе' : 'Расчет телеметрии в фоновом потоке'}</li>
            <li>Проверка основных разделов</li>
            <li>Сравнение с установленными порогами</li>
            <li>Подготовка отчета по результатам</li>
          </ol>
        </section>
      </div>
    </section>
  )
}

export default Dashboard
