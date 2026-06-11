import type { ContentPageSpec } from '@foundry/content-engine';
import type { EncyclopediaEntry } from '@foundry/encyclopedia-engine';
import type { RecipeCollection } from '@foundry/encyclopedia-engine';
import type { ExpertFactoryOutput } from './expert-factory';

/** Input to Self-Assembly Engine v1 */
export type AssemblyInput = {
  /** Display name e.g. "Buffalo Trace" */
  topic: string;
  /** URL slug e.g. "buffalo-trace" */
  slug: string;
  /** Universal entity type — spirit, film, book, album */
  entity_type: string;
  vertical_domain: string;
  vertical_id?: string;
  topic_id?: string;
  /** Optional seed attributes */
  attributes?: Record<string, unknown>;
};

export type PipelineStage =
  | 'generate'
  | 'validate'
  | 'score'
  | 'store'
  | 'publish_decision'
  | 'queued';

export type PublishDecision = 'hold' | 'eligible' | 'rejected';

export type EntityDraft = {
  slug: string;
  display_name: string;
  entity_type: string;
  description: string;
  attributes: Record<string, unknown>;
  metadata: Record<string, unknown>;
  aliases: string[];
  sources: string[];
  status: 'draft';
};

export type RelationshipDraft = {
  relationship_type: string;
  target_slug: string;
  target_display_name: string;
  strength: number;
  metadata?: Record<string, unknown>;
};

export type SeoDraft = {
  title: string;
  description: string;
  canonical_url: string;
  structured_data: unknown[];
  internal_links: Array<{ href: string; label: string }>;
  topic_clusters: string[];
};

export type ContentBundle = {
  pages: ContentPageSpec[];
  review_framework: { prompt: string; criteria: string[] };
};

export type AssemblyOutput = {
  run_id: string;
  input: AssemblyInput;
  entity: EntityDraft;
  content: ContentBundle;
  relationships: RelationshipDraft[];
  seo: SeoDraft;
  content_pages: ContentPageSpec[];
  encyclopedia: EncyclopediaEntry;
  recipes: RecipeCollection;
  /** PASS-009: Expert Factory — paths, academy, challenges per entity */
  expert: ExpertFactoryOutput;
  overall_score: number;
  page_scores: Record<string, number>;
  publish_decision: PublishDecision;
  stages_completed: PipelineStage[];
  generated_at: string;
  /** Always draft until publish gate passes */
  status: 'draft' | 'queued' | 'stored';
};

export type FactoryRunRecord = {
  id: string;
  run_type: 'entity' | 'topic';
  input: AssemblyInput;
  output: AssemblyOutput;
  status: string;
  overall_score: number;
  publish_decision: PublishDecision;
};
