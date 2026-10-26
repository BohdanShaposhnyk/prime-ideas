import { useEffect, useRef, useState } from 'react'
import { GoldWord } from '../components/gold-word'
import { usePrefersReducedMotion } from '../hooks/media'
import { kickerClass, lockupClass, lockupToSupportClass, supportClass } from '../lib/palette'
import { mapsHref, SEO_VENUES } from '../lib/seo'

/**
 * Five-star Google reviews, two from each lounge.
 * Wording is the guest's, with light punctuation so a card can hold it.
 */
const REVIEWS = [
  {
    id: 'kampouri',
    venue: 'mennica',
    name: 'Maria Kampouri',
    date: 'August 2025',
    quote:
      'Amazing PCs, WiFi, and equipment. We took the duo private area and it was an amazing experience — gaming, eating, and relaxing in our own space. The service is amazing and the people here are polite. I will come again.',
  },
  {
    id: 'bolatbek',
    venue: 'mokotow',
    name: 'Alisher Bolatbek',
    date: 'April 2026',
    quote:
      'It was the best cyber lounge I have ever been. The PCs are really cool and the internet is fast. The music in the reception is nice. I surely recommend this place if you want to relax with friends and play some games.',
  },
  {
    id: 'chanel',
    venue: 'wroclaw',
    name: 'Jvachka Chanel',
    date: 'August 2025',
    quote:
      'A wonderful bootcamp experience. This club provides an unforgettable experience. The service staff is top notch. Also pleasantly surprised by the cinema room. Excellent Dolby Atmos sound and noise isolation provides great emotions.',
  },
  {
    id: 'sawchuk',
    venue: 'mennica',
    name: 'Alex Sawchuk',
    date: 'August 2025',
    quote:
      'I visited this place with my friend. Computers, mice, and keyboards are incredible. PlayStation with a cinema room is a great option for a large company. The service was incredible.',
  },
  {
    id: 'barmaley',
    venue: 'mokotow',
    name: 'barmaley',
    date: 'April 2026',
    quote:
      'Prime Lounge Mokotów feels like a perfect setup — smooth like a high-end PC running without any lag. Clean vibe, great service, and everything just works. Hookah quality is on point too. Definitely coming back.',
  },
  {
    id: 'frantsishko',
    venue: 'wroclaw',
    name: 'Vitalii Frantsishko',
    date: 'September 2026',
    quote:
      'The wholesome experience starting from atmosphere, service, quality to simply prices. Highly recommend.',
  },
] as const

const VENUE_LABEL = {
  mennica: 'Mennica',
  mokotow: 'Mokotów',
  wroclaw: 'Wrocław',
} as const

function googleHref(venueId: (typeof REVIEWS)[number]['venue']) {
  const venue = SEO_VENUES.find((item) => item.id === venueId)
  return venue ? mapsHref(venue.mapsCid) : undefined
}

const CARD_GAP = 12

function initials(name: string) {
  const parts = name.split(/\s+/).filter((part) => part !== '“Cesare”')
  const letters = parts.slice(0, 2).map((part) => part[0] ?? '')
  return letters.join('').toUpperCase()
}

function Stars() {
  return (
    <span className="inline-flex gap-0.5 text-[var(--cs-gold)]" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 20 20" className="size-3.5">
          <path
            fill="currentColor"
            d="M10 1.4 12.35 6.7l5.75.5-4.35 3.75 1.35 5.55L10 13.85 4.9 16.5l1.35-5.55L1.9 7.2l5.75-.5z"
          />
        </svg>
      ))}
    </span>
  )
}

