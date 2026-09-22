import SideRays from '@/shared/bits/SideRays'
import mockupDesktop from '../assets/mockup-iphone-desktop.png'
import mockupPortrait from '../assets/mockup-iphone-portrait.png'

const APP_STORE =
  'https://apps.apple.com/app/senet-id/id6748773918'
const PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.enestech.senetid'

const badgeLinkClass =
  'inline-block transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black'

function BadgeAppStore({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 40"
      width="135"
      height="45"
      role="img"
      aria-label="Download on the App Store"
    >
      <rect width="120" height="40" rx="6" fill="#000" stroke="#A6A6A6" strokeWidth="0.6" />
      <path
        fill="#fff"
        d="M24.75 20.3c0-2.1 1.72-3.12 1.8-3.17-1-1.45-2.52-1.65-3.05-1.67-1.28-.13-2.52.76-3.17.76-.66 0-1.67-.74-2.75-.72-1.39.02-2.68.82-3.39 2.07-1.46 2.53-.37 6.26 1.04 8.31.69 1 1.5 2.12 2.56 2.08 1.04-.04 1.43-.66 2.69-.66 1.25 0 1.61.66 2.72.64 1.13-.02 1.84-1.01 2.52-2.02.79-1.14 1.11-2.25 1.13-2.31-.02-.01-2.15-.83-2.17-3.31zm-2.04-5.98c.56-.69.95-1.64.84-2.6-.82.03-1.84.55-2.43 1.23-.53.61-.99 1.6-.87 2.53.92.07 1.87-.46 2.46-1.16z"
      />
      <text
        x="34.5"
        y="15.2"
        fill="#fff"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="5.2"
      >
        Download on the
      </text>
      <text
        x="34.5"
        y="28.5"
        fill="#fff"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="12.5"
        fontWeight="600"
      >
        App Store
      </text>
    </svg>
  )
}

function BadgeGooglePlay({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 135 40"
      width="152"
      height="45"
      role="img"
      aria-label="Get it on Google Play"
    >
      <rect width="135" height="40" rx="6" fill="#000" stroke="#A6A6A6" strokeWidth="0.6" />
      <g transform="translate(10.5 8.2)">
        <path fill="#EA4335" d="M.7 1.05 13.2 12.1.7 23.1c-.45-.35-.7-.9-.7-1.5V2.55c0-.6.25-1.15.7-1.5z" />
        <path fill="#FBBC04" d="m13.2 12.1 2.85-2.55L5.3.55C4.55.1 3.55.15 2.85.6L13.2 12.1z" />
        <path fill="#4285F4" d="M13.2 12.1 2.85 23.55c.7.45 1.7.5 2.45.05l10.75-8.95-2.85-2.55z" />
        <path fill="#34A853" d="m16.05 9.55-2.85 2.55 2.85 2.55c.85-.7.85-2 0-2.7-.25-.2-.55-.35-.9-.4z" />
      </g>
      <text
        x="36"
        y="14.5"
        fill="#fff"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="4.8"
        letterSpacing="0.55"
      >
        ANDROID APP ON
      </text>
      <text
        x="36"
        y="28.2"
        fill="#fff"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="11.5"
        fontWeight="600"
      >
        Google Play
      </text>
    </svg>
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
        <BadgeAppStore />
      </a>
      <a
        href={PLAY_STORE}
        target="_blank"
        rel="noopener noreferrer"
        className={badgeLinkClass}
      >
        <BadgeGooglePlay />
      </a>
    </div>
  )
}

export default function SceneApp() {
  return (
    <section
      aria-label="Ready when you are"
      data-scene="app"
      className="relative isolate h-dvh overflow-hidden bg-black text-[var(--cs-ice)]"
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
            <div>
              <h2 className="font-[family-name:var(--cs-display)] text-[clamp(2.8rem,12vw,5.6rem)] leading-[0.86] tracking-[0.02em] text-[var(--cs-ice)] uppercase">
                <span className="block">Ready when</span>
                <span className="block">you are</span>
              </h2>
              <p className="mt-4 max-w-[22rem] font-[family-name:var(--cs-body)] text-[clamp(0.95rem,2.2vw,1.15rem)] font-medium leading-snug tracking-[0.02em] text-[var(--cs-caption)] sm:mt-5">
                Book ahead, check availability and keep Prime with you.
              </p>
            </div>
            <StoreBadges />
          </div>

          <div className="relative min-h-0">
            <img
              src={mockupDesktop}
              alt="SENET ID login on iPhone"
              className="absolute inset-y-0 right-0 h-full w-auto max-w-full object-contain object-right select-none"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Mobile — padded copy, full-bleed mockup on bottom edge */}
      <div className="relative z-10 flex h-full flex-col md:hidden">
        <div className="shrink-0 px-5 pt-10 sm:px-8">
          <h2 className="font-[family-name:var(--cs-display)] text-[clamp(2.8rem,12vw,5.6rem)] leading-[0.86] tracking-[0.02em] text-[var(--cs-ice)] uppercase">
            <span className="block">Ready when</span>
            <span className="block">you are</span>
          </h2>
          <p className="mt-4 max-w-[22rem] font-[family-name:var(--cs-body)] text-[clamp(0.95rem,2.2vw,1.15rem)] font-medium leading-snug tracking-[0.02em] text-[var(--cs-caption)]">
            Book ahead, check availability and keep Prime with you.
          </p>
          <div className="mt-6">
            <StoreBadges />
          </div>
        </div>

        <div className="mt-auto w-full shrink-0 overflow-hidden">
          <img
            src={mockupPortrait}
            alt="SENET ID on iPhone"
            className="block h-auto w-full max-w-none select-none"
            style={{ marginBottom: '-48%' }}
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}
