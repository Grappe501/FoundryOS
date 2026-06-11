/** PASS-030 — Learning Lane (parallel with PASS-031 Marketing Factory) */

export const LEARNING_LANE_RULES = {
  max_testers: 25,
  no_ads: true,
  no_public_launch: true,
  no_scaling: true,
  gate: 'PASS-029A verification must pass before first invite',
} as const;

export const LEARNING_LANE_METRICS = [
  { key: 'return_rate', label: 'Return rate', description: 'Testers who return within 7 days of first session' },
  { key: 'mission_completion', label: 'Mission completion', description: 'Mission 1 → Mission 5 completion rate by world' },
  { key: 'community_participation', label: 'Community participation', description: 'Discussions, showcases, challenge posts' },
  { key: 'upgrade_intent', label: 'Upgrade intent', description: 'pricing_clicked + upgrade_initiated events' },
  { key: 'payment_conversion', label: 'Payment conversion', description: 'upgrade_completed / pricing_viewed' },
] as const;

export const LEARNING_LANE_SEGMENTS = [
  'student',
  'parent',
  'educator',
  'adult_learner',
  'hobbyist',
] as const;

export const LEARNING_LANE_WORLDS = [
  { slug: 'ai-builder', label: 'AI Builder', priority: 'primary' },
  { slug: 'financial-independence', label: 'Financial Independence', priority: 'primary' },
  { slug: 'public-speaking', label: 'Public Speaking', priority: 'primary' },
  { slug: 'civic-engagement', label: 'Civic Engagement', priority: 'expansion' },
  { slug: 'bourbon', label: 'Bourbon', priority: 'retention' },
  { slug: 'bbq', label: 'BBQ', priority: 'retention' },
  { slug: 'poker', label: 'Poker', priority: 'retention' },
] as const;
