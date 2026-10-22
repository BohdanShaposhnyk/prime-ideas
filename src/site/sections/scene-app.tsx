import { useRef } from 'react'
import SideRays from '@/site/bits/SideRays'
import badgeAppStore from '../assets/badge-app-store.svg'
import badgeGooglePlay from '../assets/badge-google-play.png'
import mockup from '../assets/senet-mockup.webp'
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/media'
import { useSceneParallax } from '../hooks/scene-parallax'
import { lockupClass, lockupToSupportClass, supportClass } from '../lib/palette'

const APP_STORE =
  'https://apps.apple.com/app/senet-id/id6748773918'
const PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.enestech.senetid'

/** Same breakpoint as the desktop layout below. */
const DESKTOP_QUERY = '(min-width: 768px)'
// Distance in the ray shader is divided by height, so a portrait screen
// stays bright into the lower left. A steeper curve restores that corner.
const RAY_FALLOFF_DESKTOP = 1.05
const RAY_FALLOFF_MOBILE = 2.65

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
          SENET is the partner app for Prime. New guests get 50 zł on their account, or their first hour free.
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
  const desktop = useMediaQuery(DESKTOP_QUERY)
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
          falloff={desktop ? RAY_FALLOFF_DESKTOP : RAY_FALLOFF_MOBILE}
          opacity={1}
        />
      </div>

      <div aria-hidden className="cs-px-veil pointer-events-none absolute inset-0 z-[15] bg-black" />

      {/* Desktop — phone on the right, bottom third past the scene edge */}
      <div className="relative mx-auto hidden h-full w-full max-w-[88rem] md:block">
        <div className="cs-px-copy relative z-20 flex h-full w-1/2 flex-col justify-center gap-10 px-8 py-12 lg:gap-12 lg:px-12 lg:py-14">
          <AppCopy supportClassName={`${lockupToSupportClass} max-w-[22rem] ${supportClass}`} />
        </div>
        <div className="cs-px-plane pointer-events-none absolute inset-y-0 right-0 z-10 w-1/2">
          <img
            src={mockup}
            alt="SENET, the partner app, on iPhone"
            className="absolute right-4 bottom-0 w-[min(86%,62svh)] max-w-none translate-y-[33%] select-none lg:right-8"
            decoding="async"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>

      {/* Mobile — page padding on three sides, phone cut by the bottom edge */}
      <div className="relative flex h-full flex-col md:hidden">
        <div className="cs-px-copy relative z-20 shrink-0 px-5 pt-10 sm:px-8">
          <AppCopy
            supportClassName={`${lockupToSupportClass} max-w-[22rem] ${supportClass}`}
            badgesClassName="mt-6"
          />
        </div>

        <div className="cs-px-plane relative z-10 mt-5 shrink-0 px-5 sm:mt-8 sm:px-8">
          <img
            src={mockup}
            alt="SENET, the partner app, on iPhone"
            className="block h-auto w-full select-none"
            decoding="async"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}
