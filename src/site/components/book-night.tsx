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
      className={`${ctaClass} backdrop-blur-md ${className}`}
      style={buttonStyle}
      onClick={() => {
        window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')
      }}
    >
      {children}
    </StarBorder>
  )
}
