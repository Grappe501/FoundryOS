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
    conn({ relation: 'enabled_by', entity_type: 'event', slug: 'bottled-in-bond-act-1897', title: 'Bottled-in-Bond Act of 1897', href: '/bourbon/origins', teaser: 'Government reform after rectifier fraud — the legal spine.', group: 'Eras & events', confidence: 'verified' }),
    conn({ relation: 'related_to', entity_type: 'person', slug: 'colonel-eh-taylor', title: 'Colonel E.H. Taylor', href: '/bourbon/origins', teaser: 'Heritage figure tied to bonded whiskey reform — verify each claim independently.', group: 'Known people', confidence: 'commonly_reported' }),
    conn({ relation: 'related_to', entity_type: 'organization', slug: 'buffalo-trace', title: 'Buffalo Trace', href: '/bourbon/producers/buffalo-trace', teaser: 'E.H. Taylor series and BiB heritage at this house.', group: 'Organizations', confidence: 'commonly_reported' }),
    conn({ relation: 'works_for', entity_type: 'organization', slug: 'heaven-hill', title: 'Heaven Hill', href: '/bourbon/producers/heaven-hill', teaser: 'BiB value king — Evan Williams White Label class.', group: 'Organizations', confidence: 'commonly_reported' }),
    conn({ relation: 'located_in', entity_type: 'place', slug: 'frankfort', title: 'Frankfort, Kentucky', href: '/bourbon/map', teaser: 'Government and distilling intersect on the Kentucky River.', group: 'Places', confidence: 'commonly_reported' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'proof', title: 'Proof', href: '/bourbon/atlas/proof', teaser: '100 proof minimum — government guarantee of strength.', group: 'Atlas terms', confidence: 'verified' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'age-statement', title: 'Age statement', href: '/bourbon/atlas/age-statement', teaser: 'Four years minimum aging under BiB rules.', group: 'Atlas terms', confidence: 'verified' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'dsp', title: 'DSP number', href: '/bourbon/atlas/dsp', teaser: 'One distillery — the D in BiB.', group: 'Atlas terms', confidence: 'verified' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'rickhouse', title: 'Bonded warehouses', href: '/bourbon/atlas/rickhouse', teaser: 'Government-supervised bonded warehouse tradition.', group: 'Atlas terms', confidence: 'commonly_reported' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'straight-bourbon', title: 'Single distilling season', href: '/bourbon/atlas/straight-bourbon', teaser: 'One season, one distiller — seasonal discipline.', group: 'Atlas terms', confidence: 'verified' }),
    conn({ relation: 'part_of', entity_type: 'bottle', slug: 'evan-williams-black', title: 'Evan Williams BiB class', href: '/bourbon/bottles/evan-williams-black', teaser: 'Heaven Hill value BiB entry point.', group: 'Bottles', confidence: 'commonly_reported' }),
    conn({ relation: 'part_of', entity_type: 'bottle', slug: 'old-forester-1920', title: 'Old Forester 1920', href: '/bourbon/bottles/old-forester-1920', teaser: '115 proof BiB discipline in a bottle.', group: 'Bottles', confidence: 'commonly_reported' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'bottled-in-bond', title: 'Old Grand-Dad Bonded (reference)', href: '/bourbon/atlas/bottled-in-bond', teaser: 'Classic BiB label cited in atlas — verify current SKU on shelf.', group: 'Bottles', confidence: 'commonly_reported' }),
    conn({ relation: 'controversy_about', entity_type: 'debate', slug: 'bib-still-matters', title: 'Does BiB still matter?', href: '/bourbon/graph/bib-still-matters', teaser: '1897 trust vs modern single-barrel transparency.', group: 'Debates', confidence: 'editorial' }),
    conn({ relation: 'controversy_about', entity_type: 'debate', slug: 'bib-vs-single-barrel', title: 'BiB vs Single Barrel', href: '/bourbon/graph/bib-vs-single-barrel', teaser: 'Law vs barrel lottery — both have camps.', group: 'Debates', confidence: 'editorial' }),
    conn({ relation: 'controversy_about', entity_type: 'debate', slug: 'best-value-bourbon', title: 'Value bourbon path', href: '/bourbon/graph/best-value-bourbon', teaser: 'BiB as value strategy — under $25 proof you can trust.', group: 'Debates', confidence: 'editorial' }),
    conn({ relation: 'explores', entity_type: 'detective', slug: 'bib-guarantee', title: 'BiB Guarantee Case', href: '/bourbon/detective/bib-guarantee', teaser: 'Does the green label still mean what you think?', group: 'Investigations', confidence: 'commonly_reported' }),
    conn({ relation: 'part_of', entity_type: 'collection', slug: 'bottled-in-bond-collection', title: 'BiB collector path', href: '/bourbon/portfolio', teaser: 'Collect the law on your shelf — evidence wall.', group: 'Collections', confidence: 'editorial' }),
    conn({ relation: 'emerged_in_era', entity_type: 'era', slug: 'post-prohibition-quality', title: 'Government trust era', href: '/bourbon/origins', teaser: 'Reform wave — food purity and whiskey identity.', group: 'Eras & events', confidence: 'commonly_reported' }),
    conn({ relation: 'competes_with', entity_type: 'atlas_term', slug: 'single-barrel', title: 'Single barrel', href: '/bourbon/atlas/single-barrel', teaser: 'Transparency without government formula.', group: 'Compare', confidence: 'commonly_reported' }),
    conn({ relation: 'unlocks', entity_type: 'artifact', slug: 'bib-review', title: 'Review a BiB bottle', href: '/bourbon/experiences/tasting-journal', teaser: 'Your verdict becomes evidence.', group: 'Artifacts', confidence: 'editorial' }),
    conn({ relation: 'explores', entity_type: 'mystery', slug: 'bib-label-drift', title: 'Has the BiB label lost meaning?', href: '/bourbon/detective/bib-guarantee', teaser: 'Mystery of modern labeling vs 1897 intent.', group: 'Mysteries', confidence: 'editorial' }),
    conn({ relation: 'recommended_after', entity_type: 'atlas_term', slug: 'bottled-in-bond', title: 'Weekend graph tour', href: '/bourbon/graph/bottled-in-bond', teaser: 'One term → full hallway — start here.', group: 'Suggested next stop', confidence: 'editorial' }),
  ],
};

BOTTLED_IN_BOND_GRAPH.connection_count = BOTTLED_IN_BOND_GRAPH.connections.length;

export const BOURBON_ATLAS_TERM_GRAPHS: Record<string, EntityGraphView> = {
  'bottled-in-bond': BOTTLED_IN_BOND_GRAPH,
};
