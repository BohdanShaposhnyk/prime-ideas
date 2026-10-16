import { useWordmark } from '../../hooks/wordmark'

/** Cropped wordmark. The header places it; the black plate is already punched out. */
export function HeroMark({ className = '' }: { className?: string }) {
  const src = useWordmark()
  if (!src) {
    return <span aria-hidden className={`inline-block h-5 w-[4.3rem] sm:h-6 sm:w-[5.2rem] ${className}`} />
  }

  return <img src={src} alt="" className={`h-5 w-auto sm:h-6 ${className}`} />
}
