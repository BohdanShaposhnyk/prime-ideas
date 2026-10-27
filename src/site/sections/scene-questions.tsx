import { useRef, useState, type ReactNode } from 'react'
import { GoldWord } from '../components/gold-word'
import { usePrefersReducedMotion } from '../hooks/media'
import { useSceneParallax } from '../hooks/scene-parallax'
import { BOOKING_URL } from '../lib/booking'
import { lockupClass, lockupToSupportClass, sceneVeilClass, supportClass } from '../lib/palette'

/**
 * Questions after reviews. One port tall, seven rows, one answer open.
 * Club code, welcome gift, birthday gift, hourly rate, and addresses are the live lines.
 * Hours, deposits, student and group rates, and the age rule are stand-ins.
 */
const QUESTIONS: { id: string; q: string; a: ReactNode }[] = [
  {
    id: 'club',
    q: 'How do I activate the club?',
    a: (
      <>
        Open SENET and enter club code <Em>“PRIME”</Em>. New guests get <Em>50 zł</Em> on the account, or the first hour free.
      </>
    ),
  },
  {
    id: 'book',
    q: 'How do I book a PC or a room?',
    a: (
      <>
        Book{' '}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--cs-gold)] underline decoration-white/25 underline-offset-2 hover:decoration-[var(--cs-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cs-ice)]"
        >
          online
        </a>
        , on Telegram or Instagram, or at the desk. A PC is pay on arrival. Rooms and night packages hold once we confirm.
      </>
    ),
  },
  {
    id: 'hours',
    q: 'What are the hours?',
    a: (
      <>
        Open every day, <Em>16:00–03:00</Em>, at every lounge. Night packages start at <Em>22:00</Em>. We are not open 24/7.
      </>
    ),
  },
  {
    id: 'prices',
    q: 'What are the prices?',
    a: (
      <>
        <Em>19 zł</Em> an hour, or <Em>10 zł</Em> an hour in a package. Night packages cover the stretch from 22:00. Play zone, private room, and cinema hall are priced on their own.
      </>
    ),
  },
  {
    id: 'deals',
    q: 'What discounts are on?',
    a: (
      <>
        New guests get <Em>50 zł</Em> or the first hour free. Birthdays get <Em>300 zł</Em> with an ID. Students and groups of four or more get a rate at the desk.
      </>
    ),
  },
  {
    id: 'age',
    q: 'From what age can I come?',
    a: (
      <>
        Under 16, come with an adult and an ID, and stay until <Em>22:00</Em>. From 16 you can come alone. The bar is 18+.
      </>
    ),
  },
  {
    id: 'pay',
    q: 'Where are you, and how do I pay?',
    a: (
      <>
        Waliców 11, Rzymowskiego 53 in Mokotów, and Plac Teatralny 6–8 in Wrocław. Card, BLIK, or cash.
      </>
    ),
  },
]

function Em({ children }: { children: ReactNode }) {
  return <span className="text-[var(--cs-gold)]">{children}</span>
}

function Mark({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-4 shrink-0 transition-colors duration-300 ease-out motion-reduce:transition-none ${open ? 'text-[var(--cs-gold)]' : 'text-[var(--cs-caption)] group-hover:text-[var(--cs-gold)]'}`}
      aria-hidden
    >
      <path d="M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M12 5v14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        className={`origin-center [transform-box:fill-box] transition-transform duration-300 ease-out motion-reduce:transition-none ${open ? 'scale-y-0' : ''}`}
      />
    </svg>
  )
}

const rowGrid = 'grid grid-cols-[2rem_minmax(0,1fr)_1rem] items-center gap-x-3'

export default function SceneQuestions() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  useSceneParallax(rootRef, !reduced)
  const [openId, setOpenId] = useState<string>(QUESTIONS[0]?.id ?? '')

  return (
    <section
      ref={rootRef}
      aria-labelledby="cs-questions-title"
      data-scene="questions"
      className="cs-scene cs-px relative isolate flex flex-col overflow-hidden bg-[var(--cs-pitch)] text-[var(--cs-ice)]"
    >
      <div aria-hidden className={sceneVeilClass} />
      <header className="cs-px-copy relative z-20 shrink-0 px-5 pt-[var(--cs-header-h)] text-center sm:px-8">
        <h2 id="cs-questions-title" className={lockupClass}>
          <GoldWord>Questions</GoldWord>
        </h2>
        <p className={`${lockupToSupportClass} ${supportClass}`}>Before you book a night.</p>
      </header>

      <div className="cs-px-mid relative z-20 flex min-h-0 flex-1 flex-col px-5 pt-[clamp(0.5rem,1.6svh,1.25rem)] pb-[max(0.85rem,env(safe-area-inset-bottom))] sm:px-8">
        <ul className="mx-auto flex w-full min-h-0 max-w-[42rem] flex-1 flex-col border-t border-white/10">
          {QUESTIONS.map((item, index) => {
            const open = openId === item.id
            const buttonId = `cs-q-${item.id}`
            const panelId = `cs-q-${item.id}-panel`
            return (
              <li key={item.id} className="flex min-h-min flex-1 flex-col justify-center border-b border-white/10">
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    className={`group ${rowGrid} w-full cursor-pointer py-[clamp(0.4rem,1.05svh,0.7rem)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cs-ice)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cs-pitch)]`}
                    onClick={() => setOpenId(open ? '' : item.id)}
                  >
                    <span className="font-[family-name:var(--cs-display)] text-[1.25rem] leading-none tracking-[0.04em] text-[var(--cs-gold)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`min-w-0 font-[family-name:var(--cs-body)] text-[clamp(0.92rem,2.1vw,1.05rem)] leading-tight font-medium transition-colors duration-300 motion-reduce:transition-none ${open ? 'text-[var(--cs-gold)]' : 'text-[var(--cs-ice)] group-hover:text-[var(--cs-gold)]'}`}
                    >
                      {item.q}
                    </span>
                    <Mark open={open} />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!open}
                  inert={!open}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className={rowGrid}>
                      <p className="col-start-2 pb-[clamp(0.35rem,0.9svh,0.65rem)] font-[family-name:var(--cs-body)] text-[clamp(0.84rem,1.6vh,0.98rem)] leading-snug font-normal text-[var(--cs-caption)]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
