import { STAR_PATH } from './config'

export function StarGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <path fill="currentColor" d={STAR_PATH} />
    </svg>
  )
}

export function Stars() {
  return (
    <span className="inline-flex gap-0.5 text-[var(--cs-gold)]" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => (
        <StarGlyph key={index} className="size-3.5" />
      ))}
    </span>
  )
}

/** Gold stars with a clipped last point, so 4.8 reads as four full and one partial. */
export function RatingStars({ value }: { value: number }) {
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
