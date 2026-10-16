import type { ReactNode } from 'react'
import { BOOKING_URL } from '../lib/booking'
import { ctaClass } from '../lib/palette'

const sizeClass = {
  sm: 'px-4 py-2',
  md: 'px-7 py-3.5',
  lg: 'px-8 py-4',
} as const

export function BookNightButton({
  size = 'md',
  className = '',
  children = 'Book a night',
}: {
  size?: keyof typeof sizeClass
  className?: string
  children?: ReactNode
}) {
  return (
    <button
      type="button"
      className={`${ctaClass} inline-flex items-center justify-center rounded-full bg-[var(--cs-gold)] leading-none text-[var(--cs-gold-ink)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cs-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cs-pitch)] ${sizeClass[size]} ${className}`}
      onClick={() => {
        window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')
      }}
    >
      {children}
    </button>
  )
}
