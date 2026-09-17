import type { CSSProperties } from 'react'
import { SeamTypeFrame } from './seam-type-frame'

/** Gaming — right-rail block 2. */
export default function Gaming() {
  return (
    <section
      aria-labelledby="ss-gaming-title"
      data-scene="gaming"
      className="absolute inset-0 isolate overflow-hidden text-[#F5F5F5]"
      style={
        {
          '--ss-acid': '#B8FF3C',
          '--ss-mag': '#FF2D6A',
          '--ss-white': '#F5F5F5',
          '--ss-black': '#050505',
        } as CSSProperties
      }
    >
      <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(55% 45% at 60% 40%, color-mix(in srgb, var(--ss-acid) 22%, transparent), transparent 55%),
              radial-gradient(40% 35% at 20% 70%, color-mix(in srgb, var(--ss-mag) 28%, transparent), transparent 55%),
              linear-gradient(200deg, #080808 0%, var(--ss-black) 50%, #0A1208 100%)
            `,
          }}
        />
        <div
          className="absolute inset-[12%_8%_30%_8%] border border-[color-mix(in_srgb,var(--ss-acid)_25%,transparent)]"
          style={{
            background: `
              linear-gradient(180deg, color-mix(in srgb, var(--ss-acid) 8%, transparent), transparent 40%),
              #0C0C0C
            `,
            boxShadow: 'inset 0 0 60px color-mix(in srgb, var(--ss-acid) 12%, transparent)',
          }}
        />
        <div
          className="absolute top-[18%] right-[14%] h-2 w-2 rounded-full bg-[var(--ss-acid)]"
          style={{
            boxShadow: '0 0 24px color-mix(in srgb, var(--ss-acid) 70%, transparent)',
          }}
        />
      </div>

      <SeamTypeFrame className="items-end justify-end text-right">
        <p
          data-type="tiny"
          className="mb-4 font-['Space_Grotesk',sans-serif] text-[0.65rem] tracking-[0.3em] text-[var(--ss-acid)] uppercase"
        >
          Arena
        </p>
        <div className="max-w-[10ch]">
          <h2
            id="ss-gaming-title"
            data-type="headline"
            className="font-['Unbounded',sans-serif] text-[clamp(2.5rem,10vw,5.5rem)] leading-[0.84] font-medium tracking-[-0.05em]"
          >
            Gaming room. No mercy.
          </h2>
          <p
            data-type="support"
            className="mt-3 font-['Space_Grotesk',sans-serif] text-sm text-[color-mix(in_srgb,var(--ss-white)_65%,transparent)]"
          >
            Screens stacked. Chairs locked. Prime plays loud.
          </p>
        </div>
      </SeamTypeFrame>
    </section>
  )
}
