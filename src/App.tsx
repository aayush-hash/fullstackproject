import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Today from './pages/Today'
import CalendarPage from './pages/CalendarPage'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

export default function App() {
  return (
    <div className="min-h-full pb-16">
      <header className="container py-4">
        <h1 className="text-2xl font-bold text-slate-800">Diet Planner</h1>
      </header>
      <main id="main" className="container space-y-4 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/today" element={<Today />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <nav className="navbar" aria-label="Bottom navigation">
        <ul className="container">
          <li><NavLink to="/" className={({isActive}) => isActive ? 'active' : ''} aria-label="Home">Home</NavLink></li>
          <li><NavLink to="/today" className={({isActive}) => isActive ? 'active' : ''} aria-label="Today">Today</NavLink></li>
          <li><NavLink to="/calendar" className={({isActive}) => isActive ? 'active' : ''} aria-label="Calendar">Calendar</NavLink></li>
          <li><NavLink to="/reports" className={({isActive}) => isActive ? 'active' : ''} aria-label="Reports">Reports</NavLink></li>
          <li><NavLink to="/settings" className={({isActive}) => isActive ? 'active' : ''} aria-label="Settings">Settings</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}
