import { ARTIFACT_TYPES } from './registry';
import type { ArtifactRelation, CreateArtifactInput, FoundryArtifact, GraphEntityRef } from './types';

/** In-memory v1 store — replaced by Supabase + ownership graph in 040D */
const store = new Map<string, FoundryArtifact>();

function id(): string {
  return `art_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

function entitiesFromRelations(relations: ArtifactRelation[]): GraphEntityRef[] {
  return relations
    .filter((r) => 'world_slug' in r.target)
    .map((r) => r.target as GraphEntityRef);
}

export function createArtifact(input: CreateArtifactInput): FoundryArtifact {
  const now = new Date().toISOString();
  const relations = input.relations ?? [];
  const fromRelations = entitiesFromRelations(relations);
  const entities = [...(input.metadata.entities ?? []), ...fromRelations];

  const artifact: FoundryArtifact = {
    id: id(),
    type: input.type,
    user_id: input.user_id,
    metadata: {
      ...input.metadata,
      entities: entities.length ? entities : input.metadata.entities,
      evidence: input.metadata.evidence ?? 'self_reported',
    },
    relations,
    created_at: now,
    updated_at: now,
  };
  store.set(artifact.id, artifact);
  return artifact;
}

export function getArtifact(artifactId: string): FoundryArtifact | undefined {
  return store.get(artifactId);
}

export function listArtifacts(filter?: { user_id?: string; world_slug?: string }): FoundryArtifact[] {
  let list = [...store.values()].filter((a) => a.user_id !== '__validate__');
  if (filter?.user_id) list = list.filter((a) => a.user_id === filter.user_id);
  if (filter?.world_slug) list = list.filter((a) => a.metadata.world_slug === filter.world_slug);
  return list.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function countUserArtifacts(): number {
  return [...store.values()].filter((a) => a.user_id !== '__validate__').length;
}

export function linkArtifactToGraphNode(
  artifactId: string,
  entity: GraphEntityRef,
): FoundryArtifact | null {
  const artifact = store.get(artifactId);
  if (!artifact) return null;
  const entities = artifact.metadata.entities ?? [];
  if (!entities.some((e) => e.slug === entity.slug && e.entity_type === entity.entity_type)) {
    entities.push(entity);
  }
  artifact.metadata.entities = entities;
  artifact.relations.push({ type: 'connected_to', target: entity });
  artifact.updated_at = new Date().toISOString();
  store.set(artifactId, artifact);
  return artifact;
}

export function validateArtifactEngine(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (ARTIFACT_TYPES.length < 14) errors.push('Expected 14+ artifact types');

  const sample = createArtifact({
    type: 'note',
    user_id: '__validate__',
    metadata: {
      world_slug: 'bourbon',
      title: 'Validation tasting note',
      occurred_at: new Date().toISOString(),
      privacy: 'private',
      evidence: 'self_reported',
    },
    relations: [
      {
        type: 'connected_to',
        target: { world_slug: 'bourbon', entity_type: 'bottle', slug: 'wild-turkey-101', title: 'Wild Turkey 101' },
      },
    ],
  });
  if (!sample.metadata.entities?.length) errors.push('Graph link failed on sample artifact');
  store.delete(sample.id);

  return { ok: errors.length === 0, errors };
}

export function getArtifactEngineStats() {
  return {
    artifact_types_defined: ARTIFACT_TYPES.length,
    user_artifacts: countUserArtifacts(),
    engine_ready: validateArtifactEngine().ok,
  };
}
