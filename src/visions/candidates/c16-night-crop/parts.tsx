import type { ReactNode } from 'react'

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 opacity-[0.18] mix-blend-overlay"
      style={{
        backgroundImage:
          'repeating-radial-gradient(circle at 18% 22%, #fff 0 0.6px, transparent 0.8px 3px), repeating-radial-gradient(circle at 78% 64%, #000 0 0.5px, transparent 0.7px 4px)',
        backgroundSize: '120px 120px, 90px 90px',
      }}
    />
  )
}

export function VisualPlane({
  variant,
}: {
  variant: 'hero' | 'heat' | 'play' | 'voice' | 'screen' | 'close'
}) {
  return (
    <div
      data-placeholder="visual"
      data-plane={variant}
      className="absolute inset-0 overflow-hidden"
    >
      {variant === 'hero' ? <HeroWash /> : null}
      {variant === 'heat' ? <HeatWash /> : null}
      {variant === 'play' ? <PlayWash /> : null}
      {variant === 'voice' ? <VoiceWash /> : null}
      {variant === 'screen' ? <ScreenWash /> : null}
      {variant === 'close' ? <CloseWash /> : null}
      <Grain />
    </div>
  )
}

function HeroWash() {
  return (
    <>
      {/* swap: street threshold night */}
      <div className="absolute inset-0 bg-[var(--nc-void)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_110%,color-mix(in_srgb,var(--nc-chrome)_28%,transparent),transparent_58%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(165deg,transparent_42%,color-mix(in_srgb,var(--nc-lime)_18%,transparent)_43%,transparent_44%)]" />
      <div className="absolute right-[-12%] bottom-[-18%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--nc-magenta)_34%,transparent),transparent_62%)] blur-2xl" />
      <div className="absolute top-[18%] left-[8%] h-[2px] w-[42%] bg-[var(--nc-lime)] opacity-80" />
      <div className="absolute top-[18%] left-[8%] h-[38%] w-[2px] bg-[var(--nc-lime)] opacity-50" />
      <div className="absolute right-[14%] bottom-[22%] h-[28%] w-[38%] border border-[color-mix(in_srgb,var(--nc-chrome)_45%,transparent)]" />
    </>
  )
}

function HeatWash() {
  return (
    <>
      {/* swap: bar + kitchen tungsten */}
      <div className="absolute inset-0 bg-[#120c08]" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_90%_at_28%_78%,color-mix(in_srgb,var(--nc-tungsten)_55%,transparent),transparent_62%)]" />
      <div className="absolute top-[8%] right-[-10%] h-[70%] w-[55%] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--nc-magenta)_40%,transparent),transparent_64%)] blur-3xl" />
      <div className="absolute bottom-[18%] left-[12%] h-[22%] w-[46%] bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--nc-paper)_22%,transparent),transparent)] blur-md" />
      <div className="absolute top-[30%] left-[18%] size-[38%] border border-[color-mix(in_srgb,var(--nc-tungsten)_50%,transparent)]" />
    </>
  )
}

function PlayWash() {
  return (
    <>
      {/* swap: arena screens */}
      <div className="absolute inset-0 bg-[#050806]" />
      <div
        className="absolute inset-[12%] opacity-80"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--nc-lime) 22%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--nc-lime) 16%, transparent) 1px, transparent 1px)',
          backgroundSize: '22% 100%, 100% 28%',
        }}
      />
      <div className="absolute top-[16%] left-[10%] h-[38%] w-[28%] bg-[color-mix(in_srgb,var(--nc-lime)_28%,transparent)]" />
      <div className="absolute right-[8%] bottom-[14%] h-[42%] w-[36%] bg-[linear-gradient(115deg,color-mix(in_srgb,var(--nc-magenta)_55%,transparent),transparent)]" />
      <div className="absolute top-[42%] left-[38%] h-[2px] w-[48%] bg-[var(--nc-lime)]" />
    </>
  )
}

function VoiceWash() {
  return (
    <>
      {/* swap: karaoke mic crop */}
      <div className="absolute inset-0 bg-[#0c060a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,color-mix(in_srgb,var(--nc-magenta)_62%,transparent),transparent_42%)]" />
      <div className="absolute top-1/2 left-1/2 size-[min(48vw,280px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--nc-paper)]/40" />
      <div className="absolute top-1/2 left-1/2 size-[min(22vw,120px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color-mix(in_srgb,var(--nc-paper)_18%,transparent)]" />
      <div className="absolute top-[12%] right-[10%] h-[64%] w-[2px] bg-[var(--nc-lime)] opacity-70" />
    </>
  )
}

