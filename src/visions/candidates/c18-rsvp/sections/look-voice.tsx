import LookPlate from './look-plate'
import { LOOK_BY_ID } from './looks'

export default function LookVoice() {
  return <LookPlate look={LOOK_BY_ID.voice} headingId="rs-voice" />
}