function Chevron({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        d={dir === 'prev' ? 'M14.5 5.5 8 12l6.5 6.5' : 'M9.5 5.5 16 12l-6.5 6.5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const controlClass =
  'grid size-9 cursor-pointer place-items-center rounded-full border border-white/15 text-[var(--cs-ice)] transition-colors hover:border-[var(--cs-gold)] hover:text-[var(--cs-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cs-ice)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cs-pitch)] disabled:cursor-default disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-[var(--cs-ice)]'

export default function SceneReviews() {
  const scrollerRef = useRef<HTMLUListElement>(null)
  const reduced = usePrefersReducedMotion()
  const [edges, setEdges] = useState({ start: true, end: true })

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const read = () => {
      const max = el.scrollWidth - el.clientWidth
      setEdges({
        start: el.scrollLeft <= 2,
        end: max <= 2 || el.scrollLeft >= max - 2,
      })
    }
    read()
    el.addEventListener('scroll', read, { passive: true })
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', read)
      ro.disconnect()
    }
  }, [])

  const move = (dir: -1 | 1) => {
    const el = scrollerRef.current
    const card = el?.querySelector('li')
    if (!el || !card) return
    const distance = card.getBoundingClientRect().width + CARD_GAP
    el.scrollBy({ left: dir * distance, behavior: reduced ? 'auto' : 'smooth' })
  }

  const canScroll = !(edges.start && edges.end)

  return (
    <section
      aria-labelledby="cs-reviews-title"
      data-scene="reviews"
      className="cs-scene relative flex flex-col overflow-hidden bg-[var(--cs-pitch)] text-[var(--cs-ice)]"
    >
      <header className="shrink-0 px-5 pt-[var(--cs-header-h)] text-center sm:px-8">
        <h2 id="cs-reviews-title" className={lockupClass}>
          <GoldWord>Reviews</GoldWord>
        </h2>
        <p className={`${lockupToSupportClass} mx-auto max-w-[26rem] ${supportClass}`}>
          What people say after a night here.
        </p>
      </header>

      <ul
        ref={scrollerRef}
        data-cs-x-pan=""
        aria-label="Google reviews"
        className="mt-6 flex shrink-0 snap-x snap-mandatory items-start gap-3 overflow-x-auto overscroll-x-contain scroll-ps-5 scroll-pe-5 px-5 touch-pan-x [scrollbar-width:none] sm:mt-8 sm:scroll-ps-8 sm:scroll-pe-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {REVIEWS.map((review) => (
          <li key={review.id} data-review-card="" className="flex shrink-0 snap-start flex-col">
            <article className="flex flex-col rounded-[var(--cs-radius-panel)] border border-white/10 bg-[var(--cs-well)] px-5 py-5 sm:px-6 sm:py-6">
              <div className="flex items-center justify-between gap-3">
                <span className="sr-only">5 out of 5 stars</span>
                <Stars />
                {googleHref(review.venue) ? (
                  <a
                    href={googleHref(review.venue)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${kickerClass} hover:text-[var(--cs-gold)]`}
                  >
                    Google
                  </a>
                ) : (
                  <span className={kickerClass}>Google</span>
                )}
              </div>
              <blockquote className="mt-4 font-[family-name:var(--cs-body)] text-[0.98rem] leading-relaxed font-normal text-[var(--cs-ice)] sm:text-[1.05rem]">
                <p>{review.quote}</p>
              </blockquote>
              <footer className="mt-5 flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-black font-[family-name:var(--cs-display)] text-[1.15rem] leading-none tracking-[0.04em] text-[var(--cs-gold)]"
                >
                  {initials(review.name)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-[family-name:var(--cs-body)] text-[0.95rem] leading-tight font-medium text-[var(--cs-ice)]">
                    {review.name}
                  </span>
                  <span className="mt-0.5 block font-[family-name:var(--cs-body)] text-[0.75rem] leading-tight text-[var(--cs-caption)]">
                    {VENUE_LABEL[review.venue]} · {review.date}
                  </span>
                </span>
              </footer>
            </article>
          </li>
        ))}
      </ul>

      {canScroll ? (
        <div className="flex shrink-0 justify-center gap-2 px-5 pt-1 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pb-[max(1.75rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            className={controlClass}
            aria-label="Previous reviews"
            disabled={edges.start}
            onClick={() => move(-1)}
          >
            <Chevron dir="prev" />
          </button>
          <button
            type="button"
            className={controlClass}
            aria-label="Next reviews"
            disabled={edges.end}
            onClick={() => move(1)}
          >
            <Chevron dir="next" />
          </button>
        </div>
      ) : (
        <div className="shrink-0 pb-[max(1.25rem,env(safe-area-inset-bottom))]" />
      )}
    </section>
  )
}
