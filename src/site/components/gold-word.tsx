import { useRef } from 'react'
import { useGoldShine } from '../hooks/gold-shine'

/** Gold lockup word with a passing sheen. `block` keeps a heading line of its own. */
export function GoldWord({
  children,
  block = false,
  className = '',
}: {
  children: string
  block?: boolean
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const live = useGoldShine(ref)

  return (
    <span
      ref={ref}
      className={`cs-gold-word${block ? ' cs-gold-word-block' : ''}${live ? ' cs-gold-live' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </span>
  )
}
