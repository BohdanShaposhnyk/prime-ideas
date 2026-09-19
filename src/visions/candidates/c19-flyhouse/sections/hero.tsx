export default function Hero() {
  return (
    <section
      data-scroll="drop"
      data-drop="hero"
      data-cue="00"
      data-surtitle-line="The house is open."
      aria-labelledby="fh-hero-brand"
      className="absolute inset-0 z-0"
    >
      <div data-drop-canvas className="absolute inset-0">
        <div
          data-placeholder="visual"
          aria-hidden
          className="absolute inset-0"
        >
          {/* swap: empty stage rake */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 70% 55% at 50% -10%, color-mix(in srgb, #e8b86d 38%, transparent) 0%, transparent 58%),
                radial-gradient(ellipse 90% 40% at 50% 100%, color-mix(in srgb, #4a1218 45%, transparent) 0%, transparent 70%),
                linear-gradient(180deg, #12090b 0%, #070506 42%, #0c0809 100%)
              `,
            }}
          />
          <div
            className="absolute inset-x-[18%] top-[28%] h-[42%] opacity-40"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, color-mix(in srgb, #f3e6d0 18%, transparent), transparent 70%)',
            }}
          />
          <div
            className="absolute inset-x-[12%] bottom-[8%] h-[22%]"
            style={{
              background: `
                repeating-linear-gradient(
                  90deg,
                  color-mix(in srgb, #1a1214 80%, #8b3a22) 0px,
                  #140e10 16px,
                  #1e1416 32px
                )
              `,
              maskImage:
                'linear-gradient(180deg, transparent 0%, black 35%, black 100%)',
            }}
          />
          <div className="absolute top-[46%] left-1/2 h-16 w-px -translate-x-1/2 bg-[color-mix(in_srgb,#c4a35a_28%,transparent)]" />
          <div className="absolute top-[46%] left-1/2 h-px w-16 -translate-x-1/2 bg-[color-mix(in_srgb,#c4a35a_28%,transparent)]" />
        </div>
      </div>

      <div
        className="absolute inset-x-0 z-10 flex flex-col items-center px-5 text-center"
        style={{
          top: 'calc(min(16vh, 6.5rem) + 5 * 3.15rem + 0.85rem)',
        }}
      >
        <p
          id="fh-hero-brand"
          className="sr-only"
        >
          Prime
        </p>
        <p
          data-type="phrase"
          className="max-w-[12ch] font-[family-name:var(--fh-display)] text-[clamp(1.85rem,7vw,4.4rem)] leading-[0.9] text-[var(--fh-paper)] italic"
        >
          Fly the night.
        </p>
        <p
          data-type="support"
          className="mt-2 font-[family-name:var(--fh-body)] text-[0.62rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--fh-gold)_80%,transparent)] uppercase"
        >
          Warsaw · house to grid
        </p>
        <a
          data-copy="cta"
          href="https://www.instagram.com/prime_warsaw/"
          className="pointer-events-auto mt-2 inline-flex border-b border-[color-mix(in_srgb,var(--fh-gold)_50%,transparent)] pb-0.5 font-[family-name:var(--fh-body)] text-[0.62rem] tracking-[0.22em] text-[var(--fh-paper)] uppercase hover:border-[var(--fh-amber)] hover:text-[var(--fh-amber)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--fh-gold)]"
        >
          Take a seat
        </a>
      </div>
    </section>
  )
}
