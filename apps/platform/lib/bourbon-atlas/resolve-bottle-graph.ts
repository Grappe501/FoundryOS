import { resolveEntityGraph } from '@foundry/atlas-graph-engine';
import { getBottle } from '../bourbon-level-1/bottles';
import type { EntityGraphView, GraphConnection } from '@foundry/atlas-graph-engine';

function conn(partial: Omit<GraphConnection, 'id'>): GraphConnection {
  return { id: `${partial.entity_type}-${partial.slug}`, ...partial };
}

/** Platform fallback — minimal hallway graph until 040B seeds all entities */
export function resolveBourbonBottleGraph(slug: string): EntityGraphView | null {
  const seeded = resolveEntityGraph({ world_slug: 'bourbon', entity_type: 'bottle', slug });
  if (seeded) return seeded;

  const bottle = getBottle(slug);
  if (!bottle) return null;

  const connections: GraphConnection[] = [
    conn({
      relation: 'part_of',
      entity_type: 'producer',
      slug: bottle.producerSlug,
      title: bottle.producerName,
      href: `/bourbon/producers/${bottle.producerSlug}`,
      teaser: 'Follow the hallway to the house story.',
      group: 'Producers',
    }),
    conn({
      relation: 'competes_with',
      entity_type: 'bottle',
      slug: 'wild-turkey-101',
      title: 'Compare any two',
      href: `/bourbon/compare?mode=bottles&a=${slug}&b=wild-turkey-101`,
      teaser: 'Side-by-side chart — not a rating.',
      group: 'Compare',
    }),
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'mash-bill',
      title: 'Mash bill',
      href: '/bourbon/atlas/mash-bill',
      teaser: 'Atlas term — recipe literacy.',
      group: 'Atlas terms',
    }),
    conn({
      relation: 'unlocks',
      entity_type: 'artifact',
      slug: 'tasting-note',
      title: 'Log tasting note (040A)',
      href: '/bourbon/experiences/tasting-journal',
      teaser: 'Future artifact — your evidence.',
      group: 'Artifacts (040A)',
    }),
  ];

  return {
    world_slug: 'bourbon',
    entity_type: 'bottle',
    slug,
    title: bottle.name,
    why_it_matters: bottle.whyBuy,
    why_should_i_care: bottle.whyBuy,
    suggested_next: connections[0],
    connections,
    connection_count: connections.length,
  };
}
