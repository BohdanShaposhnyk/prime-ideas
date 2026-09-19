/**
 * Pulse voice — karaoke rail. Ember forks sit on the pinned lattice.
 */
export default function PulseVoice() {
  return (
    <section
      aria-labelledby="el-voice-title"
      data-scene="voice"
      data-beat="voice"
      data-rail="lock"
      className="pointer-events-none relative flex min-h-dvh w-full flex-col justify-center px-5 py-16 sm:items-end sm:px-8 sm:text-right lg:px-12"
    >
      <div className="w-full max-w-sm sm:max-w-xs">
        <p className="font-[family-name:var(--el-body)] text-[0.62rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--el-ember)_80%,transparent)] uppercase">
          Pulse 03
        </p>
        <h2
          id="el-voice-title"
          className="mt-2 font-[family-name:var(--el-display)] text-[clamp(2.8rem,10vw,4.5rem)] leading-[0.82] font-extrabold tracking-[-0.04em] text-[var(--el-ink)] uppercase"
        >
          Voice
        </h2>
        <p className="mt-4 font-[family-name:var(--el-body)] text-[0.78rem] leading-relaxed tracking-[0.14em] text-[color-mix(in_srgb,var(--el-bone)_70%,transparent)] uppercase">
          Stage heat forks the lattice. Sing until the ring holds.
        </p>
      </div>
    </section>
  )
}
