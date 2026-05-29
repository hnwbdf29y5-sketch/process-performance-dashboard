import type { TrendPoint } from '../data/processData'

type SeriesKey = 'pressure' | 'temperature' | 'vibration'

type Props = {
  data: TrendPoint[]
  series: Array<{ key: SeriesKey; label: string; color: string }>
}

function points(data: TrendPoint[], key: SeriesKey) {
  const width = 720
  const height = 260
  const step = width / Math.max(data.length - 1, 1)
  return data
    .map((item, index) => {
      const x = Math.round(index * step)
      const y = Math.round(height - (item[key] / 100) * height)
      return `${x},${y}`
    })
    .join(' ')
}

export function LineChart({ data, series }: Props) {
  return (
    <div className="chart-wrap">
      <svg viewBox="0 0 720 300" role="img" aria-label="График параметров технологического процесса">
        <g className="chart-grid">
          {[0, 1, 2, 3].map((line) => (
            <line key={line} x1="0" x2="720" y1={line * 70 + 20} y2={line * 70 + 20} />
          ))}
        </g>
        {series.map((item) => (
          <polyline
            fill="none"
            key={item.key}
            points={points(data, item.key)}
            stroke={item.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            transform="translate(0 20)"
          />
        ))}
      </svg>
      <div className="chart-legend">
        {series.map((item) => (
          <span key={item.key}><i style={{ background: item.color }} />{item.label}</span>
        ))}
      </div>
    </div>
  )
}
