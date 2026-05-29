import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import {
  Activity,
  BarChart3,
  Bell,
  FileText,
  Gauge,
  LayoutDashboard,
  SlidersHorizontal,
} from 'lucide-react'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Events = lazy(() => import('./pages/Events'))
const Reports = lazy(() => import('./pages/Reports'))
const SettingsPage = lazy(() => import('./pages/Settings'))
const Details = lazy(() => import('./pages/Details'))

const routes = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/events', label: 'Events', icon: Bell },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/settings', label: 'Settings', icon: SlidersHorizontal },
  { path: '/details/line-a', label: 'Details', icon: Gauge },
]

function isBaselineExperiment() {
  return new URLSearchParams(window.location.search).get('variant') === 'baseline'
}

function getPath() {
  const path = window.location.pathname
  return path === '/' ? '/dashboard' : path
}

function BaselineCost() {
  const checksumRef = useRef<HTMLSpanElement>(null)
  const rows = Array.from({ length: 160 }, (_, index) => index)

  useEffect(() => {
    const startedAt = performance.now()
    let nextChecksum = 0

    while (performance.now() - startedAt < 360) {
      nextChecksum += Math.sqrt(nextChecksum + 1.37)
    }

    if (checksumRef.current) {
      checksumRef.current.textContent = `main-thread checksum ${Math.round(nextChecksum)}`
    }
  }, [])

  return (
    <section className="baseline-cost" aria-label="Baseline experimental load">
      <strong>Baseline variant</strong>
      <span ref={checksumRef}>main-thread checksum pending</span>
      <div>
        {rows.map((row) => (
          <i key={row} style={{ width: `${20 + (row % 18)}px` }} />
        ))}
      </div>
    </section>
  )
}

function App() {
  const [path, setPath] = useState(getPath)
  const baselineExperiment = isBaselineExperiment()

  useEffect(() => {
    const onPopState = () => setPath(getPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const title = useMemo(() => {
    if (path.startsWith('/details')) return 'Object details'
    return routes.find((route) => route.path === path)?.label ?? 'Dashboard'
  }, [path])

  const navigate = (nextPath: string) => {
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <a className="brand" href="/dashboard" onClick={(event) => {
          event.preventDefault()
          navigate('/dashboard')
        }}>
          <span className="brand-mark"><Activity size={20} aria-hidden="true" /></span>
          <span>
            <strong>ProcessControl</strong>
            <small>performance lab</small>
          </span>
        </a>
        <nav className="nav-list">
          {routes.map((route) => {
            const Icon = route.icon
            const active = path === route.path || (route.path.startsWith('/details') && path.startsWith('/details'))
            return (
              <a
                aria-current={active ? 'page' : undefined}
                className={active ? 'nav-link active' : 'nav-link'}
                href={route.path}
                key={route.path}
                onClick={(event) => {
                  event.preventDefault()
                  navigate(route.path)
                }}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{route.label}</span>
              </a>
            )
          })}
        </nav>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Automated performance control</p>
            <h1>{title}</h1>
          </div>
          <div className="topbar-actions" aria-label="Current control state">
            <span className="status-pill good">CI budget: pass</span>
            <span className="status-pill neutral"><BarChart3 size={16} aria-hidden="true" /> 5 routes</span>
          </div>
        </header>

        <Suspense fallback={<div className="loading-panel">Loading measured route...</div>}>
          {baselineExperiment && <BaselineCost />}
          {path === '/events' && <Events />}
          {path === '/reports' && <Reports />}
          {path === '/settings' && <SettingsPage />}
          {path.startsWith('/details') && <Details />}
          {(path === '/dashboard' || path === '/') && <Dashboard />}
        </Suspense>
      </main>
    </div>
  )
}

export default App
