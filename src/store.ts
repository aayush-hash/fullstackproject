import { create } from 'zustand'

export type Meal = {
  id: string
  name: string
  calories: number
  time: string
  photo?: string // data URL
}

export type DailyLog = {
  date: string // yyyy-mm-dd
  consumed: number
  meals: Meal[]
}

export type Profile = {
  name: string
  dailyGoal: number
  avatar?: string
}

type State = {
  profile: Profile
  logs: Record<string, DailyLog>
  today: string
  addMeal: (meal: Omit<Meal, 'id' | 'time'> & Partial<Pick<Meal, 'time'>>) => void
  removeMeal: (id: string) => void
  setProfile: (profile: Partial<Profile>) => void
}

const todayStr = new Date().toISOString().slice(0,10)

const persisted = (() => {
  try {
    const raw = localStorage.getItem('diet_state')
    return raw ? JSON.parse(raw) as Partial<State> : {}
  } catch { return {} }
})()

export const useDietStore = create<State>((set, get) => ({
  profile: persisted.profile ?? { name: 'You', dailyGoal: 2000 },
  logs: persisted.logs ?? {
    [todayStr]: { date: todayStr, consumed: 850, meals: [
      { id: '1', name: 'Oatmeal', calories: 250, time: '08:30' },
      { id: '2', name: 'Chicken Salad', calories: 400, time: '12:45' },
      { id: '3', name: 'Apple', calories: 200, time: '16:10' },
    ] }
  },
  today: todayStr,
  addMeal: (input) => set(() => {
    const id = Math.random().toString(36).slice(2)
    const time = input.time ?? new Date().toTimeString().slice(0,5)
    const meal: Meal = { id, name: input.name, calories: input.calories, time, photo: input.photo }
    const t = get().today
    const prev = get().logs[t] ?? { date: t, consumed: 0, meals: [] }
    const next = { ...prev, consumed: prev.consumed + meal.calories, meals: [meal, ...prev.meals] }
    const logs = { ...get().logs, [t]: next }
    const state = { ...get(), logs }
    localStorage.setItem('diet_state', JSON.stringify({ profile: state.profile, logs: state.logs }))
    return { logs }
  }),
  removeMeal: (id) => set(() => {
    const t = get().today
    const prev = get().logs[t]
    if (!prev) return {}
    const meals = prev.meals.filter(m => m.id !== id)
    const removed = prev.meals.find(m => m.id === id)?.calories ?? 0
    const next = { ...prev, consumed: Math.max(0, prev.consumed - removed), meals }
    const logs = { ...get().logs, [t]: next }
    const state = { ...get(), logs }
    localStorage.setItem('diet_state', JSON.stringify({ profile: state.profile, logs: state.logs }))
    return { logs }
  }),
  setProfile: (profile) => set(() => {
    const next = { ...get().profile, ...profile }
    localStorage.setItem('diet_state', JSON.stringify({ profile: next, logs: get().logs }))
    return { profile: next }
  })
}))
