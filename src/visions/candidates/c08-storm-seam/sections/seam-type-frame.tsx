import type { ReactNode } from 'react'

/** Shared: visual fills the seam block; type stays in a viewport frame. */
export function SeamTypeFrame({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      data-type-frame
      className={`absolute top-1/2 left-1/2 z-10 flex h-dvh w-screen -translate-x-1/2 -translate-y-1/2 flex-col px-5 py-10 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  )
}
