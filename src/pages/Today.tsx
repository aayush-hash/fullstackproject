import { useDietStore } from '../store'
import CircleProgress from '../components/CircleProgress'

export default function Today() {
  const { profile, logs, today } = useDietStore()
  const day = logs[today] ?? { date: today, consumed: 0, meals: [] }
  return (
    <div className="card grid place-items-center">
      <CircleProgress value={day.consumed} max={profile.dailyGoal} size={220} />
    </div>
  )
}
