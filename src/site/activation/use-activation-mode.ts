import { useContext } from 'react'
import { ActivationContext } from './activation-context'

export function useActivationMode() {
  const value = useContext(ActivationContext)
  if (!value) throw new Error('useActivationMode must be used within ActivationProvider')
  return value
}
