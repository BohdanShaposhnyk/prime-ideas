import type { CSSProperties, ReactNode } from 'react'
import LightRays from '@/shared/bits/LightRays'

export type RakeBeat =
  | 'hero'
  | 'heat'
  | 'play'
  | 'voice'
  | 'haze'
  | 'dark'
  | 'close'

type Orb = { x: string; y: string; s: string }

type Tone = {
  angle: string
  top: string
  height: string
  far: string
  mid: string
  rake: string
  rays?: boolean
  orbs: Orb[]
}

const TONES: Record<RakeBeat, Tone> = {
  hero: {
    angle: '-28deg',
    top: '6%',
    height: '42%',
    far: '#16110F',
    mid: '#2C1418',
    rake: '#D4A574',
    rays: true,
    orbs: [
      { x: '14%', y: '20%', s: '7.5rem' },
      { x: '32%', y: '72%', s: '3.2rem' },
      { x: '78%', y: '16%', s: '5.4rem' },
      { x: '88%', y: '62%', s: '2.4rem' },
    ],
  },
  heat: {
    angle: '-18deg',
    top: '16%',
    height: '44%',
    far: '#1A0E0C',
    mid: '#C45A32',
    rake: '#E0B07A',
    orbs: [
      { x: '18%', y: '28%', s: '6rem' },
      { x: '62%', y: '70%', s: '8rem' },
      { x: '84%', y: '24%', s: '3rem' },
    ],
  },
  play: {
    angle: '-8deg',
    top: '22%',
    height: '40%',
    far: '#0E1218',
    mid: '#5B6E9A',
    rake: '#F3E6D0',
    orbs: [
      { x: '10%', y: '58%', s: '9rem' },
      { x: '48%', y: '18%', s: '3.6rem' },
      { x: '82%', y: '48%', s: '4.2rem' },
    ],
  },
  voice: {
    angle: '4deg',
    top: '28%',
    height: '38%',
    far: '#140E12',
    mid: '#E8B4C0',
    rake: '#FFF8EE',
    orbs: [
      { x: '22%', y: '22%', s: '4.5rem' },
      { x: '54%', y: '64%', s: '6.5rem' },
      { x: '86%', y: '30%', s: '2.8rem' },
    ],
  },
  haze: {
    angle: '12deg',
    top: '20%',
    height: '48%',
    far: '#14100C',
    mid: '#A08060',
    rake: '#D4A574',
    orbs: [
      { x: '16%', y: '40%', s: '11rem' },
      { x: '44%', y: '14%', s: '5rem' },
      { x: '70%', y: '68%', s: '7rem' },
      { x: '90%', y: '36%', s: '3rem' },
    ],
  },
  dark: {
    angle: '22deg',
    top: '34%',
    height: '28%',
    far: '#07060A',
    mid: '#16110F',
    rake: '#F3E6D0',
    orbs: [
      { x: '72%', y: '42%', s: '2.2rem' },
      { x: '28%', y: '70%', s: '1.6rem' },
    ],
  },
  close: {
    angle: '2deg',
    top: '8%',
    height: '72%',
    far: '#16110F',
    mid: '#D4A574',
    rake: '#FFF8EE',
    orbs: [
      { x: '12%', y: '24%', s: '8rem' },
      { x: '38%', y: '66%', s: '5rem' },
      { x: '76%', y: '30%', s: '6.5rem' },
    ],
  },
}

export function RakeStage({
  beat,
  labelledBy,
  children,
}: {
  beat: RakeBeat
  labelledBy: string
  children: ReactNode
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      data-scene={beat}
      data-beat={beat}
      className="relative h-[180vh]"
    >
      <div data-scroll="pin" className="sticky top-0 h-dvh overflow-hidden">
        {children}
      </div>
    </section>
  )
}

