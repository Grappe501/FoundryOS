/** Bourbon Level 4 — Connoisseur tool registry */

export const BOURBON_LEVEL_4_VERSION = '5.0.0-bourbon-connoisseur';

export type Level4Tool = {
  slug: string;
  href: string;
  title: string;
  hook: string;
  icon: string;
  priority: number;
  category: 'decode' | 'compare' | 'process' | 'learn' | 'checkpoint';
};

export const LEVEL_4_TOOLS: Level4Tool[] = [
  { slug: 'label-decoder', href: '/bourbon/label-decoder', title: 'Label Decoder', hook: '8 drills — read DSP, proof, age, category — predict the pour', icon: '🏷', priority: 1, category: 'decode' },
  { slug: 'compare-five-lab', href: '/bourbon/compare-five-lab', title: 'Compare Five Lab', hook: '12 connoisseur presets — hypothesis before pour, defend winner', icon: '⚖', priority: 1.5, category: 'compare' },
  { slug: 'dsp-scavenger', href: '/bourbon/dsp-scavenger', title: 'DSP Scavenger Hunt', hook: 'Match bottles to distillery numbers — sourcing literacy', icon: '🔎', priority: 2, category: 'decode' },
  { slug: 'single-barrel-lab', href: '/bourbon/single-barrel-lab', title: 'Single Barrel Lab', hook: 'SB vs small batch vs standard — variance on one campus', icon: '🛢', priority: 2.5, category: 'process' },
  { slug: 'nas-age-lab', href: '/bourbon/nas-age-lab', title: 'NAS vs Age Lab', hook: 'Stated age vs NAS polish — angel\'s share economics', icon: '⏳', priority: 3, category: 'process' },
  { slug: 'store-pick-lab', href: '/bourbon/store-pick-lab', title: 'Store Pick Lab', hook: 'When picks beat standard — lottery vs literacy', icon: '🏪', priority: 3.5, category: 'process' },
  { slug: 'x-ray', href: '/bourbon/x-ray', title: 'Bottle X-Ray', hook: 'Entry proof, warehouse, DSP — layer-by-layer decode', icon: '🩻', priority: 4, category: 'decode' },
  { slug: 'comparison-grid', href: '/bourbon/comparison-grid', title: 'Comparison Grid', hook: 'Five-wide grids — nose, palate, finish, rank, lesson', icon: '📊', priority: 5, category: 'compare' },
  { slug: 'detective', href: '/bourbon/detective', title: 'Detective Cases', hook: 'DSP numbers, NAS era, craft sourcing — close cases', icon: '🕵', priority: 6, category: 'learn' },
  { slug: 'campus', href: '/bourbon/campus', title: 'Producer Campus', hook: 'Atlas deep dives — house style before label prediction', icon: '🏭', priority: 7, category: 'learn' },
  { slug: 'level-3-bridge', href: '/bourbon/level-3', title: 'Level 3 Bridge', hook: 'Shelf themes inform which labels to decode next', icon: '📚', priority: 8, category: 'learn' },
  { slug: 'checkpoint', href: '/bourbon/academy/level-4-checkpoint', title: 'Level 4 Checkpoint', hook: 'Compare Five + DSP hunt + single-barrel note', icon: '✓', priority: 10, category: 'checkpoint' },
];

export const LEVEL_4_LESSON_LINK = {
  href: '/bourbon/academy/level-4',
  label: 'Level 4 academy — 10 lessons',
  sub: 'Label anatomy · DSP · single barrel · NAS · store picks · checkpoint.',
};

export const LEVEL_3_BACK_LINK = {
  href: '/bourbon/level-3',
  label: '← Level 3 Shelf Builder',
  sub: 'Curated shelf before label cold-read.',
};

export const LEVEL_4_STATS = {
  labelDrills: 8,
  comparePresets: 12,
  dspHunts: 6,
  singleBarrelLabs: 6,
  nasAgeLabs: 5,
  storePickLabs: 4,
  lessons: 10,
  modules: 12,
};
