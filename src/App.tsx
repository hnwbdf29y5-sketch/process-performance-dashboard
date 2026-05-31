import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import {
  Activity,
  BarChart3,
  Bell,
  FileText,
  Gauge,
  LayoutDashboard,
  SlidersHorizontal,
} from 'lucide-react'
import { experimentMode } from './lib/experimentMode'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Events = lazy(() => import('./pages/Events'))
const Reports = lazy(() => import('./pages/Reports'))
const SettingsPage = lazy(() => import('./pages/Settings'))
const Details = lazy(() => import('./pages/Details'))

const routes = [
  { path: '/dashboard', label: 'Панель', title: 'Панель мониторинга', icon: LayoutDashboard },
  { path: '/events', label: 'События', title: 'Журнал событий', icon: Bell },
  { path: '/reports', label: 'Отчеты', title: 'Сводка измерений', icon: FileText },
  { path: '/settings', label: 'Пороги', title: 'Контрольные пороги', icon: SlidersHorizontal },
  { path: '/details/line-a', label: 'Объект', title: 'Карточка объекта', icon: Gauge },
]

function getPath() {
  const path = window.location.pathname
  return path === '/' ? '/dashboard' : path
}

function App() {
  const [path, setPath] = useState(getPath)

  useEffect(() => {
    const onPopState = () => setPath(getPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const title = useMemo(() => {
    if (path.startsWith('/details')) return 'Карточка объекта'
    return routes.find((route) => route.path === path)?.title ?? 'Панель мониторинга'
  }, [path])

  const modeLabel = experimentMode === 'baseline' ? 'исходная сборка' : 'пороги соблюдены'

  const navigate = (nextPath: string) => {
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Основная навигация">
        <a className="brand" href="/dashboard" onClick={(event) => {
          event.preventDefault()
          navigate('/dashboard')
        }}>
          <span className="brand-mark"><Activity size={20} aria-hidden="true" /></span>
          <span>
            <strong>АРМ контроля</strong>
            <small>линия А</small>
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
            <p className="eyebrow">Контроль технологического процесса</p>
            <h1>{title}</h1>
          </div>
          <div className="topbar-actions" aria-label="Текущее состояние контроля">
            <span className={experimentMode === 'baseline' ? 'status-pill warning' : 'status-pill good'}>
              {modeLabel}
            </span>
            <span className="status-pill neutral"><BarChart3 size={16} aria-hidden="true" /> 5 разделов</span>
          </div>
        </header>

        <Suspense fallback={<div className="loading-panel">Загрузка раздела...</div>}>
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
