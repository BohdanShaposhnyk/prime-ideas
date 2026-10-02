import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/**
 * Mount children when they approach the viewport. Reserve height so snap /
 * scroll position does not jump when the scene lands.
 */
export default function LazyScene({
  children,
  minHeight = 'var(--cs-h, 100svh)',
}: {
  children: ReactNode
  minHeight?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let shown = false
    let io: IntersectionObserver | null = null
    let fallback = 0
    // The port clips overflow, so a viewport observer never sees scenes that
    // are still below it — and mandatory snap then refuses to scroll there.
    // A crawler that runs JS but never scrolls that port still needs the copy,
    // so the scene also mounts on a short timer.
    const root = el.closest<Element>('[data-cs-scroll]')
    const reveal = () => {
      if (shown) return
      shown = true
      setShow(true)
      io?.disconnect()
      window.clearTimeout(fallback)
    }
    io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        reveal()
      },
      { root, rootMargin: '120% 0px' },
    )
    io.observe(el)
    fallback = window.setTimeout(reveal, 1500)
    return () => {
      shown = true
      io?.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  return (
    <div ref={ref} style={{ minHeight } as CSSProperties}>
      {show ? children : null}
    </div>
  )
}
