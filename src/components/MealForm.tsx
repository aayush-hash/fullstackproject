import { useRef, useState } from 'react'
import { useDietStore } from '../store'

export default function MealForm() {
  const addMeal = useDietStore(s => s.addMeal)
  const [name, setName] = useState('')
  const [cal, setCal] = useState<number | ''>('')
  const fileRef = useRef<HTMLInputElement>(null)
  const camRef = useRef<HTMLVideoElement>(null)
  const [streaming, setStreaming] = useState(false)
  const [photo, setPhoto] = useState<string | undefined>()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !cal) return
    addMeal({ name, calories: Number(cal), photo })
    setName(''); setCal(''); setPhoto(undefined)
    if (streaming) stopCamera()
  }

  const openFile = () => fileRef.current?.click()

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (camRef.current) {
        camRef.current.srcObject = stream
        await camRef.current.play()
        setStreaming(true)
      }
    } catch (e) {
      console.error('Camera error', e)
    }
  }
  const stopCamera = () => {
    const video = camRef.current
    const stream = video?.srcObject as MediaStream | null
    stream?.getTracks().forEach(t => t.stop())
    if (video) video.srcObject = null
    setStreaming(false)
  }
  const capture = () => {
    const video = camRef.current
    if (!video) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(video, 0, 0)
    const url = canvas.toDataURL('image/jpeg')
    setPhoto(url)
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Meal name" className="col-span-2 border rounded-lg px-3 py-2" />
        <input value={cal} onChange={e=>setCal(e.target.value ? Number(e.target.value) : '')} placeholder="kcal" inputMode="numeric" className="border rounded-lg px-3 py-2" />
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={openFile} className="btn btn-outline">Add image</button>
        {!streaming ? (
          <button type="button" onClick={startCamera} className="btn btn-outline">Open camera</button>
        ) : (
          <>
            <button type="button" onClick={capture} className="btn btn-outline">Capture</button>
            <button type="button" onClick={stopCamera} className="btn btn-outline">Close camera</button>
          </>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => {
          const file = e.target.files?.[0]
          if (!file) return
          const reader = new FileReader()
          reader.onload = () => setPhoto(String(reader.result))
          reader.readAsDataURL(file)
        }} />
      </div>
      {streaming && (
        <div className="rounded-xl overflow-hidden border">
          <video ref={camRef} className="w-full" playsInline muted />
        </div>
      )}
      {photo && (
        <img src={photo} alt="meal" className="w-full rounded-xl border" />
      )}
      <div className="flex justify-end">
        <button type="submit" className="btn">Add meal</button>
      </div>
    </form>
  )
}
