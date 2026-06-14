/** Comparison grid presets — Level 2 structured tasting */

export type GridColumn = 'nose' | 'palate' | 'finish' | 'sweetSpice' | 'score' | 'note';

export type ComparisonGridPreset = {
  id: string;
  title: string;
  variable: string;
  bottleSlugs: string[];
  columns: GridColumn[];
  prompt: string;
};

export const GRID_COLUMNS: { key: GridColumn; label: string; hint: string }[] = [
  { key: 'nose', label: 'Nose', hint: 'One aroma word — not "smooth"' },
  { key: 'palate', label: 'Palate', hint: 'Sweet / spice / fruit balance' },
  { key: 'finish', label: 'Finish', hint: 'Short · medium · long' },
  { key: 'sweetSpice', label: 'Sweet ↔ spice', hint: 'Where on the slider?' },
  { key: 'score', label: 'Score', hint: '1–10 for tonight\'s palate' },
  { key: 'note', label: 'Why', hint: 'One sentence defense' },
];

export const COMPARISON_GRID_PRESETS: ComparisonGridPreset[] = [
  {
    id: 'mashbill-three',
    title: 'Three mash bills',
    variable: 'Mash bill style',
    bottleSlugs: ['buffalo-trace', 'wild-turkey-101', 'makers-mark'],
    columns: ['nose', 'palate', 'finish', 'sweetSpice', 'score', 'note'],
    prompt: 'Hold proof roughly equal — let grain drive the difference.',
  },
  {
    id: 'category-three',
    title: 'Three categories',
    variable: 'Bourbon vs rye vs Tennessee',
    bottleSlugs: ['buffalo-trace', 'rittenhouse-rye', 'jack-daniels-old-no-7'],
    columns: ['nose', 'palate', 'finish', 'score', 'note'],
    prompt: 'Read label category before reveal — write legal line in notes.',
  },
  {
    id: 'wheated-four',
    title: 'Wheated four-way',
    variable: 'Wheated mash',
    bottleSlugs: ['makers-mark', 'larceny', 'weller-special-reserve', 'wilderness-trail-bib'],
    columns: ['nose', 'palate', 'finish', 'score', 'note'],
    prompt: 'Craft vs major — same wheat slot, different proof and age.',
  },
  {
    id: 'proof-five',
    title: 'Proof five-step',
    variable: 'Proof ladder',
    bottleSlugs: ['four-roses-yellow', 'buffalo-trace', 'knob-creek-9', 'four-roses-single-barrel', 'old-forester-1920'],
    columns: ['nose', 'palate', 'finish', 'score', 'note'],
    prompt: 'Rank by preference — did highest proof win? Not always.',
  },
  {
    id: 'value-five',
    title: 'Value five blind',
    variable: 'Under $35 shelf',
    bottleSlugs: ['evan-williams-black', 'old-forester-86', 'wild-turkey-101', 'four-roses-yellow', '1792-small-batch'],
    columns: ['nose', 'palate', 'finish', 'score', 'note'],
    prompt: 'Bag bottles — reveal after scores locked.',
  },
  {
    id: 'rye-four',
    title: 'Rye starter four',
    variable: 'Rye whiskey category',
    bottleSlugs: ['rittenhouse-rye', 'wild-turkey-rye', 'old-overholt-bib', 'bulleit-rye'],
    columns: ['nose', 'palate', 'finish', 'sweetSpice', 'score', 'note'],
    prompt: 'Compare to one bourbon afterward — Bulleit Bourbon vs Bulleit Rye.',
  },
  {
    id: 'craft-inventory-five',
    title: 'Craft inventory five',
    variable: 'Craft scale and mash philosophy',
    bottleSlugs: ['green-river-kentucky-straight', 'new-riff-bourbon', 'wilderness-trail-bib', 'jeptha-creed-bloody-butcher', 'log-still-diving-bell'],
    columns: ['nose', 'palate', 'finish', 'score', 'note'],
    prompt: 'Rank value craft before splurge — price vs proof transparency.',
  },
  {
    id: 'finish-four',
    title: 'Finish four-way',
    variable: 'Cask finish vs straight',
    bottleSlugs: ['buffalo-trace', 'woodford-double-oaked', 'angels-envy-bourbon', 'bardstown-fusion-wheated'],
    columns: ['nose', 'palate', 'finish', 'sweetSpice', 'score', 'note'],
    prompt: 'Name finish sweetness vs oak — straight baseline first.',
  },
  {
    id: 'heaven-hill-four',
    title: 'Heaven Hill four-step',
    variable: 'House value ladder',
    bottleSlugs: ['evan-williams-black', 'evan-williams-bib', 'larceny', 'elijah-craig-small-batch'],
    columns: ['nose', 'palate', 'finish', 'score', 'note'],
    prompt: 'Same house — note wheated fork at Larceny.',
  },
  {
    id: 'wild-turkey-proof',
    title: 'Wild Turkey proof four',
    variable: 'Proof and age on Turkey mash',
    bottleSlugs: ['wild-turkey-101', 'russells-reserve-10', 'rare-breed', 'wild-turkey-rye'],
    columns: ['nose', 'palate', 'finish', 'score', 'note'],
    prompt: 'Rye pour last — category vs proof lesson.',
  },
  {
    id: 'craft-rye-four',
    title: 'Craft rye four',
    variable: 'Craft BiB rye vs major BiB',
    bottleSlugs: ['new-riff-rye', 'wilderness-trail-rye', 'rabbit-hole-boxergrail', 'rittenhouse-rye'],
    columns: ['nose', 'palate', 'finish', 'sweetSpice', 'score', 'note'],
    prompt: '100 proof alignment where possible — mouthfeel vs spice.',
  },
  {
    id: 'barrel-proof-four',
    title: 'Barrel proof four',
    variable: 'High proof — different houses',
    bottleSlugs: ['rare-breed', '1792-full-proof', 'old-forester-1920', 'knob-creek-9'],
    columns: ['nose', 'palate', 'finish', 'score', 'note'],
    prompt: 'Tiny pours — water on highest proof only after neat score.',
  },
  {
    id: 'ncf-three',
    title: 'NCF vs filtered three',
    variable: 'Filtration and mouthfeel',
    bottleSlugs: ['new-riff-bourbon', 'michters-us1', 'buffalo-trace'],
    columns: ['nose', 'palate', 'finish', 'score', 'note'],
    prompt: 'Focus on texture and finish length — not brand prestige.',
  },
  {
    id: 'wheated-four',
    title: 'Wheated four-way',
    variable: 'Wheated — major vs craft',
    bottleSlugs: ['makers-mark', 'larceny', 'wilderness-trail-bib', 'log-still-diving-bell'],
    columns: ['nose', 'palate', 'finish', 'sweetSpice', 'score', 'note'],
    prompt: 'Texture and sweetness before brand reveal — bag for blind homework.',
  },
  {
    id: 'splurge-craft-four',
    title: 'Splurge craft four',
    variable: 'Price vs palate — splurge jury',
    bottleSlugs: ['buffalo-trace', 'peerless-bourbon', 'blue-run-8-year', 'eagle-rare'],
    columns: ['nose', 'palate', 'finish', 'score', 'note'],
    prompt: 'Blind rank — splurge must beat BT on your palate to stay on shelf.',
  },
  {
    id: 'age-statement-four',
    title: 'Age statement four',
    variable: 'Stated age vs NAS polish',
    bottleSlugs: ['knob-creek-9', 'eagle-rare', 'russells-reserve-10', 'blue-run-8-year'],
    columns: ['nose', 'palate', 'finish', 'sweetSpice', 'score', 'note'],
    prompt: 'Read age before nosing — score oak vs youth in sweetSpice column, not age worship.',
  },
  {
    id: 'old-forester-three',
    title: 'Old Forester three-step',
    variable: 'House proof ladder — OF only',
    bottleSlugs: ['old-forester-86', 'old-forester-100', 'old-forester-1920'],
    columns: ['nose', 'palate', 'finish', 'score', 'note'],
    prompt: 'Water one drop on 1920 only — banana bread DNA at rising heat.',
  },
  {
    id: 'buffalo-universe-four',
    title: 'Buffalo Trace universe four',
    variable: 'Same campus — tier progression',
    bottleSlugs: ['buffalo-trace', 'eagle-rare', 'eh-taylor-small-batch', 'weller-special-reserve'],
    columns: ['nose', 'palate', 'finish', 'score', 'note'],
    prompt: 'Age and proof move the pour — not a different mash story every time.',
  },
  {
    id: 'host-friendly-four',
    title: 'Host-friendly four',
    variable: 'Gentle proof — skeptic gateways',
    bottleSlugs: ['makers-mark', 'buffalo-trace', 'four-roses-yellow', 'larceny'],
    columns: ['nose', 'palate', 'finish', 'score', 'note'],
    prompt: 'Rank for the room — one word per pour before lecture.',
  },
  {
    id: 'cocktail-three',
    title: 'Cocktail backbone three',
    variable: 'Manhattan vs neat role',
    bottleSlugs: ['rittenhouse-rye', 'evan-williams-black', 'wild-turkey-101'],
    columns: ['nose', 'palate', 'finish', 'score', 'note'],
    prompt: 'Neat score first — then one Manhattan with Rittenhouse.',
  },
  {
    id: 'tennessee-four',
    title: 'Tennessee four-way',
    variable: 'Process + proof on TN category',
    bottleSlugs: ['jack-daniels-old-no-7', 'george-dickel-no-8', 'buffalo-trace', 'makers-mark'],
    columns: ['nose', 'palate', 'finish', 'score', 'note'],
    prompt: 'BT bourbon baseline — charcoal mellowing in flavor terms.',
  },
];

export function getGridPreset(id: string): ComparisonGridPreset | undefined {
  return COMPARISON_GRID_PRESETS.find((p) => p.id === id);
}
