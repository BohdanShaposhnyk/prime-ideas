export type LookId =
  | 'hero'
  | 'floor'
  | 'play'
  | 'screen'
  | 'voice'
  | 'ember'
  | 'table'

export type LookTone = 'light' | 'dark'

export type Look = {
  id: LookId
  index: string
  kicker: string
  word: string
  italic: string
  caption: string
  rail: string
  cta: string
  tone: LookTone
  field: string
  ink: string
  mute: string
  chrome: string
  accent: string
  /** Layered CSS for the swap-ready visual plane. */
  wash: string
}

export const LOOKS: Look[] = [
  {
    id: 'hero',
    index: '00',
    kicker: 'Warsaw',
    word: 'Prime',
    italic: 'RSVP',
    caption: 'The night, indexed.',
    rail: 'A private house. Six rooms. One list.',
    cta: 'Arrive dressed.',
    tone: 'light',
    field: '#F3E6D4',
    ink: '#16120F',
    mute: '#8A7A6A',
    chrome: '#C4B8A8',
    accent: '#C45A28',
    wash: `
      radial-gradient(ellipse 90% 70% at 12% 18%, #FFF7EE 0%, transparent 58%),
      radial-gradient(ellipse 55% 80% at 88% 72%, #E4D5C0 0%, transparent 62%),
      linear-gradient(118deg, transparent 38%, color-mix(in srgb, #FFF7EE 42%, transparent) 49%, transparent 61%),
      linear-gradient(180deg, #F8EFE3 0%, #F3E6D4 42%, #E8D4BC 100%)
    `,
  },
  {
    id: 'floor',
    index: '01',
    kicker: 'Lounge',
    word: 'Floor',
    italic: 'open',
    caption: 'Low light. Long pour.',
    rail: 'The house receives you — stone, wood, a quiet bar.',
    cta: 'Take a seat.',
    tone: 'light',
    field: '#EDE0CE',
    ink: '#1A1410',
    mute: '#7A6B5C',
    chrome: '#C4B8A8',
    accent: '#C45A28',
    wash: `
      radial-gradient(ellipse 70% 50% at 70% 88%, color-mix(in srgb, #C45A28 28%, transparent) 0%, transparent 58%),
      radial-gradient(ellipse 80% 55% at 8% 30%, #F7EDE0 0%, transparent 52%),
      linear-gradient(90deg, #E8D4BC 0%, #EDE0CE 45%, #DCC8B0 100%)
    `,
  },
  {
    id: 'play',
    index: '02',
    kicker: 'Arena',
    word: 'Play',
    italic: 'live',
    caption: 'Cool steel. Warm hands.',
    rail: 'Stations glow. The night competes in quiet.',
    cta: 'Book a rig.',
    tone: 'dark',
    field: '#1A1612',
    ink: '#F3E6D4',
    mute: '#8A8278',
    chrome: '#C4B8A8',
    accent: '#7A8CA0',
    wash: `
      radial-gradient(ellipse 50% 60% at 78% 22%, color-mix(in srgb, #3D4A5C 55%, transparent) 0%, transparent 58%),
      radial-gradient(ellipse 70% 45% at 18% 80%, color-mix(in srgb, #C45A28 18%, transparent) 0%, transparent 50%),
      linear-gradient(165deg, #221E1A 0%, #1A1612 48%, #12100E 100%)
    `,
  },
  {
    id: 'screen',
    index: '03',
    kicker: 'Cinema',
    word: 'Screen',
    italic: 'dark',
    caption: 'One beam. Soft seats.',
    rail: 'A private cut of the night — projected, not posted.',
    cta: 'Hold a row.',
    tone: 'dark',
    field: '#2A1418',
    ink: '#F3E6D4',
    mute: '#A89088',
    chrome: '#C4B8A8',
    accent: '#E8B4C0',
    wash: `
      radial-gradient(ellipse 85% 40% at 50% 8%, color-mix(in srgb, #F3E6D4 16%, transparent) 0%, transparent 55%),
      radial-gradient(ellipse 60% 70% at 92% 70%, color-mix(in srgb, #C45A28 22%, transparent) 0%, transparent 58%),
      linear-gradient(180deg, #3A1C22 0%, #2A1418 52%, #140A0C 100%)
    `,
  },
  {
    id: 'voice',
    index: '04',
    kicker: 'Karaoke',
    word: 'Voice',
    italic: 'yours',
    caption: 'A room that listens.',
    rail: 'Private booths. A mic. The list is short.',
    cta: 'Take the mic.',
    tone: 'light',
    field: '#F0D8D4',
    ink: '#1A1214',
    mute: '#8A6E70',
    chrome: '#C4B8A8',
    accent: '#C45A28',
    wash: `
      radial-gradient(ellipse 40% 90% at 22% 50%, color-mix(in srgb, #E8B4C0 45%, transparent) 0%, transparent 62%),
      radial-gradient(ellipse 70% 50% at 88% 18%, #FFF4F0 0%, transparent 50%),
      linear-gradient(200deg, #F7E4E0 0%, #F0D8D4 48%, #E0C4C0 100%)
    `,
  },
  {
    id: 'ember',
    index: '05',
    kicker: 'Hookah',
    word: 'Ember',
    italic: 'slow',
    caption: 'Heat that stays.',
    rail: 'Coal, hush, a longer hour.',
    cta: 'Stay later.',
    tone: 'dark',
    field: '#1C1410',
    ink: '#F3E6D4',
    mute: '#A89078',
    chrome: '#C4B8A8',
    accent: '#C45A28',
    wash: `
      radial-gradient(ellipse 55% 55% at 64% 58%, color-mix(in srgb, #C45A28 42%, transparent) 0%, transparent 58%),
      radial-gradient(ellipse 40% 30% at 64% 58%, color-mix(in srgb, #F0D4A8 22%, transparent) 0%, transparent 42%),
      linear-gradient(150deg, #2A1C14 0%, #1C1410 55%, #120E0C 100%)
    `,
  },
  {
    id: 'table',
    index: '06',
    kicker: 'Kitchen',
    word: 'Table',
    italic: 'late',
    caption: 'The list is closed.',
    rail: 'Eat. The stack is complete.',
    cta: 'RSVP.',
    tone: 'light',
    field: '#FFF7EE',
    ink: '#16120F',
    mute: '#8A7A6A',
    chrome: '#C4B8A8',
    accent: '#C45A28',
    wash: `
      radial-gradient(ellipse 80% 50% at 50% 100%, color-mix(in srgb, #C45A28 16%, transparent) 0%, transparent 55%),
      radial-gradient(ellipse 60% 40% at 10% 10%, #FFFFFF 0%, transparent 48%),
      linear-gradient(180deg, #FFF7EE 0%, #F3E6D4 60%, #E4D5C0 100%)
    `,
  },
]

export const LOOK_BY_ID = Object.fromEntries(LOOKS.map((look) => [look.id, look])) as Record<
  LookId,
  Look
>
