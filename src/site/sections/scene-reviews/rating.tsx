import { useTranslation } from '../../copy'
import { lockupToSupportClass } from '../../lib/palette'
import { GOOGLE_RATING } from './config'
import { RatingStars } from './star'

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

export function GoogleRating() {
  const { t } = useTranslation()

  return (
    <p className={`${lockupToSupportClass} mx-auto flex w-fit items-center gap-3 rounded-[1.15rem] border border-white/10 bg-[var(--cs-well)] py-2.5 pr-4 pl-2.5 sm:gap-3.5 sm:py-3 sm:pr-5 sm:pl-3`}>
      <span className="sr-only">
        {t('reviews.srSummary', { score: t('reviews.score') })}
      </span>
      <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-black sm:size-11">
        <GoogleMark className="size-6 sm:size-[1.65rem]" />
      </span>
      <span aria-hidden className="h-8 w-px shrink-0 bg-[var(--cs-gold)]/45" />
      <span aria-hidden className="text-left">
        <span className="flex items-center gap-2">
          <span className="font-[family-name:var(--cs-display)] text-[2.15rem] leading-none tracking-[0.02em] text-[var(--cs-ice)]">
            {t('reviews.score')}
          </span>
          <RatingStars value={GOOGLE_RATING} />
        </span>
        <span className="mt-1 block font-[family-name:var(--cs-body)] text-[0.75rem] leading-tight text-[var(--cs-caption)]">
          {t('reviews.summary')}
        </span>
      </span>
    </p>
  )
}
