---
name: prime-polish
description: >-
  Polishes a Prime Warsaw candidate after motion (reduced-motion, a11y, cleanup;
  status ready). Use when the user asks for prime-polish, polish pass, or to
  make a candidate ready for promote.
disable-model-invocation: true
---

# prime-polish

Polish one candidate to **ready**. Stop before promote.

## Before you start

- Conventions: [`docs/MOTION.md`](../../../docs/MOTION.md) reduced-motion + teardown; [`docs/IMPLEMENT.md`](../../../docs/IMPLEMENT.md) if needed
- Require CONCEPT/registry status ≥ `motion`
- Refuse `c00-dry-run`
- Confirm target candidate

## Steps

1. **Reduced motion** — Confirm `prefersReducedMotion()` skips GSAP (or lands in a readable final state). No critical content hidden behind motion.
2. **Teardown** — No leaked ScrollTriggers / tweens outside `useGSAP` cleanup. Kill any orphan globals.
3. **A11y basics** — Landmarks, focusable CTAs, readable contrast on text/CTAs; keyboard can reach primary actions.
4. **Cleanup** — Unused imports, dead stubs, leftover concept chrome. Strip any leftover CSS Motion signature previews (`animation-timeline`, dual CSS+GSAP gates) if still present. Hub Link should prefer `/lab` so it still works after promote.
5. **Do not** invent new sections, Bits, or scroll grammar — fix breakage only.
6. **Status** — CONCEPT + `src/app/candidates.ts` → `ready`.
7. **Verify** — `pnpm lint` and `pnpm build` stay green.
8. **Stop** — Hub link `/c/<id>-<slug>`. Wait for `prime-promote` unless asked.

## Hard limits

- One candidate only
- No asset asks; no Pro Bits
- No promote / router champion changes here

## Done when

- Motion is safe under reduced-motion; page is cleaned up
- Status is `ready`
