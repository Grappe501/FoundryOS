/** Curated tasting flights for Level 2 Tasting Lab */

export type TastingFlight = {
  id: string;
  title: string;
  tagline: string;
  variable: string;
  bottleSlugs: string[];
  steps: string[];
  whatToNotice: string;
  academySlug?: string;
};

export const TASTING_FLIGHTS: TastingFlight[] = [
  {
    id: 'mashbill-triangle',
    title: 'Mash bill triangle',
    tagline: 'Traditional · high-rye · wheated — same session, three personalities.',
    variable: 'Mash bill style (proof matched ~90 when possible)',
    bottleSlugs: ['buffalo-trace', 'wild-turkey-101', 'makers-mark'],
    steps: [
      'Pour ½ oz each — Buffalo Trace (traditional), WT101 (high-rye), Maker\'s (wheated).',
      'Nose at lip distance — one word per pour before tasting.',
      'Sip small — note sweet vs spice balance on palate.',
      'Rank by preference — defend #1 in one sentence using grain, not price.',
    ],
    whatToNotice: 'Wheated softens arrival; high-rye lifts finish spice; traditional sits corn-sweet in the middle.',
    academySlug: 'mash-bill-in-the-mouth',
  },
  {
    id: 'wheated-duel',
    title: 'Wheated duel',
    tagline: 'Maker\'s vs Larceny vs Weller — wheat family tree without lottery prices.',
    variable: 'Wheated mash — price and age may differ',
    bottleSlugs: ['makers-mark', 'larceny', 'weller-special-reserve'],
    steps: [
      'Line up three wheated pours — add water on side.',
      'Focus on texture: bread, honey, soft spice vs flat sweetness.',
      'Note which reads most "host-friendly" for skeptics.',
    ],
    whatToNotice: 'Same wheat slot, different houses — yeast and proof still move the pour.',
    academySlug: 'mash-bill-in-the-mouth',
  },
  {
    id: 'category-triangle',
    title: 'Category triangle',
    tagline: 'Bourbon · rye whiskey · Tennessee — legal identity in one flight.',
    variable: 'Whiskey category (grain law + process)',
    bottleSlugs: ['buffalo-trace', 'rittenhouse-rye', 'jack-daniels-old-no-7'],
    steps: [
      'Pour BT (bourbon), Rittenhouse BiB (rye), Jack No. 7 (Tennessee).',
      'Read each label category line before nosing.',
      'Write one paragraph: which difference was grain vs process vs proof.',
    ],
    whatToNotice: 'Rye pushes pepper dry; Tennessee softens entry; bourbon holds corn sweetness.',
    academySlug: 'rye-and-tennessee-cousins',
  },
  {
    id: 'rye-vs-bourbon',
    title: 'Rye vs high-rye bourbon',
    tagline: 'Wild Turkey 101 vs WT Rye vs Rittenhouse — same house, different law.',
    variable: 'Rye whiskey (≥51% rye) vs high-rye bourbon',
    bottleSlugs: ['wild-turkey-101', 'wild-turkey-rye', 'rittenhouse-rye'],
    steps: [
      'Pour WT101, WT Rye, Rittenhouse BiB.',
      'Match proof where you can — note heat differences.',
      'Close detective case rye-vs-high-rye-bourbon after the flight.',
    ],
    whatToNotice: '101 is spicy bourbon; rye bottles push pepper and dry finish further.',
    academySlug: 'rye-and-tennessee-cousins',
  },
  {
    id: 'proof-ladder',
    title: 'Proof ladder',
    tagline: '80 → 90 → 100 → 115 — feel density without changing house.',
    variable: 'Proof only (Old Forester family spread)',
    bottleSlugs: ['old-forester-86', 'buffalo-trace', 'knob-creek-9', 'old-forester-1920'],
    steps: [
      'Pour OF86, BT90, KC9 100, OF1920 115 — tiny pours.',
      'First sip neat; second sip with one water drop on highest proof only.',
      'Score heat vs flavor density 1–10 each.',
    ],
    whatToNotice: 'Higher proof carries volatiles — water opens rather than "weakens" if used sparingly.',
    academySlug: 'water-and-proof-experiment',
  },
  {
    id: 'value-blind-prep',
    title: 'Value blind prep',
    tagline: 'Four shelf staples — practice notes before you bag bottles.',
    variable: 'Price tier under $35 — palate over prestige',
    bottleSlugs: ['evan-williams-black', 'wild-turkey-101', 'four-roses-yellow', 'larceny'],
    steps: [
      'Number glasses — hide labels in bags.',
      'Run flavor wheel words only — no brand guesses until ranked.',
      'Reveal and note whether price order matched preference order.',
    ],
    whatToNotice: 'Blind value flights build humility before allocated bottles enter the room.',
    academySlug: 'blind-one-pour-drill',
  },
  {
    id: 'tennessee-duo',
    title: 'Tennessee duo',
    tagline: 'Jack vs Dickel — charcoal mellowing contrast at 80 proof.',
    variable: 'Tennessee process — same proof band',
    bottleSlugs: ['jack-daniels-old-no-7', 'george-dickel-no-8', 'buffalo-trace'],
    steps: [
      'Pour Jack No. 7 and Dickel No. 8 side by side.',
      'Add BT as bourbon baseline at similar proof.',
      'Name charcoal softness vs corn sweetness explicitly.',
    ],
    whatToNotice: 'Jack often reads banana-forward; Dickel maple-soft — same category, different houses.',
    academySlug: 'tennessee-charcoal-tasting',
  },
  {
    id: 'bib-transparency',
    title: 'BiB transparency flight',
    tagline: 'Bond rules lock proof and age floor — taste the guarantee.',
    variable: 'Bottled-in-Bond category',
    bottleSlugs: ['evan-williams-black', 'rittenhouse-rye', 'old-overholt-bib', 'new-riff-bourbon'],
    steps: [
      'Identify BiB labels on each bottle before pouring.',
      'Note 100 proof alignment — compare mouthfeel at same proof.',
      'Write what BiB guarantees vs what it does not promise about quality.',
    ],
    whatToNotice: 'BiB is transparency shortcut — not automatic best, but legally specific.',
    academySlug: 'bib-tasting-lab',
  },
];

export function getTastingFlight(id: string): TastingFlight | undefined {
  return TASTING_FLIGHTS.find((f) => f.id === id);
}
