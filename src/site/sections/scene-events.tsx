import { useRef } from 'react'
import DotField from '@/site/bits/DotField'
import FlexCarousel, { type FlexCarouselItem } from '@/site/bits/FlexCarousel'
import { BookNightButton } from '../components/book-night'
import { useTranslation } from '../copy'
import { orderedIds, t, type Catalog } from '../copy/translate'
import { GoldWord } from '../components/gold-word'
import { usePrefersReducedMotion } from '../hooks/media'
import { useSceneParallax } from '../hooks/scene-parallax'
import { useSnapInView } from '../hooks/snap-in-view'
import { lockupClass, lockupToSupportClass, sceneVeilClass, supportClass } from '../lib/palette'
import crowd from '../assets/event-cs6/carousel/crowd.webp'
import crowd2 from '../assets/event-cs6/carousel/crowd-2.webp'
import dj from '../assets/event-cs6/carousel/dj.webp'
import emotions from '../assets/event-cs6/carousel/emotions.webp'
import gamers from '../assets/event-cs6/carousel/gamers.webp'
import gamers2 from '../assets/event-cs6/carousel/gamers-2.webp'
import girls from '../assets/event-cs6/carousel/girls.webp'
import prize from '../assets/event-cs6/carousel/prize.webp'
import screen from '../assets/event-cs6/carousel/screen.webp'
import stage from '../assets/event-cs6/carousel/stage.webp'
import stage2 from '../assets/event-cs6/carousel/stage-2.webp'
import team from '../assets/event-cs6/carousel/team.webp'

type EventId = keyof Catalog['events']['photos']

/** Mixed so autoplay does not sit on one kind of shot. */
const art = {
  stage,
  crowd,
  gamers,
  dj,
  emotions,
  team,
  screen,
  prize,
  stage2,
  crowd2,
  gamers2,
  girls,
} as const satisfies Record<EventId, string>

const PHOTOS: FlexCarouselItem[] = orderedIds(t('events.order'), Object.keys(art) as EventId[], 'Events').map(
  (id) => ({ src: art[id], alt: t(`events.photos.${id}`) }),
)

/** Gallery exists only while the scene owns the port, so the intro restarts on each visit. */
const ENTER_AT = 0.6

const NIGHT_CAROUSEL = {
  fit: 'portrait',
  intro: 'spin',
  liquid: 0.84,
  reach: 0.37,
  radius: 10,
  squeeze: 0.35,
  dispersion: 1.76,
  bend: 0.08,
  gap: 57,
  tilt: 126,
} as const

export default function SceneEvents() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const live = useSnapInView(ref, { threshold: ENTER_AT })
  useSceneParallax(ref, !reduced)

  return (
    <section
      ref={ref}
      aria-labelledby="cs-events-title"
      data-scene="events"
      className="cs-scene cs-px relative isolate flex flex-col overflow-hidden bg-[var(--cs-pitch)] text-[var(--cs-ice)]"
    >
      <div aria-hidden className="cs-px-ground pointer-events-none absolute inset-0 -z-10">
        <DotField
          className="size-full"
          gradientFrom="rgba(207, 181, 59, 0.8)"
          gradientTo="rgba(169, 187, 224, 0.5)"
          glowColor="rgba(207, 181, 59, 0.45)"
        />
      </div>
      <div aria-hidden className={sceneVeilClass} />
      <header className="cs-px-copy relative z-20 shrink-0 px-5 pt-[var(--cs-header-h)] text-center sm:px-8">
        <h2 id="cs-events-title" className={lockupClass}>
          <GoldWord>{t('events.titlePrime')}</GoldWord> {t('events.titleRest')}
        </h2>
        <p className={`${lockupToSupportClass} ${supportClass}`}>{t('events.support')}</p>
      </header>
      <div className="cs-px-plane relative z-10 min-h-0 flex-1">
        {live ? (
          <FlexCarousel
            items={PHOTOS}
            {...NIGHT_CAROUSEL}
            autoplay
            focusOnClick={false}
            captions={false}
            captureWheel={false}
            className="absolute inset-0"
          />
        ) : null}
      </div>
      <div className="cs-px-copy relative z-20 shrink-0 px-5 pt-2 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-center sm:px-8 sm:pb-[max(calc(var(--cs-h,100svh)*0.12),env(safe-area-inset-bottom))]">
        <BookNightButton />
      </div>
    </section>
  )
}
