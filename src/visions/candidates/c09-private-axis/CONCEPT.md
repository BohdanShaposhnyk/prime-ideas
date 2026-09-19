# CONCEPT — Private Axis

- **id:** `c09`
- **slug:** `private-axis`
- **title:** Private Axis
- **status:** `motion`

## Thesis
Scroll plunges you down Prime’s private Z-axis — rooms dock from the sides and from behind while type discovers on its own delay.

## Mood
steel, private, spare, nocturnal, expensive

## Scroll grammar
Perspective plunge — a pinned viewport travels in Z through a receding corridor; at each station a room docks from a non-vertical axis (lateral, rear-overtake, or yaw) while type resolves asynchronously.

## Layout grammar
Condensed display as a left ledger rail; 2.5D media stage occupies the remaining field; brand is a small steel stamp, never a centered masthead.

## Hero
- **Composition:** Full-bleed receding grid corridor. Oversized condensed “PRIME” extruded on the left rail. A thin bone hairline marks the vanishing axis.
- **Phrases:** “Private after the door.” / “The night has an axis.”

## Structure
1. **Hero** — corridor mouth; type extrudes while the grid recedes
2. **Gaming** — 2.5D plane docks from the right
3. **Cinema** — stage overtakes from behind (rear Z)
4. **Karaoke** — yaw-in from the left as a vertical slab
5. **Lodge** — dark veil field; room name discovers after the plane has already docked
6. **Floor** — bar and kitchen dock from opposite laterals and meet on the axis
7. **Close** — axis locks; membership stamp

## Motion signature
1. Z-plunge pin — GSAP ScrollTrigger pin + perspective `translateZ` / scale of corridor layers
2. Non-vertical docks — rooms enter from `x` / `z` / `rotateY`, never a simple up-scroll stack
3. Async type discovery — DepthText / SplitFlapText / DecryptedText on delayed independent timelines vs the room docks

## Type
- **Display:** Saira Extra Condensed 800, 18–28vw on the left rail, tight tracking, uppercase
- **Body:** Public Sans 400/500, small wide-tracking labels and ledger numbers

## Palette cue
Void `#080809`, graphite `#141416`, steel `#6F7378`, bone `#E4DFD4`, oxblood `#6B1F22` (hairlines / rare fill), warm metal `#B7A99A`. Cool-neutral black with one dry blood accent — no gold, no neon.

## Non-goals
- No neon candy, pink, or gold-glamour
- No centered romance masthead
- No vertical card stack as the primary grammar
- Type and rooms must not reveal in lockstep

## Refs
- `instagram_ref/` moodboard — private interiors, steel, night
