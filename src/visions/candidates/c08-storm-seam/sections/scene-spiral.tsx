import type { CSSProperties } from 'react'
import InfiniteSpiral from '@/shared/bits/InfiniteSpiral'

/** CSS-plane cards as SVG data URIs — swap for real room stills later. */
function cardSrc(title: string, c1: string, c2: string, accent: string) {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="560" viewBox="0 0 400 560">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="560" fill="url(#g)"/>
  <circle cx="300" cy="120" r="90" fill="${accent}" fill-opacity="0.35"/>
  <circle cx="80" cy="420" r="120" fill="${accent}" fill-opacity="0.2"/>
  <text x="32" y="500" fill="#F5F5F5" font-family="system-ui,sans-serif" font-size="42" font-weight="700">${title}</text>
</svg>`.trim()
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const SPIRAL_ITEMS = [
  {
    id: 'arena',
    src: cardSrc('Arena', '#0A0A0A', '#1A1208', '#B8FF3C'),
    alt: 'Arena',
    label: 'Arena — screens that never blink',
  },
  {
    id: 'kitchen',
    src: cardSrc('Kitchen', '#120A08', '#2A1810', '#C48A3A'),
    alt: 'Kitchen',
    label: 'Kitchen — plate heat after midnight',
  },
  {
    id: 'stage',
    src: cardSrc('Stage', '#0A0508', '#1A0510', '#FF2D6A'),
    alt: 'Stage',
    label: 'Stage — one mic, full room',
  },
  {
    id: 'ember',
    src: cardSrc('Ember', '#0C0A08', '#1C1410', '#C48A3A'),
    alt: 'Ember',
    label: 'Ember — smoke that stays low',
  },
]

/**
 * Spiral — black field; large InfiniteSpiral with four room cards.
 */
export default function Spiral() {
  return (
    <section
      aria-labelledby="ss-spiral-title"
      data-scene="spiral"
      className="relative isolate flex h-dvh w-full flex-col overflow-hidden bg-[#050505] text-[#F5F5F5]"
      style={
        {
          '--ss-acid': '#B8FF3C',
          '--ss-mag': '#FF2D6A',
          '--ss-white': '#F5F5F5',
        } as CSSProperties
      }
    >
      <div className="relative z-20 flex shrink-0 items-end justify-between gap-4 px-5 pt-10 sm:px-8 lg:px-12">
        <h2
          id="ss-spiral-title"
          data-type="headline"
          className="max-w-[10ch] font-['Unbounded',sans-serif] text-[clamp(2.25rem,8vw,5rem)] leading-[0.85] font-medium tracking-[-0.05em]"
        >
          Four hits.
        </h2>
        <p
          data-type="tiny"
          className="pb-1 font-['Space_Grotesk',sans-serif] text-[0.65rem] tracking-[0.24em] text-[var(--ss-acid)] uppercase"
        >
          Spiral
        </p>
      </div>

      <div data-spiral="host" className="relative z-10 min-h-0 flex-1 px-2 pb-6">
        <InfiniteSpiral
          items={SPIRAL_ITEMS}
          speed={0.45}
          direction="up"
          animationMode="all"
          radius={200}
          cardWidth={140}
          cardHeight={196}
          verticalSpacing={72}
          perspective={1200}
          cardsPerTurn={4}
          centerScale={1.35}
          edgeFade={0.35}
          edgeBlur={8}
          cardRadius={4}
          cardTilt={8}
          pauseOnHover
          className="h-full min-h-[320px]"
        />
      </div>
    </section>
  )
}
