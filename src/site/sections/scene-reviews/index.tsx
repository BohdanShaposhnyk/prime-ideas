import { useRef } from 'react'
import { GoldWord } from '../../components/gold-word'
import { usePrefersReducedMotion } from '../../hooks/media'
import { useSceneParallax } from '../../hooks/scene-parallax'
import { kickerClass, lockupClass, sceneVeilClass } from '../../lib/palette'
import { Partners } from './partners'
import { ReviewCard } from './card'
import { REVIEWS } from './config'
import { GoogleRating } from './rating'
import { useReviewRow } from './use-review-row'

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
  const reduced = usePrefersReducedMotion()
  useSceneParallax(rootRef, !reduced)
  const { scrollerRef, edges, move } = useReviewRow(reduced)
  const canScroll = !(edges.start && edges.end)

  return (
    <section
      ref={rootRef}
      aria-labelledby="cs-reviews-title"
      data-scene="reviews"
      className="cs-scene cs-px relative isolate flex flex-col overflow-hidden bg-[var(--cs-pitch)] text-[var(--cs-ice)]"
    >
      <div aria-hidden className={sceneVeilClass} />
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
          className="flex min-h-0 snap-x snap-mandatory items-start gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-ps-5 scroll-pe-5 px-5 touch-pan-x [scrollbar-width:none] sm:scroll-ps-8 sm:scroll-pe-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((review) => (
            <li key={review.id} data-review-card="" className="flex shrink-0 snap-start flex-col">
              <ReviewCard review={review} />
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
          <Partners />
        </div>
      </div>
    </section>
  )
}
