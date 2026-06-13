import type { EntityGraphView, GraphConnection } from '@foundry/atlas-graph-engine';
import { resolveEntityGraph } from '@foundry/atlas-graph-engine';
import type { AtlasForwardLink } from '../bourbon-atlas/types';
import { getAtlasEntry, getAtlasRabbitHole } from '../bourbon-atlas/registry';
import { bottlesForAtlasTerm } from './inline-links';

function conn(partial: Omit<GraphConnection, 'id'> & { id?: string }): GraphConnection {
  return { id: partial.id ?? `${partial.entity_type}-${partial.slug}`, ...partial };
}

function linkToConnection(link: AtlasForwardLink, group: string): GraphConnection {
  const slugFromHref = link.href.split('/').filter(Boolean).pop() ?? link.label.toLowerCase().replace(/\s+/g, '-');

  if (link.kind === 'producer') {
    return conn({
      relation: 'part_of',
      entity_type: 'producer',
      slug: slugFromHref,
      title: link.label,
      href: link.href,
      teaser: `Producer hallway for ${link.label} — mash bills, campus, and bottle family.`,
      group: 'Producers',
      confidence: 'commonly_reported',
    });
  }

  if (link.kind === 'detective') {
    return conn({
      relation: 'explores',
      entity_type: 'detective',
      slug: slugFromHref,
      title: link.label,
      href: link.href,
      teaser: `Investigate before you opine — ${link.label}.`,
      group: 'Investigations',
      confidence: 'editorial',
    });
  }

  if (link.kind === 'lesson') {
    return conn({
      relation: 'related_to',
      entity_type: 'experience',
      slug: slugFromHref,
      title: link.label,
      href: link.href,
      teaser: `Academy lesson — ${link.label}.`,
      group: 'Lessons',
      confidence: 'editorial',
    });
  }

  if (link.kind === 'story' || link.kind === 'history' || link.kind === 'lore') {
    return conn({
      relation: 'related_to',
      entity_type: 'event',
      slug: slugFromHref,
      title: link.label,
      href: link.href,
      teaser: `Story hallway — ${link.label}.`,
      group: 'Lore',
      confidence: 'editorial',
    });
  }

  if (link.kind === 'geography') {
    return conn({
      relation: 'located_in',
      entity_type: 'place',
      slug: slugFromHref,
      title: link.label,
      href: link.href,
      teaser: `Geography and place — ${link.label}.`,
      group: 'Places',
      confidence: 'commonly_reported',
    });
  }

  return conn({
    relation: 'related_to',
    entity_type: 'experience',
    slug: slugFromHref,
    title: link.label,
    href: link.href,
    teaser: `Level 1 tool — ${link.label}.`,
    group: 'Tools',
    confidence: 'editorial',
  });
}

/** Platform-built atlas hallway — fills gaps when engine seed is missing */
export function buildAtlasTermGraph(slug: string): EntityGraphView | null {
  const entry = getAtlasEntry(slug);
  if (!entry) return null;

  const seeded = resolveEntityGraph({ world_slug: 'bourbon', entity_type: 'atlas_term', slug });
  if (seeded && seeded.connection_count >= 15) return seeded;

  const rabbit = getAtlasRabbitHole(slug);
  const connections: GraphConnection[] = seeded?.connections ? [...seeded.connections] : [];
  const seen = new Set(connections.map((c) => c.id));

  const add = (c: GraphConnection) => {
    if (seen.has(c.id)) return;
    seen.add(c.id);
    connections.push(c);
  };

  for (const related of entry.relatedTerms.slice(0, 8)) {
    const rel = getAtlasEntry(related);
    add(
      conn({
        relation: 'related_to',
        entity_type: 'atlas_term',
        slug: related,
        title: rel?.title ?? related.replace(/-/g, ' '),
        href: `/bourbon/atlas/${related}`,
        teaser: rel?.shortDefinition ?? `Related Atlas term — ${related.replace(/-/g, ' ')}.`,
        group: 'Atlas terms',
        confidence: 'verified',
      }),
    );
  }

  for (const b of bottlesForAtlasTerm(slug)) {
    add(
      conn({
        relation: 'part_of',
        entity_type: 'bottle',
        slug: b.slug,
        title: b.label,
        href: b.href,
        teaser: `Example bottle for ${entry.title} — follow the graph hallway.`,
        group: 'Bottles',
        confidence: b.confidence ?? 'commonly_reported',
      }),
    );
  }

  const forwardGroups: [AtlasForwardLink[], string][] = [
    [rabbit.producerLinks, 'Producers'],
    [rabbit.toolLinks, 'Tools'],
    [rabbit.lessonLinks, 'Lessons'],
    [rabbit.detectiveLinks, 'Investigations'],
    [rabbit.storyLinks, 'Lore'],
    [rabbit.historyLinks, 'History'],
    [rabbit.geographyLinks, 'Places'],
  ];

  for (const [links, group] of forwardGroups) {
    for (const link of links.slice(0, 4)) {
      const c = linkToConnection(link, group);
      c.group = group;
      add(c);
    }
  }

  for (const cousin of entry.cousinIdeas.slice(0, 3)) {
    add(
      conn({
        relation: 'related_to',
        entity_type: 'mystery',
        slug: `${slug}-cousin-${cousin.slice(0, 12).replace(/\s+/g, '-')}`,
        title: cousin,
        href: `/bourbon/lab`,
        teaser: `Explore ${cousin} in Bourbon Lab — log what you learn as evidence.`,
        group: 'Mysteries',
        confidence: 'editorial',
      }),
    );
  }

  add(
    conn({
      relation: 'part_of',
      entity_type: 'collection',
      slug: 'atlas-journal',
      title: 'Log your take',
      href: '/bourbon/experiences/tasting-journal',
      teaser: `Write a field note on ${entry.title} — artifacts become passport evidence.`,
      group: 'Artifacts',
      confidence: 'editorial',
    }),
  );

  add(
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'bottled-in-bond',
      title: 'Back to BiB hallway',
      href: '/bourbon/graph/bottled-in-bond',
      teaser: 'Government-trust standards connect many production terms.',
      group: 'Graph',
      confidence: 'verified',
    }),
  );

  if (connections.length === 0) return null;

  const view: EntityGraphView = {
    world_slug: 'bourbon',
    entity_type: 'atlas_term',
    slug,
    title: entry.title,
    why_should_i_care: entry.whyItMatters,
    why_it_matters: entry.whyItMatters,
    identities: ['atlas term'],
    connections,
    connection_count: connections.length,
    suggested_next: connections.find((c) => c.entity_type === 'bottle') ?? connections[0],
  };

  return view;
}
