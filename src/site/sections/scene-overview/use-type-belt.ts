import { useEffect, useRef } from 'react'

export function useTypeBelt(moving: boolean, ready: boolean) {
  const beltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const belt = beltRef.current
    if (!belt) return

    let raf = 0

    const sync = () => {
      const card = document.querySelector<HTMLElement>('[data-overview-card][data-front]')
      if (!card) return
      const plate = card.querySelector<HTMLElement>('.cs-overview-plate') ?? card
      const box = plate.getBoundingClientRect()
      const host = belt.getBoundingClientRect()
      belt.style.setProperty('--cs-overview-hole-w', `${box.width}px`)
      belt.style.setProperty('--cs-overview-hole-h', `${box.height}px`)
      belt.style.setProperty('--cs-overview-hole-x', `${box.left - host.left}px`)
      belt.style.setProperty('--cs-overview-hole-y', `${box.top - host.top}px`)
    }

    const track = () => {
      sync()
      raf = requestAnimationFrame(track)
    }

    // Measure on the next frame once the cards leave rest, so the wind-up
    // doesn't start in the same turn as a layout read.
    if (moving) raf = requestAnimationFrame(track)
    else sync()
    window.addEventListener('resize', sync)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', sync)
    }
  }, [moving, ready])

  return beltRef
}
