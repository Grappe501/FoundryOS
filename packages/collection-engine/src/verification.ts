import type { CollectionVerificationStep, KnowledgeAssetItem, PersonalKnowledgeAsset } from './types';

export function buildCollectionVerificationChecklist(
  asset: PersonalKnowledgeAsset | null,
  items: KnowledgeAssetItem[],
  identityUpdated: boolean
): CollectionVerificationStep[] {
  const hasAsset = Boolean(asset?.slug);
  const hasEntity = items.length > 0;
  const evidenceLinked = items.some((i) => Boolean(i.evidence_submission_id)) || Boolean(asset?.evidence_linked);

  return [
    { key: 'created', label: 'Collection Created', complete: hasAsset },
    { key: 'entity', label: 'Entity Added', complete: hasEntity },
    { key: 'evidence', label: 'Evidence Linked', complete: evidenceLinked },
    { key: 'identity', label: 'Identity Updated', complete: identityUpdated && Boolean(asset?.identity_impact) },
  ];
}

export function isCollectionVerificationComplete(steps: CollectionVerificationStep[]): boolean {
  return steps.every((s) => s.complete);
}
