type PlateId = 'hero' | 'heat' | 'play' | 'screen' | 'voice' | 'close'

type Orb = {
  x: string
  y: string
  size: string
  color: string
  opacity: number
}

const FIELDS: Record<
  PlateId,
  {
    wash: string
    caustic: string
    orbs: Orb[]
  }
> = {
  hero: {
    wash: `
      radial-gradient(ellipse 70% 48% at 50% 58%, color-mix(in srgb, #1A1228 88%, transparent) 0%, transparent 62%),
      radial-gradient(circle at 50% 50%, #120E18 0%, #08070C 72%)
    `,
    caustic: `
      radial-gradient(ellipse 55% 28% at 48% 64%, color-mix(in srgb, #E8C9A0 34%, transparent), transparent 58%),
      radial-gradient(ellipse 32% 22% at 68% 30%, color-mix(in srgb, #7EC8C4 22%, transparent), transparent 54%),
      radial-gradient(ellipse 18% 40% at 28% 42%, color-mix(in srgb, #F0D4A8 16%, transparent), transparent 60%)
    `,
    orbs: [
      { x: '18%', y: '22%', size: '18vmin', color: '#F0D4A8', opacity: 0.22 },
      { x: '78%', y: '18%', size: '12vmin', color: '#7EC8C4', opacity: 0.28 },
      { x: '72%', y: '68%', size: '28vmin', color: '#E8C9A0', opacity: 0.16 },
      { x: '12%', y: '70%', size: '10vmin', color: '#C45C2C', opacity: 0.2 },
      { x: '52%', y: '12%', size: '7vmin', color: '#F7F1E8', opacity: 0.18 },
    ],
  },
  heat: {
    wash: `
      radial-gradient(ellipse 80% 55% at 50% 78%, color-mix(in srgb, #C45C2C 38%, transparent) 0%, transparent 58%),
      radial-gradient(circle at 50% 40%, #1C1010 0%, #08070C 70%)
    `,
    caustic: `
      radial-gradient(ellipse 60% 24% at 50% 72%, color-mix(in srgb, #E8C9A0 42%, transparent), transparent 55%),
      radial-gradient(ellipse 28% 50% at 30% 48%, color-mix(in srgb, #C45C2C 28%, transparent), transparent 62%)
    `,
    orbs: [
      { x: '22%', y: '30%', size: '14vmin', color: '#C45C2C', opacity: 0.32 },
      { x: '70%', y: '24%', size: '9vmin', color: '#F0D4A8', opacity: 0.24 },
      { x: '80%', y: '62%', size: '22vmin', color: '#E8C9A0', opacity: 0.18 },
      { x: '40%', y: '80%', size: '16vmin', color: '#C45C2C', opacity: 0.22 },
    ],
  },
  play: {
    wash: `
      radial-gradient(ellipse 65% 50% at 58% 46%, color-mix(in srgb, #1A1228 80%, #0A1820) 0%, transparent 60%),
      radial-gradient(circle at 40% 60%, #0A1218 0%, #08070C 72%)
    `,
    caustic: `
      radial-gradient(ellipse 40% 30% at 62% 42%, color-mix(in srgb, #7EC8C4 30%, transparent), transparent 55%),
      radial-gradient(ellipse 24% 18% at 28% 58%, color-mix(in srgb, #E8C9A0 18%, transparent), transparent 50%)
    `,
    orbs: [
      { x: '16%', y: '20%', size: '8vmin', color: '#7EC8C4', opacity: 0.36 },
      { x: '84%', y: '28%', size: '20vmin', color: '#7EC8C4', opacity: 0.16 },
      { x: '70%', y: '72%', size: '11vmin', color: '#F0D4A8', opacity: 0.2 },
      { x: '24%', y: '74%', size: '26vmin', color: '#1A1228', opacity: 0.5 },
      { x: '48%', y: '16%', size: '6vmin', color: '#F7F1E8', opacity: 0.22 },
    ],
  },
  screen: {
    wash: `
      radial-gradient(ellipse 90% 40% at 50% 50%, color-mix(in srgb, #1A1228 70%, transparent) 0%, transparent 70%),
      linear-gradient(180deg, #05040A 0%, #08070C 40%, #0C0814 100%)
    `,
    caustic: `
      radial-gradient(ellipse 70% 18% at 50% 48%, color-mix(in srgb, #E8C9A0 14%, transparent), transparent 70%),
      radial-gradient(ellipse 20% 12% at 72% 44%, color-mix(in srgb, #7EC8C4 12%, transparent), transparent 55%)
    `,
    orbs: [
      { x: '14%', y: '40%', size: '5vmin', color: '#F7F1E8', opacity: 0.12 },
      { x: '88%', y: '58%', size: '7vmin', color: '#E8C9A0', opacity: 0.14 },
    ],
  },
  voice: {
    wash: `
      radial-gradient(ellipse 36% 80% at 50% 50%, color-mix(in srgb, #1A1228 75%, transparent) 0%, transparent 58%),
      radial-gradient(circle at 50% 50%, #100E16 0%, #08070C 74%)
    `,
    caustic: `
      linear-gradient(180deg, transparent 8%, color-mix(in srgb, #7EC8C4 16%, transparent) 48%, transparent 88%),
      radial-gradient(ellipse 48% 16% at 50% 36%, color-mix(in srgb, #F0D4A8 20%, transparent), transparent 60%)
    `,
    orbs: [
      { x: '30%', y: '24%', size: '10vmin', color: '#7EC8C4', opacity: 0.2 },
      { x: '68%', y: '70%', size: '14vmin', color: '#E8C9A0', opacity: 0.16 },
      { x: '20%', y: '62%', size: '8vmin', color: '#F7F1E8', opacity: 0.1 },
    ],
  },
  close: {
    wash: `
      radial-gradient(circle at 50% 50%, color-mix(in srgb, #1A1228 55%, transparent) 0%, #08070C 68%),
      radial-gradient(ellipse 80% 40% at 50% 80%, color-mix(in srgb, #C45C2C 18%, transparent), transparent 60%)
    `,
    caustic: `
      radial-gradient(ellipse 50% 20% at 50% 62%, color-mix(in srgb, #E8C9A0 22%, transparent), transparent 58%),
      radial-gradient(circle at 50% 50%, transparent 40%, color-mix(in srgb, #7EC8C4 10%, transparent) 58%, transparent 62%)
    `,
    orbs: [
      { x: '50%', y: '50%', size: '42vmin', color: '#E8C9A0', opacity: 0.08 },
      { x: '26%', y: '36%', size: '12vmin', color: '#C45C2C', opacity: 0.18 },
      { x: '74%', y: '64%', size: '9vmin', color: '#7EC8C4', opacity: 0.16 },
    ],
  },
}

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`

export function GlassField({ plate }: { plate: PlateId }) {
  const field = FIELDS[plate]

  return (
    <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
      <div data-plane="wash" className="absolute inset-0" style={{ background: field.wash }} />
      <div
        data-plane="caustic"
        className="absolute inset-0 mix-blend-screen"
        style={{ background: field.caustic }}
      />
      <div data-plane="bokeh" className="absolute inset-0 overflow-hidden mix-blend-screen">
        {field.orbs.map((orb, i) => (
          <span
            key={i}
            data-orb={i}
            className="absolute rounded-full"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              opacity: orb.opacity,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle at 38% 34%, color-mix(in srgb, ${orb.color} 85%, white), color-mix(in srgb, ${orb.color} 35%, transparent) 46%, transparent 72%)`,
            }}
          />
        ))}
      </div>
      {plate === 'screen' ? (
        <>
          <div
            data-plane="letterbox-top"
            className="absolute inset-x-0 top-0 h-[14vh] bg-[#05040A] sm:h-[16vh]"
          />
          <div
            data-plane="letterbox-bottom"
            className="absolute inset-x-0 bottom-0 h-[14vh] bg-[#05040A] sm:h-[16vh]"
          />
        </>
      ) : null}
      {plate === 'close' ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            data-plane="iris-ring"
            className="h-[36vmin] w-[36vmin] rounded-full border border-[color-mix(in_srgb,#7EC8C4_28%,transparent)]"
          />
          <div
            data-plane="iris-ring"
            className="absolute h-[58vmin] w-[58vmin] rounded-full border border-[color-mix(in_srgb,#E8C9A0_18%,transparent)]"
          />
          <div
            data-plane="iris-ring"
            className="absolute h-[82vmin] w-[82vmin] rounded-full border border-[color-mix(in_srgb,#F7F1E8_10%,transparent)]"
          />
        </div>
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: '160px 160px' }}
      />
    </div>
  )
}
