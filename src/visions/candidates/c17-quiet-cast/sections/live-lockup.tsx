import { useEffect, useState, type RefObject } from 'react'
import Shuffle from '@/shared/bits/Shuffle'
import VariableProximity from '@/shared/bits/VariableProximity'
import { prefersReducedMotion } from '@/shared/lib/motion'

const lockupStyle = {
  fontFamily: '"Fraunces Variable", serif',
  fontSize: 'clamp(3.4rem, 18vw, 6.4rem)',
  lineHeight: 0.86,
  fontWeight: 500,
  letterSpacing: '-0.03em',
  fontVariationSettings: `'SOFT' 28, 'WONK' 1, 'opsz' 144`,
  color: 'var(--qc-bone)',
} as const

type LiveLockupProps = {
  word: string
  containerRef: RefObject<HTMLElement | null>
}

export function LiveLockup({ word, containerRef }: LiveLockupProps) {
  const reduced = prefersReducedMotion()
  const [live, setLive] = useState(reduced)

  useEffect(() => {
    if (reduced || live) return
    const t = window.setTimeout(() => setLive(true), 1800)
    return () => window.clearTimeout(t)
  }, [reduced, live])

  if (reduced || live) {
    if (reduced) {
      return <span style={lockupStyle}>{word}</span>
    }
    return (
      <VariableProximity
        label={word}
        containerRef={containerRef}
        radius={240}
        falloff="gaussian"
        fromFontVariationSettings="'SOFT' 18, 'WONK' 0.12, 'opsz' 144, 'wght' 480"
        toFontVariationSettings="'SOFT' 82, 'WONK' 1, 'opsz' 144, 'wght' 760"
        className="font-[family-name:var(--qc-display)] font-medium text-[var(--qc-bone)]"
        style={lockupStyle}
      />
    )
  }

  return (
    <Shuffle
      text={word}
      tag="span"
      shuffleDirection="up"
      shuffleTimes={2}
      scrambleCharset="AEGHILMNOPRSTUVY"
      duration={0.4}
      stagger={0.045}
      threshold={0.2}
      rootMargin="0px"
      triggerOnce
      triggerOnHover={false}
      colorFrom="#8A8278"
      colorTo="#F0E8DC"
      onShuffleComplete={() => setLive(true)}
      className="font-[family-name:var(--qc-display)] font-medium text-[var(--qc-bone)]"
      style={lockupStyle}
    />
  )
}
