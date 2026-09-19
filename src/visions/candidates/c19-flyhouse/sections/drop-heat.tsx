import { DropPlate } from './drop-plate'

export default function DropHeat() {
  return (
    <DropPlate
      drop="heat"
      cue="01"
      title="Heat"
      line="Kitchen holds the first cue."
      surtitle="Hold the heat."
      labelledBy="fh-heat-title"
    >
      {/* swap: kitchen / bar plate */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 28% 72%, color-mix(in srgb, #8b3a22 70%, transparent) 0%, transparent 58%),
            radial-gradient(ellipse 50% 40% at 78% 30%, color-mix(in srgb, #e8b86d 28%, transparent) 0%, transparent 50%),
            linear-gradient(165deg, #2a1012 0%, #4a1218 38%, #8b3a22 72%, #1a0c0c 100%)
          `,
        }}
      />
      <div
        className="absolute inset-x-[10%] top-[18%] h-[2px] opacity-70"
        style={{
          background:
            'linear-gradient(90deg, transparent, #c4a35a 20%, #f3e6d0 50%, #c4a35a 80%, transparent)',
        }}
      />
      <div
        className="absolute right-[18%] bottom-[22%] h-[38%] w-[28%] rounded-full opacity-50 blur-2xl"
        style={{
          background: 'color-mix(in srgb, #e8b86d 55%, transparent)',
        }}
      />
    </DropPlate>
  )
}
