export type CollectionKpiSnapshot = {
  knowledge_assets_total: number;
  knowledge_assets_with_evidence: number;
  identity_collections_strength: number;
};

export const COLLECTION_KPI_KEYS = {
  assets: 'knowledge_assets_total',
  with_evidence: 'knowledge_assets_with_evidence',
  identity_strength: 'identity_collections_strength',
} as const;

export function getCollectionKpiSnapshot(live?: Partial<CollectionKpiSnapshot>): CollectionKpiSnapshot {
  const total = live?.knowledge_assets_total ?? 0;
  const withEvidence = live?.knowledge_assets_with_evidence ?? 0;
  return {
    knowledge_assets_total: total,
    knowledge_assets_with_evidence: withEvidence,
    identity_collections_strength: live?.identity_collections_strength ?? (withEvidence > 0 ? 1 : 0),
  };
}
