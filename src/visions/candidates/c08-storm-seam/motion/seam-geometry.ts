/** Seam geometry — 40° from vertical, BL→TR (/). */

export const SEAM_FROM_VERTICAL_DEG = 40

export type Pt = { x: number; y: number }

export function seamDir(deg = SEAM_FROM_VERTICAL_DEG): Pt {
  const r = (deg * Math.PI) / 180
  return { x: Math.sin(r), y: -Math.cos(r) }
}

export function seamNormal(W: number, H: number, deg = SEAM_FROM_VERTICAL_DEG): Pt {
  const d = seamDir(deg)
  let n = { x: -d.y, y: d.x }
  const toC = { x: W / 2 - W, y: H / 2 - H }
  if (n.x * toC.x + n.y * toC.y < 0) n = { x: -n.x, y: -n.y }
  return n
}

/** Line anchor: p=0 through BR, p=1 parallel through center. */
export function seamAnchor(W: number, H: number, p: number, deg = SEAM_FROM_VERTICAL_DEG): Pt {
  const n = seamNormal(W, H, deg)
  const br = { x: W, y: H }
  const c = { x: W / 2, y: H / 2 }
  const dist = (c.x - br.x) * n.x + (c.y - br.y) * n.y
  return { x: br.x + n.x * dist * p, y: br.y + n.y * dist * p }
}

function cross(ax: number, ay: number, bx: number, by: number) {
  return ax * by - ay * bx
}

function sideOf(o: Pt, d: Pt, q: Pt) {
  return cross(d.x, d.y, q.x - o.x, q.y - o.y)
}

function segIntersect(a: Pt, b: Pt, o: Pt, d: Pt): Pt | null {
  const ab = { x: b.x - a.x, y: b.y - a.y }
  const den = cross(ab.x, ab.y, d.x, d.y)
  if (Math.abs(den) < 1e-9) return null
  const ao = { x: o.x - a.x, y: o.y - a.y }
  const t = cross(ao.x, ao.y, d.x, d.y) / den
  if (t < -1e-6 || t > 1 + 1e-6) return null
  return { x: a.x + ab.x * t, y: a.y + ab.y * t }
}

function near(a: Pt, b: Pt, eps = 0.75) {
  return Math.hypot(a.x - b.x, a.y - b.y) < eps
}

function dedupe(poly: Pt[]) {
  const out: Pt[] = []
  for (const p of poly) {
    if (out.some((q) => near(q, p))) continue
    out.push(p)
  }
  // Close without duplicating first
  return out
}

/**
 * Split the viewport by the seam into two polygons.
 * A = side containing top-left (NW), B = side containing bottom-right (SE).
 */
export function seamPolygons(
  W: number,
  H: number,
  p: number,
  deg = SEAM_FROM_VERTICAL_DEG,
): { a: Pt[]; b: Pt[] } {
  const o = seamAnchor(W, H, p, deg)
  const d = seamDir(deg)
  const corners: Pt[] = [
    { x: 0, y: 0 },
    { x: W, y: 0 },
    { x: W, y: H },
    { x: 0, y: H },
  ]
  const eps = 1e-3

  function build(want: 'pos' | 'neg'): Pt[] {
    const poly: Pt[] = []
    for (let i = 0; i < 4; i++) {
      const a = corners[i]
      const b = corners[(i + 1) % 4]
      const sa = sideOf(o, d, a)
      const keep =
        want === 'pos' ? sa > -eps : sa < eps
      if (keep) poly.push(a)

      const hit = segIntersect(a, b, o, d)
      if (!hit) continue
      if (near(hit, a) || near(hit, b)) continue
      poly.push(hit)
    }
    return dedupe(poly)
  }

  let polyPos = build('pos')
  let polyNeg = build('neg')

  if (polyPos.length < 3) {
    polyPos = [
      { x: W - 2, y: H },
      { x: W, y: H },
      { x: W, y: H - 2 },
    ]
  }
  if (polyNeg.length < 3) {
    polyNeg = [
      { x: W - 2, y: H },
      { x: W, y: H },
      { x: W, y: H - 2 },
    ]
  }

  // Label by which poly contains TL vs BR
  const tl = { x: 1, y: 1 }
  const br = { x: W - 1, y: H - 1 }
  const posHasTL = pointInPoly(polyPos, tl)
  const negHasTL = pointInPoly(polyNeg, tl)
  const posHasBR = pointInPoly(polyPos, br)

  let a = polyPos
  let b = polyNeg
  if (negHasTL && !posHasTL) {
    a = polyNeg
    b = polyPos
  } else if (posHasBR && !pointInPoly(polyNeg, br)) {
    a = polyNeg
    b = polyPos
  }

  return { a, b }
}

