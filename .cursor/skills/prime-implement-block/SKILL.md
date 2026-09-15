---
name: prime-implement-block
description: >-
  Fleshes one candidate section (hero or section file) for Prime Warsaw; may
  install free React Bits from the local catalog. Use when the user asks for
  prime-implement-block, to deepen one section, or to pull a free React Bit.
disable-model-invocation: true
---

# prime-implement-block

Flesh **one** named section. Stop — do not scaffold siblings or jump to motion.

## Before you start

- Conventions: [`docs/IMPLEMENT.md`](../../../docs/IMPLEMENT.md) — especially **Visual placeholders**
- Free catalog (read first): [`docs/react-bits-free.md`](../../../docs/react-bits-free.md)
- Refuse `c00-dry-run`
- Ask which section if ambiguous (`hero` vs `zone-|scene-|strip-|panel-<kebab>`) — do **not** ask for assets
- Status should be ≥ `structure` (or ≥ `hero` if only deepening hero). Do not set `motion`

## Steps

1. **Target** — Open the one section file + CONCEPT (that beat’s line, Layout / Scroll grammar, Type, non-goals, palette).
2. **Deepen** — Composition + microcopy within CONCEPT. Mobile-first; wow > copy; no card grids / badge overlays unless CONCEPT requires interaction chrome.
   - Stay inside this candidate’s Layout / Scroll grammar — do **not** normalize to a default “title at bottom of gradient” chrome.
   - Enrich the visual with layered CSS / color-driven free Bits from **Palette cue**. Keep `data-placeholder="visual"` on the media swap target. Never ask for photos/video.
3. **Bits (optional)** — Only if CONCEPT names a Bit or the user asks:
   - Pick from [`docs/react-bits-free.md`](../../../docs/react-bits-free.md) — do **not** fetch remote `llms.txt` / `registry.json`
   - Install free only:
     `pnpm dlx shadcn@latest add @react-bits/<Name>-TS-TW --path src/shared/bits`
   - Prefer non-_(heavy)_ unless user accepts WebGL/three/ogl; note new deps in README
   - Never Pro (`@reactbits-pro`, `@reactbits-starter`, `pro.reactbits.dev`)
4. **Page** — Keep `index.tsx` scroll container; only adjust if the section’s export/API changed.
5. **Status** — Leave at least `structure` (or `hero` if only hero exists). Do not advance to `motion`.
6. **Verify** — `pnpm lint` and `pnpm build` stay green.
7. **Stop** — Summarize what changed in that one section.

## Hard limits

- One candidate, one section per run
- Free Bits only; never recommend Pro (compose custom + free Bits + GSAP instead)
- Never ask for assets; curate into `assets/` before any import; never import `instagram_ref/` directly
- No GSAP / `motion/` here (that’s `prime-wire-motion`)
- No CSS scroll-driven or keyframed Motion signature previews

## Done when

- The named section is visually richer (palette placeholders and/or free Bits) and still matches CONCEPT grammar + non-goals
- Any Bit used is free, under `src/shared/bits/`, and lint/build are green
