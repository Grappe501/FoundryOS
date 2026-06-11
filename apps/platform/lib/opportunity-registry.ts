import registry from '../../../marketing/opportunities/registry.json';
import {
  normalizePortfolioScores,
  scorePortfolio,
  type PortfolioScores,
} from './growth-factory';

export type OpportunityType = 'traffic_event' | 'seasonal' | 'evergreen';

export type OpportunityScores = {
  traffic: number;
  identity: number;
  monetization: number;
};

export type TrafficOpportunity = {
  slug: string;
  display_name: string;
  type: OpportunityType;
  event_window: string;
  permanent_domain_slug: string;
  permanent_domain_name: string;
  launch_rank: number | null;
  scores: OpportunityScores;
  portfolio_scores?: Partial<PortfolioScores>;
  search_intent: string[];
  transformation_paths: string[];
  status: 'tracking' | 'planned' | 'active' | 'archived';
  note?: string;
};

export type ScoredOpportunity = TrafficOpportunity & {
  portfolio: PortfolioScores;
  total_score: number;
  legacy_score: number;
};

export const OPPORTUNITY_PRINCIPLE = registry.principle;

export const OPPORTUNITY_ANTI_PATTERNS = (registry as { anti_patterns?: string[] }).anti_patterns ?? [];

export const OPPORTUNITY_ANTI_PATTERN_RATIONALE =
  (registry as { anti_pattern_rationale?: string }).anti_pattern_rationale ?? '';

export function scoreOpportunityLegacy(scores: OpportunityScores): number {
  return scores.traffic + scores.identity + scores.monetization;
}

function enrichOpportunity(o: TrafficOpportunity): ScoredOpportunity {
  const portfolio = normalizePortfolioScores(o.scores, o.portfolio_scores);
  return {
    ...o,
    portfolio,
    total_score: scorePortfolio(portfolio),
    legacy_score: scoreOpportunityLegacy(o.scores),
  };
}

export function listTrafficOpportunities(): ScoredOpportunity[] {
  return (registry.opportunities as TrafficOpportunity[])
    .map(enrichOpportunity)
    .sort((a, b) => b.total_score - a.total_score);
}

export function listLaunchSequence(): ScoredOpportunity[] {
  return listTrafficOpportunities()
    .filter((o) => o.launch_rank != null)
    .sort((a, b) => (a.launch_rank ?? 99) - (b.launch_rank ?? 99));
}

export function getOpportunityBySlug(slug: string): ScoredOpportunity | null {
  const found = (registry.opportunities as TrafficOpportunity[]).find((o) => o.slug === slug);
  if (!found) return null;
  return enrichOpportunity(found);
}

export function getOpportunitiesForDomain(domainSlug: string): ScoredOpportunity[] {
  return listTrafficOpportunities().filter((o) => o.permanent_domain_slug === domainSlug);
}

/** January 2027 — 10 Active Domains target */
export const JANUARY_2027_LAUNCH_SEQUENCE = [
  { rank: 1, slug: 'bourbon', name: 'Bourbon', rationale: 'PASS-014 — Active Domain #1' },
  { rank: 2, slug: 'ai-builder', name: 'AI Builder', rationale: 'AI Boom acquisition · highest portfolio score' },
  { rank: 3, slug: 'public-speaking', name: 'Public Speaking', rationale: 'Evergreen · PASS-010 loop operational' },
  {
    rank: 4,
    slug: 'civic-engagement',
    name: 'Civic Engagement',
    rationale: 'Midterms → Civic Engagement · projects + communities + recurring traffic',
  },
  { rank: 5, slug: 'master-gardener', name: 'Gardening', rationale: 'Gardening Season → Master Gardener' },
  { rank: 6, slug: 'bbq', name: 'BBQ', rationale: 'BBQ Season · strong identity' },
  { rank: 7, slug: 'poker', name: 'Poker', rationale: 'Strong identity domain' },
  { rank: 8, slug: 'soccer', name: 'Soccer', rationale: 'World Cup 2026 → Soccer' },
  { rank: 9, slug: 'books', name: 'Books', rationale: 'Collection + community' },
  { rank: 10, slug: 'movies', name: 'Movies', rationale: 'Collection + community' },
] as const;

export const OPPORTUNITY_TYPE_LABELS: Record<OpportunityType, string> = {
  traffic_event: 'Traffic Event → Permanent Domain',
  seasonal: 'Seasonal → Permanent Domain',
  evergreen: 'Evergreen Domain',
};
