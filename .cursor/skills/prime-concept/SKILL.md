---
name: prime-concept
description: >-
  Scaffolds a Prime Warsaw landing candidate (folder, CONCEPT.md, registry,
  stub route). Use when inventing a new concept/candidate or when the user
  asks for prime-concept / a new candidate.
disable-model-invocation: true
---

# prime-concept

Scaffold one candidate. Stop after CONCEPT + stub — do **not** implement hero
(unless the user also asked for `prime-implement-candidate` or an implement pass).

## Before you start

- Read [`docs/AGENT_FLOW.md`](../../../docs/AGENT_FLOW.md) only if lifecycle is unclear.
- Blank: [`docs/templates/CONCEPT.md`](../../../docs/templates/CONCEPT.md)
- Validate with: [`docs/templates/CONCEPT_CHECKLIST.md`](../../../docs/templates/CONCEPT_CHECKLIST.md)
- Helpers: `nextCandidateId`, `candidateKey` in `src/app/candidates.ts`
- Do **not** edit the router — `/c/$candidateKey` loads folders via glob

## Steps

1. **Brief**
   - **Invent freely** when the user says invent / full creative freedom / “go” with no brief, or gives only a loose vibe: invent **all** CONCEPT fields yourself. Do **not** ask for title, thesis, mood, or assets.
   - If the user already gave a brief, invent the rest leanly; don’t interview.
   - Ask only when a hard constraint is missing and inventing would break the request (e.g. they named a specific id/slug conflict). Prefer inventing over clarifying.
2. **Invent axes (order matters)** — Fill in this order; **palette last**:
   1. Scroll grammar (primary mechanic — invent freely; not limited to a fixed enum)
   2. Layout grammar (how brand / type / media sit)
   3. Type (named display + body families + scale / placement)
   4. Structure topology (beats that fit the scroll grammar — rooms, chapters, strips, panels, one long scene, etc.)
   5. Hero composition + phrases, Motion signature (amplify scroll grammar), Mood, Thesis
   6. Palette cue (concrete colors for CSS planes)
   - Do **not** skim siblings to ban their choices. Do **not** maintain or append “already used” lists. Random overlap is fine.
3. **Identity** — `id = nextCandidateId()`, `slug` from title (kebab-case). Folder + route key = `{id}-{slug}`.
4. **Folder** — Create:
   ```
   src/visions/candidates/<id>-<slug>/
     CONCEPT.md
     index.tsx          # default export stub page
     sections/.gitkeep
   ```
5. **CONCEPT.md** — Fill from the blank template. `status: concept`. English microcopy only. No essays. Make **Palette cue** concrete enough that implement skills can build CSS gradient planes without photos.
6. **Stub `index.tsx`** — Minimal page: id, title, thesis one-liner, Link back to `/`. No hero visuals.
7. **Registry** — Append to `candidates` in `src/app/candidates.ts`:
   `{ id, slug, title, status: 'concept', thesis }`
8. **Checklist** — Run [`CONCEPT_CHECKLIST.md`](../../../docs/templates/CONCEPT_CHECKLIST.md); fix gaps.
9. **Verify** — `pnpm lint` and `pnpm build` stay green.
10. **Stop** — Hub link (`/c/<id>-<slug>`). Do **not** auto-run hero/structure unless the user asked for implement / `prime-implement-candidate`. Default: leave CONCEPT for optional human edit; if they said invent + implement in one go, continue into that skill.

## Hard limits

- One candidate only; never touch sibling candidate folders
- No new global deps; no React Bits unless the concept already names them (still don’t install here)
- `instagram_ref/` is moodboard only — reference paths in Refs, don’t import
- Never ask the user for image/video assets
- Creative hygiene only — no ban-lists, no sibling exclusion

## Done when

- Hub lists the candidate; `/c/<id>-<slug>` renders the stub
- CONCEPT passes the checklist (Scroll / Layout / Type concrete)
- Agent did not block on missing media or a review gate unless the user asked to wait
