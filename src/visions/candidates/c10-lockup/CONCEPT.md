# CONCEPT — `Lockup`

- **id:** `c10`
- **slug:** `lockup`
- **title:** Lockup
- **status:** `motion`

## Thesis
Prime is a compositor’s wall — type-blocks slam from the edges, latch to a spine, and restack until the night is locked.

## Mood
editorial, modular, kinetic, specimen, sharp, nocturnal

## Scroll grammar
Offset-latch stack — a sticky compositor column; oversized type-blocks enter from alternating edges, overshoot, latch against a thin spine, then compress into a growing stack as the next block arrives.

## Layout grammar
Type-as-block — each beat is a self-contained lockup (color plane + one display line + one whisper). Asymmetric widths, staggered edges, overlapping slabs. Brand runs as a numeric index on the spine. No scenic rooms.

## Hero
- **Composition:** Viewport as an empty chase — hairline rules, a left spine with `00`, one massive display word sitting as the first unlatched block on paper stock.
- **Phrases:** “The night, locked.” / “Prime, in sorts.”

## Structure
1. **Hero** — empty chase; first lockup unlatched
2. **Mass** — full-bleed dense slab; condensed ultra type as weight
3. **Whisper** — thin horizontal blade; italic serif, almost empty
4. **Heat** — wide warm slab; mixed-scale lockup (bar/kitchen as type, not a room)
5. **Count** — square mono block; numbers as the graphic
6. **Echo** — tall narrow reversed slab; stacked condensed lines
7. **Colophon** — stack settles; spine ticks to END

## Motion signature
1. Offset-latch (GSAP) — GPU `translateX` + slight `rotate` from ±110%, overshoot, snap to spine
2. Stack compress (GSAP) — previous lockups `translateY` / scale into a compressed stack (transform only)
3. Type lockups (GSAP) — each slab gets its own type motion (mask-rise, drop-weight, baseline slide, tracking lock, count-up, line cascade, slug clip) — play-once on enter, not scramble/split-flap

## Type
- **Display:** Syne ExtraBold — hero and mass lockups, 12–22vw, tight tracking, flush to block edges
- **Contrast:** Instrument Serif italic — one whisper line per block; word/clip motion on enter
- **Condensed:** Saira Extra Condensed 800 — spine index + echo stack
- **Mono:** IBM Plex Mono — block IDs, counts, colophon meta
- **Body:** Outfit 400/500 — colophon only; never competes with display

## Palette cue
Warm stock `#E8E2D4`, ink `#12110E`, proof red `#FF2A1F`, process blue `#2546F5`, heat amber `#F5B942`. Blocks alternate stock/ink/red/blue/amber planes. Hairline rules in ink at 12% opacity.

## Non-goals
- No room tours, cinematic scenes, or 3D interiors
- No letter-scramble, split-flap, or decrypt loops
- No WebGL / React Bits; type motion is GSAP on the lockups
- No cards, badges, or stat chrome

## Refs
- [@prime_warsaw](https://www.instagram.com/prime_warsaw/)
