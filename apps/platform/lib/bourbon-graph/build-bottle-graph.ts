import type { EntityGraphView, GraphConfidence, GraphConnection } from '@foundry/atlas-graph-engine';
import { resolveEntityGraph } from '@foundry/atlas-graph-engine';
import {
  AMERICAN_WHISKEY_CATEGORIES,
  BOTTLE_COMPARISON_SETS,
  getBottleRecord,
  getProducerRecord,
  type SourceConfidence,
} from '@foundry/bourbon-intelligence';
import { mastersForProducer } from '../bourbon-people/unified';
import { getBottle } from '../bourbon-level-1/bottles';
import { getBottleProgression } from '../bourbon-level-1/agency/bottle-progression';
import {
  ageParagraph,
  americanWhiskeyParagraph,
  comparableParagraph,
  legalCategoryParagraph,
  mashParagraph,
  producerParagraph,
  proofParagraph,
  storePickParagraph,
  terroirParagraph,
} from './edge-copy';

function toConfidence(c: SourceConfidence): GraphConfidence {
  return c;
}

function conn(
  partial: Omit<GraphConnection, 'id'> & { id?: string },
): GraphConnection {
  return { id: partial.id ?? `${partial.entity_type}-${partial.slug}`, ...partial };
}

const MIN_TEASER = 80;

