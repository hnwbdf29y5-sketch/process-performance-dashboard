import { Filter, Search } from 'lucide-react'
import { events } from '../data/processData'

const statusLabels = {
  normal: 'норма',
  warning: 'внимание',
  critical: 'критично',
} as const

function Events() {
  return (
    <section className="page-stack">
      <div className="toolbar">
        <label className="search-box">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Поиск событий</span>
          <input placeholder="Найти событие" />
        </label>
        <button className="icon-button" type="button" aria-label="Фильтр событий">
          <Filter size={18} aria-hidden="true" />
        </button>
      </div>
      <section className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Время</th>
                <th>Объект</th>
                <th>Состояние</th>
                <th>Сообщение</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={`${event.time}-${event.source}`}>
                  <td>{event.time}</td>
                  <td>{event.source}</td>
                  <td><span className={`state-label ${event.type}`}>{statusLabels[event.type]}</span></td>
                  <td>{event.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  )
}

export default Events
