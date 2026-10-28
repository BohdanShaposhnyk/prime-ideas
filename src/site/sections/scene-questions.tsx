import { useRef, useState } from 'react'
import { GoldWord } from '../components/gold-word'
import { useTranslation } from '../copy'
import { questionIds } from '../copy/translate'
import { usePrefersReducedMotion } from '../hooks/media'
import { useSceneParallax } from '../hooks/scene-parallax'
import { lockupClass, lockupToSupportClass, sceneVeilClass, supportClass } from '../lib/palette'

/**
 * Questions after reviews. One port tall, six rows, one answer open.
 */
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
  const { t, rich } = useTranslation()
  const [openId, setOpenId] = useState<string>(questionIds[0] ?? '')

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
          <GoldWord>{t('questions.title')}</GoldWord>
        </h2>
        <p className={`${lockupToSupportClass} ${supportClass}`}>{t('questions.support')}</p>
      </header>

      <div className="cs-px-mid relative z-20 flex min-h-0 flex-1 flex-col px-5 pt-[clamp(0.5rem,1.6svh,1.25rem)] pb-[max(0.85rem,env(safe-area-inset-bottom))] sm:px-8">
        <ul className="mx-auto flex w-full min-h-0 max-w-[42rem] flex-1 flex-col border-t border-white/10">
          {questionIds.map((id, index) => {
            const open = openId === id
            const buttonId = `cs-q-${id}`
            const panelId = `cs-q-${id}-panel`
            return (
              <li key={id} className="flex min-h-min flex-1 flex-col justify-center border-b border-white/10">
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    className={`group ${rowGrid} w-full cursor-pointer py-[clamp(0.4rem,1.05svh,0.7rem)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cs-ice)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cs-pitch)]`}
                    onClick={() => setOpenId(open ? '' : id)}
                  >
                    <span className="font-[family-name:var(--cs-display)] text-[1.25rem] leading-none tracking-[0.04em] text-[var(--cs-gold)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`min-w-0 font-[family-name:var(--cs-body)] text-[clamp(0.92rem,2.1vw,1.05rem)] leading-tight font-medium transition-colors duration-300 motion-reduce:transition-none ${open ? 'text-[var(--cs-gold)]' : 'text-[var(--cs-ice)] group-hover:text-[var(--cs-gold)]'}`}
                    >
                      {t(`questions.${id}.q`)}
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
                        {rich(`questions.${id}.a`)}
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
