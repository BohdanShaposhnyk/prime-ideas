import Galaxy from '@/site/bits/Galaxy'

/** React Bits Hyperdrive — fast flight, six layers, the field shifts with the cursor. */
const HYPERDRIVE = {
  hueShift: 140,
  saturation: 0,
  density: 1.2,
  glowIntensity: 0.4,
  starSize: 1,
  flareIntensity: 1,
  twinkleIntensity: 0.3,
  starSpeed: 3,
  speed: 1,
  rotationSpeed: 0.1,
  layers: 6,
  direction: 'forward' as const,
  mouseRepulsion: false,
  repulsionStrength: 2,
  mouseInteraction: true,
  clickWarp: true,
  intro: true,
  transparent: true,
}

export function HeroGalaxy() {
  return <Galaxy {...HYPERDRIVE} renderScale={0.5} maxDpr={1.25} targetFps={30} />
}
