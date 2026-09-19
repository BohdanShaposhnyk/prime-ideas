# CONCEPT — `Live Offset`

- **id:** `c14`
- **slug:** `live-offset`
- **title:** Live Offset
- **status:** `motion`

## Thesis
Prime is a dim field cut by a living bright offset — rooms arrive as zooming shards while type belts run the seam.

## Mood
minimal, electric, offset, alive, nocturnal

## Scroll grammar
Sticky split-pin — each block shears on an offset cut; the dim half holds, the bright shard zooms toward the lens, and a marquee belt runs the seam.

## Layout grammar
Offset split-blocks, never 50/50 — staggered horizontal, vertical, and diagonal cuts. Lockup lives in the dim field; room names occupy the bright shard; belts occupy the cut line.

## Hero
- **Composition:** Full-viewport 62/38 vertical split, cut off-center. Dim charcoal left holds the quiet lockup. Electric-lime right shard is a color plane. Huge PRIME is split across the cut. One mono belt runs the seam.
- **Phrases:** “Dim holds. Bright arrives.” / “Prime Warsaw.”

## Structure
1. **Hero** — offset live-cut; split lockup; one belt
2. **Heat belt** — kitchen / hookah; horizontal shear; bright lower shard
3. **Play fracture** — gaming; staggered vertical split
4. **Voice run** — karaoke; diagonal cut with a running lyrics belt
5. **Screen zoom** — cinema; letterbox split; bright shard zooms
6. **Floor rest** — bar / close; belts collide; split heals into one field

## Motion signature
1. Split-pin zoom-parallax (GSAP) — dim half pinned; bright shard scales toward the camera
2. Seam belts (GSAP + ScrollVelocity) — independent infinite marquees on each cut, speed tied to scroll
3. Type reconstitution (GSAP + SplitText / DecryptedText) — display letters sit split across the cut, then snap; room names decrypt on pin enter

## Type
- **Display:** Bricolage Grotesque ExtraBold — 12–18vw, tracking −0.06em, split across the seam
- **Body:** Figtree 400/500 — dim-field captions, never competes with the cut
- **Belt:** IBM Plex Mono 11px, tracking 0.28em — running seam copy only

## Palette cue
Dim field `#0C0C0E` / `#16161A`. Bright shards: electric lime `#D6FF3A`, hot coral `#FF4D2E`, paper `#F4F0E6`. Hairline seam lime at 40%. Type on dim `#E8E6E1`; type on bright `#0C0C0E`.

## Non-goals
- No even 50/50 splits, card grids, or stat chrome
- No photography or 3D interiors — CSS planes only
- No full-bleed video

## Refs
- [@prime_warsaw](https://www.instagram.com/prime_warsaw/)
