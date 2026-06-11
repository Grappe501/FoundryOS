import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';
import type { KnowledgeAssetItem, PersonalKnowledgeAsset } from '@foundry/collection-engine';

export type KnowledgeAssetRow = {
  id: string;
  user_slug: string;
  slug: string;
  display_name: string;
  description: string | null;
  domain_slug: string;
  asset_type: string;
  identity_impact: string | null;
  evidence_linked: boolean;
  entity_count: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type KnowledgeAssetItemRow = {
  id: string;
  asset_id: string;
  entity_slug: string;
  entity_display_name: string;
  sort_order: number;
  personal_rating: number | null;
  personal_notes: string | null;
  evidence_submission_id: string | null;
  added_at: string;
};

function rowToAsset(row: KnowledgeAssetRow): PersonalKnowledgeAsset {
  return {
    id: row.id,
    user_slug: row.user_slug,
    slug: row.slug,
    display_name: row.display_name,
    description: row.description,
    domain_slug: row.domain_slug,
    asset_type: row.asset_type as PersonalKnowledgeAsset['asset_type'],
    identity_impact: row.identity_impact,
    evidence_linked: row.evidence_linked,
    entity_count: row.entity_count,
    metadata: row.metadata,
  };
}

function rowToItem(row: KnowledgeAssetItemRow): KnowledgeAssetItem {
  return {
    id: row.id,
    asset_id: row.asset_id,
    entity_slug: row.entity_slug,
    entity_display_name: row.entity_display_name,
    sort_order: row.sort_order,
    personal_rating: row.personal_rating,
    personal_notes: row.personal_notes,
    evidence_submission_id: row.evidence_submission_id,
  };
}

export async function getKnowledgeAssetBySlug(
  userSlug: string,
  assetSlug: string
): Promise<{ asset: PersonalKnowledgeAsset | null; items: KnowledgeAssetItem[] }> {
  if (!isSupabaseConfigured()) return { asset: null, items: [] };
  const client = createServiceClient();
  if (!client) return { asset: null, items: [] };

  const { data: assetRow, error } = await client
    .from('personal_knowledge_assets')
    .select('*')
    .eq('user_slug', userSlug)
    .eq('slug', assetSlug)
    .maybeSingle();

  if (error || !assetRow) return { asset: null, items: [] };

  const asset = rowToAsset(assetRow as KnowledgeAssetRow);

  const { data: itemRows } = await client
    .from('personal_knowledge_asset_items')
    .select('*')
    .eq('asset_id', asset.id!)
    .order('sort_order', { ascending: true });

  const items = (itemRows ?? []).map((r) => rowToItem(r as KnowledgeAssetItemRow));
  return { asset, items };
}

export async function upsertKnowledgeAssetWithItem(
  asset: Omit<PersonalKnowledgeAsset, 'id'>,
  item: Omit<KnowledgeAssetItem, 'id' | 'asset_id'>
): Promise<{
  asset: PersonalKnowledgeAsset | null;
  items: KnowledgeAssetItem[];
  persisted: boolean;
  error?: string;
}> {
  if (!isSupabaseConfigured()) {
    return { asset: null, items: [], persisted: false, error: 'Supabase not configured' };
  }
  const client = createServiceClient();
  if (!client) {
    return { asset: null, items: [], persisted: false, error: 'Service client unavailable' };
  }

  const assetPayload = {
    user_slug: asset.user_slug,
    slug: asset.slug,
    display_name: asset.display_name,
    description: asset.description,
    domain_slug: asset.domain_slug,
    asset_type: asset.asset_type,
    identity_impact: asset.identity_impact,
    evidence_linked: asset.evidence_linked,
    entity_count: asset.entity_count,
    metadata: asset.metadata,
    updated_at: new Date().toISOString(),
  };

  const { data: assetData, error: assetError } = await client
    .from('personal_knowledge_assets')
    .upsert(assetPayload, { onConflict: 'user_slug,slug' })
    .select('*')
    .single();

  if (assetError || !assetData) {
    return { asset: null, items: [], persisted: false, error: assetError?.message ?? 'Asset upsert failed' };
  }

  const savedAsset = rowToAsset(assetData as KnowledgeAssetRow);

  const itemPayload = {
    asset_id: savedAsset.id!,
    entity_slug: item.entity_slug,
    entity_display_name: item.entity_display_name,
    sort_order: item.sort_order,
    personal_rating: item.personal_rating,
    personal_notes: item.personal_notes,
    evidence_submission_id: item.evidence_submission_id,
  };

  const { error: itemError } = await client
    .from('personal_knowledge_asset_items')
    .upsert(itemPayload, { onConflict: 'asset_id,entity_slug' });

  if (itemError) {
    return { asset: savedAsset, items: [], persisted: false, error: itemError.message };
  }

  const { data: itemRows } = await client
    .from('personal_knowledge_asset_items')
    .select('*')
    .eq('asset_id', savedAsset.id!);

  const items = (itemRows ?? []).map((r) => rowToItem(r as KnowledgeAssetItemRow));

  await client.from('platform_metrics').upsert(
    {
      metric_key: 'knowledge_assets_total',
      metric_value: { count: 1 },
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'metric_key' }
  );
  if (asset.evidence_linked) {
    await client.from('platform_metrics').upsert(
      {
        metric_key: 'knowledge_assets_with_evidence',
        metric_value: { count: 1 },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'metric_key' }
    );
    await client.from('platform_metrics').upsert(
      {
        metric_key: 'identity_collections_strength',
        metric_value: { score: 1 },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'metric_key' }
    );
  }

  return { asset: savedAsset, items, persisted: true };
}

export async function ensureDemoKnowledgeAsset(
  buildAsset: () => Omit<PersonalKnowledgeAsset, 'id'>,
  buildItem: (assetId: string, evidenceId: string | null) => Omit<KnowledgeAssetItem, 'id' | 'asset_id'>
): Promise<{
  asset: PersonalKnowledgeAsset | null;
  items: KnowledgeAssetItem[];
  persisted: boolean;
  error?: string;
  identityUpdated: boolean;
}> {
  const existing = await getKnowledgeAssetBySlug('demo-user', 'my-speech-library');
  if (existing.asset?.identity_impact && existing.items.length > 0) {
    return {
      ...existing,
      persisted: true,
      identityUpdated: Boolean(existing.asset.identity_impact),
    };
  }

  let evidenceId: string | null = null;
  const client = createServiceClient();
  if (client) {
    const { data: evidence } = await client
      .from('evidence_submissions')
      .select('id')
      .eq('user_slug', 'demo-user')
      .eq('action_slug', 'deliver-first-speech')
      .maybeSingle();
    evidenceId = evidence?.id ?? null;
  }

  const assetRecord = buildAsset();
  const withEvidence = { ...assetRecord, evidence_linked: Boolean(evidenceId) };

  const result = await upsertKnowledgeAssetWithItem(
    withEvidence,
    buildItem('', evidenceId)
  );

  return {
    ...result,
    identityUpdated: Boolean(withEvidence.identity_impact),
  };
}

export async function getCollectionKpiCounts(): Promise<{
  knowledge_assets_total: number;
  knowledge_assets_with_evidence: number;
  identity_collections_strength: number;
} | null> {
  if (!isSupabaseConfigured()) return null;
  const client = createServiceClient();
  if (!client) return null;

  const { count: total } = await client
    .from('personal_knowledge_assets')
    .select('*', { count: 'exact', head: true });

  const { count: withEvidence } = await client
    .from('personal_knowledge_assets')
    .select('*', { count: 'exact', head: true })
    .eq('evidence_linked', true);

  return {
    knowledge_assets_total: total ?? 0,
    knowledge_assets_with_evidence: withEvidence ?? 0,
    identity_collections_strength: withEvidence && withEvidence > 0 ? 1 : 0,
  };
}
