import { ArrowRight } from 'lucide-react'
import DriftWall, { type DriftWallItem } from '@/shared/bits/DriftWall'
import barParty from '../assets/bar/bar-party.webp'
import barPartyHor from '../assets/bar/bar-party-hor.webp'
import bottles from '../assets/bar/bottles.webp'
import carsimGirl from '../assets/gaming/carsim-girl.webp'
import carsimWheelLight from '../assets/gaming/carsim-wheel-light.webp'
import controllerDark from '../assets/gaming/controller-dark-purple.webp'
import gamerGirlLight from '../assets/gaming/gamer-girl-light-hor.webp'
import keyboardHor from '../assets/gaming/keyboard-hor.webp'
import pcParty from '../assets/gaming/pc-party.webp'
import hookahCoal from '../assets/hookah/hookah-coal.webp'
import hookahGirl from '../assets/hookah/hookah-girl.webp'
import micGold from '../assets/karaoke/mic-gold.webp'
import micPurple from '../assets/karaoke/mic-purple.webp'
import singerHor from '../assets/karaoke/singer-hor.webp'
import { useMediaQuery } from '../hooks/media'
import { ctaClass, palette, supportClass } from '../lib/palette'

const FRANCHISE_MAIL = 'mailto:abc@xyz.com'

const PROOFS = ['Established concept', 'Full brand support', 'Your city, your Prime'] as const

const WALL_IMAGES = [
  { src: bottles, title: 'Bar' },
  { src: gamerGirlLight, title: 'Arena' },
  { src: hookahCoal, title: 'Hookah' },
  { src: micGold, title: 'Karaoke' },
  { src: barPartyHor, title: 'Bar night' },
  { src: carsimWheelLight, title: 'Sim' },
  { src: singerHor, title: 'Stage' },
  { src: keyboardHor, title: 'Keys' },
  { src: hookahGirl, title: 'Lounge' },
  { src: pcParty, title: 'Party' },
  { src: micPurple, title: 'Mic' },
  { src: barParty, title: 'Crowd' },
  { src: controllerDark, title: 'Play' },
  { src: carsimGirl, title: 'Drive' },
] as const

/**
 * Landscape type lockup rotated into the portrait tile so copy reads along the
 * long edge (landscape relative to the card).
 */
function proofImage(title: string): string {
  const lines = wrapTitle(title)
  const lineH = 78
  const blockH = lines.length * lineH
  const titleNodes = lines
    .map(
      (line, i) =>
        `<text x="0" y="${i * lineH + lineH * 0.72}" text-anchor="middle" fill="${palette.ice}" font-family="Bebas Neue, Impact, sans-serif" font-size="68" letter-spacing="1.5">${escapeXml(line)}</text>`,
    )
    .join('')
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="720" viewBox="0 0 480 720">
  <rect width="480" height="720" fill="${palette.pitch}"/>
  <g transform="translate(240 360) rotate(-90) translate(0 ${-blockH / 2})">
    ${titleNodes}
  </g>
</svg>`.trim()
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function wrapTitle(title: string) {
  if (title.includes('. ')) {
    return title.split('. ').map((part, i, all) => (i < all.length - 1 ? `${part}.` : part))
  }
  const words = title.split(' ')
  if (words.length <= 2) return [title]
  return [words.slice(0, 2).join(' '), words.slice(2).join(' ')]
}

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Round-robin fills columns; with roll=50° columns read as rows top→bottom.
 * Proofs sit in the 2nd row (column index 1).
 */
function buildWallItems(columns: number, proofRow: number): DriftWallItem[] {
  const total = WALL_IMAGES.length + PROOFS.length * 2
  const items: DriftWallItem[] = []
  let imageIndex = 0
  let proofIndex = 0

  for (let i = 0; i < total; i++) {
    if (i % columns === proofRow) {
      const title = PROOFS[proofIndex % PROOFS.length]
      items.push({
        image: proofImage(title),
        title,
      })
      proofIndex += 1
    } else {
      const media = WALL_IMAGES[imageIndex % WALL_IMAGES.length]
      items.push({ image: media.src, title: media.title })
      imageIndex += 1
    }
  }

  return items
}

const WALL_COLUMNS = 3
const PROOF_ROW = 1
const WALL_ITEMS = buildWallItems(WALL_COLUMNS, PROOF_ROW)

const NARROW_WALL = '(max-width: 767px)'

export default function SceneFranchiseV2() {
  const narrow = useMediaQuery(NARROW_WALL)
  return (
    <section
      aria-labelledby="cs-franchise-v2-title"
      data-scene="franchise-v2"
      className="cs-scene relative isolate overflow-hidden bg-[var(--cs-pitch)] text-[var(--cs-ice)]"
    >
      <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
        <DriftWall
          items={WALL_ITEMS}
          columns={WALL_COLUMNS}
          tileWidth={narrow ? 88 : 176}
          tileHeight={narrow ? 134 : 268}
          gap={narrow ? 10 : 14}
          radius={narrow ? 10 : 14}
          roll={50}
          tilt={18}
          turn={-16}
          perspective={1380}
          depth={140}
          speed={34}
          variance={0.42}
          parallax={0.7}
          lift={56}
          fade={0.45}
          dim={0.9}
          grayscale={false}
          overlayColor="transparent"
          className="h-full w-full origin-top-right max-md:translate-x-[16%] max-md:translate-y-[2%] md:scale-[1.18]"
        />
      </div>

      {/* Soft black veil — open in the top-right quarter so the wall reads through */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 110% 105% at 100% -5%, transparent 0%, transparent 34%, rgba(0,0,0,0.28) 52%, rgba(0,0,0,0.72) 68%, #000 82%)',
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[88rem] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="grid h-full w-full grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="flex h-full min-h-0 min-w-0 flex-col items-start justify-end gap-6 md:justify-between md:gap-0">
            <h2
              id="cs-franchise-v2-title"
              className="font-[family-name:var(--cs-display)] text-[clamp(2.6rem,11vw,3.4rem)] leading-[var(--cs-lead-display)] tracking-[var(--cs-track-display)] text-[var(--cs-ice)] uppercase md:text-[clamp(4.6rem,21dvh,8.2rem)]"
            >
              <span className="block">Make</span>
              <span className="block text-[var(--cs-gold)]">Prime</span>
              <span className="block">yours</span>
            </h2>

            <div className="flex w-full flex-col items-start">
              <p className={`max-w-[28rem] ${supportClass}`}>
                Bring the Prime experience to your city.
              </p>
              <a
                href={FRANCHISE_MAIL}
                className={`mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--cs-ice)] px-6 py-3 leading-none text-[var(--cs-pitch)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cs-ice)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cs-pitch)] md:mt-8 ${ctaClass}`}
              >
                Open Prime
                <ArrowRight className="size-4 shrink-0" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
