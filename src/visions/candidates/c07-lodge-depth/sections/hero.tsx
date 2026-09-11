import type { CSSProperties } from 'react'

/**
 * Hero — POV from lodge interior through the window onto cloudy street.
 * Scale zoom-out is owned by the page scroll skeleton (data-scroll="z-zoom").
 */
export default function Hero() {
  return (
    <section
      data-hero="lodge-depth"
      data-scene="hero"
      data-scroll="pin"
      className="relative isolate flex h-dvh w-full overflow-hidden text-[var(--ld-linen)]"
      style={
        {
          '--ld-stone': '#8A8578',
          '--ld-oak': '#6B4A32',
          '--ld-moss': '#3D5C45',
          '--ld-sky': '#9AA8B5',
          '--ld-asphalt': '#2A2E33',
          '--ld-lamp': '#C4A574',
          '--ld-sill': '#1A1814',
          '--ld-linen': '#E8E2D6',
        } as CSSProperties
      }
    >
      {/* Dominant visual — swap: hero window lookout */}
      <div
        data-placeholder="visual"
        data-plane="zoom-target"
        className="absolute inset-0 origin-[62%_28%]"
        aria-hidden
      >
        {/* Far: cloudy street / sky through glass */}
        <div
          data-plane="street"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(90% 70% at 68% 18%, color-mix(in srgb, var(--ld-sky) 75%, white) 0%, transparent 52%),
              radial-gradient(55% 45% at 78% 42%, color-mix(in srgb, var(--ld-stone) 40%, transparent) 0%, transparent 55%),
              linear-gradient(165deg, #6E7A88 0%, var(--ld-sky) 28%, #5C6570 55%, var(--ld-asphalt) 100%)
            `,
          }}
        />
        {/* Soft cloud bands */}
        <div
          data-plane="clouds"
          className="absolute inset-0 opacity-70"
          style={{
            background: `
              radial-gradient(40% 18% at 55% 12%, color-mix(in srgb, white 35%, transparent), transparent 70%),
              radial-gradient(50% 22% at 78% 22%, color-mix(in srgb, var(--ld-sky) 55%, white), transparent 72%),
              radial-gradient(35% 16% at 42% 28%, color-mix(in srgb, white 22%, transparent), transparent 70%)
            `,
          }}
        />
        {/* Wet street reflection strip */}
        <div
          data-plane="street-wet"
          className="absolute inset-x-[18%] top-[48%] h-[22%] opacity-50"
          style={{
            background: `
              linear-gradient(
                180deg,
                transparent 0%,
                color-mix(in srgb, var(--ld-asphalt) 70%, var(--ld-sky)) 35%,
                color-mix(in srgb, var(--ld-lamp) 18%, var(--ld-asphalt)) 70%,
                transparent 100%
              )
            `,
            filter: 'blur(6px)',
            maskImage:
              'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)',
          }}
        />
        {/* Near: stone-wood-greenery interior framing the glass */}
        <div
          data-plane="interior-frame"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(55% 70% at 8% 70%, color-mix(in srgb, var(--ld-oak) 85%, black) 0%, transparent 58%),
              radial-gradient(45% 55% at 92% 75%, color-mix(in srgb, var(--ld-moss) 70%, black) 0%, transparent 55%),
              radial-gradient(70% 40% at 50% 108%, var(--ld-sill) 0%, transparent 60%),
              linear-gradient(
                105deg,
                color-mix(in srgb, var(--ld-oak) 90%, black) 0%,
                color-mix(in srgb, var(--ld-oak) 90%, black) 14%,
                transparent 28%,
                transparent 72%,
                color-mix(in srgb, var(--ld-moss) 75%, var(--ld-stone)) 86%,
                color-mix(in srgb, var(--ld-sill) 80%, var(--ld-oak)) 100%
              )
            `,
          }}
        />
        {/* Moss / greenery wash on the right mullion */}
        <div
          data-plane="greenery"
          className="absolute inset-y-[12%] right-0 w-[28%] opacity-80"
          style={{
            background: `
              radial-gradient(60% 40% at 70% 30%, color-mix(in srgb, var(--ld-moss) 55%, transparent), transparent 70%),
              radial-gradient(50% 35% at 40% 65%, color-mix(in srgb, #4A6B52 45%, transparent), transparent 68%),
              radial-gradient(40% 30% at 80% 80%, color-mix(in srgb, var(--ld-moss) 40%, transparent), transparent 65%)
            `,
          }}
        />
        {/* Wood grain on sill / left jamb */}
        <div
          data-plane="wood-grain"
          className="absolute inset-0 opacity-45 mix-blend-multiply"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                98deg,
                transparent 0 3px,
                color-mix(in srgb, var(--ld-oak) 35%, transparent) 3px 4px
              )
            `,
            maskImage:
              'linear-gradient(90deg, black 0%, black 18%, transparent 32%), linear-gradient(0deg, black 0%, black 18%, transparent 36%)',
            maskComposite: 'add',
            WebkitMaskImage:
              'linear-gradient(90deg, black 0%, black 18%, transparent 32%), linear-gradient(0deg, black 0%, black 18%, transparent 36%)',
          }}
        />
        {/* Window glass mullion + reflection */}
        <div
          data-plane="glass"
          className="pointer-events-none absolute inset-[10%_16%_22%_18%]"
          style={{
            boxShadow: `
              inset 0 0 0 1px color-mix(in srgb, white 18%, transparent),
              inset 0 0 40px color-mix(in srgb, var(--ld-sky) 12%, transparent)
            `,
            background: `
              linear-gradient(
                125deg,
                color-mix(in srgb, white 10%, transparent) 0%,
                transparent 28%,
                transparent 62%,
                color-mix(in srgb, var(--ld-sky) 12%, transparent) 100%
              )
            `,
          }}
        />
        <div
          data-plane="mullion"
          className="pointer-events-none absolute left-[48%] top-[10%] h-[68%] w-px opacity-40"
          style={{
            background:
              'linear-gradient(180deg, transparent, color-mix(in srgb, white 35%, var(--ld-stone)), transparent)',
          }}
        />
        {/* Warm lamp spill on sill */}
        <div
          data-plane="lamp"
          className="absolute bottom-[8%] left-[12%] h-[28%] w-[40%] opacity-70"
          style={{
            background: `
              radial-gradient(
                ellipse 55% 45% at 40% 70%,
                color-mix(in srgb, var(--ld-lamp) 45%, transparent) 0%,
                transparent 70%
              )
            `,
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.22] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
          }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-between px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-10 lg:px-12">
        <p
          data-hero="caption"
          data-type="migrate"
          className="ml-auto max-w-[11rem] text-right font-['IBM_Plex_Sans',sans-serif] text-[0.65rem] leading-relaxed tracking-[0.18em] text-[color-mix(in_srgb,var(--ld-sky)_90%,white)] uppercase sm:max-w-[14rem]"
        >
          Look out.
        </p>

        <div className="flex max-w-3xl flex-col items-start gap-6 sm:gap-8">
          <div>
            <p className="mb-2 font-['IBM_Plex_Sans',sans-serif] text-[0.65rem] tracking-[0.2em] text-[color-mix(in_srgb,var(--ld-lamp)_75%,white)] uppercase">
              Prime Warsaw
            </p>
            <h1
              data-hero="brand"
              className="font-['Cormorant_Garamond',serif] font-medium tracking-[-0.03em] text-[clamp(4.25rem,20vw,10rem)] leading-[0.85] text-[color-mix(in_srgb,var(--ld-linen)_92%,var(--ld-lamp))]"
            >
              PRIME.
            </h1>
            <p
              data-hero="support"
              className="mt-4 max-w-xs font-['IBM_Plex_Sans',sans-serif] text-sm leading-relaxed text-[color-mix(in_srgb,var(--ld-linen)_65%,var(--ld-stone))] sm:text-base"
            >
              Then come deeper.
            </p>
          </div>

          <div data-hero="cta" className="flex flex-wrap items-center gap-3">
            <a
              href="#interior"
              className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--ld-lamp)] px-4 font-['IBM_Plex_Sans',sans-serif] text-sm font-medium text-[var(--ld-sill)] transition-opacity hover:opacity-90"
            >
              Step inside
            </a>
            <a
              href="https://www.instagram.com/prime_warsaw/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--ld-linen)_22%,transparent)] bg-[color-mix(in_srgb,var(--ld-sill)_45%,transparent)] px-4 font-['IBM_Plex_Sans',sans-serif] text-sm font-medium text-[color-mix(in_srgb,var(--ld-linen)_88%,var(--ld-sky))] backdrop-blur-sm transition-colors hover:border-[color-mix(in_srgb,var(--ld-linen)_38%,transparent)]"
            >
              @prime_warsaw
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
