import type { CSSProperties } from 'react'
import { SeamTypeFrame } from './seam-type-frame'

/** Bar — left-rail block 2. */
export default function Bar() {
  return (
    <section
      aria-labelledby="ss-bar-title"
      data-scene="bar"
      className="absolute inset-0 isolate overflow-hidden text-[#E8E2D6]"
      style={
        {
          '--ss-walnut': '#3A2A1C',
          '--ss-amber': '#C48A3A',
          '--ss-cream': '#E8E2D6',
          '--ss-moss': '#2F3D2E',
          '--ss-smoke': '#6B6560',
        } as CSSProperties
      }
    >
      <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(50% 40% at 30% 70%, color-mix(in srgb, var(--ss-amber) 35%, transparent), transparent 55%),
              radial-gradient(40% 35% at 75% 25%, color-mix(in srgb, var(--ss-moss) 25%, transparent), transparent 50%),
              linear-gradient(160deg, #1A1410 0%, var(--ss-walnut) 45%, #12100E 100%)
            `,
          }}
        />
        <div
          className="absolute inset-x-[10%] top-[20%] h-[45%] opacity-50"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 80%, color-mix(in srgb, var(--ss-smoke) 40%, transparent), transparent 70%)
            `,
          }}
        />
        <div
          className="absolute bottom-[28%] left-[20%] right-[20%] h-[2px]"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--ss-amber) 40%, color-mix(in srgb, var(--ss-cream) 50%, transparent) 70%, transparent)',
            boxShadow: '0 0 28px color-mix(in srgb, var(--ss-amber) 40%, transparent)',
          }}
        />
      </div>

      <SeamTypeFrame className="justify-start">
        <p
          data-type="tiny"
          className="mb-3 font-['Space_Grotesk',sans-serif] text-[0.65rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--ss-amber)_80%,transparent)] uppercase"
        >
          Bar
        </p>
        <h2
          id="ss-bar-title"
          data-type="headline"
          className="max-w-[10ch] font-['Unbounded',sans-serif] text-[clamp(2.75rem,11vw,6rem)] leading-[0.82] font-medium tracking-[-0.05em] text-[var(--ss-cream)]"
        >
          Glass low. Smoke slow.
        </h2>
        <p
          data-type="support"
          className="mt-4 max-w-sm font-['Space_Grotesk',sans-serif] text-sm leading-relaxed text-[color-mix(in_srgb,var(--ss-cream)_70%,transparent)]"
        >
          Hookah ember, amber pour — the quiet half of the night.
        </p>
      </SeamTypeFrame>
    </section>
  )
}
