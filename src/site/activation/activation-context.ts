import { createContext } from 'react'
import type { ActivationMode } from './mode'

export type ActivationContextValue = {
  mode: ActivationMode
  setMode: (mode: ActivationMode) => void
}

export const ActivationContext = createContext<ActivationContextValue | null>(null)
