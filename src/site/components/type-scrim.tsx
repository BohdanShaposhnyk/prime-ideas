/**
 * Black wash behind type. Dark through the lockup, then a long fade
 * upward and outward so the plate has no edge.
 */
const WASH =
  'linear-gradient(to top, rgba(0, 0, 0, 0.76) 0%, rgba(0, 0, 0, 0.68) 36%, rgba(0, 0, 0, 0.34) 58%, rgba(0, 0, 0, 0.12) 76%, rgba(0, 0, 0, 0.03) 90%, transparent 100%)'

const SIDE_FADE =
  'linear-gradient(to right, transparent 0%, black 26%, black 74%, transparent 100%)'

export function TypeScrim({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -inset-x-1/2 -top-[130%] -bottom-[18vh] -z-10 ${className}`}
      style={{
        background: WASH,
        maskImage: SIDE_FADE,
        WebkitMaskImage: SIDE_FADE,
      }}
    />
  )
}
