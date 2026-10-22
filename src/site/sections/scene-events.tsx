import { useRef } from 'react'
import DotField from '@/site/bits/DotField'
import FlexCarousel, { type FlexCarouselItem } from '@/site/bits/FlexCarousel'
import { BookNightButton } from '../components/book-night'
import { GoldWord } from '../components/gold-word'
import { useSnapInView } from '../hooks/snap-in-view'
import { lockupClass, lockupToSupportClass, supportClass } from '../lib/palette'
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

/** Mixed so autoplay does not sit on one kind of shot. */
const PHOTOS: FlexCarouselItem[] = [
  { src: stage, alt: 'Host with a microphone addressing the room' },
  { src: crowd, alt: 'Guests on the lounge sofas' },
  { src: gamers, alt: 'Players at the PCs with headsets on' },
  { src: dj, alt: 'DJ at the decks' },
  { src: emotions, alt: 'Team in a group hug' },
  { src: team, alt: 'Players standing in front of the stage screen' },
  { src: screen, alt: 'Crowd watching the match on the big screen' },
  { src: prize, alt: 'Winner holding a red plush prize overhead' },
  { src: stage2, alt: 'Host on stage in front of the match screen' },
  { src: crowd2, alt: 'Two guests on a red sofa' },
  { src: gamers2, alt: 'Player at a match PC' },
  { src: girls, alt: 'Two guests posing on a sofa' },
]

/** Gallery exists only while the scene owns the port, so the intro restarts on each visit. */
const ENTER_AT = 0.6

export default function SceneEvents() {
  const ref = useRef<HTMLElement>(null)
  const live = useSnapInView(ref, { threshold: ENTER_AT })

  return (
    <section
      ref={ref}
      aria-labelledby="cs-events-title"
      data-scene="events"
      className="cs-scene relative isolate flex flex-col overflow-hidden bg-[var(--cs-pitch)] text-[var(--cs-ice)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <DotField
          className="size-full"
          gradientFrom="rgba(207, 181, 59, 0.8)"
          gradientTo="rgba(169, 187, 224, 0.5)"
          glowColor="rgba(207, 181, 59, 0.45)"
        />
      </div>
      <header className="shrink-0 px-5 pt-[var(--cs-header-h)] text-center sm:px-8">
        <h2 id="cs-events-title" className={lockupClass}>
          <GoldWord>Prime</GoldWord> night
        </h2>
        <p className={`${lockupToSupportClass} ${supportClass}`}>Tournaments, parties, and match nights.</p>
      </header>
      <div className="relative min-h-0 flex-1">
        {live ? (
          <FlexCarousel
            items={PHOTOS}
            fit="portrait"
            intro="spin"
            autoplay
            liquid={0.84}
            reach={0.37}
            radius={10}
            squeeze={0.35}
            dispersion={1.76}
            bend={0.08}
            gap={57}
            tilt={126}
            captions={false}
            captureWheel={false}
            className="absolute inset-0"
          />
        ) : null}
      </div>
      <div className="shrink-0 px-5 pt-2 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-center sm:px-8 sm:pb-[max(calc(var(--cs-h,100svh)*0.12),env(safe-area-inset-bottom))]">
        <BookNightButton />
      </div>
    </section>
  )
}
