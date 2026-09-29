import type { ReactNode } from 'react'
import SpecularButton, { type SpecularButtonProps } from '@/shared/bits/SpecularButton'
import { BOOKING_URL } from './booking'
import { useCoarsePointer } from './media'
import { ctaClass, specularInk } from './palette'

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
