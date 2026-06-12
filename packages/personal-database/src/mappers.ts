import type { FoundryArtifact } from '@foundry/artifact-engine';
import type { PortableIdentityBundle, PortableMemoryState } from './types';
import { COLLECTOR_SNAPSHOT_KEY, GLOBAL_WORLD_SLUG, MEMORY_SNAPSHOT_KEY } from './types';

export function emptyPortableMemoryState(): PortableMemoryState {
  return {
    version: 1,
    last_visit: {},
    atlas_views: [],
    context_notes: [],
    intent_notes: [],
    memory_objects: [],
    graph_views: [],
    saved_rabbit_holes: [],
    comparisons: [],
    first_unlock_times: {},
  };
}

export function artifactToPersistRow(artifact: FoundryArtifact, userId: string) {
  return {
    user_id: userId,
    client_id: artifact.id,
    world_slug: artifact.metadata.world_slug,
    artifact_type: artifact.type,
    title: artifact.metadata.title,
    payload: {
      metadata: artifact.metadata,
      type: artifact.type,
    },
    entity_refs: artifact.metadata.entities ?? [],
    relations: artifact.relations,
    occurred_at: artifact.metadata.occurred_at ?? artifact.created_at,
    updated_at: new Date().toISOString(),
  };
}

export function rowToArtifact(row: {
  client_id: string;
  user_id: string;
  artifact_type: string;
  payload: { metadata?: FoundryArtifact['metadata']; type?: string };
  relations: FoundryArtifact['relations'];
  occurred_at: string;
  created_at: string;
  updated_at: string;
}): FoundryArtifact {
  const meta = row.payload?.metadata;
  return {
    id: row.client_id,
    type: (row.artifact_type as FoundryArtifact['type']) ?? 'note',
    user_id: row.user_id,
    metadata: meta ?? {
      world_slug: 'unknown',
      title: 'Artifact',
      occurred_at: row.occurred_at,
      privacy: 'private',
      evidence: 'self_reported',
    },
    relations: row.relations ?? [],
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export function memoryStateToSnapshotRecord(state: PortableMemoryState) {
  return {
    world_slug: GLOBAL_WORLD_SLUG,
    memory_category: 'snapshot' as const,
    memory_key: MEMORY_SNAPSHOT_KEY,
    payload: state,
    occurred_at: new Date().toISOString(),
  };
}

export function collectorStateToSnapshotRecord(state: Record<string, unknown>) {
  return {
    world_slug: GLOBAL_WORLD_SLUG,
    memory_category: 'snapshot' as const,
    memory_key: COLLECTOR_SNAPSHOT_KEY,
    payload: state,
    occurred_at: new Date().toISOString(),
  };
}

export function validatePersonalDatabase(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];

  const empty = emptyPortableMemoryState();
  if (empty.version !== 1) errors.push('PortableMemoryState version must be 1');

  const snap = memoryStateToSnapshotRecord(empty);
  if (snap.memory_key !== MEMORY_SNAPSHOT_KEY) errors.push('memory snapshot key wrong');

  const bundle: PortableIdentityBundle = {
    user_id: 'test-user',
    artifacts: [],
    memory_state: empty,
    collector_state: null,
    graph_history: [],
    hydrated_at: new Date().toISOString(),
  };
  if (!bundle.hydrated_at) errors.push('bundle must include hydrated_at');

  return { ok: errors.length === 0, errors };
}
