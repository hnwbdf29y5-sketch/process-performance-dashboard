import { Cpu, Thermometer, Waves } from 'lucide-react'
import { LineChart } from '../components/LineChart'
import { trendData } from '../data/processData'

function Details() {
  return (
    <section className="page-stack">
      <section className="panel object-header">
        <div>
          <p className="eyebrow">Controlled object</p>
          <h2>Line A / Reactor R-12</h2>
          <p className="muted">Continuous monitoring of pressure, temperature, vibration and control-response stability.</p>
        </div>
        <div className="object-kpis">
          <span><Thermometer size={16} aria-hidden="true" /> 164 C</span>
          <span><Waves size={16} aria-hidden="true" /> 7.8 MPa</span>
          <span><Cpu size={16} aria-hidden="true" /> 82%</span>
        </div>
      </section>

      <section className="panel chart-panel">
        <div className="panel-heading compact">
          <h2>Object signal profile</h2>
        </div>
        <LineChart
          data={trendData}
          series={[
            { key: 'pressure', label: 'Pressure', color: '#2563eb' },
            { key: 'temperature', label: 'Temperature', color: '#dc2626' },
          ]}
        />
      </section>
    </section>
  )
}

export default Details
