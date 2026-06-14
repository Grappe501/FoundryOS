/** Bourbon Level 2 v3 — Confident Taster tool registry */

export const BOURBON_LEVEL_2_VERSION = '3.0.0-bourbon-confident-taster-v3';

export type Level2Tool = {
  slug: string;
  href: string;
  title: string;
  hook: string;
  icon: string;
  priority: number;
  category: 'taste' | 'compare' | 'learn' | 'practice' | 'host' | 'blind' | 'program';
};

export const LEVEL_2_TOOLS: Level2Tool[] = [
  { slug: 'tasting-program', href: '/bourbon/tasting-program', title: '8-Week Program', hook: 'Structured Confident Taster — mash to host night to checkpoint', icon: '📅', priority: 0.5, category: 'program' },
  { slug: 'tasting-lab', href: '/bourbon/tasting-lab', title: 'Tasting Lab', hook: '26 guided flights — mash, craft, proof, host, advanced — with note cards', icon: '🧪', priority: 1, category: 'taste' },
  { slug: 'blind-flight', href: '/bourbon/blind-flight', title: 'Blind Flight Lab', hook: '7 blind presets — bag discipline, rank before reveal', icon: '🎭', priority: 1.2, category: 'blind' },
  { slug: 'comparison-grid', href: '/bourbon/comparison-grid', title: 'Comparison Grid', hook: '20 presets — nose, palate, finish, rank, lesson', icon: '📊', priority: 2, category: 'compare' },
  { slug: 'palate-journal', href: '/bourbon/palate-journal', title: 'Palate Journal', hook: 'Structured entries — five flavor families, no "smooth"', icon: '📓', priority: 2.5, category: 'practice' },
  { slug: 'host-night', href: '/bourbon/host-night', title: 'Host Night Kits', hook: '6 scenarios — skeptics, value showdown, craft intro, rye gateway', icon: '🏠', priority: 2.8, category: 'host' },
  { slug: 'flight-builder', href: '/bourbon/flight-builder', title: 'Flight Builder', hook: 'Catalog filters — wheated shelf, under $30, craft, 100+ proof', icon: '🔧', priority: 3, category: 'taste' },
  { slug: 'mashbill-flight', href: '/bourbon/mashbill-flight', title: 'Mash Bill Flight', hook: 'Wheated vs high-rye vs traditional — same proof band', icon: '🌾', priority: 3.5, category: 'taste' },
  { slug: 'water-proof-lab', href: '/bourbon/water-proof-lab', title: 'Water & Proof Lab', hook: 'Proof ladders, barrel proof showdown, one-drop discipline', icon: '💧', priority: 4, category: 'practice' },
  { slug: 'level-2-progress', href: '/bourbon/level-2-progress', title: 'Progress Dashboard', hook: 'Flights, grids, blinds, program weeks — checkpoint readiness', icon: '📈', priority: 4.2, category: 'practice' },
  { slug: 'craft-flights', href: '/bourbon/tasting-lab?flight=craft-campus', title: 'Craft Tasting', hook: 'Craft campus, rye, NCF, wheated four-way flights', icon: '🏭', priority: 4.5, category: 'taste' },
  { slug: 'finish-lab', href: '/bourbon/tasting-lab?flight=finish-lab', title: 'Finish Lab', hook: 'Straight vs double oak vs port vs fusion', icon: '🍷', priority: 5, category: 'taste' },
  { slug: 'category-flight', href: '/bourbon/compare?preset=category-flight', title: 'Category Flight', hook: 'Bourbon · rye · Tennessee — legal lines in the glass', icon: '🗺', priority: 5.5, category: 'compare' },
  { slug: 'flavor-wheel', href: '/bourbon/flavor-wheel', title: 'Flavor Wheel', hook: 'Five families — sweet, spice, fruit, oak, texture', icon: '🎡', priority: 6, category: 'practice' },
  { slug: 'whiskey-map', href: '/bourbon/whiskey-map', title: 'Whiskey Map', hook: 'Category compare — label literacy before blind work', icon: '🥃', priority: 7, category: 'learn' },
  { slug: 'house-ladders', href: '/bourbon/tasting-lab?flight=heaven-hill-ladder', title: 'House Proof Ladders', hook: 'Heaven Hill · Wild Turkey · Old Forester · Barton climbs', icon: '📈', priority: 8, category: 'learn' },
  { slug: 'detective-rye', href: '/bourbon/detective/rye-vs-high-rye-bourbon', title: 'Rye vs High-Rye Case', hook: 'Detective case — same spice, different category', icon: '🕵', priority: 9, category: 'learn' },
  { slug: 'compare-presets', href: '/bourbon/compare', title: 'Compare Presets', hook: 'Daily, craft, finish, rye — 20+ compare flights', icon: '⚖', priority: 10, category: 'compare' },
  { slug: 'league', href: '/bourbon/league', title: 'Blind League', hook: 'Monthly blind challenges — humility training', icon: '🏆', priority: 11, category: 'practice' },
  { slug: 'checkpoint', href: '/bourbon/academy/level-2-checkpoint', title: 'Level 2 Checkpoint', hook: 'Submit flights, grids, journal, blinds — unlock Level 3', icon: '✓', priority: 12, category: 'learn' },
];

export const LEVEL_2_LESSON_LINK = {
  href: '/bourbon/academy/level-2',
  label: 'Level 2 academy — 23 lessons',
  sub: 'Mash bill · craft · finish · blind · host · 8-week program — each links to a flight.',
};

export const LEVEL_1_BACK_LINK = {
  href: '/bourbon/level-1',
  label: '← Level 1 Hobby HQ',
  sub: 'Buy, investigate, play — when you need tools over tasting structure.',
};

export const LEVEL_2_STATS = {
  flights: 26,
  grids: 20,
  lessons: 23,
  modules: 24,
  blindPresets: 7,
  hostKits: 6,
  programWeeks: 8,
};
