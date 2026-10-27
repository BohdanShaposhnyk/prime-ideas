import type { ReactNode } from 'react'
import { BOOKING_URL } from '../lib/booking'
import { t, type StringKey } from './translate'

const TOKEN = /<em>([\s\S]*?)<\/em>|<booking>([\s\S]*?)<\/booking>/g

const bookingClass =
  'text-[var(--cs-gold)] underline decoration-white/25 underline-offset-2 hover:decoration-[var(--cs-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cs-ice)]'

function renderRich(source: string): ReactNode {
  const nodes: ReactNode[] = []
  let last = 0
  let index = 0
  for (const match of source.matchAll(TOKEN)) {
    const start = match.index
    if (start > last) nodes.push(source.slice(last, start))
    if (match[1] != null) {
      nodes.push(
        <span key={index} className="text-[var(--cs-gold)]">
          {match[1]}
        </span>,
      )
    } else {
      nodes.push(
        <a
          key={index}
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={bookingClass}
        >
          {match[2]}
        </a>,
      )
    }
    last = start + match[0].length
    index += 1
  }
  if (last < source.length) nodes.push(source.slice(last))
  if (nodes.length === 0) return source
  if (nodes.length === 1) return nodes[0]
  return nodes
}

type Vars = Record<string, string | number>

export function rich<K extends StringKey>(key: K, vars?: Vars): ReactNode {
  return renderRich(t(key, vars))
}
