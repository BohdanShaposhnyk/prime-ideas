/** One viewport, plus a short step for each card after the first. */
export function showcaseMinHeight(cardCount: number) {
  const steps = Math.max(cardCount - 1, 0)
  return `calc(var(--cs-h, 100svh) + ${steps} * var(--cs-card-pitch, calc(var(--cs-h, 100svh) * 0.8)))`
}
