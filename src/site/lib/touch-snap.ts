import { gsap } from './gsap'

/**
 * Touch owns the snap. CSS mandatory snap stays for mouse and trackpad.
 * The port is touch-action: none, so Android cannot claim a tap as a pan.
 * Finger travel inside the slop stays a tap: no scroll write and no overflow
 * change, or the click never reaches accordions and buttons. Past the slop,
 * the finger moves one stop and the finger-up eases there. Chrome Android
 * fires pointercancel once it claims a scroll, while the finger is still down,
 * and then flings — the finger-up is the only commit. Overflow stays hidden
 * through the ease so a leftover fling cannot resume.
 */

const COAST = 'cs-snap-coast'
const LOCKS = ['cs-hero-lock', 'cs-snap-pause']
const MAX_S = 0.32
const MIN_S = 0.2
/** Chrome's touch slop. Shorter travel is a tap, not the next scene. */
const TAP_SLOP = 16

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

function windowFor(stops: number[], index: number) {
  const origin = stops[index] ?? 0
  const prev = stops[index - 1] ?? origin
  const next = stops[index + 1] ?? origin
  return { origin, prev, next }
}

function pickTarget(stops: number[], originIndex: number, y: number) {
  const { origin, prev, next } = windowFor(stops, originIndex)
  const dir = Math.sign(Math.min(next, Math.max(prev, y)) - origin)
  if (dir < 0) return prev
  if (dir > 0) return next
  return origin
}

function settleDuration(distance: number, portHeight: number) {
  const span = Math.max(portHeight, 1)
  return Math.min(MAX_S, Math.max(MIN_S, (distance / span) * 0.4))
}

export function bindTouchSnap(port: HTMLElement) {
  let tween: ReturnType<typeof gsap.to> | null = null
  let dragging = false
  let holding = false
  let writing = false
  let pointerId = -1
  let originY = 0
  let originIndex = 0
  let held = port.scrollTop
  let epoch = 0
  let stops: number[] = []
  let startClientY = 0
  let armed = false

  const killTween = () => {
    const current = tween
    tween = null
    current?.kill()
  }

  const thaw = () => {
    port.style.overflow = ''
  }

  const release = () => {
    holding = false
    dragging = false
    thaw()
    port.classList.remove(COAST)
  }

  const writeScroll = (y: number) => {
    writing = true
    held = y
    port.scrollTop = y
    writing = false
  }

  const go = (target: number) => {
    killTween()
    const from = port.scrollTop
    if (Math.abs(target - from) < 1) {
      writeScroll(target)
      release()
      return
    }
    const state = { y: from }
    const created = gsap.to(state, {
      y: target,
      duration: settleDuration(Math.abs(target - from), port.clientHeight),
      ease: 'power2.out',
      onUpdate: () => {
        writeScroll(state.y)
      },
      onComplete: () => {
        if (tween !== created) return
        writeScroll(target)
        tween = null
        holding = false
        if (!dragging) release()
      },
    })
    tween = created
  }

  const follow = (clientY: number) => {
    const travel = startClientY - clientY
    if (!armed) {
      if (Math.abs(travel) < TAP_SLOP) return
      armed = true
      port.classList.add(COAST)
    }
    if (locked(port) || stops.length === 0) return
    const { prev, next } = windowFor(stops, originIndex)
    writeScroll(Math.min(next, Math.max(prev, originY + travel)))
  }

  const finish = () => {
    if (!dragging) return
    dragging = false
    pointerId = -1

    if (locked(port) || stops.length === 0) {
      release()
      return
    }

    if (!armed) {
      holding = false
      if (!port.classList.contains(COAST) && port.style.overflow === '') return
      const token = epoch
      requestAnimationFrame(() => {
        if (token !== epoch || dragging) return
        release()
      })
      return
    }

    const token = epoch
    const { prev, next } = windowFor(stops, originIndex)
    const y = Math.min(next, Math.max(prev, port.scrollTop))
    const target = pickTarget(stops, originIndex, y)

    holding = true
    port.style.overflow = 'hidden'
    writeScroll(y)

    if (Math.abs(target - y) < 1) {
      writeScroll(target)
      window.setTimeout(() => {
        if (token !== epoch || dragging || tween) return
        writeScroll(target)
        release()
      }, 48)
      return
    }

    go(target)
  }

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== 'touch' || !event.isPrimary) return
    if (locked(port)) {
      killTween()
      release()
      return
    }
    killTween()
    thaw()
    epoch += 1
    dragging = true
    holding = false
    armed = false
    pointerId = event.pointerId
    stops = measureStops(port)
    originY = port.scrollTop
    originIndex = nearestIndex(stops, originY)
    held = originY
    startClientY = event.clientY
  }

  const onPointerMove = (event: PointerEvent) => {
    if (!dragging || event.pointerId !== pointerId) return
    follow(event.clientY)
  }

  const onPointerUp = (event: PointerEvent) => {
    if (!dragging || event.pointerId !== pointerId) return
    finish()
  }

  const onTouchEnd = (event: TouchEvent) => {
    if (event.touches.length > 0) return
    finish()
  }

  const onScroll = () => {
    if (writing) return
    if (dragging && !armed) {
      if (Math.abs(port.scrollTop - originY) >= TAP_SLOP) writeScroll(originY)
      return
    }
    if (dragging && stops.length > 0) {
      const { prev, next } = windowFor(stops, originIndex)
      if (port.scrollTop < prev || port.scrollTop > next) {
        writeScroll(Math.min(next, Math.max(prev, port.scrollTop)))
      }
      return
    }
    if (holding && Math.abs(port.scrollTop - held) > 8) {
      writeScroll(held)
    }
  }

  port.addEventListener('pointerdown', onPointerDown, { passive: true })
  port.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerup', onPointerUp, { passive: true })
  window.addEventListener('touchend', onTouchEnd, { passive: true })
  window.addEventListener('touchcancel', onTouchEnd, { passive: true })

  return () => {
    killTween()
    thaw()
    port.classList.remove(COAST)
    port.removeEventListener('pointerdown', onPointerDown)
    port.removeEventListener('scroll', onScroll)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('touchend', onTouchEnd)
    window.removeEventListener('touchcancel', onTouchEnd)
  }
}
