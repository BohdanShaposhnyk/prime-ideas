import CircularGallery from '@/shared/bits/CircularGallery'
import Lightning from '@/shared/bits/Lightning'
import barParty from '../assets/bar/bar-party.jpg'
import carsimGirl from '../assets/gaming/carsim-girl.jpg'
import hookahGirl from '../assets/hookah/hookah-girl.jpg'
import micGold from '../assets/karaoke/mic-gold.jpg'

const ITEMS = [
  { image: barParty, text: '' },
  { image: carsimGirl, text: '' },
  { image: hookahGirl, text: '' },
  { image: micGold, text: '' },
]

export default function SceneBook() {
  return (
    <section
      aria-labelledby="cs-book-title"
      data-scene="book"
      data-scroll="book-lockup"
      className="relative isolate flex h-dvh flex-col items-center justify-center overflow-hidden bg-[var(--cs-pitch)] px-5 py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 92% at 50% 50%, color-mix(in srgb, #d5beae 12%, #000) 0%, color-mix(in srgb, #d5beae 5%, #000) 42%, color-mix(in srgb, #d5beae 1.5%, #000) 72%, #000000 100%)',
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

      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.28] mix-blend-screen"
        aria-hidden
      >
        <Lightning hue={28} speed={0.7} intensity={0.38} size={0.85} xOffset={0} />
      </div>

      <div className="absolute inset-x-0 top-1/2 z-10 h-[min(44dvh,20rem)] w-full -translate-y-1/2 sm:inset-0 sm:h-full sm:translate-y-0">
        <CircularGallery
          items={ITEMS}
          bend={2.4}
          borderRadius={0.08}
          hideCenter
          textColor="#A9BBE0"
          font="500 20px Barlow"
          scrollSpeed={2.2}
          scrollEase={0.06}
          autoplay={2000}
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
          className="mt-5 font-[family-name:var(--cs-display)] text-[clamp(2.55rem,10vw,5rem)] leading-[0.82] text-[var(--cs-ice)] uppercase"
        >
          <span className="mb-[0.22em] block font-[family-name:var(--cs-body)] text-[clamp(1.05rem,3.4vw,1.45rem)] font-medium tracking-[0.04em] text-[var(--cs-ice)] normal-case">
            Book a
          </span>
          PC
        </h2>
        <a
          data-copy="cta"
          href="https://www.instagram.com/prime_warsaw/"
          className="pointer-events-auto mt-8 inline-flex rounded-full border border-[color-mix(in_srgb,var(--cs-caption)_50%,transparent)] px-7 py-2.5 font-[family-name:var(--cs-body)] text-[0.68rem] tracking-[0.24em] text-[var(--cs-ice)] uppercase hover:border-[var(--cs-ice)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--cs-ice)]"
          style={{
            boxShadow: '0 0 28px color-mix(in srgb, #d5beae 35%, transparent)',
          }}
        >
          Reserve
        </a>
      </div>
    </section>
  )
}
