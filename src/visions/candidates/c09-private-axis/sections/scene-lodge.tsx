import DarkVeil from '@/shared/bits/DarkVeil'
import SplitFlapText from '@/shared/bits/SplitFlapText'

type SceneLodgeProps = {
  veilActive?: boolean
}

/**
 * Lodge — veil field. Type discovers after dock; motion/ owns the delay.
 * DarkVeil stays mounted; RAF pauses while this station is off-beat.
 */
export default function SceneLodge({ veilActive = false }: SceneLodgeProps) {
  return (
    <section
      aria-labelledby="pa-lodge-title"
      data-scene="lodge"
      data-plane="lodge"
      data-dock="depth"
      className="pointer-events-none absolute inset-0 isolate"
    >
      <div
        data-slab="lodge"
        className="pointer-events-auto absolute top-[26%] right-[10%] h-[48%] w-[min(82%,38rem)] origin-center sm:right-[14%]"
        style={{
          transform: 'translate3d(4%, 8%, -520px) rotateY(-8deg)',
        }}
      >
        {/* swap: lodge interior */}
        <div
          data-placeholder="visual"
          data-veil="host"
          className="absolute inset-0 overflow-hidden border border-[color-mix(in_srgb,var(--pa-steel)_28%,transparent)]"
          aria-hidden
          style={{
            background: `
              radial-gradient(ellipse 50% 45% at 30% 70%, color-mix(in srgb, #3A2C24 55%, transparent), transparent 65%),
              linear-gradient(160deg, #0B0B0C 0%, #171412 48%, #0E0D0C 100%)
            `,
          }}
        >
          <DarkVeil
            active={veilActive}
            hueShift={-42}
            noiseIntensity={0.18}
            scanlineIntensity={0.12}
            speed={0.22}
            scanlineFrequency={0.35}
            warpAmount={0.06}
            resolutionScale={0.35}
          />
          <div
            className="absolute inset-0 bg-[#161310] mix-blend-color"
            aria-hidden
          />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-7">
          <p className="font-[family-name:var(--pa-body)] text-[0.6rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--pa-metal)_70%,transparent)] uppercase">
            04 — Hush
          </p>
          <h2
            id="pa-lodge-title"
            data-type="discover"
            className="mt-2"
          >
            <span className="sr-only">The lodge</span>
            <SplitFlapText
              words={['THE LODGE']}
              loop={false}
              charset="alpha"
              flipDuration={0.14}
              stagger={0.05}
              tileColor="#141416"
              textColor="#E4DFD4"
              tileRadius={0}
              fontSize="clamp(1.4rem, 4.5vw, 2.4rem)"
              gap={4}
            />
          </h2>
          <p className="mt-3 max-w-[14rem] font-[family-name:var(--pa-body)] text-sm tracking-[0.03em] text-[color-mix(in_srgb,var(--pa-steel)_75%,var(--pa-bone))]">
            Smoke. Stone. Quiet.
          </p>
        </div>
      </div>
    </section>
  )
}
