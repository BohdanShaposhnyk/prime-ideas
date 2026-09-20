import CircularGallery from '@/shared/bits/CircularGallery'

/** Swap-ready arena plates for the book gallery (palette stand-ins). */
const ITEMS = [
  plate(
    'rigs',
    `<radialGradient id="g" cx="42%" cy="38%" r="62%">
      <stop offset="0%" stop-color="#0A2478"/>
      <stop offset="55%" stop-color="#071A52"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    <rect width="900" height="1200" fill="url(#g)"/>
    <rect x="90" y="160" width="210" height="140" rx="10" fill="#161A24"/>
    <rect x="345" y="140" width="210" height="170" rx="10" fill="#0C0E14"/>
    <rect x="600" y="170" width="210" height="150" rx="10" fill="#161A24"/>
    <rect x="90" y="430" width="210" height="150" rx="10" fill="#0C0E14"/>
    <rect x="345" y="410" width="210" height="180" rx="10" fill="#161A24"/>
    <rect x="600" y="440" width="210" height="150" rx="10" fill="#0C0E14"/>
    <rect x="200" y="720" width="500" height="8" fill="#A9BBE0" opacity="0.28"/>`,
  ),
  plate(
    'well',
    `<rect width="900" height="1200" fill="#000000"/>
    <rect x="0" y="0" width="900" height="110" fill="#000"/>
    <rect x="0" y="1090" width="900" height="110" fill="#000"/>
    <rect x="80" y="150" width="740" height="900" fill="#071A52"/>
    <rect x="140" y="220" width="620" height="760" fill="#0A2478" opacity="0.85"/>
    <rect x="220" y="300" width="460" height="520" fill="#F4F7FF" opacity="0.16"/>
    <rect x="0" y="0" width="900" height="110" fill="#0C0E14"/>
    <rect x="0" y="1090" width="900" height="110" fill="#0C0E14"/>`,
  ),
  plate(
    'charge',
    `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#000000"/>
      <stop offset="42%" stop-color="#071A52"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    <rect width="900" height="1200" fill="url(#g)"/>
    <polyline points="180,80 260,420 210,420 340,1120 280,520 330,520 220,80" fill="#F4F7FF" opacity="0.55"/>
    <polyline points="520,40 580,380 540,380 640,1180" fill="none" stroke="#A9BBE0" stroke-width="10" opacity="0.45"/>
    <polyline points="720,120 760,500 730,500 800,1100" fill="none" stroke="#0A2478" stroke-width="16"/>`,
  ),
  plate(
    'floor',
    `<rect width="900" height="1200" fill="#000000"/>
    <rect x="0" y="640" width="900" height="560" fill="#071A52"/>
    <rect x="0" y="640" width="900" height="24" fill="#A9BBE0" opacity="0.35"/>
    <rect x="60" y="720" width="780" height="8" fill="#F4F7FF" opacity="0.18"/>
    <rect x="120" y="790" width="660" height="6" fill="#A9BBE0" opacity="0.14"/>
    <rect x="200" y="180" width="28" height="420" fill="#0A2478"/>
    <rect x="430" y="120" width="40" height="500" fill="#0A2478" opacity="0.7"/>
    <rect x="680" y="220" width="22" height="380" fill="#161A24"/>`,
  ),
].map(image => ({ image, text: '' }))

function plate(id: string, body: string) {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
      <defs>
        <filter id="${id}-grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/></filter>
      </defs>
      ${body}
      <rect width="900" height="1200" filter="url(#${id}-grain)" opacity="0.14"/>
      <rect width="900" height="1200" fill="none" stroke="#A9BBE0" stroke-opacity="0.22" stroke-width="18"/>
    </svg>`,
  )}`
}

export default function SceneBook() {
  return (
    <section
      aria-labelledby="cs-book-title"
      data-scene="book"
      data-scroll="book-lockup"
      className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[var(--cs-pitch)] px-5 py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 42% at 50% -8%, #0A2478 0%, transparent 62%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
        aria-hidden
      />

      {/* swap: book circular gallery */}
      <div data-placeholder="visual" className="absolute inset-0 z-10">
        <CircularGallery
          items={ITEMS}
          bend={2.4}
          borderRadius={0.08}
          hideCenter
          textColor="#A9BBE0"
          font="500 20px Barlow"
          scrollSpeed={2.2}
          scrollEase={0.06}
        />
      </div>

      <div className="pointer-events-none relative z-20 flex max-w-[22rem] flex-col items-center text-center sm:max-w-[28rem]">
        <p
          data-copy="kicker"
          className="font-[family-name:var(--cs-body)] text-[0.62rem] tracking-[0.34em] text-[var(--cs-caption)] uppercase sm:text-[0.68rem]"
        >
          The floor is live
        </p>
        <h2
          id="cs-book-title"
          data-copy="caption"
          className="mt-5 font-[family-name:var(--cs-display)] text-[clamp(3.4rem,14vw,7.2rem)] leading-[0.82] text-[var(--cs-ice)] uppercase"
        >
          <span className="block font-[family-name:var(--cs-body)] text-[clamp(1.05rem,3.4vw,1.45rem)] font-medium tracking-[0.04em] text-[var(--cs-ice)] normal-case">
            Book a
          </span>
          PC
        </h2>
        <a
          data-copy="cta"
          href="https://www.instagram.com/prime_warsaw/"
          className="pointer-events-auto mt-8 inline-flex rounded-full border border-[color-mix(in_srgb,var(--cs-caption)_50%,transparent)] px-7 py-2.5 font-[family-name:var(--cs-body)] text-[0.68rem] tracking-[0.24em] text-[var(--cs-ice)] uppercase hover:border-[var(--cs-ice)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--cs-ice)]"
          style={{
            boxShadow: '0 0 28px color-mix(in srgb, #0A2478 55%, transparent)',
          }}
        >
          Reserve
        </a>
      </div>
    </section>
  )
}
