import type { LaunchDefinition } from '../types';

/** Life Leverage Domain #1 — Create Value path in Foundry Trinity */
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
      'AI is reshaping every career. Parents, students, and professionals need to create value — not just consume tutorials.',
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
      slug: 'my-ai-toolkit',
      display_name: 'My AI Toolkit',
      asset_type: 'project_portfolio',
    },
    community: {
      slug: 'ai-builders-circle',
      display_name: 'AI Builders Circle',
      community_type: 'circle',
    },
    roles: ['Explorer', 'Practitioner', 'Builder', 'Architect', 'Mentor'],
  },
  seo_pages: [
    { slug: 'how-to-learn-ai', title: 'How Do I Learn AI?', intent: 'traffic' },
    { slug: 'what-is-ai-builder', title: 'What Is an AI Builder?', intent: 'definition' },
    { slug: 'beginner-guide', title: 'Beginner Guide to Building with AI', intent: 'beginner' },
    { slug: 'road-to-expert', title: 'Road to AI Builder', intent: 'path' },
    { slug: 'projects', title: 'AI Builder Projects', intent: 'projects' },
    { slug: 'common-mistakes', title: 'Common AI Builder Mistakes', intent: 'mistakes' },
  ],
  growth: {
    target_user: 'Parents, students, young professionals, career changers — market Future-Proof, not AI Builder alone',
    traffic_sources: ['SEO: How do I learn AI?', 'Future-Proof Assessment', 'YouTube', 'Schools', 'Parents'],
    opportunity_score: 64,
    tier_2_hook: 'My AI Toolkit — projects, workflows, evidence of what you built',
    tier_3_hook: 'AI Builders Circle — ship together, get feedback, find collaborators',
    kpis: ['assessment_completions', 'registered_users', 'projects_completed', 'evidence_submitted', 'paid_conversions'],
  },
  first_project_action: {
    slug: 'use-ai-to-solve-problem',
    text: 'Use AI to solve a real problem and document what you built',
    evidence_title: 'Project completed',
  },
  notes: 'PASS-016 — First Life Leverage Domain. Market Become Future-Proof; AI Builder is Create Value path.',
};
