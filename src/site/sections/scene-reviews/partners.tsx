import { PartnerBands, type PartnerMark } from '@/site/bits/PartnerBands'
import { t } from '../../copy/translate'
import amd from '../../assets/partners/amd.svg'
import lg from '../../assets/partners/lg.svg'
import logitech from '../../assets/partners/logitech.svg'
import microsoft from '../../assets/partners/microsoft.svg'
import navi from '../../assets/partners/navi.svg'
import nvidia from '../../assets/partners/nvidia.svg'
import playstation from '../../assets/partners/playstation.svg'
import rog from '../../assets/partners/rog.png'
import senet from '../../assets/partners/senet.png'
import steam from '../../assets/partners/steam.svg'
import syrve from '../../assets/partners/syrve.png'

const logos = {
  navi,
  rog,
  logitech,
  senet,
  steam,
  amd,
  nvidia,
  playstation,
  lg,
  microsoft,
  syrve,
} as const

function row(id: 'a' | 'b'): PartnerMark[] {
  return t(`reviews.partners.${id}`).map((partner) => {
    const src = partner.id in logos ? logos[partner.id as keyof typeof logos] : undefined
    return src ? { name: partner.name, src } : { name: partner.name }
  })
}

const rowA = row('a')
const rowB = row('b')

export function Partners() {
  return <PartnerBands rows={[rowA, rowB]} />
}
