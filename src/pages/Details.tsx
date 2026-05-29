import { Cpu, Thermometer, Waves } from 'lucide-react'
import { LineChart } from '../components/LineChart'
import { trendData } from '../data/processData'

function Details() {
  return (
    <section className="page-stack">
      <section className="panel object-header">
        <div>
          <p className="eyebrow">Контролируемый объект</p>
          <h2>Линия A / реактор R-12</h2>
          <p className="muted">Непрерывный мониторинг давления, температуры, вибрации и стабильности реакции системы управления.</p>
        </div>
        <div className="object-kpis">
          <span><Thermometer size={16} aria-hidden="true" /> 164 C</span>
          <span><Waves size={16} aria-hidden="true" /> 7.8 MPa</span>
          <span><Cpu size={16} aria-hidden="true" /> 82%</span>
        </div>
      </section>

      <section className="panel chart-panel">
        <div className="panel-heading compact">
          <h2>Профиль сигналов объекта</h2>
        </div>
        <LineChart
          data={trendData}
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
