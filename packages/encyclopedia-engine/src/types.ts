/** Every entity gets a full encyclopedia — the Foundry Knowledge Universe */

export type EncyclopediaSectionSlug =
  | 'definition'
  | 'history'
  | 'cultural_significance'
  | 'geographic_significance'
  | 'trivia'
  | 'related_concepts'
  | 'common_misconceptions'
  | 'beginner_explanation'
  | 'expert_explanation'
  | 'sources';

export type EncyclopediaSection = {
  slug: EncyclopediaSectionSlug;
  display_name: string;
  description: string;
  path_segment: string;
  schema_hint: string;
};

export type GeographicPerspective = {
  region: string;
  perspective: string;
  significance?: string;
};

export type EncyclopediaSource = {
  label: string;
  url?: string;
  type: 'verified' | 'editorial' | 'community' | 'generated';
};

export type EncyclopediaSectionContent = {
  section: EncyclopediaSectionSlug;
  title: string;
  body: string;
  /** Structured extras per section */
  metadata: Record<string, unknown>;
  sources: EncyclopediaSource[];
  content_score: number;
  status: 'draft';
};

export type EncyclopediaEntry = {
  entity_slug: string;
  entity_display_name: string;
  entity_type: string;
  vertical_id?: string;
  sections: EncyclopediaSectionContent[];
  generated_at: string;
};

export type EncyclopediaInput = {
  entity_slug: string;
  entity_display_name: string;
  entity_type: string;
  vertical_id?: string;
  vertical_domain?: string;
  attributes?: Record<string, unknown>;
};
