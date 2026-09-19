import '@fontsource/big-shoulders-display/800'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'

import { useRef, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import LightRays from '@/shared/bits/LightRays'
import Plasma from '@/shared/bits/Plasma'
import RippleGrid from '@/shared/bits/RippleGrid'
import Silk from '@/shared/bits/Silk'
import { useCandidateMotion } from './motion'
import Hero from './sections/hero'
import PulseFloor from './sections/pulse-floor'
import PulsePlay from './sections/pulse-play'
import PulseRest from './sections/pulse-rest'
import PulseScreen from './sections/pulse-screen'
import PulseVoice from './sections/pulse-voice'

const tokens = {
  '--el-void': '#09070A',
  '--el-ember': '#FF5E2A',
  '--el-gold': '#F0C14B',
  '--el-plasma': '#C65CFF',
  '--el-bone': '#FFF1DC',
  '--el-silk': '#3CE0C4',
  '--el-ink': '#F6EFE4',
  '--el-display': '"Big Shoulders Display", sans-serif',
  '--el-body': '"IBM Plex Sans", sans-serif',
} as CSSProperties

/**
 * Ember Lattice — sticky voltage lattice; pulse-ring / retune / rail lock in motion/.
 */
export default function EmberLatticePage() {
  const rootRef = useRef<HTMLElement>(null)
  useCandidateMotion(rootRef)

  return (
    <main
      ref={rootRef}
      className="relative bg-[#09070A] text-[#F6EFE4]"
      style={{
        ...tokens,
        fontFamily: '"IBM Plex Sans", sans-serif',
      }}
    >
      <Link
        to="/lab"
        className="fixed top-4 right-5 z-50 font-['IBM_Plex_Sans',sans-serif] text-[0.65rem] tracking-[0.2em] text-[color-mix(in_srgb,#FFF1DC_55%,transparent)] uppercase underline-offset-4 hover:text-[#F6EFE4] hover:underline focus-visible:text-[#F6EFE4] focus-visible:underline focus-visible:outline-none sm:right-8 lg:right-12"
      >
        Hub
      </Link>

      <div data-scroll="pulse-runway" className="relative h-[600vh]">
        <div
          data-scroll="lattice-pin"
          className="sticky top-0 z-[1] h-dvh overflow-hidden bg-[#09070A] contain-[paint]"
        >
          {/* swap: voltage lattice currents */}
          <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
            <div data-plane="silk" className="absolute inset-0">
              <Silk
                speed={3.2}
                scale={1.15}
                color="#1E4F4A"
                noiseIntensity={1.2}
                rotation={0.4}
              />
            </div>
            <div
              data-plane="ripple"
              className="absolute inset-0 mix-blend-screen"
            >
              <RippleGrid
                gridColor="#FF5E2A"
                rippleIntensity={0.07}
                gridSize={12}
                gridThickness={14}
                fadeDistance={1.4}
                vignetteStrength={1.8}
                glowIntensity={0.22}
                opacity={0.88}
                mouseInteraction
                mouseInteractionRadius={1.15}
              />
            </div>
            <div
              data-plane="plasma"
              className="absolute top-[38%] right-[6%] h-[46vmin] w-[46vmin] overflow-hidden rounded-full sm:right-[12%] sm:h-[52vmin] sm:w-[52vmin]"
            >
              <Plasma
                color="#C65CFF"
                speed={0.55}
                scale={1.15}
                opacity={0.85}
                mouseInteractive={false}
                renderScale={0.42}
                maxDpr={1.25}
                targetFps={28}
                iterations={36}
              />
            </div>
            <div
              data-plane="rays"
              className="absolute inset-0 overflow-hidden"
              style={{
                maskImage:
                  'radial-gradient(circle at 78% 12%, black 0%, black 28%, transparent 62%)',
                WebkitMaskImage:
                  'radial-gradient(circle at 78% 12%, black 0%, black 28%, transparent 62%)',
              }}
            >
              <LightRays
                raysOrigin="top-right"
                raysColor="#F0C14B"
                raysSpeed={0.7}
                lightSpread={0.85}
                rayLength={1.6}
                fadeDistance={1.1}
                saturation={1.1}
                followMouse
                mouseInfluence={0.12}
                noiseAmount={0.06}
              />
            </div>
            <div
              data-plane="ember"
              className="absolute inset-0 opacity-70 mix-blend-screen"
              style={{
                background: `
                  repeating-linear-gradient(
                    118deg,
                    transparent 0 46px,
                    color-mix(in srgb, #FF5E2A 0%, transparent) 46px,
                    color-mix(in srgb, #FF5E2A 22%, transparent) 47px,
                    transparent 48px 92px
                  ),
                  radial-gradient(ellipse 50% 40% at 72% 78%, color-mix(in srgb, #FF5E2A 28%, transparent), transparent 62%)
                `,
              }}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div
                data-ring="1"
                className="h-[28vmin] w-[28vmin] rounded-full border border-[color-mix(in_srgb,#FF5E2A_45%,transparent)]"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div
                data-ring="2"
                className="h-[48vmin] w-[48vmin] rounded-full border border-[color-mix(in_srgb,#F0C14B_32%,transparent)]"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div
                data-ring="3"
                className="h-[72vmin] w-[72vmin] rounded-full border border-[color-mix(in_srgb,#3CE0C4_28%,transparent)]"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div
                data-ring="4"
                className="h-[98vmin] w-[98vmin] rounded-full border border-[color-mix(in_srgb,#F6EFE4_16%,transparent)]"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-soft-light"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
                backgroundSize: '180px 180px',
              }}
            />
          </div>
        </div>

        <div className="relative z-[2] -mt-[100vh]">
          <Hero />
          <PulsePlay />
          <PulseScreen />
          <PulseVoice />
          <PulseFloor />
          <PulseRest />
        </div>
      </div>
    </main>
  )
}
