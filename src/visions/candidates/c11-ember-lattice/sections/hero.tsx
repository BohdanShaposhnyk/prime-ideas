/**
 * Hero — flush-left lockup over the pinned lattice.
 * Pulse-ring expand / shader retune live in motion/.
 */
export default function Hero() {
  return (
    <section
      aria-labelledby="el-hero-brand"
      data-scene="hero"
      data-beat="hero"
      className="pointer-events-none relative flex min-h-dvh w-full flex-col justify-end px-5 pb-10 sm:px-8 sm:pb-14 lg:px-12"
    >
      <div className="flex w-full max-w-xl flex-col items-start">
        <p className="font-[family-name:var(--el-body)] text-[0.62rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--el-silk)_70%,transparent)] uppercase">
          Warsaw · lattice 00
        </p>
        <h1
          id="el-hero-brand"
          data-copy="brand"
          className="mt-3 font-[family-name:var(--el-display)] text-[clamp(4.5rem,22vw,11rem)] leading-[0.78] font-extrabold tracking-[-0.06em] text-[var(--el-ink)] uppercase"
        >
          Prime
        </h1>
        <p
          data-copy="headline"
          className="mt-6 max-w-[16ch] font-[family-name:var(--el-display)] text-[clamp(1.6rem,5vw,2.6rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-[var(--el-ember)]"
        >
          The night has a lattice.
        </p>
        <p
          data-copy="support"
          className="mt-3 font-[family-name:var(--el-body)] text-[0.8rem] tracking-[0.18em] text-[color-mix(in_srgb,var(--el-bone)_72%,transparent)] uppercase"
        >
          Pulse until it ignites.
        </p>
        <a
          data-copy="cta"
          href="https://www.instagram.com/prime_warsaw/"
          className="pointer-events-auto mt-8 inline-flex border border-[color-mix(in_srgb,var(--el-gold)_55%,transparent)] px-5 py-2.5 font-[family-name:var(--el-body)] text-[0.68rem] tracking-[0.22em] text-[var(--el-gold)] uppercase transition-colors hover:border-[var(--el-ember)] hover:text-[var(--el-ember)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--el-gold)]"
        >
          Hold a night
        </a>
      </div>
    </section>
  )
}
