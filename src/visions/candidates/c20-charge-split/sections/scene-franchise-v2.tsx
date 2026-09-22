import { ArrowRight } from 'lucide-react'
import DriftWall, { type DriftWallItem } from '@/shared/bits/DriftWall'
import barParty from '../assets/bar/bar-party.jpg'
import barPartyHor from '../assets/bar/bar-party-hor.jpg'
import bottles from '../assets/bar/bottles.jpg'
import carsimGirl from '../assets/gaming/carsim-girl.jpg'
import carsimWheelLight from '../assets/gaming/carsim-wheel-light.jpg'
import controllerDark from '../assets/gaming/controller-dark-purple.jpg'
import gamerGirlLight from '../assets/gaming/gamer-girl-light-hor.jpg'
import keyboardHor from '../assets/gaming/keyboard-hor.jpg'
import pcParty from '../assets/gaming/pc-party.jpg'
import hookahCoal from '../assets/hookah/hookah-coal.jpg'
import hookahGirl from '../assets/hookah/hookah-girl.jpg'
import micGold from '../assets/karaoke/mic-gold.jpg'
import micPurple from '../assets/karaoke/mic-purple.jpg'
import singerHor from '../assets/karaoke/singer-hor.jpg'

const FRANCHISE_MAIL = 'mailto:abc@xyz.com'

const PROOFS = ['Established concept', 'Full brand support', 'Your city. Your Prime.'] as const

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
        `<text x="0" y="${i * lineH + lineH * 0.72}" text-anchor="middle" fill="#ffffff" font-family="Bebas Neue, Impact, sans-serif" font-size="68" letter-spacing="1.5">${escapeXml(line)}</text>`,
    )
    .join('')
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="720" viewBox="0 0 480 720">
  <rect width="480" height="720" fill="#0a0a0a"/>
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

export default function SceneFranchiseV2() {
  return (
    <section
      aria-labelledby="cs-franchise-v2-title"
      data-scene="franchise-v2"
      className="relative isolate h-dvh overflow-hidden bg-black text-white"
    >
      <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
        <DriftWall
          items={WALL_ITEMS}
          columns={WALL_COLUMNS}
          tileWidth={176}
          tileHeight={268}
          gap={14}
          radius={14}
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
          className="h-full w-full origin-top-right scale-[1.18]"
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
          <div className="flex h-full min-h-0 min-w-0 flex-col items-start justify-between">
            <h2
              id="cs-franchise-v2-title"
              className="font-[family-name:var(--cs-display)] text-[clamp(3.2rem,15.5dvh,6.2rem)] leading-[var(--cs-lead-display)] tracking-[var(--cs-track-display)] text-white uppercase md:text-[clamp(4.6rem,21dvh,8.2rem)]"
            >
              <span className="block">Make</span>
              <span className="block">Prime</span>
              <span className="block">yours</span>
            </h2>

            <div className="flex w-full flex-col items-start">
              <p className="max-w-[28rem] font-[family-name:var(--cs-body)] text-[clamp(1.05rem,2.4vw,1.35rem)] font-medium leading-snug tracking-[var(--cs-track-display)] text-white/75">
                Bring the Prime experience to your city.
              </p>
              <a
                href={FRANCHISE_MAIL}
                className="mt-4 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3 font-[family-name:var(--cs-body)] text-[length:var(--cs-text-cta)] font-semibold tracking-[var(--cs-track-micro)] text-black uppercase transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-3.5 sm:text-[0.78rem] md:mt-8"
              >
                Open Prime
                <ArrowRight className="size-5 shrink-0 sm:size-6" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
