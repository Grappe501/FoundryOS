/**
 * Transformation Momentum Engine — is this person moving forward? (PASS-010)
 * Not gamification. A progress signal.
 */
export const TRANSFORMATION_MOMENTUM_LABEL = 'Transformation Momentum Engine';

export const MOMENTUM_QUESTION = 'Is this person moving forward?';

export type MomentumSignal = {
  key: string;
  label: string;
  weight: number;
};

/** Components that compose a momentum score — not a gamification score */
export const MOMENTUM_SIGNALS: MomentumSignal[] = [
  { key: 'knowledge_acquired', label: 'Knowledge Acquired', weight: 15 },
  { key: 'projects_started', label: 'Projects Started', weight: 20 },
  { key: 'projects_completed', label: 'Projects Completed', weight: 30 },
  { key: 'mentorship_activity', label: 'Mentorship Activity', weight: 20 },
  { key: 'community_participation', label: 'Community Participation', weight: 15 },
];

export type MomentumState = 'accelerating' | 'moving' | 'stagnant' | 'declining';

export type TransformationMomentumSnapshot = {
  user_id?: string;
  path_slug: string;
  momentum_score: number;
  state: MomentumState;
  signals: Record<string, number>;
  stagnation_days?: number;
  status: 'exemplar' | 'planned';
};

export const MOMENTUM_ENGINE_TRACKS = [
  'momentum',
  'stagnation',
  'acceleration',
  'next_best_action',
] as const;

/** Illustrative snapshot until live user data accumulates */
export const EXAMPLE_MOMENTUM: TransformationMomentumSnapshot = {
  path_slug: 'road-to-confident-speaker',
  momentum_score: 72,
  state: 'moving',
  signals: {
    knowledge_acquired: 80,
    projects_started: 65,
    projects_completed: 70,
    mentorship_activity: 40,
    community_participation: 55,
  },
  stagnation_days: 0,
  status: 'exemplar',
};
