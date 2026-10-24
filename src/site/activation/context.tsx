import { useMemo, useState, type ReactNode } from 'react'
import { ActivationContext, type ActivationContextValue } from './activation-context'
import { readActivationMode, writeActivationMode } from './mode'

export function ActivationProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState(readActivationMode)

  const value = useMemo<ActivationContextValue>(
    () => ({
      mode,
      setMode: (next) => {
        writeActivationMode(next)
        setModeState(next)
      },
    }),
    [mode],
  )

  return <ActivationContext.Provider value={value}>{children}</ActivationContext.Provider>
}
