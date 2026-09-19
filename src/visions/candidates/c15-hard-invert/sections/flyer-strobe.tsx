import { FlickerFlash, Grain, VisualPlane } from '../parts'

const FRAMES = [
  {
    id: '1',
    kind: 'shot' as const,
    variant: 'shot-a' as const,
    invert: true,
    label: '01 / Cut',
  },
  {
    id: '2',
    kind: 'slam' as const,
    word: 'OWN',
    bg: '#6A12FF',
    fill: '#F7F2EA',
    label: '02 / Own',
  },
  {
    id: '3',
    kind: 'shot' as const,
    variant: 'shot-b' as const,
    invert: false,
    label: '03 / Cut',
  },
  {
    id: '4',
    kind: 'slam' as const,
    word: 'THE',
    bg: '#F7F2EA',
    fill: '#1A3CFF',
    label: '04 / The',
  },
  {
    id: '5',
    kind: 'shot' as const,
    variant: 'shot-c' as const,
    invert: true,
    label: '05 / Cut',
  },
  {
    id: '6',
    kind: 'slam' as const,
    word: 'NIGHT',
    bg: '#F4FF3A',
    fill: '#00F55A',
    label: '06 / Night',
  },
]

export default function FlyerStrobe() {
  return (
    <section data-strobe="stage" data-scroll="strobe" data-snap>
      <div data-strobe="viewport" className="relative">
        {FRAMES.map((frame) => (
          <article
            key={frame.id}
            data-strobe-frame={frame.id}
            data-strobe-kind={frame.kind}
            className="relative isolate min-h-dvh overflow-hidden"
            style={
              frame.kind === 'slam'
                ? { background: frame.bg, color: frame.fill }
                : { background: 'var(--hi-pitch)', color: 'var(--hi-paper)' }
            }
          >
            {frame.kind === 'shot' ? (
              <>
                {/* swap: strobe still */}
                <VisualPlane variant={frame.variant} invert={frame.invert} />
                <Grain />
                <p className="absolute top-5 left-4 z-20 font-[family-name:var(--hi-body)] text-[0.62rem] tracking-[0.28em] uppercase">
                  {frame.label}
                </p>
              </>
            ) : (
              <>
                <p className="absolute top-5 left-4 z-20 font-[family-name:var(--hi-body)] text-[0.62rem] tracking-[0.28em] uppercase mix-blend-multiply">
                  {frame.label}
                </p>
                <h2
                  data-slam
                  className="absolute inset-x-[-4vw] top-1/2 z-20 -translate-y-1/2 text-center font-[family-name:var(--hi-display)] text-[clamp(5rem,32vw,20rem)] leading-[0.78] uppercase"
                  style={{ color: frame.fill }}
                >
                  {frame.word}
                </h2>
              </>
            )}
            <FlickerFlash />
          </article>
        ))}
      </div>
    </section>
  )
}
