/** Bourbon Level 2 — Confident Taster tool registry */

export type Level2Tool = {
  slug: string;
  href: string;
  title: string;
  hook: string;
  icon: string;
  priority: number;
  category: 'taste' | 'compare' | 'learn' | 'practice';
};

export const LEVEL_2_TOOLS: Level2Tool[] = [
  { slug: 'tasting-lab', href: '/bourbon/tasting-lab', title: 'Tasting Lab', hook: 'Guided flights — mash bill, category, proof — with note cards', icon: '🧪', priority: 1, category: 'taste' },
  { slug: 'comparison-grid', href: '/bourbon/comparison-grid', title: 'Comparison Grid', hook: 'Hold one variable sacred — nose, palate, finish, rank', icon: '📊', priority: 2, category: 'compare' },
  { slug: 'mashbill-flight', href: '/bourbon/mashbill-flight', title: 'Mash Bill Flight', hook: 'Wheated vs high-rye vs traditional — same proof band', icon: '🌾', priority: 3, category: 'taste' },
  { slug: 'category-flight', href: '/bourbon/compare?preset=category-flight', title: 'Category Flight', hook: 'Bourbon · rye · Tennessee — legal lines in the glass', icon: '🗺', priority: 4, category: 'compare' },
  { slug: 'flavor-wheel', href: '/bourbon/flavor-wheel', title: 'Flavor Wheel', hook: 'Five families — sweet, spice, fruit, oak, texture', icon: '🎡', priority: 5, category: 'practice' },
  { slug: 'whiskey-map', href: '/bourbon/whiskey-map', title: 'Whiskey Map', hook: 'Category compare — label literacy before blind work', icon: '🥃', priority: 6, category: 'learn' },
  { slug: 'water-lab', href: '/bourbon/tasting-lab?mode=proof', title: 'Water & Proof Lab', hook: 'Neat vs one drop — when heat helps vs hides', icon: '💧', priority: 7, category: 'practice' },
  { slug: 'detective-rye', href: '/bourbon/detective/rye-vs-high-rye-bourbon', title: 'Rye vs High-Rye Case', hook: 'Detective case — same spice, different category', icon: '🕵', priority: 8, category: 'learn' },
  { slug: 'compare-presets', href: '/bourbon/compare', title: 'Compare Presets', hook: 'Daily, wheated, rye starter, age flight — 13 grids', icon: '⚖', priority: 9, category: 'compare' },
  { slug: 'league', href: '/bourbon/league', title: 'Blind League', hook: 'Monthly blind challenges — humility training', icon: '🏆', priority: 10, category: 'practice' },
];

export const LEVEL_2_LESSON_LINK = {
  href: '/bourbon/academy/level-2',
  label: 'Level 2 academy lessons',
  sub: '10 lessons — mash bill, flavor wheel, category cousins, checkpoint.',
};

export const LEVEL_1_BACK_LINK = {
  href: '/bourbon/level-1',
  label: '← Level 1 Hobby HQ',
  sub: 'Buy, investigate, play — when you need tools over tasting structure.',
};
