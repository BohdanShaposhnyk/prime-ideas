import type { CSSProperties, ReactNode } from 'react'

export type CutId =
  | 'vertical'
  | 'horizontal'
  | 'stagger'
  | 'diagonal'
  | 'letterbox'
  | 'heal'

export type BrightTone = 'lime' | 'coral' | 'paper'

type BeltSpec = {
  className: string
  orientation: 'h' | 'v' | 'diag'
  style?: CSSProperties
}

type CutSpec = {
  dimClips: string[]
  brightClips: string[]
  belts: BeltSpec[]
}

const CUTS: Record<CutId, CutSpec> = {
  vertical: {
    dimClips: ['polygon(0 0, 62% 0, 62% 100%, 0 100%)'],
    brightClips: ['polygon(62% 0, 100% 0, 100% 100%, 62% 100%)'],
    belts: [
      {
        orientation: 'v',
        className:
          'absolute inset-y-0 left-[62%] z-20 w-[1.55rem] -translate-x-1/2',
      },
    ],
  },
  horizontal: {
    dimClips: ['polygon(0 0, 100% 0, 100% 68%, 0 68%)'],
    brightClips: ['polygon(0 68%, 100% 68%, 100% 100%, 0 100%)'],
    belts: [
      {
        orientation: 'h',
        className:
          'absolute top-[68%] left-0 z-20 h-[1.55rem] w-full -translate-y-1/2',
      },
    ],
  },
  stagger: {
    dimClips: [
      'polygon(0 0, 38% 0, 38% 28%, 52% 28%, 52% 100%, 0 100%)',
    ],
    brightClips: [
      'polygon(38% 0, 100% 0, 100% 100%, 52% 100%, 52% 28%, 38% 28%)',
    ],
    belts: [
      {
        orientation: 'v',
        className:
          'absolute top-[28%] bottom-0 left-[52%] z-20 w-[1.55rem] -translate-x-1/2',
      },
    ],
  },
  diagonal: {
    dimClips: ['polygon(0 0, 74% 0, 42% 100%, 0 100%)'],
    brightClips: ['polygon(74% 0, 100% 0, 100% 100%, 42% 100%)'],
    belts: [
      {
        orientation: 'diag',
        className:
          'absolute top-1/2 left-[58%] z-20 h-[1.55rem] w-[160vmax]',
        style: {
          transform: 'translate(-50%, -50%) rotate(atan2(100dvh, -32vw))',
        },
      },
    ],
  },
  letterbox: {
    dimClips: [''],
    brightClips: ['polygon(0 46%, 100% 46%, 100% 74%, 0 74%)'],
    belts: [
      {
        orientation: 'h',
        className:
          'absolute top-[46%] left-0 z-20 h-[1.55rem] w-full -translate-y-1/2',
      },
    ],
  },
  heal: {
    dimClips: ['polygon(0 0, 88% 0, 88% 100%, 0 100%)'],
    brightClips: ['polygon(88% 0, 100% 0, 100% 100%, 88% 100%)'],
    belts: [
      {
        orientation: 'v',
        className:
          'absolute inset-y-0 left-[88%] z-20 w-[1.55rem] -translate-x-1/2',
      },
      {
        orientation: 'h',
        className: 'absolute top-[78%] left-0 z-20 h-[1.55rem] w-[88%]',
      },
    ],
  },
}

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`

function Grain({ className }: { className: string }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        backgroundImage: GRAIN,
        backgroundSize: '160px 160px',
      }}
    />
  )
}

function DimVisual() {
  return (
    <>
      {/* swap: dim field */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 18% 78%, #1c1c22 0%, transparent 60%),
            radial-gradient(ellipse 45% 40% at 72% 12%, color-mix(in srgb, #D6FF3A 7%, transparent) 0%, transparent 55%),
            linear-gradient(165deg, #16161A 0%, #0C0C0E 100%)
          `,
        }}
      />
      <Grain className="absolute inset-0 opacity-[0.28] mix-blend-soft-light" />
    </>
  )
}

function BrightVisual({ tone }: { tone: BrightTone }) {
  const background =
    tone === 'coral'
      ? `
        radial-gradient(ellipse 80% 60% at 78% 18%, #ff8a6a 0%, transparent 52%),
        radial-gradient(ellipse 40% 50% at 12% 88%, color-mix(in srgb, #D6FF3A 40%, transparent) 0%, transparent 50%),
        linear-gradient(200deg, #FF6A4A 0%, #FF4D2E 48%, #D6361C 100%)
      `
      : tone === 'paper'
        ? `
          radial-gradient(ellipse 70% 80% at 50% 50%, #ffffff 0%, transparent 55%),
          radial-gradient(ellipse 40% 30% at 88% 20%, color-mix(in srgb, #D6FF3A 22%, transparent) 0%, transparent 50%),
          linear-gradient(180deg, #F4F0E6 0%, #E8E0D0 100%)
        `
        : `
          radial-gradient(ellipse 90% 70% at 78% 18%, #f6ffa8 0%, transparent 50%),
          radial-gradient(ellipse 42% 50% at 8% 92%, color-mix(in srgb, #FF4D2E 30%, transparent) 0%, transparent 52%),
          linear-gradient(200deg, #E8FF5A 0%, #D6FF3A 44%, #B8E010 100%)
        `

  return (
    <>
      {/* swap: bright shard */}
      <div className="absolute inset-0" style={{ background }} />
      <div
        aria-hidden
        className="absolute top-[12%] right-[10%] size-3 bg-[var(--lo-ink)]"
      />
      <div
        aria-hidden
        className="absolute right-[10%] bottom-[18%] h-px w-[18%] bg-[color-mix(in_srgb,var(--lo-ink)_35%,transparent)]"
      />
      <Grain className="absolute inset-0 opacity-[0.18] mix-blend-multiply" />
    </>
  )
}

