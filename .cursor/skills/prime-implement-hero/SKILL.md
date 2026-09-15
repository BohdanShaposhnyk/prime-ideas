---
name: prime-implement-hero
description: >-
  Implements the hero section for a Prime Warsaw candidate from CONCEPT.md
  (sections/hero.tsx, page compose, status hero). Use when the user asks for
  prime-implement-hero, hero implementation, or to build the candidate hero.
disable-model-invocation: true
---

# prime-implement-hero

Implement **only** the hero for one candidate. Stop — do not scaffold other sections or wire GSAP timelines.

## Before you start

- Conventions: [`docs/IMPLEMENT.md`](../../../docs/IMPLEMENT.md) — **Visual placeholders**, **Per-candidate type**, Layout grammar
- Lifecycle: [`docs/AGENT_FLOW.md`](../../../docs/AGENT_FLOW.md) only if unclear
- Refuse `c00-dry-run` (non-landing fixture)
- Confirm target candidate (id/slug). Read CONCEPT: Hero, Layout grammar, Type, Palette, Non-goals, Mood

## Steps

1. **Contract** — Hero composition + 1–2 phrases from CONCEPT. English microcopy only. Placement and hierarchy follow **Layout grammar** + **Type** (not a fixed bottom-left brand + dual-CTA recipe).
2. **Type** — Scope display + body fonts from CONCEPT Type on the candidate root (see IMPLEMENT). Note new font packages in README.
3. **Write** `sections/hero.tsx` — default export. Brand-first, mobile-first.
   - Hero budget (quality rail): brand, one headline, one short supporting line, one CTA group, one dominant visual plane — **where** they sit comes from Layout grammar
   - Dominant plane = CSS gradient / layered color planes from **Palette cue** + Mood (see IMPLEMENT placeholders). Never ask for assets; use `data-placeholder="visual"` on the swap target
   - No detached badges / promo chips / stat strips on media
   - Leave semantic hooks for later scroll skeleton / GSAP (no timelines, no CSS Motion signature previews)
4. **Compose** `index.tsx` — render Hero + Link back to `/`. Remove the concept stub layout. Do not assume a final vertical stack if Structure will own a different container.
5. **Status** — Set CONCEPT `status: hero` and matching entry in `src/app/candidates.ts`.
6. **Bits** — Only if CONCEPT Hero already names a **free** Bit. Read [`docs/react-bits-free.md`](../../../docs/react-bits-free.md); install via `@react-bits` into `src/shared/bits/`. Never Pro.
7. **Verify** — `pnpm lint` and `pnpm build` stay green.
8. **Stop** — Hub link `/c/<id>-<slug>`. Do not run structure/block unless asked (or unless running inside `prime-implement-candidate`).

## Hard limits

- One candidate only; never touch siblings
- Free React Bits only (`@react-bits`); never `@reactbits-pro` / `@reactbits-starter` / `pro.reactbits.dev`
- Never ask for image/video assets; no importing `instagram_ref/` — CSS placeholders until curated `assets/`
- No new global deps without a README note

## Done when

- `/c/<id>-<slug>` shows a real hero (not the concept stub) shaped by Layout grammar + Type, with a palette-driven visual plane
- CONCEPT + registry status are `hero`
- No other section files added unless they already existed
