import TiltedCard from '@/shared/bits/TiltedCard'
import DecryptedText from '@/shared/bits/DecryptedText'
import { CINEMA_PLATE } from './axis-plates'

/**
 * Cinema — rear-Z overtake plane. Plunge enter is owned by motion/.
 */
export default function SceneCinema() {
  return (
    <section
      aria-labelledby="pa-cinema-title"
      data-scene="cinema"
      data-plane="cinema"
      data-dock="rear"
      className="pointer-events-none absolute inset-0 isolate"
    >
      <div
        data-slab="cinema"
        className="pointer-events-auto absolute top-[22%] left-[18%] h-[52%] w-[min(86%,40rem)] origin-center sm:left-[28%]"
        style={{
          transform: 'translate3d(0, 4%, -420px) scale(0.86)',
        }}
      >
        {/* swap: cinema gate */}
        <div
          data-placeholder="visual"
          className="absolute inset-0 overflow-hidden border border-[color-mix(in_srgb,var(--pa-metal)_22%,transparent)]"
          aria-hidden
        >
          <TiltedCard
            imageSrc={CINEMA_PLATE}
            altText=""
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            scaleOnHover={1.03}
            rotateAmplitude={8}
            showMobileWarning={false}
            showTooltip={false}
          />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-7">
          <p className="font-[family-name:var(--pa-body)] text-[0.6rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--pa-metal)_70%,transparent)] uppercase">
            02 — Screen
          </p>
          <h2
            id="pa-cinema-title"
            data-type="discover"
            className="mt-2 font-[family-name:var(--pa-display)] text-[clamp(2.6rem,10vw,5rem)] leading-[0.8] font-extrabold tracking-[-0.03em] text-[var(--pa-bone)] uppercase"
          >
            <DecryptedText
              text="THE GATE"
              speed={38}
              sequential
              animateOn="hover"
              className="font-[family-name:var(--pa-display)]"
              encryptedClassName="font-[family-name:var(--pa-display)] opacity-50"
              parentClassName="block"
            />
          </h2>
          <p className="mt-3 max-w-[14rem] font-[family-name:var(--pa-body)] text-sm tracking-[0.03em] text-[color-mix(in_srgb,var(--pa-steel)_75%,var(--pa-bone))]">
            One screen. No ads.
          </p>
        </div>
      </div>
    </section>
  )
}
