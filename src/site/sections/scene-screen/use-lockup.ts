import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '@/site/lib/gsap'
import { PRIME_LAG, WORD_DURATION, WORD_STAGGER } from './config'

export function useLockupPlay(play: boolean, delay: number, coarse: boolean, reduced: boolean) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [showPrime, setShowPrime] = useState(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const words = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-cs-word]'))
    if (words.length === 0) return

    const useBlur = !reduced && !coarse

    if (!play) {
      queueMicrotask(() => setShowPrime(false))
      gsap.killTweensOf(words)
      gsap.set(words, { opacity: 0, filter: 'none' })
      return
    }

    if (reduced || coarse) {
      gsap.set(words, { opacity: 1, filter: 'none' })
      queueMicrotask(() => setShowPrime(true))
      return
    }

    gsap.set(words, { opacity: 0, filter: useBlur ? 'blur(10px)' : 'none' })
    queueMicrotask(() => setShowPrime(false))

    const tween = gsap.to(words, {
      opacity: 1,
      ...(useBlur ? { filter: 'blur(0px)' } : {}),
      duration: WORD_DURATION,
      stagger: WORD_STAGGER,
      ease: 'power2.out',
      delay,
      overwrite: true,
    })
    const primeAt = (delay + WORD_STAGGER * (words.length - 1) + PRIME_LAG) * 1000
    const timer = window.setTimeout(() => setShowPrime(true), primeAt)

    return () => {
      tween.kill()
      window.clearTimeout(timer)
    }
  }, [play, delay, coarse, reduced])

  return { rootRef, showPrime }
}
