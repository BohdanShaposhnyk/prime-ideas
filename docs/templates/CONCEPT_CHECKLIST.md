# CONCEPT checklist

Validate before finishing `prime-concept` (or any CONCEPT edit). No Zod — conventions only.

## Required

- [ ] Title line: `# CONCEPT — …`
- [ ] Identity bullets: `id`, `slug`, `title`, `status`
- [ ] Sections: Thesis, Mood, Hero, Structure, Motion signature, Type, Palette cue, Non-goals
- [ ] Refs optional
- [ ] `status` ∈ `concept | hero | structure | motion | polish | ready | champion | archived`
- [ ] Folder `src/visions/candidates/<id>-<slug>/` matches CONCEPT `id` + `slug`
- [ ] Registry row in `src/app/candidates.ts` matches the same `id`, `slug`, `title`, `status`

## Lean

- Thesis = one sentence
- Mood = 3–6 keywords
- Hero phrases = 1–2 short English lines
- Structure = ordered one-liners
- No essays

Blank: [`CONCEPT.md`](./CONCEPT.md)
