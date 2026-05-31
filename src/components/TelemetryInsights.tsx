import type { TelemetryAnalysisResult } from '../data/telemetry'

type Props = {
  result: TelemetryAnalysisResult
}

export default function TelemetryInsights({ result }: Props) {
  return (
    <section className="insight-grid" aria-label="Сводные показатели обработки телеметрии">
      <article>
        <span>Отсчетов</span>
        <strong>{result.summary.sampleCount.toLocaleString('ru-RU')}</strong>
      </article>
      <article>
        <span>Окно анализа</span>
        <strong>{result.summary.windowSize} с</strong>
      </article>
      <article>
        <span>Событий</span>
        <strong>{result.summary.alerts}</strong>
      </article>
      <article>
        <span>Расчет</span>
        <strong>{result.summary.processingMs} мс</strong>
      </article>
    </section>
  )
}
