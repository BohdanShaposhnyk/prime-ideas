import { prefersReducedMotion } from './motion'

/** Scroll the snap port to an element. The document itself does not scroll. */
export function scrollPortTo(id: string) {
  const port = document.querySelector<HTMLElement>('[data-cs-scroll]')
  const target = document.getElementById(id)
  if (!port || !target) return
  const top = target.getBoundingClientRect().top - port.getBoundingClientRect().top + port.scrollTop
  port.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
