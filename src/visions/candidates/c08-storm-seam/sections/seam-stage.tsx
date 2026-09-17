import type { CSSProperties, ReactNode } from 'react'

const SEAM_DEG = 40 // from vertical; BL → TR (/)

type SeamStageProps = {
  leftBlocks: ReactNode[]
  rightBlocks: ReactNode[]
}

/**
 * Oversized upright cover sheet on the rail. Centers chained along the seam;
 * travel comes from the parent rail translate — no z-order handoff.
 * Visual fills the sheet; type stays in a viewport frame at the center.
 */
function SeamBlock({
  index,
  along,
  children,
}: {
  index: number
  along: 1 | -1
  children: ReactNode
}) {
  const i = index * along
  return (
    <div
      data-seam-block={index}
      className="absolute top-1/2 left-1/2 overflow-hidden"
      style={{
        width: 'var(--block-w, 210vw)',
        height: 'var(--block-h, 210dvh)',
        zIndex: 10 - index,
        transform: `
          translate(
            calc(-50% + var(--chain-dx, 0px) * ${i}),
            calc(-50% + var(--chain-dy, 0px) * ${i})
          )
        `,
      }}
    >
      {children}
    </div>
  )
}

/**
 * Diagonal seam stage — 40° line, two triangular viewports, upright
 * page rails scrolled opposite along the seam.
 */
export default function SeamStage({ leftBlocks, rightBlocks }: SeamStageProps) {
  return (
    <div
      data-scroll="seam-stage"
      className="absolute inset-0 z-[2] overflow-hidden bg-transparent"
      style={
        {
          '--seam-deg': `${SEAM_DEG}`,
          '--seam-tx': '0px',
          '--seam-ty': '0px',
          '--seam-clip-a': 'polygon(0 0, 0 0, 0 0)',
          '--seam-clip-b': 'polygon(0 0, 0 0, 0 0)',
          '--rail-a-x': '0px',
          '--rail-a-y': '0px',
          '--rail-b-x': '0px',
          '--rail-b-y': '0px',
          '--chain-dx': '0px',
          '--chain-dy': '0px',
          '--block-w': '210vw',
          '--block-h': '210dvh',
          '--rail-width': '320vmax',
          '--rail-length': '400vmax',
        } as CSSProperties
      }
    >
      <div
        data-pane="a"
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'var(--seam-clip-a)' }}
      >
        <div
          data-rail="a"
          className="absolute top-1/2 left-1/2 will-change-transform"
          style={{
            width: 'var(--rail-width)',
            height: 'var(--rail-length)',
            marginLeft: 'calc(var(--rail-width) / -2)',
            marginTop: 'calc(var(--rail-length) / -2)',
            transform: 'translate(var(--rail-a-x), var(--rail-a-y))',
          }}
        >
          {[...leftBlocks].reverse().map((block, revI) => {
            const i = leftBlocks.length - 1 - revI
            return (
              <SeamBlock key={i} index={i} along={1}>
                {block}
              </SeamBlock>
            )
          })}
        </div>
      </div>

      <div
        data-pane="b"
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'var(--seam-clip-b)' }}
      >
        <div
          data-rail="b"
          className="absolute top-1/2 left-1/2 will-change-transform"
          style={{
            width: 'var(--rail-width)',
            height: 'var(--rail-length)',
            marginLeft: 'calc(var(--rail-width) / -2)',
            marginTop: 'calc(var(--rail-length) / -2)',
            transform: 'translate(var(--rail-b-x), var(--rail-b-y))',
          }}
        >
          {[...rightBlocks].reverse().map((block, revI) => {
            const i = rightBlocks.length - 1 - revI
            return (
              <SeamBlock key={i} index={i} along={-1}>
                {block}
              </SeamBlock>
            )
          })}
        </div>
      </div>

      <div
        data-seam="line"
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-20 w-[2px] bg-[#B8FF3C]"
        style={{
          height: '300vmax',
          marginLeft: '-1px',
          marginTop: '-150vmax',
          transform: `
            translate(var(--seam-tx), var(--seam-ty))
            rotate(calc(var(--seam-deg) * 1deg))
          `,
          boxShadow: '0 0 12px color-mix(in srgb, #B8FF3C 55%, transparent)',
        }}
      />
    </div>
  )
}

export { SEAM_DEG }
