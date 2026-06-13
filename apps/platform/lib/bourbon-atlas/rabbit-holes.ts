import type { AtlasForwardLink, AtlasRabbitHole } from './types';

const PRODUCERS: Record<string, AtlasForwardLink[]> = {
  'mash-bill': [
    { kind: 'producer', href: '/bourbon/producers/buffalo-trace', label: 'Buffalo Trace' },
    { kind: 'producer', href: '/bourbon/producers/four-roses', label: 'Four Roses' },
    { kind: 'producer', href: '/bourbon/producers/makers-mark', label: 'Maker\'s Mark' },
  ],
  rickhouse: [
    { kind: 'producer', href: '/bourbon/producers/buffalo-trace', label: 'Buffalo Trace campus' },
    { kind: 'producer', href: '/bourbon/producers/heaven-hill', label: 'Heaven Hill rickhouses' },
  ],
  'wheated-bourbon': [
    { kind: 'producer', href: '/bourbon/producers/makers-mark', label: 'Maker\'s Mark' },
    { kind: 'producer', href: '/bourbon/producers/buffalo-trace', label: 'Weller line' },
  ],
  'bottled-in-bond': [
    { kind: 'producer', href: '/bourbon/producers/heaven-hill', label: 'Heaven Hill BiB' },
    { kind: 'producer', href: '/bourbon/producers/jim-beam', label: 'Jim Beam Bonded' },
  ],
};

const TOOLS: Record<string, AtlasForwardLink[]> = {
  rickhouse: [
    { kind: 'tool', href: '/bourbon/campus', label: 'Campus map' },
    { kind: 'tool', href: '/bourbon/trail-planner', label: 'Trail planner' },
  ],
  'flavor-wheel': [{ kind: 'tool', href: '/bourbon/flavor-wheel', label: 'Flavor wheel' }],
  'blind-tasting': [
    { kind: 'game', href: '/bourbon/games', label: 'Blind games' },
    { kind: 'tool', href: '/bourbon/league', label: 'Blind league' },
  ],
  allocation: [
    { kind: 'page', href: '/bourbon/economy', label: 'Bourbon economy' },
    { kind: 'tool', href: '/bourbon/watchtower', label: 'Watchtower' },
  ],
  'store-pick': [{ kind: 'tool', href: '/bourbon/store-picks', label: 'Store pick academy' }],
  'mash-bill': [{ kind: 'tool', href: '/bourbon/compare', label: 'Compare tool' }],
  dsp: [{ kind: 'tool', href: '/bourbon/detective/dsp-numbers', label: 'DSP detective case' }],
};

const LESSONS: Record<string, AtlasForwardLink[]> = {
  nose: [{ kind: 'lesson', href: '/bourbon/academy/first-nosing-ritual', label: 'First nosing ritual' }],
  'mash-bill': [{ kind: 'lesson', href: '/bourbon/academy/what-bourbon-actually-is', label: 'What bourbon actually is' }],
  proof: [{ kind: 'lesson', href: '/bourbon/academy/three-pours-one-method', label: 'Three pours method' }],
};

const DETECTIVE: Record<string, AtlasForwardLink[]> = {
  allocation: [{ kind: 'detective', href: '/bourbon/detective/weller-ghost', label: 'Weller ghost case' }],
  'bottled-in-bond': [{ kind: 'detective', href: '/bourbon/detective/bib-guarantee', label: 'BiB guarantee case' }],
  dsp: [{ kind: 'detective', href: '/bourbon/detective/dsp-numbers', label: 'DSP numbers case' }],
  'warehouse-floor': [{ kind: 'detective', href: '/bourbon/detective/barrel-floor', label: 'Barrel floor case' }],
};

const STORIES: Record<string, AtlasForwardLink[]> = {
  prohibition: [{ kind: 'story', href: '/bourbon/stories', label: 'Bourbon stories' }],
  'bourbon-trail': [{ kind: 'story', href: '/bourbon/lore', label: 'Bourbon lore' }],
};

const HISTORY: Record<string, AtlasForwardLink[]> = {
  prohibition: [{ kind: 'history', href: '/bourbon/origins', label: 'Origins map' }],
  'kentucky-straight-bourbon': [{ kind: 'history', href: '/bourbon/origins', label: 'Kentucky origins' }],
};

const GEO: Record<string, AtlasForwardLink[]> = {
  rickhouse: [{ kind: 'geography', href: '/bourbon/map', label: 'Kentucky map' }],
  'bourbon-trail': [{ kind: 'geography', href: '/bourbon/trail-planner', label: 'Trail planner' }],
  'bourbon-county': [{ kind: 'geography', href: '/bourbon/origins', label: 'Origins' }],
};

const RELATED_BY_SLUG: Record<string, string[]> = {
  rickhouse: ['warehouse-floor', 'heat-cycling', 'angels-share', 'barrel-proof', 'rickhouse-position'],
  'mash-bill': ['corn', 'rye', 'wheat', 'wheated-bourbon', 'high-rye-bourbon'],
  allocation: ['msrp', 'secondary-market', 'allocation-season', 'store-pick'],
  proof: ['barrel-proof', 'cask-strength', 'bottled-in-bond', 'hazmat-proof'],
  'bottled-in-bond': ['dsp', 'straight-bourbon', 'proof', 'age-statement'],
};

const COUSINS: Record<string, string[]> = {
  rickhouse: ['Warehouse design', 'Climate aging', 'Barrel breathing'],
  allocation: ['Scarcity marketing', 'Hype cycles', 'Retail relationships'],
};

function linksFor(slug: string, map: Record<string, AtlasForwardLink[]>, fallback: AtlasForwardLink[]): AtlasForwardLink[] {
  return map[slug] ?? fallback;
}

const DEFAULT_TOOL: AtlasForwardLink[] = [
  { kind: 'tool', href: '/bourbon/level-1', label: 'Level 1 HQ' },
  { kind: 'tool', href: '/bourbon/lab', label: 'Bourbon lab' },
  { kind: 'page', href: '/bourbon/portfolio', label: 'Your portfolio' },
];

const DEFAULT_LESSON: AtlasForwardLink[] = [
  { kind: 'lesson', href: '/bourbon/academy/what-bourbon-actually-is', label: 'What bourbon actually is' },
];

export function defaultRabbitHoleLinks(slug: string): AtlasRabbitHole {
  return {
    relatedTerms: RELATED_BY_SLUG[slug] ?? [],
    cousinIdeas: COUSINS[slug] ?? ['Compare two bottles', 'Log in your journal', 'Host a flight'],
    producerLinks: linksFor(slug, PRODUCERS, [{ kind: 'producer', href: '/bourbon/producers', label: 'Producer Atlas' }]),
    toolLinks: linksFor(slug, TOOLS, DEFAULT_TOOL),
    lessonLinks: linksFor(slug, LESSONS, DEFAULT_LESSON),
    storyLinks: linksFor(slug, STORIES, [{ kind: 'story', href: '/bourbon/stories', label: 'Stories hub' }]),
    detectiveLinks: linksFor(slug, DETECTIVE, [{ kind: 'detective', href: '/bourbon/detective', label: 'Detective cases' }]),
    historyLinks: linksFor(slug, HISTORY, [{ kind: 'history', href: '/bourbon/origins', label: 'Origins' }]),
    geographyLinks: linksFor(slug, GEO, [{ kind: 'geography', href: '/bourbon/map', label: 'Map' }]),
  };
}

export function getAtlasRabbitHole(slug: string): AtlasRabbitHole {
  return defaultRabbitHoleLinks(slug);
}
