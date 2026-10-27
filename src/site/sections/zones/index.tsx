import InfiniteSpiral from '@/site/bits/InfiniteSpiral'
import { BookNightButton } from '../../components/book-night'
import { FilmGrain } from '../../components/grain'
import { TypeScrim } from '../../components/type-scrim'
import { usePrefersReducedMotion } from '../../hooks/media'
import { useSceneParallax } from '../../hooks/scene-parallax'
import { lockupClass, lockupToSupportClass, sceneVeilClass, supportClass } from '../../lib/palette'
import { CARDS, ZONES_MIN_HEIGHT, SPIRAL, SPIRAL_ITEMS } from './config'
import { useZonesMotion } from './use-zones-motion'

export default function Zones() {
  const reduced = usePrefersReducedMotion()
  const { sectionRef, stickyRef, drivenProgressRef, wordIndex } = useZonesMotion()
  useSceneParallax(stickyRef, !reduced)
  const card = CARDS[wordIndex]

  return (
    <section
      ref={sectionRef}
      id="cs-nav-zones"
      aria-labelledby="cs-zones-title"
      data-scene="zones"
      data-scroll="zones-spiral"
      className="relative bg-[var(--cs-pitch)]"
      style={{ height: ZONES_MIN_HEIGHT }}
    >
      {CARDS.map((item, i) => (
        <div
          key={item.id}
          data-zones-stop=""
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-px"
          style={{ top: `calc(${i} * var(--cs-card-pitch, calc(var(--cs-h, 100svh) * 0.8)))` }}
        />
      ))}
      <div ref={stickyRef} className="cs-scene cs-px sticky top-0 isolate overflow-hidden">
        <div className="cs-px-ground pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {CARDS.map((still, i) => (
            <div
              key={still.id}
              className="absolute inset-0 opacity-0 transition-opacity duration-[820ms] ease-linear motion-reduce:transition-none data-[active]:opacity-100"
              data-active={i === wordIndex ? '' : undefined}
            >
              <img
                src={still.src}
                alt=""
                decoding="async"
                className="absolute inset-[-8%] h-[116%] w-[116%] max-w-none scale-[1.12] object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--cs-pitch)_84%,transparent)]" />
        </div>
        <FilmGrain className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light opacity-[0.14]" />
        <div aria-hidden className={sceneVeilClass} />

        <h2 id="cs-zones-title" className="sr-only">
          Play zone. Sim racing. Bar. Karaoke. Private room. Cinema hall. Hookah. PC prices.
        </h2>
        <div className="cs-px-copy pointer-events-none absolute bottom-[max(2.5rem,env(safe-area-inset-bottom))] left-[5%] z-30 w-[min(20rem,86vw)] sm:bottom-[12%] sm:left-[6%] sm:w-[min(88vw,36rem)]">
          <TypeScrim />
          <div aria-live="polite">
            <p
              data-copy="caption"
              className={`${lockupClass} [text-shadow:0_2px_22px_rgba(0,0,0,0.45)]`}
            >
              {card.word}
            </p>
            <p
              data-copy="support"
              className={`${lockupToSupportClass} [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] ${supportClass}`}
            >
              {card.line}
            </p>
          </div>
          <div className="pointer-events-auto mt-4 sm:mt-5">
            <BookNightButton />
          </div>
        </div>

        <div className="cs-px-plane absolute inset-0 z-10">
          <InfiniteSpiral
            items={SPIRAL_ITEMS}
            drivenProgressRef={drivenProgressRef}
            animationMode="scroll"
            speed={0}
            direction="up"
            {...SPIRAL}
            finite
            pauseOnHover={false}
            imageFit="cover"
            className="h-full min-h-0"
          />
        </div>
      </div>
    </section>
  )
}
