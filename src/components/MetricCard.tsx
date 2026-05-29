import type { ProcessMetric } from '../data/processData'

type Props = {
  metric: ProcessMetric
}

export function MetricCard({ metric }: Props) {
  return (
    <article className={`metric-card ${metric.status}`}>
      <div className="metric-card-header">
        <span>{metric.label}</span>
        <span className="metric-state">{metric.status}</span>
      </div>
      <div className="metric-value">
        {metric.value}
        <small>{metric.unit}</small>
      </div>
      <div className="metric-foot">
        <span>{metric.limit}</span>
        <span>{metric.delta}</span>
      </div>
    </article>
  )
}
