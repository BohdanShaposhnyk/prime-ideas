---
name: prime-concept
description: >-
  Scaffolds a Prime Warsaw landing candidate (folder, CONCEPT.md, registry,
  stub route). Use when inventing a new concept/candidate or when the user
  asks for prime-concept / a new candidate.
disable-model-invocation: true
---

# prime-concept

Scaffold one candidate. Stop after CONCEPT + stub — do **not** implement hero.

## Before you start

- Read [`docs/AGENT_FLOW.md`](../../../docs/AGENT_FLOW.md) only if lifecycle is unclear.
- Blank: [`docs/templates/CONCEPT.md`](../../../docs/templates/CONCEPT.md)
- Validate with: [`docs/templates/CONCEPT_CHECKLIST.md`](../../../docs/templates/CONCEPT_CHECKLIST.md)
- Helpers: `nextCandidateId`, `candidateKey` in `src/app/candidates.ts`
- Do **not** edit the router — `/c/$candidateKey` loads folders via glob

## Steps

1. **Brief** — Ask only for missing title / thesis / mood. If the user already gave a brief, invent the rest leanly; don’t interview.
2. **Identity** — `id = nextCandidateId()`, `slug` from title (kebab-case). Folder + route key = `{id}-{slug}`.
3. **Folder** — Create:
   ```
   src/visions/candidates/<id>-<slug>/
     CONCEPT.md
     index.tsx          # default export stub page
     sections/.gitkeep
   ```
4. **CONCEPT.md** — Fill from the blank template. `status: concept`. English microcopy only. No essays.
5. **Stub `index.tsx`** — Minimal page: id, title, thesis one-liner, Link back to `/`. No hero visuals.
6. **Registry** — Append to `candidates` in `src/app/candidates.ts`:
   `{ id, slug, title, status: 'concept', thesis }`
7. **Checklist** — Run [`CONCEPT_CHECKLIST.md`](../../../docs/templates/CONCEPT_CHECKLIST.md); fix gaps.
8. **Verify** — `pnpm lint` and `pnpm build` stay green.
9. **Stop** — Tell the user the hub link (`/c/<id>-<slug>`) and wait for CONCEPT review. Do not run hero/structure skills unless asked.

## Hard limits

- One candidate only; never touch sibling candidate folders
- No new global deps; no React Bits unless the concept already names them (still don’t install here)
- `instagram_ref/` is moodboard only — reference paths in Refs, don’t import

## Done when

- Hub lists the candidate; `/c/<id>-<slug>` renders the stub
- CONCEPT passes the checklist
- Human can edit CONCEPT before any implement skill
