import type { DomainBlueprint } from './types';

export const PASS_016_TITLE = 'PASS-016 AI Builder Active Domain';
export const PASS_016_PASS_GATE =
  'Can a complete stranger discover this domain, start a transformation, and understand why they should come back tomorrow?';
export const PASS_016_PRINCIPLE =
  'Build the first Life Leverage Domain — not another hobby vertical. Market Future-Proof; AI Builder is a path inside.';
export const PASS_016_NOT_DELIVERABLE = [
  'AI news aggregator',
  'Prompt library only',
  'Tutorial content without projects',
];

export const AI_BUILDER_DOMAIN_SLUG = 'ai-builder';
export const AI_BUILDER_ACTION_SLUG = 'use-ai-to-solve-problem';
export const AI_BUILDER_ASSET_SLUG = 'my-ai-toolkit';
export const AI_BUILDER_COMMUNITY_SLUG = 'ai-builders-circle';

/** First Life Leverage Domain — Create Value path in Foundry Trinity */
export const AI_BUILDER_DOMAIN_BLUEPRINT: DomainBlueprint = {
  slug: AI_BUILDER_DOMAIN_SLUG,
  display_name: 'AI Builder',
  vertical_slug: 'ai-builder',
  care_reason:
    'AI is reshaping every career. Parents, students, and professionals need to create value — not just consume tutorials. Builders who ship projects compound faster.',
  outcome: {
    slug: 'become-ai-builder',
    display_name: 'Become an AI Builder',
  },
  mastery_levels: [
    { slug: 'ai-explorer', display_name: 'AI Explorer', order: 1 },
    { slug: 'ai-practitioner', display_name: 'AI Practitioner', order: 2 },
    { slug: 'ai-builder', display_name: 'AI Builder', order: 3 },
    { slug: 'ai-architect', display_name: 'AI Architect', order: 4 },
    { slug: 'ai-mentor', display_name: 'AI Mentor', order: 5 },
  ],
  paths: [
    { slug: 'road-to-ai-builder', display_name: 'Road to AI Builder', tier: 'ai-builder' },
    { slug: 'road-to-ai-architect', display_name: 'Road to AI Architect', tier: 'ai-architect' },
  ],
  projects: [
    { slug: 'use-ai-to-solve-problem', display_name: 'Use AI to Solve a Problem' },
    { slug: 'build-first-automation', display_name: 'Build First Automation' },
    { slug: 'build-first-website', display_name: 'Build First Website' },
    { slug: 'build-first-assistant', display_name: 'Build First Assistant' },
    { slug: 'build-first-business-workflow', display_name: 'Build First Business Workflow' },
  ],
  collection: {
    slug: AI_BUILDER_ASSET_SLUG,
    display_name: 'My AI Toolkit',
    asset_type: 'project_portfolio',
  },
  community: {
    slug: AI_BUILDER_COMMUNITY_SLUG,
    display_name: 'AI Builders Circle',
    community_type: 'circle',
  },
  roles: ['Explorer', 'Practitioner', 'Builder', 'Architect', 'Mentor'],
};

export const AI_BUILDER_FIRST_PROJECT = AI_BUILDER_DOMAIN_BLUEPRINT.projects[0]!;

export const AI_BUILDER_SUCCESS_NARRATIVE = {
  start: "I keep hearing about AI but I don't know where to start.",
  end: 'I used AI to solve a real problem. My project is in My AI Toolkit. I earned AI Explorer. I know exactly what to build tomorrow.',
};

export const AI_BUILDER_TOMORROW_HOOK =
  'Tomorrow: document your project, submit evidence, and unlock your first mastery milestone — AI Explorer.';
