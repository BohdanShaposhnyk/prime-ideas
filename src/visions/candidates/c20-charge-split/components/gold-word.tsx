import { useEffect, useRef, useState, type RefObject } from 'react'
import { usePrefersReducedMotion } from '../hooks/media'

/**
 * Gold sheen is a CSS background sweep. It is attached only while the node
 * sits inside the snap port, so off-screen headings do not paint every frame.
 */
export function useGoldShine(ref: RefObject<Element | null>) {
  const reduced = usePrefersReducedMotion()
  const [live, setLive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const root = el.closest<Element>('[data-cs-scroll]')
    const io = new IntersectionObserver(
      ([entry]) => setLive(Boolean(entry?.isIntersecting)),
      { root, threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced, ref])

  return !reduced && live
}

/** Gold lockup word with a passing sheen. `block` keeps a heading line of its own. */
export function GoldWord({
  children,
  block = false,
  className = '',
}: {
  children: string
  block?: boolean
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const live = useGoldShine(ref)

  return (
    <span
      ref={ref}
      className={`cs-gold-word${block ? ' cs-gold-word-block' : ''}${live ? ' cs-gold-live' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </span>
  )
}
