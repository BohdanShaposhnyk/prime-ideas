import { useEffect, useRef } from 'react'
import { intersectsSnapPort, observeSnapPort } from '@/site/hooks/snap-in-view'
import { isCoarsePointer } from '@/site/hooks/media'
import { prefersReducedMotion, subscribeReducedMotion } from '@/site/lib/motion'

const TWO_PI = Math.PI * 2
/** Bitmap ceiling so a full-bleed grid does not camp on the GPU beside the carousel. */
const PIXEL_BUDGET = 1280 * 720 * 2

interface Dot {
  ax: number
  ay: number
  sx: number
  sy: number
  vx: number
  vy: number
  x: number
  y: number
}

export interface DotFieldProps {
  dotRadius?: number
  dotSpacing?: number
  cursorRadius?: number
  cursorForce?: number
  bulgeOnly?: boolean
  bulgeStrength?: number
  glowRadius?: number
  sparkle?: boolean
  waveAmplitude?: number
  gradientFrom?: string
  gradientTo?: string
  glowColor?: string
  className?: string
}

function pixelRatio(w: number, h: number): number {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const pixels = w * h * dpr * dpr
  if (pixels <= PIXEL_BUDGET) return dpr
  return dpr * Math.sqrt(PIXEL_BUDGET / pixels)
}

/**
 * React Bits dot grid.
 * The bitmap, the pointer listener, and the frame loop exist only while the
 * scene sits in the snap port. A still pointer paints once and stops.
 */
