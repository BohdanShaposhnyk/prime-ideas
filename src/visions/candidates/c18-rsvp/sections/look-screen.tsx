import LookPlate from './look-plate'
import { LOOK_BY_ID } from './looks'

export default function LookScreen() {
  return <LookPlate look={LOOK_BY_ID.screen} headingId="rs-screen" />
}
