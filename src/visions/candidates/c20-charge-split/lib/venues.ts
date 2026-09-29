import barExt from '@/assets/c20/bar_ext.webp'
import danceNeon from '@/assets/c20/dance_neon.webp'
import barInterior from '@/assets/c20/bar_interior.webp'

export type Venue = {
  id: string
  shortName: string
  title: string
  address: string
  phone: string
  phoneLabel: string
  telegram: string
  lat?: number
  lng?: number
  appleMaps: string
  image: string
}

export const VENUES: Venue[] = [
  {
    id: 'mennica',
    shortName: 'Mennica',
    title: 'Prime Mennica',
    address: 'Waliców 11, Warsaw',
    phone: '+48530811888',
    phoneLabel: '+48 530 811 888',
    telegram: 'https://t.me/primewarsaw',
    appleMaps:
      'https://maps.apple.com/?address=Walic%C3%B3w%2011,%20Warsaw,%20Poland&q=Prime%20Cyber%20Lounge&t=m',
    image: barExt,
  },
  {
    id: 'mokotow',
    shortName: 'Mokotów',
    title: 'Prime Mokotów',
    address: 'Wincentego Rzymowskiego 53, Warsaw',
    phone: '+48530822888',
    phoneLabel: '+48 530 822 888',
    telegram: 'https://t.me/primemokotow',
    lat: 52.176772,
    lng: 21.001543,
    appleMaps:
      'https://maps.apple.com/?address=W%20Rzymowskiego%2053,%2002-697%20Warsaw,%20Poland&auid=16981973767258967933&ll=52.176772,21.001543&lsp=9902&q=Prime%20Cyber%20Lounge&t=m',
    image: danceNeon,
  },
  {
    id: 'wroclaw',
    shortName: 'Wrocław',
    title: 'Prime Wrocław',
    address: 'Plac Teatralny 6-8, Wrocław',
    phone: '+48530881888',
    phoneLabel: '+48 530 818 888',
    telegram: 'https://t.me/primewroclaw',
    lat: 51.1057,
    lng: 17.0324,
    appleMaps:
      'https://maps.apple.com/?address=Plac%20Teatralny%206-8,%2050-051%20Wroc%C5%82aw,%20Poland&ll=51.105700,17.032400&q=PRIME%20CYBER%20LOUNGE&t=m',
    image: barInterior,
  },
]
