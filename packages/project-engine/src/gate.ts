/**
 * Pass gate question — repeat at the start of every pass.
 * Expert creation > information consumption.
 */
export const PASS_GATE_QUESTION =
  'Does this help someone become an expert, or does it merely help them consume information?';

/** PASS-009+ expanded gate — defensibility over features (canonical: @foundry/transformation-graph-engine) */
export const TRANSFORMATION_PASS_GATE =
  'Can Foundry observe, support, measure, and remember the transformation?';

export const TRANSFORMATION_PASS_GATE_RULE =
  'If yes — core infrastructure. If no — likely just content. Content is a byproduct of the graph.';

export const PASS_GATE_RULE =
  'The first category gets priority. The second only matters when it supports the first.';

/** The outcome users buy — not machinery */
export const FOUNDRY_OUTCOME = 'Help me become the person I want to be.';

/** Foundry is becoming a Human Operating System */
export const HUMAN_OS_PRODUCT = FOUNDRY_OUTCOME;

export const HUMAN_OS_COMPONENTS = [
  'Knowledge',
  'Academy',
  'Collections',
  'Community',
  'Identity',
  'Roles',
  'Paths',
  'Projects',
  'Legacy',
] as const;

/** Cultural phenomenon — Foundry remembers */
export const REMEMBERS_JOURNEYS =
  'People spend years becoming something. Most platforms forget. Foundry remembers.';

/** End state — not 1,000 apps */
export const SCALE_VISION = {
  platform: 1,
  expertise_domains: '10,000',
  entities: 'millions',
  collections: 'millions',
  journeys: 'millions',
} as const;
