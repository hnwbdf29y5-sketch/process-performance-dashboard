export type Status = 'normal' | 'warning' | 'critical'

export type ProcessMetric = {
  label: string
  value: number
  unit: string
  limit: string
  status: Status
  delta: string
}

export type TrendPoint = {
  label: string
  pressure: number
  temperature: number
  vibration: number
}

export type ProcessEvent = {
  time: string
  source: string
  type: Status
  message: string
}

export const processMetrics: ProcessMetric[] = [
  { label: 'Давление линии', value: 7.8, unit: 'МПа', limit: '6.8-8.4 МПа', status: 'normal', delta: '+0.3' },
  { label: 'Температура реактора', value: 164, unit: '°C', limit: '150-170 °C', status: 'warning', delta: '+4.1' },
  { label: 'Вибрация насоса', value: 3.2, unit: 'мм/с', limit: '< 4.5 мм/с', status: 'normal', delta: '-0.4' },
  { label: 'Энергетическая нагрузка', value: 82, unit: '%', limit: '< 88%', status: 'normal', delta: '+1.8' },
]

export const trendData: TrendPoint[] = [
  { label: '08:00', pressure: 62, temperature: 58, vibration: 33 },
  { label: '09:00', pressure: 66, temperature: 61, vibration: 31 },
  { label: '10:00', pressure: 70, temperature: 68, vibration: 35 },
  { label: '11:00', pressure: 68, temperature: 74, vibration: 38 },
  { label: '12:00', pressure: 73, temperature: 79, vibration: 42 },
  { label: '13:00', pressure: 78, temperature: 82, vibration: 39 },
  { label: '14:00', pressure: 75, temperature: 76, vibration: 34 },
]

export const events: ProcessEvent[] = [
  { time: '14:12', source: 'Реактор R-12', type: 'warning', message: 'Температура достигла предупредительной границы' },
  { time: '13:47', source: 'Насос P-04', type: 'normal', message: 'Вибрация вернулась в допустимый диапазон' },
  { time: '13:10', source: 'Линия A', type: 'normal', message: 'Коррекция давления завершена' },
  { time: '12:33', source: 'Фильтр F-02', type: 'critical', message: 'Зафиксировано кратковременное падение давления' },
  { time: '11:58', source: 'Энергоузел E-1', type: 'normal', message: 'Цикл балансировки нагрузки завершен' },
  { time: '11:20', source: 'Линия B', type: 'warning', message: 'Замедленный ответ контроллера клапана' },
]

export const reports = [
  { route: '/dashboard', lcp: 1.4, tbt: 72, cls: 0.01, score: 98, js: 182 },
  { route: '/events', lcp: 1.2, tbt: 41, cls: 0.00, score: 99, js: 158 },
  { route: '/reports', lcp: 1.3, tbt: 48, cls: 0.01, score: 99, js: 166 },
  { route: '/settings', lcp: 1.1, tbt: 36, cls: 0.00, score: 100, js: 151 },
  { route: '/details/line-a', lcp: 1.5, tbt: 80, cls: 0.01, score: 97, js: 185 },
]

export const performanceBudget = [
  { metric: 'Отображение основного блока', target: '<= 2.5 с', reason: 'Время появления главного содержимого страницы' },
  { metric: 'Блокировка основного потока', target: '<= 200 мс', reason: 'Ограничение задержек при выполнении сценариев' },
  { metric: 'Стабильность верстки', target: '<= 0.10', reason: 'Контроль заметных сдвигов элементов интерфейса' },
  { metric: 'Итоговая оценка страницы', target: '>= 90', reason: 'Обобщенный результат проверки раздела' },
  { metric: 'Передача сценариев', target: '<= 300 КБ', reason: 'Ограничение объема загружаемого кода' },
  { metric: 'Количество запросов', target: '<= 50', reason: 'Ограничение числа сетевых обращений при загрузке' },
]
