import { useEffect, useState } from 'react'
import { BookNightButton } from './book-night'

const HIDDEN_ON = new Set(['hero', 'experience-offers'])

/** Slim book control. Hidden on the hero and the offer scene, which already carry the action. */
export function PersistentBook() {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const port = document.querySelector<HTMLElement>('[data-cs-scroll]')
    if (!port) return

    const update = () => {
      const mid = port.getBoundingClientRect().top + port.clientHeight * 0.45
      let current = ''
      for (const scene of port.querySelectorAll<HTMLElement>('[data-scene]')) {
        const box = scene.getBoundingClientRect()
        if (box.top <= mid && box.bottom >= mid) {
          current = scene.dataset.scene ?? ''
          break
        }
      }
      setHidden(HIDDEN_ON.has(current))
    }

    update()
    port.addEventListener('scroll', update, { passive: true })
    return () => port.removeEventListener('scroll', update)
  }, [])

  if (hidden) return null

  return (
    <div className="pointer-events-none fixed top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] z-40">
      <div className="pointer-events-auto">
        <BookNightButton size="sm" section="dock">
          Book
        </BookNightButton>
      </div>
    </div>
  )
}
