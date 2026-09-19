export const CAST_PLATES = [
  {
    id: 'hero',
    word: 'PRIME',
    caption: 'Still being set.',
    index: '00',
  },
  {
    id: 'play',
    word: 'PLAY',
    caption: 'The floor is live.',
    index: '01',
  },
  {
    id: 'screen',
    word: 'SCREEN',
    caption: 'A private cut.',
    index: '02',
  },
  {
    id: 'voice',
    word: 'VOICE',
    caption: 'Hold the note.',
    index: '03',
  },
  {
    id: 'heat',
    word: 'HEAT',
    caption: 'Stay in the ember.',
    index: '04',
  },
  {
    id: 'close',
    word: 'STAY',
    caption: 'The night is set.',
    index: '05',
  },
] as const

export type CastPlate = (typeof CAST_PLATES)[number]
export type CastPlateId = CastPlate['id']
