import { DropPlate } from './drop-plate'

export default function DropCurtain() {
  return (
    <DropPlate
      drop="curtain"
      cue="05"
      title="Stay"
      line="The lodge keeps the last light."
      surtitle="Stay after."
      labelledBy="fh-curtain-title"
    >
      {/* swap: ember lodge / house to black */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              #3a0e14 0px,
              #4a1218 16px,
              #2a0a10 32px,
              #5c1822 48px
            )
          `,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 80%, color-mix(in srgb, #8b3a22 55%, transparent), transparent 70%)',
        }}
      />
      <div
        className="absolute inset-y-0 left-1/2 w-[min(42%,14rem)] -translate-x-1/2"
        style={{
          background:
            'linear-gradient(90deg, transparent, color-mix(in srgb, #070506 55%, transparent) 48%, transparent)',
        }}
      />
      <div
        className="absolute inset-x-[10%] bottom-[14%] h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, #c4a35a, transparent)',
        }}
      />
    </DropPlate>
  )
}
