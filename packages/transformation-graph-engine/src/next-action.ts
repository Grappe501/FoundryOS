/**
 * Next Highest-Value Action — the hardest problem in self-development (PASS-010).
 */
export const PASS_010_PASS_GATE =
  'Can the system identify the next highest-value action for a person trying to become something?';

export const PASS_010_PASS_GATE_RULE =
  'If the graph answers that accurately — and explains why — Foundry stops being a repository of knowledge and becomes a guide for human growth.';

/** Transparency layer — required before PASS-012 */
export const WHY_NEXT_BEST_STEP_QUESTION = 'Why is that the next best step?';

export const WHY_TRANSPARENCY_PRINCIPLE =
  'People trust guidance when they understand it. Transparency matters as the graph becomes more intelligent.';

export const NEXT_ACTION_ENGINE_LABEL = 'Next Highest-Value Action Engine';

export type ImpactLevel = 'high' | 'medium' | 'low';

export type NextActionRecommendation = {
  path_slug: string;
  path_display_name: string;
  aspiration: string;
  recommended_action: string;
  impact_score: ImpactLevel;
  why: string;
  /** Full transparent explanation — why this is the next best step */
  why_detail: string;
  success_rate_pct: number;
  rationale: string;
  journeys_analyzed: number;
  status: 'exemplar' | 'planned';
};

/** Illustrative recommendations until live graph data accumulates */
export const EXAMPLE_NEXT_ACTIONS: NextActionRecommendation[] = [
  {
    path_slug: 'road-to-confident-speaker',
    path_display_name: 'Road to Public Speaker',
    aspiration: 'I want to become a better speaker.',
    recommended_action: 'Deliver a 5-minute speech to a live audience.',
    impact_score: 'high',
    why: '73% of successful speakers completed this milestone before joining advanced speaking groups.',
    why_detail:
      'Recommended: Deliver a 5-minute speech. Why: 73% of successful speakers completed this milestone before joining advanced speaking groups. Not AI guessed — graph observed.',
    success_rate_pct: 73,
    rationale: 'Highest transformation impact vs. consumption — agency signal, not knowledge signal.',
    journeys_analyzed: 10000,
    status: 'exemplar',
  },
];
