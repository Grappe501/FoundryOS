import { BOURBON_BOTTLES, type BourbonBottle } from '../bottles';

export type BourbonPersonality = {
  id: string;
  name: string;
  tagline: string;
  signals: string[];
  youEnjoy: string[];
  nextMoves: { label: string; href: string }[];
  bottleSlugs: string[];
};

export const BOURBON_PERSONALITIES: BourbonPersonality[] = [
  {
    id: 'hunter',
    name: 'The Hunter',
    tagline: 'You chase bottles, lotteries, and the pour nobody else found.',
    signals: ['Checks allocation lists', 'Knows MSRP vs secondary', 'Willing to drive for a drop'],
    youEnjoy: ['Eagle Rare when found at MSRP', 'Store pick single barrels', 'Weller hunt stories'],
    nextMoves: [{ label: 'Bourbon Economy', href: '/bourbon/economy' }, { label: 'Store Pick Academy', href: '/bourbon/store-picks' }],
    bottleSlugs: ['eagle-rare', 'weller-special-reserve', 'four-roses-single-barrel'],
  },
  {
    id: 'historian',
    name: 'The Historian',
    tagline: 'You care why Prohibition mattered before you care what proof it is.',
    signals: ['Reads DSP numbers', 'Visits distilleries for context', 'Loves timeline rabbit holes'],
    youEnjoy: ['Old Forester heritage', 'BiB expressions', 'Prohibition-era stories'],
    nextMoves: [{ label: 'World Lore timeline', href: '/bourbon/lore#lore-timeline' }, { label: 'History stories', href: '/bourbon/stories' }],
    bottleSlugs: ['old-forester-86', 'evan-williams-black', 'buffalo-trace'],
  },
  {
    id: 'tinkerer',
    name: 'The Tinkerer',
    tagline: 'Ice, water drops, glassware — you treat every pour as an experiment.',
    signals: ['Owns multiple glass types', 'Compares neat vs rocks', 'Uses the lab simulators'],
    youEnjoy: ['High proof with water', 'Pour impact experiments', 'Blind tasting games'],
    nextMoves: [{ label: 'Pour Impact Guide', href: '/bourbon/pour-guide' }, { label: 'Flavor Wheel', href: '/bourbon/flavor-wheel' }],
    bottleSlugs: ['wild-turkey-101', 'bookers', 'old-forester-1920'],
  },
  {
    id: 'collector',
    name: 'The Collector',
    tagline: 'Your shelf is a museum — empty bottles included.',
    signals: ['Tracks owned vs tasted', 'Age statements matter', 'Splurge bottles saved for occasions'],
    youEnjoy: ['Age statement pours', 'Limited releases', 'Producer deep dives'],
    nextMoves: [{ label: 'My Bourbon Shelf', href: '/bourbon/portfolio' }, { label: 'Producer Atlas', href: '/bourbon/producers' }],
    bottleSlugs: ['eagle-rare', 'rhetoric-24', 'michters-us1'],
  },
  {
    id: 'host',
    name: 'The Host',
    tagline: 'You buy bourbon so the room has a good time.',
    signals: ['Crowd-pleasers on hand', 'Cocktail-friendly proofs', 'Gift bottles in reserve'],
    youEnjoy: ["Maker's Mark", 'Woodford Reserve', 'Approachable wheated pours'],
    nextMoves: [{ label: 'Pairing Engine', href: '/bourbon/pairings' }, { label: 'What Should I Buy?', href: '/bourbon/what-should-i-buy' }],
    bottleSlugs: ['makers-mark', 'woodford-reserve', 'four-roses-yellow'],
  },
  {
    id: 'explorer',
    name: 'The Explorer',
    tagline: 'You want every mash bill, every house, every region.',
    signals: ['Brackets and blind games', 'Maps and trail dreams', 'No loyalty to one distillery'],
    youEnjoy: ['Variety flights', 'Kentucky map', 'Distillery wars'],
    nextMoves: [{ label: 'Compare 5 bottles', href: '/bourbon/compare' }, { label: 'Kentucky Map', href: '/bourbon/map' }],
    bottleSlugs: ['new-riff-bourbon', '1792-small-batch', 'bulleit-bourbon'],
  },
];

export function getPersonality(id: string): BourbonPersonality | undefined {
  return BOURBON_PERSONALITIES.find((p) => p.id === id);
}

export function inferPersonality(slugs: string[], activityHints: string[] = []): BourbonPersonality {
  const bottles = slugs.map((s) => BOURBON_BOTTLES.find((b) => b.slug === s)).filter(Boolean) as BourbonBottle[];
  const scores: Record<string, number> = {};
  for (const p of BOURBON_PERSONALITIES) scores[p.id] = 0;

  for (const b of bottles) {
    for (const p of BOURBON_PERSONALITIES) {
      if (p.bottleSlugs.includes(b.slug)) scores[p.id] += 2;
      if (b.tags.includes('collector')) scores.collector += 1;
      if (b.tags.includes('host')) scores.host += 1;
      if (b.tags.includes('value')) scores.explorer += 1;
    }
  }
  for (const h of activityHints) {
    if (h.includes('hunt') || h.includes('allocation')) scores.hunter += 3;
    if (h.includes('blind') || h.includes('game')) scores.tinkerer += 2;
    if (h.includes('story') || h.includes('lore')) scores.historian += 2;
  }

  const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return getPersonality(top?.[0] ?? 'explorer')!;
}

export function bottlesForPersonality(id: string): BourbonBottle[] {
  const p = getPersonality(id);
  if (!p) return [];
  return p.bottleSlugs.map((s) => BOURBON_BOTTLES.find((b) => b.slug === s)).filter(Boolean) as BourbonBottle[];
}
