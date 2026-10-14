import { useEffect, useState } from 'react'

export function useOverviewFrame() {
  const [frame, setFrame] = useState({ width: 28, height: 40, radius: 14 })

  useEffect(() => {
    const read = () => {
      const vw = document.documentElement.clientWidth
      const vh = window.innerHeight
      const rem = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      const wRem = vw >= 1024 ? 18.75 : vw >= 640 ? 16.25 : 10.75
      const w = wRem * rem
      const h = w * (4 / 3)
      setFrame({
        width: (w / Math.max(vw, 1)) * 100,
        height: (h / Math.max(vh, 1)) * 100,
        radius: 14,
      })
    }
    read()
    window.addEventListener('resize', read)
    return () => window.removeEventListener('resize', read)
  }, [])

  return frame
}
