import SideRays from '@/shared/bits/SideRays'
import badgeAppStore from '../assets/badge-app-store.svg'
import badgeGooglePlay from '../assets/badge-google-play.png'
import mockupDesktop from '../assets/mockup-iphone-desktop.webp'
import mockupPortrait from '../assets/mockup-iphone-portrait.webp'
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
  return (
    <section
      aria-label="Ready when you are"
      data-scene="app"
      className="cs-scene relative isolate overflow-hidden bg-[var(--cs-pitch)] text-[var(--cs-ice)]"
    >
      <div data-placeholder="visual" className="pointer-events-none absolute inset-0" aria-hidden>
        <SideRays
          speed={2.4}
          rayColor1="#7EA0FF"
          rayColor2="#D4C4FF"
          intensity={3.2}
          spread={2.8}
          origin="top-right"
          tilt={-12}
          saturation={1.4}
          blend={0.65}
          falloff={1.05}
          opacity={1}
        />
      </div>

      {/* Desktop padded layout */}
      <div className="relative z-10 mx-auto hidden h-full max-w-[88rem] px-5 py-10 sm:px-8 sm:py-12 md:flex lg:px-12 lg:py-14">
        <div className="grid h-auto w-full grid-cols-2 items-stretch gap-12 self-center lg:gap-16">
          <div className="flex min-w-0 flex-col justify-center gap-10 lg:gap-12">
            <AppCopy supportClassName={`mt-4 max-w-[22rem] sm:mt-5 ${supportClass}`} />
          </div>

          <div className="relative min-h-0">
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
      <div className="relative z-10 flex h-full flex-col md:hidden">
        <div className="shrink-0 px-5 pt-10 sm:px-8">
          <AppCopy
            supportClassName={`mt-4 max-w-[22rem] ${supportClass}`}
            badgesClassName="mt-6"
          />
        </div>

        <div className="mt-auto w-full shrink-0 overflow-hidden">
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
