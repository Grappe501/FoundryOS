/** Level 3 learning modules — themes, price, gap, defense wired together */

export type Level3Module = {
  id: string;
  title: string;
  goal: string;
  themeId?: string;
  toolHref?: string;
  academySlug: string;
  order: number;
};

export const LEVEL_3_MODULES: Level3Module[] = [
  { id: 'shelf-themes', title: 'Shelf themes', goal: 'Pick a story — not random accumulation.', themeId: 'value-under-40', academySlug: 'shelf-themes-that-teach', order: 1 },
  { id: 'value-ladder', title: 'Under-$40 value ladder', goal: 'Four staples — traditional, rye, wheat, BiB.', themeId: 'value-under-40', academySlug: 'value-ladder-under-40', order: 2 },
  { id: 'price-tiers', title: 'Price ladder', goal: 'Entry → ultra — match bottles to tier.', toolHref: '/bourbon/price-ladder', academySlug: 'price-ladder-full', order: 3 },
  { id: 'bib-anchor', title: 'BiB anchor row', goal: 'Bond rules as shelf shortcuts.', themeId: 'bib-anchor-row', academySlug: 'bib-on-the-shelf', order: 4 },
  { id: 'mashbill-row', title: 'Mash bill row', goal: 'Traditional · high-rye · wheated on one shelf.', themeId: 'mashbill-education', academySlug: 'shelf-themes-that-teach', order: 5 },
  { id: 'craft-major', title: 'Craft vs major', goal: 'Process literacy — DSP story next to BT.', themeId: 'craft-vs-major', academySlug: 'craft-vs-major-houses', order: 6 },
  { id: 'daily-occasion', title: 'Daily vs occasion', goal: 'Repeat buys vs splurge — palate fatigue awareness.', themeId: 'daily-only', academySlug: 'daily-vs-occasion', order: 7 },
  { id: 'vertical-proof', title: 'Proof ladder shelf', goal: 'Same variable — rising heat.', themeId: 'proof-ladder', academySlug: 'vertical-thinking-shelf', order: 8 },
  { id: 'gap-analysis', title: 'Gap analysis', goal: 'Owned vs theme — missing roles, redundant mash.', toolHref: '/bourbon/shelf-gap', academySlug: 'shelf-themes-that-teach', order: 9 },
  { id: 'hype-free', title: 'Build without hype', goal: 'MSRP, allocation, secondary — stay grounded.', toolHref: '/bourbon/economy', academySlug: 'building-without-hype', order: 10 },
  { id: 'shelf-defense', title: 'Shelf defense', goal: 'Theme statement, gift pick, next bottle.', toolHref: '/bourbon/shelf-defense', academySlug: 'level-3-checkpoint', order: 11 },
  { id: 'checkpoint', title: 'Level 3 checkpoint', goal: 'Photo + theme + gift rationale + gap.', academySlug: 'level-3-checkpoint', order: 12 },
];

export function getLevel3Module(id: string): Level3Module | undefined {
  return LEVEL_3_MODULES.find((m) => m.id === id);
}
