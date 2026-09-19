import LookPlate from './look-plate'
import { LOOK_BY_ID } from './looks'

export default function LookTable() {
  return <LookPlate look={LOOK_BY_ID.table} headingId="rs-table" />
}
