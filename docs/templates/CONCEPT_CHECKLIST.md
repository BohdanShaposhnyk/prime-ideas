# CONCEPT checklist

Validate before finishing `prime-concept` (or any CONCEPT edit). No Zod — conventions only.

## Required

- [ ] Title line: `# CONCEPT — …`
- [ ] Identity bullets: `id`, `slug`, `title`, `status`
- [ ] Sections: Thesis, Mood, Scroll grammar, Layout grammar, Hero, Structure, Motion signature, Type, Palette cue, Non-goals
- [ ] Refs optional
- [ ] `status` ∈ `concept | hero | structure | motion | polish | ready | champion | archived`
- [ ] Folder `src/visions/candidates/<id>-<slug>/` matches CONCEPT `id` + `slug`
- [ ] Registry row in `src/app/candidates.ts` matches the same `id`, `slug`, `title`, `status`

## Lean / concrete

- Thesis = one sentence
- Mood = 3–6 keywords
- Scroll grammar = one line naming a real mechanic (not “scroll” / “nice motion”)
- Layout grammar = one line naming how brand / type / media sit
- Hero phrases = 1–2 short English lines
- Structure = ordered one-liners that fit the scroll grammar
- Motion signature = 2–3 effects that amplify scroll grammar; **owned by `prime-wire-motion`** — implement must not CSS-preview these
- Type = named display + body families (not “expressive sans”)
- Palette cue = concrete colors/temperature so implement can build CSS placeholders without assets
- No essays
- Do **not** require uniqueness vs siblings; random overlap is fine

Blank: [`CONCEPT.md`](./CONCEPT.md)
