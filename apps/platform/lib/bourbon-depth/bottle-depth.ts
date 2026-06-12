import { BOURBON_BOTTLES, getBottle, type BourbonBottle } from '../bourbon-level-1/bottles';
import type { BottleDepth } from './types';

const DEPTH: Record<string, Omit<BottleDepth, 'slug'>> = {
  'wild-turkey-101': {
    history:
      'Wild Turkey 101 launched as Austin Nichols\' flagship — Jimmy Russell insisted on 101 proof when the industry standard was 80. It became the teaching bottle for "what rye and proof feel like" without barrel-proof extremes.',
    howItsMade:
      'High-rye mash bill, column still to barrel, 6–8 years typical aging in Lawrenceburg rickhouses. No chill filtration on standard line — Russell wanted character over clarity.',
    distinguishingFacts: [
      '101 proof is the name — not a batch number',
      'Same mash bill family as Russell\'s Reserve — different age and proof',
      'Benchmark for Manhattan and Old Fashioned at home bars',
      'Often wins blind tastings against bottles 2× the price',
    ],
    pairings: [
      { occasion: 'BBQ ribs or brisket', why: 'Rye spice cuts smoke and fat.', serve: 'Neat or splash water' },
      { occasion: 'Bold cocktail night', why: 'Survives dilution — ice does not erase it.', serve: 'Old Fashioned, minimal sugar' },
      { occasion: 'Learning high proof', why: 'Stepping stone before barrel proof.', serve: 'Neat, compare to 86 proof pour' },
    ],
    whenBest: 'Cool evenings when you want character — not background music bourbon.',
    compareWith: ['russells-reserve-10', 'knob-creek-9', 'four-roses-single-barrel'],
    masterNote: 'Jimmy Russell: "If it ain\'t got character, it ain\'t Turkey."',
  },
  'makers-mark': {
    history:
      'First bottled 1958 with hand-dipped red wax — Bill Samuels Sr.\'s wheated rebellion against rye-forward family tradition. Became America\'s hospitality bourbon.',
    howItsMade:
      'Wheat replaces rye in mash bill. Char-3 barrel, 90 proof target, Loretto campus production. Consistency prioritized over age variation.',
    distinguishingFacts: [
      'Red wax still hand-dipped at Loretto',
      'Wheated — compare to Larceny and Weller in same flight',
      'No age statement by design since founding',
      'Private Select barrels available at higher proof',
    ],
    pairings: [
      { occasion: 'Dinner party opener', why: 'Converts whiskey skeptics.', serve: 'Neat or large cube' },
      { occasion: 'Soft cheese board', why: 'Wheat complements without overpowering.', serve: 'Room temperature' },
      { occasion: 'Summer patio', why: 'Lower heat than 100+ proof options.', serve: 'Highball with soda' },
    ],
    whenBest: 'When inclusion matters more than impressing purists.',
    compareWith: ['larceny', 'weller-special-reserve', 'woodford-reserve'],
    masterNote: 'Bill Samuels Sr. burned the old recipe — wheated was the point.',
  },
  'buffalo-trace': {
    history:
      'Namesake bottle of the world\'s most visited distillery — same campus as Eagle Rare, Weller, and Taylor lines. The $25 bottle that funds bourbon mythology.',
    howItsMade:
      'Buffalo Trace mash bill #1 — low rye, corn-forward. Aged ~4–8 years in Frankfort rickhouses. Blended for consistency across batches.',
    distinguishingFacts: [
      'Same campus as allocated siblings — different stock selection',
      'Gateway to understanding Buffalo Trace "house sweetness"',
      'Store picks exist — barrel variation lesson',
      'MSRP holds better than Eagle Rare — buy this first',
    ],
    pairings: [
      { occasion: 'First bourbon lesson', why: 'Textbook vanilla-caramel.', serve: 'Neat, rested 5 min' },
      { occasion: 'Bourbon and cola (no shame)', why: 'Sweet profile survives mixer.', serve: 'Highball' },
      { occasion: 'Book club / casual hang', why: 'Unpretentious, recognizable.', serve: 'Ice optional' },
    ],
    whenBest: 'Weeknight default — save allocated siblings for when you understand why they matter.',
    compareWith: ['eagle-rare', 'four-roses-yellow', 'woodford-reserve'],
    masterNote: 'Elmer T. Lee\'s single-barrel philosophy started here — same stock culture.',
  },
  'eagle-rare': {
    history:
      'Ten-year age statement bourbon from Buffalo Trace stock — created to show what extra time in #1 mash bill rickhouses produces. Allocation followed demand, not quality decline.',
    howItsMade:
      'Same low-rye mash as BT, minimum 10 years aging, 90 proof bottling. Selected barrels for oak integration beyond standard BT.',
    distinguishingFacts: [
      'Age statement transparent — trust builder for beginners',
      'MSRP ~$40 but allocation inflates shelf price',
      'Dark fruit and oak vs BT\'s vanilla lead',
      'Single barrel store picks exist — hunt worth it',
    ],
    pairings: [
      { occasion: 'Fall evening porch', why: 'Oak and leather match cool air.', serve: 'Neat' },
      { occasion: 'Dark chocolate dessert', why: 'Cocoa and oak align.', serve: 'Small pour' },
      { occasion: 'Post-BT step-up', why: 'Proves age matters in same house.', serve: 'Side-by-side with BT' },
    ],
    whenBest: 'When you want BT house style with more maturity — not more heat.',
    compareWith: ['buffalo-trace', 'russells-reserve-10', 'knob-creek-9'],
  },
  'four-roses-single-barrel': {
    history:
      'Single barrel program showcases one of ten Four Roses recipes — usually OBSV or OESK at stores. Brent Elliott era expanded private selection nationally.',
    howItsMade:
      'One barrel, one recipe, typically 100 proof. OBSV = fruity spice; OESK = mellow spice. Yeast code on label when specified.',
    distinguishingFacts: [
      'Recipe code matters — OBSV vs OESK taste different',
      'Barrel variation is the product — no two identical',
      '100 proof standard — enthusiast sweet spot',
      'Yellow Label is blend; this is personality',
    ],
    pairings: [
      { occasion: 'Blind tasting host', why: 'Barrel lottery creates debate.', serve: 'Neat, multiple glasses' },
      { occasion: 'Floral appetizer course', why: 'High-rye fruit complements.', serve: 'Neat' },
      { occasion: 'Yeast education night', why: 'Compare OBSV vs OESK if possible.', serve: 'Side-by-side' },
    ],
    whenBest: 'When you graduate from blends and want one-barrel truth.',
    compareWith: ['four-roses-yellow', 'wild-turkey-101', 'buffalo-trace'],
    masterNote: 'Brent Elliott: yeast is half the recipe.',
  },
  'evan-williams-black': {
    history:
      'Heaven Hill\'s volume king — named for Kentucky\'s first commercial distiller. Parker Beam era prioritized value without flavor apology.',
    howItsMade:
      'Heaven Hill traditional mash, column still, ~4–5 years aging. Bottled 86 proof for approachability and cocktail duty.',
    distinguishingFacts: [
      '#2 selling bourbon in America by volume',
      'Blind tasting giant-killer under $20',
      'Heaven Hill independent family ownership story',
      'Black label vs white label — proof and age differ',
    ],
    pairings: [
      { occasion: 'House cocktail batch', why: 'Quality vs price unbeatable.', serve: 'Old Fashioned, highball' },
      { occasion: 'Blind value tasting', why: 'Embarrasses snobs.', serve: 'Blind pour #1' },
      { occasion: 'Tailgate / casual', why: 'No guilt if spilled.', serve: 'Mixed' },
    ],
    whenBest: 'Daily drinker — save splurge bottles for weekends.',
    compareWith: ['old-forester-86', 'four-roses-yellow', 'larceny'],
    masterNote: 'Parker Beam kept juice flowing when rivals sold stock.',
  },
  'larceny': {
    history:
      'Named for John E. Fitzgerald\'s "larceny" of warehouse keys to steal wheated barrels — Heaven Hill\'s answer to Maker\'s at lower price.',
    howItsMade:
      'Wheated mash bill, Heaven Hill stock, 92 proof. Same wheat philosophy as Maker\'s with different barrel selection.',
    distinguishingFacts: [
      'Wheated — blind vs Maker\'s Mark',
      'Often $8–10 less than Maker\'s on shelf',
      'Cask strength and barrel proof variants exist',
      'Heaven Hill wheated without Weller allocation pain',
    ],
    pairings: [
      { occasion: 'Wheat comparison flight', why: 'Larceny vs Maker\'s vs Weller.', serve: 'Neat trio' },
      { occasion: 'Charcuterie', why: 'Soft wheat complements salt.', serve: 'Neat' },
      { occasion: 'Beginner wheated intro', why: 'Less hype than Weller.', serve: 'Neat' },
    ],
    whenBest: 'When you want wheat without Maker\'s price or Weller hunt.',
    compareWith: ['makers-mark', 'weller-special-reserve', 'evan-williams-black'],
  },
  'old-forester-1920': {
    history:
      'Whiskey Row series honors Prohibition era — 1920 style at 115 proof. Old Forester\'s banana-forward profile amplified by heat.',
    howItsMade:
      'Old Forester mash, higher proof bottling, selected barrels for cherry and chocolate depth under heat.',
    distinguishingFacts: [
      '115 proof — barrel strength territory without Booker\'s price',
      'Banana note polarizes — signature or flaw depending on palate',
      'Whiskey Row urban distillery story',
      'Compare to 86 proof OF to learn proof impact',
    ],
    pairings: [
      { occasion: 'Cold winter night', why: 'Heat warms; cherry notes reward.', serve: 'Neat + water optional' },
      { occasion: 'Dark steak', why: 'Proof cuts marbling fat.', serve: 'Neat' },
      { occasion: 'Proof education', why: 'Step before Booker\'s chaos.', serve: 'Compare to 86 proof OF' },
    ],
    whenBest: 'When you trust your palate with heat — not first-month bourbon.',
    compareWith: ['old-forester-86', 'bookers', 'knob-creek-9'],
  },
  'bookers': {
    history:
      'Booker Noe created barrel-proof bourbon for friends — uncut, unfiltered, handwritten batch notes. Invented the "barrel proof" enthusiast category.',
    howItsMade:
      'Jim Beam mash, 6–8 years, bottled at barrel proof (~120–130). No water added — heat is feature.',
    distinguishingFacts: [
      'Batch numbers handwritten — collector culture',
      'Add water — flavor opens, heat retreats',
      'Not a beginner bottle — palate trust required',
      'Fred and Freddie Noe continue legacy',
    ],
    pairings: [
      { occasion: 'Special occasion neat', why: 'Intensity as experience.', serve: 'Neat + water dropper' },
      { occasion: 'Post-dinner one pour', why: 'One glass lasts an hour.', serve: 'Small pour' },
      { occasion: 'Barrel proof graduation', why: 'After 101 and 115 proof training.', serve: 'Neat' },
    ],
    whenBest: 'Celebrations — one pour, not a session bottle.',
    compareWith: ['old-forester-1920', 'knob-creek-9', 'wild-turkey-101'],
    masterNote: 'Booker Noe: "It ain\'t bourbon if it ain\'t got no bite."',
  },
};

