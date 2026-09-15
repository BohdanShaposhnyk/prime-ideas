import type { CSSProperties } from 'react'

/**
 * Hero — single lodge scene. Zoom-target is the full room; scroll pulls the camera
 * back from the window crop. Interior copy lives in scene-interior (same pin).
 */
export default function Hero() {
  return (
    <section
      aria-labelledby="hero-brand"
      data-hero="lodge-depth"
      data-scene="hero"
      className="absolute inset-0 isolate flex h-full w-full overflow-hidden text-[var(--ld-linen)]"
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
      {/*
        One continuous scene (swap-ready). Settled = full room; scale-up crops into the window.
        Transform origin sits on the glass so zoom-out reads as one camera pull.
      */}
      <div
        data-placeholder="visual"
        data-plane="zoom-target"
        className="absolute inset-0 origin-[64%_33%]"
        aria-hidden
      >
        {/* Room volume — stone / oak / moss */}
        <div
          data-plane="room"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(60% 50% at 72% 28%, color-mix(in srgb, var(--ld-sky) 14%, transparent) 0%, transparent 55%),
              radial-gradient(50% 45% at 22% 70%, color-mix(in srgb, var(--ld-lamp) 32%, transparent) 0%, transparent 60%),
              radial-gradient(40% 40% at 85% 78%, color-mix(in srgb, var(--ld-moss) 45%, transparent) 0%, transparent 58%),
              linear-gradient(145deg, #3E342C 0%, var(--ld-oak) 32%, #2C332C 62%, var(--ld-sill) 100%)
            `,
          }}
        />

        {/* Stone wall — left */}
        <div
          data-plane="stone"
          className="absolute inset-y-[6%] left-0 w-[40%] opacity-85"
          style={{
            background: `
              linear-gradient(
                95deg,
                color-mix(in srgb, var(--ld-stone) 55%, #2A2824) 0%,
                color-mix(in srgb, var(--ld-stone) 35%, transparent) 70%,
                transparent 100%
              ),
              repeating-linear-gradient(
                0deg,
                transparent 0 28px,
                color-mix(in srgb, black 12%, transparent) 28px 29px
              )
            `,
          }}
        />

        {/* Greenery — right of window */}
        <div
          data-plane="greenery"
          className="absolute top-[16%] right-[2%] h-[48%] w-[22%]"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 55% 40%, color-mix(in srgb, var(--ld-moss) 70%, transparent), transparent 70%),
              radial-gradient(ellipse 35% 30% at 30% 60%, color-mix(in srgb, #4F7358 50%, transparent), transparent 68%),
              radial-gradient(ellipse 40% 35% at 70% 70%, color-mix(in srgb, var(--ld-moss) 40%, transparent), transparent 65%)
            `,
          }}
        />

        {/* Wood floor */}
        <div
          data-plane="wood-floor"
          className="absolute inset-x-0 bottom-0 h-[38%]"
          style={{
            background: `
              linear-gradient(
                0deg,
                color-mix(in srgb, var(--ld-oak) 70%, black) 0%,
                color-mix(in srgb, var(--ld-oak) 40%, transparent) 55%,
                transparent 100%
              ),
              repeating-linear-gradient(
                90deg,
                transparent 0 18px,
                color-mix(in srgb, black 10%, transparent) 18px 19px
              )
            `,
          }}
        />

        {/* Window portal — street lives only inside the glass */}
        <div
          data-plane="glass"
          className="absolute top-[14.5%] right-[18%] h-[37%] w-[36%] overflow-hidden"
          style={{
            boxShadow: `
              inset 0 0 0 1px color-mix(in srgb, white 16%, transparent),
              inset 0 0 36px color-mix(in srgb, var(--ld-sky) 10%, transparent),
              0 0 40px color-mix(in srgb, var(--ld-sill) 35%, transparent)
            `,
          }}
        >
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
          <div
            data-plane="street-wet"
            className="absolute inset-x-[8%] top-[48%] h-[28%] opacity-50"
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
              filter: 'blur(4px)',
            }}
          />
          <div
            data-plane="mullion"
            className="pointer-events-none absolute top-[4%] left-1/2 h-[92%] w-px -translate-x-1/2 opacity-40"
            style={{
              background:
                'linear-gradient(180deg, transparent, color-mix(in srgb, white 35%, var(--ld-stone)), transparent)',
            }}
          />
          <div
            data-plane="glass-sheen"
            className="pointer-events-none absolute inset-0"
            style={{
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
        </div>

        {/* Soft oak/moss jamb around the glass */}
        <div
          data-plane="window-jamb"
          className="pointer-events-none absolute top-[12%] right-[16%] h-[42%] w-[40%]"
          style={{
            boxShadow: `
              inset 18px 0 28px color-mix(in srgb, var(--ld-oak) 55%, transparent),
              inset -14px 0 24px color-mix(in srgb, var(--ld-moss) 40%, transparent),
              inset 0 14px 22px color-mix(in srgb, var(--ld-sill) 50%, transparent),
              inset 0 -16px 26px color-mix(in srgb, var(--ld-oak) 45%, transparent)
            `,
          }}
        />

        {/* Lamp pool on the floor */}
        <div
          data-plane="lamp"
          className="absolute bottom-[16%] left-[18%] h-[36%] w-[44%] opacity-75"
          style={{
            background: `
              radial-gradient(
                ellipse 50% 40% at 45% 55%,
                color-mix(in srgb, var(--ld-lamp) 40%, transparent) 0%,
                transparent 70%
              )
            `,
          }}
        />

        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.2] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px',
          }}
        />
      </div>

      {/* Hero copy — fades on zoom */}
      <div
        data-copy="hero"
        className="relative z-10 flex h-full w-full flex-col justify-between px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-10 lg:px-12"
      >
        <p
          data-hero="caption"
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
              id="hero-brand"
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
              className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--ld-lamp)] px-4 font-['IBM_Plex_Sans',sans-serif] text-sm font-medium text-[var(--ld-sill)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ld-linen)]"
            >
              Step inside
            </a>
            <a
              href="https://www.instagram.com/prime_warsaw/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--ld-linen)_22%,transparent)] bg-[color-mix(in_srgb,var(--ld-sill)_45%,transparent)] px-4 font-['IBM_Plex_Sans',sans-serif] text-sm font-medium text-[color-mix(in_srgb,var(--ld-linen)_88%,var(--ld-sky))] backdrop-blur-sm transition-colors hover:border-[color-mix(in_srgb,var(--ld-linen)_38%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ld-linen)]"
            >
              @prime_warsaw
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
