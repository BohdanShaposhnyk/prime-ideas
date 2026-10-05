import { gsap } from './gsap'

/**
 * Touch owns the snap. CSS mandatory snap stays for mouse and trackpad.
 * Chrome Android fires pointercancel as soon as it claims the gesture for
 * scrolling, while the finger is still down, and then flings. Settling on that
 * cancel fights the fling and lands on a random scene. The finger-up (touchend
 * or pointerup) is the only commit. Any movement picks the next stop in that
 * direction. Overflow stays hidden through the ease so the fling cannot resume.
 *
 * A short Android flick is decided before pointerdown can turn snap off, so the
 * first one still uses the mandatory threshold: it travels about halfway and
 * snaps back, and the next flick works. Android never uses CSS snap. Direction
 * comes from the finger when that snap-back has already zeroed scrollTop.
 */

const COAST = 'cs-snap-coast'
const ANDROID = 'cs-snap-android'
const LOCKS = ['cs-hero-lock', 'cs-snap-pause']
const MAX_S = 0.32
const MIN_S = 0.2
/** Below this, a touch is a tap. A short flick still clears it. */
const SWIPE_PX = 8

function isAndroid() {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } }
  const platform = nav.userAgentData?.platform
  if (platform) return platform === 'Android'
  return /Android/i.test(navigator.userAgent)
}

/** Finger wins when the browser has already snapped scrollTop back to the scene. */
function gestureDir(fingerDy: number, scrollDy: number) {
  const finger = Math.abs(fingerDy) >= SWIPE_PX ? Math.sign(fingerDy) : 0
  const scrolled = Math.abs(scrollDy) >= 1 ? Math.sign(scrollDy) : 0
  if (finger && scrolled && finger !== scrolled) return finger
  if (scrolled) return scrolled
  return finger
}

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
  let startClientY = 0
  let lastClientY = 0
  let sawTouch = false
  let held = port.scrollTop
  let epoch = 0
  let stops: number[] = []

  if (isAndroid()) port.classList.add(ANDROID)

  const killTween = () => {
    const current = tween
    tween = null
    current?.kill()
  }

  const thaw = () => {
    port.style.overflow = ''
    port.style.scrollSnapType = ''
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

  const finish = () => {
    if (!dragging) return
    dragging = false
    pointerId = -1

    if (locked(port) || stops.length === 0) {
      release()
      return
    }

    const token = epoch
    const { origin, prev, next } = windowFor(stops, originIndex)
    const scrollDy = port.scrollTop - originY
    const fingerDy = startClientY - lastClientY
    const dir = gestureDir(fingerDy, scrollDy)
    const y = Math.min(next, Math.max(prev, port.scrollTop))
    const target = dir < 0 ? prev : dir > 0 ? next : origin

    holding = true
    port.style.overflow = 'hidden'
    port.style.scrollSnapType = 'none'
    // Flush before the fling is queued, or a short Android flick still plays
    // the mandatory snap (halfway, then back) over the settle tween.
    void port.offsetHeight
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
    pointerId = event.pointerId
    port.classList.add(COAST)
    port.style.scrollSnapType = 'none'
    // Coast has to be painted before this gesture's first move, or Android
    // keeps the mandatory snap it latched at the start.
    void port.offsetHeight
    stops = measureStops(port)
    originY = port.scrollTop
    originIndex = nearestIndex(stops, originY)
    startClientY = event.clientY
    lastClientY = event.clientY
    sawTouch = false
    held = originY
  }

  const onTouchStart = (event: TouchEvent) => {
    if (!dragging) return
    sawTouch = true
    const y = event.touches[0]?.clientY
    if (y != null) lastClientY = y
  }

  const onPointerMove = (event: PointerEvent) => {
    if (!dragging || event.pointerId !== pointerId) return
    lastClientY = event.clientY
  }

  const onTouchMove = (event: TouchEvent) => {
    if (!dragging) return
    const y = event.touches[0]?.clientY
    if (y != null) lastClientY = y
  }

  const onPointerUp = (event: PointerEvent) => {
    if (!dragging || event.pointerId !== pointerId || sawTouch) return
    lastClientY = event.clientY
    finish()
  }

  const onTouchEnd = (event: TouchEvent) => {
    const y = event.changedTouches[0]?.clientY
    if (y != null) lastClientY = y
    if (event.touches.length > 0) return
    finish()
  }

  const onScroll = () => {
    if (writing) return
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
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('touchend', onTouchEnd, { passive: true })
  window.addEventListener('touchcancel', onTouchEnd, { passive: true })

  return () => {
    killTween()
    thaw()
    port.classList.remove(COAST)
    port.classList.remove(ANDROID)
    port.removeEventListener('pointerdown', onPointerDown)
    port.removeEventListener('scroll', onScroll)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
    window.removeEventListener('touchcancel', onTouchEnd)
  }
}
