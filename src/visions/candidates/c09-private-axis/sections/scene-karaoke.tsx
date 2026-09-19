import DecryptedText from '@/shared/bits/DecryptedText'

/**
 * Karaoke — left yaw slab. RotateY enter is owned by motion/.
 */
export default function SceneKaraoke() {
  return (
    <section
      aria-labelledby="pa-karaoke-title"
      data-scene="karaoke"
      data-plane="karaoke"
      data-dock="yaw-left"
      className="pointer-events-none absolute inset-0 isolate"
    >
      <div
        data-slab="karaoke"
        className="pointer-events-auto absolute top-[14%] left-[4%] h-[62%] w-[min(58%,18rem)] origin-left sm:top-[12%] sm:left-[6%] sm:h-[70%] sm:w-[min(28%,20rem)]"
        style={{
          transform: 'translate3d(-6%, 0, -300px) rotateY(22deg)',
        }}
      >
        {/* swap: karaoke booth */}
        <div
          data-placeholder="visual"
          className="absolute inset-0 overflow-hidden border border-[color-mix(in_srgb,var(--pa-oxblood)_55%,var(--pa-steel))]"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--pa-oxblood) 18%, transparent) 100%),
                linear-gradient(90deg, #0C0A0A 0%, var(--pa-graphite) 100%)
              `,
            }}
          />
          <div
            className="absolute inset-y-[10%] left-1/2 w-px -translate-x-1/2"
            style={{
              background:
                'linear-gradient(180deg, transparent, color-mix(in srgb, var(--pa-bone) 45%, var(--pa-oxblood)), transparent)',
            }}
          />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-end p-4 sm:p-6">
          <p className="font-[family-name:var(--pa-body)] text-[0.6rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--pa-metal)_70%,transparent)] uppercase">
            03 — Voice
          </p>
          <h2
            id="pa-karaoke-title"
            data-type="discover"
            className="mt-2 font-[family-name:var(--pa-display)] text-[clamp(2.2rem,8vw,4.2rem)] leading-[0.8] font-extrabold tracking-[-0.03em] text-[var(--pa-bone)] uppercase"
          >
            <DecryptedText
              text="THE MIC"
              speed={40}
              maxIterations={12}
              sequential
              animateOn="hover"
              className="font-[family-name:var(--pa-display)]"
              encryptedClassName="font-[family-name:var(--pa-display)] opacity-50"
              parentClassName="block"
            />
          </h2>
          <p className="mt-3 max-w-[11rem] font-[family-name:var(--pa-body)] text-sm tracking-[0.03em] text-[color-mix(in_srgb,var(--pa-steel)_75%,var(--pa-bone))]">
            A room that does not clap.
          </p>
        </div>
      </div>
    </section>
  )
}
