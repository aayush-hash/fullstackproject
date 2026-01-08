import { useDietStore } from '../store'
import CircleProgress from '../components/CircleProgress'
import MealForm from '../components/MealForm'

export default function Home() {
  const { profile, logs, today } = useDietStore()
  const day = logs[today] ?? { date: today, consumed: 0, meals: [] }
  const remaining = Math.max(0, profile.dailyGoal - day.consumed)

  return (
    <div className="space-y-4">
      <section className="card grid grid-cols-2 gap-4 items-center">
        <div className="justify-self-center">
          <CircleProgress value={day.consumed} max={profile.dailyGoal} />
        </div>
        <div className="space-y-2">
          <div className="text-sm text-slate-500">Total consumed</div>
          <div className="text-3xl font-bold text-slate-800">{day.consumed} kcal</div>
          <div className="text-sm text-slate-500">Remaining</div>
          <div className="text-xl font-semibold text-brand">{remaining} kcal</div>
        </div>
      </section>

      <MealForm />

      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Today's meals</h2>
        <ul className="space-y-2">
          {day.meals.map(m => (
            <li key={m.id} className="flex items-center gap-3">
              {m.photo && <img src={m.photo} alt="meal" className="w-14 h-14 rounded-xl object-cover border" />}
              <div className="flex-1">
                <div className="font-medium text-slate-800">{m.name}</div>
                <div className="text-xs text-slate-500">{m.time}</div>
              </div>
              <div className="text-slate-700 font-medium">{m.calories} kcal</div>
            </li>
          ))}
          {day.meals.length === 0 && <div className="text-center text-slate-500">No meals yet. Add one above.</div>}
        </ul>
      </section>
    </div>
  )
}
