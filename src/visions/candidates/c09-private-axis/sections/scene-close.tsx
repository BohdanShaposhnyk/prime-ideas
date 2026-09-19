import SplitFlapText from '@/shared/bits/SplitFlapText'

/**
 * Close — axis locks; membership stamp. Plunge settle is owned by motion/.
 */
export default function SceneClose() {
  return (
    <section
      id="pa-close"
      aria-labelledby="pa-close-title"
      data-scene="close"
      data-plane="close"
      data-dock="lock"
      className="pointer-events-none absolute inset-0 isolate"
    >
      <div
        data-slab="stamp"
        className="pointer-events-auto absolute top-[44%] left-[62%] w-[min(70%,16rem)]"
        style={{
          transform: 'translate3d(-50%, -50%, -160px) scale(0.92)',
        }}
      >
        {/* swap: membership stamp */}
        <div
          data-placeholder="visual"
          className="relative border border-[color-mix(in_srgb,var(--pa-metal)_40%,transparent)] px-6 py-10 text-center sm:px-8"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--pa-graphite) 88%, transparent), color-mix(in srgb, var(--pa-void) 92%, transparent))',
          }}
        >
          <p className="font-[family-name:var(--pa-body)] text-[0.6rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--pa-metal)_80%,var(--pa-bone))] uppercase">
            Axis locked
          </p>
          <h2 id="pa-close-title" data-type="discover" className="mt-4">
            <span className="sr-only">Member</span>
            <SplitFlapText
              words={['MEMBER']}
              loop={false}
              charset="alpha"
              flipDuration={0.12}
              stagger={0.06}
              tileColor="#141416"
              textColor="#E4DFD4"
              tileRadius={0}
              fontSize="clamp(1.6rem, 5vw, 2.6rem)"
              gap={3}
            />
          </h2>
          <p className="mt-5 font-[family-name:var(--pa-body)] text-sm tracking-[0.06em] text-[color-mix(in_srgb,var(--pa-steel)_80%,var(--pa-bone))]">
            The door remembers you.
          </p>
          <p className="mt-6 font-[family-name:var(--pa-body)] text-[0.62rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--pa-oxblood)_75%,var(--pa-metal))] uppercase">
            Warsaw · private floor
          </p>
        </div>
      </div>
    </section>
  )
}
