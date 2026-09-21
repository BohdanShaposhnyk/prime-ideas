import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import CountUp from '@/shared/bits/CountUp'
import Silk from '@/shared/bits/Silk'
import SplitText from '@/shared/bits/SplitText'
import { prefersReducedMotion } from '@/shared/lib/motion'

const FRANCHISE_MAIL = 'mailto:abc@xyz.com'
const PROOF_RATE_MS = 1300

const PROOFS = [
  { n: '01', title: 'Established concept' },
  { n: '02', title: 'Full brand support' },
  { n: '03', title: 'Your city. Your Prime.' },
] as const

const proofLabelClass =
  'font-[family-name:var(--cs-body)] text-[0.58rem] font-semibold tracking-[0.28em] text-white/70 uppercase sm:text-[0.68rem]'
const proofTitleClass =
  'font-[family-name:var(--cs-display)] text-[clamp(1.15rem,4vw,2.05rem)] leading-[0.92] tracking-[0.04em] text-white uppercase'

function ProofCard() {
  return (
    <ul className="w-full rounded-[1.35rem] bg-[#333333]/60 px-4 py-3.5 text-white sm:px-6 sm:py-5 md:px-7 md:py-6">
      {PROOFS.map((proof, i) => (
        <li
          key={proof.n}
          className={i > 0 ? 'border-t border-white/15 pt-2.5 sm:pt-3.5 md:pt-4' : undefined}
        >
          <p className={proofLabelClass}>{proof.n}</p>
          <p className={`mt-1 md:mt-1.5 md:text-[clamp(1.12rem,2.6vw,2.05rem)] ${proofTitleClass}`}>
            {proof.title}
          </p>
        </li>
      ))}
    </ul>
  )
}

function MobileProofCard() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [cycle, setCycle] = useState({ index: 0, gen: 0 })
  const proof = PROOFS[cycle.index]
  const to = cycle.index + 1
  const from = cycle.index === 0 ? 1 : cycle.index

  useEffect(() => {
    const el = rootRef.current
    if (!el || prefersReducedMotion()) return

    let timer = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) {
        window.clearInterval(timer)
        timer = 0
        return
      }
      if (timer) return
      timer = window.setInterval(() => {
        setCycle((current) => {
          const next = (current.index + 1) % PROOFS.length
          return { index: next, gen: next === 0 ? current.gen + 1 : current.gen }
        })
      }, PROOF_RATE_MS)
    })
    io.observe(el)

    return () => {
      window.clearInterval(timer)
      io.disconnect()
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="w-full rounded-[1.35rem] bg-[#333333]/60 px-4 py-3.5 text-white"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className={proofLabelClass}>
        <span className="inline-flex items-baseline gap-[0.28em] tracking-normal tabular-nums">
          <span aria-hidden>0</span><CountUp key={cycle.gen} from={from} to={to} delay={0} duration={0.16} />
        </span>
      </p>
      <div className="mt-1 min-h-[1.15em] overflow-hidden">
        <SplitText
          key={proof.n}
          text={proof.title}
          splitType="lines"
          tag="p"
          textAlign="left"
          delay={40}
          duration={0.55}
          ease="power3.out"
          from={{ opacity: 0, y: 22 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0}
          rootMargin="0px"
          className={`${proofTitleClass} w-full !text-transparent [&_.split-line]:!text-white`}
        />
      </div>
    </div>
  )
}

export default function SceneFranchise() {
  return (
    <section
      aria-labelledby="cs-franchise-title"
      data-scene="franchise"
      className="relative isolate h-dvh overflow-hidden bg-[#d5beae] text-[#1a1a1a]"
    >
      {/* swap: silk partnership field */}
      <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
        <Silk
          speed={2.6}
          noiseIntensity={6.2}
          color="#d5beae"
          rotation={2.15}
          scale={0.6}
          lightMode
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[88rem] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="grid h-full w-full grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="flex h-full min-h-0 min-w-0 flex-col items-start justify-between">
            <h2
              id="cs-franchise-title"
              className="font-[family-name:var(--cs-display)] text-[clamp(3.2rem,15.5dvh,6.2rem)] leading-[0.82] tracking-[0.02em] text-[#1a1a1a] uppercase md:text-[clamp(4.6rem,21dvh,8.2rem)]"
            >
              <span className="block">Make</span>
              <span className="block">Prime</span>
              <span className="block">yours</span>
            </h2>

            <div className="flex w-full flex-col items-start">
              <p className="max-w-[28rem] font-[family-name:var(--cs-body)] text-[clamp(1.05rem,2.4vw,1.35rem)] font-medium leading-snug tracking-[0.02em] text-[#333333]">
                Bring the Prime experience to your city.
              </p>
              <a
                href={FRANCHISE_MAIL}
                className="mt-4 inline-flex items-center gap-3 rounded-md bg-[#333333] px-6 py-3 font-[family-name:var(--cs-body)] text-[0.78rem] font-semibold tracking-[0.18em] text-white uppercase transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#333333] focus-visible:ring-offset-2 focus-visible:ring-offset-[#d5beae] sm:px-7 sm:py-4 md:mt-8 md:px-9 md:py-5 md:text-[0.88rem] md:tracking-[0.2em]"
              >
                Open Prime
                <ArrowRight className="size-5 shrink-0 sm:size-6" aria-hidden />
              </a>
              <div className="mt-4 w-full max-w-[28rem] md:hidden">
                <MobileProofCard />
              </div>
            </div>
          </div>

          <div className="hidden w-full md:flex md:justify-end">
            <div className="w-full max-w-[32rem]">
              <ProofCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
