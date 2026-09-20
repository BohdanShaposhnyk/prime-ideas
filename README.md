# Prime Warsaw — Candidate Lab

Vision lab for inventing and growing landing-page candidates for [Prime Warsaw](https://www.instagram.com/prime_warsaw/).

## Stack
Vite · React · TypeScript · TanStack Router · Tailwind · shadcn/ui · GSAP · pnpm

React Bits (free only): install on demand via shadcn CLI into `src/shared/bits/`. See [IMPLEMENT.md](docs/IMPLEMENT.md) and [react-bits-free.md](docs/react-bits-free.md).

Candidate fonts (scoped per vision): `@fontsource/archivo-black`, `@fontsource/manrope` (c03 Blade Night); `@fontsource/teko`, `@fontsource/karla` (c04 Film Gate); `@fontsource/space-grotesk`, `@fontsource/ibm-plex-sans` (c05 Smoke Line); `@fontsource/unbounded`, `@fontsource/figtree` (c06 Glass Cap); `@fontsource/cormorant-garamond`, `@fontsource/ibm-plex-sans` (c07 Lodge Depth); `@fontsource/saira-extra-condensed`, `@fontsource/public-sans` (c09 Private Axis); `@fontsource/syne`, `@fontsource/instrument-serif`, `@fontsource/ibm-plex-mono`, `@fontsource/outfit` (c10 Lockup; c12 Caustic Focus uses Instrument Serif + Outfit; c18 RSVP uses Instrument Serif + Outfit); `@fontsource/big-shoulders-display`, `@fontsource/ibm-plex-sans` (c11 Ember Lattice); `@fontsource/bodoni-moda`, `@fontsource/sora` (c13 Penumbra); `@fontsource/bricolage-grotesque`, `@fontsource/figtree`, `@fontsource/ibm-plex-mono` (c14 Live Offset); `@fontsource/bungee`, `@fontsource/ibm-plex-mono` (c15 Hard Invert); `@fontsource-variable/fraunces`, `@fontsource/plus-jakarta-sans` (c17 Quiet Cast); `@fontsource/bebas-neue`, `@fontsource/barlow` (c20 Charge Split).

React Bits extras (on demand): `ogl` (DarkVeil, RippleGrid, Plasma, LightRays, CircularGallery), `motion` (TiltedCard, DecryptedText), `three` + `@react-three/fiber` + `@types/three` (Silk). Lightning uses canvas WebGL with no extra package.

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