export function RakeField({ beat }: { beat: RakeBeat }) {
  const tone = TONES[beat]

  return (
    <div
      data-placeholder="visual"
      className="absolute inset-0"
      aria-hidden
      style={
        {
          '--rake-angle': tone.angle,
        } as CSSProperties
      }
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 18% 8%, color-mix(in srgb, ${tone.far} 70%, transparent) 0%, transparent 58%),
            linear-gradient(165deg, #09080C 0%, #0C0A0E 48%, ${tone.far} 100%)
          `,
        }}
      />

      <div
        data-plane="far"
        className="absolute -top-[18%] -left-[22%] h-[78%] w-[78%] rounded-full"
        style={{
          background: `radial-gradient(circle at 42% 40%, color-mix(in srgb, ${tone.far} 88%, transparent) 0%, transparent 68%)`,
          filter: 'blur(28px)',
        }}
      />

      <div
        data-plane="mid"
        className="absolute -right-[12%] bottom-[-22%] h-[72%] w-[64%] rounded-[45%]"
        style={{
          background: `radial-gradient(circle at 38% 32%, color-mix(in srgb, ${tone.mid} 42%, transparent) 0%, transparent 70%)`,
          filter: 'blur(36px)',
        }}
      />

      {beat === 'heat' ? (
        <div
          data-plane="mid"
          className="absolute top-[18%] left-[8%] h-[48%] w-[42%]"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 30% 40%, color-mix(in srgb, #C45A32 55%, transparent) 0%, transparent 72%)',
            filter: 'blur(42px)',
          }}
        />
      ) : null}

      {beat === 'play' ? (
        <div
          data-plane="mid"
          className="absolute top-[8%] left-[-8%] h-[70%] w-[48%]"
          style={{
            background:
              'linear-gradient(115deg, color-mix(in srgb, #5B6E9A 38%, transparent) 0%, transparent 62%)',
            filter: 'blur(24px)',
          }}
        />
      ) : null}

      {beat === 'voice' ? (
        <div
          data-plane="mid"
          className="absolute top-[-10%] left-[28%] h-[80%] w-[38%]"
          style={{
            background:
              'radial-gradient(ellipse 40% 80% at 50% 0%, color-mix(in srgb, #E8B4C0 50%, transparent) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      ) : null}

      {beat === 'haze' ? (
        <>
          <div
            data-plane="mid"
            className="absolute top-[8%] left-[6%] h-[40%] w-[70%] rounded-full"
            style={{
              background:
                'radial-gradient(circle, color-mix(in srgb, #A08060 34%, transparent) 0%, transparent 70%)',
              filter: 'blur(48px)',
            }}
          />
          <div
            data-plane="mid"
            className="absolute right-[4%] bottom-[12%] h-[36%] w-[50%] rounded-full"
            style={{
              background:
                'radial-gradient(circle, color-mix(in srgb, #D4A574 28%, transparent) 0%, transparent 72%)',
              filter: 'blur(52px)',
            }}
          />
        </>
      ) : null}

      {beat === 'dark' ? (
        <div
          data-plane="mid"
          className="absolute top-[30%] right-[18%] h-[38%] w-[22%]"
          style={{
            background:
              'linear-gradient(168deg, color-mix(in srgb, #FFF8EE 38%, transparent) 0%, color-mix(in srgb, #F3E6D0 12%, transparent) 38%, transparent 72%)',
            filter: 'blur(18px)',
            clipPath: 'polygon(62% 0%, 100% 8%, 48% 100%, 18% 92%)',
          }}
        />
      ) : null}

      <div
        data-rake
        data-plane="rake"
        data-rake-angle={tone.angle}
        className="absolute left-[-24%] w-[150%] origin-left"
        style={{
          top: tone.top,
          height: tone.height,
          transform: `rotate(${tone.angle})`,
          background: `
            linear-gradient(
              90deg,
              transparent 0%,
              color-mix(in srgb, ${tone.rake} 18%, transparent) 18%,
              color-mix(in srgb, #FFF8EE 46%, transparent) 46%,
              color-mix(in srgb, ${tone.rake} 28%, transparent) 72%,
              transparent 100%
            )
          `,
          mixBlendMode: 'screen',
        }}
      />

      <div
        data-plane="band"
        className="absolute left-[-10%] h-px w-[120%] origin-left"
        style={{
          top: `calc(${tone.top} + ${tone.height} / 2)`,
          transform: `rotate(${tone.angle})`,
          background:
            'linear-gradient(90deg, transparent, color-mix(in srgb, #FFF8EE 55%, transparent) 35%, transparent)',
        }}
      />

      <div data-plane="near" className="absolute inset-0">
        {tone.orbs.map((orb) => (
          <span
            key={`${orb.x}-${orb.y}`}
            data-orb
            className="absolute rounded-full"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.s,
              height: orb.s,
              background: `radial-gradient(circle at 38% 32%, color-mix(in srgb, #FFF8EE 55%, transparent) 0%, color-mix(in srgb, ${tone.rake} 22%, transparent) 42%, transparent 70%)`,
              filter: 'blur(14px)',
            }}
          />
        ))}
      </div>

      {tone.rays ? (
        <div className="absolute inset-0 opacity-80">
          <LightRays
            raysOrigin="top-left"
            raysColor="#F3E6D0"
            raysSpeed={0.55}
            lightSpread={0.85}
            rayLength={1.35}
            fadeDistance={1.15}
            saturation={0.7}
            noiseAmount={0.06}
            distortion={0.04}
            followMouse
            mouseInfluence={0.08}
          />
        </div>
      ) : null}

      <div
        data-plane="rim"
        className="absolute top-[8%] right-5 bottom-[8%] w-px sm:right-8 lg:right-12"
        style={{
          background:
            'linear-gradient(180deg, transparent, color-mix(in srgb, #FFF8EE 55%, transparent) 28%, color-mix(in srgb, #D4A574 40%, transparent) 62%, transparent)',
        }}
      />

      <div
        data-plane="grain"
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>")`,
          backgroundSize: '140px 140px',
        }}
      />
    </div>
  )
}

export function DisplayLine({
  id,
  text,
  as: Tag = 'h2',
}: {
  id?: string
  text: string
  as?: 'h1' | 'h2' | 'p'
}) {
  return (
    <div className="relative -ml-1 max-w-[110vw] overflow-visible sm:-ml-2">
      <span
        data-plane="type-far"
        aria-hidden
        className="pointer-events-none absolute top-[0.06em] left-[0.08em] font-[family-name:var(--pb-display)] text-[clamp(4.4rem,20vw,13.5rem)] leading-[0.78] tracking-[-0.045em] text-[color-mix(in_srgb,var(--pb-ivory)_55%,transparent)] uppercase select-none"
        style={{ filter: 'blur(16px)' }}
      >
        {text}
      </span>
      <Tag
        id={id}
        data-type="display"
        aria-label={text}
        className="relative flex font-[family-name:var(--pb-display)] text-[clamp(4.4rem,20vw,13.5rem)] leading-[0.78] font-normal tracking-[-0.045em] text-[var(--pb-ivory)] uppercase"
      >
        {text.split('').map((ch, i) => (
          <span key={`${ch}-${i}`} data-type="glyph" aria-hidden>
            {ch === ' ' ? '\u00a0' : ch}
          </span>
        ))}
      </Tag>
    </div>
  )
}

export function CopyFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 flex h-full min-h-dvh flex-col justify-between px-5 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
      {children}
    </div>
  )
}