function SeamBelt({
  text,
  orientation,
  className,
  style,
}: {
  text: string
  orientation: 'h' | 'v' | 'diag'
  className: string
  style?: CSSProperties
}) {
  const run = `${text} · `.repeat(8)
  const vertical = orientation === 'v'
  return (
    <div
      data-belt
      data-seam="belt"
      className={`pointer-events-none overflow-hidden bg-[var(--lo-lime)] ${className}`}
      style={style}
    >
      <p
        data-belt-track
        className={
          vertical
            ? 'font-[family-name:var(--lo-mono)] text-[0.62rem] leading-[1.55rem] font-normal tracking-[0.28em] text-[var(--lo-ink)] uppercase [writing-mode:vertical-rl] whitespace-nowrap'
            : 'font-[family-name:var(--lo-mono)] text-[0.62rem] leading-[1.55rem] font-normal tracking-[0.28em] text-[var(--lo-ink)] uppercase whitespace-nowrap'
        }
      >
        {run}
      </p>
    </div>
  )
}

export function SplitLockup({
  text,
  id,
  decorative,
  className,
}: {
  text: string
  id?: string
  decorative?: boolean
  className?: string
}) {
  const Tag = decorative ? 'p' : 'h1'
  return (
    <Tag
      id={id}
      aria-hidden={decorative || undefined}
      data-type="split-chars"
      className={
        className ??
        'absolute top-[16%] left-[12vw] max-w-[92vw] overflow-hidden font-[family-name:var(--lo-display)] text-[clamp(4.6rem,22vw,18rem)] leading-[0.78] font-extrabold tracking-[-0.07em] uppercase sm:left-[10vw]'
      }
    >
      {Array.from(text).map((ch, i) => (
        <span data-char={i} key={`${ch}-${i}`} className="inline-block">
          {ch === ' ' ? '\u00a0' : ch}
        </span>
      ))}
    </Tag>
  )
}

export function OffsetSplit({
  beat,
  lockup,
  lockupId,
  lockupClassName,
  cut,
  bright,
  belt,
  beltB,
  dimCopy,
  brightCopy,
}: {
  beat: string
  lockup: string
  lockupId: string
  lockupClassName?: string
  cut: CutId
  bright: BrightTone
  belt: string
  beltB?: string
  dimCopy: ReactNode
  brightCopy: ReactNode
}) {
  const spec = CUTS[cut]
  return (
    <section
      aria-labelledby={lockupId}
      data-split-beat={beat}
      className="relative h-[200vh]"
    >
      <div
        data-scroll="pin"
        className="sticky top-0 isolate h-dvh overflow-hidden"
      >
        <div
          data-split="stage"
          data-cut={cut}
          className="relative h-full"
        >
          {spec.dimClips.map((clip, i) => (
            <div
              key={`dim-${i}`}
              data-plane="dim"
              className="absolute inset-0 text-[var(--lo-type)]"
              style={clip ? { clipPath: clip } : undefined}
            >
              <div
                data-placeholder="visual"
                data-zoom="field"
                className="absolute inset-0"
                aria-hidden
              >
                <DimVisual />
              </div>
              <div className="relative z-10 h-full">
                <SplitLockup
                  text={lockup}
                  id={i === 0 ? lockupId : undefined}
                  decorative={i !== 0}
                  className={lockupClassName}
                />
                {dimCopy}
              </div>
            </div>
          ))}

          {spec.brightClips.map((clip, i) => (
            <div
              key={`bright-${i}`}
              data-plane="bright"
              className="absolute inset-0 text-[var(--lo-ink)]"
              style={{ clipPath: clip }}
            >
              <div
                data-placeholder="visual"
                data-zoom="shard"
                className="absolute inset-0"
                aria-hidden
              >
                <BrightVisual tone={bright} />
              </div>
              <div className="relative z-10 h-full">
                <SplitLockup
                  text={lockup}
                  decorative
                  className={lockupClassName}
                />
                {brightCopy}
              </div>
            </div>
          ))}

          {spec.belts.map((b, i) => (
            <SeamBelt
              key={`belt-${i}`}
              text={i === 1 && beltB ? beltB : belt}
              orientation={b.orientation}
              className={b.className}
              style={b.style}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
