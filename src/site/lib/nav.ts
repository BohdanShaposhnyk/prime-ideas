/**
 * In-page scenes.
 * Addresses opens locations. Reviews opens the Google strip that follows it.
 * Questions opens the list after reviews.
 * Zones is the services list: play zone, sim racing, bar, karaoke, private room, cinema hall, hookah.
 */
import { t } from '../copy/translate'

export const PAGE_LINKS = [
  { id: 'cs-nav-zones', label: t('nav.zones') },
  { id: 'cs-nav-offers', label: t('nav.offers') },
  { id: 'cs-nav-addresses', label: t('nav.addresses') },
  { id: 'cs-nav-reviews', label: t('nav.reviews') },
  { id: 'cs-nav-questions', label: t('nav.questions') },
  { id: 'cs-nav-app', label: t('nav.app') },
  { id: 'cs-nav-contact', label: t('nav.contact') },
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
