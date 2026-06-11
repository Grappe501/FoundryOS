/** Personal Knowledge Asset — not a favorites list */

export type KnowledgeAssetType =
  | 'knowledge_asset'
  | 'speech_library'
  | 'garden_journal'
  | 'project_portfolio'
  | 'bourbon_collection';

export type PersonalKnowledgeAsset = {
  id?: string;
  user_slug: string;
  slug: string;
  display_name: string;
  description: string | null;
  domain_slug: string;
  asset_type: KnowledgeAssetType;
  identity_impact: string | null;
  evidence_linked: boolean;
  entity_count: number;
  metadata: Record<string, unknown>;
};

export type KnowledgeAssetItem = {
  id?: string;
  asset_id?: string;
  entity_slug: string;
  entity_display_name: string;
  sort_order: number;
  personal_rating: number | null;
  personal_notes: string | null;
  evidence_submission_id: string | null;
};

export type CollectionVerificationStep = {
  key: string;
  label: string;
  complete: boolean;
};
