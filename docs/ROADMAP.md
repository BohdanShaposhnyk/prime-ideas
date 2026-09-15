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

## M2 — Implement skills (done)
- `prime-implement-hero`
- `prime-implement-structure`
- `prime-implement-block`
- `prime-implement-candidate` (fast path: hero + structure + light deepen)
- Conventions: `docs/IMPLEMENT.md` (incl. CSS palette placeholders — never ask for assets) + free catalog `docs/react-bits-free.md`
- Free `@react-bits` registry in `components.json` (never Pro)

## M3 — Motion & promote (done)
- `prime-wire-motion`, `prime-polish`, `prime-promote`, `prime-build-candidate`
- `prefers-reduced-motion` + GSAP teardown conventions (`docs/MOTION.md`, `@/shared/lib/gsap`, `@/shared/lib/motion`)
- Champion wiring: `/` shows champion when one exists; hub at `/lab`

## M4 — Ship path
- Production polish on champion `/` (meta/OG, deploy)
- CTA wiring (Instagram / Telegram)

## Motion / UI stack notes
- **GSAP** + `@gsap/react` for timelines and scroll
- **React Bits (free only)** on demand via `@react-bits` → `src/shared/bits/` (or candidate-local if one-off). Catalog: `docs/react-bits-free.md`. Never Pro.
- **shadcn** for mundane UI chrome
