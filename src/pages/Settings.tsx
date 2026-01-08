import { useState } from 'react'
import { useDietStore } from '../store'

export default function Settings() {
  const profile = useDietStore(s => s.profile)
  const setProfile = useDietStore(s => s.setProfile)
  const [name, setName] = useState(profile.name)
  const [goal, setGoal] = useState(profile.dailyGoal)
  const [avatar, setAvatar] = useState<string | undefined>(profile.avatar)

  return (
    <form className="card space-y-3" onSubmit={e=>{e.preventDefault(); setProfile({ name, dailyGoal: goal, avatar })}}>
      <div className="flex items-center gap-3">
        {avatar ? (
          <img src={avatar} alt="avatar" className="w-16 h-16 rounded-full object-cover border" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-slate-200 grid place-items-center text-slate-500">{name.charAt(0).toUpperCase()}</div>
        )}
        <div>
          <div className="text-sm text-slate-500">Profile</div>
          <div className="text-lg font-semibold">{name}</div>
        </div>
      </div>
      <div className="grid gap-2">
        <label className="grid">
          <span className="text-xs text-slate-500">Name</span>
          <input value={name} onChange={e=>setName(e.target.value)} className="border rounded-lg px-3 py-2" />
        </label>
        <label className="grid">
          <span className="text-xs text-slate-500">Daily calorie goal</span>
          <input value={goal} onChange={e=>setGoal(Number(e.target.value))} inputMode="numeric" className="border rounded-lg px-3 py-2" />
        </label>
        <label className="grid">
          <span className="text-xs text-slate-500">Avatar</span>
          <input type="file" accept="image/*" onChange={e=>{
            const file = e.target.files?.[0]; if (!file) return
            const reader = new FileReader(); reader.onload = () => setAvatar(String(reader.result)); reader.readAsDataURL(file)
          }} />
        </label>
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" className="btn btn-outline" onClick={()=>{ setName(profile.name); setGoal(profile.dailyGoal); setAvatar(profile.avatar) }}>Reset</button>
        <button className="btn">Save</button>
      </div>
    </form>
  )
}
