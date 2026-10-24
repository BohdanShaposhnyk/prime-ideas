import { useEffect, useState, type RefObject } from 'react'
import { useActivationMode } from './use-activation-mode'

const FOOTER_SCENE = '[data-scene="basement"]'

function footerCoversPort(port: HTMLElement) {
  const footer = port.querySelector(FOOTER_SCENE)
  if (!footer) return false
  const portBox = port.getBoundingClientRect()
  const box = footer.getBoundingClientRect()
  return box.top < portBox.bottom && box.bottom > portBox.top
}

/**
 * Gold bar on the bottom edge. Hidden while the footer scene is in the port,
 * where the booking button carries a short code line instead.
 */
export function ActivationStrip({ portRef }: { portRef: RefObject<HTMLDivElement | null> }) {
  const { mode } = useActivationMode()
  const [onFooter, setOnFooter] = useState(false)

  useEffect(() => {
    if (mode !== 'strip') return
    const port = portRef.current
    if (!port) return

    const sync = () => {
      const next = footerCoversPort(port)
      setOnFooter((current) => (current === next ? current : next))
    }
    sync()
    port.addEventListener('scroll', sync, { passive: true })

    const home = port.querySelector('#cs-nav-contact') ?? port
    const observer = new MutationObserver(sync)
    observer.observe(home, { childList: true })

    return () => {
      port.removeEventListener('scroll', sync)
      observer.disconnect()
    }
  }, [mode, portRef])

  if (mode !== 'strip' || onFooter) return null

  return (
    <p className="pointer-events-none fixed inset-x-0 bottom-0 z-50 bg-[var(--cs-gold)] px-3 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] text-balance text-center font-[family-name:var(--cs-body)] text-[0.62rem] leading-tight text-[var(--cs-gold-ink)] sm:text-[0.68rem]">
      Booking is powered by SENET.id. Use code “PRIME” to activate your account and get more
    </p>
  )
}
