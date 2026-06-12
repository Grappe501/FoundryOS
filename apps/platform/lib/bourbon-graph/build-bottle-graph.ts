import type { EntityGraphView, GraphConfidence, GraphConnection } from '@foundry/atlas-graph-engine';
import { resolveEntityGraph } from '@foundry/atlas-graph-engine';
import {
  BOTTLE_COMPARISON_SETS,
  getBottleRecord,
  getProducerRecord,
  peopleForProducer,
  type SourceConfidence,
} from '@foundry/bourbon-intelligence';
import { getBottle } from '../bourbon-level-1/bottles';
import { getBottleProgression } from '../bourbon-level-1/agency/bottle-progression';

function toConfidence(c: SourceConfidence): GraphConfidence {
  return c;
}

function conn(
  partial: Omit<GraphConnection, 'id'> & { id?: string },
): GraphConnection {
  return { id: partial.id ?? `${partial.entity_type}-${partial.slug}`, ...partial };
}

const MASH_ATLAS: Record<string, string> = {
  'high-rye': 'high-rye-bourbon',
  wheated: 'wheated-bourbon',
  traditional: 'corn',
  'corn-heavy': 'corn',
};

/** Inventory edge → visible rabbit hole for every catalog bottle */
export function buildBottleGraphFromInventory(slug: string): EntityGraphView | null {
  const bottle = getBottle(slug);
  if (!bottle) return null;

  const seeded = resolveEntityGraph({ world_slug: 'bourbon', entity_type: 'bottle', slug });
  const record = getBottleRecord(slug);
  const progression = getBottleProgression(slug);
  const producer = getProducerRecord(bottle.producerSlug);
  const people = peopleForProducer(bottle.producerSlug);
  const comparables = BOTTLE_COMPARISON_SETS[slug] ?? [];

  const connections: GraphConnection[] = [
    conn({
      relation: 'part_of',
      entity_type: 'producer',
      slug: bottle.producerSlug,
      title: bottle.producerName,
      href: `/bourbon/producers/${bottle.producerSlug}`,
      teaser: producer?.headquarters?.value
        ? `${producer.headquarters.value} — distilling house and heritage hallway.`
        : 'Follow the producer hallway.',
      group: 'Producer',
      confidence: producer?.name.confidence ? toConfidence(producer.name.confidence) : 'commonly_reported',
    }),
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'mash-bill',
      title: 'Mash bill',
      href: '/bourbon/atlas/mash-bill',
      teaser: `${bottle.mashbill.replace(/-/g, ' ')} style — grain percentages not publicly disclosed.`,
      group: 'Mash style',
      confidence: record?.mashbill_style.confidence
        ? toConfidence(record.mashbill_style.confidence)
        : 'commonly_reported',
    }),
    conn({
      relation: 'located_in',
      entity_type: 'place',
      slug: 'kentucky',
      title: 'Kentucky',
      href: '/bourbon/map',
      teaser: 'Grain source: not publicly disclosed. Soil influence: not producer-disclosed.',
      group: 'Terroir disclosure',
      confidence: 'unknown',
    }),
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'proof',
      title: 'Proof',
      href: '/bourbon/atlas/proof',
      teaser: `${bottle.proof} proof on label — ${record?.proof.confidence ?? 'commonly_reported'}.`,
      group: 'Atlas terms',
      confidence: record?.proof.confidence ? toConfidence(record.proof.confidence) : 'commonly_reported',
    }),
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'rickhouse',
      title: 'Rickhouse',
      href: '/bourbon/atlas/rickhouse',
      teaser: 'Where this bottle likely aged — warehouse position shapes flavor.',
      group: 'Atlas terms',
      confidence: 'commonly_reported',
    }),
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'char-level',
      title: 'Char level',
      href: '/bourbon/atlas/char-level',
      teaser: 'New charred oak requirement — vanilla and tannin from barrel char.',
      group: 'Atlas terms',
      confidence: 'verified',
    }),
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'new-charred-oak',
      title: 'New charred oak',
      href: '/bourbon/atlas/new-charred-oak',
      teaser: 'Federal bourbon standard — one-use American oak barrels.',
      group: 'Atlas terms',
      confidence: 'verified',
    }),
    conn({
      relation: 'controversy_about',
      entity_type: 'debate',
      slug: 'best-value-bourbon',
      title: 'Best value bourbon under $35?',
      href: '/bourbon/lore',
      teaser: 'Is this pour overrated or underpriced for what it teaches?',
      group: 'Debates',
      confidence: 'editorial',
    }),
    conn({
      relation: 'explores',
      entity_type: 'mystery',
      slug: 'allocated-worth',
      title: 'Do you need allocation to learn bourbon?',
      href: '/bourbon/detective/allocated-worth',
      teaser: 'Mystery of hype vs honest daily pours.',
      group: 'Mysteries',
      confidence: 'editorial',
    }),
    conn({
      relation: 'part_of',
      entity_type: 'collection',
      slug: 'starter-shelf',
      title: 'Starter shelf path',
      href: '/bourbon/portfolio',
      teaser: 'Collect evidence — owned, tasted, wish list.',
      group: 'Collections',
      confidence: 'editorial',
    }),
    conn({
      relation: 'unlocks',
      entity_type: 'artifact',
      slug: 'tasting-note',
      title: 'Log a tasting note',
      href: '/bourbon/experiences/tasting-journal',
      teaser: 'Your pour becomes an artifact — identity evidence.',
      group: 'Artifacts',
      confidence: 'editorial',
    }),
    conn({
      relation: 'explores',
      entity_type: 'detective',
      slug: 'dsp-numbers',
      title: 'DSP tracing case',
      href: '/bourbon/detective/dsp-numbers',
      teaser: 'Who actually distilled this liquid?',
      group: 'Investigations',
      confidence: 'commonly_reported',
    }),
  ];

  const mashTerm = MASH_ATLAS[bottle.mashbill];
  if (mashTerm) {
    connections.push(
      conn({
        relation: 'related_to',
        entity_type: 'atlas_term',
        slug: mashTerm,
        title: mashTerm.replace(/-/g, ' '),
        href: `/bourbon/atlas/${mashTerm}`,
        teaser: `Flavor family anchor for ${bottle.mashbill} mash style.`,
        group: 'Mash style',
        confidence: 'commonly_reported',
      }),
    );
  }

  if (record?.mash_bill_slug) {
    connections.push(
      conn({
        relation: 'related_to',
        entity_type: 'atlas_term',
        slug: 'mash-bill',
        title: `Mash record: ${record.mash_bill_slug}`,
        href: `/bourbon/graph/${slug}`,
        teaser: 'Intelligence registry — no invented percentages.',
        group: 'Mash style',
        confidence: 'unknown',
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
        teaser: p.facts[0]?.claim ?? 'Verified distiller role.',
        group: 'Known people',
        confidence: toConfidence(p.name.confidence),
      }),
    );
  }

  if (producer?.leader_slot_id) {
    connections.push(
      conn({
        relation: 'works_for',
        entity_type: 'person',
        slug: producer.leader_slot_id,
        title: `${bottle.producerName} — leader slot`,
        href: '/bourbon/people',
        teaser: 'Master distiller slot — verified when sourced profile exists.',
        group: 'Leader slots',
        confidence: people.some((x) => x.profile_publishable) ? 'verified' : 'unknown',
      }),
    );
  }

  for (const other of comparables) {
    const ob = getBottle(other);
    connections.push(
      conn({
        relation: 'competes_with',
        entity_type: 'bottle',
        slug: other,
        title: ob?.name ?? other,
        href: `/bourbon/compare?mode=bottles&a=${slug}&b=${other}`,
        teaser: 'Side-by-side comparison — not a rating.',
        group: 'Comparable bottles',
        confidence: 'editorial',
      }),
    );
  }

  if (progression?.nextBottle) {
    connections.push(
      conn({
        relation: 'recommended_after',
        entity_type: 'bottle',
        slug: progression.nextBottle.slug,
        title: progression.nextBottle.name,
        href: `/bourbon/bottles/${progression.nextBottle.slug}`,
        teaser: progression.nextBottle.why,
        group: 'Suggested next stop',
        confidence: 'editorial',
      }),
    );
  } else {
    connections.push(
      conn({
        relation: 'competes_with',
        entity_type: 'bottle',
        slug: 'wild-turkey-101',
        title: 'Compare any two',
        href: `/bourbon/compare?mode=bottles&a=${slug}&b=wild-turkey-101`,
        teaser: 'Chart dimensions — find your next pour.',
        group: 'Suggested next stop',
        confidence: 'editorial',
      }),
    );
  }

  if (bottle.proof >= 100) {
    connections.push(
      conn({
        relation: 'related_to',
        entity_type: 'atlas_term',
        slug: 'bottled-in-bond',
        title: 'Bottled-in-bond',
        href: '/bourbon/atlas/bottled-in-bond',
        teaser: '100+ proof — compare to BiB legal standard.',
        group: 'Atlas terms',
        confidence: 'verified',
      }),
    );
  }

  if (seeded) {
    const seen = new Set(connections.map((c) => c.id));
    for (const c of seeded.connections) {
      if (!seen.has(c.id)) {
        connections.push({ ...c, confidence: c.confidence ?? 'editorial' });
        seen.add(c.id);
      }
    }
  }

  const why =
    seeded?.why_should_i_care ??
    progression?.whatItTeaches?.[0] ??
    bottle.whyBuy;

  const suggested =
    connections.find((c) => c.group === 'Suggested next stop') ??
    connections.find((c) => c.group === 'Producer') ??
    connections[0];

  return {
    world_slug: 'bourbon',
    entity_type: 'bottle',
    slug,
    title: bottle.name,
    why_should_i_care: why,
    why_it_matters: why,
    connections,
    connection_count: connections.length,
    suggested_next: suggested,
  };
}

export function mergeGraphConnections(base: GraphConnection[], extra: GraphConnection[]): GraphConnection[] {
  const seen = new Set(base.map((c) => c.id));
  const out = [...base];
  for (const c of extra) {
    if (!seen.has(c.id)) {
      out.push(c);
      seen.add(c.id);
    }
  }
  return out;
}
