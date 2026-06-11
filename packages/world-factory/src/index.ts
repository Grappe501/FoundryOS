/** @foundry/world-factory — one-command world generation (PASS-024) */

export {
  generateWorld,
  loadManifest,
  regenerateFactoryRegistry,
  saveManifestSlugs,
  type GenerateWorldResult,
} from './generate-world.js';
export { auditAllWorldsFs, auditWorldFs, type WorldFsAudit } from './audit-fs.js';
export { getFullBlueprint, listFullBlueprints } from './blueprints/index.js';
export type { FullWorldBlueprint, WorldFactoryManifest } from './types.js';

import { auditWorldFs } from './audit-fs.js';

export type WorldLayer =
  | 'world_hub'
  | 'academy'
  | 'missions'
  | 'portfolio'
  | 'parents'
  | 'careers'
  | 'glossary'
  | 'community'
  | 'playground'
  | 'operator_proof'
  | 'marketing_launch'
  | 'seo_assets'
  | 'explore_registration';

export type WorldTrinity = 'life-leverage' | 'passion';

export type WorldBlueprint = {
  slug: string;
  displayName: string;
  trinity: WorldTrinity;
  frame: string;
  portfolioLabel: string;
  portfolioKey: string;
  missionCount: number;
  academyLevels: number;
  consumerRoute: string;
  operatorProofRoute: string;
};

export const WORLD_LAYERS: WorldLayer[] = [
  'world_hub',
  'academy',
  'missions',
  'portfolio',
  'parents',
  'careers',
  'glossary',
  'community',
  'playground',
  'operator_proof',
  'marketing_launch',
  'seo_assets',
  'explore_registration',
];

export const LIFE_LEVERAGE_WORLDS: WorldBlueprint[] = [
  {
    slug: 'ai-builder',
    displayName: 'AI Builder',
    trinity: 'life-leverage',
    frame: 'Create Value',
    portfolioLabel: 'My AI Portfolio',
    portfolioKey: 'foundry-ai-portfolio',
    missionCount: 5,
    academyLevels: 7,
    consumerRoute: '/ai-builder',
    operatorProofRoute: '/operator/verticals/ai-builder',
  },
  {
    slug: 'financial-independence',
    displayName: 'Financial Independence',
    trinity: 'life-leverage',
    frame: 'Keep Value',
    portfolioLabel: 'My Wealth Portfolio',
    portfolioKey: 'foundry-fi-portfolio',
    missionCount: 5,
    academyLevels: 7,
    consumerRoute: '/financial-independence',
    operatorProofRoute: '/operator/verticals/ai-builder',
  },
  {
    slug: 'public-speaking',
    displayName: 'Public Speaking',
    trinity: 'life-leverage',
    frame: 'Communicate Value',
    portfolioLabel: 'My Speaking Portfolio',
    portfolioKey: 'foundry-ps-portfolio',
    missionCount: 5,
    academyLevels: 7,
    consumerRoute: '/public-speaking',
    operatorProofRoute: '/operator/verticals/ai-builder',
  },
  {
    slug: 'civic-engagement',
    displayName: 'Civic Engagement',
    trinity: 'life-leverage',
    frame: 'Improve Your Community',
    portfolioLabel: 'My Civic Portfolio',
    portfolioKey: 'foundry-civic-portfolio',
    missionCount: 5,
    academyLevels: 7,
    consumerRoute: '/civic-engagement',
    operatorProofRoute: '/operator/verticals/civic-engagement',
  },
];

export const PASSION_WORLDS: WorldBlueprint[] = [
  {
    slug: 'bourbon',
    displayName: 'Bourbon',
    trinity: 'passion',
    frame: 'Appreciate Craft',
    portfolioLabel: 'My Bourbon Journey',
    portfolioKey: 'foundry-bourbon-portfolio',
    missionCount: 5,
    academyLevels: 7,
    consumerRoute: '/bourbon',
    operatorProofRoute: '/operator/verticals/bourbon',
  },
  {
    slug: 'bbq',
    displayName: 'BBQ',
    trinity: 'passion',
    frame: 'Create Experiences',
    portfolioLabel: 'My BBQ Journal',
    portfolioKey: 'foundry-bbq-portfolio',
    missionCount: 5,
    academyLevels: 7,
    consumerRoute: '/bbq',
    operatorProofRoute: '/operator/verticals/bbq',
  },
  {
    slug: 'poker',
    displayName: 'Poker',
    trinity: 'passion',
    frame: 'Strategic Thinking',
    portfolioLabel: 'My Poker Journey',
    portfolioKey: 'foundry-poker-portfolio',
    missionCount: 5,
    academyLevels: 7,
    consumerRoute: '/poker',
    operatorProofRoute: '/operator/verticals/poker',
  },
];

