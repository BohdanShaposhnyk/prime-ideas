import type { ReactNode } from 'react'
import SpecularButton, { type SpecularButtonProps } from '@/site/bits/SpecularButton'
import { useCoarsePointer } from '../hooks/media'
import { BOOKING_URL } from '../lib/booking'
import { ctaClass, specularInk } from '../lib/palette'

export function BookNightButton({
  size = 'md',
  className = ctaClass,
  children = 'Book a night',
}: {
  size?: SpecularButtonProps['size']
  className?: string
  children?: ReactNode
}) {
  const coarse = useCoarsePointer()

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
        window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')
      }}
    >
      {children}
    </SpecularButton>
  )
}
