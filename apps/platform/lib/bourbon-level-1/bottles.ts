/** Bourbon Level 1 — bottle catalog for buy engine, brackets, DNA, shelf builder */

export type MashbillStyle = 'high-rye' | 'wheated' | 'traditional' | 'corn-heavy';
export type WhiskeyBottleCategory = 'bourbon' | 'rye_whiskey' | 'tennessee_whiskey';
export type BottleTag =
  | 'sweet'
  | 'spicy'
  | 'fruity'
  | 'oak'
  | 'smoke'
  | 'value'
  | 'host'
  | 'beginner'
  | 'collector'
  | 'daily'
  | 'splurge'
  | 'craft';

export type BourbonBottle = {
  slug: string;
  name: string;
  producerSlug: string;
  producerName: string;
  priceUsd: number;
  proof: number;
  mashbill: MashbillStyle;
  category: WhiskeyBottleCategory;
  ageYears?: number;
  tags: BottleTag[];
  oneLiner: string;
  whyBuy: string;
};

function bourbon(b: Omit<BourbonBottle, 'category'>): BourbonBottle {
  return { ...b, category: 'bourbon' };
}

const BOURBON_CORE: BourbonBottle[] = [
  bourbon({ slug: 'evan-williams-black', name: 'Evan Williams Black Label', producerSlug: 'heaven-hill', producerName: 'Heaven Hill', priceUsd: 18, proof: 86, mashbill: 'traditional', tags: ['sweet', 'value', 'beginner', 'daily'], oneLiner: 'The textbook daily pour under $20.', whyBuy: 'Low risk, real bourbon flavor — perfect first bottle or house pour.' }),
  bourbon({ slug: 'old-forester-86', name: 'Old Forester 86 Proof', producerSlug: 'old-forester', producerName: 'Old Forester', priceUsd: 22, proof: 86, mashbill: 'traditional', tags: ['sweet', 'fruity', 'value', 'beginner'], oneLiner: 'Banana bread and caramel without the burn.', whyBuy: 'America\'s first bottled bourbon brand — approachable and historically interesting.' }),
  bourbon({ slug: 'wild-turkey-101', name: 'Wild Turkey 101', producerSlug: 'wild-turkey', producerName: 'Wild Turkey', priceUsd: 28, proof: 101, mashbill: 'high-rye', tags: ['spicy', 'oak', 'value', 'daily'], oneLiner: 'Bold rye spice at a fair price.', whyBuy: 'Teaches you what "high proof" means without wrecking your wallet.' }),
  bourbon({ slug: 'makers-mark', name: "Maker's Mark", producerSlug: 'makers-mark', producerName: "Maker's Mark", priceUsd: 32, proof: 90, mashbill: 'wheated', tags: ['sweet', 'beginner', 'host'], oneLiner: 'Soft wheat — the crowd-pleaser.', whyBuy: 'Guests who "don\'t like bourbon" often like this. Great for hosting.' }),
  bourbon({ slug: 'four-roses-yellow', name: 'Four Roses Yellow Label', producerSlug: 'four-roses', producerName: 'Four Roses', priceUsd: 24, proof: 80, mashbill: 'high-rye', tags: ['fruity', 'sweet', 'value', 'beginner'], oneLiner: 'Floral and gentle — an easy sipper.', whyBuy: 'Introduces high-rye fruit without heat.' }),
  bourbon({ slug: 'buffalo-trace', name: 'Buffalo Trace', producerSlug: 'buffalo-trace', producerName: 'Buffalo Trace', priceUsd: 30, proof: 90, mashbill: 'traditional', tags: ['sweet', 'oak', 'daily', 'collector'], oneLiner: 'Vanilla-caramel classic everyone recognizes.', whyBuy: 'Gateway to the Buffalo Trace universe — tastes like "bourbon" in one pour.' }),
  bourbon({ slug: 'woodford-reserve', name: 'Woodford Reserve', producerSlug: 'woodford-reserve', producerName: 'Woodford Reserve', priceUsd: 38, proof: 90.4, mashbill: 'traditional', tags: ['oak', 'sweet', 'host', 'daily'], oneLiner: 'Balanced, polished, giftable.', whyBuy: 'Looks serious on a shelf, tastes serious in a glass — ideal step-up bottle.' }),
  bourbon({ slug: 'knob-creek-9', name: 'Knob Creek 9 Year', producerSlug: 'jim-beam', producerName: 'Jim Beam', priceUsd: 38, proof: 100, mashbill: 'traditional', tags: ['oak', 'spicy', 'daily'], oneLiner: 'Age statement at 100 proof — real structure.', whyBuy: 'Shows what extra years and proof do to the same mash bill family.' }),
  bourbon({ slug: 'bulleit-bourbon', name: 'Bulleit Bourbon', producerSlug: 'four-roses', producerName: 'Four Roses (sourced)', priceUsd: 32, proof: 90, mashbill: 'high-rye', tags: ['spicy', 'daily', 'host'], oneLiner: 'High rye bite in a familiar bottle.', whyBuy: 'Rye-forward without going full rye whiskey — great cocktail base.' }),
  bourbon({ slug: 'larceny', name: 'Larceny', producerSlug: 'heaven-hill', producerName: 'Heaven Hill', priceUsd: 28, proof: 92, mashbill: 'wheated', tags: ['sweet', 'beginner', 'value'], oneLiner: 'Wheated softness from the Weller family tree.', whyBuy: 'Compare side-by-side with Maker\'s to taste wheat vs wheat.' }),
  bourbon({ slug: '1792-small-batch', name: '1792 Small Batch', producerSlug: 'barton-1792', producerName: 'Barton 1792', priceUsd: 32, proof: 93.7, mashbill: 'high-rye', tags: ['spicy', 'value', 'daily'], oneLiner: 'Punchy spice for the price.', whyBuy: 'Often overlooked — rye heat and caramel at shelf-staple pricing.' }),
  bourbon({ slug: 'eagle-rare', name: 'Eagle Rare 10 Year', producerSlug: 'buffalo-trace', producerName: 'Buffalo Trace', priceUsd: 45, proof: 90, mashbill: 'traditional', ageYears: 10, tags: ['oak', 'sweet', 'collector', 'daily'], oneLiner: 'Ten years of patience in every sip.', whyBuy: 'Age statement teaches you what time in oak actually tastes like.' }),
  bourbon({ slug: 'four-roses-single-barrel', name: 'Four Roses Single Barrel', producerSlug: 'four-roses', producerName: 'Four Roses', priceUsd: 45, proof: 100, mashbill: 'high-rye', tags: ['fruity', 'spicy', 'collector'], oneLiner: 'One barrel, one personality.', whyBuy: 'Introduces single-barrel variation — every bottle can differ slightly.' }),
  bourbon({ slug: 'old-forester-1920', name: 'Old Forester 1920', producerSlug: 'old-forester', producerName: 'Old Forester', priceUsd: 65, proof: 115, mashbill: 'traditional', tags: ['oak', 'spicy', 'splurge', 'collector'], oneLiner: 'Barrel-proof intensity with discipline.', whyBuy: 'High proof done right — chocolate, cherry, long finish.' }),
  bourbon({ slug: 'russells-reserve-10', name: "Russell's Reserve 10 Year", producerSlug: 'wild-turkey', producerName: 'Wild Turkey', priceUsd: 42, proof: 90, mashbill: 'high-rye', ageYears: 10, tags: ['oak', 'spicy', 'daily'], oneLiner: 'Turkey spice mellowed by a decade.', whyBuy: 'Wild Turkey character without the 101 punch — refined daily drinker.' }),
  bourbon({ slug: 'michters-us1', name: "Michter's US*1 Bourbon", producerSlug: 'michters', producerName: "Michter's", priceUsd: 48, proof: 91.4, mashbill: 'traditional', tags: ['sweet', 'oak', 'splurge', 'craft'], oneLiner: 'Silky texture, premium feel.', whyBuy: 'Shows how filtering and proof choices change mouthfeel.' }),
  bourbon({ slug: 'new-riff-bourbon', name: 'New Riff Bottled in Bond Bourbon', producerSlug: 'new-riff', producerName: 'New Riff', priceUsd: 42, proof: 100, mashbill: 'high-rye', tags: ['spicy', 'fruity', 'collector', 'craft'], oneLiner: 'Modern craft rye-forward bourbon.', whyBuy: 'Non-chill filtered BiB — transparency and fuller body.' }),
  bourbon({ slug: 'wilderness-trail-bib', name: 'Wilderness Trail BiB Bourbon', producerSlug: 'wilderness-trail', producerName: 'Wilderness Trail', priceUsd: 48, proof: 100, mashbill: 'wheated', tags: ['sweet', 'oak', 'craft', 'daily'], oneLiner: 'Wheated BiB from a science-forward craft campus.', whyBuy: 'Compare wheated craft against Maker\'s and Larceny with age and proof locked.' }),
  bourbon({ slug: 'willett-pot-still', name: 'Willett Pot Still Reserve', producerSlug: 'willett', producerName: 'Willett', priceUsd: 55, proof: 94, mashbill: 'wheated', tags: ['sweet', 'fruity', 'craft', 'collector'], oneLiner: 'Bardstown wheated craft — iconic bottle, soft spice.', whyBuy: 'Heritage revival distillery; tastes the Willett family lane without purple-top lottery prices.' }),
  bourbon({ slug: 'peerless-bourbon', name: 'Peerless Bourbon', producerSlug: 'peerless', producerName: 'Peerless', priceUsd: 65, proof: 107, mashbill: 'traditional', tags: ['sweet', 'oak', 'craft', 'splurge'], oneLiner: 'Louisville grain-to-glass — dark fruit and molasses.', whyBuy: 'Sweet mash, bottled-in-bond discipline from a fully vertical craft house.' }),
  bourbon({ slug: 'rabbit-hole-cavehill', name: 'Rabbit Hole Cavehill Bourbon', producerSlug: 'rabbit-hole', producerName: 'Rabbit Hole', priceUsd: 45, proof: 95, mashbill: 'high-rye', tags: ['spicy', 'fruity', 'craft', 'host'], oneLiner: 'Four-grain Louisville craft — honey and rye spice.', whyBuy: 'Modern mash bill literacy — not bourbon-by-numbers, but labeled honestly.' }),
  bourbon({ slug: 'bardstown-bourbon', name: 'Bardstown Bourbon Company Bourbon', producerSlug: 'bardstown', producerName: 'Bardstown Bourbon Co.', priceUsd: 42, proof: 93, mashbill: 'traditional', tags: ['oak', 'sweet', 'craft', 'daily'], oneLiner: 'Collaboration distillery baseline — polished daily craft.', whyBuy: 'Gateway to fusion finishes after you know the house straight bourbon profile.' }),
  bourbon({ slug: 'castle-key-bourbon', name: 'Castle & Key Restoration Release', producerSlug: 'castle-key', producerName: 'Castle & Key', priceUsd: 44, proof: 90, mashbill: 'traditional', tags: ['fruity', 'oak', 'craft', 'beginner'], oneLiner: 'Frankfort revival — floral, gentle, tour-worthy campus.', whyBuy: 'Historic site reborn; teaches craft without barrel-proof intimidation.' }),
  bourbon({ slug: 'bookers', name: "Booker's", producerSlug: 'jim-beam', producerName: 'Jim Beam', priceUsd: 90, proof: 126, mashbill: 'traditional', tags: ['oak', 'spicy', 'splurge', 'collector'], oneLiner: 'Uncut barrel proof — not for the faint.', whyBuy: 'The "wow" bottle that teaches heat vs flavor when you add water.' }),
  bourbon({ slug: 'weller-special-reserve', name: 'Weller Special Reserve', producerSlug: 'buffalo-trace', producerName: 'Buffalo Trace', priceUsd: 35, mashbill: 'wheated', proof: 90, tags: ['sweet', 'collector', 'value'], oneLiner: 'Pappy\'s approachable cousin.', whyBuy: 'Wheated profile at near-shelf pricing when you can find it.' }),
  bourbon({ slug: 'rhetoric-24', name: 'Orphan Barrel Rhetoric 24', producerSlug: 'jim-beam', producerName: 'Jim Beam', priceUsd: 150, proof: 90.8, mashbill: 'traditional', ageYears: 24, tags: ['oak', 'splurge', 'collector'], oneLiner: 'Deep oak — older isn\'t always better, but this is special.', whyBuy: 'Teaches the difference between age and over-oaking when you compare to younger pours.' }),
];

