/** PASS-040A — Artifact primitive types */

/** Evidence of participation — not a file, row, or content type alone */
export type ArtifactType =
  | 'review'
  | 'note'
  | 'recommendation'
  | 'visit'
  | 'event'
  | 'speech'
  | 'project'
  | 'recipe'
  | 'prompt'
  | 'workflow'
  | 'research'
  | 'comparison'
  | 'journal'
  | 'collection_entry';

export type ArtifactRelationType =
  | 'created_by'
  | 'references'
  | 'inspired_by'
  | 'part_of'
  | 'recommended_by'
  | 'hosted_at'
  | 'connected_to';

export type ArtifactPrivacy = 'private' | 'community' | 'public';

export type ArtifactEvidenceLevel = 'self_reported' | 'community' | 'editorial' | 'verified';

export type GraphEntityRef = {
  world_slug: string;
  entity_type: string;
  slug: string;
  title?: string;
};

export type ArtifactRelation = {
  type: ArtifactRelationType;
  target: GraphEntityRef | { artifact_id: string };
  label?: string;
};

export type ArtifactMetadata = {
  world_slug: string;
  title: string;
  summary?: string;
  occurred_at: string;
  people?: string[];
  places?: string[];
  topics?: string[];
  entities?: GraphEntityRef[];
  collection_ids?: string[];
  privacy: ArtifactPrivacy;
  evidence: ArtifactEvidenceLevel;
  payload?: Record<string, unknown>;
};

export type FoundryArtifact = {
  id: string;
  type: ArtifactType;
  user_id: string;
  metadata: ArtifactMetadata;
  relations: ArtifactRelation[];
  created_at: string;
  updated_at: string;
};

/** One artifact — many meanings (e.g. WT101 review) */
export type ArtifactSemanticRole =
  | 'artifact'
  | 'review'
  | 'collection_item'
  | 'identity_signal'
  | 'recommendation_source'
  | 'reputation_source'
  | 'atlas_connection';

export type CreateArtifactInput = {
  type: ArtifactType;
  user_id: string;
  metadata: Omit<ArtifactMetadata, 'evidence'> & { evidence?: ArtifactEvidenceLevel };
  relations?: ArtifactRelation[];
};
