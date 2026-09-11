# Agent flow — candidate lab

Milestones build **machinery**. Concrete landings are **outputs of running skills**, not milestone deliverables.

## Mental model
Invent isolated **candidates**. Each has a lean `CONCEPT.md` contract. Grow them in stages via skills you trigger deliberately.

## Lifecycle

```
concept → hero → structure → motion → polish → ready → champion | archived
```

Skills are additive and re-runnable. Stop after any stage.

1. Trigger **concept** → review/edit `CONCEPT.md`
2. Trigger **hero** → preview via hub
3. Trigger **structure** (then **block** per section if needed)
4. Trigger **motion** → **polish**
5. **Promote** winner, or archive / spawn a new concept

## Candidate folder

```
src/visions/candidates/<id>-<slug>/
  CONCEPT.md      # required contract
  index.tsx       # route entry
  sections/       # hero.tsx, zone-*.tsx, …
  motion/         # GSAP / scroll wiring (late)
  assets/         # candidate-local media only if needed
```

Route: `/c/<id>-<slug>` (dynamic — one `/c/$candidateKey` route loads `candidates/<id>-<slug>/index.tsx` via glob; do not edit the router per candidate). Champion later aliases to `/` without deleting the folder.

Register every candidate in `src/app/candidates.ts` (hub reads this).

## CONCEPT.md (lean)

Template: [`docs/templates/CONCEPT.md`](./templates/CONCEPT.md). Checklist: [`docs/templates/CONCEPT_CHECKLIST.md`](./templates/CONCEPT_CHECKLIST.md). No essays.

| Field | Intent |
|-------|--------|
| id / slug / title | Identity |
| thesis | One-sentence vibe hook |
| mood | 3–6 keywords |
| hero | Composition + 1–2 microcopy phrases |
| structure | Ordered sections; one line each |
| motion signature | 2–3 effects (GSAP vs Bits if known) |
| type | Display vs body intent |
| palette cue | Dark base + warm/cool accents |
| non-goals | What this candidate will *not* do |
| status | Lifecycle stage |
| refs | Optional `instagram_ref/` or IG pointers |

## Skill map (built in M1+)

| Skill | When | Output |
|-------|------|--------|
| `prime-concept` | New concept / candidate | Folder + CONCEPT + registry + stub route |
| `prime-implement-hero` | Implement hero for cXX | `sections/hero.tsx`; status ≥ `hero` |
| `prime-implement-structure` | Scaffold zones | Section shells + page; status ≥ `structure` |
| `prime-implement-block` | Flesh one section | One section (may pull React Bits) |
| `prime-wire-motion` | Transitions / motion | `motion/` + GSAP; status ≥ `motion` |
| `prime-polish` | Polish candidate | Reduced-motion, cleanup; status `ready` |
| `prime-promote` | Make champion | Hub/champion wiring; status `champion` |

Skills live under `.cursor/skills/` (project). Rules under `.cursor/rules/` (M1+).

## Hard rules for skills
- Mobile-first; wow > copy; English microcopy only
- Edit only the active candidate unless asked
- Leave `pnpm lint` + `pnpm build` green
- Pull React Bits only when named in concept or explicitly asked
