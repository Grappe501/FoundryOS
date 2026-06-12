'use client';

import type { ArtifactType, GraphEntityRef } from '@foundry/artifact-engine';
import { entitiesToRelations } from '@foundry/artifact-engine';
import type { CollectionItem } from '../bourbon-level-1/storage';
import { getBottle } from '../bourbon-level-1/bottles';
import { expandBourbonGraphEdges, entitiesFromBourbonModuleValues } from './bourbon-graph';
import { createClientArtifact } from './client-store';
import { resolveModuleArtifactType } from './module-mapping';

function buildSummary(values: Record<string, string>): string | undefined {
  const parts = Object.entries(values)
    .filter(([, v]) => v?.trim())
    .slice(0, 3)
    .map(([k, v]) => `${k}: ${v.slice(0, 120)}${v.length > 120 ? '…' : ''}`);
  return parts.length ? parts.join(' · ') : undefined;
}

function buildModuleTitle(moduleTitle: string, values: Record<string, string>): string {
  const primary =
    values.bottle ??
    values.pour ??
    values.topic ??
    values.task ??
    values.title ??
    values.issue ??
    values.distillery ??
    values.action ??
    '';
  return primary.trim() ? `${moduleTitle}: ${primary.trim()}` : moduleTitle;
}

function entitiesForWorldModule(
  worldSlug: string,
  moduleSlug: string,
  values: Record<string, string>,
): GraphEntityRef[] {
  if (worldSlug === 'bourbon') {
    return entitiesFromBourbonModuleValues(moduleSlug, values);
  }
  return [];
}

/** Wire immersion module saves → artifacts with auto graph edges */
export function createArtifactFromModuleSave(
  worldSlug: string,
  moduleSlug: string,
  moduleTitle: string,
  values: Record<string, string>,
) {
  const type = resolveModuleArtifactType(worldSlug, moduleSlug);
  const entities = entitiesForWorldModule(worldSlug, moduleSlug, values);

  return createClientArtifact({
    type,
    metadata: {
      world_slug: worldSlug,
      title: buildModuleTitle(moduleTitle, values),
      summary: buildSummary(values),
      occurred_at: new Date().toISOString(),
      privacy: 'private',
      entities,
      payload: { module_slug: moduleSlug, fields: values },
    },
    relations: entitiesToRelations(entities),
  });
}

export function createShelfArtifact(bottleSlug: string, status: CollectionItem['status']) {
  const bottle = getBottle(bottleSlug);
  if (!bottle) return null;

  const type: ArtifactType =
    status === 'tasted' ? 'journal' : status === 'wishlist' ? 'collection_entry' : 'collection_entry';

  const seeds: GraphEntityRef[] = [
    {
      world_slug: 'bourbon',
      entity_type: 'bottle',
      slug: bottleSlug,
      title: bottle.name,
    },
  ];
  const entities = expandBourbonGraphEdges(seeds);

  return createClientArtifact({
    type,
    metadata: {
      world_slug: 'bourbon',
      title: `${bottle.name} — ${status}`,
      summary: `Shelf: ${status}`,
      occurred_at: new Date().toISOString(),
      privacy: 'private',
      entities,
      payload: { shelf_status: status, bottle_slug: bottleSlug },
    },
    relations: entitiesToRelations(entities),
  });
}

export function createComparisonArtifact(
  mode: 'bottles' | 'producers',
  slugA: string,
  slugB: string,
  aName: string,
  bName: string,
) {
  let entities: GraphEntityRef[];

  if (mode === 'bottles') {
    entities = expandBourbonGraphEdges([
      { world_slug: 'bourbon', entity_type: 'bottle', slug: slugA, title: aName },
      { world_slug: 'bourbon', entity_type: 'bottle', slug: slugB, title: bName },
    ]);
  } else {
    entities = expandBourbonGraphEdges([
      { world_slug: 'bourbon', entity_type: 'producer', slug: slugA, title: aName },
      { world_slug: 'bourbon', entity_type: 'producer', slug: slugB, title: bName },
    ]);
  }

  return createClientArtifact({
    type: 'comparison',
    metadata: {
      world_slug: 'bourbon',
      title: `${aName} vs ${bName}`,
      occurred_at: new Date().toISOString(),
      privacy: 'private',
      entities,
      payload: { compare_mode: mode, left: slugA, right: slugB },
    },
    relations: entitiesToRelations(entities),
  });
}
