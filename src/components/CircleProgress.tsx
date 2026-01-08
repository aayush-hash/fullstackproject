type Props = {
  value: number
  max: number
  size?: number
}

export default function CircleProgress({ value, max, size = 160 }: Props) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const radius = (size - 16) / 2
  const circumference = 2 * Math.PI * radius
  const dash = (pct / 100) * circumference

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={radius} stroke="#e2e8f0" strokeWidth="12" fill="none" />
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          stroke="#0ea5e9"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${dash} ${circumference}`}
          transform={`rotate(-90 ${size/2} ${size/2})`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-3xl font-bold text-slate-800">{Math.round(value)}</div>
          <div className="text-xs text-slate-500">of {max} kcal</div>
        </div>
      </div>
    </div>
  )
}
