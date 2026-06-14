/** Level 4 — Compare Five lab presets with hypothesis discipline */

export type CompareFiveLabPreset = {
  id: string;
  title: string;
  variable: string;
  bottleSlugs: string[];
  hypothesisPrompt: string;
  lessonHint: string;
  academySlug?: string;
};

export const COMPARE_FIVE_LAB_PRESETS: CompareFiveLabPreset[] = [
  {
    id: 'nas-vs-age',
    title: 'NAS vs age stated',
    variable: 'Age statement vs NAS polish',
    bottleSlugs: ['buffalo-trace', 'eagle-rare', 'knob-creek-9', 'russells-reserve-10', 'four-roses-yellow'],
    hypothesisPrompt: 'I expect the oldest label to win on oak — or will NAS BT place high?',
    lessonHint: 'Age is not automatic quality — proof and house style compete.',
    academySlug: 'age-nas-angels-share',
  },
  {
    id: 'single-barrel-four-roses',
    title: 'Four Roses ladder',
    variable: 'Blend vs single barrel — same house',
    bottleSlugs: ['four-roses-yellow', 'four-roses-small-batch', 'four-roses-single-barrel', 'bulleit-bourbon', 'wild-turkey-101'],
    hypothesisPrompt: 'Single barrel beats small batch on fruit — or does proof drive rank?',
    lessonHint: 'Ten recipes hidden in blends — SB reveals one personality.',
    academySlug: 'single-barrel-variance',
  },
  {
    id: 'dsp-sourced-vs-gtg',
    title: 'Sourced vs campus',
    variable: 'DSP transparency — same price band',
    bottleSlugs: ['buffalo-trace', 'bulleit-bourbon', 'new-riff-bourbon', 'green-river-kentucky-straight', 'evan-williams-black'],
    hypothesisPrompt: 'Grain-to-glass craft beats sourced at same price — defend with DSP.',
    lessonHint: 'Read back label DSP — marketing story vs distillation site.',
    academySlug: 'dsp-sourcing-literacy',
  },
  {
    id: 'ncf-vs-filtered',
    title: 'NCF vs filtered',
    variable: 'Filtration — mouthfeel fork',
    bottleSlugs: ['new-riff-bourbon', 'michters-us1', 'buffalo-trace', 'evan-williams-bib', 'wilderness-trail-bib'],
    hypothesisPrompt: 'NCF wins on texture — or does Michter\'s polish beat craft weight?',
    lessonHint: 'Chill filtration trims weight — not morality, preference.',
    academySlug: 'chill-filtration-lab',
  },
  {
    id: 'cask-strength-five',
    title: 'Cask strength five',
    variable: 'Barrel proof — different houses',
    bottleSlugs: ['rare-breed', '1792-full-proof', 'old-forester-1920', 'bookers', 'knob-creek-9'],
    hypothesisPrompt: 'Highest proof wins flavor — or does 100 proof KC9 beat heat?',
    lessonHint: 'One drop water on highest only — score neat first.',
    academySlug: 'cask-strength-dilution',
  },
  {
    id: 'store-pick-prep',
    title: 'Store pick vs standard',
    variable: 'Pick variance vs house blend',
    bottleSlugs: ['four-roses-single-barrel', 'four-roses-small-batch', 'eagle-rare', 'buffalo-trace', 'elijah-craig-small-batch'],
    hypothesisPrompt: 'Single barrel / pick tier beats standard — worth the markup?',
    lessonHint: 'Picks are lottery on barrel — standard is house consistency.',
    academySlug: 'store-picks-worth-it',
  },
  {
    id: 'heaven-hill-five',
    title: 'Heaven Hill five-wide',
    variable: 'House ladder — value to step-up',
    bottleSlugs: ['evan-williams-black', 'evan-williams-bib', 'larceny', 'elijah-craig-small-batch', 'eagle-rare'],
    hypothesisPrompt: 'Eagle Rare justifies step-up from Evan Black — or does BiB win value?',
    lessonHint: 'Same campus — wheated fork at Larceny changes the row.',
    academySlug: 'kentucky-vs-beyond',
  },
  {
    id: 'craft-five',
    title: 'Craft campus five',
    variable: 'Craft process vs BT baseline',
    bottleSlugs: ['buffalo-trace', 'green-river-kentucky-straight', 'new-riff-bourbon', 'wilderness-trail-bib', 'peerless-bourbon'],
    hypothesisPrompt: 'Splurge craft beats BT blind — or does $30 BT win again?',
    lessonHint: 'Process literacy before splurge permanent shelf slot.',
    academySlug: 'dsp-sourcing-literacy',
  },
  {
    id: 'category-five',
    title: 'Category five-way',
    variable: 'Bourbon · rye · Tennessee',
    bottleSlugs: ['buffalo-trace', 'rittenhouse-rye', 'jack-daniels-old-no-7', 'wild-turkey-101', 'bulleit-rye'],
    hypothesisPrompt: 'Winner category predicts my shelf gap — write before reveal.',
    lessonHint: 'Grain vs process vs proof — three legal stories.',
    academySlug: 'label-anatomy',
  },
  {
    id: 'world-contrast',
    title: 'American baseline five',
    variable: 'Kentucky house styles — region literacy',
    bottleSlugs: ['buffalo-trace', 'wild-turkey-101', 'makers-mark', 'woodford-reserve', 'old-forester-100'],
    hypothesisPrompt: 'Kentucky limestone story shows in glass — or does yeast matter more?',
    lessonHint: 'Region explains supply — DSP explains pour.',
    academySlug: 'kentucky-vs-beyond',
  },
  {
    id: 'wheated-five',
    title: 'Wheated five-wide',
    variable: 'Wheat slot — major vs craft',
    bottleSlugs: ['makers-mark', 'larceny', 'weller-special-reserve', 'wilderness-trail-bib', 'buffalo-trace'],
    hypothesisPrompt: 'Weller beats Maker\'s — or does craft wheated BiB surprise?',
    lessonHint: 'Wheat softens — proof and house still diverge.',
    academySlug: 'single-barrel-variance',
  },
  {
    id: 'value-connoisseur',
    title: 'Value connoisseur five',
    variable: 'Under $40 — label literacy budget',
    bottleSlugs: ['evan-williams-black', 'wild-turkey-101', 'four-roses-yellow', 'larceny', '1792-small-batch'],
    hypothesisPrompt: 'Cheapest bottle ranks last — or value blind humility?',
    lessonHint: 'Connoisseur skill includes loving $20 bottles.',
    academySlug: 'compare-five-mission-prep',
  },
];

export function getCompareFiveLabPreset(id: string): CompareFiveLabPreset | undefined {
  return COMPARE_FIVE_LAB_PRESETS.find((p) => p.id === id);
}
