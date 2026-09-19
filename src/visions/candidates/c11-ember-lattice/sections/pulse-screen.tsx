/**
 * Pulse screen — cinema rail. LightRays cut is a lattice plane, not this copy.
 */
export default function PulseScreen() {
  return (
    <section
      aria-labelledby="el-screen-title"
      data-scene="screen"
      data-beat="screen"
      data-rail="lock"
      className="pointer-events-none relative flex min-h-dvh w-full flex-col justify-center px-5 py-16 sm:items-end sm:px-8 sm:text-right lg:px-12"
    >
      <div className="w-full max-w-sm sm:max-w-xs">
        <p className="font-[family-name:var(--el-body)] text-[0.62rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--el-gold)_80%,transparent)] uppercase">
          Pulse 02
        </p>
        <h2
          id="el-screen-title"
          className="mt-2 font-[family-name:var(--el-display)] text-[clamp(2.8rem,10vw,4.5rem)] leading-[0.82] font-extrabold tracking-[-0.04em] text-[var(--el-ink)] uppercase"
        >
          Screen
        </h2>
        <p className="mt-4 font-[family-name:var(--el-body)] text-[0.78rem] leading-relaxed tracking-[0.14em] text-[color-mix(in_srgb,var(--el-bone)_70%,transparent)] uppercase">
          Projection cuts the grid. Bone rays. One frame held in the well.
        </p>
      </div>
    </section>
  )
}
