import { useEffect, useState, type RefObject } from 'react'

const SNAP_SCROLL = '[data-cs-scroll]'

/** The page scroller. Viewport observers miss it because the document itself does not scroll. */
export function snapScrollRoot(node: Element | null): Element | null {
  return node?.closest(SNAP_SCROLL) ?? null
}

export function intersectsSnapPort(node: Element): boolean {
  const box = node.getBoundingClientRect()
  if (box.width <= 0 || box.height <= 0) return false
  const host = snapScrollRoot(node)?.getBoundingClientRect()
  const top = (host?.top ?? 0) + 1
  const bottom = (host?.bottom ?? window.innerHeight) - 1
  return box.bottom > top && box.top < bottom
}

/**
 * Follow whether `node` sits inside the snap port.
 * The first callback is asynchronous; use `intersectsSnapPort` for the starting value.
 */
export function observeSnapPort(
  node: Element,
  onChange: (visible: boolean) => void,
  options: { threshold?: number; rootMargin?: string } = {},
): () => void {
  const io = new IntersectionObserver(
    ([entry]) => onChange(Boolean(entry?.isIntersecting)),
    {
      root: snapScrollRoot(node),
      threshold: options.threshold ?? 0,
      rootMargin: options.rootMargin ?? '-1px 0px',
    },
  )
  io.observe(node)
  return () => io.disconnect()
}

export function useSnapInView<T extends Element>(
  ref: RefObject<T | null>,
  options: { threshold?: number; rootMargin?: string } = {},
): boolean {
  const { threshold = 0, rootMargin } = options
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    return observeSnapPort(el, setInView, { threshold, rootMargin })
  }, [ref, threshold, rootMargin])

  return inView
}
