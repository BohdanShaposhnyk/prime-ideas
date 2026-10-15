export type PrimeClick = {
  action: 'book' | 'call' | 'telegram' | 'maps' | 'store' | 'franchise'
  section: string
  label: string
  venue?: string
}

type ClickWindow = Window & {
  dataLayer?: Record<string, unknown>[]
  gtag?: (...args: unknown[]) => void
}

/** Records a conversion click for whatever analytics is on the page. */
export function trackClick(detail: PrimeClick) {
  if (typeof window === 'undefined') return
  const payload = {
    action: detail.action,
    section: detail.section,
    label: detail.label,
    ...(detail.venue ? { venue: detail.venue } : {}),
  }
  window.dispatchEvent(new CustomEvent('prime:click', { detail: payload }))
  const host = window as ClickWindow
  host.dataLayer?.push({ event: 'prime_click', ...payload })
  host.gtag?.('event', 'prime_click', payload)
}
