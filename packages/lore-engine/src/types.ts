/** PASS-034H/I — Lore layer types (reusable across all worlds) */

export type LoreHero = {
  id: string;
  name: string;
  tagline: string;
  obsession: string;
  failure: string;
  breakthrough: string;
  whyMatters: string;
};

/** Story arcs — remembered, not studied */
export type LoreLegend = {
  id: string;
  title: string;
  hook: string;
  chapters: { heading: string; body: string }[];
  whyRemembered: string;
  href?: string;
};

export type LoreRivalry = {
  id: string;
  title: string;
  sideA: { label: string; argument: string };
  sideB: { label: string; argument: string };
  foundryTake: string;
  href?: string;
};

export type LoreMystery = {
  id: string;
  question: string;
  tease: string;
  answer: string;
  rabbitHoleHref?: string;
};

/** Conspiracies & debates — no right answer, people return to argue */
export type LoreDebate = {
  id: string;
  title: string;
  campA: { label: string; argument: string };
  campB: { label: string; argument: string };
  whyPeopleReturn: string;
  href?: string;
};

export type LorePilgrimage = {
  id: string;
  title: string;
  description: string;
  legendaryObjectId?: string;
  href?: string;
};

export type LoreControversy = {
  id: string;
  debate: string;
  campA: string;
  campB: string;
  whyItEndures: string;
};

export type LoreSecret = {
  id: string;
  headline: string;
  body: string;
  whyFeelsSecret: string;
};

export type LoreTimelineEvent = {
  year: string;
  title: string;
  body: string;
  monthDay?: string;
};

/** Legendary object story page — not a review */
export type LoreLegendaryObject = {
  id: string;
  name: string;
  tagline: string;
  story: string;
  chapters: { heading: string; body: string }[];
  whyLegendary: string;
  href?: string;
};

export type LoreWhyMatters = {
  topic: string;
  notThis: string;
  insteadThis: string;
  body: string;
};

export type ExperienceFactor = {
  id: string;
  factor: string;
  why: string;
  tip: string;
};

/** Universe map node — clickable wander graph */
export type UniverseMapNode = {
  id: string;
  label: string;
  angle: number;
  distance: number;
  tease: string;
  body: string;
  href?: string;
};

export type FoundryOriginalKind =
  | 'mystery-of-week'
  | 'forgotten-distillery'
  | 'rivalry-of-week'
  | 'mythbuster'
  | 'legendary-pour';

export type FoundryOriginal = {
  id: string;
  kind: FoundryOriginalKind;
  title: string;
  body: string;
  href?: string;
};

export type WorldLoreBundle = {
  world_slug: string;
  world_name: string;
  tagline: string;
  heroes: LoreHero[];
  legends?: LoreLegend[];
  rivalries: LoreRivalry[];
  mysteries: LoreMystery[];
  debates?: LoreDebate[];
  pilgrimages: LorePilgrimage[];
  controversies: LoreControversy[];
  secrets: LoreSecret[];
  timeline: LoreTimelineEvent[];
  legendaryObjects?: LoreLegendaryObject[];
  universeMap?: UniverseMapNode[];
  foundryOriginals?: FoundryOriginal[];
  whyMatters: LoreWhyMatters[];
  experienceBeyond?: ExperienceFactor[];
};

export type LoreSection =
  | 'heroes'
  | 'legends'
  | 'rivalries'
  | 'mysteries'
  | 'debates'
  | 'pilgrimages'
  | 'controversies'
  | 'secrets'
  | 'timeline'
  | 'legendary-objects'
  | 'why-matters'
  | 'experience';

export const LORE_SECTION_LABELS: Record<LoreSection, string> = {
  heroes: 'Heroes',
  legends: 'Legends',
  rivalries: 'Rivalries',
  mysteries: 'Mysteries',
  debates: 'Debates & conspiracies',
  pilgrimages: 'Pilgrimages',
  controversies: 'Controversies',
  secrets: 'Secret knowledge',
  timeline: 'Timeline',
  'legendary-objects': 'Legendary objects',
  'why-matters': 'Why this matters',
  experience: 'Beyond the liquid',
};

/** PASS-034I — Daily rotating feed item */
export type LivingMediaItem = {
  id: string;
  kind: 'mystery' | 'debate' | 'story' | 'history' | 'rabbit-hole' | 'object' | 'original';
  title: string;
  body: string;
  href?: string;
  cta?: string;
};

export type LivingMediaFeed = {
  world_slug: string;
  date_key: string;
  headline: string;
  items: LivingMediaItem[];
};
