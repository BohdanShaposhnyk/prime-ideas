import { useEffect, useRef, useState } from 'react'
import { GoldWord } from '../components/gold-word'
import { usePrefersReducedMotion } from '../hooks/media'
import { useSceneParallax } from '../hooks/scene-parallax'
import { kickerClass, lockupClass, lockupToSupportClass } from '../lib/palette'
import { ExperiencePartners } from './experience-partners'
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

/** Collective Google score for Mennica, Mokotów, and Wrocław. */
const GOOGLE_RATING = 4.8

const STAR_PATH =
  'M10 1.4 12.35 6.7l5.75.5-4.35 3.75 1.35 5.55L10 13.85 4.9 16.5l1.35-5.55L1.9 7.2l5.75-.5z'

function initials(name: string) {
  const parts = name.split(/\s+/).filter((part) => part !== '“Cesare”')
  const letters = parts.slice(0, 2).map((part) => part[0] ?? '')
  return letters.join('').toUpperCase()
}

function StarGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <path fill="currentColor" d={STAR_PATH} />
    </svg>
  )
}

function Stars() {
  return (
    <span className="inline-flex gap-0.5 text-[var(--cs-gold)]" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => (
        <StarGlyph key={index} className="size-3.5" />
      ))}
    </span>
  )
}

/** Gold stars with a clipped last point, so 4.8 reads as four full and one partial. */
function RatingStars({ value }: { value: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.max(0, Math.min(1, value - index))
        return (
          <span key={index} className="relative size-3.5">
            <StarGlyph className="absolute inset-0 size-full text-white/20" />
            <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <StarGlyph className="absolute top-0 left-0 size-3.5 max-w-none text-[var(--cs-gold)]" />
            </span>
          </span>
        )
      })}
    </span>
  )
}

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function GoogleRating() {
  return (
    <p className={`${lockupToSupportClass} mx-auto flex w-fit items-center gap-3 rounded-[1.15rem] border border-white/10 bg-[var(--cs-well)] py-2.5 pr-4 pl-2.5 sm:gap-3.5 sm:py-3 sm:pr-5 sm:pl-3`}>
      <span className="sr-only">
        Rated {GOOGLE_RATING} out of 5 on Google, from more than 2,000 reviews across three lounges.
      </span>
      <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-black sm:size-11">
        <GoogleMark className="size-6 sm:size-[1.65rem]" />
      </span>
      <span aria-hidden className="h-8 w-px shrink-0 bg-[var(--cs-gold)]/45" />
      <span aria-hidden className="text-left">
        <span className="flex items-center gap-2">
          <span className="font-[family-name:var(--cs-display)] text-[2.15rem] leading-none tracking-[0.02em] text-[var(--cs-ice)]">
            {GOOGLE_RATING}
          </span>
          <RatingStars value={GOOGLE_RATING} />
        </span>
        <span className="mt-1 block font-[family-name:var(--cs-body)] text-[0.75rem] leading-tight text-[var(--cs-caption)]">
          2,000+ reviews across three lounges
        </span>
      </span>
    </p>
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
  const rootRef = useRef<HTMLElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)
  const reduced = usePrefersReducedMotion()
  useSceneParallax(rootRef, !reduced)
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
      ref={rootRef}
      aria-labelledby="cs-reviews-title"
      data-scene="reviews"
      className="cs-scene cs-px relative isolate flex flex-col overflow-hidden bg-[var(--cs-pitch)] text-[var(--cs-ice)]"
    >
      <div aria-hidden className="cs-px-veil pointer-events-none absolute inset-0 z-[15] bg-black" />
      <header className="cs-px-copy relative z-20 shrink-0 px-5 pt-[var(--cs-header-h)] text-center sm:px-8">
        <h2 id="cs-reviews-title" className={lockupClass}>
          <GoldWord>Reviews</GoldWord>
        </h2>
        <GoogleRating />
      </header>

      <div className="cs-px-mid relative z-20 flex min-h-0 flex-col">
      <ul
        ref={scrollerRef}
        data-cs-x-pan=""
        aria-label="Google reviews"
        data-review-row=""
        className="flex min-h-0 snap-x snap-mandatory items-start gap-3 overflow-x-auto overflow-y-auto overscroll-x-contain scroll-ps-5 scroll-pe-5 px-5 touch-pan-x [scrollbar-width:none] sm:scroll-ps-8 sm:scroll-pe-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
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
        <div className="flex shrink-0 justify-center gap-2 px-5 pt-2">
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
      ) : null}
      </div>

      <div className="cs-px-ground relative z-10 mt-auto flex w-full shrink-0 flex-col items-center pt-2">
        <p className={kickerClass}>Our partners</p>
        <div className="mt-3 w-full">
          <ExperiencePartners />
        </div>
      </div>
    </section>
  )
}
