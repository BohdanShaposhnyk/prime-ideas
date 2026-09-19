import LookPlate from './look-plate'
import { LOOK_BY_ID } from './looks'

export default function Hero() {
  return <LookPlate look={LOOK_BY_ID.hero} headingId="rs-hero" as="h1" />
}
