/** Crawlable head for https://primelounge.club/. Injected into index.html by Vite. */

import { t } from '../copy/translate.ts'

export const SITE_ORIGIN = 'https://primelounge.club'
export const SITE_URL = `${SITE_ORIGIN}/`
export const SITE_TITLE = t('seo.title')
export const SITE_DESCRIPTION = t('seo.description')

export const COMPANY_NAME = 'Prime Cyber Lounge Sp. z o.o.'
/** Polish NIP. The VAT id is the same number with the PL prefix. */
export const COMPANY_NIP = '5273090507'
export const COMPANY_VAT_ID = `PL${COMPANY_NIP}`

const ORGANIZATION_ID = `${SITE_URL}#organization`

export const INSTAGRAMS = [
  {
    id: 'warsaw' as const,
    handle: 'prime_warsaw',
    city: t('common.warsaw'),
    href: 'https://www.instagram.com/prime_warsaw/' as const,
  },
  {
    id: 'wroclaw' as const,
    handle: 'prime_wroclaw',
    city: t('common.wroclaw'),
    href: 'https://www.instagram.com/prime_wroclaw/' as const,
  },
]

export const TIKTOK = {
  label: t('basement.tiktok'),
  href: 'https://www.tiktok.com/@primelounge.club' as const,
}

export type SeoVenue = {
  id: 'mennica' | 'mokotow' | 'wroclaw'
  shortName: string
  name: string
  streetAddress: string
  addressLocality: string
  /** Published on the postal address when we have one. */
  postalCode?: string
  telephone: string
  telephoneLabel: string
  telegram: string
  instagram: (typeof INSTAGRAMS)[number]['href']
  /** Google listing id. The address link and the map embed both use it. */
  mapsCid: string
  latitude: number
  longitude: number
}

/** Same Google listing for a click and, with `output=embed`, for the iframe. */
export function mapsHref(cid: string, embed = false) {
  const embedFlag = embed ? '&output=embed' : ''
  return `https://www.google.com/maps?cid=${cid}&hl=${t('meta.lang')}&z=16${embedFlag}`
}

const VENUE_IDS = ['mennica', 'mokotow', 'wroclaw'] as const
type VenueId = (typeof VENUE_IDS)[number]

const VENUE_DATA: Record<
  VenueId,
  {
    telephone: string
    telegram: string
    instagram: (typeof INSTAGRAMS)[number]['href']
    mapsCid: string
    latitude: number
    longitude: number
    postalCode?: string
  }
> = {
  mennica: {
    telephone: '+48530811888',
    telegram: 'https://t.me/primewarsaw',
    instagram: 'https://www.instagram.com/prime_warsaw/',
    mapsCid: '14272506656234488151',
    latitude: 52.2341,
    longitude: 20.9927,
  },
  mokotow: {
    telephone: '+48530822888',
    telegram: 'https://t.me/primemokotow',
    instagram: 'https://www.instagram.com/prime_warsaw/',
    mapsCid: '8832738091500516673',
    latitude: 52.176772,
    longitude: 21.001543,
    postalCode: '02-697',
  },
  wroclaw: {
    telephone: '+48530881888',
    telegram: 'https://t.me/primewroclaw',
    instagram: 'https://www.instagram.com/prime_wroclaw/',
    mapsCid: '1448489213028860593',
    latitude: 51.1057,
    longitude: 17.0324,
    postalCode: '50-051',
  },
}

export const SEO_VENUES: SeoVenue[] = VENUE_IDS.map((id) => {
  const data = VENUE_DATA[id]
  return {
    id,
    shortName: t(`venues.${id}.shortName`),
    name: t(`venues.${id}.name`),
    streetAddress: t(`venues.${id}.street`),
    addressLocality: t(`venues.${id}.city`),
    telephoneLabel: t(`venues.${id}.phoneLabel`),
    ...data,
  }
})

const SAME_AS = [
  ...INSTAGRAMS.map((profile) => profile.href),
  TIKTOK.href,
  ...SEO_VENUES.map((venue) => venue.telegram),
]

function attr(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
}

function structuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: COMPANY_NAME,
        url: SITE_URL,
        logo: `${SITE_ORIGIN}/logo.png`,
        vatID: COMPANY_VAT_ID,
        sameAs: SAME_AS,
      },
      ...SEO_VENUES.map((venue) => ({
        '@type': 'EntertainmentBusiness',
        '@id': `${SITE_URL}#${venue.id}`,
        name: venue.name,
        url: `${SITE_URL}#${venue.id}`,
        telephone: venue.telephone,
        sameAs: [venue.instagram, venue.telegram],
        parentOrganization: { '@id': ORGANIZATION_ID },
        address: {
          '@type': 'PostalAddress',
          streetAddress: venue.streetAddress,
          addressLocality: venue.addressLocality,
          ...(venue.postalCode ? { postalCode: venue.postalCode } : {}),
          addressCountry: 'PL',
        },
        hasMap: mapsHref(venue.mapsCid),
        geo: {
          '@type': 'GeoCoordinates',
          latitude: venue.latitude,
          longitude: venue.longitude,
        },
      })),
    ],
  }
}

/** Tags injected before `</head>`. Social crawlers read this HTML and do not run JS. */
export function headMarkup() {
  const title = attr(SITE_TITLE)
  const description = attr(SITE_DESCRIPTION)
  const image = `${SITE_ORIGIN}/og.jpg`
  const json = JSON.stringify(structuredData()).replaceAll('<', '\\u003c')

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${SITE_URL}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${SITE_URL}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${attr(t('meta.ogLocale'))}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<link rel="icon" href="/favicon.png" type="image/png" />`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    `<script type="application/ld+json">${json}</script>`,
  ].join('\n    ')
}
