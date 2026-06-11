import { ensureDemoKnowledgeAsset } from '@foundry/db';
import {
  buildCollectionVerificationChecklist,
  buildDemoKnowledgeAsset,
  buildDemoKnowledgeAssetItem,
  isCollectionVerificationComplete,
} from '@foundry/collection-engine';

export async function loadPass012CollectionsVerification() {
  const built = buildDemoKnowledgeAsset();
  const { asset, items, persisted, error, identityUpdated } = await ensureDemoKnowledgeAsset(
    () => buildDemoKnowledgeAsset(),
    (assetId, evidenceId) => buildDemoKnowledgeAssetItem(assetId, evidenceId)
  );

  const resolvedAsset = asset ?? { ...built, id: undefined };
  const resolvedItems = items.length > 0 ? items : [buildDemoKnowledgeAssetItem(undefined, null)];

  const checklist = buildCollectionVerificationChecklist(
    resolvedAsset,
    resolvedItems,
    identityUpdated || Boolean(resolvedAsset.identity_impact)
  );
  const complete = isCollectionVerificationComplete(checklist) && persisted;

  return {
    asset: resolvedAsset,
    items: resolvedItems,
    checklist,
    complete,
    identityUpdated: identityUpdated || Boolean(resolvedAsset.identity_impact),
    db: {
      persisted,
      error: error ?? null,
      tables: ['personal_knowledge_assets', 'personal_knowledge_asset_items'],
    },
  };
}