function pointInPoly(poly: Pt[], q: Pt) {
  if (poly.some((p) => near(p, q, 2))) return true
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const pi = poly[i]
    const pj = poly[j]
    const hit =
      pi.y > q.y !== pj.y > q.y &&
      q.x < ((pj.x - pi.x) * (q.y - pi.y)) / (pj.y - pi.y + 1e-12) + pi.x
    if (hit) inside = !inside
  }
  return inside
}

export function polyToClipPath(poly: Pt[]): string {
  if (poly.length < 3) return 'polygon(0px 0px, 0px 0px, 0px 0px)'
  return `polygon(${poly.map((p) => `${p.x.toFixed(2)}px ${p.y.toFixed(2)}px`).join(', ')})`
}

/** Translate a center-anchored rotated line so it passes through the seam anchor. */
export function lineOffsetFromCenter(
  W: number,
  H: number,
  p: number,
  deg = SEAM_FROM_VERTICAL_DEG,
): Pt {
  const anchor = seamAnchor(W, H, p, deg)
  const d = seamDir(deg)
  const c = { x: W / 2, y: H / 2 }
  const n = { x: -d.y, y: d.x }
  const dist = (c.x - anchor.x) * n.x + (c.y - anchor.y) * n.y
  return { x: -n.x * dist, y: -n.y * dist }
}

/**
 * Cover sheets for triangular clips sliding on a diagonal.
 *
 * Axis-aligned pages chained by full projected extent (w|dx|+h|dy|) only
 * meet at a corner on a diagonal — that opens a diamond black gap between
 * lodge/bar (and stage/gaming). Centers must stay close enough that the
 * AABBs overlap in BOTH x and y: step < min(w/|dx|, h/|dy|).
 *
 * ~2× viewport keeps the triangle’s wide sides filled; type stays in a
 * dvh×screen frame at each block center.
 */
export const RAIL_BLOCK_BLEED = 2.1
/** Keep this fraction of the limiting-axis span as AABB overlap. */
export const RAIL_CHAIN_OVERLAP = 0.2

export type RailBlockLayout = {
  blockW: number
  blockH: number
  /** Center-to-center distance along the seam for one page step. */
  step: number
}

/** Oversized upright pages with enough underlap to kill diagonal diamond gaps. */
export function railBlockLayout(
  W: number,
  H: number,
  deg = SEAM_FROM_VERTICAL_DEG,
  bleed = RAIL_BLOCK_BLEED,
): RailBlockLayout {
  const d = seamDir(deg)
  const blockW = W * bleed
  const blockH = H * bleed
  const ax = Math.abs(d.x)
  const ay = Math.abs(d.y)
  // Max center distance that still overlaps in both axes, then pull in further.
  const maxTouch = Math.min(blockW / Math.max(ax, 1e-6), blockH / Math.max(ay, 1e-6))
  const step = Math.max(maxTouch * (1 - RAIL_CHAIN_OVERLAP), Math.hypot(W, H) * 0.55)
  return { blockW, blockH, step }
}

/** GSAP-equivalent power3.inOut as a pure 0–1 map. */
export function easePower3InOut(t: number): number {
  const x = Math.min(1, Math.max(0, t))
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

/**
 * Dual-rail local progress → page reveal.
 * Hold scene 0 → smooth energetic transit → hold scene 1.
 */
export function mapDualReveal(u: number, holdA = 0.28, snapEnd = 0.58): number {
  const x = Math.min(1, Math.max(0, u))
  if (x <= holdA) return 0
  if (x >= snapEnd) return 1
  return easePower3InOut((x - holdA) / (snapEnd - holdA))
}
