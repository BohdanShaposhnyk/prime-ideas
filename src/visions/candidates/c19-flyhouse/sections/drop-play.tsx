import { DropPlate } from './drop-plate'

export default function DropPlay() {
  return (
    <DropPlate
      drop="play"
      cue="02"
      title="Play"
      line="The arena docks on a steel bar."
      surtitle="Own the floor."
      labelledBy="fh-play-title"
    >
      {/* swap: cyber arena plate */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 70% 60%, color-mix(in srgb, #2a3a58 70%, transparent) 0%, transparent 55%),
            linear-gradient(180deg, #10141c 0%, #1a1214 40%, #0c1018 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, #c4a35a 22%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, #c4a35a 14%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: '42px 42px',
          maskImage:
            'linear-gradient(180deg, transparent 8%, black 30%, black 78%, transparent 100%)',
        }}
      />
      <div
        className="absolute top-[36%] left-[12%] h-px w-[70%]"
        style={{
          background:
            'linear-gradient(90deg, transparent, color-mix(in srgb, #e8b86d 50%, transparent), transparent)',
        }}
      />
    </DropPlate>
  )
}
