/**
 * Pulse play — gaming arena rail. Shader retune owns Plasma in motion/.
 */
export default function PulsePlay() {
  return (
    <section
      aria-labelledby="el-play-title"
      data-scene="play"
      data-beat="play"
      data-rail="lock"
      className="pointer-events-none relative flex min-h-dvh w-full flex-col justify-center px-5 py-16 sm:items-end sm:px-8 sm:text-right lg:px-12"
    >
      <div className="w-full max-w-sm sm:max-w-xs">
        <p className="font-[family-name:var(--el-body)] text-[0.62rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--el-plasma)_75%,transparent)] uppercase">
          Pulse 01
        </p>
        <h2
          id="el-play-title"
          className="mt-2 font-[family-name:var(--el-display)] text-[clamp(2.8rem,10vw,4.5rem)] leading-[0.82] font-extrabold tracking-[-0.04em] text-[var(--el-ink)] uppercase"
        >
          Play
        </h2>
        <p className="mt-4 font-[family-name:var(--el-body)] text-[0.78rem] leading-relaxed tracking-[0.14em] text-[color-mix(in_srgb,var(--el-bone)_70%,transparent)] uppercase">
          Arena voltage. Rigs in the well. The lattice goes plasma.
        </p>
      </div>
    </section>
  )
}
