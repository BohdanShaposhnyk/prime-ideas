/** Crawlable head for https://primelounge.club/. Injected into index.html by Vite. */

export const SITE_ORIGIN = 'https://primelounge.club'
export const SITE_URL = `${SITE_ORIGIN}/`
export const SITE_TITLE = 'Prime Warsaw — gaming, karaoke, cinema, hookah, bar'
export const SITE_DESCRIPTION =
  'Prime Warsaw is a gaming lounge, cinema, karaoke, hookah, and bar in Warsaw and Wrocław. Visit Prime Mennica, Prime Mokotów, or Prime Wrocław tonight.'

export const COMPANY_NAME = 'Prime Cyber Lounge Sp. z o.o.'
/** Polish NIP, confirmed on the live footer, written as the VAT id. */
export const COMPANY_VAT_ID = 'PL5273090507'

const ORGANIZATION_ID = `${SITE_URL}#organization`

export const INSTAGRAMS = [
  {
    id: 'warsaw',
    handle: '@prime_warsaw',
    city: 'Warsaw',
    href: 'https://www.instagram.com/prime_warsaw/',
  },
  {
    id: 'wroclaw',
    handle: '@prime_wroclaw',
    city: 'Wrocław',
    href: 'https://www.instagram.com/prime_wroclaw/',
  },
] as const

export type SeoVenue = {
  id: 'mennica' | 'mokotow' | 'wroclaw'
  shortName: string
  name: string
  streetAddress: string
  addressLocality: string
  /** Present only when the postal code is already on the venue's map link. */
  postalCode?: string
  telephone: string
  telephoneLabel: string
  telegram: string
  instagram: (typeof INSTAGRAMS)[number]['href']
  latitude: number
  longitude: number
}

export const SEO_VENUES: SeoVenue[] = [
  {
    id: 'mennica',
    shortName: 'Mennica',
    name: 'Prime Mennica',
    streetAddress: 'Waliców 11',
    addressLocality: 'Warsaw',
    telephone: '+48530811888',
    telephoneLabel: '+48 530 811 888',
    telegram: 'https://t.me/primewarsaw',
    instagram: 'https://www.instagram.com/prime_warsaw/',
    latitude: 52.2341,
    longitude: 20.9927,
  },
  {
    id: 'mokotow',
    shortName: 'Mokotów',
    name: 'Prime Mokotów',
    streetAddress: 'Wincentego Rzymowskiego 53',
    addressLocality: 'Warsaw',
    postalCode: '02-697',
    telephone: '+48530822888',
    telephoneLabel: '+48 530 822 888',
    telegram: 'https://t.me/primemokotow',
    instagram: 'https://www.instagram.com/prime_warsaw/',
    latitude: 52.176772,
    longitude: 21.001543,
  },
  {
    id: 'wroclaw',
    shortName: 'Wrocław',
    name: 'Prime Wrocław',
    streetAddress: 'Plac Teatralny 6-8',
    addressLocality: 'Wrocław',
    postalCode: '50-051',
    telephone: '+48530881888',
    telephoneLabel: '+48 530 818 888',
    telegram: 'https://t.me/primewroclaw',
    instagram: 'https://www.instagram.com/prime_wroclaw/',
    latitude: 51.1057,
    longitude: 17.0324,
  },
]

const SAME_AS = [
  ...INSTAGRAMS.map((profile) => profile.href),
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
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<link rel="icon" href="/favicon.png" type="image/png" />`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    `<script type="application/ld+json">${json}</script>`,
  ].join('\n    ')
}
