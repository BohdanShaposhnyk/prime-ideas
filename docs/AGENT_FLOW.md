# Agent flow — candidate lab

Milestones build **machinery**. Concrete landings are **outputs of running skills**, not milestone deliverables.

## Mental model
Invent isolated **candidates**. Each has a lean `CONCEPT.md` contract. Grow them in stages via skills you trigger deliberately.

Invent each candidate **freely** on structural axes — not as a recolor of a default stack. Primary creative axes (in order): **Scroll grammar → Layout grammar → Type pairing → Section topology**. Palette is last. No sibling inventory, no banned-pattern ledger — do not grow “already used” lists as candidates accumulate.

## Lifecycle

```
concept → hero → structure → motion → polish → ready → champion | archived
```

Skills are additive and re-runnable. Stop after any stage.

**Staged (default):**

1. Trigger **concept** → optional edit of `CONCEPT.md`
2. Trigger **hero** → preview via hub
3. Trigger **structure** (then **block** per section if needed)
4. Trigger **motion** → **polish**
5. **Promote** winner, or archive / spawn a new concept

**Fast path:** Trigger **`prime-implement-candidate`** (after concept, or invent+implement in one ask) → hero + section shells + light deepen in one pass, status `structure`. Builds the CONCEPT’s scroll skeleton (CSS first) with palette placeholders — never asks for assets. Still stop before motion.

## Candidate folder

```
src/visions/candidates/<id>-<slug>/
  CONCEPT.md      # required contract
  index.tsx       # route entry / scroll container
  sections/       # hero.tsx, zone-|scene-|strip-|panel-*.tsx, …
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
| scroll grammar | Primary scroll mechanic (one line) |
| layout grammar | How brand / type / media sit (one line) |
| hero | Composition + 1–2 microcopy phrases |
| structure | Ordered beats that fit the scroll grammar |
| motion signature | 2–3 effects that amplify the scroll grammar |
| type | Named display + body families; scale / placement |
| palette cue | Concrete colors / temperature for CSS planes |
| non-goals | What this candidate will *not* do |
| status | Lifecycle stage |
| refs | Optional `instagram_ref/` or IG pointers |

## Skill map (built in M1+)

| Skill | When | Output |
|-------|------|--------|
| `prime-concept` | New concept / candidate | Folder + CONCEPT + registry + stub route |
| `prime-implement-hero` | Implement hero for cXX | `sections/hero.tsx`; status ≥ `hero` |
| `prime-implement-structure` | Scaffold sections | Scroll skeleton + shells + page; status ≥ `structure` |
| `prime-implement-block` | Flesh one section | One section (may pull React Bits) |
| `prime-implement-candidate` | Fast path: full implement | Hero + sections + light deepen; status `structure` |
| `prime-wire-motion` | Transitions / motion | `motion/` + GSAP; status ≥ `motion` |
| `prime-polish` | Polish candidate | Reduced-motion, cleanup; status `ready` |
| `prime-promote` | Make champion | Hub/champion wiring; status `champion` |

Skills live under `.cursor/skills/` (project). Rules under `.cursor/rules/` (M1+).

## Implement conventions

Section file layout, **scroll skeleton** (CSS first from Scroll grammar), **visual placeholders** (CSS from Palette cue — never ask for assets), per-candidate type, and free-only React Bits: [`docs/IMPLEMENT.md`](./IMPLEMENT.md).  
Free Bits catalog (token-cheap; read before remote): [`docs/react-bits-free.md`](./react-bits-free.md).

## Hard rules for skills
- Mobile-first; wow > copy; English microcopy only
- Edit only the active candidate unless asked
- Leave `pnpm lint` + `pnpm build` green
- Never ask for image/video assets; use palette CSS placeholders until curated `assets/`
- Pull React Bits only when named in concept or explicitly asked — **free `@react-bits` only**, never Pro
