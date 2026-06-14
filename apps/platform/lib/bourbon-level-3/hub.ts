/** Bourbon Level 3 — Shelf Builder tool registry */

export const BOURBON_LEVEL_3_VERSION = '4.0.0-bourbon-shelf-builder';

export type Level3Tool = {
  slug: string;
  href: string;
  title: string;
  hook: string;
  icon: string;
  priority: number;
  category: 'curate' | 'value' | 'analyze' | 'learn' | 'checkpoint';
};

export const LEVEL_3_TOOLS: Level3Tool[] = [
  { slug: 'themed-shelf', href: '/bourbon/themed-shelf', title: 'Themed Shelf', hook: '12 shelf themes — proof ladder, mash row, craft vs major, host shelf', icon: '📚', priority: 1, category: 'curate' },
  { slug: 'shelf-builder', href: '/bourbon/shelf-builder', title: 'Budget Shelf Builder', hook: 'Starter, advanced, collector — $100 / $200 / $300 bands', icon: '💰', priority: 1.5, category: 'curate' },
  { slug: 'price-ladder', href: '/bourbon/price-ladder', title: 'Price Ladder', hook: 'Entry → standard → premium → ultra — match bottles to tiers', icon: '📈', priority: 2, category: 'value' },
  { slug: 'shelf-gap', href: '/bourbon/shelf-gap', title: 'Gap Analysis', hook: 'Owned bottles vs theme — missing roles, redundant mash bills', icon: '🔍', priority: 2.5, category: 'analyze' },
  { slug: 'shelf-defense', href: '/bourbon/shelf-defense', title: 'Shelf Defense', hook: 'Theme statement, gift pick, next bottle — checkpoint evidence', icon: '🛡', priority: 3, category: 'checkpoint' },
  { slug: 'portfolio', href: '/bourbon/portfolio', title: 'My Bourbon Shelf', hook: 'Owned, tasted, wishlist — log before gap analysis', icon: '🗄', priority: 4, category: 'analyze' },
  { slug: 'compare', href: '/bourbon/compare', title: 'Compare Presets', hook: 'Five-bottle grids — validate shelf picks before buying', icon: '⚖', priority: 5, category: 'analyze' },
  { slug: 'economy', href: '/bourbon/economy', title: 'Bourbon Economy', hook: 'MSRP, allocation, secondary — build without hype', icon: '💵', priority: 6, category: 'value' },
  { slug: 'bib-flight', href: '/bourbon/tasting-lab?flight=bib-transparency', title: 'BiB Anchor Flight', hook: 'Bond rules in the glass — shelf transparency shortcuts', icon: '🏛', priority: 7, category: 'learn' },
  { slug: 'craft-shelf', href: '/bourbon/themed-shelf?theme=craft-vs-major', title: 'Craft vs Major Theme', hook: 'New Riff, WT BiB next to Buffalo Trace — process literacy', icon: '🏭', priority: 8, category: 'curate' },
  { slug: 'level-2-bridge', href: '/bourbon/level-2', title: 'Level 2 Bridge', hook: 'Flights and grids that inform shelf picks', icon: '🧪', priority: 9, category: 'learn' },
  { slug: 'checkpoint', href: '/bourbon/academy/level-3-checkpoint', title: 'Level 3 Checkpoint', hook: '5–8 bottles, theme, gift rationale, gap analysis', icon: '✓', priority: 10, category: 'checkpoint' },
];

export const LEVEL_3_LESSON_LINK = {
  href: '/bourbon/academy/level-3',
  label: 'Level 3 academy — 10 lessons',
  sub: 'Themes · price ladder · BiB · craft · hype-free building · checkpoint.',
};

export const LEVEL_2_BACK_LINK = {
  href: '/bourbon/level-2',
  label: '← Level 2 Confident Taster',
  sub: 'Flights and grids — palate before curation.',
};

export const LEVEL_3_STATS = {
  themes: 12,
  priceTiers: 4,
  lessons: 10,
  modules: 12,
  shelfRoles: 8,
};
