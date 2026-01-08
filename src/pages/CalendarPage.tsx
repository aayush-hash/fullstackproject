import { useDietStore } from '../store'

function format(date: Date) {
  return date.toISOString().slice(0,10)
}

export default function CalendarPage() {
  const logs = useDietStore(s => s.logs)
  const profile = useDietStore(s => s.profile)

  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth(), 1)
  const end = new Date(today.getFullYear(), today.getMonth()+1, 0)

  const days: Date[] = []
  for (let d = new Date(start); d <= end; d = new Date(d.getFullYear(), d.getMonth(), d.getDate()+1)) {
    days.push(d)
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-2">This month</h2>
      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {days.map(d => {
          const key = format(d)
          const consumed = logs[key]?.consumed ?? 0
          const pct = Math.min(100, Math.round(consumed / profile.dailyGoal * 100))
          return (
            <div key={key} className="aspect-square border rounded-lg grid place-items-center">
              <div>
                <div className="text-xs text-slate-500">{d.getDate()}</div>
                <div className={`text-[10px] font-medium ${pct >= 100 ? 'text-emerald-600' : 'text-slate-600'}`}>{pct}%</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
