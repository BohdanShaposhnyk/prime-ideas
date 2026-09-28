import LaserFlow from '@/shared/bits/LaserFlow'
import SpecularButton from '@/shared/bits/SpecularButton'
import { prefersReducedMotion } from '@/shared/lib/motion'
import { BOOKING_URL } from '../booking'
import barGlass from '../assets/bar/bar-glass-blur.webp'
import projector from '../assets/cinema/projector-2.webp'
import keyboard from '../assets/gaming/keyboard.webp'
import hookahWarm from '../assets/hookah/hookah-warm-blur.webp'
import micPurple from '../assets/karaoke/mic-purple.webp'
import { isCoarsePointer, useCoarsePointer } from '../coarse'
import { ctaClass, palette, specularInk, supportClass } from '../palette'

const VENUES = [
  { id: 'play', name: 'Play zone', src: keyboard, wide: true },
  { id: 'bar', name: 'Bar with kitchen', src: barGlass, wide: false },
  { id: 'cinema', name: 'Cinema', src: projector, wide: false },
  { id: 'hookah', name: 'Hookah', src: hookahWarm, wide: false },
  { id: 'karaoke', name: 'Karaoke', src: micPurple, wide: false },
] as const

const captionClass =
  'font-[family-name:var(--cs-display)] text-[clamp(2.4rem,9vw,5.4rem)] leading-[var(--cs-lead-display)] tracking-[var(--cs-track-display)] text-[var(--cs-ice)] uppercase'

const cardNameClass =
  'font-[family-name:var(--cs-display)] text-[clamp(1.7rem,3.4vw,2.8rem)] leading-[var(--cs-lead-display)] tracking-[var(--cs-track-display)] text-[var(--cs-ice)] uppercase [text-shadow:0_2px_18px_rgba(0,0,0,0.65)]'

const listNameClass =
  'font-[family-name:var(--cs-display)] text-[clamp(1.7rem,7.4vw,2.35rem)] leading-none tracking-[var(--cs-track-display)] text-[var(--cs-ice)] uppercase'

function LaserPane({ coarse }: { coarse: boolean }) {
  return (
    <div data-placeholder="visual" className="pointer-events-none absolute inset-0" aria-hidden>
      <LaserFlow
        className="h-full w-full"
        color={palette.ice}
        backgroundColor={palette.pitch}
        horizontalBeamOffset={0}
        verticalBeamOffset={-0.46}
        verticalSizing={2.6}
        dpr={coarse ? 1 : 1.25}
        wispDensity={coarse ? 0.6 : 1}
        mouseTiltStrength={coarse ? 0 : 0.01}
      />
    </div>
  )
}

function StaticBeam() {
  return (
    <div
      data-placeholder="visual"
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[var(--cs-pitch)]"
      style={{
        backgroundImage:
          'linear-gradient(90deg, transparent 46%, color-mix(in srgb, var(--cs-ice) 92%, white) 50%, transparent 54%)',
      }}
    />
  )
}

function ExperienceCopy() {
  return (
    <div className="flex min-w-0 shrink-0 flex-col justify-center py-5 pl-5 pr-5 sm:py-6 sm:pl-8 sm:pr-8 md:h-full md:py-8 md:pr-6 lg:pl-12 lg:pr-10">
      <h2 id="cs-experience-title" className={captionClass}>
        <span className="block">
          The <span className="text-[var(--cs-gold)]">prime</span>
        </span>
        <span className="block">experience</span>
      </h2>
      <p className={`mt-3 max-w-[20rem] sm:mt-4 ${supportClass}`}>
        One place. Your kind of night.
      </p>
      <p className="mt-4 max-w-[26rem] font-[family-name:var(--cs-body)] text-[0.95rem] leading-relaxed font-normal text-[var(--cs-ice)] sm:text-[1.02rem]">
        Everything a good night out needs, brought together under one roof.
      </p>
      <div className="mt-6 sm:mt-8">
        <SpecularButton
          size="md"
          radius={999}
          tint="#ffffff"
          tintOpacity={0.06}
          blur={10}
          {...specularInk}
          intensity={1.15}
          autoAnimate={!isCoarsePointer()}
          className={ctaClass}
          onClick={() => {
            window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')
          }}
        >
          Book a night
        </SpecularButton>
      </div>
    </div>
  )
}

function ExperienceTypeList() {
  return (
    <ul className="flex flex-wrap items-baseline px-5 pt-2 pb-8 md:hidden">
      {VENUES.map((venue, index) => (
        <li key={venue.id} className={`${listNameClass} whitespace-nowrap`}>
          {venue.name}
          {index < VENUES.length - 1 ? (
            <span aria-hidden className="px-2.5 text-[var(--cs-gold)]">
              ·
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

function ExperienceGrid() {
  return (
    <ul className="hidden min-h-0 md:grid md:h-full md:grid-cols-2 md:grid-rows-3 md:gap-2.5 md:py-5 md:pr-5 md:pl-8 lg:gap-3 lg:py-6 lg:pr-7 lg:pl-10">
      {VENUES.map((venue) => (
        <li key={venue.id} className={`min-h-0 ${venue.wide ? 'md:col-span-2' : ''}`}>
          <article className="relative h-full overflow-hidden rounded-[var(--cs-radius-media)]">
            <img
              src={venue.src}
              alt=""
              className="absolute inset-0 size-full object-cover opacity-25"
              decoding="async"
              loading="lazy"
              draggable={false}
            />
            <p
              className={`absolute inset-0 flex items-center justify-center px-3 text-center ${cardNameClass} ${venue.wide ? 'md:text-[clamp(2.2rem,4.2vw,3.6rem)]' : ''}`}
            >
              {venue.name}
            </p>
          </article>
        </li>
      ))}
    </ul>
  )
}

export default function SceneExperience() {
  const reduced = prefersReducedMotion()
  const coarse = useCoarsePointer()

  return (
    <section
      aria-labelledby="cs-experience-title"
      data-scene="experience"
      className="cs-scene relative isolate overflow-hidden bg-[var(--cs-pitch)] text-[var(--cs-ice)]"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[200%] md:inset-0 md:w-full">
        {reduced ? <StaticBeam /> : <LaserPane coarse={coarse} />}
      </div>
      <div className="relative z-10 flex h-full min-h-0 flex-col md:grid md:grid-cols-2">
        <ExperienceCopy />
        <ExperienceTypeList />
        <ExperienceGrid />
      </div>
    </section>
  )
}
