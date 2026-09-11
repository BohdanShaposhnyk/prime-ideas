import type { CSSProperties } from 'react'

/**
 * Mic — karaoke stage heat inside the gate.
 */
export default function FrameMic() {
  return (
    <section
      id="mic"
      aria-labelledby="frame-mic-title"
      data-scene="mic"
      data-scroll="gate"
      data-frame="3"
      className="sticky top-0 isolate flex h-dvh w-full overflow-hidden text-[oklch(0.93_0.01_95)]"
      style={
        {
          '--fg-ink': 'oklch(0.1 0.025 25)',
          '--fg-deep': 'oklch(0.2 0.04 25)',
          '--fg-coral': 'oklch(0.68 0.14 25)',
          '--fg-coral-hot': 'oklch(0.75 0.15 30)',
          '--fg-chalk': 'oklch(0.93 0.01 95)',
          zIndex: 4,
        } as CSSProperties
      }
    >
      {/* swap: karaoke stage plane */}
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
              radial-gradient(48% 42% at 50% 55%, color-mix(in oklch, var(--fg-coral) 48%, transparent) 0%, transparent 60%),
              linear-gradient(170deg, var(--fg-deep) 0%, var(--fg-ink) 58%, oklch(0.08 0.02 20) 100%)
            `,
          }}
        />
        {/* Stage wash */}
        <div
          data-plane="wash"
          className="absolute inset-x-[8%] bottom-[10%] top-[35%] opacity-80"
          style={{
            background: `
              linear-gradient(
                180deg,
                transparent 0%,
                color-mix(in oklch, var(--fg-coral-hot) 25%, transparent) 40%,
                color-mix(in oklch, var(--fg-coral) 40%, transparent) 100%
              )
            `,
            maskImage:
              'radial-gradient(ellipse 70% 55% at 50% 70%, black 0%, transparent 75%)',
          }}
        />
        {/* Mic stand highlight */}
        <div
          data-plane="stand"
          className="absolute left-1/2 top-[30%] h-[48%] w-px -translate-x-1/2 opacity-70"
          style={{
            background: `
              linear-gradient(
                180deg,
                transparent 0%,
                color-mix(in oklch, var(--fg-chalk) 55%, var(--fg-coral)) 30%,
                color-mix(in oklch, var(--fg-coral) 70%, transparent) 100%
              )
            `,
            boxShadow:
              '0 0 24px color-mix(in oklch, var(--fg-coral) 45%, transparent)',
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.22] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '145px 145px',
          }}
        />
      </div>

      <div
        data-gate="bar"
        className="absolute inset-x-0 top-0 z-20 flex h-[clamp(3.25rem,10vw,4.5rem)] items-end border-b border-[color-mix(in_oklch,var(--fg-coral)_30%,transparent)] bg-[color-mix(in_oklch,var(--fg-ink)_82%,transparent)] px-[clamp(2.75rem,8vw,4.5rem)] pb-2"
      >
        <p className="font-['Teko',sans-serif] text-sm tracking-[0.28em] text-[color-mix(in_oklch,var(--fg-coral)_85%,var(--fg-chalk))] uppercase">
          Frame 03 — Mic
        </p>
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-[clamp(2.75rem,8vw,4.5rem)] pb-12 pt-24 sm:pb-16">
        <h2
          id="frame-mic-title"
          className="font-['Teko',sans-serif] text-[clamp(2.5rem,10vw,4.5rem)] leading-[0.9] tracking-[0.02em] text-[var(--fg-chalk)] uppercase"
        >
          Take the mic.
        </h2>
        <p className="mt-3 max-w-xs font-[Karla,sans-serif] text-sm leading-relaxed text-[color-mix(in_oklch,var(--fg-chalk)_68%,var(--fg-coral))]">
          Karaoke heat. Voices fill the aperture.
        </p>
      </div>
    </section>
  )
}
