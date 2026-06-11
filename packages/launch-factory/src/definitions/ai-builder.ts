import type { LaunchDefinition } from '../types';

/** Domain #2 candidate — highest opportunity score (64) */
export const AI_BUILDER_LAUNCH: LaunchDefinition = {
  slug: 'ai-builder',
  display_name: 'AI Builder',
  vertical_slug: 'ai-builder',
  launch_priority: 2,
  blueprint: {
    slug: 'ai-builder',
    display_name: 'AI Builder',
    vertical_slug: 'ai-builder',
    care_reason:
      'AI is reshaping every career. Builders who ship projects compound faster than those who only consume tutorials.',
    outcome: {
      slug: 'become-ai-builder',
      display_name: 'Become an AI Builder',
    },
    mastery_levels: [
      { slug: 'curious-beginner', display_name: 'Curious Beginner', order: 1 },
      { slug: 'prompt-engineer', display_name: 'Prompt Engineer', order: 2 },
      { slug: 'workflow-builder', display_name: 'Workflow Builder', order: 3 },
      { slug: 'product-builder', display_name: 'Product Builder', order: 4 },
      { slug: 'ai-architect', display_name: 'AI Architect', order: 5 },
      { slug: 'ai-mentor', display_name: 'AI Mentor', order: 6 },
    ],
    paths: [
      { slug: 'road-to-ai-builder', display_name: 'Road to AI Builder', tier: 'prompt-engineer' },
      { slug: 'road-to-ai-product-owner', display_name: 'Road to AI Product Owner', tier: 'product-builder' },
    ],
    projects: [
      { slug: 'ship-first-ai-project', display_name: 'Ship First AI Project' },
      { slug: 'build-personal-ai-workflow', display_name: 'Build Personal AI Workflow' },
      { slug: 'automate-repetitive-task', display_name: 'Automate a Repetitive Task' },
      { slug: 'launch-ai-side-project', display_name: 'Launch AI Side Project' },
      { slug: 'teach-someone-ai-basics', display_name: 'Teach Someone AI Basics' },
    ],
    collection: {
      slug: 'my-ai-toolkit',
      display_name: 'My AI Toolkit',
      asset_type: 'project_portfolio',
    },
    community: {
      slug: 'ai-builders-circle',
      display_name: 'AI Builders Circle',
      community_type: 'circle',
    },
    roles: ['Builder', 'Prompt Engineer', 'Product Owner', 'Mentor'],
  },
  seo_pages: [
    { slug: 'what-is-ai-builder', title: 'What Is an AI Builder?', intent: 'definition' },
    { slug: 'beginner-guide', title: 'Beginner Guide to Building with AI', intent: 'beginner' },
    { slug: 'road-to-expert', title: 'Road to AI Builder', intent: 'path' },
    { slug: 'projects', title: 'AI Builder Projects', intent: 'projects' },
    { slug: 'common-mistakes', title: 'Common AI Builder Mistakes', intent: 'mistakes' },
    { slug: 'best-resources', title: 'Best AI Builder Resources', intent: 'resources' },
  ],
  growth: {
    target_user: 'Professional who wants to ship with AI — not just chat',
    traffic_sources: ['SEO', 'YouTube', 'Twitter/X', 'Reddit r/LocalLLaMA', 'Referrals'],
    opportunity_score: 64,
    tier_2_hook: 'My AI Toolkit — save workflows, prompts, and project notes',
    tier_3_hook: 'AI Builders Circle — share projects, get feedback, find collaborators',
    kpis: ['registered_users', 'projects_started', 'evidence_submitted', 'paid_conversions'],
  },
  first_project_action: {
    slug: 'ship-first-ai-project',
    text: 'Ship a working AI project and document what you built',
    evidence_title: 'First AI project shipped',
  },
  notes: 'Ideal early adopter domain — pays, creates, shares, refers.',
};

const LAUNCH_DEFINITIONS: Record<string, LaunchDefinition> = {
  [AI_BUILDER_LAUNCH.slug]: AI_BUILDER_LAUNCH,
};

export function getLaunchDefinition(slug: string): LaunchDefinition | null {
  return LAUNCH_DEFINITIONS[slug] ?? null;
}

export function listLaunchDefinitions(): LaunchDefinition[] {
  return Object.values(LAUNCH_DEFINITIONS);
}
