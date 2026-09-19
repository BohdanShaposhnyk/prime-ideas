import '@fontsource/saira-extra-condensed/800.css'
import '@fontsource/saira-extra-condensed/700.css'
import '@fontsource/public-sans/400.css'
import '@fontsource/public-sans/500.css'

import { useRef, useState, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import GridMotion from '@/shared/bits/GridMotion'
import { useCandidateMotion } from './motion'
import Hero from './sections/hero'
import { AXIS_GRID_ITEMS } from './sections/axis-plates'
import SceneCinema from './sections/scene-cinema'
import SceneClose from './sections/scene-close'
import SceneFloor from './sections/scene-floor'
import SceneGaming from './sections/scene-gaming'
import SceneKaraoke from './sections/scene-karaoke'
import SceneLodge from './sections/scene-lodge'

/**
 * Private Axis — Z-plunge pin. Docks and type discovery live in motion/.
 */
export default function PrivateAxisPage() {
  const rootRef = useRef<HTMLElement>(null)
  const [lodgeVeil, setLodgeVeil] = useState(false)
  useCandidateMotion(rootRef, { onLodgeVeil: setLodgeVeil })

  return (
    <main
      ref={rootRef}
      className="relative bg-[#080809] text-[#E4DFD4]"
      style={
        {
          fontFamily: '"Public Sans", sans-serif',
          '--pa-void': '#080809',
          '--pa-graphite': '#141416',
          '--pa-steel': '#6F7378',
          '--pa-bone': '#E4DFD4',
          '--pa-oxblood': '#6B1F22',
          '--pa-metal': '#B7A99A',
          '--pa-display': '"Saira Extra Condensed", sans-serif',
          '--pa-body': '"Public Sans", sans-serif',
        } as CSSProperties
      }
    >
      <Link
        to="/lab"
        className="fixed top-8 right-5 z-50 font-['Public_Sans',sans-serif] text-[0.65rem] tracking-[0.2em] text-[color-mix(in_srgb,#B7A99A_70%,transparent)] uppercase underline-offset-4 hover:text-[#E4DFD4] hover:underline focus-visible:text-[#E4DFD4] focus-visible:underline focus-visible:outline-none sm:right-8 lg:right-12"
      >
        Hub
      </Link>

      <div data-scroll="axis-runway" className="relative h-[720vh]">
        <div
          data-scroll="pin"
          className="sticky top-0 z-[2] h-dvh overflow-hidden bg-[#080809]"
        >
          <div
            data-corridor="grid"
            className="absolute inset-0 z-0"
            aria-hidden
          >
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 70% 55% at 62% 48%, color-mix(in srgb, #141416 88%, transparent) 0%, transparent 62%),
                  linear-gradient(180deg, #050506 0%, #080809 42%, #0C0C0E 100%)
                `,
              }}
            />
            <div
              className="absolute inset-x-[-20%] bottom-[-18%] h-[72%] origin-[62%_0%] opacity-70"
              style={{
                backgroundImage: `
                  linear-gradient(to right, color-mix(in srgb, #6F7378 26%, transparent) 1px, transparent 1px),
                  linear-gradient(to bottom, color-mix(in srgb, #6F7378 20%, transparent) 1px, transparent 1px)
                `,
                backgroundSize: '48px 48px',
                maskImage:
                  'linear-gradient(180deg, transparent 0%, black 28%, black 70%, transparent 100%)',
                transform: 'rotateX(68deg)',
              }}
            />
            <div className="absolute inset-0 opacity-[0.22] mix-blend-luminosity">
              <GridMotion items={AXIS_GRID_ITEMS} gradientColor="#080809" />
            </div>
          </div>

          <div
            data-corridor="stage"
            data-scroll="depth"
            className="absolute inset-0 z-[1]"
            style={{
              perspective: '1400px',
              perspectiveOrigin: '62% 48%',
              transformStyle: 'preserve-3d',
            }}
          >
            <SceneCinema />
            <SceneLodge veilActive={lodgeVeil} />
            <SceneGaming />
            <SceneFloor />
            <SceneKaraoke />
            <SceneClose />
          </div>

          <div className="absolute inset-0 z-[3]">
            <Hero />
          </div>
        </div>
      </div>
    </main>
  )
}
