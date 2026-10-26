import type { CSSProperties, ReactNode } from 'react'
import StarBorder from '../bits/StarBorder'
import { BOOKING_URL } from '../lib/booking'
import { ctaClass, palette } from '../lib/palette'

const buttonStyle = { padding: '0.875rem 1.75rem', lineHeight: 1 } satisfies CSSProperties

export function BookNightButton({
  className = '',
  children = 'Book a night',
}: {
  className?: string
  children?: ReactNode
}) {
  return (
    <span className={`inline-grid justify-items-stretch ${className}`}>
      <StarBorder
        color={palette.gold}
        trailColor={palette.gold}
        duration={9}
        trailLength={0.35}
        stars={2}
        radius={26}
        glow={0.7}
        hover="brighten"
        sparkle
        backgroundColor="rgba(0, 0, 0, 0.72)"
        textColor={palette.ice}
        borderColor="rgba(207, 181, 59, 0.4)"
        className={`${ctaClass} justify-self-center backdrop-blur-md`}
        style={buttonStyle}
        onClick={() => {
          window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')
        }}
      >
        {children}
      </StarBorder>
      <p className="mt-1.5 w-0 min-w-full text-balance text-center font-[family-name:var(--cs-body)] text-[0.75rem] leading-snug text-[var(--cs-caption)] [text-shadow:0_1px_8px_rgba(0,0,0,0.65)]">
        Use code <span className="text-[var(--cs-gold)]">“PRIME”</span> to activate your account and get more
      </p>
    </span>
  )
}
