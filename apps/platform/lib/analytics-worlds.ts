/** PASS-027 — Analytics world registry */

export const ANALYTICS_WORLDS = [
  { slug: 'ai-builder', label: 'AI Builder' },
  { slug: 'financial-independence', label: 'Financial Independence' },
  { slug: 'public-speaking', label: 'Public Speaking' },
  { slug: 'bourbon', label: 'Bourbon' },
  { slug: 'bbq', label: 'BBQ' },
  { slug: 'poker', label: 'Poker' },
  { slug: 'civic-engagement', label: 'Civic Engagement' },
] as const;

export type AnalyticsWorldSlug = (typeof ANALYTICS_WORLDS)[number]['slug'];

export const WORLD_MISSION_COUNTS: Record<string, number> = {
  'ai-builder': 5,
  'financial-independence': 5,
  'public-speaking': 5,
  bourbon: 5,
  bbq: 5,
  poker: 5,
  'civic-engagement': 5,
};
