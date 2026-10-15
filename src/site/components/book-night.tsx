import type { ReactNode } from 'react'
import SpecularButton, { type SpecularButtonProps } from '@/site/bits/SpecularButton'
import { useCoarsePointer } from '../hooks/media'
import { BOOKING_URL } from '../lib/booking'
import { ctaClass, specularInk } from '../lib/palette'
import { trackClick } from '../lib/track'

export function BookNightButton({
  size = 'md',
  className = ctaClass,
  children = 'Book a night',
  section,
  venue,
}: {
  size?: SpecularButtonProps['size']
  className?: string
  children?: ReactNode
  section: string
  venue?: string
}) {
  const coarse = useCoarsePointer()
  const label = typeof children === 'string' ? children : 'Book a night'

  return (
    <SpecularButton
      size={size}
      radius={999}
      tint="#ffffff"
      tintOpacity={0.06}
      blur={10}
      {...specularInk}
      intensity={1.15}
      autoAnimate={!coarse}
      className={className}
      onClick={() => {
        trackClick({ action: 'book', section, label, venue })
        if (coarse) {
          window.location.assign(BOOKING_URL)
          return
        }
        window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')
      }}
    >
      {children}
    </SpecularButton>
  )
}
