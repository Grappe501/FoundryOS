import { createServiceClient } from './client';
import type { FoundryArtifact } from '@foundry/artifact-engine';
import {
  artifactToPersistRow,
  rowToArtifact,
  emptyPortableMemoryState,
  memoryStateToSnapshotRecord,
  collectorStateToSnapshotRecord,
} from '@foundry/personal-database';
import type {
  GraphTraversalRecord,
  PortableCollectorState,
  PortableIdentityBundle,
  PortableMemoryState,
} from '@foundry/personal-database';
import {
  COLLECTOR_SNAPSHOT_KEY,
  GLOBAL_WORLD_SLUG,
  MEMORY_SNAPSHOT_KEY,
} from '@foundry/personal-database';

export type UserArtifactRow = {
  id: string;
  user_id: string;
  client_id: string;
  world_slug: string;
  artifact_type: string;
  title: string;
  payload: Record<string, unknown>;
  entity_refs: unknown[];
  relations: FoundryArtifact['relations'];
  occurred_at: string;
  created_at: string;
  updated_at: string;
};

export async function upsertUserArtifact(
  userId: string,
  artifact: FoundryArtifact,
): Promise<{ ok: boolean; error?: string }> {
  const db = createServiceClient();
  if (!db) return { ok: false, error: 'Database not configured' };

  const row = artifactToPersistRow(artifact, userId);
  const { error } = await db.from('user_artifacts').upsert(row, { onConflict: 'user_id,client_id' });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function upsertUserArtifactsBulk(
  userId: string,
  artifacts: FoundryArtifact[],
): Promise<{ ok: boolean; error?: string; count: number }> {
  if (artifacts.length === 0) return { ok: true, count: 0 };
  const db = createServiceClient();
  if (!db) return { ok: false, error: 'Database not configured', count: 0 };

  const rows = artifacts.map((a) => artifactToPersistRow(a, userId));
  const { error } = await db.from('user_artifacts').upsert(rows, { onConflict: 'user_id,client_id' });
  if (error) return { ok: false, error: error.message, count: 0 };
  return { ok: true, count: rows.length };
}

export async function listUserArtifacts(userId: string, worldSlug?: string): Promise<FoundryArtifact[]> {
  const db = createServiceClient();
  if (!db) return [];

  let q = db.from('user_artifacts').select('*').eq('user_id', userId).order('occurred_at', { ascending: false });
  if (worldSlug) q = q.eq('world_slug', worldSlug);

  const { data, error } = await q.limit(500);
  if (error || !data) return [];
  return (data as UserArtifactRow[]).map(rowToArtifact);
}

export async function upsertMemorySnapshot(
  userId: string,
  memoryKey: string,
  payload: Record<string, unknown>,
): Promise<{ ok: boolean; error?: string }> {
  const db = createServiceClient();
  if (!db) return { ok: false, error: 'Database not configured' };

  const { error } = await db.from('user_memories').upsert(
    {
      user_id: userId,
      world_slug: GLOBAL_WORLD_SLUG,
      memory_category: 'snapshot',
      memory_key: memoryKey,
      payload,
      occurred_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,world_slug,memory_category,memory_key' },
  );
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function upsertPortableMemoryState(
  userId: string,
  state: PortableMemoryState,
): Promise<{ ok: boolean; error?: string }> {
  const snap = memoryStateToSnapshotRecord(state);
  return upsertMemorySnapshot(userId, snap.memory_key, snap.payload as Record<string, unknown>);
}

export async function upsertPortableCollectorState(
  userId: string,
  state: PortableCollectorState,
): Promise<{ ok: boolean; error?: string }> {
  const snap = collectorStateToSnapshotRecord(state as unknown as Record<string, unknown>);
  return upsertMemorySnapshot(userId, snap.memory_key, snap.payload);
}

async function readMemorySnapshot<T>(userId: string, memoryKey: string): Promise<T | null> {
  const db = createServiceClient();
  if (!db) return null;

  const { data, error } = await db
    .from('user_memories')
    .select('payload')
    .eq('user_id', userId)
    .eq('world_slug', GLOBAL_WORLD_SLUG)
    .eq('memory_category', 'snapshot')
    .eq('memory_key', memoryKey)
    .maybeSingle();

  if (error || !data?.payload) return null;
  return data.payload as T;
}

export async function insertGraphTraversal(
  userId: string,
  event: Omit<GraphTraversalRecord, 'entered_at'> & { entered_at?: string },
): Promise<{ ok: boolean; error?: string }> {
  const db = createServiceClient();
  if (!db) return { ok: false, error: 'Database not configured' };

  const { error } = await db.from('user_graph_history').insert({
    user_id: userId,
    world_slug: event.world_slug,
    node_slug: event.node_slug,
    node_title: event.node_title,
    node_type: event.node_type,
    source: event.source,
    entered_at: event.entered_at ?? new Date().toISOString(),
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function listGraphHistory(userId: string, limit = 100): Promise<GraphTraversalRecord[]> {
  const db = createServiceClient();
  if (!db) return [];

  const { data, error } = await db
    .from('user_graph_history')
    .select('world_slug, node_slug, node_title, node_type, source, entered_at')
    .eq('user_id', userId)
    .order('entered_at', { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data as GraphTraversalRecord[];
}

export async function hydratePortableIdentity(userId: string): Promise<PortableIdentityBundle> {
  const [artifacts, graph_history] = await Promise.all([
    listUserArtifacts(userId),
    listGraphHistory(userId),
  ]);

  const memoryRaw = await readMemorySnapshot<PortableMemoryState>(userId, MEMORY_SNAPSHOT_KEY);
  const collectorRaw = await readMemorySnapshot<PortableCollectorState>(userId, COLLECTOR_SNAPSHOT_KEY);

  return {
    user_id: userId,
    artifacts,
    memory_state: memoryRaw ?? emptyPortableMemoryState(),
    collector_state: collectorRaw,
    graph_history,
    hydrated_at: new Date().toISOString(),
  };
}

export async function migrateLocalBundleToCloud(
  userId: string,
  input: {
    artifacts: FoundryArtifact[];
    memory_state: PortableMemoryState;
    collector_state: PortableCollectorState | null;
    graph_history?: GraphTraversalRecord[];
  },
): Promise<{ ok: boolean; errors: string[] }> {
  const errors: string[] = [];

  const art = await upsertUserArtifactsBulk(userId, input.artifacts);
  if (!art.ok) errors.push(art.error ?? 'artifacts failed');

  const mem = await upsertPortableMemoryState(userId, input.memory_state);
  if (!mem.ok) errors.push(mem.error ?? 'memory failed');

  if (input.collector_state) {
    const col = await upsertPortableCollectorState(userId, input.collector_state);
    if (!col.ok) errors.push(col.error ?? 'collector failed');
  }

  if (input.graph_history?.length) {
    for (const g of input.graph_history.slice(0, 50)) {
      const r = await insertGraphTraversal(userId, g);
      if (!r.ok) errors.push(r.error ?? 'graph failed');
    }
  }

  return { ok: errors.length === 0, errors };
}

export async function getPortableIdentityStats() {
  const db = createServiceClient();
  if (!db) return { artifacts: 0, memories: 0, graph_events: 0 };

  const [a, m, g] = await Promise.all([
    db.from('user_artifacts').select('id', { count: 'exact', head: true }),
    db.from('user_memories').select('id', { count: 'exact', head: true }),
    db.from('user_graph_history').select('id', { count: 'exact', head: true }),
  ]);

  return {
    artifacts: a.count ?? 0,
    memories: m.count ?? 0,
    graph_events: g.count ?? 0,
  };
}
