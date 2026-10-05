import BorderGlow from '@/site/bits/BorderGlow'
import MicroSlats from '@/site/bits/MicroSlats'
import SplitFlapText from '@/site/bits/SplitFlapText'
import { BookNightButton } from '../components/book-night'
import { GoldWord } from '../components/gold-word'
import { useInView } from '../hooks/in-view'
import { usePrefersReducedMotion } from '../hooks/media'
import { kickerClass, lockupClass, supportClass, violet } from '../lib/palette'

const OFFERS = [
  {
    id: 'welcome',
    kicker: 'New guests',
    amount: '50',
    lead: 'On your account,',
    rest: 'or your first hour free.',
    note: 'For every new guest.',
  },
  {
    id: 'birthday',
    kicker: 'Birthday',
    amount: '300',
    lead: 'On your account,',
    rest: 'the day you celebrate.',
    note: 'Bring an ID.',
  },
] as const

const amountClass =
  'font-[family-name:var(--cs-display)] text-[clamp(1.9rem,8.5vw,4.8rem)] leading-none tracking-[var(--cs-track-display)] text-[var(--cs-ice)] md:text-[clamp(3.2rem,6.4vw,4.8rem)]'

const lineClass =
  'font-[family-name:var(--cs-body)] text-[0.92rem] leading-snug font-normal text-[var(--cs-ice)] sm:text-[1.08rem]'

const noteClass =
  'font-[family-name:var(--cs-body)] text-[0.78rem] leading-snug text-[var(--cs-caption)]'

/** Same violet / ice pair as the hero MoltenMetal accents, on a near-black field. */
const SLAT_BG = '#07060C'

const GLOW = {
  glowColor: '248 100 74',
  colors: [violet.accent, violet.glint, violet.void],
} as const

/** Longest verb sets the tile count. Uppercase so flaps stay inside the tile. */
const VENUE_VERBS = ['PLAY', 'DRINK', 'EAT', 'CHILL', 'SING'] as const

const glassClass =
  'bg-[color-mix(in_srgb,#07060C_62%,transparent)] [&>div:nth-child(-n+2)]:hidden [&>div:last-child]:h-full [&>div:last-child]:min-h-0 [&>div:last-child]:justify-start [&>div:last-child]:!overflow-hidden sm:[&>div:last-child]:justify-center'

function ExperienceCopy() {
  return (
    <div className="flex min-w-0 flex-1 flex-col justify-center py-8 pl-5 pr-5 sm:py-10 sm:pl-8 sm:pr-8 md:h-full md:flex-none md:py-8 md:pr-6 lg:pl-12 lg:pr-10">
      <h2 id="cs-experience-offers-title" className={lockupClass}>
        <span className="block">
          The <GoldWord>prime</GoldWord>
        </span>
        <span className="block">experience</span>
      </h2>
      <p className={`mt-4 max-w-[20rem] sm:mt-5 ${supportClass}`}>One place. Your kind of night.</p>
      <p className="mt-3 max-w-[26rem] font-[family-name:var(--cs-body)] text-[0.95rem] leading-relaxed font-normal text-[var(--cs-ice)] sm:mt-4 sm:text-[1.02rem]">
        Everything a good night out needs, brought together under one roof.
      </p>
      <div className="mt-5 w-fit max-w-full sm:mt-6">
        <p className="sr-only">Play, drink, eat, chill, sing</p>
        <SplitFlapText
          aria-hidden
          words={[...VENUE_VERBS]}
          loop
          charset="alpha"
          padTo={5}
          flipsPerChar={5}
          flipDuration={0.1}
          stagger={0.045}
          cycleDelay={2000}
          tileColor="#161222"
          textColor="#F4F7FF"
          tileRadius={6}
          gap="0.1em"
          fontSize="clamp(2.15rem, 4.4vw, 2.85rem)"
          className="max-w-full gap-[0.1em]"
        />
      </div>
      <div className="mt-5 sm:mt-6">
        <BookNightButton />
      </div>
    </div>
  )
}

function OfferCard({
  offer,
  animated,
}: {
  offer: (typeof OFFERS)[number]
  animated: boolean
}) {
  return (
    <BorderGlow
      className={`h-full min-h-0 w-full flex-1 ${glassClass}`}
      edgeSensitivity={46}
      glowColor={GLOW.glowColor}
      backgroundColor="rgba(10, 8, 18, 0.28)"
      borderRadius={22}
      glowRadius={12}
      glowIntensity={0.55}
      coneSpread={8}
      animated={animated}
      colors={[...GLOW.colors]}
      fillOpacity={0}
    >
      <div className="flex h-full min-h-0 flex-col justify-start px-3 py-2.5 text-left sm:justify-center sm:px-5 sm:py-6 md:px-8 lg:px-9">
        <p className={kickerClass}>{offer.kicker}</p>
        <p className="mt-1.5 flex items-end gap-[0.3em] sm:mt-3">
          <span className={amountClass}>{offer.amount}</span>
          <span className="mb-[0.08em] font-[family-name:var(--cs-body)] text-[clamp(1.15rem,2vw,1.4rem)] leading-none font-medium text-[var(--cs-gold)]">
            zł
          </span>
        </p>
        <p className={`mt-2 sm:mt-3 ${lineClass}`}>
          <span className="block">{offer.lead}</span>
          <span className="block">{offer.rest}</span>
        </p>
        <p className={`mt-1.5 ${noteClass}`}>{offer.note}</p>
      </div>
    </BorderGlow>
  )
}

export default function SceneExperienceV2() {
  const reduced = usePrefersReducedMotion()
  const [rootRef, seen] = useInView<HTMLElement>({ once: true, threshold: 0.45 })
  const sweep = seen && !reduced

  return (
    <section
      ref={rootRef}
      aria-labelledby="cs-experience-offers-title"
      data-scene="experience-offers"
      className="cs-scene relative isolate overflow-hidden text-[var(--cs-ice)]"
      style={{ backgroundColor: SLAT_BG }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <MicroSlats
          preset="tide"
          color="#241C3A"
          glintColor={violet.accent}
          backgroundColor={SLAT_BG}
          speed={0.32}
          contrast={1.7}
          fog={0.22}
          glint={1.2}
          gap={4}
          interactive={false}
          intro={!reduced}
        />
      </div>
      <div className="relative z-10 flex h-full min-h-0 flex-col md:grid md:grid-cols-2">
        <ExperienceCopy />
        <ul className="flex shrink-0 flex-row gap-2 px-5 pb-5 sm:gap-3 sm:px-8 sm:pb-8 md:h-full md:min-h-0 md:flex-col md:gap-4 md:py-6 md:pr-8 md:pl-6 lg:py-8 lg:pr-12 lg:pl-8">
          {OFFERS.map((offer) => (
            <li key={offer.id} className="flex min-h-0 min-w-0 flex-1 flex-col">
              <OfferCard offer={offer} animated={sweep} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
