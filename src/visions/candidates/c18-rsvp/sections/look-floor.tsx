import LookPlate from './look-plate'
import { LOOK_BY_ID } from './looks'

export default function LookFloor() {
  return <LookPlate look={LOOK_BY_ID.floor} headingId="rs-floor" />
}
