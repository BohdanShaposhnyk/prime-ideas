import { useMemo } from 'react'
import { ArrowRight } from 'lucide-react'
import DriftWall, { type DriftWallItem } from '@/site/bits/DriftWall'
import barPartyHor from '../assets/bar/bar-party-hor.webp'
import projector from '../assets/cinema/projector.webp'
import projectorWide from '../assets/cinema/projector-2.webp'
import gamerGirlHor from '../assets/gaming/gamer-girl-hor.webp'
import gamerGirlLight from '../assets/gaming/gamer-girl-light-hor.webp'
import keyboardHor from '../assets/gaming/keyboard-hor.webp'
import micGold from '../assets/karaoke/mic-gold.webp'
import micPurple from '../assets/karaoke/mic-purple.webp'
import singerHor from '../assets/karaoke/singer-hor.webp'
import smoking from '../assets/hookah/smoking.webp'
import seats from '../assets/cinema/seats.webp'
import pcParty from '../assets/gaming/pc-party.webp'
import { useMediaQuery } from '../hooks/media'
import { GoldWord } from '../components/gold-word'
import { ctaClass, lockupClass, supportClass } from '../lib/palette'

const FRANCHISE_MAIL = 'mailto:abc@xyz.com'

const PROOFS = ['Established concept', 'Full brand support', 'Your city, your Prime', 'Navi partner'] as const

const WALL_IMAGES = [
  { src: barPartyHor, title: 'Bar night' },
  { src: gamerGirlLight, title: 'Arena' },
  { src: singerHor, title: 'Stage' },
  { src: keyboardHor, title: 'Keys' },
  { src: projector, title: 'Screen' },
  { src: gamerGirlHor, title: 'Play' },
  { src: micPurple, title: 'Mic' },
  { src: projectorWide, title: 'Cinema' },
  { src: smoking, title: 'Smoke' },
  { src: seats, title: 'Seats' },
  { src: pcParty, title: 'Party' },
  { src: micGold, title: 'Gold mic' },
] as const

/** Same breaks the photo tiles use: two lines, so the long side of the card can hold each one. */
function proofLabel(title: string) {
  if (title.includes('. ')) {
    return title
      .split('. ')
      .map((part, i, all) => (i < all.length - 1 ? `${part}.` : part))
      .join('\n')
  }
  const words = title.split(' ')
  if (words.length <= 1) return title
  if (words.length === 2) return words.join('\n')
  return `${words.slice(0, 2).join(' ')}\n${words.slice(2).join(' ')}`
}

/**
 * Every belt holds four cards, one full proof pass. Stills are dealt in order
 * with no wrap, so the repeated copy is that same four.
 */
function buildWallItems(columns: number, proofRow: number): DriftWallItem[] {
  const perBelt = PROOFS.length
  const total = columns * perBelt
  const items: DriftWallItem[] = []
  let imageIndex = 0
  let proofIndex = 0

  for (let i = 0; i < total; i++) {
    if (i % columns === proofRow) {
      const title = PROOFS[proofIndex]
      items.push({
        label: proofLabel(title),
        title,
      })
      proofIndex += 1
    } else {
      const media = WALL_IMAGES[imageIndex]
      items.push({ image: media.src, title: media.title })
      imageIndex += 1
    }
  }

  return items
}

const PROOF_ROW = 1
const NARROW_WALL = '(max-width: 767px)'

export default function SceneFranchiseV2() {
  const narrow = useMediaQuery(NARROW_WALL)
  const columns = narrow ? 4 : 3
  const items = useMemo(() => buildWallItems(columns, PROOF_ROW), [columns])
  return (
    <section
      aria-labelledby="cs-franchise-v2-title"
      data-scene="franchise-v2"
      className="cs-scene relative isolate flex flex-col overflow-hidden bg-[var(--cs-pitch)] text-[var(--cs-ice)] md:block"
    >
      {/* Desktop veil opens the top-right so the wall reads beside the lockup. */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 110% 105% at 100% -5%, transparent 0%, transparent 34%, rgba(0,0,0,0.28) 52%, rgba(0,0,0,0.72) 68%, #000 82%)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[88rem] shrink-0 items-start px-5 pt-10 sm:px-8 md:h-full md:items-center md:py-12 lg:px-12 lg:py-14">
        <div className="grid w-full grid-cols-1 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="flex min-w-0 flex-col items-start gap-6 md:gap-10 lg:gap-12">
            <div>
              <h2 id="cs-franchise-v2-title" className={lockupClass}>
                <span className="block">Make</span>
                <GoldWord block>Prime</GoldWord>
                <span className="block">yours</span>
              </h2>
              <p className={`mt-4 max-w-[22rem] sm:mt-5 ${supportClass}`}>
                Bring the Prime experience to your city.
              </p>
            </div>
            <a
              href={FRANCHISE_MAIL}
              className={`inline-flex items-center gap-2 rounded-full bg-[var(--cs-ice)] px-6 py-3 leading-none text-[var(--cs-pitch)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cs-ice)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cs-pitch)] ${ctaClass}`}
            >
              Open Prime
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile: horizontal band in the space under the CTA. Desktop: full-bleed wall. */}
      <div data-placeholder="visual" className="relative min-h-0 flex-1 md:absolute md:inset-0" aria-hidden>
        <DriftWall
          items={items}
          columns={columns}
          tileWidth={narrow ? 78 : 176}
          tileHeight={narrow ? 119 : 268}
          gap={narrow ? 10 : 14}
          radius={narrow ? 10 : 14}
          roll={narrow ? 75 : 50}
          tilt={narrow ? 0 : 18}
          turn={-16}
          perspective={narrow ? 2000 : 1380}
          depth={140}
          speed={34}
          variance={0.42}
          parallax={0.7}
          lift={56}
          fade={0.45}
          dim={0.9}
          grayscale={false}
          overlayColor="transparent"
          className="h-full w-full [&_img]:-rotate-90 [&_img]:scale-[1.52] md:origin-top-right md:scale-[1.18]"
          style={
            narrow
              ? {
                  maskImage:
                    'linear-gradient(to bottom, transparent 0%, #000 35%, #000 60%, transparent 100%), linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, transparent 0%, #000 35%, #000 60%, transparent 100%), linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in',
                }
              : undefined
          }
        />
      </div>
    </section>
  )
}
