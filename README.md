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
pnpm assets
```

`pnpm assets` rebuilds web images and the night reel from `assets-src` into `src/site/assets`.

## Layout

- `src/site` — the page (sections, components, hooks)
- `src/site/lib` — palette, venues, booking, GSAP, reduced motion
- `src/site/bits` — motion and WebGL pieces used by the page
- `src/site/assets` — images and video the page imports
- `assets-src` — full-quality originals for the compress script
- `instagram_ref/` — moodboard only; do not import it

## Page

Snap scenes: hero, zones, offers, events, locations, reviews, atmosphere, app, basement.

Zones (`src/site/sections/zones`) is the main list of services: play zone, sim racing, bar, karaoke, private room, cinema hall, and hookah. The header and footer label it Zones.

Offers (`src/site/sections/offers.tsx`) is the welcome and birthday split. The header and footer label it Offers.

Addresses in the header and footer opens locations (`src/site/sections/locations`).

Atmosphere (`src/site/sections/atmosphere`) is the masonry after questions.

Reviews (`src/site/sections/scene-reviews`) is the Google review strip after locations. The header and footer label it Reviews.

Franchise opens a Gmail draft from the basement. The address (`franchise@premiumlounge.club`) sits under the band and copies on click.
