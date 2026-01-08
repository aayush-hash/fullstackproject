import { useMemo } from 'react'
import { useDietStore } from '../store'

export default function Reports() {
  const logs = useDietStore(s => s.logs)
  const data = useMemo(() => {
    const entries = Object.values(logs)
    if (entries.length === 0) return { avg: 0, max: 0, min: 0 }
    const vals = entries.map(e => e.consumed)
    const sum = vals.reduce((a,b)=>a+b,0)
    return { avg: Math.round(sum/vals.length), max: Math.max(...vals), min: Math.min(...vals) }
  }, [logs])

  return (
    <div className="grid gap-4">
      <div className="card grid grid-cols-3 text-center">
        <Stat label="Average" value={`${data.avg} kcal`} />
        <Stat label="Max" value={`${data.max} kcal`} />
        <Stat label="Min" value={`${data.min} kcal`} />
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Trend (last 7 logs)</h2>
        <div className="flex items-end gap-2 h-40">
          {Object.values(logs).slice(-7).map((e) => {
            const pct = Math.min(100, (e.consumed / 2500) * 100)
            return <div key={e.date} className="flex-1 bg-brand/20 rounded-t" style={{ height: `${pct}%` }} title={`${e.consumed} kcal`} />
          })}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-xl font-semibold text-slate-800">{value}</div>
    </div>
  )
}
