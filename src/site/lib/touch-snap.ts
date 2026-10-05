import { gsap } from './gsap'

/**
 * Touch owns the snap. CSS mandatory snap stays for mouse and trackpad, but on a
 * finger it pulls Android back toward the scene below and tows the showcase toward
 * a stop that is screens away. Snap is off while the finger is down so the drag
 * tracks, then one stop is eased in — the same rule up and down.
 */

const COAST = 'cs-snap-coast'
const LOCKS = ['cs-hero-lock', 'cs-snap-pause']
const COMMIT_RATIO = 0.2
/** px/ms. A real flick commits even when the finger has not yet crossed 20%. */
const FLICK = 0.5
const MAX_S = 0.34
const MIN_S = 0.18

function locked(port: HTMLElement) {
  return LOCKS.some((name) => port.classList.contains(name))
}

function measureStops(port: HTMLElement) {
  const portTop = port.getBoundingClientRect().top
  const scrollTop = port.scrollTop
  const tops: number[] = []
  const push = (el: HTMLElement) => {
    tops.push(Math.round(el.getBoundingClientRect().top - portTop + scrollTop))
  }
  port.querySelectorAll<HTMLElement>('[data-scene]').forEach((el) => {
    if (el.dataset.scene === 'showcase' && el.querySelector('[data-showcase-stop]')) return
    push(el)
  })
  port.querySelectorAll<HTMLElement>('[data-showcase-stop]').forEach(push)
  tops.sort((a, b) => a - b)
  const stops: number[] = []
  for (const top of tops) {
    const prev = stops[stops.length - 1]
    if (prev === undefined || top - prev > 8) stops.push(top)
  }
  return stops
}

function nearestIndex(stops: number[], y: number) {
  let best = 0
  let bestDist = Infinity
  for (let i = 0; i < stops.length; i++) {
    const dist = Math.abs(stops[i] - y)
    if (dist < bestDist) {
      bestDist = dist
      best = i
    }
  }
  return best
}

function pickTarget(stops: number[], originIndex: number, originY: number, y: number, velocity: number) {
  const travel = y - originY
  const speed = Math.abs(velocity)
  const flick = speed > FLICK
  let dir = 0
  if (Math.abs(travel) > 1) dir = Math.sign(travel)
  else if (flick) dir = Math.sign(velocity)
  if (dir === 0) return stops[originIndex]

  const next = originIndex + dir
  if (next < 0 || next >= stops.length) return stops[originIndex]

  const gap = Math.abs(stops[next] - stops[originIndex]) || 1
  const crossed = Math.abs(travel) > gap * COMMIT_RATIO
  const flicked = flick && Math.sign(velocity) === dir
  return crossed || flicked ? stops[next] : stops[originIndex]
}

function settleDuration(distance: number, portHeight: number) {
  const span = Math.max(portHeight, 1)
  return Math.min(MAX_S, Math.max(MIN_S, (distance / span) * 0.42))
}

export function bindTouchSnap(port: HTMLElement) {
  let tween: ReturnType<typeof gsap.to> | null = null
  let dragging = false
  let holding = false
  let writing = false
  let pointerId = -1
  let originY = 0
  let held = port.scrollTop
  let lastPointerY = 0
  let lastPointerT = 0
  let velocity = 0
  let stops: number[] = []

  const killTween = () => {
    const current = tween
    tween = null
    current?.kill()
  }

  const release = () => {
    holding = false
    dragging = false
    port.classList.remove(COAST)
  }

  const trackPointer = (event: PointerEvent) => {
    const now = performance.now()
    const dt = now - lastPointerT
    if (dt > 0 && dt < 100) {
      const next = -(event.clientY - lastPointerY) / dt
      velocity = velocity * 0.35 + next * 0.65
    } else if (dt >= 100) {
      velocity = 0
    }
    lastPointerY = event.clientY
    lastPointerT = now
  }

  const pin = (y: number) => {
    writing = true
    const previous = port.style.overflow
    port.style.overflow = 'hidden'
    void port.offsetHeight
    port.style.overflow = previous
    port.scrollTop = y
    held = y
    writing = false
  }

  const go = (target: number) => {
    killTween()
    const from = port.scrollTop
    if (Math.abs(target - from) < 1) {
      writing = true
      port.scrollTop = target
      writing = false
      release()
      return
    }
    const state = { y: from }
    const created = gsap.to(state, {
      y: target,
      duration: settleDuration(Math.abs(target - from), port.clientHeight),
      ease: 'power3.out',
      onUpdate: () => {
        writing = true
        held = state.y
        port.scrollTop = state.y
        writing = false
      },
      onComplete: () => {
        if (tween !== created) return
        writing = true
        held = target
        port.scrollTop = target
        writing = false
        tween = null
        holding = false
        if (!dragging) port.classList.remove(COAST)
      },
    })
    tween = created
  }

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== 'touch' || !event.isPrimary) return
    if (locked(port)) {
      killTween()
      release()
      return
    }
    killTween()
    dragging = true
    holding = false
    pointerId = event.pointerId
    port.classList.add(COAST)
    stops = measureStops(port)
    originY = port.scrollTop
    lastPointerY = event.clientY
    lastPointerT = performance.now()
    velocity = 0
  }

  const onPointerMove = (event: PointerEvent) => {
    if (!dragging || event.pointerId !== pointerId) return
    trackPointer(event)
  }

  const onScroll = () => {
    if (writing || !holding) return
    if (Math.abs(port.scrollTop - held) < 0.5) return
    writing = true
    port.scrollTop = held
    writing = false
  }

  const onPointerUp = (event: PointerEvent) => {
    if (!dragging || event.pointerId !== pointerId) return
    dragging = false
    pointerId = -1
    if (performance.now() - lastPointerT > 80) velocity = 0

    if (locked(port) || stops.length === 0) {
      release()
      return
    }

    const y = port.scrollTop
    const moved = Math.abs(y - originY) > 1 || Math.abs(velocity) > 0.05
    if (!moved) {
      release()
      return
    }

    holding = true
    held = y
    pin(y)
    const originIndex = nearestIndex(stops, originY)
    go(pickTarget(stops, originIndex, originY, y, velocity))
  }

  port.addEventListener('pointerdown', onPointerDown, { passive: true })
  port.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerup', onPointerUp, { passive: true })
  window.addEventListener('pointercancel', onPointerUp, { passive: true })

  return () => {
    killTween()
    port.classList.remove(COAST)
    port.removeEventListener('pointerdown', onPointerDown)
    port.removeEventListener('scroll', onScroll)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('pointercancel', onPointerUp)
  }
}
