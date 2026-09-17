import type { CSSProperties } from 'react'
import { SeamTypeFrame } from './seam-type-frame'

/** Dual Stage — right-rail block 1. */
export default function DualStage() {
  return (
    <section
      aria-labelledby="ss-stage-title"
      data-scene="dual-stage"
      className="absolute inset-0 isolate overflow-hidden text-[#F5F5F5]"
      style={
        {
          '--ss-black': '#050505',
          '--ss-acid': '#B8FF3C',
          '--ss-mag': '#FF2D6A',
          '--ss-white': '#F5F5F5',
        } as CSSProperties
      }
    >
      <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(55% 45% at 70% 35%, color-mix(in srgb, var(--ss-mag) 40%, transparent), transparent 58%),
              radial-gradient(40% 35% at 15% 80%, color-mix(in srgb, var(--ss-acid) 18%, transparent), transparent 55%),
              linear-gradient(200deg, #080808 0%, var(--ss-black) 50%, #1A0510 100%)
            `,
          }}
        />
        <div
          className="absolute right-0 bottom-[22%] left-[10%] h-[3px]"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--ss-mag) 30%, var(--ss-acid) 70%, transparent)',
            boxShadow: '0 0 28px color-mix(in srgb, var(--ss-mag) 55%, transparent)',
          }}
        />
      </div>

      <SeamTypeFrame className="items-end justify-end text-right">
        <p
          data-type="tiny"
          className="mb-4 font-['Space_Grotesk',sans-serif] text-[0.65rem] tracking-[0.3em] text-[var(--ss-mag)] uppercase"
        >
          Stage
        </p>
        <h2
          id="ss-stage-title"
          data-type="headline"
          className="max-w-[9ch] font-['Unbounded',sans-serif] text-[clamp(2.5rem,10vw,5.5rem)] leading-[0.84] font-medium tracking-[-0.05em]"
        >
          Sing until it scorches.
        </h2>
        <p
          data-type="support"
          className="mt-3 max-w-xs font-['Space_Grotesk',sans-serif] text-sm text-[color-mix(in_srgb,var(--ss-white)_65%,transparent)]"
        >
          Mic glare. Black room. No soft edges.
        </p>
      </SeamTypeFrame>
    </section>
  )
}
