/**
 * In-page scenes.
 * Addresses opens the locations cube. Reviews opens the Google strip that follows it.
 * Questions opens the list after reviews.
 * Zones is the services list: play zone, sim racing, bar, karaoke, private room, cinema hall, hookah.
 */
export const PAGE_LINKS = [
  { id: 'cs-nav-zones', label: 'Zones' },
  { id: 'cs-nav-experience', label: 'Offers' },
  { id: 'cs-nav-addresses', label: 'Addresses' },
  { id: 'cs-nav-reviews', label: 'Reviews' },
  { id: 'cs-nav-questions', label: 'Questions' },
  { id: 'cs-nav-app', label: 'App' },
  { id: 'cs-nav-contact', label: 'Contact' },
] as const

/** Footer omits Contact. That scene is the footer itself. */
export const FOOTER_LINKS = PAGE_LINKS.filter((link) => link.id !== 'cs-nav-contact')

/** Scroll a section to the top of the snap port. Reduced motion jumps. */
export function scrollSnapPortTo(port: HTMLElement, id: string, reduced: boolean) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top - port.getBoundingClientRect().top + port.scrollTop
  port.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
}
