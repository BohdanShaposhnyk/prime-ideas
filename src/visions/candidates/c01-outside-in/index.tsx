import { Link } from '@tanstack/react-router'

export default function OutsideInPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-6 px-5 py-10">
      <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
        c01 — outside-in
      </p>
      <h1 className="text-3xl font-medium tracking-tight">Outside In</h1>
      <p className="text-sm text-muted-foreground">
        Moody weather outside the terrace glass, then you descend into Prime —
        richer, darker, more intimate room by room.
      </p>
      <Link to="/" className="text-sm underline underline-offset-4">
        Back to hub
      </Link>
    </main>
  )
}
