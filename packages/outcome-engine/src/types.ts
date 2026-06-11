/** Life Journey — registry above outcomes */
export type LifeJourney = {
  slug: string;
  display_name: string;
  journey_statement: string;
  linked_outcome_slugs: string[];
  equation_phase: 'potential' | 'capability' | 'contribution' | 'legacy';
  market: 'education' | 'career' | 'hobby' | 'community' | 'life';
  status: 'exemplar' | 'active' | 'planned';
};

/** Human Outcome — goals, not subjects. Below Life Journeys. */
export type HumanOutcome = {
  slug: string;
  display_name: string;
  /** What the person actually wants */
  goal_statement: string;
  /** Domains are paths traveled to reach the outcome */
  linked_domains: string[];
  linked_paths?: string[];
  linked_projects?: string[];
  category: 'leadership' | 'financial' | 'craft' | 'technical' | 'health' | 'creative' | 'civic';
  status: 'exemplar' | 'active' | 'planned';
};

export type TransformationSystemComponent =
  | 'outcomes'
  | 'paths'
  | 'projects'
  | 'communities'
  | 'mentors'
  | 'roles'
  | 'legacy';

export type TransformationSystemLink = {
  component: TransformationSystemComponent;
  connected: boolean;
  example?: string;
};

/** Purpose — why does this domain matter to me? */
export type DomainPurpose = {
  domain_slug: string;
  domain_display_name: string;
  wikipedia_answer: string;
  foundry_answer: string;
};
