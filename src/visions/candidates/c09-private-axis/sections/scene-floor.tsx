import DecryptedText from '@/shared/bits/DecryptedText'

/**
 * Floor — bar and kitchen dock from opposite laterals and meet on the axis.
 */
export default function SceneFloor() {
  return (
    <section
      aria-labelledby="pa-floor-title"
      data-scene="floor"
      data-plane="floor"
      data-dock="dual-lateral"
      className="pointer-events-none absolute inset-0 isolate"
    >
      <h2 id="pa-floor-title" className="sr-only">
        Bar and kitchen
      </h2>

      <div
        data-slab="bar"
        data-dock="left"
        className="pointer-events-auto absolute top-[8%] left-[5%] h-[40%] w-[90%] origin-left sm:top-[24%] sm:left-[8%] sm:h-[54%] sm:w-[min(46%,22rem)]"
        style={{
          transform: 'translate3d(-4%, 0, -360px) rotateY(12deg)',
        }}
      >
        {/* swap: bar counter */}
        <div
          data-placeholder="visual"
          className="absolute inset-0 overflow-hidden border border-[color-mix(in_srgb,var(--pa-metal)_30%,transparent)]"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(180deg, #121110 0%, #1A1614 40%, #0C0B0A 100%),
                repeating-linear-gradient(
                  90deg,
                  transparent 0 22px,
                  color-mix(in srgb, var(--pa-oxblood) 14%, transparent) 22px 23px
                )
              `,
            }}
          />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-end p-5">
          <p className="font-[family-name:var(--pa-body)] text-[0.6rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--pa-metal)_70%,transparent)] uppercase">
            05a — Drink
          </p>
          <p
            data-type="discover"
            className="mt-2 font-[family-name:var(--pa-display)] text-[clamp(2.1rem,7vw,3.8rem)] leading-[0.8] font-extrabold tracking-[-0.03em] text-[var(--pa-bone)] uppercase"
          >
            <DecryptedText
              text="BAR"
              speed={36}
              sequential
              animateOn="hover"
              className="font-[family-name:var(--pa-display)]"
              encryptedClassName="font-[family-name:var(--pa-display)] opacity-50"
              parentClassName="block"
            />
          </p>
          <p className="mt-3 font-[family-name:var(--pa-body)] text-sm tracking-[0.03em] text-[color-mix(in_srgb,var(--pa-steel)_75%,var(--pa-bone))]">
            Drink slower.
          </p>
        </div>
      </div>

      <div
        data-slab="kitchen"
        data-dock="right"
        className="pointer-events-auto absolute top-[52%] right-[5%] h-[40%] w-[90%] origin-right sm:top-[28%] sm:right-[8%] sm:h-[50%] sm:w-[min(46%,22rem)]"
        style={{
          transform: 'translate3d(4%, 0, -360px) rotateY(-12deg)',
        }}
      >
        {/* swap: kitchen pass */}
        <div
          data-placeholder="visual"
          className="absolute inset-0 overflow-hidden border border-[color-mix(in_srgb,var(--pa-steel)_32%,transparent)]"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 40% 30% at 70% 80%, color-mix(in srgb, var(--pa-metal) 16%, transparent), transparent 70%),
                linear-gradient(210deg, #101010 0%, #181818 50%, #0B0B0B 100%)
              `,
            }}
          />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-end p-5">
          <p className="font-[family-name:var(--pa-body)] text-[0.6rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--pa-metal)_70%,transparent)] uppercase">
            05b — Plate
          </p>
          <p
            data-type="discover"
            className="mt-2 font-[family-name:var(--pa-display)] text-[clamp(2.1rem,7vw,3.8rem)] leading-[0.8] font-extrabold tracking-[-0.03em] text-[var(--pa-bone)] uppercase"
          >
            <DecryptedText
              text="KITCHEN"
              speed={36}
              sequential
              animateOn="hover"
              className="font-[family-name:var(--pa-display)]"
              encryptedClassName="font-[family-name:var(--pa-display)] opacity-50"
              parentClassName="block"
            />
          </p>
          <p className="mt-3 font-[family-name:var(--pa-body)] text-sm tracking-[0.03em] text-[color-mix(in_srgb,var(--pa-steel)_75%,var(--pa-bone))]">
            Eat late.
          </p>
        </div>
      </div>
    </section>
  )
}
