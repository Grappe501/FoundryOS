import type { EntityGraphView, GraphConnection, GraphEntityRef } from '@foundry/atlas-graph-engine';
import { resolveEntityGraph, groupConnections } from '@foundry/atlas-graph-engine';
import {
  getPerson,
  getProducerRecord,
  peopleForProducer,
  PEOPLE_REGISTRY,
} from '@foundry/bourbon-intelligence';
import { BOURBON_BOTTLES, getBottle } from '../bourbon-level-1/bottles';
import { BOURBON_PRODUCERS } from '../world-depth/bourbon-producers';
import { listAtlasEntries } from '../bourbon-atlas/registry';
import { buildBottleGraphFromInventory } from './build-bottle-graph';

export type BourbonGraphRef = GraphEntityRef & {
  entity_type: GraphEntityRef['entity_type'] | 'debate';
};

function conn(partial: Omit<GraphConnection, 'id'> & { id?: string }): GraphConnection {
  return { id: partial.id ?? `${partial.entity_type}-${partial.slug}`, ...partial };
}

function buildProducerGraph(slug: string): EntityGraphView | null {
  const producer = BOURBON_PRODUCERS.find((p) => p.slug === slug);
  const record = getProducerRecord(slug);
  if (!producer) return null;

  const bottles = BOURBON_BOTTLES.filter((b) => b.producerSlug === slug);
  const people = peopleForProducer(slug);

  const connections: GraphConnection[] = [
    conn({
      relation: 'part_of',
      entity_type: 'place',
      slug: 'kentucky',
      title: 'Kentucky',
      href: '/bourbon/map',
      teaser: producer.headquarters,
      group: 'Places',
      confidence: 'commonly_reported',
    }),
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'dsp',
      title: 'DSP',
      href: '/bourbon/atlas/dsp',
      teaser: record?.dsp_code?.value ?? 'Distilled Spirits Plant tracing.',
      group: 'Atlas terms',
      confidence: record?.dsp_code?.confidence ?? 'commonly_reported',
    }),
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'mash-bill',
      title: 'Mash bill',
      href: '/bourbon/atlas/mash-bill',
      teaser: producer.mashBillSignature.slice(0, 120) + '…',
      group: 'Atlas terms',
      confidence: 'commonly_reported',
    }),
    conn({
      relation: 'located_in',
      entity_type: 'place',
      slug: 'kentucky',
      title: 'Terroir disclosure',
      href: `/bourbon/graph/${slug}`,
      teaser: 'Grain source: not publicly disclosed at field level.',
      group: 'Terroir disclosure',
      confidence: 'unknown',
    }),
  ];

  for (const b of bottles.slice(0, 6)) {
    connections.push(
      conn({
        relation: 'part_of',
        entity_type: 'bottle',
        slug: b.slug,
        title: b.name,
        href: `/bourbon/bottles/${b.slug}`,
        teaser: b.oneLiner,
        group: 'Bottles',
        confidence: 'commonly_reported',
      }),
    );
  }

  for (const p of people.filter((x) => x.profile_publishable)) {
    connections.push(
      conn({
        relation: 'works_for',
        entity_type: 'person',
        slug: p.slug,
        title: p.name.value,
        href: `/bourbon/graph/${p.slug}`,
        teaser: p.roles[0]?.role.replace(/_/g, ' ') ?? 'Distiller',
        group: 'Known people',
        confidence: p.name.confidence,
      }),
    );
  }

  return {
    world_slug: 'bourbon',
    entity_type: 'producer',
    slug,
    title: producer.name,
    why_should_i_care: producer.hookQuestion,
    why_it_matters: producer.hookQuestion,
    connections,
    connection_count: connections.length,
    suggested_next: connections.find((c) => c.entity_type === 'bottle'),
  };
}

function buildPersonGraph(slug: string): EntityGraphView | null {
  const person = getPerson(slug);
  if (!person) return null;

  const connections: GraphConnection[] = [];

  for (const role of person.roles) {
    if (role.producer_slug) {
      const pr = getProducerRecord(role.producer_slug);
      connections.push(
        conn({
          relation: 'works_for',
          entity_type: 'producer',
          slug: role.producer_slug,
          title: pr?.name.value ?? role.producer_slug,
          href: `/bourbon/producers/${role.producer_slug}`,
          teaser: 'Producer hallway',
          group: 'Producers',
          confidence: role.confidence,
        }),
      );
    }
  }

  for (const fact of person.facts) {
    connections.push(
      conn({
        relation: 'related_to',
        entity_type: 'atlas_term',
        slug: 'hearts-cut',
        title: fact.claim.slice(0, 60),
        href: `/bourbon/graph/${slug}`,
        teaser: fact.claim,
        group: 'Sourced facts',
        confidence: fact.confidence,
      }),
    );
  }

  for (const bSlug of person.related_bottle_slugs ?? []) {
    const b = getBottle(bSlug);
    connections.push(
      conn({
        relation: 'related_to',
        entity_type: 'bottle',
        slug: bSlug,
        title: b?.name ?? bSlug,
        href: `/bourbon/bottles/${bSlug}`,
        teaser: 'Related bottle in intelligence registry.',
        group: 'Bottles',
        confidence: 'commonly_reported',
      }),
    );
  }

  return {
    world_slug: 'bourbon',
    entity_type: 'person',
    slug,
    title: person.name.value,
    why_should_i_care: person.facts[0]?.claim ?? `${person.name.value} — verified role in bourbon history.`,
    why_it_matters: person.facts[0]?.claim ?? person.name.value,
    connections,
    connection_count: connections.length,
    suggested_next: connections[0],
  };
}

