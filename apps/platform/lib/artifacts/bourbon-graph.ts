import type { GraphEntityRef } from '@foundry/artifact-engine';
import { mergeGraphEntities } from '@foundry/artifact-engine';
import { BOURBON_BOTTLES, getBottle } from '../bourbon-level-1/bottles';
import { listBourbonProducers } from '../world-depth/bourbon-producers';

/** Auto-expand bottle → producer → Kentucky — graph grows invisibly from artifacts */
export function expandBourbonGraphEdges(seeds: GraphEntityRef[]): GraphEntityRef[] {
  const chain: GraphEntityRef[] = [];

  for (const seed of seeds) {
    chain.push(seed);

    if (seed.entity_type === 'bottle') {
      const bottle = getBottle(seed.slug);
      if (bottle) {
        chain.push({
          world_slug: 'bourbon',
          entity_type: 'producer',
          slug: bottle.producerSlug,
          title: bottle.producerName,
        });
      }
    }

    if (seed.entity_type === 'producer' || seed.entity_type === 'bottle') {
      chain.push({
        world_slug: 'bourbon',
        entity_type: 'place',
        slug: 'kentucky',
        title: 'Kentucky',
      });
    }
  }

  return mergeGraphEntities(chain);
}

export function resolveBourbonBottleSlug(text: string): string | undefined {
  const t = text.toLowerCase().trim();
  if (!t) return undefined;

  const bySlug = BOURBON_BOTTLES.find((b) => b.slug === t.replace(/\s+/g, '-'));
  if (bySlug) return bySlug.slug;

  const byName = BOURBON_BOTTLES.find((b) => b.name.toLowerCase() === t);
  if (byName) return byName.slug;

  return BOURBON_BOTTLES.find(
    (b) => b.name.toLowerCase().includes(t) || t.includes(b.name.toLowerCase()),
  )?.slug;
}

export function resolveBourbonProducerSlug(text: string): string | undefined {
  const t = text.toLowerCase().trim();
  if (!t) return undefined;
  const producers = listBourbonProducers();
  return producers.find(
    (p) =>
      p.slug === t.replace(/\s+/g, '-') ||
      p.name.toLowerCase() === t ||
      p.name.toLowerCase().includes(t) ||
      t.includes(p.name.toLowerCase()),
  )?.slug;
}

export function entitiesFromBourbonModuleValues(
  moduleSlug: string,
  values: Record<string, string>,
): GraphEntityRef[] {
  const seeds: GraphEntityRef[] = [];

  const bottleText = values.bottle ?? values.pour ?? values.left ?? values.right ?? '';
  const bottleSlug = resolveBourbonBottleSlug(bottleText);
  if (bottleSlug) {
    const bottle = getBottle(bottleSlug);
    seeds.push({
      world_slug: 'bourbon',
      entity_type: 'bottle',
      slug: bottleSlug,
      title: bottle?.name ?? bottleText,
    });
  }

  if (moduleSlug === 'distillery-explorer') {
    const distillery = values.distillery ?? '';
    const producerSlug = resolveBourbonProducerSlug(distillery);
    if (producerSlug) {
      const producers = listBourbonProducers();
      const p = producers.find((x) => x.slug === producerSlug);
      seeds.push({
        world_slug: 'bourbon',
        entity_type: 'producer',
        slug: producerSlug,
        title: p?.name ?? distillery,
      });
    }
  }

  if (moduleSlug === 'bottle-comparison-tool') {
    const leftSlug = resolveBourbonBottleSlug(values.left ?? '');
    const rightSlug = resolveBourbonBottleSlug(values.right ?? '');
    if (leftSlug) {
      seeds.push({
        world_slug: 'bourbon',
        entity_type: 'bottle',
        slug: leftSlug,
        title: getBottle(leftSlug)?.name,
      });
    }
    if (rightSlug) {
      seeds.push({
        world_slug: 'bourbon',
        entity_type: 'bottle',
        slug: rightSlug,
        title: getBottle(rightSlug)?.name,
      });
    }
  }

  return expandBourbonGraphEdges(seeds);
}
