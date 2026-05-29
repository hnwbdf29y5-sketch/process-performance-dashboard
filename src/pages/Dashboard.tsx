import { AlertTriangle, CheckCircle2, Gauge } from 'lucide-react'
import { LineChart } from '../components/LineChart'
import { MetricCard } from '../components/MetricCard'
import { events, processMetrics, trendData } from '../data/processData'

function Dashboard() {
  return (
    <section className="page-stack">
      <div className="metric-grid">
        {processMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <section className="panel chart-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Controlled parameters</p>
            <h2>Process trend, current shift</h2>
          </div>
          <span className="status-pill good"><CheckCircle2 size={16} aria-hidden="true" /> stable</span>
        </div>
        <LineChart
          data={trendData}
          series={[
            { key: 'pressure', label: 'Pressure', color: '#2563eb' },
            { key: 'temperature', label: 'Temperature', color: '#dc2626' },
            { key: 'vibration', label: 'Vibration', color: '#059669' },
          ]}
        />
      </section>

      <div className="two-column">
        <section className="panel">
          <div className="panel-heading compact">
            <h2>Latest events</h2>
            <AlertTriangle size={18} aria-hidden="true" />
          </div>
          <div className="event-list compact-list">
            {events.slice(0, 4).map((event) => (
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
            <h2>Control loop</h2>
            <Gauge size={18} aria-hidden="true" />
          </div>
          <ol className="process-steps">
            <li>Build frontend artifact</li>
            <li>Run Lighthouse CI for target routes</li>
            <li>Compare metrics with performance budget</li>
            <li>Generate report and optimization signals</li>
          </ol>
        </section>
      </div>
    </section>
  )
}

export default Dashboard