function ensureParagraphTeaser(teaser: string, title: string, group: string): string {
  if (teaser.length >= MIN_TEASER) return teaser;
  return `${teaser} Following «${title}» in the ${group} hallway links this pour to producer DNA, Atlas vocabulary, debates, and comparison flights — log what you find as passport evidence.`;
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
  const people = mastersForProducer(bottle.producerSlug);
  const comparables = record?.comparable_bottle_slugs ?? BOTTLE_COMPARISON_SETS[slug] ?? [];
  const category = AMERICAN_WHISKEY_CATEGORIES.find((c) => c.slug === record?.category);

  const producerCopy = producerParagraph(bottle, producer);
  const mashCopy = mashParagraph(bottle, record);
  const terroirCopy = terroirParagraph();
  const legalCopy = legalCategoryParagraph();
  const proofCopy = proofParagraph(bottle, record);
  const storePickCopy = storePickParagraph();
  const americanCopy = americanWhiskeyParagraph();

  const legalSlug =
    category?.legal_standard_slug === 'bourbon-standard-of-identity'
      ? 'straight-bourbon'
      : (category?.legal_standard_slug ?? 'straight-bourbon');

  const connections: GraphConnection[] = [
    conn({
      relation: 'part_of',
      entity_type: 'producer',
      slug: bottle.producerSlug,
      title: bottle.producerName,
      href: `/bourbon/producers/${bottle.producerSlug}`,
      teaser: producerCopy.teaser,
      group: 'Producer',
      confidence: producerCopy.confidence,
      source_label: producerCopy.source_label,
    }),
    conn({
      relation: 'part_of',
      entity_type: 'producer',
      slug: bottle.producerSlug,
      title: producer?.parent_company?.value
        ? `${producer.parent_company.value} brand family`
        : `${bottle.producerName} brand family`,
      href: `/bourbon/graph/${bottle.producerSlug}`,
      teaser: producer?.parent_company?.value
        ? `${bottle.name} sits under ${producer.parent_company.value}'s portfolio. Brand-family literacy explains why Buffalo Trace, Eagle Rare, and Weller share a campus but read differently on the shelf — follow the parent hallway before chasing single SKUs.`
        : `${bottle.producerName} is both distiller and brand anchor here. Understanding the house portfolio prevents treating every label as an unrelated bottle.`,
      group: 'Brand family',
      confidence: producer?.parent_company?.confidence
        ? toConfidence(producer.parent_company.confidence)
        : 'commonly_reported',
      source_label: 'producer registry · parent company',
    }),
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'mash-bill',
      title: 'Mash bill',
      href: '/bourbon/atlas/mash-bill',
      teaser: mashCopy.teaser,
      group: 'Mash style',
      confidence: mashCopy.confidence,
      source_label: mashCopy.source_label,
    }),
    conn({
      relation: 'located_in',
      entity_type: 'place',
      slug: 'kentucky',
      title: 'Kentucky · terroir disclosure',
      href: '/bourbon/map',
      teaser: terroirCopy.teaser,
      group: 'Terroir disclosure',
      confidence: terroirCopy.confidence,
      source_label: terroirCopy.source_label,
    }),
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: legalSlug,
      title: category?.label ?? 'Bourbon',
      href: `/bourbon/atlas/${legalSlug}`,
      teaser: category?.summary.value ?? legalCopy.teaser,
      group: 'Legal category',
      confidence: category?.summary.confidence
        ? toConfidence(category.summary.confidence)
        : legalCopy.confidence,
      source_label: legalSlug === 'straight-bourbon' ? '27 CFR Part 5' : (category?.legal_standard_slug ?? '27 CFR Part 5'),
    }),
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'american-whiskey',
      title: 'American whiskey comparison',
      href: '/bourbon/atlas/straight-bourbon',
      teaser: americanCopy.teaser,
      group: 'Legal category',
      confidence: americanCopy.confidence,
      source_label: americanCopy.source_label,
    }),
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'proof',
      title: 'Proof',
      href: '/bourbon/atlas/proof',
      teaser: proofCopy.teaser,
      group: 'Atlas terms',
      confidence: proofCopy.confidence,
      source_label: proofCopy.source_label,
    }),
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'rickhouse',
      title: 'Rickhouse',
      href: '/bourbon/atlas/rickhouse',
      teaser:
        'Rickhouses are where time and warehouse position do the real work. Upper floors run hotter and pull oak faster; lower floors age slower and often read softer. This bottle’s flavor profile is inseparable from where it likely slept — explore warehouse vocabulary before blaming the mash bill alone.',
      group: 'Atlas terms',
      confidence: 'commonly_reported',
      source_label: 'atlas · warehouse practice',
    }),
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'char-level',
      title: 'Char level',
      href: '/bourbon/atlas/char-level',
      teaser:
        'New charred American oak is non-negotiable for bourbon identity. Char depth controls how aggressively the barrel gives up vanilla, caramel, and tannin. Char-level literacy separates “oak bomb” from “balanced extract” when you compare this pour to younger siblings.',
      group: 'Atlas terms',
      confidence: 'verified',
      source_label: '27 CFR Part 5 · atlas',
    }),
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'single-barrel',
      title: 'Store pick economics',
      href: '/bourbon/atlas/single-barrel',
      teaser: storePickCopy.teaser,
      group: 'Atlas terms',
      confidence: storePickCopy.confidence,
      source_label: storePickCopy.source_label,
    }),
    conn({
      relation: 'controversy_about',
      entity_type: 'debate',
      slug: 'best-value-bourbon',
      title: 'Best value bourbon under $35?',
      href: '/bourbon/graph/best-value-bourbon',
      teaser:
        'Value is not MSRP alone — it is what a bottle teaches per dollar. This debate forces you to articulate whether you are paying for flavor education, brand story, or scarcity theater. Log your position as an artifact instead of arguing in comments.',
      group: 'Debates',
      confidence: 'editorial',
      source_label: 'editorial debate node',
    }),
    conn({
      relation: 'explores',
      entity_type: 'mystery',
      slug: 'allocated-worth',
      title: 'Do you need allocation to learn bourbon?',
      href: '/bourbon/detective/allocated-worth',
      teaser:
        'Allocation hype creates a mystery: are you missing education or just FOMO? This case walks secondary-market pricing against shelf staples so you can decide whether scarcity is teaching you anything — or just emptying your wallet.',
      group: 'Mysteries',
      confidence: 'editorial',
      source_label: 'detective case',
    }),
    conn({
      relation: 'part_of',
      entity_type: 'collection',
      slug: record?.collection_path_slugs[0] ?? 'starter-shelf',
      title: record?.collection_path_slugs[0]?.replace(/-/g, ' ') ?? 'Starter shelf path',
      href: '/bourbon/portfolio',
      teaser:
        'Collection paths turn browsing into evidence. Owned, tasted, wish list, and BiB flights live on your passport — the graph remembers what a spreadsheet forgets. Start a path here and let the hallway suggest the next bottle.',
      group: 'Collections',
      confidence: 'editorial',
      source_label: 'collection registry',
    }),
    conn({
      relation: 'unlocks',
      entity_type: 'artifact',
      slug: 'tasting-note',
      title: 'Log a tasting note',
      href: '/bourbon/experiences/tasting-journal',
      teaser:
        'Your pour becomes an artifact — timestamped evidence on your passport wall. Tasting notes are not diary fluff; they are how Foundry remembers what you actually tasted when the hype cycle moves on.',
      group: 'Artifacts',
      confidence: 'editorial',
      source_label: 'artifact engine · 040A',
    }),
    conn({
      relation: 'explores',
      entity_type: 'detective',
      slug: 'dsp-numbers',
      title: 'DSP tracing case',
      href: '/bourbon/detective/dsp-numbers',
      teaser:
        'The DSP number on a label is a distilling fingerprint. This detective case teaches you to trace who actually made the liquid when marketing stories get fuzzy — essential before you pay premium for a borrowed story.',
      group: 'Investigations',
      confidence: 'commonly_reported',
      source_label: 'detective · TTB DSP registry',
    }),
  ];

  const ageCopy = ageParagraph(bottle, record);
  if (ageCopy) {
    connections.push(
      conn({
        relation: 'related_to',
        entity_type: 'atlas_term',
        slug: 'age-statement',
        title: 'Age statement',
        href: '/bourbon/atlas/age-statement',
        teaser: ageCopy.teaser,
        group: 'Mash style',
        confidence: ageCopy.confidence,
        source_label: ageCopy.source_label,
      }),
    );
  }

  const mashTerm = MASH_ATLAS[bottle.mashbill];
  if (mashTerm) {
    connections.push(
      conn({
        relation: 'related_to',
        entity_type: 'atlas_term',
        slug: mashTerm,
        title: mashTerm.replace(/-/g, ' '),
        href: `/bourbon/atlas/${mashTerm}`,
        teaser: `This bottle reads as ${bottle.mashbill.replace(/-/g, ' ')} in the flavor-family hallway. High-rye, wheated, and traditional corn-forward styles each train a different vocabulary — use this anchor when blind flights get noisy.`,
        group: 'Mash style',
        confidence: 'commonly_reported',
        source_label: 'mash style · intelligence registry',
      }),
    );
  }

  for (const p of people) {
    connections.push(
      conn({
        relation: 'works_for',
        entity_type: 'person',
        slug: p.slug,
        title: p.name,
        href: `/bourbon/people/${p.slug}`,
        teaser: p.hook,
        group: 'Known people',
        confidence: 'commonly_reported',
        source_label: 'unified people registry',
      }),
    );
  }

  if (producer?.leader_slot_id) {
    const slotPublishable = people.length > 0;
    connections.push(
      conn({
        relation: 'works_for',
        entity_type: 'person',
        slug: producer.leader_slot_id,
        title: `${bottle.producerName} — leader slot`,
        href: '/bourbon/people',
        teaser: slotPublishable
          ? 'Master distiller slot filled with a sourced profile — follow for house philosophy and verified production facts.'
          : 'Leader slot reserved — graph shows the role exists but Foundry will not publish a biography until primary-source facts are verified or producer_disclosed.',
        group: 'Leader slots',
        confidence: slotPublishable ? 'verified' : 'unknown',
        source_label: slotPublishable ? 'leader slot · verified profile' : 'leader slot · awaiting sources',
      }),
    );
  }

  for (const other of comparables) {
    const ob = getBottle(other);
    const comp = comparableParagraph(bottle, other, ob?.name ?? other);
    connections.push(
      conn({
        relation: 'competes_with',
        entity_type: 'bottle',
        slug: other,
        title: ob?.name ?? other,
        href: `/bourbon/compare?mode=bottles&a=${slug}&b=${other}`,
        teaser: comp.teaser,
        group: 'Comparable bottles',
        confidence: comp.confidence,
        source_label: comp.source_label,
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
        source_label: 'progression ladder',
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
        teaser:
          'Chart proof, mash style, and house character side-by-side. Comparison artifacts turn a flight into passport evidence — pick any two bottles and let dimensions reveal your next pour.',
        group: 'Suggested next stop',
        confidence: 'editorial',
        source_label: 'compare tool',
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
        href: '/bourbon/graph/bottled-in-bond',
        teaser:
          'At 100+ proof this bottle invites comparison to Bottled-in-Bond law — one distillery, one season, four years, government guarantee. The BiB weekend graph is the fastest way to understand whether proof alone equals trust.',
        group: 'Atlas terms',
        confidence: 'verified',
        source_label: '27 CFR · BiB standard',
      }),
    );
  }

  if (seeded) {
    const seen = new Set(connections.map((c) => c.id));
    for (const c of seeded.connections) {
      if (!seen.has(c.id)) {
        connections.push({
          ...c,
          teaser: ensureParagraphTeaser(c.teaser, c.title, c.group),
          confidence: c.confidence ?? 'editorial',
        });
        seen.add(c.id);
      }
    }
  }

  for (let i = 0; i < connections.length; i++) {
    const c = connections[i];
    connections[i] = {
      ...c,
      teaser: ensureParagraphTeaser(c.teaser, c.title, c.group),
    };
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
