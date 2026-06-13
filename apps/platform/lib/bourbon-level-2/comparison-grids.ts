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
];

export function getGridPreset(id: string): ComparisonGridPreset | undefined {
  return COMPARISON_GRID_PRESETS.find((p) => p.id === id);
}
