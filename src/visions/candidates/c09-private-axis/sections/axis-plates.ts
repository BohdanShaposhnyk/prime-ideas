/** Swap-ready steel plates for TiltedCard (palette CSS stand-ins). */
export const GAMING_PLATE = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0E1010"/>
        <stop offset="48%" stop-color="#141416"/>
        <stop offset="100%" stop-color="#101412"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#g)"/>
    <rect x="820" y="80" width="28" height="420" fill="#2A3A32" opacity="0.35"/>
    <rect x="0" y="0" width="1200" height="800" fill="none" stroke="#6F7378" stroke-opacity="0.25"/>
  </svg>`,
)}`

export const CINEMA_PLATE = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <defs>
      <radialGradient id="c" cx="50%" cy="42%" r="55%">
        <stop offset="0%" stop-color="#3A2A22"/>
        <stop offset="100%" stop-color="#0A0909"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="800" fill="#0A0909"/>
    <rect x="160" y="90" width="880" height="480" fill="url(#c)"/>
    <rect x="0" y="0" width="1200" height="800" fill="none" stroke="#B7A99A" stroke-opacity="0.22"/>
  </svg>`,
)}`

export const AXIS_GRID_ITEMS = [
  'AXIS',
  'PRIME',
  '',
  'MEMBER',
  'NIGHT',
  '',
  'RIGS',
  '',
  'GATE',
  'MIC',
  '',
  'LODGE',
  'BAR',
  '',
  'KITCHEN',
  'FLOOR',
  '',
  'TABLE',
  'SMOKE',
  '',
  'STEEL',
  'DOOR',
  '',
  'LATE',
  'WARSZAWA',
  '',
  'PRIVATE',
  '21:00',
]
