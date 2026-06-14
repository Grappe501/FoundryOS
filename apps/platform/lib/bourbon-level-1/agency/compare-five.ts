import { BOURBON_BOTTLES, getBottle, type BourbonBottle } from '../bottles';

export type BestUse = 'neat' | 'cocktail' | 'gifting' | 'collecting';

export type CompareRow = {
  slug: string;
  name: string;
  priceUsd: number;
  proof: number;
  age: string;
  mashbill: string;
  distillery: string;
  flavorProfile: string;
  availability: string;
  valueScore: number;
  bestUse: BestUse[];
};

function availabilityLabel(b: BourbonBottle): string {
  if (b.tags.includes('collector') && b.priceUsd >= 45) return 'Allocated / hunted';
  if (b.slug.includes('weller')) return 'Rare — lottery only';
  return 'Wide shelf availability';
}

function valueScore(b: BourbonBottle): number {
  let score = 70;
  if (b.tags.includes('value')) score += 15;
  if (b.proof >= 100 && b.priceUsd < 40) score += 10;
  if (b.ageYears && b.priceUsd < 50) score += 10;
  if (b.tags.includes('splurge') && b.priceUsd > 80) score -= 10;
  if (b.tags.includes('collector')) score -= 5;
  return Math.min(99, Math.max(40, score));
}

function bestUseFor(b: BourbonBottle): BestUse[] {
  const uses: BestUse[] = [];
  if (b.proof >= 100 || b.tags.includes('oak')) uses.push('neat');
  if (b.proof <= 95 || b.tags.includes('host')) uses.push('cocktail');
  if (b.tags.includes('host') || b.tags.includes('beginner')) uses.push('gifting');
  if (b.tags.includes('collector') || b.tags.includes('splurge')) uses.push('collecting');
  if (uses.length === 0) uses.push('neat');
  return uses;
}

export function compareBottles(slugs: string[]): CompareRow[] {
  return slugs
    .map((s) => getBottle(s))
    .filter(Boolean)
    .map((b) => ({
      slug: b!.slug,
      name: b!.name,
      priceUsd: b!.priceUsd,
      proof: b!.proof,
      age: b!.ageYears ? `${b!.ageYears} yr` : 'NAS',
      mashbill: b!.mashbill,
      distillery: b!.producerName,
      flavorProfile: b!.tags.filter((t) => ['sweet', 'spicy', 'fruity', 'oak', 'smoke'].includes(t)).join(', ') || 'balanced',
      availability: availabilityLabel(b!),
      valueScore: valueScore(b!),
      bestUse: bestUseFor(b!),
    }));
}

export const COMPARE_PRESETS: { id: string; label: string; slugs: string[] }[] = [
  { id: 'daily', label: 'Daily drinkers under $35', slugs: ['evan-williams-black', 'wild-turkey-101', 'makers-mark', 'larceny', 'four-roses-yellow'] },
  { id: 'wheated', label: 'Wheated showdown', slugs: ['makers-mark', 'larceny', 'weller-special-reserve', 'buffalo-trace', 'woodford-reserve'] },
  { id: 'high-proof', label: 'High proof education', slugs: ['wild-turkey-101', 'knob-creek-9', 'four-roses-single-barrel', 'old-forester-1920', 'bookers'] },
  { id: 'step-up', label: 'Step-up shelf ($40–65)', slugs: ['eagle-rare', 'russells-reserve-10', 'four-roses-single-barrel', 'knob-creek-9', 'michters-us1'] },
  { id: 'age-flight', label: 'Age statement flight', slugs: ['buffalo-trace', 'eagle-rare', 'knob-creek-9', 'russells-reserve-10', 'rhetoric-24'] },
  { id: 'craft-modern', label: 'Craft & modern Kentucky', slugs: ['new-riff-bourbon', 'wilderness-trail-bib', 'castle-key-bourbon', 'rabbit-hole-cavehill', 'peerless-bourbon'] },
  { id: 'craft-wheated', label: 'Craft wheated flight', slugs: ['wilderness-trail-bib', 'willett-pot-still', 'makers-mark', 'larceny', 'michters-us1'] },
  { id: 'value-blind', label: 'Blind value staples', slugs: ['evan-williams-black', 'old-forester-86', 'wild-turkey-101', 'four-roses-yellow', '1792-small-batch'] },
  { id: 'wheated-rye', label: 'Wheated vs high-rye', slugs: ['makers-mark', 'larceny', 'wild-turkey-101', 'four-roses-yellow', 'bulleit-bourbon'] },
  { id: 'splurge', label: 'Splurge & collector', slugs: ['bookers', 'old-forester-1920', 'rhetoric-24', 'eagle-rare', 'weller-special-reserve'] },
  { id: 'category-flight', label: 'Bourbon · rye · Tennessee', slugs: ['buffalo-trace', 'rittenhouse-rye', 'jack-daniels-old-no-7', 'bulleit-bourbon', 'bulleit-rye'] },
  { id: 'tennessee-duo', label: 'Tennessee showdown', slugs: ['jack-daniels-old-no-7', 'george-dickel-no-8', 'buffalo-trace', 'makers-mark', 'evan-williams-black'] },
  { id: 'rye-starter', label: 'Rye whiskey starter flight', slugs: ['rittenhouse-rye', 'wild-turkey-rye', 'old-overholt-bib', 'bulleit-rye', 'wild-turkey-101'] },
  { id: 'heaven-hill-ladder', label: 'Heaven Hill value ladder', slugs: ['evan-williams-black', 'evan-williams-bib', 'larceny', 'elijah-craig-small-batch', 'eagle-rare'] },
  { id: 'wild-turkey-ladder', label: 'Wild Turkey proof ladder', slugs: ['wild-turkey-101', 'russells-reserve-10', 'rare-breed', 'wild-turkey-rye', 'bookers'] },
  { id: 'craft-inventory', label: 'Craft inventory starter', slugs: ['green-river-kentucky-straight', 'new-riff-bourbon', 'castle-key-bourbon', 'log-still-diving-bell', 'jeptha-creed-bloody-butcher'] },
  { id: 'craft-splurge', label: 'Craft splurge compare', slugs: ['peerless-bourbon', 'blue-run-8-year', 'angels-envy-bourbon', 'bardstown-fusion-wheated', 'michters-us1'] },
  { id: 'finish-flight', label: 'Cask finish flight', slugs: ['buffalo-trace', 'woodford-double-oaked', 'angels-envy-bourbon', 'bardstown-fusion-wheated', 'woodford-reserve'] },
  { id: 'craft-rye', label: 'Craft rye flight', slugs: ['new-riff-rye', 'wilderness-trail-rye', 'rabbit-hole-boxergrail', 'michters-rye', 'rittenhouse-rye'] },
  { id: 'barton-proof', label: 'Barton 1792 proof ladder', slugs: ['1792-small-batch', '1792-bib', '1792-full-proof', 'wild-turkey-101', 'rare-breed'] },
];

export function allCompareSlugs(): { slug: string; name: string }[] {
  return BOURBON_BOTTLES.map((b) => ({ slug: b.slug, name: b.name }));
}
