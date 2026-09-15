import { useSyncExternalStore } from 'react'
import {
  candidateKey,
  isRegistryArchived,
  type CandidateMeta,
} from '@/app/candidates'

const STORAGE_KEY = 'prime-lab:archived-keys'

function readKeys(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((k): k is string => typeof k === 'string')
  } catch {
    return []
  }
}

function writeKeys(keys: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(keys))
  window.dispatchEvent(new Event('prime-lab:archived-keys'))
}

function subscribe(onStoreChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) onStoreChange()
  }
  window.addEventListener('storage', onStorage)
  window.addEventListener('prime-lab:archived-keys', onStoreChange)
  return () => {
    window.removeEventListener('storage', onStorage)
    window.removeEventListener('prime-lab:archived-keys', onStoreChange)
  }
}

function getSnapshot() {
  return JSON.stringify(readKeys())
}

function getServerSnapshot() {
  return '[]'
}

export function isLocallyArchived(key: string, localKeys: readonly string[]) {
  return localKeys.includes(key)
}

export function isEffectivelyArchived(
  c: Pick<CandidateMeta, 'id' | 'slug' | 'status'>,
  localKeys: readonly string[],
) {
  return isRegistryArchived(c) || isLocallyArchived(candidateKey(c), localKeys)
}

export function useArchivedKeys() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const archivedKeys = JSON.parse(snapshot) as string[]

  function isArchived(key: string) {
    return archivedKeys.includes(key)
  }

  function archive(key: string) {
    const next = readKeys()
    if (next.includes(key)) return
    writeKeys([...next, key])
  }

  function unarchive(key: string) {
    writeKeys(readKeys().filter((k) => k !== key))
  }

  function toggle(key: string) {
    const next = readKeys()
    writeKeys(
      next.includes(key) ? next.filter((k) => k !== key) : [...next, key],
    )
  }

  return { archivedKeys, isArchived, archive, unarchive, toggle }
}