function buildDebateGraph(slug: string): EntityGraphView {
  const debates: Record<string, { title: string; why: string; href: string }> = {
    'best-value-bourbon': {
      title: 'Best value bourbon under $35?',
      why: 'The shelf-staple debate — character vs hype vs MSRP drift.',
      href: '/bourbon/lore',
    },
    'bib-still-matters': {
      title: 'Does Bottled-in-Bond still matter?',
      why: '1897 trust contract vs single-barrel transparency in 2026.',
      href: '/bourbon/atlas/bottled-in-bond',
    },
    'bib-vs-single-barrel': {
      title: 'BiB vs Single Barrel — which guarantees quality?',
      why: 'Law vs barrel lottery — both have camps.',
      href: '/bourbon/lore',
    },
    'high-proof-entry': {
      title: 'Is 101 too hot for beginners?',
      why: 'Proof as teacher vs proof as barrier.',
      href: '/bourbon/academy/three-pours-one-method',
    },
  };

  const d = debates[slug] ?? {
    title: slug.replace(/-/g, ' '),
    why: 'Open debate node — community evidence pending.',
    href: '/bourbon/lore',
  };

  const connections: GraphConnection[] = [
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'bottled-in-bond',
      title: 'Bottled-in-bond',
      href: '/bourbon/atlas/bottled-in-bond',
      teaser: 'Legal context for quality debates.',
      group: 'Atlas terms',
      confidence: 'verified',
    }),
    conn({
      relation: 'part_of',
      entity_type: 'collection',
      slug: 'debate-journal',
      title: 'Log your position',
      href: '/bourbon/experiences/tasting-journal',
      teaser: 'Artifact — your take becomes evidence.',
      group: 'Artifacts',
      confidence: 'editorial',
    }),
    conn({
      relation: 'explores',
      entity_type: 'detective',
      slug: 'allocated-worth',
      title: 'Allocated worth case',
      href: '/bourbon/detective/allocated-worth',
      teaser: 'Investigate before you opine.',
      group: 'Investigations',
      confidence: 'editorial',
    }),
  ];

  return {
    world_slug: 'bourbon',
    entity_type: 'debate',
    slug,
    title: d.title,
    why_should_i_care: d.why,
    why_it_matters: d.why,
    connections,
    connection_count: connections.length,
    suggested_next: connections[0],
  };
}

export function resolveBourbonGraph(ref: BourbonGraphRef): EntityGraphView | null {
  if (ref.entity_type === 'bottle') {
    return buildBottleGraphFromInventory(ref.slug);
  }
  if (ref.entity_type === 'producer') {
    return buildProducerGraph(ref.slug);
  }
  if (ref.entity_type === 'person') {
    return buildPersonGraph(ref.slug);
  }
  if (ref.entity_type === 'atlas_term') {
    return resolveEntityGraph({ world_slug: 'bourbon', entity_type: 'atlas_term', slug: ref.slug });
  }
  if (ref.entity_type === 'debate') {
    return buildDebateGraph(ref.slug);
  }
  return resolveEntityGraph(ref);
}

export function inferGraphRef(slug: string): BourbonGraphRef | null {
  if (getBottle(slug)) {
    return { world_slug: 'bourbon', entity_type: 'bottle', slug };
  }
  if (BOURBON_PRODUCERS.some((p) => p.slug === slug)) {
    return { world_slug: 'bourbon', entity_type: 'producer', slug };
  }
  if (PEOPLE_REGISTRY.some((p) => p.slug === slug)) {
    return { world_slug: 'bourbon', entity_type: 'person', slug };
  }
  if (listAtlasEntries().some((e) => e.slug === slug)) {
    return { world_slug: 'bourbon', entity_type: 'atlas_term', slug };
  }
  const debateSlugs = ['best-value-bourbon', 'bib-still-matters', 'bib-vs-single-barrel', 'high-proof-entry'];
  if (debateSlugs.includes(slug)) {
    return { world_slug: 'bourbon', entity_type: 'debate', slug };
  }
  return null;
}

export { groupConnections };

export function listAllBottleGraphs(): EntityGraphView[] {
  return BOURBON_BOTTLES.map((b) => buildBottleGraphFromInventory(b.slug)).filter(Boolean) as EntityGraphView[];
}
