import type { LoreDebate, LoreLegendaryObject } from '../../types';

export const BOURBON_DEBATES: LoreDebate[] = [
  {
    id: 'pappy-overrated',
    title: 'Is Pappy overrated?',
    campA: { label: 'Yes — hype juice', argument: 'Blind flights often favor $40 shelf staples. You are paying for story and scarcity, not magic in the glass.' },
    campB: { label: 'No — special when honest', argument: 'At MSRP, aged wheated stock is genuinely rare and complex. The problem is secondary, not the pour.' },
    whyPeopleReturn: 'Everyone knows someone who loves Pappy and someone who hates the line. Both have tasted evidence.',
    href: '/bourbon/detective/pappy-price',
  },
  {
    id: 'picks-vs-allocations',
    title: 'Are store picks better than allocations?',
    campA: { label: 'Picks win', argument: 'A great picker chose one winning barrel. You taste warehouse variance without the lottery line.' },
    campB: { label: 'Allocations win', argument: 'Official releases have QC and reputation. Picks are roulette with a markup.' },
    whyPeopleReturn: 'Both sides have a bottle on the shelf that proves their point.',
    href: '/bourbon/store-picks',
  },
  {
    id: 'age-too-much',
    title: 'Does age matter too much?',
    campA: { label: 'Age obsession hurts', argument: '15 years can go woody. Consumers chase numbers instead of flavor. NAS often beats over-oaked.' },
    campB: { label: 'Age is honest', argument: 'It is the only transparent metric on many labels. Time in oak is real — when used well, it delivers.' },
    whyPeopleReturn: 'Every shelf talk hits this wall eventually.',
    href: '/bourbon/myths',
  },
  {
    id: 'craft-marketing',
    title: 'Is craft bourbon mostly marketing?',
    campA: { label: 'Often yes', argument: 'Many "craft" brands source MGP or HH juice. DSP tells the truth. Story exceeds still.' },
    campB: { label: 'Not always', argument: 'True craft distilleries innovate on mash, fermentation, and non-chill filtering. Age is young but character is real.' },
    whyPeopleReturn: 'DSP numbers vs front-label romance — enthusiasts love detecting the difference.',
    href: '/bourbon/detective/dsp-numbers',
  },
];

export const BOURBON_LEGENDARY_OBJECTS: LoreLegendaryObject[] = [
  {
    id: 'pappy-23',
    name: 'Pappy Van Winkle 23 Year',
    tagline: 'The bottle that made waiting a lifestyle.',
    story: 'Not a review — a cultural object. Twenty-three years in wood, wheated mash, almost no supply.',
    chapters: [
      { heading: 'The pour', body: 'Deep oak, dried fruit, leather — when not over-oaked. Proof is gentle. It rewards patience in the glass too.' },
      { heading: 'The hunt', body: 'MSRP exists. Reality is lottery, connection, or secondary markup that makes economists weep.' },
      { heading: 'The lesson', body: 'Pappy 23 teaches scarcity economics faster than any business book.' },
    ],
    whyLegendary: 'Whether overrated or transcendent — everyone has an opinion. That is legendary.',
    href: '/bourbon/detective/pappy-price',
  },
  {
    id: 'old-fitz-decanter',
    name: 'Old Fitzgerald Decanter',
    tagline: 'When bourbon was bottled in crystal and given as inheritance.',
    story: 'Heaven Hill\'s heritage line — annual decanters that collectors display unopened and enthusiasts open once.',
    chapters: [
      { heading: 'The object', body: 'Heavy glass, seasonal art, BiB discipline inside — furniture and juice in one package.' },
      { heading: 'The collectors', body: 'Some hunt every year. Some say drink it — decanters are for tables, not attics.' },
    ],
    whyLegendary: 'The decanter wars: display vs drink. Both camps are passionate.',
  },
  {
    id: 'antique-collection',
    name: 'Antique Collection',
    tagline: 'Buffalo Trace\'s annual pilgrimage bottles — Stagg, Weller, Sazerac Rye.',
    story: 'One release window. Global frenzy. Campus juice at barrel proof.',
    chapters: [
      { heading: 'The lineup', body: 'George T. Stagg, William Larue Weller, Eagle Rare 17, Sazerac 18 — each a different personality.' },
      { heading: 'The culture', body: 'Release day is a holiday. Secondary prices define the year for bourbon Twitter.' },
    ],
    whyLegendary: 'The Antique Collection is bourbon\'s Super Bowl — whether you watch or play.',
    href: '/bourbon/economy',
  },
  {
    id: 'dusty-turkey-101',
    name: 'Dusty Wild Turkey 101',
    tagline: 'The bottle old heads swear tasted different — and they might be right.',
    story: 'Pre-2010s Turkey from a different era of production. Sealed bottles trade like artifacts.',
    chapters: [
      { heading: 'The myth', body: 'Rickhouse position, yeast, and era all changed. "Dusty" implies a time capsule pour.' },
      { heading: 'The blind test', body: 'Side-by-side with modern 101 — some palates find more oil, more spice, more length.' },
    ],
    whyLegendary: 'Dusty hunting is archaeology with ethanol.',
    href: '/bourbon/bottles/wild-turkey-101',
  },
];
