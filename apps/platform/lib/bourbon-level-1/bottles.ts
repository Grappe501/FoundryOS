/** Bourbon Level 1 — bottle catalog for buy engine, brackets, DNA, shelf builder */

export type MashbillStyle = 'high-rye' | 'wheated' | 'traditional' | 'corn-heavy';
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
  | 'splurge';

export type BourbonBottle = {
  slug: string;
  name: string;
  producerSlug: string;
  producerName: string;
  priceUsd: number;
  proof: number;
  mashbill: MashbillStyle;
  ageYears?: number;
  tags: BottleTag[];
  oneLiner: string;
  whyBuy: string;
};

export const BOURBON_BOTTLES: BourbonBottle[] = [
  { slug: 'evan-williams-black', name: 'Evan Williams Black Label', producerSlug: 'heaven-hill', producerName: 'Heaven Hill', priceUsd: 18, proof: 86, mashbill: 'traditional', tags: ['sweet', 'value', 'beginner', 'daily'], oneLiner: 'The textbook daily pour under $20.', whyBuy: 'Low risk, real bourbon flavor — perfect first bottle or house pour.' },
  { slug: 'old-forester-86', name: 'Old Forester 86 Proof', producerSlug: 'old-forester', producerName: 'Old Forester', priceUsd: 22, proof: 86, mashbill: 'traditional', tags: ['sweet', 'fruity', 'value', 'beginner'], oneLiner: 'Banana bread and caramel without the burn.', whyBuy: 'America\'s first bottled bourbon brand — approachable and historically interesting.' },
  { slug: 'wild-turkey-101', name: 'Wild Turkey 101', producerSlug: 'wild-turkey', producerName: 'Wild Turkey', priceUsd: 28, proof: 101, mashbill: 'high-rye', tags: ['spicy', 'oak', 'value', 'daily'], oneLiner: 'Bold rye spice at a fair price.', whyBuy: 'Teaches you what "high proof" means without wrecking your wallet.' },
  { slug: 'makers-mark', name: "Maker's Mark", producerSlug: 'makers-mark', producerName: "Maker's Mark", priceUsd: 32, proof: 90, mashbill: 'wheated', tags: ['sweet', 'beginner', 'host'], oneLiner: 'Soft wheat — the crowd-pleaser.', whyBuy: 'Guests who "don\'t like bourbon" often like this. Great for hosting.' },
  { slug: 'four-roses-yellow', name: 'Four Roses Yellow Label', producerSlug: 'four-roses', producerName: 'Four Roses', priceUsd: 24, proof: 80, mashbill: 'high-rye', tags: ['fruity', 'sweet', 'value', 'beginner'], oneLiner: 'Floral and gentle — an easy sipper.', whyBuy: 'Introduces high-rye fruit without heat.' },
  { slug: 'buffalo-trace', name: 'Buffalo Trace', producerSlug: 'buffalo-trace', producerName: 'Buffalo Trace', priceUsd: 30, proof: 90, mashbill: 'traditional', tags: ['sweet', 'oak', 'daily', 'collector'], oneLiner: 'Vanilla-caramel classic everyone recognizes.', whyBuy: 'Gateway to the Buffalo Trace universe — tastes like "bourbon" in one pour.' },
  { slug: 'woodford-reserve', name: 'Woodford Reserve', producerSlug: 'woodford-reserve', producerName: 'Woodford Reserve', priceUsd: 38, proof: 90.4, mashbill: 'traditional', tags: ['oak', 'sweet', 'host', 'daily'], oneLiner: 'Balanced, polished, giftable.', whyBuy: 'Looks serious on a shelf, tastes serious in a glass — ideal step-up bottle.' },
  { slug: 'knob-creek-9', name: 'Knob Creek 9 Year', producerSlug: 'jim-beam', producerName: 'Jim Beam', priceUsd: 38, proof: 100, mashbill: 'traditional', tags: ['oak', 'spicy', 'daily'], oneLiner: 'Age statement at 100 proof — real structure.', whyBuy: 'Shows what extra years and proof do to the same mash bill family.' },
  { slug: 'bulleit-bourbon', name: 'Bulleit Bourbon', producerSlug: 'four-roses', producerName: 'Four Roses (sourced)', priceUsd: 32, proof: 90, mashbill: 'high-rye', tags: ['spicy', 'daily', 'host'], oneLiner: 'High rye bite in a familiar bottle.', whyBuy: 'Rye-forward without going full rye whiskey — great cocktail base.' },
  { slug: 'larceny', name: 'Larceny', producerSlug: 'heaven-hill', producerName: 'Heaven Hill', priceUsd: 28, proof: 92, mashbill: 'wheated', tags: ['sweet', 'beginner', 'value'], oneLiner: 'Wheated softness from the Weller family tree.', whyBuy: 'Compare side-by-side with Maker\'s to taste wheat vs wheat.' },
  { slug: '1792-small-batch', name: '1792 Small Batch', producerSlug: 'barton-1792', producerName: 'Barton 1792', priceUsd: 32, proof: 93.7, mashbill: 'high-rye', tags: ['spicy', 'value', 'daily'], oneLiner: 'Punchy spice for the price.', whyBuy: 'Often overlooked — rye heat and caramel at shelf-staple pricing.' },
  { slug: 'eagle-rare', name: 'Eagle Rare 10 Year', producerSlug: 'buffalo-trace', producerName: 'Buffalo Trace', priceUsd: 45, proof: 90, mashbill: 'traditional', ageYears: 10, tags: ['oak', 'sweet', 'collector', 'daily'], oneLiner: 'Ten years of patience in every sip.', whyBuy: 'Age statement teaches you what time in oak actually tastes like.' },
  { slug: 'four-roses-single-barrel', name: 'Four Roses Single Barrel', producerSlug: 'four-roses', producerName: 'Four Roses', priceUsd: 45, proof: 100, mashbill: 'high-rye', tags: ['fruity', 'spicy', 'collector'], oneLiner: 'One barrel, one personality.', whyBuy: 'Introduces single-barrel variation — every bottle can differ slightly.' },
  { slug: 'old-forester-1920', name: 'Old Forester 1920', producerSlug: 'old-forester', producerName: 'Old Forester', priceUsd: 65, proof: 115, mashbill: 'traditional', tags: ['oak', 'spicy', 'splurge', 'collector'], oneLiner: 'Barrel-proof intensity with discipline.', whyBuy: 'High proof done right — chocolate, cherry, long finish.' },
  { slug: 'russells-reserve-10', name: "Russell's Reserve 10 Year", producerSlug: 'wild-turkey', producerName: 'Wild Turkey', priceUsd: 42, proof: 90, mashbill: 'high-rye', ageYears: 10, tags: ['oak', 'spicy', 'daily'], oneLiner: 'Turkey spice mellowed by a decade.', whyBuy: 'Wild Turkey character without the 101 punch — refined daily drinker.' },
  { slug: 'michters-us1', name: "Michter's US*1 Bourbon", producerSlug: 'michters', producerName: "Michter's", priceUsd: 48, proof: 91.4, mashbill: 'traditional', tags: ['sweet', 'oak', 'splurge'], oneLiner: 'Silky texture, premium feel.', whyBuy: 'Shows how filtering and proof choices change mouthfeel.' },
  { slug: 'new-riff-bourbon', name: 'New Riff Bourbon', producerSlug: 'new-riff', producerName: 'New Riff', priceUsd: 42, proof: 100, mashbill: 'high-rye', tags: ['spicy', 'fruity', 'collector'], oneLiner: 'Modern craft rye-forward bourbon.', whyBuy: 'Non-chill filtered — fuller body, brighter fruit.' },
  { slug: 'bookers', name: "Booker's", producerSlug: 'jim-beam', producerName: 'Jim Beam', priceUsd: 90, proof: 126, mashbill: 'traditional', tags: ['oak', 'spicy', 'splurge', 'collector'], oneLiner: 'Uncut barrel proof — not for the faint.', whyBuy: 'The "wow" bottle that teaches heat vs flavor when you add water.' },
  { slug: 'weller-special-reserve', name: 'Weller Special Reserve', producerSlug: 'buffalo-trace', producerName: 'Buffalo Trace', priceUsd: 35, mashbill: 'wheated', proof: 90, tags: ['sweet', 'collector', 'value'], oneLiner: 'Pappy\'s approachable cousin.', whyBuy: 'Wheated profile at near-shelf pricing when you can find it.' },
  { slug: 'rhetoric-24', name: 'Orphan Barrel Rhetoric 24', producerSlug: 'jim-beam', producerName: 'Jim Beam', priceUsd: 150, proof: 90.8, mashbill: 'traditional', ageYears: 24, tags: ['oak', 'splurge', 'collector'], oneLiner: 'Deep oak — older isn\'t always better, but this is special.', whyBuy: 'Teaches the difference between age and over-oaking when you compare to younger pours.' },
];

export function getBottle(slug: string): BourbonBottle | undefined {
  return BOURBON_BOTTLES.find((b) => b.slug === slug);
}

export function bottlesByProducer(producerSlug: string): BourbonBottle[] {
  return BOURBON_BOTTLES.filter((b) => b.producerSlug === producerSlug);
}