function ScreenWash() {
  return (
    <>
      {/* swap: cinema gate */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-x-0 top-0 h-[12%] bg-[var(--nc-void)]" />
      <div className="absolute inset-x-0 bottom-0 h-[12%] bg-[var(--nc-void)]" />
      <div className="absolute inset-x-[8%] inset-y-[16%] bg-[radial-gradient(80%_80%_at_50%_40%,color-mix(in_srgb,var(--nc-chrome)_22%,transparent),transparent_70%)]" />
      <div className="absolute inset-x-[8%] inset-y-[16%] border border-[var(--nc-lime)]/80" />
      <div className="absolute top-1/2 left-[8%] right-[8%] h-px bg-[color-mix(in_srgb,var(--nc-lime)_45%,transparent)]" />
    </>
  )
}

function CloseWash() {
  return (
    <>
      {/* swap: lodge ember hush */}
      <div className="absolute inset-0 bg-[var(--nc-void)]" />
      <div className="absolute right-[18%] bottom-[16%] h-[42%] w-[38%] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--nc-tungsten)_70%,transparent),transparent_68%)] blur-md" />
      <div className="absolute left-[10%] top-[28%] h-[44%] w-[2px] bg-[color-mix(in_srgb,var(--nc-chrome)_40%,transparent)]" />
      <div className="absolute left-[10%] top-[28%] h-[2px] w-[28%] bg-[color-mix(in_srgb,var(--nc-chrome)_40%,transparent)]" />
    </>
  )
}

export function ExifLine({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      data-exif
      data-exif-src={typeof children === 'string' ? children : undefined}
      className={`absolute right-5 bottom-28 left-5 z-30 max-w-[78%] font-[family-name:var(--nc-body)] text-[0.68rem] leading-relaxed tracking-[0.14em] text-[var(--nc-chrome)] uppercase sm:right-auto sm:bottom-20 sm:left-8 ${className}`}
    >
      {children}
    </p>
  )
}

export function CropHeadline({
  children,
  accent = false,
}: {
  children: ReactNode
  accent?: boolean
}) {
  return (
    <h2
      data-copy="headline"
      className={`absolute top-[16%] left-5 z-30 max-w-[9ch] font-[family-name:var(--nc-display)] text-[clamp(2.6rem,11vw,7rem)] leading-[0.82] font-extrabold tracking-[-0.06em] uppercase sm:left-8 ${
        accent ? 'text-[var(--nc-lime)]' : 'text-[var(--nc-paper)]'
      }`}
    >
      {children}
    </h2>
  )
}

export function FinderChrome() {
  return (
    <div
      data-marks
      className="pointer-events-none absolute inset-0 z-40 mix-blend-normal"
    >
      <Mark className="top-3 left-3 sm:top-4 sm:left-4" />
      <Mark className="top-3 right-3 rotate-90 sm:top-4 sm:right-4" />
      <Mark className="bottom-3 left-3 -rotate-90 sm:bottom-4 sm:left-4" />
      <Mark className="right-3 bottom-3 rotate-180 sm:right-4 sm:bottom-4" />

      <p
        data-stamp
        className="absolute top-5 left-5 font-[family-name:var(--nc-body)] text-[0.62rem] tracking-[0.28em] text-[var(--nc-lime)] uppercase sm:top-6 sm:left-7"
      >
        PRIME.RAW
      </p>
      <p
        data-shot
        className="absolute right-5 bottom-5 font-[family-name:var(--nc-body)] text-[0.62rem] tracking-[0.28em] text-[var(--nc-paper)] uppercase sm:right-7 sm:bottom-6"
      >
        01 / 06
      </p>
    </div>
  )
}

function Mark({ className }: { className: string }) {
  return (
    <span
      data-mark
      aria-hidden
      className={`absolute h-7 w-7 border-t-2 border-l-2 border-[var(--nc-paper)] sm:h-9 sm:w-9 ${className}`}
    />
  )
}
