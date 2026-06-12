import type { EntityGraphView, GraphConnection } from '../../types';

function conn(partial: Omit<GraphConnection, 'id'> & { id?: string }): GraphConnection {
  return { id: partial.id ?? `${partial.entity_type}-${partial.slug}`, ...partial };
}

const whyBiB =
  'Before 1897, rectifiers could sell colored grain spirit as "bourbon." Bottled-in-Bond is the law that said: one distillery, one season, four years, 100 proof — and the government guarantees it. Every BiB label is a trust contract between producer, regulator, and you.';

/** Exemplar: one term → a weekend — multi-identity node */
export const BOTTLED_IN_BOND_GRAPH: EntityGraphView = {
  world_slug: 'bourbon',
  entity_type: 'atlas_term',
  slug: 'bottled-in-bond',
  title: 'Bottled in Bond',
  why_should_i_care: whyBiB,
  why_it_matters: whyBiB,
  identities: ['law', 'history', 'government_reform', 'quality_standard', 'collecting_strategy', 'buying_guide', 'debate'],
  behaviors: {
    read: '/bourbon/atlas/bottled-in-bond',
    investigate: '/bourbon/detective/bib-guarantee',
    compare: '/bourbon/compare?mode=bottles&a=old-forester-1920&b=four-roses-single-barrel',
    explore: '/bourbon/origins',
    collect: '/bourbon/portfolio',
    influence: '/bourbon/experiences/tasting-journal',
  },
  suggested_next: conn({
    relation: 'explores',
    entity_type: 'event',
    slug: 'bottled-in-bond-act-1897',
    title: 'Bottled-in-Bond Act of 1897',
    href: '/bourbon/origins',
    teaser: 'Government reform after rectifier fraud.',
    group: 'Eras & events',
  }),
  connection_count: 0,
  connections: [
    conn({ relation: 'enabled_by', entity_type: 'event', slug: 'bottled-in-bond-act-1897', title: 'Bottled-in-Bond Act of 1897', href: '/bourbon/origins', teaser: 'Government reform after rectifier fraud.', group: 'Eras & events' }),
    conn({ relation: 'related_to', entity_type: 'organization', slug: 'buffalo-trace', title: 'Buffalo Trace', href: '/bourbon/producers/buffalo-trace', teaser: 'BiB line heritage — Taylor series at this house.', group: 'Organizations' }),
    conn({ relation: 'located_in', entity_type: 'place', slug: 'frankfort', title: 'Frankfort, Kentucky', href: '/bourbon/map', teaser: 'Government and distilling intersect on the Kentucky River.', group: 'Places' }),
    conn({ relation: 'works_for', entity_type: 'organization', slug: 'heaven-hill', title: 'Heaven Hill', href: '/bourbon/producers/heaven-hill', teaser: 'BiB value king — Evan Williams White Label.', group: 'Organizations' }),
    conn({ relation: 'part_of', entity_type: 'bottle', slug: 'old-forester-1920', title: 'Old Forester 1920', href: '/bourbon/bottles/old-forester-1920', teaser: '115 proof BiB discipline in a bottle.', group: 'Bottles' }),
    conn({ relation: 'controversy_about', entity_type: 'debate', slug: 'bib-vs-single-barrel', title: 'BiB vs Single Barrel — which guarantees quality?', href: '/bourbon/lore', teaser: 'Law vs barrel lottery — both have camps.', group: 'Debates' }),
    conn({ relation: 'explores', entity_type: 'detective', slug: 'bib-guarantee', title: 'BiB Guarantee Case', href: '/bourbon/detective/bib-guarantee', teaser: 'Does the green label still mean what you think?', group: 'Investigations' }),
    conn({ relation: 'part_of', entity_type: 'collection', slug: 'bottled-in-bond-collection', title: 'Bottled-in-Bond Collection', href: '/bourbon/portfolio', teaser: 'Collect the law on your shelf.', group: 'Collections' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'dsp', title: 'DSP number', href: '/bourbon/atlas/dsp', teaser: 'One distillery — the D in BiB.', group: 'Atlas terms' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'proof', title: 'Proof', href: '/bourbon/atlas/proof', teaser: '100 proof minimum — the second B in BiB.', group: 'Atlas terms' }),
    conn({ relation: 'emerged_in_era', entity_type: 'era', slug: 'post-prohibition-quality', title: 'Post-rectifier quality era', href: '/bourbon/origins', teaser: 'Same reform wave as food purity laws.', group: 'Eras & events' }),
    conn({ relation: 'competes_with', entity_type: 'atlas_term', slug: 'single-barrel', title: 'Single barrel', href: '/bourbon/atlas/single-barrel', teaser: 'Transparency without government formula.', group: 'Compare' }),
    conn({ relation: 'unlocks', entity_type: 'artifact', slug: 'bib-review', title: 'Review a BiB bottle', href: '/bourbon/experiences/tasting-journal', teaser: '040A — your verdict becomes evidence.', group: 'Artifacts (040A)' }),
  ],
};

BOTTLED_IN_BOND_GRAPH.connection_count = BOTTLED_IN_BOND_GRAPH.connections.length;

export const BOURBON_ATLAS_TERM_GRAPHS: Record<string, EntityGraphView> = {
  'bottled-in-bond': BOTTLED_IN_BOND_GRAPH,
};
