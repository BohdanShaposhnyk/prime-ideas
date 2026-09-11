import type { CSSProperties } from 'react'

/**
 * Screen — cinema projection warmth inside the gate.
 */
export default function FrameScreen() {
  return (
    <section
      id="screen"
      aria-labelledby="frame-screen-title"
      data-scene="screen"
      data-scroll="gate"
      data-frame="2"
      className="sticky top-0 isolate flex h-dvh w-full overflow-hidden text-[oklch(0.93_0.01_95)]"
      style={
        {
          '--fg-ink': 'oklch(0.1 0.02 55)',
          '--fg-deep': 'oklch(0.18 0.03 55)',
          '--fg-amber': 'oklch(0.78 0.13 75)',
          '--fg-amber-deep': 'oklch(0.55 0.11 60)',
          '--fg-chalk': 'oklch(0.93 0.01 95)',
          zIndex: 3,
        } as CSSProperties
      }
    >
      {/* swap: cinema projection plane */}
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
              radial-gradient(55% 48% at 52% 38%, color-mix(in oklch, var(--fg-amber) 42%, transparent) 0%, transparent 58%),
              linear-gradient(155deg, var(--fg-deep) 0%, var(--fg-ink) 50%, oklch(0.08 0.02 40) 100%)
            `,
          }}
        />
        {/* Projector cone */}
        <div
          data-plane="cone"
          className="absolute left-1/2 top-[8%] h-[55%] w-[62%] -translate-x-1/2 opacity-75"
          style={{
            background: `
              linear-gradient(
                180deg,
                color-mix(in oklch, var(--fg-chalk) 22%, transparent) 0%,
                color-mix(in oklch, var(--fg-amber) 35%, transparent) 45%,
                transparent 100%
              )
            `,
            clipPath: 'polygon(42% 0, 58% 0, 100% 100%, 0 100%)',
            filter: 'blur(2px)',
          }}
        />
        {/* Screen rectangle glow */}
        <div
          data-plane="screen"
          className="absolute left-1/2 top-[28%] h-[32%] w-[58%] max-w-lg -translate-x-1/2 opacity-90"
          style={{
            background: `
              linear-gradient(
                160deg,
                color-mix(in oklch, var(--fg-amber) 55%, white) 0%,
                color-mix(in oklch, var(--fg-amber-deep) 40%, transparent) 70%,
                transparent 100%
              )
            `,
            boxShadow:
              '0 0 60px color-mix(in oklch, var(--fg-amber) 35%, transparent)',
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.24] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
            backgroundSize: '130px 130px',
          }}
        />
      </div>

      <div
        data-gate="bar"
        className="absolute inset-x-0 top-0 z-20 flex h-[clamp(3.25rem,10vw,4.5rem)] items-end border-b border-[color-mix(in_oklch,var(--fg-amber)_28%,transparent)] bg-[color-mix(in_oklch,var(--fg-ink)_82%,transparent)] px-[clamp(2.75rem,8vw,4.5rem)] pb-2"
      >
        <p className="font-['Teko',sans-serif] text-sm tracking-[0.28em] text-[color-mix(in_oklch,var(--fg-amber)_85%,var(--fg-chalk))] uppercase">
          Frame 02 — Screen
        </p>
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-[clamp(2.75rem,8vw,4.5rem)] pb-12 pt-24 sm:pb-16">
        <h2
          id="frame-screen-title"
          className="font-['Teko',sans-serif] text-[clamp(2.5rem,10vw,4.5rem)] leading-[0.9] tracking-[0.02em] text-[var(--fg-chalk)] uppercase"
        >
          Dim the lights.
        </h2>
        <p className="mt-3 max-w-xs font-[Karla,sans-serif] text-sm leading-relaxed text-[color-mix(in_oklch,var(--fg-chalk)_68%,var(--fg-amber))]">
          Cinema heat. The frame holds the story.
        </p>
      </div>
    </section>
  )
}
