/**
 * Shared booking target. CloudFront 302s this host to https://senet.id/ and
 * drops the query string. Senet chooses the club inside the app, so a venue
 * id on the URL would not select one. The click event carries the venue.
 */
export const BOOKING_URL = 'https://prime.booking.enes.tech/'
