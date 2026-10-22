/** MaskedHeading measures SVG glyphs from DOM boxes — wrong until Bebas is live. */
export async function waitForDisplayFont() {
  if (typeof document === 'undefined' || !document.fonts) return
  try {
    await document.fonts.load('400 120px "Bebas Neue"')
    await document.fonts.ready
  } catch {
    /* proceed with whatever is available */
  }
}
