import type { ReactNode } from 'react'

type DropPlateProps = {
  drop: string
  cue: string
  title: string
  line: string
  surtitle: string
  labelledBy: string
  children: ReactNode
}

/**
 * Cropped scenery batten parked in the flies.
 * Full-stage fly-in / fly-out is owned by motion/.
 */
export function DropPlate({
  drop,
  cue,
  title,
  line,
  surtitle,
  labelledBy,
  children,
}: DropPlateProps) {
  return (
    <section
      data-scroll="drop"
      data-drop={drop}
      data-cue={cue}
      data-surtitle-line={surtitle}
      aria-labelledby={labelledBy}
      className="relative h-[clamp(2.15rem,6vh,3.15rem)] overflow-hidden"
    >
      <div data-drop-canvas className="absolute inset-x-0 top-0 h-dvh">
        <div
          data-placeholder="visual"
          aria-hidden
          className="absolute inset-0"
        >
          {children}
          <Grommets />
          <Folds />
        </div>

        <div className="relative z-10 flex h-[clamp(2.15rem,6vh,3.15rem)] items-center justify-between gap-4 px-4 pt-1 sm:px-8">
          <div className="min-w-0">
            <p className="font-[family-name:var(--fh-body)] text-[0.58rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--fh-paper)_62%,transparent)] uppercase">
              Cue {cue}
            </p>
            <h2
              id={labelledBy}
              className="truncate font-[family-name:var(--fh-display)] text-[clamp(1.3rem,4.2vw,2.1rem)] leading-[0.85] text-[var(--fh-paper)]"
            >
              {title}
            </h2>
          </div>
          <p className="hidden max-w-[16ch] text-right font-[family-name:var(--fh-body)] text-[0.62rem] tracking-[0.14em] text-[color-mix(in_srgb,var(--fh-paper)_70%,transparent)] uppercase lg:block">
            {line}
          </p>
        </div>
        <p
          aria-hidden
          className="pointer-events-none absolute top-[22%] left-4 font-[family-name:var(--fh-display)] text-[clamp(4rem,18vw,9rem)] leading-[0.8] text-[color-mix(in_srgb,var(--fh-paper)_88%,transparent)] sm:left-8"
        >
          {title}
        </p>
      </div>
    </section>
  )
}

function Grommets() {
  return (
    <div className="absolute inset-x-3 top-0.5 z-10 flex justify-between sm:inset-x-6">
      {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'].map((id) => (
        <span
          key={id}
          className="size-1.5 rounded-full bg-[color-mix(in_srgb,var(--fh-gold)_80%,#070506)] shadow-[0_0_0_1px_color-mix(in_srgb,#070506_55%,transparent)]"
        />
      ))}
    </div>
  )
}

function Folds() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
      style={{
        backgroundImage: `repeating-linear-gradient(
          90deg,
          transparent 0px,
          transparent 22px,
          color-mix(in srgb, #070506 28%, transparent) 23px,
          transparent 28px
        )`,
      }}
    />
  )
}
