import { PartnerBands, type PartnerMark } from '@/site/bits/PartnerBands'
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

const rowA: PartnerMark[] = [
  { name: 'NAVI', src: navi },
  { name: 'FASTCUP' },
  { name: 'ROG', src: rog },
  { name: 'Logitech', src: logitech },
  { name: 'SENET', src: senet },
  { name: 'Steam', src: steam },
  { name: 'AMD', src: amd },
  { name: 'NVIDIA', src: nvidia },
]

const rowB: PartnerMark[] = [
  { name: 'AndaSeat' },
  { name: 'FANATEC' },
  { name: 'PlayStation', src: playstation },
  { name: 'LG Display', src: lg },
  { name: 'Microsoft', src: microsoft },
  { name: 'Syrve', src: syrve },
  { name: 'Viva Wallet' },
  { name: 'GlobalTips' },
]

export function Partners() {
  return <PartnerBands rows={[rowA, rowB]} />
}