export default function DotField({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = 'rgba(168, 85, 247, 0.35)',
  gradientTo = 'rgba(180, 151, 207, 0.25)',
  glowColor = '#120F17',
  className = '',
}: DotFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    const coarse = isCoarsePointer()
    let reduced = prefersReducedMotion()
    let inView = false
    let tabVisible = document.visibilityState !== 'hidden'
    let dots: Dot[] = []
    let grad: CanvasGradient | null = null
    let raf = 0
    let resizeTimer = 0
    let frameCount = 0
    let engagement = 0
    let glowOpacity = 0
    let placed = false
    let sized = false
    const size = { w: 0, h: 0 }
    const mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 }

    const canRun = () => inView && tabVisible && !reduced

    const stop = () => {
      if (!raf) return
      cancelAnimationFrame(raf)
      raf = 0
    }

    const release = () => {
      stop()
      dots = []
      grad = null
      sized = false
      canvas.width = 1
      canvas.height = 1
    }

    const buildDots = (w: number, h: number) => {
      const step = dotRadius + dotSpacing
      if (step <= 0 || w < 2 || h < 2) {
        dots = []
        return
      }
      const cols = Math.floor(w / step)
      const rows = Math.floor(h / step)
      const padX = (w % step) / 2
      const padY = (h % step) / 2
      const next: Dot[] = new Array(rows * cols)
      let idx = 0
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2
          const ay = padY + row * step + step / 2
          next[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay }
        }
      }
      dots = next
    }

    const resize = () => {
      const rect = root.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      if (w < 2 || h < 2) return
      const dpr = pixelRatio(w, h)
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      size.w = w
      size.h = h
      grad = null
      sized = true
      buildDots(w, h)
    }

    const draw = () => {
      const { w, h } = size
      if (!sized || w < 2 || h < 2) return
      ctx.clearRect(0, 0, w, h)
      if (!grad) {
        grad = ctx.createLinearGradient(0, 0, w, h)
        grad.addColorStop(0, gradientFrom)
        grad.addColorStop(1, gradientTo)
      }
      ctx.globalAlpha = 1
      ctx.fillStyle = grad
      const rad = dotRadius / 2
      const t = frameCount * 0.02
      const wave = waveAmplitude
      ctx.beginPath()
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        let drawX = d.sx
        let drawY = d.sy
        if (wave > 0) {
          drawY += Math.sin(d.ax * 0.03 + t) * wave
          drawX += Math.cos(d.ay * 0.03 + t * 0.7) * wave * 0.5
        }
        let r = rad
        if (sparkle) {
          const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0
          if (hash % 100 < 3) r = rad * 1.8
        }
        ctx.moveTo(drawX + r, drawY)
        ctx.arc(drawX, drawY, r, 0, TWO_PI)
      }
      ctx.fill()

      if (glowOpacity > 0.02 && glowRadius > 0) {
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius)
        glow.addColorStop(0, glowColor)
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.globalAlpha = glowOpacity
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, TWO_PI)
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    const simulate = (): boolean => {
      const dx = mouse.prevX - mouse.x
      const dy = mouse.prevY - mouse.y
      const traveled = Math.hypot(dx, dy)
      mouse.speed += (traveled - mouse.speed) * 0.5
      if (mouse.speed < 0.001) mouse.speed = 0
      mouse.prevX = mouse.x
      mouse.prevY = mouse.y

      const target = Math.min(mouse.speed / 5, 1)
      engagement += (target - engagement) * 0.06
      if (engagement < 0.001) engagement = 0
      glowOpacity += (engagement - glowOpacity) * 0.08
      if (glowOpacity < 0.001) glowOpacity = 0

      const cr = cursorRadius
      const crSq = cr * cr
      const eng = engagement
      let energy = 0

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        const ox = mouse.x - d.ax
        const oy = mouse.y - d.ay
        const distSq = ox * ox + oy * oy
        const atRest = Math.abs(d.sx - d.ax) < 0.2 && Math.abs(d.sy - d.ay) < 0.2

        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq) || 0.0001
          if (bulgeOnly) {
            const falloff = 1 - dist / cr
            const push = falloff * falloff * bulgeStrength * eng
            const angle = Math.atan2(oy, ox)
            d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15
            d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15
          } else {
            const angle = Math.atan2(oy, ox)
            const move = (500 / dist) * (mouse.speed * cursorForce)
            d.vx += Math.cos(angle) * -move
            d.vy += Math.sin(angle) * -move
          }
          energy = 1
        } else if (bulgeOnly && !atRest) {
          d.sx += (d.ax - d.sx) * 0.1
          d.sy += (d.ay - d.sy) * 0.1
          energy = 1
        }

        if (!bulgeOnly) {
          d.vx *= 0.9
          d.vy *= 0.9
          d.x = d.ax + d.vx
          d.y = d.ay + d.vy
          d.sx += (d.x - d.sx) * 0.1
          d.sy += (d.y - d.sy) * 0.1
          if (Math.abs(d.vx) > 0.02 || Math.abs(d.vy) > 0.02 || !atRest) energy = 1
        }
      }

      if (waveAmplitude > 0 || sparkle) return true
      return mouse.speed > 0.01 || engagement > 0.01 || glowOpacity > 0.02 || energy > 0
    }

    const frame = () => {
      raf = 0
      if (!canRun()) return
      frameCount += 1
      const again = simulate()
      draw()
      if (again && canRun()) raf = requestAnimationFrame(frame)
    }

    const kick = () => {
      if (raf || !canRun()) return
      raf = requestAnimationFrame(frame)
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!canRun()) return
      const rect = root.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (!placed) {
        mouse.prevX = x
        mouse.prevY = y
        placed = true
      }
      mouse.x = x
      mouse.y = y
      kick()
    }

    const bindPointer = () => {
      if (coarse || reduced) return
      window.addEventListener('mousemove', onMouseMove, { passive: true })
    }

    const unbindPointer = () => {
      window.removeEventListener('mousemove', onMouseMove)
      placed = false
      mouse.x = -9999
      mouse.y = -9999
      mouse.prevX = -9999
      mouse.prevY = -9999
      mouse.speed = 0
      engagement = 0
      glowOpacity = 0
    }

    const arm = () => {
      resize()
      draw()
      if (!canRun()) return
      bindPointer()
      if (waveAmplitude > 0 || sparkle) kick()
    }

    const disarm = () => {
      unbindPointer()
      release()
    }

    const ro = new ResizeObserver(() => {
      if (!inView) return
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        if (!inView) return
        resize()
        draw()
      }, 80)
    })
    ro.observe(root)

    const stopWatch = observeSnapPort(root, (hit) => {
      if (hit === inView) return
      inView = hit
      if (hit) arm()
      else disarm()
    })

    const onVisibility = () => {
      tabVisible = document.visibilityState !== 'hidden'
      if (!inView) return
      if (tabVisible) {
        if (waveAmplitude > 0 || sparkle) kick()
      } else {
        stop()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const unsubMotion = subscribeReducedMotion((next) => {
      if (next === reduced) return
      reduced = next
      if (!inView) return
      stop()
      unbindPointer()
      if (reduced) {
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i]
          d.sx = d.ax
          d.sy = d.ay
          d.x = d.ax
          d.y = d.ay
          d.vx = 0
          d.vy = 0
        }
        draw()
      } else {
        bindPointer()
        if (waveAmplitude > 0 || sparkle) kick()
      }
    })

    canvas.width = 1
    canvas.height = 1
    inView = intersectsSnapPort(root)
    if (inView) arm()

    return () => {
      inView = false
      disarm()
      stopWatch()
      unsubMotion()
      ro.disconnect()
      window.clearTimeout(resizeTimer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [
    bulgeOnly,
    bulgeStrength,
    cursorForce,
    cursorRadius,
    dotRadius,
    dotSpacing,
    glowColor,
    glowRadius,
    gradientFrom,
    gradientTo,
    sparkle,
    waveAmplitude,
  ])

  return (
    <div ref={rootRef} className={`pointer-events-none relative size-full overflow-hidden ${className}`.trim()}>
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  )
}
