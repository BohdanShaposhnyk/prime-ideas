import { Link } from '@tanstack/react-router'
import Hero from './sections/hero'
import ZoneArena from './sections/zone-arena'
import ZoneKitchen from './sections/zone-kitchen'
import ZoneLounge from './sections/zone-lounge'
import ZoneStage from './sections/zone-stage'

export default function OneNightPage() {
  return (
    <main className="relative bg-[oklch(0.09_0.01_260)] text-foreground">
      <Link
        to="/"
        className="absolute top-8 right-5 z-20 text-[0.65rem] tracking-[0.16em] text-[color-mix(in_oklch,white_55%,transparent)] uppercase underline-offset-4 hover:text-white hover:underline sm:right-8 lg:right-12"
      >
        Hub
      </Link>
      <Hero />
      <ZoneKitchen />
      <ZoneArena />
      <ZoneStage />
      <ZoneLounge />
    </main>
  )
}
