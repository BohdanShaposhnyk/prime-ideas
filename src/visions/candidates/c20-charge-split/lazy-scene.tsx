import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/**
 * Mount children when they approach the viewport. Reserve height so snap /
 * scroll position does not jump when the scene lands.
 */
export default function LazyScene({
  children,
  minHeight = '100lvh',
}: {
  children: ReactNode
  minHeight?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setShow(true)
        io.disconnect()
      },
      { rootMargin: '120% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ minHeight } as CSSProperties}>
      {show ? children : null}
    </div>
  )
}
