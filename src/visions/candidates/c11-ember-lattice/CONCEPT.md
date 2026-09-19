# CONCEPT — Ember Lattice

- **id:** `c11`
- **slug:** `ember-lattice`
- **title:** Ember Lattice
- **status:** `motion`

## Thesis
Prime is a voltage lattice — each scroll pulse ripples a new room through living shader currents until the night ignites.

## Mood
lattice, ember, voltage, pulse, nocturnal, silk

## Scroll grammar
**pulse-ring** — a pinned lattice stage; each beat expands a concentric pulse-ring that ignites the next room while the background shader retunes.

## Layout grammar
**type-over-lattice** — oversized display stacked flush-left over a full-bleed Bits current; body captions sit as a thin right rail (stack under type on mobile).

## Hero
- **Composition:** Full-bleed RippleGrid lattice over a Silk veil; PRIME flush-left, huge, clipped by the left edge; ring marks rest inert on the pin.
- **Phrases:** “The night has a lattice.” / “Pulse until it ignites.”

## Structure
1. **Hero** — RippleGrid lattice + Silk veil; rim lockup.
2. **Pulse play** — Plasma current through the lattice (gaming arena).
3. **Pulse screen** — LightRays cut the lattice (cinema).
4. **Pulse voice** — Ember forks across the grid (karaoke).
5. **Pulse floor** — Remaining rooms as a three-line rail (bar, hookah, kitchen).
6. **Rest** — Lattice settles; reservation close.

## Motion signature
1. Pulse-ring expand — GSAP scrub scale of concentric rings on the pinned lattice.
2. Shader retune — crossfade Bits background layers (Silk / RippleGrid / Plasma / LightRays) per beat.
3. Rail lock — right-rail captions snap in as each ring ignites.

## Type
- **Display:** Big Shoulders Display 800 — 14–22vw, flush-left, condensed, tight leading, edge-clipped
- **Body:** IBM Plex Sans 400 — 14–16px tracked uppercase captions on the rail

## Palette cue
Void `#09070A`, ember `#FF5E2A`, voltage gold `#F0C14B`, plasma violet `#C65CFF`, ray bone `#FFF1DC`, silk teal `#3CE0C4`, ink `#F6EFE4`.

## Non-goals
- No compositor lockup, no film gates, no Z-axis docking
- No card grids / stat strips / badge chrome
- No Pro Bits; no photo asks — CSS + named free backgrounds only

## Refs
- RippleGrid, Silk, Plasma, LightRays — free React Bits backgrounds
