# Prime Warsaw

Landing page for Prime Warsaw — gaming, cinema, karaoke, hookah, and bar. Instagram: [@prime_warsaw](https://www.instagram.com/prime_warsaw/) and [@prime_wroclaw](https://www.instagram.com/prime_wroclaw/).

## Stack

Vite · React · TypeScript · Tailwind · GSAP · pnpm

## Commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm assets:c20
```

`pnpm assets:c20` rebuilds web images and the night reel from `assets-src/c20` into `src/site/assets`.

## Layout

- `src/site` — the page (sections, components, hooks)
- `src/site/lib` — palette, venues, booking, GSAP, reduced motion
- `src/site/bits` — motion and WebGL pieces used by the page
- `src/site/assets` — images and video the page imports
- `assets-src/c20` — full-quality originals for the compress script
- `instagram_ref/` — moodboard only; do not import it
