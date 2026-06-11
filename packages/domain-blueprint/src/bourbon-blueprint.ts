import type { DomainBlueprint } from './types';

export const PASS_014_TITLE = 'PASS-014 Domain Proof';
export const PASS_014_PASS_GATE =
  'Does the Human Potential Infrastructure stack work in a real-world domain?';
export const PASS_014_PRINCIPLE = 'Domain changes. The loop does not.';
export const PASS_014_NOT_DELIVERABLE = ['Bourbon articles', 'Bourbon encyclopedia', 'Bourbon reviews'];

export const DEMO_USER_SLUG = 'demo-user';
export const BOURBON_DOMAIN_SLUG = 'bourbon';
export const BOURBON_ACTION_SLUG = 'compare-four-bourbons-blind-tasting';
export const BOURBON_ASSET_SLUG = 'my-bourbon-shelf';
export const BOURBON_COMMUNITY_SLUG = 'central-arkansas-bourbon-society';

/** First domain instance — template for Poker, Physics, AI Builder, etc. */
export const BOURBON_DOMAIN_BLUEPRINT: DomainBlueprint = {
  slug: 'bourbon',
  display_name: 'Bourbon',
  vertical_slug: 'bourbon',
  care_reason:
    'Bourbon is a lifelong identity domain — taste, history, community, and mentorship compound over decades.',
  outcome: {
    slug: 'become-bourbon-enthusiast',
    display_name: 'Become a Bourbon Enthusiast',
  },
  mastery_levels: [
    { slug: 'curious-beginner', display_name: 'Curious Beginner', order: 1 },
    { slug: 'enthusiast', display_name: 'Enthusiast', order: 2 },
    { slug: 'collector', display_name: 'Collector', order: 3 },
    { slug: 'historian', display_name: 'Historian', order: 4 },
    { slug: 'steward', display_name: 'Steward', order: 5 },
    { slug: 'master', display_name: 'Master', order: 6 },
  ],
  paths: [
    { slug: 'road-to-bourbon-enthusiast', display_name: 'Road to Bourbon Enthusiast', tier: 'enthusiast' },
    { slug: 'road-to-bourbon-collector', display_name: 'Road to Bourbon Collector', tier: 'collector' },
    { slug: 'road-to-bourbon-historian', display_name: 'Road to Bourbon Historian', tier: 'historian' },
    { slug: 'road-to-bourbon-steward', display_name: 'Road to Bourbon Steward', tier: 'steward' },
    { slug: 'road-to-bourbon-master', display_name: 'Road to Bourbon Master', tier: 'master' },
  ],
  projects: [
    { slug: 'host-first-blind-tasting', display_name: 'Host First Blind Tasting' },
    { slug: 'build-starter-shelf', display_name: 'Build Starter Shelf' },
    { slug: 'visit-first-distillery', display_name: 'Visit First Distillery' },
    { slug: 'compare-mash-bills', display_name: 'Compare Mash Bills' },
    { slug: 'lead-blind-tasting', display_name: 'Lead Blind Tasting' },
    { slug: 'teach-new-enthusiast', display_name: 'Teach New Enthusiast' },
  ],
  collection: {
    slug: 'my-bourbon-shelf',
    display_name: 'My Bourbon Shelf',
    asset_type: 'bourbon_collection',
  },
  community: {
    slug: 'central-arkansas-bourbon-society',
    display_name: 'Central Arkansas Bourbon Society',
    community_type: 'society',
  },
  roles: ['Enthusiast', 'Collector', 'Historian', 'Steward', 'Mentor'],
};

const BLUEPRINT_REGISTRY: Record<string, DomainBlueprint> = {
  [BOURBON_DOMAIN_BLUEPRINT.slug]: BOURBON_DOMAIN_BLUEPRINT,
};

export function getDomainBlueprint(domainSlug: string): DomainBlueprint | null {
  return BLUEPRINT_REGISTRY[domainSlug] ?? null;
}

export function listDomainBlueprints(): DomainBlueprint[] {
  return Object.values(BLUEPRINT_REGISTRY);
}

export function blueprintToRecord(blueprint: DomainBlueprint) {
  return {
    slug: blueprint.slug,
    display_name: blueprint.display_name,
    vertical_slug: blueprint.vertical_slug,
    care_reason: blueprint.care_reason,
    blueprint: {
      outcome: blueprint.outcome,
      mastery_levels: blueprint.mastery_levels,
      paths: blueprint.paths,
      projects: blueprint.projects,
      collection: blueprint.collection,
      community: blueprint.community,
      roles: blueprint.roles,
    },
  };
}
