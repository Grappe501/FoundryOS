'use client';

/** Client-side artifact store (localStorage v1 — Supabase sync in PASS-040D) */

import type { CreateArtifactInput, FoundryArtifact } from '@foundry/artifact-engine';
import {
  entitiesFromRelations,
  entitiesToRelations,
  mergeGraphEntities,
} from '@foundry/artifact-engine';

const STORE_KEY = 'foundry-artifacts-v1';
const USER_KEY = 'foundry-artifact-user-id';
export const ARTIFACTS_CHANGED_EVENT = 'foundry-artifacts-changed';

type ArtifactStore = { artifacts: FoundryArtifact[] };

function newId(): string {
  return `art_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function read(): ArtifactStore {
  if (typeof window === 'undefined') return { artifacts: [] };
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) ?? 'null') ?? { artifacts: [] };
  } catch {
    return { artifacts: [] };
  }
}

function write(store: ArtifactStore): void {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
  window.dispatchEvent(new Event(ARTIFACTS_CHANGED_EVENT));
}

export function replaceArtifactStore(artifacts: FoundryArtifact[]): void {
  write({ artifacts });
}

export function getLocalUserId(): string {
  if (typeof window === 'undefined') return 'local-user';
  let id = localStorage.getItem(USER_KEY);
  if (!id) {
    id = `user_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
    localStorage.setItem(USER_KEY, id);
  }
  return id;
}

export function listClientArtifacts(filter?: {
  user_id?: string;
  world_slug?: string;
}): FoundryArtifact[] {
  let list = read().artifacts;
  if (filter?.user_id) list = list.filter((a) => a.user_id === filter.user_id);
  if (filter?.world_slug) list = list.filter((a) => a.metadata.world_slug === filter.world_slug);
  return list.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function countClientArtifacts(userId?: string): number {
  const id = userId ?? getLocalUserId();
  return listClientArtifacts({ user_id: id }).length;
}

export function createClientArtifact(
  input: Omit<CreateArtifactInput, 'user_id'> & { user_id?: string },
): FoundryArtifact {
  const now = new Date().toISOString();
  const user_id = input.user_id ?? getLocalUserId();
  const relations = input.relations ?? entitiesToRelations(input.metadata.entities ?? []);
  const fromRelations = entitiesFromRelations(relations);
  const entities = mergeGraphEntities(input.metadata.entities ?? [], fromRelations);

  const artifact: FoundryArtifact = {
    id: newId(),
    type: input.type,
    user_id,
    metadata: {
      ...input.metadata,
      entities: entities.length ? entities : input.metadata.entities,
      evidence: input.metadata.evidence ?? 'self_reported',
    },
    relations,
    created_at: now,
    updated_at: now,
  };

  const store = read();
  store.artifacts.unshift(artifact);
  write(store);

  void import('../personal-database/sync-client').then(({ persistArtifactToCloud }) =>
    persistArtifactToCloud(artifact),
  );

  return artifact;
}
