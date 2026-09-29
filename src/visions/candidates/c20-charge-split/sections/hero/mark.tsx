import { useWordmark } from '../../wordmark'

/**
 * Crop to the wordmark and lift the black plate so the letters sit on the video.
 */
export function HeroMark({ visible }: { visible: boolean }) {
  const src = useWordmark()
  if (!src || !visible) return null

  return (
    <img
      src={src}
      alt="Prime"
      className="pointer-events-none absolute top-4 left-4 z-30 h-5 w-auto sm:top-5 sm:left-6 sm:h-6"
    />
  )
}
