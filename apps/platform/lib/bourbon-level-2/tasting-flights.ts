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
  group?: 'core' | 'category' | 'proof' | 'craft' | 'blind';
};

export const FLIGHT_GROUPS: { id: NonNullable<TastingFlight['group']>; label: string }[] = [
  { id: 'core', label: 'Core — mash & wheat' },
  { id: 'category', label: 'Category — rye & Tennessee' },
  { id: 'proof', label: 'Proof & BiB' },
  { id: 'craft', label: 'Craft & finish' },
  { id: 'blind', label: 'Blind prep' },
];

export const TASTING_FLIGHTS: TastingFlight[] = [
  {
    id: 'mashbill-triangle',
    title: 'Mash bill triangle',
    tagline: 'Traditional · high-rye · wheated — same session, three personalities.',
    variable: 'Mash bill style (proof matched ~90 when possible)',
    group: 'core',
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
    group: 'core',
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
    group: 'category',
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
    group: 'category',
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
    group: 'proof',
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
    group: 'blind',
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
    group: 'category',
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
    group: 'proof',
    bottleSlugs: ['evan-williams-bib', 'rittenhouse-rye', 'old-overholt-bib', 'new-riff-bourbon'],
    steps: [
      'Identify BiB labels on each bottle before pouring.',
      'Note 100 proof alignment — compare mouthfeel at same proof.',
      'Write what BiB guarantees vs what it does not promise about quality.',
    ],
    whatToNotice: 'BiB is transparency shortcut — not automatic best, but legally specific.',
    academySlug: 'bib-tasting-lab',
  },
  {
    id: 'craft-campus',
    title: 'Craft campus flight',
    tagline: 'Value craft → BiB → wheated → farm grain — build a shelf, not a trophy.',
    variable: 'Craft scale and mash philosophy',
    group: 'craft',
    bottleSlugs: ['green-river-kentucky-straight', 'new-riff-bourbon', 'wilderness-trail-bib', 'jeptha-creed-bloody-butcher', 'log-still-diving-bell'],
    steps: [
      'Pour Green River and New Riff BiB first — note price vs proof transparency.',
      'Add WT wheated BiB and Jeptha Creed — grain story vs wheat softness.',
      'Finish with Log Still Diving Bell — rank wheated craft without looking at labels.',
    ],
    whatToNotice: 'Craft is not one flavor — value revival, BiB discipline, wheated, heirloom corn, and Nelson County wheat all differ.',
    academySlug: 'craft-kentucky-tasting',
  },
  {
    id: 'finish-lab',
    title: 'Finish lab',
    tagline: 'Straight bourbon vs second-barrel vs port finish — same night homework.',
    variable: 'Cask finish and secondary aging',
    group: 'craft',
    bottleSlugs: ['buffalo-trace', 'woodford-double-oaked', 'angels-envy-bourbon', 'bardstown-fusion-wheated', 'woodford-reserve'],
    steps: [
      'Baseline with Buffalo Trace and Woodford Reserve straight lines.',
      'Pour Double Oaked and Angel\'s Envy — name finish sweetness vs oak.',
      'Add Bardstown Fusion wheated — which finish reads most dessert-forward?',
    ],
    whatToNotice: 'Finish adds flavor post-primary barrel — compare to mash bill changes on the same pour night.',
    academySlug: 'finish-tasting-lab',
  },
  {
    id: 'heaven-hill-ladder',
    title: 'Heaven Hill value ladder',
    tagline: 'Black → BiB → Larceny → Elijah Craig — same house, rising proof and oak.',
    variable: 'Heaven Hill house progression',
    group: 'proof',
    bottleSlugs: ['evan-williams-black', 'evan-williams-bib', 'larceny', 'elijah-craig-small-batch'],
    steps: [
      'Pour Evan Black, Evan BiB, Larceny, Elijah Craig — ½ oz each.',
      'Note proof and wheated fork at Larceny.',
      'Write which step best $/flavor for your palate.',
    ],
    whatToNotice: 'Same campus, different mash and proof — value ladder before Eagle Rare hunt.',
    academySlug: 'house-proof-ladders',
  },
  {
    id: 'wild-turkey-ladder',
    title: 'Wild Turkey proof ladder',
    tagline: '101 → Russell\'s 10 → Rare Breed — Turkey spice at rising proof.',
    variable: 'Wild Turkey house progression',
    group: 'proof',
    bottleSlugs: ['wild-turkey-101', 'russells-reserve-10', 'rare-breed', 'wild-turkey-rye'],
    steps: [
      'Pour 101, Russell\'s 10, Rare Breed — tiny pours.',
      'Add WT Rye as category contrast at end.',
      'Water one drop on Rare Breed only — note what opens.',
    ],
    whatToNotice: 'Age mellows spice; barrel proof returns it — rye category shifts the law.',
    academySlug: 'house-proof-ladders',
  },
  {
    id: 'craft-rye-flight',
    title: 'Craft rye flight',
    tagline: 'New Riff · Wilderness Trail · Rabbit Hole · Rittenhouse — craft vs value BiB.',
    variable: 'Rye whiskey — craft BiB vs major BiB',
    group: 'craft',
    bottleSlugs: ['new-riff-rye', 'wilderness-trail-rye', 'rabbit-hole-boxergrail', 'rittenhouse-rye'],
    steps: [
      'Pour four ryes at 100 proof where possible.',
      'Note NCF craft texture vs Rittenhouse punch.',
      'Pair with one bourbon afterward — New Riff bourbon vs New Riff rye.',
    ],
    whatToNotice: 'Craft rye is not one flavor — malted rye, BiB discipline, and cocktail rye differ.',
    academySlug: 'craft-rye-on-the-shelf',
  },
  {
    id: 'barrel-proof-showdown',
    title: 'Barrel proof showdown',
    tagline: 'Rare Breed · 1792 Full Proof · OF1920 — high proof without BT lottery.',
    variable: 'Barrel proof — different houses',
    group: 'proof',
    bottleSlugs: ['rare-breed', '1792-full-proof', 'old-forester-1920', 'knob-creek-9'],
    steps: [
      'Pour Rare Breed, 1792 Full Proof, OF1920 — half-ounce max.',
      'Score heat vs flavor 1–10 neat.',
      'One water drop on winner — did it improve or collapse?',
    ],
    whatToNotice: 'High proof is not one taste — rye-forward Barton vs banana Forester vs Turkey spice.',
    academySlug: 'water-and-proof-experiment',
  },
  {
    id: 'ncf-craft-duel',
    title: 'NCF craft duel',
    tagline: 'New Riff BiB vs Michter\'s US*1 — filtration choices in the glass.',
    variable: 'Non-chill filtered craft vs filtered major craft-premium',
    group: 'craft',
    bottleSlugs: ['new-riff-bourbon', 'michters-us1', 'buffalo-trace', 'wilderness-trail-bib'],
    steps: [
      'Pour New Riff BiB and Michter\'s US*1 side by side.',
      'Add BT and WT BiB as references.',
      'Focus on mouthfeel and finish length — not score.',
    ],
    whatToNotice: 'NCF can add weight; filtering can add polish — neither is automatically better.',
    academySlug: 'ncf-and-texture',
  },
  {
    id: 'wheated-craft-four',
    title: 'Wheated craft four-way',
    tagline: 'Maker\'s · WT BiB · Log Still · Willett — wheat slot across price tiers.',
    variable: 'Wheated mash — major vs craft',
    group: 'craft',
    bottleSlugs: ['makers-mark', 'wilderness-trail-bib', 'log-still-diving-bell', 'willett-pot-still'],
    steps: [
      'Line up four wheated pours — similar proof where possible.',
      'Blind rank if confident — reveal after.',
      'Name yeast vs proof vs craft scale in one sentence.',
    ],
    whatToNotice: 'Wheat softens — but proof and craft scale still move the pour dramatically.',
    academySlug: 'craft-kentucky-tasting',
  },
];

export function getTastingFlight(id: string): TastingFlight | undefined {
  return TASTING_FLIGHTS.find((f) => f.id === id);
}
