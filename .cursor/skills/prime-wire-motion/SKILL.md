---
name: prime-wire-motion
description: >-
  Wires GSAP / ScrollTrigger motion for a Prime Warsaw candidate from CONCEPT
  Motion signature (motion/ folder, status motion). Use when the user asks for
  prime-wire-motion, motion wiring, scroll timelines, or to animate a candidate.
disable-model-invocation: true
---

# prime-wire-motion

Add **GSAP motion** from CONCEPT **Motion signature** (source of truth for effects). Stop before polish/promote.

## Before you start

- Conventions: [`docs/MOTION.md`](../../../docs/MOTION.md) (required), [`docs/IMPLEMENT.md`](../../../docs/IMPLEMENT.md) if hooks/layout unclear
- Require CONCEPT/registry status ≥ `structure` and a composed page with scroll containers
- Refuse `c00-dry-run`
- Confirm target candidate; read **Motion signature**, **Scroll grammar**, Non-goals first — then inspect the page for hooks. Do not let implement CSS redefine the signature.

## Steps

1. **Contract** — Realize 2–3 effects from Motion signature that reinforce Scroll grammar (not decorative noise). CONCEPT wins over any CSS motion stub on the page.
2. **Strip previews** — If implement left scroll-driven CSS (`animation-timeline`, scrub keyframes, fake from→to clip/scale/opacity), remove those and own the behavior in `motion/` only. No dual CSS+GSAP path.
3. **Shared imports** — Use `@/shared/lib/gsap` (`gsap`, `useGSAP`, `ScrollTrigger`) and `@/shared/lib/motion` (`prefersReducedMotion`). Never import raw `gsap` / `@gsap/react` in the candidate.
4. **Write** `motion/` — e.g. `motion/index.ts` exporting `useCandidateMotion(scopeRef)` (optional split files per beat). Inside `useGSAP`:
   - If `prefersReducedMotion()`, return early (layout stays readable)
   - Create timelines / ScrollTriggers **scoped** to the page root
   - Rely on `useGSAP` context cleanup; if anything is created outside it, kill ScrollTriggers on teardown
5. **Hooks / compose** — Prefer existing `data-*` hooks; add or adjust planes/hooks when the signature needs them. Keep scroll **containers** (pin stages, tracks, section order) unless a minimal structural fix is required — then change only what is needed. Call the hook from candidate `index.tsx` with a ref on the scroll container.
6. **Status** — CONCEPT + `src/app/candidates.ts` → `motion`.
7. **Verify** — `pnpm lint` and `pnpm build` stay green.
8. **Stop** — Summarize effects + hub link `/c/<id>-<slug>`. Do not run polish/promote unless asked (or unless inside `prime-build-candidate`, which still stops after this stage).

## Hard limits

- One candidate only; never touch siblings
- No Bits or asset asks; no new global deps without a README note
- Do not invent a parallel CSS motion system alongside GSAP
- Motion must not be required to understand content

## Done when

- `motion/` realizes Motion signature (2–3 intentional effects); no leftover CSS motion previews of those effects
- Reduced-motion path skips timelines
- Status is `motion`
