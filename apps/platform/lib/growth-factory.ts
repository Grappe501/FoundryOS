/** PASS-015A — Traffic Opportunity Registry + Growth Factory scoring */

export const GROWTH_FACTORY_FUNNEL = [
  'Traffic Event',
  'Permanent Domain',
  'Transformation System',
  'Retention',
  'Revenue',
] as const;

export type PortfolioScores = {
  traffic: number;
  identity: number;
  community: number;
  project_potential: number;
  collection_potential: number;
  retention: number;
  monetization: number;
};

export const PORTFOLIO_SCORE_LABELS: Record<keyof PortfolioScores, string> = {
  traffic: 'Traffic',
  identity: 'Identity',
  community: 'Community',
  project_potential: 'Project Potential',
  collection_potential: 'Collection Potential',
  retention: 'Retention',
  monetization: 'Monetization',
};

export const PORTFOLIO_SCORE_QUESTIONS: Record<keyof PortfolioScores, string> = {
  traffic: 'How many people search?',
  identity: 'Do people identify with it?',
  community: 'Do people gather around it?',
  project_potential: 'Can users do things?',
  collection_potential: 'Can users build assets?',
  retention: 'Will they return?',
  monetization: 'Will they pay?',
};

export const ACTIVE_DOMAIN_CRITERIA = [
  'Transformation Loop',
  'Evidence',
  'Collections',
  'Communities',
  'Reputation',
  'Mastery',
] as const;

export const ACTIVE_DOMAINS_JAN_2027_TARGET = 10;

/** Map legacy 3-score to 7-score when portfolio_scores absent */
export function normalizePortfolioScores(
  legacy?: { traffic: number; identity: number; monetization: number },
  portfolio?: Partial<PortfolioScores>
): PortfolioScores {
  if (portfolio && portfolio.community != null) {
    return {
      traffic: portfolio.traffic ?? 0,
      identity: portfolio.identity ?? 0,
      community: portfolio.community ?? 0,
      project_potential: portfolio.project_potential ?? 0,
      collection_potential: portfolio.collection_potential ?? 0,
      retention: portfolio.retention ?? 0,
      monetization: portfolio.monetization ?? 0,
    };
  }
  const t = legacy?.traffic ?? 0;
  const i = legacy?.identity ?? 0;
  const m = legacy?.monetization ?? 0;
  return {
    traffic: t,
    identity: i,
    community: Math.round(i * 0.85),
    project_potential: Math.round(i * 0.9),
    collection_potential: Math.round(m * 0.85),
    retention: Math.round((t + i) / 2 * 0.8),
    monetization: m,
  };
}

export function scorePortfolio(scores: PortfolioScores): number {
  return Object.values(scores).reduce((a, b) => a + b, 0);
}
