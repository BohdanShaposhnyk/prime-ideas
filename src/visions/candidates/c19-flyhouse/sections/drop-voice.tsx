import { DropPlate } from './drop-plate'

export default function DropVoice() {
  return (
    <DropPlate
      drop="voice"
      cue="04"
      title="Voice"
      line="Two rooms. One chorus."
      surtitle="Take the room."
      labelledBy="fh-voice-title"
    >
      {/* swap: karaoke loft plate */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(90deg, #2a1418 0%, #4a1218 46%, #3a2418 54%, #1a1214 100%)
          `,
        }}
      />
      <div
        className="absolute inset-y-[12%] left-[18%] w-px"
        style={{
          background:
            'linear-gradient(180deg, transparent, #c4a35a, transparent)',
        }}
      />
      <div
        className="absolute inset-y-[12%] right-[18%] w-px"
        style={{
          background:
            'linear-gradient(180deg, transparent, #e8b86d, transparent)',
        }}
      />
      <div
        className="absolute top-[40%] left-[8%] h-[30%] w-[38%] rounded-full opacity-40 blur-3xl"
        style={{ background: '#8b3a22' }}
      />
      <div
        className="absolute top-[36%] right-[10%] h-[28%] w-[32%] rounded-full opacity-35 blur-3xl"
        style={{ background: '#c4a35a' }}
      />
    </DropPlate>
  )
}