export function getWorldBlueprint(slug: string): WorldBlueprint | undefined {
  return [...LIFE_LEVERAGE_WORLDS, ...PASSION_WORLDS].find((w) => w.slug === slug);
}

export function listWorldBlueprints(): WorldBlueprint[] {
  return [...LIFE_LEVERAGE_WORLDS, ...PASSION_WORLDS];
}

export type LayerStatus = 'done' | 'partial' | 'registry_only' | 'missing';

export type WorldAuditResult = {
  slug: string;
  displayName: string;
  trinity: WorldTrinity;
  automationPct: number;
  layers: Record<WorldLayer, LayerStatus>;
  blockers: string[];
  nextCommand: string;
};

/** PASS-024 — filesystem audit when full blueprint exists; legacy heuristic otherwise */
export function auditWorld(slug: string): WorldAuditResult | null {
  const blueprint = getWorldBlueprint(slug);
  if (!blueprint) return null;

  const fsAudit = auditWorldFs(slug);
  if (fsAudit) {
    const blockers: string[] = [];
    if (fsAudit.automationPct < 80) {
      blockers.push(`Automation at ${fsAudit.automationPct}% — run npm run build:world -- ${slug}`);
    }
    if (fsAudit.missing.length) {
      blockers.push(`${fsAudit.missing.length} files missing — re-run build:world`);
    }
    return {
      slug,
      displayName: blueprint.displayName,
      trinity: blueprint.trinity,
      automationPct: fsAudit.automationPct,
      layers: fsAudit.layers,
      blockers,
      nextCommand: `npm run build:world -- ${slug}`,
    };
  }

  const liveConsumer = ['ai-builder', 'financial-independence', 'public-speaking'].includes(slug);
  const layers: Record<WorldLayer, LayerStatus> = {
    world_hub: liveConsumer ? 'done' : 'missing',
    academy: liveConsumer ? 'done' : 'missing',
    missions: liveConsumer ? 'done' : 'missing',
    portfolio: liveConsumer ? 'done' : 'missing',
    parents: liveConsumer ? 'done' : 'missing',
    careers: liveConsumer ? 'done' : 'missing',
    glossary: liveConsumer ? 'done' : 'missing',
    community: liveConsumer ? 'partial' : 'missing',
    playground: liveConsumer ? 'done' : 'missing',
    operator_proof: liveConsumer ? 'partial' : 'missing',
    marketing_launch: ['ai-builder', 'financial-independence'].includes(slug) ? 'partial' : 'missing',
    seo_assets: 'missing',
    explore_registration: liveConsumer ? 'done' : 'missing',
  };

  const scores = { done: 1, partial: 0.6, registry_only: 0.25, missing: 0 };
  const automationPct = Math.round(
    (Object.values(layers).reduce((sum, s) => sum + scores[s], 0) / WORLD_LAYERS.length) * 100,
  );

  return {
    slug,
    displayName: blueprint.displayName,
    trinity: blueprint.trinity,
    automationPct,
    layers,
    blockers: [`Run npm run build:world -- ${slug}`],
    nextCommand: `npm run build:world -- ${slug}`,
  };
}

export function auditAllWorlds(): WorldAuditResult[] {
  return listWorldBlueprints().map((w) => auditWorld(w.slug)!).filter(Boolean);
}

export const BUILD_WORLD_TARGET_OUTPUT = [
  'World hub page',
  'Academy (7 levels)',
  '5 missions with WorldMissionRunner',
  'Portfolio view + localStorage key',
  'Parent page with one-liner',
  'Careers page',
  'Glossary',
  'Community shell',
  'Playground labs stub',
  'Operator proof page under /verticals/{slug}',
  'marketing/domains/{slug}/ pack',
  'SEO cluster map stub',
  'Explore catalog registration',
] as const;
