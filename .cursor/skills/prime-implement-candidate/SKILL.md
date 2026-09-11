---
name: prime-implement-candidate
description: >-
  Fast path: implement a Prime Warsaw candidate in one pass (hero + scroll
  skeleton + section shells + light visual deepen) using CSS palette
  placeholders — no asset asks. Use when the user asks for
  prime-implement-candidate, “implement this candidate”, invent+build, or a
  full implement without staged review.
disable-model-invocation: true
---

# prime-implement-candidate

One-shot implement for a single candidate: **hero → structure (scroll skeleton) → light block pass**.
Stop before motion/polish/promote.

## Before you start

- Conventions: [`docs/IMPLEMENT.md`](../../../docs/IMPLEMENT.md) — **Scroll skeleton**, **Visual placeholders**, **Per-candidate type**
- Lifecycle: [`docs/AGENT_FLOW.md`](../../../docs/AGENT_FLOW.md) only if unclear
- Refuse `c00-dry-run`
- Target: existing candidate with CONCEPT, **or** run after / with `prime-concept` when the user asked invent + implement
- Read full CONCEPT (Scroll grammar, Layout grammar, Hero, Structure, Palette, Type, Non-goals, Mood)

## Steps

1. **Hero** — Follow [`prime-implement-hero`](../prime-implement-hero/SKILL.md) in full (write `sections/hero.tsx`, compose page, status `hero`). Use CSS gradient / layered planes from Palette cue; never ask for assets.
2. **Structure** — Follow [`prime-implement-structure`](../prime-implement-structure/SKILL.md) in full (scroll skeleton + all section shells, compose, status `structure`). Palette-hinted placeholders on each beat.
3. **Light deepen** — Without waiting for review, apply a **light** [`prime-implement-block`](../prime-implement-block/SKILL.md)-style pass to:
   - the **hero**, and
   - each section that would otherwise look like empty chrome
   Keep **one composition language within this candidate**; preserve the scroll skeleton. Do not install Bits unless CONCEPT already names a free Bit or the user asked. Prefer richer CSS planes over new deps.
4. **Status** — Leave CONCEPT + registry at `structure` (do not set `motion` / `ready`).
5. **Verify** — `pnpm lint` and `pnpm build` stay green.
6. **Stop** — Hub link `/c/<id>-<slug>`. Summarize scroll grammar + sections. Do **not** run motion/polish unless asked.

## Hard limits

- One candidate only; never touch siblings
- Never ask for image/video assets; never import `instagram_ref/` raw
- Free React Bits only if already in CONCEPT or explicitly requested
- No GSAP `motion/` package here — that is `prime-wire-motion`
- No new global deps without a README note

## Done when

- Page shows hero + all Structure beats inside the CONCEPT scroll skeleton, with palette-driven placeholder visuals
- Status is `structure`
- Agent did not pause for assets or mid-stage review
