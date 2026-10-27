import { useMemo, useRef } from 'react'
import Masonry from '@/site/bits/Masonry'
import { useCoarsePointer, usePrefersReducedMotion } from '../../hooks/media'
import { Lockup } from './lockup'
import { GAP, MASONRY_DURATION, MASONRY_STAGGER, screenLayout } from './layout'
import { useScreenActive } from './use-active'
import { useStageSize } from './use-stage'

export default function SceneScreen() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const stage = useStageSize(stageRef)
  const active = useScreenActive(sectionRef)
  const coarse = useCoarsePointer()
  const reduced = usePrefersReducedMotion()

  const layout = useMemo(() => screenLayout(stage), [stage])
  const items = useMemo(() => {
    if (!layout) return []
    return layout.tiles.map(tile => ({
      id: tile.id,
      column: tile.column,
      height: tile.height,
      img: tile.img,
      objectPosition: tile.objectPosition,
      content: tile.isLockup ? (
        <Lockup play={active} delay={layout.captionDelay} coarse={coarse} reduced={reduced} />
      ) : undefined,
    }))
  }, [active, coarse, layout, reduced])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cs-screen-title"
      data-scene="screen"
      data-scroll="screen-masonry"
      data-masonry-active={active ? '1' : '0'}
      className="cs-scene relative overflow-hidden bg-[var(--cs-pitch)]"
    >
      <div ref={stageRef} className="absolute inset-1.5 sm:inset-2.5">
        {layout && items.length > 0 ? (
          <Masonry
            items={items}
            columnCount={3}
            columnFractions={layout.colFracs}
            gap={GAP}
            exactHeight
            active={active}
            animateFrom="bottom"
            travelRatio={0.62}
            blurToFocus={!coarse}
            scaleOnHover
            hoverScale={0.98}
            duration={MASONRY_DURATION}
            stagger={MASONRY_STAGGER}
            ease="power4.out"
          />
        ) : null}
      </div>
    </section>
  )
}
