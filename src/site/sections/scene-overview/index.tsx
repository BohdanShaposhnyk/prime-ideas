import ScrollExpand from '@/site/bits/ScrollExpand'
import { useInView } from '../../hooks/in-view'
import { usePrefersReducedMotion } from '../../hooks/media'
import { OverviewDeck } from './deck'
import { TypeBelt } from './type-belt'
import { useOverviewCycle } from './use-cycle'
import { useOverviewFrame } from './use-frame'

export default function SceneOverview() {
  const [sectionRef, inView] = useInView<HTMLElement>()
  const frame = useOverviewFrame()
  const reduced = usePrefersReducedMotion()
  const cycle = useOverviewCycle(inView, reduced)

  return (
    <section
      ref={sectionRef}
      id="cs-nav-night"
      aria-labelledby="cs-overview-title"
      data-scene="overview"
      data-scroll="overview-recut"
      className={`relative bg-[var(--cs-pitch)]${inView ? ' cs-overview-live' : ''}`}
    >
      <ScrollExpand
        useWindowScroll
        expandOnApproach
        enabled={!reduced}
        mediaZoom={1}
        overlayScrim={0}
        startWidth={frame.width}
        startHeight={frame.height}
        startRadius={frame.radius}
        endRadius={0}
        holdDistance={0}
        smoothing={0.52}
        className="bg-[var(--cs-pitch)]"
        stageOverlay={<TypeBelt cycle={cycle} />}
      >
        <OverviewDeck cycle={cycle} />
      </ScrollExpand>
    </section>
  )
}
