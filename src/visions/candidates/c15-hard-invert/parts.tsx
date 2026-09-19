import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

export function FlickerFlash() {
  return (
    <div
      data-flicker
      aria-hidden
      className="pointer-events-none absolute inset-0 z-40 bg-white opacity-0 mix-blend-difference"
    />
  )
}

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 opacity-[0.18] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.9'/></svg>`,
        )}")`,
        backgroundSize: '140px 140px',
      }}
    />
  )
}

export function TornSticker({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <p
      data-sticker
      className={cn(
        'absolute z-30 rotate-[-9deg] bg-[var(--hi-yellow)] px-2.5 py-1.5 font-[family-name:var(--hi-body)] text-[0.62rem] tracking-[0.18em] text-[var(--hi-pitch)] uppercase',
        className,
      )}
      style={{
        clipPath: 'polygon(0 6%, 100% 0, 94% 100%, 3% 90%)',
      }}
    >
      {label}
    </p>
  )
}

export function SlamWord({
  word,
  fill = 'var(--hi-paper)',
  className,
}: {
  word: string
  fill?: string
  className?: string
}) {
  return (
    <div
      data-slam
      className={cn(
        'pointer-events-none absolute inset-x-[-6vw] top-[18%] z-20 leading-[0.78] uppercase sm:top-[12%]',
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute left-[1.1vw] top-[0.7vw] font-[family-name:var(--hi-display)] text-[clamp(4.6rem,28vw,17rem)] text-[var(--hi-magenta)]"
      >
        {word}
      </span>
      <span
        aria-hidden
        className="absolute -left-[0.9vw] -top-[0.5vw] font-[family-name:var(--hi-display)] text-[clamp(4.6rem,28vw,17rem)] text-[var(--hi-cyan)]"
      >
        {word}
      </span>
      <h2
        className="relative font-[family-name:var(--hi-display)] text-[clamp(4.6rem,28vw,17rem)] uppercase"
        style={{ color: fill }}
      >
        {word}
      </h2>
    </div>
  )
}

export function TicketEdge({
  index,
  line,
  className,
}: {
  index: string
  line: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'absolute right-0 bottom-0 z-30 flex w-full items-end justify-between gap-4 border-t border-dashed border-current/40 px-4 py-3 font-[family-name:var(--hi-body)] sm:px-6',
        className,
      )}
    >
      <p className="text-[0.62rem] tracking-[0.28em] uppercase">{index}</p>
      <p className="max-w-[22ch] text-right text-[0.68rem] leading-snug tracking-[0.08em] uppercase">
        {line}
      </p>
    </div>
  )
}

/** Swap-ready CSS “photo” plane. Invert is resting layout, not a flicker. */
export function VisualPlane({
  variant,
  invert = false,
  className,
  children,
}: {
  variant: VisualVariant
  invert?: boolean
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      data-placeholder="visual"
      data-invert={invert ? 'rest' : undefined}
      className={cn(
        'absolute inset-0 overflow-hidden',
        invert && 'invert contrast-125 saturate-150',
        className,
      )}
    >
      <div className="absolute inset-0" style={VISUALS[variant]} />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-18deg, transparent 0 18px, rgb(0 0 0 / 0.18) 18px 20px)',
        }}
      />
      {children}
    </div>
  )
}

export type VisualVariant =
  | 'hero'
  | 'shot-a'
  | 'shot-b'
  | 'shot-c'
  | 'play'
  | 'heat'
  | 'voice'
  | 'screen'
  | 'floor'

const VISUALS: Record<VisualVariant, CSSProperties> = {
  hero: {
    background: `
      radial-gradient(ellipse 90% 70% at 12% 18%, #FF2EC8 0%, transparent 54%),
      radial-gradient(ellipse 70% 80% at 88% 8%, #1CFFF0 0%, transparent 48%),
      radial-gradient(ellipse 80% 50% at 70% 92%, #F4FF3A 0%, transparent 46%),
      linear-gradient(118deg, #6A12FF 0%, #090909 58%, #FF2EC8 100%)
    `,
  },
  'shot-a': {
    background: `
      linear-gradient(90deg, #FF2EC8 0 38%, transparent 38%),
      radial-gradient(circle at 72% 42%, #1CFFF0 0 22%, transparent 23%),
      linear-gradient(180deg, #6A12FF, #090909)
    `,
  },
  'shot-b': {
    background: `
      conic-gradient(from 210deg at 30% 70%, #00F55A, #090909 40%, #F4FF3A 70%, #00F55A),
      linear-gradient(75deg, #090909 40%, #00F55A)
    `,
  },
  'shot-c': {
    background: `
      linear-gradient(180deg, #F4FF3A 0 28%, transparent 28%),
      radial-gradient(ellipse 50% 80% at 80% 60%, #FF2EC8, transparent 60%),
      linear-gradient(90deg, #090909, #6A12FF)
    `,
  },
  play: {
    background: `
      repeating-linear-gradient(90deg, #00F55A 0 12px, #090909 12px 28px),
      radial-gradient(circle at 80% 20%, #1CFFF0, transparent 40%)
    `,
  },
  heat: {
    background: `
      radial-gradient(ellipse 60% 80% at 20% 80%, #FF2EC8, transparent 55%),
      radial-gradient(circle at 70% 30%, #F4FF3A, transparent 36%),
      linear-gradient(160deg, #090909, #FF2EC8 80%)
    `,
  },
  voice: {
    background: `
      linear-gradient(45deg, #1CFFF0 25%, transparent 25% 50%, #1CFFF0 50% 75%, transparent 75%),
      linear-gradient(135deg, #6A12FF, #090909)
    `,
    backgroundSize: '48px 48px, auto',
  },
  screen: {
    background: `
      linear-gradient(#090909 0 12%, transparent 12% 88%, #090909 88%),
      linear-gradient(90deg, #090909 0 8%, transparent 8% 92%, #090909 92%),
      linear-gradient(180deg, #F4FF3A, #FF2EC8)
    `,
  },
  floor: {
    background: `
      radial-gradient(circle at 50% 110%, #F4FF3A, transparent 46%),
      linear-gradient(200deg, #090909, #6A12FF 40%, #00F55A)
    `,
  },
}
