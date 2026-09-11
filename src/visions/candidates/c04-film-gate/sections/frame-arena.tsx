import type { CSSProperties } from 'react'

/**
 * Arena — cyber floor pulse held inside the film gate.
 */
export default function FrameArena() {
  return (
    <section
      id="arena"
      aria-labelledby="frame-arena-title"
      data-scene="arena"
      data-scroll="gate"
      data-frame="1"
      className="sticky top-0 isolate flex h-dvh w-full overflow-hidden text-[oklch(0.93_0.01_95)]"
      style={
        {
          '--fg-ink': 'oklch(0.08 0.02 210)',
          '--fg-deep': 'oklch(0.16 0.04 210)',
          '--fg-cyan': 'oklch(0.74 0.11 195)',
          '--fg-cyan-hot': 'oklch(0.82 0.12 190)',
          '--fg-chalk': 'oklch(0.93 0.01 95)',
          zIndex: 2,
        } as CSSProperties
      }
    >
      {/* swap: arena cyber floor */}
      <div
        data-placeholder="visual"
        className="absolute inset-0"
        aria-hidden
      >
        <div
          data-plane="field"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(50% 45% at 50% 70%, color-mix(in oklch, var(--fg-cyan) 45%, transparent) 0%, transparent 55%),
              linear-gradient(180deg, var(--fg-deep) 0%, var(--fg-ink) 55%, oklch(0.06 0.02 220) 100%)
            `,
          }}
        />
        {/* Floor lane lines */}
        <div
          data-plane="lanes"
          className="absolute inset-x-[12%] bottom-[18%] top-[42%] opacity-80"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent 0,
                transparent calc(20% - 1px),
                color-mix(in oklch, var(--fg-cyan) 55%, transparent) calc(20% - 1px),
                color-mix(in oklch, var(--fg-cyan) 55%, transparent) 20%
              ),
              linear-gradient(
                180deg,
                transparent 0%,
                color-mix(in oklch, var(--fg-cyan-hot) 22%, transparent) 40%,
                color-mix(in oklch, var(--fg-cyan) 35%, transparent) 100%
              )
            `,
            maskImage:
              'linear-gradient(180deg, transparent 0%, black 25%, black 85%, transparent 100%)',
          }}
        />
        <div
          data-plane="pulse"
          className="absolute bottom-[12%] left-1/2 h-[28%] w-[70%] -translate-x-1/2 rounded-[100%] opacity-70"
          style={{
            background:
              'radial-gradient(ellipse at center, color-mix(in oklch, var(--fg-cyan-hot) 50%, transparent) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.22] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px',
          }}
        />
      </div>

      <div
        data-gate="bar"
        className="absolute inset-x-0 top-0 z-20 flex h-[clamp(3.25rem,10vw,4.5rem)] items-end border-b border-[color-mix(in_oklch,var(--fg-cyan)_25%,transparent)] bg-[color-mix(in_oklch,var(--fg-ink)_82%,transparent)] px-[clamp(2.75rem,8vw,4.5rem)] pb-2"
      >
        <p className="font-['Teko',sans-serif] text-sm tracking-[0.28em] text-[color-mix(in_oklch,var(--fg-cyan)_80%,var(--fg-chalk))] uppercase">
          Frame 01 — Arena
        </p>
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-[clamp(2.75rem,8vw,4.5rem)] pb-12 pt-24 sm:pb-16">
        <h2
          id="frame-arena-title"
          className="font-['Teko',sans-serif] text-[clamp(2.5rem,10vw,4.5rem)] leading-[0.9] tracking-[0.02em] text-[var(--fg-chalk)] uppercase"
        >
          Play loud.
        </h2>
        <p className="mt-3 max-w-xs font-[Karla,sans-serif] text-sm leading-relaxed text-[color-mix(in_oklch,var(--fg-chalk)_68%,var(--fg-cyan))]">
          Cyber floor. Screens up. The night locks in.
        </p>
      </div>
    </section>
  )
}
