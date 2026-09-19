import '@fontsource/syne/800.css'
import '@fontsource/syne/700.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/saira-extra-condensed/800.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/outfit/400.css'
import '@fontsource/outfit/500.css'

import { useRef, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { useCandidateMotion } from './motion'
import Hero from './sections/hero'
import BlockMass from './sections/block-mass'
import BlockWhisper from './sections/block-whisper'
import BlockHeat from './sections/block-heat'
import BlockCount from './sections/block-count'
import BlockEcho from './sections/block-echo'
import BlockColophon from './sections/block-colophon'

const SPINE = [
  { id: '00', label: 'OPEN' },
  { id: '01', label: 'MASS' },
  { id: '02', label: 'HUSH' },
  { id: '03', label: 'HEAT' },
  { id: '04', label: 'COUNT' },
  { id: '05', label: 'ECHO' },
  { id: 'END', label: 'SET' },
] as const

const paperGrain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`

/**
 * Lockup — offset-latch compositor. Blocks rest latched; motion/ owns slam + stack.
 */
export default function LockupPage() {
  const rootRef = useRef<HTMLElement>(null)
  useCandidateMotion(rootRef)

  return (
    <main
      ref={rootRef}
      className="relative bg-[#E8E2D4] text-[#12110E]"
      style={
        {
          fontFamily: '"Outfit", sans-serif',
          '--lk-stock': '#E8E2D4',
          '--lk-ink': '#12110E',
          '--lk-proof': '#FF2A1F',
          '--lk-plate': '#2546F5',
          '--lk-heat': '#F5B942',
          '--lk-rule': 'color-mix(in srgb, #12110E 14%, transparent)',
          '--lk-display': '"Syne", sans-serif',
          '--lk-serif': '"Instrument Serif", serif',
          '--lk-condensed': '"Saira Extra Condensed", sans-serif',
          '--lk-mono': '"IBM Plex Mono", monospace',
          '--lk-body': '"Outfit", sans-serif',
        } as CSSProperties
      }
    >
      <Link
        to="/lab"
        className="fixed top-5 right-4 z-50 bg-[color-mix(in_srgb,var(--lk-stock)_88%,transparent)] px-1.5 py-0.5 font-[family-name:var(--lk-mono)] text-[0.6rem] tracking-[0.18em] text-[color-mix(in_srgb,var(--lk-ink)_55%,transparent)] uppercase underline-offset-4 hover:text-[var(--lk-ink)] hover:underline focus-visible:text-[var(--lk-ink)] focus-visible:underline focus-visible:outline-none sm:top-8 sm:right-8"
      >
        Hub
      </Link>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.13] mix-blend-multiply"
        style={{
          backgroundImage: paperGrain,
          backgroundSize: '180px 180px',
        }}
      />

      <nav
        data-spine
        aria-label="Lockup index"
        className="fixed top-0 left-0 z-40 flex h-dvh w-[2.4rem] flex-col items-center border-r border-[var(--lk-rule)] bg-[color-mix(in_srgb,var(--lk-stock)_88%,transparent)] pt-5 pb-6 sm:w-16 sm:pt-8"
      >
        <p
          data-spine="brand"
          className="font-[family-name:var(--lk-condensed)] text-[0.7rem] leading-none tracking-[0.14em] text-[var(--lk-ink)] uppercase sm:text-[0.85rem]"
        >
          PR
        </p>
        <ol className="mt-auto flex flex-col items-center gap-3 sm:gap-4">
          {SPINE.map((tick) => (
            <li
              key={tick.id}
              data-spine-tick={tick.id}
              className="flex flex-col items-center gap-0.5"
            >
              <span
                data-spine-num
                className="overflow-hidden font-[family-name:var(--lk-mono)] text-[0.52rem] tabular-nums tracking-[0.08em] text-[color-mix(in_srgb,var(--lk-ink)_45%,transparent)] sm:text-[0.62rem]"
              >
                {tick.id}
              </span>
              <span className="hidden font-[family-name:var(--lk-condensed)] text-[0.55rem] tracking-[0.16em] text-[color-mix(in_srgb,var(--lk-ink)_38%,transparent)] uppercase sm:block">
                {tick.label}
              </span>
            </li>
          ))}
        </ol>
      </nav>

      <div
        data-scroll="compositor"
        className="relative z-10 pl-[2.4rem] sm:pl-16"
      >
        <div
          data-stack="tray"
          aria-hidden
          className="pointer-events-none sticky top-0 z-20 flex flex-col"
        >
          <div data-stack-item="hero" className="origin-top" />
          <div data-stack-item="mass" className="origin-top" />
          <div data-stack-item="whisper" className="origin-top" />
          <div data-stack-item="heat" className="origin-top" />
          <div data-stack-item="count" className="origin-top" />
          <div data-stack-item="echo" className="origin-top" />
        </div>
        <Hero />
        <BlockMass />
        <BlockWhisper />
        <BlockHeat />
        <BlockCount />
        <BlockEcho />
        <BlockColophon />
      </div>
    </main>
  )
}
