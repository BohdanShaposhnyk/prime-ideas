import { useEffect, useRef, useState } from 'react'
import { BG_FADE_MS, CARD_COUNT, HOLD_MS, SNAP_MS, TENSION_HANDOFF_MS } from './config'

export type Cycle = {
  index: number
  fromIndex: number
  /** Previous wash photo, kept until its fade finishes. */
  linger: number | null
  front: number
  phase: 'rest' | 'tension' | 'snap'
  ready: boolean
}

/** Hold → tension → snap loop shared by the card deck and the type belt. */
export function useOverviewCycle(active: boolean, reduced: boolean): Cycle {
  const [index, setIndex] = useState(0)
  const [fromIndex, setFromIndex] = useState(0)
  const [linger, setLinger] = useState<number | null>(null)
  const [front, setFront] = useState(0)
  const [phase, setPhase] = useState<Cycle['phase']>('rest')
  const [ready, setReady] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (!active || reduced) return

    let cancelled = false
    let timer = 0
    let frontTimer = 0
    let lingerTimer = 0

    const hold = () => {
      if (cancelled) return
      const current = indexRef.current
      setPhase('rest')
      setFront(current)
      setFromIndex(current)
      timer = window.setTimeout(wind, HOLD_MS)
    }
    const wind = () => {
      if (cancelled) return
      setPhase('tension')
      timer = window.setTimeout(snap, TENSION_HANDOFF_MS)
    }
    const snap = () => {
      if (cancelled) return
      const current = indexRef.current
      const next = (current + 1) % CARD_COUNT
      setPhase('snap')
      setFromIndex(current)
      setIndex(next)
      setLinger(current)
      indexRef.current = next
      frontTimer = window.setTimeout(() => {
        if (!cancelled) setFront(next)
      }, Math.round(SNAP_MS * 0.42))
      window.clearTimeout(lingerTimer)
      lingerTimer = window.setTimeout(() => {
        if (!cancelled) setLinger(null)
      }, BG_FADE_MS)
      timer = window.setTimeout(hold, SNAP_MS)
    }

    timer = window.setTimeout(wind, HOLD_MS)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
      window.clearTimeout(frontTimer)
      window.clearTimeout(lingerTimer)
    }
  }, [active, reduced])

  return { index, fromIndex, linger, front, phase, ready }
}
