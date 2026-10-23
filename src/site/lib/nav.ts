/**
 * In-page scenes. The night carousel stays parked until it comes back.
 * Addresses opens the locations cube.
 * Zones is the services list: play zone, sim racing, bar, karaoke, private room, cinema hall, hookah.
 */
export const PAGE_LINKS = [
  { id: 'cs-nav-zones', label: 'Zones' },
  { id: 'cs-nav-experience', label: 'Offers' },
  // { id: 'cs-nav-night', label: 'The night' },
  { id: 'cs-nav-addresses', label: 'Addresses' },
  { id: 'cs-nav-app', label: 'App' },
  { id: 'cs-nav-contact', label: 'Contact' },
] as const

/** Footer omits Contact. That scene is the footer itself. */
export const FOOTER_LINKS = PAGE_LINKS.filter((link) => link.id !== 'cs-nav-contact')
