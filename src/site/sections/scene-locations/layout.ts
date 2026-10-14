export const BASE_EXPAND = 0.7
/** Active card share of the row. Above this, inactive cards take the leftover. */
export const CONTENT_CAP_PX = 56 * 16

export function expandRatioFor(galleryWidth: number) {
  if (galleryWidth <= 0 || galleryWidth * BASE_EXPAND <= CONTENT_CAP_PX) return BASE_EXPAND
  return Math.min(0.9, Math.max(0.2, CONTENT_CAP_PX / galleryWidth))
}

export function galleryWidthOf(section: HTMLElement) {
  const inset = window.matchMedia('(min-width: 640px)').matches ? 12 : 8
  return section.clientWidth - inset * 2
}
