import { Download, FileChartColumn } from 'lucide-react'
import { reports } from '../data/processData'

function Reports() {
  return (
    <section className="page-stack">
      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Lighthouse CI summary</p>
            <h2>Route performance snapshot</h2>
          </div>
          <button className="text-button" type="button">
            <Download size={16} aria-hidden="true" />
            Export
          </button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Route</th>
                <th>LCP, s</th>
                <th>TBT, ms</th>
                <th>CLS</th>
                <th>JS, KB</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
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
          <h2>Generated artifacts</h2>
          <FileChartColumn size={18} aria-hidden="true" />
        </div>
        <div className="artifact-grid">
          <div>HTML Lighthouse reports</div>
          <div>JSON measurement data</div>
          <div>Markdown performance summary</div>
          <div>CI budget decision</div>
        </div>
      </section>
    </section>
  )
}

export default Reports
