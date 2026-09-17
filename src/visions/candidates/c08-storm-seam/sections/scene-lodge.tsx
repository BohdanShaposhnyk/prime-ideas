import type { CSSProperties } from 'react'
import { SeamTypeFrame } from './seam-type-frame'

/** Lodge — left-rail block 1. */
export default function Lodge() {
  return (
    <section
      id="ss-lodge"
      aria-labelledby="ss-lodge-title"
      data-scene="lodge"
      className="absolute inset-0 isolate overflow-hidden text-[#E8E2D6]"
      style={
        {
          '--ss-walnut': '#3A2A1C',
          '--ss-stone': '#2C2A28',
          '--ss-moss': '#2F3D2E',
          '--ss-amber': '#C48A3A',
          '--ss-cream': '#E8E2D6',
        } as CSSProperties
      }
    >
      <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(50% 40% at 72% 18%, color-mix(in srgb, var(--ss-amber) 28%, transparent), transparent 55%),
              radial-gradient(40% 45% at 18% 70%, color-mix(in srgb, var(--ss-moss) 40%, transparent), transparent 60%),
              linear-gradient(150deg, #241C16 0%, var(--ss-walnut) 38%, var(--ss-stone) 72%, #1A1816 100%)
            `,
          }}
        />
        <div
          className="absolute inset-y-[8%] left-0 w-[38%] opacity-90"
          style={{
            background: `
              linear-gradient(100deg, color-mix(in srgb, var(--ss-stone) 80%, black) 0%, color-mix(in srgb, var(--ss-stone) 40%, transparent) 75%, transparent 100%),
              repeating-linear-gradient(0deg, transparent 0 26px, color-mix(in srgb, black 14%, transparent) 26px 27px)
            `,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[42%]"
          style={{
            background: `
              linear-gradient(0deg, color-mix(in srgb, var(--ss-walnut) 85%, black) 0%, color-mix(in srgb, var(--ss-walnut) 45%, transparent) 70%, transparent 100%),
              repeating-linear-gradient(90deg, transparent 0 20px, color-mix(in srgb, black 12%, transparent) 20px 21px)
            `,
          }}
        />
        <div
          className="absolute top-[14%] left-[42%] h-3 w-3 rounded-full"
          style={{
            background: 'var(--ss-amber)',
            boxShadow:
              '0 0 40px 18px color-mix(in srgb, var(--ss-amber) 45%, transparent), 120px 30px 50px 22px color-mix(in srgb, var(--ss-amber) 30%, transparent)',
          }}
        />
      </div>

      <SeamTypeFrame className="justify-start">
        <p
          data-type="tiny"
          className="mb-3 font-['Space_Grotesk',sans-serif] text-[0.65rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--ss-cream)_55%,transparent)] uppercase"
        >
          Lodge
        </p>
        <h2
          id="ss-lodge-title"
          data-type="headline"
          className="max-w-[10ch] font-['Unbounded',sans-serif] text-[clamp(2.75rem,11vw,6.5rem)] leading-[0.82] font-medium tracking-[-0.05em] text-[var(--ss-cream)]"
        >
          Dim wood. Soft stone.
        </h2>
        <p
          data-type="support"
          className="mt-4 max-w-sm font-['Space_Grotesk',sans-serif] text-sm leading-relaxed text-[color-mix(in_srgb,var(--ss-cream)_70%,transparent)]"
        >
          Norwegian quiet — glass, greenery, amber glassware waiting.
        </p>
      </SeamTypeFrame>
    </section>
  )
}
