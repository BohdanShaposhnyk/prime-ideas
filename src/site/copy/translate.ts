import catalog from './en.json' with { type: 'json' }

export type Catalog = typeof catalog

type Vars = Record<string, string | number>

type StringPath<T, P extends string = ''> = T extends string
  ? P
  : T extends readonly unknown[]
    ? never
    : T extends object
      ? {
          [K in keyof T & string]: StringPath<T[K], P extends '' ? K : `${P}.${K}`>
        }[keyof T & string]
      : never

type CopyPath<T, P extends string = ''> = T extends string | number | boolean
  ? P
  : T extends readonly unknown[]
    ? P
    : T extends object
      ? {
          [K in keyof T & string]:
            | (P extends '' ? K : `${P}.${K}`)
            | CopyPath<T[K], P extends '' ? K : `${P}.${K}`>
        }[keyof T & string]
      : never

type ValueAt<T, P extends string> = P extends `${infer Head}.${infer Rest}`
  ? Head extends keyof T
    ? ValueAt<T[Head], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never

export type StringKey = StringPath<Catalog>
export type CopyKey = CopyPath<Catalog>

type QuestionNode = { q: string; a: string }

export type QuestionId = {
  [K in keyof Catalog['questions']]: Catalog['questions'][K] extends QuestionNode ? K : never
}[keyof Catalog['questions']]

const PLACEHOLDER = /\{(\w+)\}/g

const facts: Record<string, string> = {}
for (const [key, value] of Object.entries(catalog.facts)) {
  if (typeof value === 'string') facts[key] = value
}

function lookup(key: string): unknown {
  const parts = key.split('.')
  let node: unknown = catalog
  for (const part of parts) {
    if (!node || typeof node !== 'object' || !Object.hasOwn(node, part)) {
      throw new Error(`Missing copy key "${key}"`)
    }
    node = (node as Record<string, unknown>)[part]
  }
  return node
}

function fill(template: string, vars: Vars | undefined): string {
  const scope: Vars = { ...facts, ...vars }
  return template.replace(PLACEHOLDER, (_raw, name: string) => {
    const value = scope[name]
    if (value == null) throw new Error(`Missing placeholder {${name}} in "${template}"`)
    return String(value)
  })
}

function materialize(value: unknown, vars: Vars | undefined): unknown {
  if (typeof value === 'string') return fill(value, vars)
  if (Array.isArray(value)) return value.map((item) => materialize(item, vars))
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [key, item] of Object.entries(value)) out[key] = materialize(item, vars)
    return out
  }
  return value
}

export function t<K extends CopyKey>(key: K, vars?: Vars): ValueAt<Catalog, K> {
  return materialize(lookup(key), vars) as ValueAt<Catalog, K>
}

function isQuestionId(key: keyof Catalog['questions']): key is QuestionId {
  const value = catalog.questions[key]
  return typeof value === 'object' && value !== null && 'q' in value
}

/** Question rows in catalog order. Title and support stay beside them. */
export const questionIds = (Object.keys(catalog.questions) as (keyof Catalog['questions'])[]).filter(isQuestionId)

/** Throw when an order list and a keyed record drift apart. */
export function orderedIds<Id extends string>(order: readonly string[], ids: readonly Id[], label: string): Id[] {
  const expected = new Set<string>(ids)
  if (order.length !== expected.size || order.some((id) => !expected.has(id))) {
    throw new Error(`${label} order does not match its records`)
  }
  return order as Id[]
}
