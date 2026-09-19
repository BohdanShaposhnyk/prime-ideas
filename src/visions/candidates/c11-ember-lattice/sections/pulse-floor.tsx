/**
 * Pulse floor — bar / hookah / kitchen as a three-line rail.
 */
export default function PulseFloor() {
  return (
    <section
      aria-labelledby="el-floor-title"
      data-scene="floor"
      data-beat="floor"
      data-rail="lock"
      className="pointer-events-none relative flex min-h-dvh w-full flex-col justify-center px-5 py-16 sm:items-end sm:px-8 sm:text-right lg:px-12"
    >
      <div className="w-full max-w-sm sm:max-w-xs">
        <p className="font-[family-name:var(--el-body)] text-[0.62rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--el-silk)_75%,transparent)] uppercase">
          Pulse 04
        </p>
        <h2
          id="el-floor-title"
          className="mt-2 font-[family-name:var(--el-display)] text-[clamp(2.8rem,10vw,4.5rem)] leading-[0.82] font-extrabold tracking-[-0.04em] text-[var(--el-ink)] uppercase"
        >
          Floor
        </h2>
        <ul className="mt-5 flex flex-col gap-2 font-[family-name:var(--el-body)] text-[0.78rem] tracking-[0.18em] text-[color-mix(in_srgb,var(--el-bone)_74%,transparent)] uppercase sm:items-end">
          <li>Bar — voltage pour</li>
          <li>Hookah — silk linger</li>
          <li>Kitchen — late heat</li>
        </ul>
      </div>
    </section>
  )
}
