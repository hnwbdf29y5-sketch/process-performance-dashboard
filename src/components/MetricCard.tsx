import type { ProcessMetric } from '../data/processData'

type Props = {
  metric: ProcessMetric
}

const statusLabels = {
  normal: 'норма',
  warning: 'внимание',
  critical: 'критично',
} satisfies Record<ProcessMetric['status'], string>

export function MetricCard({ metric }: Props) {
  return (
    <article className={`metric-card ${metric.status}`}>
      <div className="metric-card-header">
        <span>{metric.label}</span>
        <span className="metric-state">{statusLabels[metric.status]}</span>
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
