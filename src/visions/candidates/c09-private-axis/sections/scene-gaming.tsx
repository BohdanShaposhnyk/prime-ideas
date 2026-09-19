import TiltedCard from '@/shared/bits/TiltedCard'
import DecryptedText from '@/shared/bits/DecryptedText'
import { GAMING_PLATE } from './axis-plates'

/**
 * Gaming — right-docked 2.5D plane. Lateral enter is owned by motion/.
 */
export default function SceneGaming() {
  return (
    <section
      aria-labelledby="pa-gaming-title"
      data-scene="gaming"
      data-plane="gaming"
      data-dock="right"
      className="pointer-events-none absolute inset-0 isolate"
    >
      <div
        data-slab="gaming"
        className="pointer-events-auto absolute top-[18%] right-[4%] h-[58%] w-[min(78%,34rem)] origin-right sm:right-[8%] sm:w-[min(52%,36rem)]"
        style={{
          transform: 'translate3d(8%, 0, -220px) rotateY(-16deg)',
        }}
      >
        {/* swap: gaming floor */}
        <div
          data-placeholder="visual"
          className="absolute inset-0 overflow-hidden border border-[color-mix(in_srgb,var(--pa-steel)_35%,transparent)]"
          aria-hidden
        >
          <TiltedCard
            imageSrc={GAMING_PLATE}
            altText=""
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            scaleOnHover={1.04}
            rotateAmplitude={10}
            showMobileWarning={false}
            showTooltip={false}
          />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-7">
          <p className="font-[family-name:var(--pa-body)] text-[0.6rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--pa-metal)_70%,transparent)] uppercase">
            01 — Play
          </p>
          <h2
            id="pa-gaming-title"
            data-type="discover"
            className="mt-2 font-[family-name:var(--pa-display)] text-[clamp(2.6rem,10vw,5rem)] leading-[0.8] font-extrabold tracking-[-0.03em] text-[var(--pa-bone)] uppercase"
          >
            <DecryptedText
              text="THE RIGS"
              speed={38}
              sequential
              animateOn="hover"
              className="font-[family-name:var(--pa-display)]"
              encryptedClassName="font-[family-name:var(--pa-display)] opacity-50"
              parentClassName="block"
            />
          </h2>
          <p className="mt-3 max-w-[14rem] font-[family-name:var(--pa-body)] text-sm tracking-[0.03em] text-[color-mix(in_srgb,var(--pa-steel)_75%,var(--pa-bone))]">
            Private tables. No spectators.
          </p>
        </div>
      </div>
    </section>
  )
}
