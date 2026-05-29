import { Filter, Search } from 'lucide-react'
import { events } from '../data/processData'

function Events() {
  return (
    <section className="page-stack">
      <div className="toolbar">
        <label className="search-box">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Search events</span>
          <input placeholder="Search event log" />
        </label>
        <button className="icon-button" type="button" aria-label="Filter events">
          <Filter size={18} aria-hidden="true" />
        </button>
      </div>
      <section className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Object</th>
                <th>Status</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={`${event.time}-${event.source}`}>
                  <td>{event.time}</td>
                  <td>{event.source}</td>
                  <td><span className={`state-label ${event.type}`}>{event.type}</span></td>
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
