import { useRef } from 'react'
import SideRays from '@/site/bits/SideRays'
import badgeAppStore from '../assets/badge-app-store.svg'
import badgeGooglePlay from '../assets/badge-google-play.png'
import mockupDesktop from '../assets/mockup-iphone-desktop.webp'
import mockupPortrait from '../assets/mockup-iphone-portrait.webp'
import { usePrefersReducedMotion } from '../hooks/media'
import { useSceneParallax } from '../hooks/scene-parallax'
import { lockupClass, supportClass } from '../lib/palette'

const APP_STORE =
  'https://apps.apple.com/app/senet-id/id6748773918'
const PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.enestech.senetid'

const badgeLinkClass =
  'inline-block transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cs-ice)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cs-pitch)]'

function AppCopy({
  supportClassName,
  badgesClassName,
}: {
  supportClassName: string
  badgesClassName?: string
}) {
  return (
    <>
      <div>
        <h2 className={lockupClass}>
          <span className="block">Ready when</span>
          <span className="block">you are</span>
        </h2>
        <p className={supportClassName}>
          Book ahead, check availability and keep Prime with you.
        </p>
      </div>
      <div className={badgesClassName}>
        <StoreBadges />
      </div>
    </>
  )
}

function StoreBadges() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={APP_STORE}
        target="_blank"
        rel="noopener noreferrer"
        className={badgeLinkClass}
      >
        <img
          src={badgeAppStore}
          alt="Download on the App Store"
          className="h-10 w-auto"
          draggable={false}
        />
      </a>
      <a
        href={PLAY_STORE}
        target="_blank"
        rel="noopener noreferrer"
        className={badgeLinkClass}
      >
        <img
          src={badgeGooglePlay}
          alt="Get it on Google Play"
          className="h-10 w-auto"
          draggable={false}
        />
      </a>
    </div>
  )
}

export default function SceneApp() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  useSceneParallax(rootRef, !reduced)

  return (
    <section
      ref={rootRef}
      aria-label="Ready when you are"
      data-scene="app"
      className="cs-scene cs-px relative isolate overflow-hidden bg-[var(--cs-pitch)] text-[var(--cs-ice)]"
    >
      <div data-placeholder="visual" className="cs-px-ground pointer-events-none absolute inset-0" aria-hidden>
        <SideRays
          speed={2.4}
          rayColor1="#7EA0FF"
          rayColor2="#D4C4FF"
          intensity={2.2}
          spread={0.8}
          origin="top-right"
          tilt={-12}
          saturation={1.4}
          blend={0.65}
          falloff={1.05}
          opacity={1}
        />
      </div>

      <div aria-hidden className="cs-px-veil pointer-events-none absolute inset-0 z-[15] bg-black" />

      {/* Desktop padded layout */}
      <div className="relative mx-auto hidden h-full max-w-[88rem] px-5 py-10 sm:px-8 sm:py-12 md:flex lg:px-12 lg:py-14">
        <div className="grid h-auto w-full grid-cols-2 items-stretch gap-12 self-center lg:gap-16">
          <div className="cs-px-copy relative z-20 flex min-w-0 flex-col justify-center gap-10 lg:gap-12">
            <AppCopy supportClassName={`mt-4 max-w-[22rem] sm:mt-5 ${supportClass}`} />
          </div>

          <div className="cs-px-plane relative z-10 min-h-0">
            <img
              src={mockupDesktop}
              alt="SENET ID login on iPhone"
              className="absolute top-0 right-0 h-[160%] w-auto max-w-none select-none"
              decoding="async"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Mobile — padded copy, full-bleed mockup on bottom edge */}
      <div className="relative flex h-full flex-col md:hidden">
        <div className="cs-px-copy relative z-20 shrink-0 px-5 pt-10 sm:px-8">
          <AppCopy
            supportClassName={`mt-4 max-w-[22rem] ${supportClass}`}
            badgesClassName="mt-6"
          />
        </div>

        <div className="cs-px-plane relative z-10 mt-auto w-full shrink-0 overflow-hidden">
          <img
            src={mockupPortrait}
            alt="SENET ID on iPhone"
            className="block h-auto w-full max-w-none select-none"
            style={{ marginBottom: '-48%' }}
            decoding="async"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}
