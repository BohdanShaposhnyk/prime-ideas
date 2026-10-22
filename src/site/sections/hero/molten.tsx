import MoltenMetal from '@/site/bits/MoltenMetal'
import { MOLTEN_VIOLET } from './intro'

export function HeroMolten() {
  return (
    <MoltenMetal
      color1={MOLTEN_VIOLET.color1}
      color2={MOLTEN_VIOLET.color2}
      color3={MOLTEN_VIOLET.color3}
      colorMode="ember"
      speed={MOLTEN_VIOLET.speed}
      scale={3.4}
      detail={2}
      glow={1.45}
      coreSize={0.12}
      swirl={0.85}
      brightness={1.15}
      opacity={1}
      mouseInteraction={false}
      grain
      grainIntensity={0.04}
      renderScale={0.5}
      maxDpr={1.25}
      targetFps={30}
    />
  )
}
