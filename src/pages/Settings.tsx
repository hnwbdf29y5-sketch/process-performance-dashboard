import { performanceBudget } from '../data/processData'

function Settings() {
  return (
    <section className="page-stack">
      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Performance budget</p>
            <h2>Automated control thresholds</h2>
          </div>
          <span className="status-pill neutral">warning mode</span>
        </div>
        <div className="budget-list">
          {performanceBudget.map((item) => (
            <article className="budget-row" key={item.metric}>
              <div>
                <strong>{item.metric}</strong>
                <p>{item.reason}</p>
              </div>
              <span>{item.target}</span>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}

export default Settings
