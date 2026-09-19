# CONCEPT — Hard Invert

- **id:** `c15`
- **slug:** `hard-invert`
- **title:** Hard Invert
- **status:** `motion`

## Thesis
Prime is a Warsaw rave poster that inverts as you snap — rooms slam as flyer frames until the night strobes OWN / THE / NIGHT.

## Mood
rave, punk, invert, strobe, acid, underground

## Scroll grammar
Snap-strobe paging — full-viewport flyer frames snap on the Y axis; one beat is a tall pin that hard-cuts six stacked frames (plane / slam-word / plane / slam-word).

## Layout grammar
Full-bleed flyer stack. Type is oversized and off-register over the media. Alternating planes sit inverted. Brand is a torn-corner sticker, not a header.

## Hero
- **Composition:** Full-viewport acid poster, inverted wash over a magenta–cyan mesh; huge off-register PRIME; torn sticker at a corner.
- **Phrases:** “Own the night.” / “No soft hours.”

## Structure
1. **Hero** — inverted rave poster; PRIME slam; sticker + two phrases
2. **Strobe** — six-frame hard cut: visual / OWN / visual / THE / visual / NIGHT
3. **Play** — gaming flyer, invert wash, arena copy
4. **Heat** — hookah / bar flyer, magenta heat plane
5. **Voice** — karaoke flyer, cyan invert
6. **Screen** — cinema flyer, yellow–black slam
7. **Floor** — kitchen / close; last invert slam + instagram

## Motion signature
1. Snap-strobe paging (GSAP) — hard cuts between flyer frames, no fades
2. Invert flicker (GSAP) — planes flash `invert(1)` at snap edges
3. Six-frame strobe pin (GSAP) — while pinned, frames 1–6 cycle on scroll progress (visual / OWN / visual / THE / visual / NIGHT)

## Type
- **Display:** Bungee — 22–40vw all-caps slam words, flush to edges, slight overlap
- **Body:** IBM Plex Mono — ticket-stub listings, 11–13px, wide tracking

## Palette cue
Acid yellow `#F4FF3A`, hot magenta `#FF2EC8`, electric cyan `#1CFFF0`, rave purple `#6A12FF`, poison green `#00F55A`, paper `#F7F2EA`, pitch `#090909`. Inverse planes: CSS `filter: invert(1)` over the same palette (not a second color set).

## Non-goals
- No soft fades, luxury serif, or calm dark lounge
- No cards, stats, or long copy
- No horizontal track

## Refs
- [@prime_warsaw](https://www.instagram.com/prime_warsaw/)
