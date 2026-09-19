import LookPlate from './look-plate'
import { LOOK_BY_ID } from './looks'

export default function LookPlay() {
  return <LookPlate look={LOOK_BY_ID.play} headingId="rs-play" />
}
