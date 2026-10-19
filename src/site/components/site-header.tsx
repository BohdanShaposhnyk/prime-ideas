import { useEffect, useState, type RefObject } from 'react'
import { usePrefersReducedMotion } from '../hooks/media'
import { HeroMark } from '../sections/hero/mark'

const LINKS = [
  { id: 'cs-nav-photos', label: 'Photos' },
  { id: 'cs-nav-experience', label: 'Experience' },
  // { id: 'cs-nav-night', label: 'The night' },
  { id: 'cs-nav-addresses', label: 'Addresses' },
  { id: 'cs-nav-app', label: 'App' },
  { id: 'cs-nav-contact', label: 'Contact' },
] as const

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.75">
      {open ? (
        <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  )
}

/**
 * Viewport chrome over the snap port. Hides while the port scrolls down and
 * returns on the way up, so full-bleed scenes stay clear.
 */
export function SiteHeader({ portRef }: { portRef: RefObject<HTMLDivElement | null> }) {
  const reduced = usePrefersReducedMotion()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const port = portRef.current
    if (!port) return
    let last = port.scrollTop

    const onScroll = () => {
      const y = port.scrollTop
      const dy = y - last
      last = y
      if (open || y < 24) setHidden(false)
      else if (dy > 6) setHidden(true)
      else if (dy < -6) setHidden(false)
    }

    port.addEventListener('scroll', onScroll, { passive: true })
    return () => port.removeEventListener('scroll', onScroll)
  }, [open, portRef])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const scrollToId = (id: string) => {
    const port = portRef.current
    const el = document.getElementById(id)
    if (!port || !el) return
    setOpen(false)
    const top = el.getBoundingClientRect().top - port.getBoundingClientRect().top + port.scrollTop
    port.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
  }

  const tucked = hidden && !open

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/45"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.62),rgba(0,0,0,0.28)_55%,transparent)] pt-[env(safe-area-inset-top)] transition-transform duration-300 ease-out motion-reduce:transition-none ${tucked ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="grid h-[var(--cs-header-bar)] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            aria-label="Prime"
            className="justify-self-start rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cs-ice)]"
            onClick={() => scrollToId('cs-nav-hero')}
          >
            <HeroMark />
          </button>
          <p className="text-center font-[family-name:var(--cs-body)] text-[0.62rem] tracking-[0.12em] text-[var(--cs-ice)] uppercase whitespace-nowrap [text-shadow:0_1px_12px_rgba(0,0,0,0.75)] sm:text-[length:var(--cs-text-kicker)] sm:tracking-[var(--cs-track-micro)]">
            Warsaw · Wrocław
          </p>
          <button
            type="button"
            className="justify-self-end inline-flex size-11 items-center justify-center rounded-full text-[var(--cs-ice)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cs-ice)]"
            aria-expanded={open}
            aria-controls="cs-site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
        <nav
          id="cs-site-menu"
          aria-label="Page"
          hidden={!open}
          className="mx-4 mb-3 rounded-[var(--cs-radius-panel)] border border-[color-mix(in_srgb,var(--cs-ice)_14%,transparent)] bg-[var(--cs-pitch)] px-2 py-2 sm:mx-6"
        >
          <ul className="flex flex-col">
            {LINKS.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  className="w-full rounded-xl px-3 py-3 text-left font-[family-name:var(--cs-body)] text-[0.95rem] text-[var(--cs-ice)] hover:bg-[color-mix(in_srgb,var(--cs-ice)_8%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cs-ice)]"
                  onClick={() => scrollToId(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  )
}
