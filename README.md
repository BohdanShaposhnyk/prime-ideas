# Prime Warsaw — Candidate Lab

Vision lab for inventing and growing landing-page candidates for [Prime Warsaw](https://www.instagram.com/prime_warsaw/).

## Stack
Vite · React · TypeScript · TanStack Router · Tailwind · shadcn/ui · GSAP · pnpm

React Bits (free only): install on demand via shadcn CLI into `src/shared/bits/`. See [IMPLEMENT.md](docs/IMPLEMENT.md) and [react-bits-free.md](docs/react-bits-free.md).

Candidate fonts (scoped per vision): `@fontsource/archivo-black`, `@fontsource/manrope` (c03 Blade Night); `@fontsource/teko`, `@fontsource/karla` (c04 Film Gate); `@fontsource/space-grotesk`, `@fontsource/ibm-plex-sans` (c05 Smoke Line); `@fontsource/unbounded`, `@fontsource/figtree` (c06 Glass Cap).

## Commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

## Docs
- [Overview](docs/OVERVIEW.md)
- [Agent flow](docs/AGENT_FLOW.md)
- [Implement conventions](docs/IMPLEMENT.md)
- [Free React Bits catalog](docs/react-bits-free.md)
- [Roadmap](docs/ROADMAP.md)
- [Agent etiquette](docs/AGENT_ETIQUETTE.md)
- [CONCEPT template](docs/templates/CONCEPT.md)

## Layout
- `src/visions/hub` — candidate index (`/`)
- `src/visions/_template` — copy target (`/v/_template`)
- `src/visions/candidates` — real candidates (M1+)
- `src/shared/ui` — shadcn
- `src/shared/bits` — React Bits (empty until pulled)
- `.cursor/skills` — project skills (M1+)

`instagram_ref/` is moodboard only.
