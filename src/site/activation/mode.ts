export const ACTIVATION_MODES = ['caption', 'strip'] as const

export type ActivationMode = (typeof ACTIVATION_MODES)[number]

export const ACTIVATION_STORAGE_KEY = 'prime.activationHint'

const DEFAULT_MODE: ActivationMode = 'caption'

export function isActivationMode(value: string | null): value is ActivationMode {
  return value === 'caption' || value === 'strip'
}

export function readActivationMode(): ActivationMode {
  try {
    const stored = localStorage.getItem(ACTIVATION_STORAGE_KEY)
    if (isActivationMode(stored)) return stored
  } catch {
    // Private browsing can throw on storage access.
  }
  return DEFAULT_MODE
}

export function writeActivationMode(mode: ActivationMode) {
  try {
    localStorage.setItem(ACTIVATION_STORAGE_KEY, mode)
  } catch {
    // The in-memory choice still applies for this visit.
  }
}
