# Implement conventions — sections & React Bits

Lean rules for hero / structure / block skills. See also [`AGENT_FLOW.md`](./AGENT_FLOW.md).

## Section layout

```
src/visions/candidates/<id>-<slug>/
  CONCEPT.md
  index.tsx                 # scroll container + composes sections
  sections/
    hero.tsx                # after prime-implement-hero
    <prefix>-<kebab>.tsx    # one shell per CONCEPT Structure item after Hero
  assets/                   # curated media only (never import instagram_ref/ directly)
```

- Name section files from Structure labels. Prefix follows the concept’s topology:
  - rooms / zones → `zone-panorama.tsx`
  - chapters / scenes → `scene-descent.tsx`
  - strips / tracks → `strip-night.tsx`
  - panels → `panel-glow.tsx`
- Default export per section file
- No cards / stat strips / badge overlays unless CONCEPT demands interaction chrome
- Motion effects live in `motion/` via `prime-wire-motion` — see [`MOTION.md`](./MOTION.md). Implement builds **inert structure only**.

## Scroll skeleton (required at structure)

Build **inert structure** from CONCEPT **Scroll grammar** — containers, resting layout, and `data-*` hooks. Do **not** preview **Motion signature**.

**Allowed (structure):**

- Sticky pin wrappers, tall scroll stages (`h-[…vh]`), overflow-x tracks, scroll-snap
- Resting layout that matches Layout grammar (e.g. diagonal media|caption *slabs* as static composition)
- Semantic hooks (`data-scroll`, `data-plane`, `data-scene`, `data-pane`, …) for later GSAP
- Vertical `min-h` stacking **only** when CONCEPT Scroll grammar is vertical — not the lab default

**Forbidden (defer to `prime-wire-motion`):**

- `motion/` folder or GSAP imports
- CSS scroll-driven motion (`animation-timeline`, scroll-linked `@keyframes`) for Motion signature effects
- Scrubbing or previewing those effects via transform / `clip-path` / opacity / filter keyframes or transitions
- “End-state” styling that exists only so wire can animate into it (no fake from→to in CSS)

Compose `index.tsx` as the container the grammar needs, mount sections in Structure order, leave planes inert. Page must stay readable with motion off — brand + copy visible; placeholders are static atmosphere, not a timeline.

## Per-candidate type

- Load **Display** + **Body** families from CONCEPT Type on the candidate root (scoped class or candidate-local CSS; `@fontsource*` is fine — note new packages in README)
- Shared Geist / app tokens stay for hub and shared chrome only
- Do not force every candidate onto the global sans

## Visual placeholders (required until real assets exist)

Implement skills must **never ask** for photos, video, or uploads. Do not block on missing media.

1. Read **Palette cue** + **Mood** (+ Hero composition / section one-liners).
2. Build the dominant visual as **CSS** — layered gradients, color planes, soft noise/mesh via Tailwind/arbitrary values, or free Bits that are color-driven (e.g. Aurora). Follow the CONCEPT’s color / depth story (not required to be dark).
3. Treat these as **swap-ready placeholders** for later `assets/`:
   - Prefer a dedicated visual wrapper (`div` / `section` child) with `data-placeholder="visual"` (and optional short comment: `/* swap: hero weather plane */`).
   - Keep brand + microcopy outside that swap target when practical so a real image can drop in later.
4. Never import `instagram_ref/` directly. Curate into `assets/` only when the user supplies or approves media.
5. Placeholders still count as the “dominant visual plane” for hero budget — not empty flat fills.

## React Bits — free only

- Registry: `@react-bits` → `https://reactbits.dev/r/{name}.json` (in `components.json`)
- **Never** Pro: `@reactbits-pro`, `@reactbits-starter`, `pro.reactbits.dev`, license keys, Pro Agent Kit
- Prefer `*-TS-TW` into `src/shared/bits/`:

```bash
pnpm dlx shadcn@latest add @react-bits/<Name>-TS-TW --path src/shared/bits
```

- Import `@/shared/bits/...`. Note new packages in README. shadcn chrome stays in `src/shared/ui/`
- One-off experiments: candidate-local only — never sibling candidates
- If something only exists in Pro (page blocks, app screens), compose custom sections + free Bits + GSAP instead

## Discovery (token-cheap)

1. Read [`docs/react-bits-free.md`](./react-bits-free.md) first — free catalog with one-line blurbs
2. Do **not** fetch remote catalogs by default (`llms.txt` ~70KB with Pro noise; `registry.json` ~250KB)
3. After choosing a name, install that item (or fetch that item’s small JSON if needed)
4. **Refresh** (rare): fetch `https://reactbits.dev/llms.txt`, keep content **before** `## React Bits Pro`, rewrite `react-bits-free.md`, discard the rest. Never commit Pro listings
