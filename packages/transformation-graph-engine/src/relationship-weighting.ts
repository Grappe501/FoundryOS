/**
 * Relationship Weighting — not all edges are equal. The graph learns.
 * Evolves toward Transformation Impact — not Content Consumption.
 */
export type WeightedRelationship = {
  source: string;
  target: string;
  relationship_type: string;
  weight: number;
  rationale: string;
};

/** Illustrative weights until live transformation data accumulates */
export const EXAMPLE_WEIGHTED_RELATIONSHIPS: WeightedRelationship[] = [
  {
    source: 'public-speaking',
    target: 'deliver-first-speech',
    relationship_type: 'predicts_mastery',
    weight: 95,
    rationale: 'First speech is highest predictor of speaker path completion',
  },
  {
    source: 'public-speaking',
    target: 'read-article',
    relationship_type: 'consumption',
    weight: 10,
    rationale: 'Information consumption — low transformation signal',
  },
  {
    source: 'road-to-confident-speaker',
    target: 'toastmasters-practice',
    relationship_type: 'accelerates',
    weight: 88,
    rationale: 'Structured practice correlates with mastery timeline',
  },
  {
    source: 'road-to-ai-builder',
    target: 'build-crm',
    relationship_type: 'predicts_completion',
    weight: 92,
    rationale: 'Applied project — 3x completion multiplier in illustrative data',
  },
  {
    source: 'speaker-circle',
    target: 'community-presentation',
    relationship_type: 'enables',
    weight: 78,
    rationale: 'Community project completion drives retention',
  },
];

export function compareRelationshipStrength(a: WeightedRelationship, b: WeightedRelationship): number {
  return b.weight - a.weight;
}
