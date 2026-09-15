---
name: prime-implement-structure
description: >-
  Scaffolds remaining section shells for a Prime Warsaw candidate from CONCEPT
  Structure and Scroll grammar (inert scroll skeleton + section files + page
  compose, status structure). Use when the user asks for
  prime-implement-structure or to scaffold candidate sections.
disable-model-invocation: true
---

# prime-implement-structure

Scaffold the **inert scroll skeleton** and section shells after hero exists. Stop — do not flesh sections, install Bits, or preview Motion signature.

## Before you start

- Conventions: [`docs/IMPLEMENT.md`](../../../docs/IMPLEMENT.md) — **Scroll skeleton**, **Visual placeholders**
- Require `sections/hero.tsx` and CONCEPT/registry status ≥ `hero`
- Refuse `c00-dry-run`
- Confirm target candidate; read CONCEPT **Scroll grammar** + Structure (ordered list). Note **Motion signature** only so you leave hooks for it — do **not** implement those effects.

## Steps

1. **Scroll skeleton** — Compose `index.tsx` as the **inert** container the Scroll grammar needs (sticky pin stage, horizontal track, tall scroll runway, resting split layout, vertical stack, etc.). Containers + `data-*` hooks only. Vertical `min-h` stack only if CONCEPT says so. See IMPLEMENT forbidden list (no `animation-timeline`, no scrub/preview transforms or clip-paths for Motion signature).
2. **Map sections** — Skip the Hero row. For each remaining Structure item → a section file named from the label + topology prefix (`zone-`, `scene-`, `strip-`, `panel-`, … per IMPLEMENT).
   - `Panorama` → `zone-panorama.tsx` (or `scene-panorama.tsx` if CONCEPT is scene-led)
   - `Hookah | bar` → `zone-hookah-bar.tsx`
3. **Shells** — Default export each section: landmark, short title, one supporting line from CONCEPT — layout within the shell follows Layout grammar / that beat, not a default “title at bottom of gradient.”
   - Atmosphere via CSS gradients / color planes from **Palette cue** + that beat’s one-liner (IMPLEMENT placeholders). `data-placeholder="visual"` on the swap target. Never ask for assets.
   - Resting composition only. No Bits, no `motion/`, no CSS motion previews of Motion signature.
4. **Compose** — Mount Hero then sections in Structure order inside the scroll container; keep hub Link.
5. **Status** — CONCEPT + `src/app/candidates.ts` → `structure`.
6. **Verify** — `pnpm lint` and `pnpm build` stay green.
7. **Stop** — Tell the user which sections and which scroll container were added. Wait for `prime-implement-block` / review unless running inside `prime-implement-candidate`.

## Hard limits

- One candidate only
- No React Bits in this skill
- No rewriting a finished hero beyond wiring it into the page container
- Never ask for assets; `instagram_ref/` moodboard only
- No GSAP / `motion/`; no CSS scroll-driven or keyframed Motion signature previews

## Done when

- Every non-hero Structure item has a section shell with palette-hinted placeholder visuals
- Page has an inert CONCEPT scroll skeleton (readable with motion off; not a forced default vertical list)
- Status is `structure`
