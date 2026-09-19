/**
 * House chrome — valance, fly-pipe, wings, stage lip.
 * Surtitle recast is owned by motion/.
 */
export default function Proscenium() {
  return (
    <div
      data-scroll="proscenium"
      className="pointer-events-none absolute inset-0 z-30"
    >
      <div
        data-plane="valance"
        className="absolute inset-x-0 top-0 h-[min(16vh,6.5rem)] overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                #4a1218 0px,
                #3a0e14 14px,
                #5c1822 28px,
                #4a1218 42px
              )
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-55"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, #070506 30%, transparent) 0%, transparent 48%, color-mix(in srgb, #070506 50%, transparent) 100%)',
          }}
        />
      </div>

      <div className="absolute inset-x-0 top-0 z-10 flex h-[min(16vh,6.5rem)] items-end justify-between gap-4 px-4 pb-2.5 sm:px-7 sm:pb-3">
        <div className="min-w-0">
          <p
            data-cue="rail"
            className="mb-0.5 font-[family-name:var(--fh-body)] text-[0.58rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--fh-gold)_80%,transparent)] uppercase"
          >
            Pinrail · 00
          </p>
          <p className="font-[family-name:var(--fh-display)] text-[clamp(1.85rem,6.4vw,3.4rem)] leading-none text-[var(--fh-paper)]">
            Prime
          </p>
        </div>
        <p
          data-surtitle
          className="max-w-[18ch] pb-1 text-right font-[family-name:var(--fh-display)] text-[clamp(0.95rem,2.8vw,1.55rem)] leading-[1.05] text-[var(--fh-amber)] italic"
        >
          The house is open.
        </p>
      </div>

      <div
        data-plane="pipe"
        className="absolute inset-x-[4%] top-[min(16vh,6.5rem)] h-[3px] sm:inset-x-[6%]"
        aria-hidden
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #c4a35a 8%, #f3e6d0 50%, #c4a35a 92%, transparent 100%)',
          boxShadow: '0 1px 8px color-mix(in srgb, #c4a35a 45%, transparent)',
        }}
      />

      <div
        data-plane="wing-left"
        aria-hidden
        className="absolute top-[min(16vh,6.5rem)] bottom-0 left-0 w-[min(10vw,3.5rem)] bg-gradient-to-r from-[#070506] via-[#070506]/65 to-transparent"
      />
      <div
        data-plane="wing-right"
        aria-hidden
        className="absolute top-[min(16vh,6.5rem)] right-0 bottom-0 w-[min(10vw,3.5rem)] bg-gradient-to-l from-[#070506] via-[#070506]/65 to-transparent"
      />

      <div
        data-plane="floor"
        className="absolute inset-x-0 bottom-0 h-[min(8vh,3.75rem)]"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, transparent 0%, color-mix(in srgb, #1a1214 70%, transparent) 28%, #0c0809 100%),
              repeating-linear-gradient(
                90deg,
                #1a1214 0px,
                #140e10 18px,
                #221518 36px
              )
            `,
          }}
        />
        <div
          className="absolute inset-x-[8%] top-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, color-mix(in srgb, #c4a35a 55%, transparent), transparent)',
          }}
        />
      </div>
    </div>
  )
}