function defaultDepth(b: BourbonBottle): Omit<BottleDepth, 'slug'> {
  return {
    history: `${b.name} comes from ${b.producerName} — ${b.oneLiner} Foundry documents the pour, not the hype.`,
    howItsMade: `${b.mashbill} mash bill, ${b.proof} proof, ${b.ageYears ? `${b.ageYears} year age statement` : 'NAS (no age statement)'}. Production details vary by batch — taste teaches more than labels.`,
    distinguishingFacts: [b.whyBuy, `$${b.priceUsd} typical shelf — value context changes by region`, `${b.producerName} house style in a single bottle`, 'Use Compare Any Two for side-by-side charts'],
    pairings: [
      { occasion: 'Neat exploration', why: b.oneLiner, serve: 'Glencairn, rested' },
      { occasion: 'Cocktail base', why: b.tags.includes('host') ? 'Crowd-friendly profile' : 'Proof stands in mixers', serve: 'Old Fashioned or highball' },
    ],
    whenBest: b.tags.includes('daily') ? 'Weeknight pours and learning.' : b.tags.includes('splurge') ? 'Special occasions — savor slowly.' : 'When your palate is ready for this profile.',
    compareWith: BOURBON_BOTTLES.filter((x) => x.slug !== b.slug && x.mashbill === b.mashbill).slice(0, 3).map((x) => x.slug),
  };
}

export function getBottleDepth(slug: string): BottleDepth | undefined {
  const b = getBottle(slug);
  if (!b) return undefined;
  const extra = DEPTH[slug] ?? defaultDepth(b);
  return { slug, ...extra };
}

export function listBottleDepths(): BottleDepth[] {
  return BOURBON_BOTTLES.map((b) => getBottleDepth(b.slug)!);
}
