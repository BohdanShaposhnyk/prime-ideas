import { DropPlate } from './drop-plate'

export default function DropScreen() {
  return (
    <DropPlate
      drop="screen"
      cue="03"
      title="Screen"
      line="A silent gate. Forty seats."
      surtitle="Kill the lights."
      labelledBy="fh-screen-title"
    >
      {/* swap: cinema gate plate */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 45% 35% at 50% 42%, color-mix(in srgb, #f3e6d0 22%, transparent) 0%, transparent 70%),
            linear-gradient(180deg, #0a0809 0%, #161012 48%, #070506 100%)
          `,
        }}
      />
      <div className="absolute inset-x-0 top-0 h-[18%] bg-[#070506]" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-[#070506]" />
      <div
        className="absolute top-[22%] left-1/2 h-[48%] w-[min(70%,22rem)] -translate-x-1/2"
        style={{
          background:
            'linear-gradient(180deg, color-mix(in srgb, #e8b86d 16%, transparent), transparent 80%)',
          clipPath: 'polygon(32% 0, 68% 0, 100% 100%, 0 100%)',
        }}
      />
    </DropPlate>
  )
}
