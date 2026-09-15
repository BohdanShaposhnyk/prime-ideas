# Motion conventions — GSAP & reduced motion

Lean rules for `prime-wire-motion` / `prime-polish`. See also [`IMPLEMENT.md`](./IMPLEMENT.md) and [`AGENT_FLOW.md`](./AGENT_FLOW.md).

## Ownership

| Stage | Owns |
|-------|------|
| CONCEPT **Motion signature** + **Scroll grammar** | What moves and why (source of truth for effects) |
| Implement (`structure`) | Inert scroll containers, resting layout, `data-*` hooks — **no** motion preview ([`IMPLEMENT.md`](./IMPLEMENT.md)) |
| `prime-wire-motion` | GSAP timelines that realize Motion signature |

Do not treat implement CSS as a competing motion implementation. If a candidate still has scroll-driven CSS / fake from→to previews, **strip them** when wiring and put the behavior in `motion/`.

## Folder

```
src/visions/candidates/<id>-<slug>/
  index.tsx           # scroll container; mounts motion hook
  motion/
    index.ts          # useCandidateMotion(scopeRef) or similar
    # optional scene-*.ts when timelines split by beat
```

- Realize 2–3 Motion signature effects that reinforce Scroll grammar — no decorative noise
- Prefer existing `data-*` hooks; add or adjust hooks / planes when the signature needs them
- Keep implement scroll **containers** (pin stages, tracks, section order) unless a minimal structural fix is required to land the signature — then change only what is needed

## Imports

- GSAP: `@/shared/lib/gsap` (`gsap`, `useGSAP`, `ScrollTrigger`) — never raw `gsap` / `@gsap/react` in candidates
- Reduced motion: `@/shared/lib/motion` (`prefersReducedMotion`, optional `subscribeReducedMotion`)

## Wiring pattern

```tsx
// index.tsx (sketch)
const rootRef = useRef<HTMLElement>(null)
useCandidateMotion(rootRef)
return <main ref={rootRef} data-scroll="…">…</main>
```

```ts
// motion/index.ts (sketch)
import { useGSAP, gsap, ScrollTrigger } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'

export function useCandidateMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      // timelines / ScrollTriggers scoped to `scope`
    },
    { scope, dependencies: [] },
  )
}
```

`useGSAP` tears down tweens created in its callback when the scope unmounts. Prefer creating triggers inside that callback so cleanup is automatic.

## Teardown

- Prefer `useGSAP` context (default) over manual `gsap.context`
- If you create ScrollTriggers outside `useGSAP`, kill on unmount: `ScrollTrigger.getAll().forEach((t) => t.kill())`
- Do not leave global ScrollTriggers attached after leaving the candidate route

## Reduced motion

- If `prefersReducedMotion()`: **skip** timelines (or set final state instantly). Layout must remain readable without motion
- Do not rely on motion for critical content reveal
- `prime-polish` re-checks reduced-motion paths and focus/contrast

## Status gates

```
structure → (prime-wire-motion) → motion → (prime-polish) → ready → (prime-promote) → champion
```
