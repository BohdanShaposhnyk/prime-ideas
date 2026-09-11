# Roadmap — infra & skills

Concrete landings are **outputs of running skills**, not milestone deliverables.

```
M0 App scaffold → M1 Concept infra → M2 Implement skills → M3 Motion & promote → M4 Ship path
```

## M0 — App scaffold (done when acceptance passes)
Toolchain (Vite, React, TS, TanStack Router, Tailwind, shadcn, GSAP, pnpm, lint), hub, `_template`, CONCEPT template, etiquette, AGENT_FLOW, this roadmap. **No Cursor skills yet.**

## M1 — Concept infra (done)
- Project rules (`.cursor/rules`) — slim always-on `prime-lab`
- `prime-concept` skill (on-demand)
- Candidate registry helpers; hub lists real candidates (`c00-dry-run`)
- CONCEPT schema validation conventions (`docs/templates/CONCEPT_CHECKLIST.md`)
- Dry-run concept folder (still not “the” landing)

## M2 — Implement skills
- `prime-implement-hero`
- `prime-implement-structure`
- `prime-implement-block`
- Conventions for React Bits install path (`src/shared/bits/`) and section file layout

## M3 — Motion & promote
- `prime-wire-motion`, `prime-polish`, `prime-promote`
- `prefers-reduced-motion` + GSAP teardown conventions

## M4 — Ship path
- Champion → production `/`
- Meta/OG, deploy target
- CTA wiring (Instagram / Telegram)

## Motion / UI stack notes
- **GSAP** + `@gsap/react` for timelines and scroll
- **React Bits** on demand via shadcn-compatible CLI → `src/shared/bits/` (or candidate-local if one-off)
- **shadcn** for mundane UI chrome
