import { useTranslation } from '../../copy'
import { kickerClass } from '../../lib/palette'
import { googleHref, venueLabel, type Review } from './config'
import { Stars } from './star'

function initials(name: string) {
  const parts = name.split(/\s+/)
  const letters = parts.slice(0, 2).map((part) => part[0] ?? '')
  return letters.join('').toUpperCase()
}

export function ReviewCard({ review }: { review: Review }) {
  const { t } = useTranslation()
  const href = googleHref(review.venue)

  return (
    <article className="flex flex-col rounded-[var(--cs-radius-panel)] border border-white/10 bg-[var(--cs-well)] px-5 py-5 sm:px-6 sm:py-6">
      <div className="flex items-center justify-between gap-3">
        <span className="sr-only">{t('reviews.stars')}</span>
        <Stars />
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${kickerClass} hover:text-[var(--cs-gold)]`}
          >
            {t('reviews.google')}
          </a>
        ) : (
          <span className={kickerClass}>{t('reviews.google')}</span>
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
            {t('reviews.byline', { venue: venueLabel(review.venue), date: review.date })}
          </span>
        </span>
      </footer>
    </article>
  )
}