/** Rye + Tennessee — cross-category bottle flights */
const CROSS_CATEGORY_BOTTLES: BourbonBottle[] = [
  {
    slug: 'rittenhouse-rye',
    name: 'Rittenhouse Straight Rye Bottled in Bond',
    producerSlug: 'heaven-hill',
    producerName: 'Heaven Hill',
    priceUsd: 26,
    proof: 100,
    mashbill: 'high-rye',
    category: 'rye_whiskey',
    tags: ['spicy', 'value', 'daily', 'beginner'],
    oneLiner: 'BiB rye at 100 proof — the Manhattan backbone.',
    whyBuy: 'True rye whiskey (≥51% rye) — compare to high-rye bourbon and taste the legal line.',
  },
  {
    slug: 'wild-turkey-rye',
    name: 'Wild Turkey Straight Rye',
    producerSlug: 'wild-turkey',
    producerName: 'Wild Turkey',
    priceUsd: 28,
    proof: 81,
    mashbill: 'high-rye',
    category: 'rye_whiskey',
    tags: ['spicy', 'value', 'daily'],
    oneLiner: 'Turkey rye spice without 101 heat.',
    whyBuy: 'Same house, different category — rye vs bourbon side-by-side homework.',
  },
  {
    slug: 'old-overholt-bib',
    name: 'Old Overholt Straight Rye Bottled in Bond',
    producerSlug: 'jim-beam',
    producerName: 'Jim Beam (Overholt)',
    priceUsd: 22,
    proof: 100,
    mashbill: 'high-rye',
    category: 'rye_whiskey',
    tags: ['spicy', 'value', 'beginner', 'daily'],
    oneLiner: 'America\'s oldest rye brand — BiB at bar pricing.',
    whyBuy: 'Under $25 rye whiskey with age and proof locked — cocktail and sip baseline.',
  },
  {
    slug: 'bulleit-rye',
    name: 'Bulleit Straight Rye',
    producerSlug: 'four-roses',
    producerName: 'Bulleit (sourced)',
    priceUsd: 30,
    proof: 90,
    mashbill: 'high-rye',
    category: 'rye_whiskey',
    tags: ['spicy', 'host', 'daily'],
    oneLiner: 'High-rye mash marketed as rye whiskey — pepper forward.',
    whyBuy: 'Pair with Bulleit Bourbon — same brand, bourbon vs rye category contrast.',
  },
  {
    slug: 'jack-daniels-old-no-7',
    name: "Jack Daniel's Old No. 7",
    producerSlug: 'jack-daniel',
    producerName: "Jack Daniel's",
    priceUsd: 28,
    proof: 80,
    mashbill: 'traditional',
    category: 'tennessee_whiskey',
    tags: ['sweet', 'host', 'beginner', 'daily'],
    oneLiner: 'Charcoal-mellowed Tennessee — banana and caramel icon.',
    whyBuy: 'Tennessee whiskey category in a bottle — not bourbon label, same shelf conversation.',
  },
  {
    slug: 'george-dickel-no-8',
    name: 'George Dickel No. 8',
    producerSlug: 'george-dickel',
    producerName: 'George Dickel',
    priceUsd: 24,
    proof: 80,
    mashbill: 'traditional',
    category: 'tennessee_whiskey',
    tags: ['sweet', 'value', 'beginner', 'daily'],
    oneLiner: 'Cascade Hollow Tennessee — maple-soft daily pour.',
    whyBuy: 'Compare to Jack at same proof — two Tennessee houses, one category lesson.',
  },
];

export const BOURBON_BOTTLES: BourbonBottle[] = [...BOURBON_CORE, ...CROSS_CATEGORY_BOTTLES];

export function getBottle(slug: string): BourbonBottle | undefined {
  return BOURBON_BOTTLES.find((b) => b.slug === slug);
}

export function bottlesByProducer(producerSlug: string): BourbonBottle[] {
  return BOURBON_BOTTLES.filter((b) => b.producerSlug === producerSlug);
}

export const CRAFT_PRODUCER_SLUGS = [
  'new-riff',
  'michters',
  'wilderness-trail',
  'willett',
  'peerless',
  'rabbit-hole',
  'bardstown',
  'castle-key',
] as const;

export function craftBottles(): BourbonBottle[] {
  return BOURBON_BOTTLES.filter((b) => b.tags.includes('craft'));
}

export function bottlesByCategory(category: WhiskeyBottleCategory): BourbonBottle[] {
  return BOURBON_BOTTLES.filter((b) => b.category === category);
}
