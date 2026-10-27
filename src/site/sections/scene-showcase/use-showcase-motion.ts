import { useEffect, useRef, useState } from 'react'
import { intersectsSnapPort, observeSnapPort, snapScrollRoot } from '@/site/hooks/snap-in-view'
import { clamp } from '../../lib/math'
import { prefersReducedMotion } from '../../lib/motion'
import { CARDS, STEP_HOLD } from './config'

function easeRoll(u: number) {
  const x = clamp(u, 0, 1)
  return x * x * (3 - 2 * x)
}

function motionAt(t: number) {
  const last = CARDS.length - 1
  if (last <= 0) return { progress: 0, word: 0 }
  const x = clamp(t, 0, 1) * last
  const i = Math.min(Math.floor(x), last - 1)
  const u = x - i
  if (u <= STEP_HOLD) return { progress: i, word: i }
  const roll = (u - STEP_HOLD) / (1 - STEP_HOLD)
  return {
    progress: i + easeRoll(roll),
    word: roll < 0.5 ? i : i + 1,
  }
}

/**
 * Scroll progress for the spiral and the caption word.
 * The spiral reads `drivenProgressRef` on its own frame, so the ref updates
 * on the scroll event. The word waits one frame: it is React state, and the
 * stills fade on CSS, so it does not need to land in the same turn.
 */
export function useShowcaseMotion() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const drivenProgressRef = useRef(0)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    if (!section || !sticky) return

    const port = snapScrollRoot(section)
    let frame = 0
    let lastIndex = -1
    let lastProgress = Number.NaN
    let visible = false

    const read = () => {
      const rect = section.getBoundingClientRect()
      const portTop = port?.getBoundingClientRect().top ?? 0
      const vh = sticky.clientHeight || port?.clientHeight || window.innerHeight
      const total = Math.max(section.offsetHeight - vh, 1)
      const t = clamp(-(rect.top - portTop) / total, 0, 1)
      return motionAt(t)
    }

    const publish = () => {
      const motion = read()
      const progress = prefersReducedMotion() ? Math.round(motion.progress) : motion.progress
      if (progress === lastProgress && motion.word === lastIndex) return
      lastProgress = progress
      drivenProgressRef.current = progress
      if (motion.word !== lastIndex) {
        lastIndex = motion.word
        setWordIndex(motion.word)
      }
    }

    const onScroll = () => {
      if (!visible) return
      const motion = read()
      const progress = prefersReducedMotion() ? Math.round(motion.progress) : motion.progress
      if (progress !== lastProgress) {
        lastProgress = progress
        drivenProgressRef.current = progress
      }
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        if (!visible) return
        const next = read()
        if (next.word !== lastIndex) {
          lastIndex = next.word
          setWordIndex(next.word)
        }
      })
    }

    const stopWatch = observeSnapPort(sticky, (hit) => {
      visible = hit
      if (hit) publish()
    })
    if (intersectsSnapPort(sticky)) {
      visible = true
      publish()
    }

    const scroller: EventTarget = port ?? window
    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      visible = false
      stopWatch()
      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return { sectionRef, stickyRef, drivenProgressRef, wordIndex }
}
