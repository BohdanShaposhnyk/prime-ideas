/**
 * Rest — lattice settles; reservation close.
 */
export default function PulseRest() {
  return (
    <section
      aria-labelledby="el-rest-title"
      data-scene="rest"
      data-beat="rest"
      data-rail="lock"
      className="pointer-events-none relative flex min-h-dvh w-full flex-col justify-center px-5 py-16 sm:items-end sm:px-8 sm:text-right lg:px-12"
    >
      <div className="w-full max-w-sm sm:max-w-xs">
        <p className="font-[family-name:var(--el-body)] text-[0.62rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--el-gold)_75%,transparent)] uppercase">
          Rest
        </p>
        <h2
          id="el-rest-title"
          className="mt-2 font-[family-name:var(--el-display)] text-[clamp(2.8rem,10vw,4.5rem)] leading-[0.82] font-extrabold tracking-[-0.04em] text-[var(--el-ink)] uppercase"
        >
          Stay
        </h2>
        <p className="mt-4 font-[family-name:var(--el-body)] text-[0.78rem] leading-relaxed tracking-[0.14em] text-[color-mix(in_srgb,var(--el-bone)_70%,transparent)] uppercase">
          The lattice holds. Book the floor before it cools.
        </p>
        <a
          href="https://www.instagram.com/prime_warsaw/"
          className="pointer-events-auto mt-8 inline-flex border border-[color-mix(in_srgb,var(--el-ink)_50%,transparent)] px-5 py-2.5 font-[family-name:var(--el-body)] text-[0.68rem] tracking-[0.22em] text-[var(--el-ink)] uppercase transition-colors hover:border-[var(--el-gold)] hover:text-[var(--el-gold)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--el-gold)]"
        >
          Book the floor
        </a>
      </div>
    </section>
  )
}
