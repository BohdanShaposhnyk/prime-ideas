# Agent etiquette

Short rules for agents working in this repo.

1. Follow [`AGENT_FLOW.md`](./AGENT_FLOW.md). Treat each candidate’s `CONCEPT.md` as the contract.
2. **Mobile-first.** Wow-effect over copy. English microcopy only — catchy phrases, not paragraphs.
3. **One candidate at a time.** Never cross-edit sibling folders unless the user asks.
4. **Motion stack:** GSAP for timelines/scroll; React Bits on demand; shadcn for chrome. Don’t add a second animation framework without a reason and a README note.
5. **No new global deps** without noting them in the README.
6. Hub / shared chrome use shared tokens. **Candidates invent type, layout, and scroll per CONCEPT** — do not force every landing onto the global font stack. Still no parallel animation frameworks.
7. Keep sections lean. No content dumps or default card grids.
8. Leave the tree buildable: `pnpm lint` and `pnpm build` must stay clean.
9. `instagram_ref/` is moodboard only — don’t import it into the app unless curated into `src/assets` or a candidate `assets/`. Never ask for assets; use CSS/gradient placeholders from CONCEPT Palette cue until media is curated (see `docs/IMPLEMENT.md`).
10. Project skills live in `.cursor/skills/` (M1+). Don’t invent ad-hoc landing pipelines that skip the candidate contract. Prefer staged skills or `prime-implement-candidate` for a one-shot implement.
