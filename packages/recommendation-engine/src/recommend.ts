export type UserSegment = 'student' | 'teen' | 'parent' | 'adult' | 'caregiver' | 'operator';
export type PricingTier = 'free' | 'build' | 'mastery';

export type RecommendationContext = {
  current_world: string;
  completed_missions?: string[];
  portfolio_items?: string[];
  user_segment: UserSegment;
  pricing_tier: PricingTier;
};

export type WorldRecommendation = {
  world_slug: string;
  world_name: string;
  reason: string;
  href: string;
  score: number;
};

type Edge = {
  from: string;
  to: string;
  reason: string;
  weight: number;
  min_segment?: UserSegment[];
};

const EDGES: Edge[] = [
  { from: 'ai-builder', to: 'entrepreneur', reason: 'Productize the assistant you built', weight: 90 },
  { from: 'ai-builder', to: 'financial-independence', reason: 'Price and budget your side project', weight: 75 },
  { from: 'ai-builder', to: 'public-speaking', reason: 'Demo what you built with confidence', weight: 70 },
  { from: 'financial-independence', to: 'entrepreneur', reason: 'Turn savings discipline into a business', weight: 80 },
  { from: 'financial-independence', to: 'ai-builder', reason: 'Automate money tracking with AI', weight: 65 },
  { from: 'public-speaking', to: 'civic-engagement', reason: 'Speak up in public forums', weight: 85 },
  { from: 'public-speaking', to: 'entrepreneur', reason: 'Pitch your offer clearly', weight: 75 },
  { from: 'civic-engagement', to: 'public-speaking', reason: 'Deliver a public comment', weight: 80 },
  { from: 'civic-engagement', to: 'government-systems', reason: 'Understand agencies and rulemaking', weight: 85 },
  { from: 'civic-engagement', to: 'grassroots-nonprofit', reason: 'Organize beyond the ballot', weight: 70 },
  { from: 'bourbon', to: 'bbq', reason: 'Host a pairing night', weight: 75, min_segment: ['adult', 'operator'] },
  { from: 'bourbon', to: 'public-speaking', reason: 'Host a tasting with a narrative arc', weight: 65, min_segment: ['adult', 'operator'] },
  { from: 'bbq', to: 'public-speaking', reason: 'MC your cookout', weight: 60, min_segment: ['teen', 'adult', 'operator'] },
  { from: 'poker', to: 'chess', reason: 'Deepen strategic thinking', weight: 55, min_segment: ['adult', 'operator'] },
  { from: 'entrepreneur', to: 'financial-independence', reason: 'Separate business and personal books', weight: 80 },
  { from: 'entrepreneur', to: 'public-speaking', reason: 'Sell and tell your story', weight: 75 },
];

const ADULT_WORLDS = new Set(['bourbon', 'poker', 'cigars', 'medical-cannabis-literacy']);
const TEEN_BLOCKED = new Set(['bourbon', 'poker', 'cigars', 'medical-cannabis-literacy', 'bbq', 'astrology']);

const WORLD_NAMES: Record<string, string> = {
  'ai-builder': 'AI Builder',
  'financial-independence': 'Financial Independence',
  'public-speaking': 'Public Speaking',
  'civic-engagement': 'Civic Engagement',
  entrepreneur: 'Entrepreneur / Business Builder',
  'government-systems': 'Government Systems',
  'grassroots-nonprofit': 'Grassroots & Nonprofits',
  bourbon: 'Bourbon',
  bbq: 'BBQ',
  poker: 'Poker',
  chess: 'Chess',
};

export function recommendWorlds(ctx: RecommendationContext): WorldRecommendation[] {
  const edges = EDGES.filter((e) => e.from === ctx.current_world);
  const completed = new Set(ctx.completed_missions ?? []);

  const recs: WorldRecommendation[] = [];

  for (const edge of edges) {
    if (ctx.user_segment === 'student' && TEEN_BLOCKED.has(edge.to)) continue;
    if (ctx.user_segment === 'teen' && TEEN_BLOCKED.has(edge.to)) continue;
    if ((ctx.user_segment === 'student' || ctx.user_segment === 'teen') && ADULT_WORLDS.has(edge.to)) continue;
    if (edge.min_segment && !edge.min_segment.includes(ctx.user_segment)) continue;

    let score = edge.weight;
    if (completed.size >= 3) score += 5;
    if (ctx.pricing_tier === 'mastery') score += 2;

    recs.push({
      world_slug: edge.to,
      world_name: WORLD_NAMES[edge.to] ?? edge.to,
      reason: edge.reason,
      href: liveHref(edge.to),
      score,
    });
  }

  return recs.sort((a, b) => b.score - a.score).slice(0, 5);
}

function liveHref(slug: string): string {
  const live: Record<string, string> = {
    'ai-builder': '/ai-builder',
    'financial-independence': '/financial-independence',
    'public-speaking': '/public-speaking',
    'civic-engagement': '/civic-engagement',
    bourbon: '/bourbon',
    bbq: '/bbq',
    poker: '/poker',
    chess: '/chess',
  };
  return live[slug] ?? `/explore/${slug}`;
}
