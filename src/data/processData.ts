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

export const processMetrics: ProcessMetric[] = [
  { label: 'Line pressure', value: 7.8, unit: 'MPa', limit: '6.8-8.4 MPa', status: 'normal', delta: '+0.3' },
  { label: 'Reactor temperature', value: 164, unit: 'C', limit: '150-170 C', status: 'warning', delta: '+4.1' },
  { label: 'Pump vibration', value: 3.2, unit: 'mm/s', limit: '< 4.5 mm/s', status: 'normal', delta: '-0.4' },
  { label: 'Energy load', value: 82, unit: '%', limit: '< 88%', status: 'normal', delta: '+1.8' },
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

export const events = [
  { time: '14:12', source: 'Reactor R-12', type: 'warning', message: 'Temperature reached warning boundary' },
  { time: '13:47', source: 'Pump P-04', type: 'normal', message: 'Vibration returned to target range' },
  { time: '13:10', source: 'Line A', type: 'normal', message: 'Pressure correction completed' },
  { time: '12:33', source: 'Filter F-02', type: 'critical', message: 'Short pressure drop detected' },
  { time: '11:58', source: 'Energy node E-1', type: 'normal', message: 'Load balancing cycle finished' },
  { time: '11:20', source: 'Line B', type: 'warning', message: 'Delayed response from valve controller' },
]

export const reports = [
  { route: '/dashboard', lcp: 1.4, tbt: 72, cls: 0.01, score: 98, js: 182 },
  { route: '/events', lcp: 1.2, tbt: 41, cls: 0.00, score: 99, js: 158 },
  { route: '/reports', lcp: 1.3, tbt: 48, cls: 0.01, score: 99, js: 166 },
  { route: '/settings', lcp: 1.1, tbt: 36, cls: 0.00, score: 100, js: 151 },
  { route: '/details/line-a', lcp: 1.5, tbt: 80, cls: 0.01, score: 97, js: 185 },
]

export const performanceBudget = [
  { metric: 'LCP', target: '<= 2.5 s', reason: 'Core Web Vitals loading criterion' },
  { metric: 'TBT', target: '<= 200 ms', reason: 'Main-thread blocking control' },
  { metric: 'CLS', target: '<= 0.10', reason: 'Visual stability control' },
  { metric: 'Performance score', target: '>= 90', reason: 'Integrated Lighthouse criterion' },
  { metric: 'JavaScript transfer', target: '<= 300 KB', reason: 'Local bundle-size budget' },
  { metric: 'Requests', target: '<= 50', reason: 'Network complexity budget' },
]
