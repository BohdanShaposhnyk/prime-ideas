import FoldText from '@/site/bits/FoldText'
import ParticleText from '@/site/bits/ParticleText'
import { BookNightButton } from '../../components/book-night'
import { useTranslation } from '../../copy'
import { lockupClass, palette } from '../../lib/palette'
import { FIELD, lockupSize, primeSlot } from './field'
import { stayFold, stayWord } from './use-intro'

export function BasementLockup({
  stayOn,
  primeOn,
  ctaOn,
  desktop,
}: {
  stayOn: boolean
  primeOn: boolean
  ctaOn: boolean
  desktop: boolean
}) {
  const { t } = useTranslation()
  const prime = t('basement.prime')

  return (
    <div className="relative z-[1] flex flex-1 flex-col items-center justify-center gap-5 px-5 sm:gap-6">
      <h2
        id="cs-basement-title"
        className={`flex items-center justify-center gap-[0.12em] text-center ${lockupClass}`}
        style={{ minHeight: primeSlot.height }}
      >
        {stayOn ? (
          <>
            <FoldText
              text={stayWord}
              splitBy="char"
              hinge="top"
              trigger="mount"
              duration={stayFold.duration}
              stagger={stayFold.stagger}
              fontSize={lockupSize}
              fontWeight={400}
              color={palette.ice}
              className="font-[family-name:var(--cs-display)] uppercase"
              style={{
                letterSpacing: 'var(--cs-track-display)',
                lineHeight: 'var(--cs-lead-display)',
              }}
            />
            <span className="relative shrink-0" style={primeSlot}>
              {primeOn ? (
                <ParticleText
                  text={prime}
                  color={palette.gold}
                  highlightColor="#F6E7A8"
                  particleSize={1.7}
                  density={3}
                  scatter={desktop ? 360 : 96}
                  gatherDuration={1080}
                  stagger={0}
                  pointerRepel={22}
                  repelRadius={desktop ? 140 : 100}
                  idleDrift={0.22}
                  glow
                  trigger="mount"
                  fontSize={lockupSize}
                  fontWeight={400}
                  fontFamily='"Bebas Neue", sans-serif'
                  className="cs-prime-field"
                  style={desktop ? FIELD.desktop : FIELD.phone}
                />
              ) : (
                <span className="sr-only">{t('basement.primeFallback')}</span>
              )}
            </span>
          </>
        ) : (
          <span className="sr-only">{t('basement.srStay')}</span>
        )}
      </h2>
      <div
        className={`relative z-20 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          ctaOn ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        inert={!ctaOn}
      >
        <BookNightButton />
      </div>
    </div>
  )
}
