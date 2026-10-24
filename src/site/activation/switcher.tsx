import { useActivationMode } from './use-activation-mode'
import { ACTIVATION_MODES, type ActivationMode } from './mode'

const LABELS: Record<ActivationMode, string> = {
  caption: 'Under each button',
  strip: 'Bottom banner',
}

/** Temporary hero control. Sits under the header and does not ride the copy fade. */
export function ActivationSwitcher() {
  const { mode, setMode } = useActivationMode()

  return (
    <div
      role="group"
      aria-label="Activation hint"
      className="pointer-events-auto absolute left-1/2 z-30 flex -translate-x-1/2 rounded-full border border-[color-mix(in_srgb,var(--cs-ice)_22%,transparent)] bg-black/55 p-0.5 backdrop-blur-md"
      style={{ top: 'calc(var(--cs-header-h) + 0.35rem)' }}
    >
      {ACTIVATION_MODES.map((option) => {
        const selected = option === mode
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            className={`rounded-full px-2.5 py-1 font-[family-name:var(--cs-body)] text-[0.62rem] leading-none tracking-[0.04em] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cs-ice)] ${
              selected ? 'bg-[var(--cs-ice)] text-[var(--cs-pitch)]' : 'text-[var(--cs-ice)]'
            }`}
            onClick={() => setMode(option)}
          >
            {LABELS[option]}
          </button>
        )
      })}
    </div>
  )
}
