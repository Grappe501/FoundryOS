import type { EntityGraphView, GraphConnection } from '../../types';

function conn(
  partial: Omit<GraphConnection, 'id'> & { id?: string },
): GraphConnection {
  return { id: partial.id ?? `${partial.entity_type}-${partial.slug}`, ...partial };
}

/** Exemplar: Wild Turkey 101 — one bottle → 40 clicks */
const WILD_TURKEY_101: EntityGraphView = {
  world_slug: 'bourbon',
  entity_type: 'bottle',
  slug: 'wild-turkey-101',
  title: 'Wild Turkey 101',
  why_it_matters:
    'The bottle that teaches proof and rye spice without barrel-proof chaos. Jimmy Russell\'s philosophy in a $28 pour — character over hype.',
  why_should_i_care:
    'The bottle that teaches proof and rye spice without barrel-proof chaos. Jimmy Russell\'s philosophy in a $28 pour — character over hype.',
  suggested_next: conn({
    relation: 'works_for',
    entity_type: 'person',
    slug: 'wild-turkey-master',
    title: 'Wild Turkey — master distiller',
    href: '/bourbon/people',
    teaser: 'Leader slot — profile when verified editorial content exists.',
    group: 'Leader slots',
  }),
  connection_count: 0,
  connections: [
    conn({ relation: 'works_for', entity_type: 'person', slug: 'wild-turkey-master', title: 'Wild Turkey — master distiller', href: '/bourbon/people', teaser: 'Leader slot — not a fabricated bio.', group: 'Leader slots' }),
    conn({ relation: 'works_for', entity_type: 'producer', slug: 'wild-turkey', title: 'Wild Turkey Distillery', href: '/bourbon/producers/wild-turkey', teaser: 'Lawrenceburg campus — high rye house identity.', group: 'Producers' }),
    conn({ relation: 'competes_with', entity_type: 'bottle', slug: 'buffalo-trace', title: 'Buffalo Trace', href: '/bourbon/compare?mode=bottles&a=wild-turkey-101&b=buffalo-trace', teaser: 'Value classic rivalry — spice vs sweetness.', group: 'Rival bottles' }),
    conn({ relation: 'competes_with', entity_type: 'bottle', slug: 'knob-creek-9', title: 'Knob Creek 9 Year', href: '/bourbon/compare?mode=bottles&a=wild-turkey-101&b=knob-creek-9', teaser: '100 proof from a different house — age vs spice.', group: 'Rival bottles' }),
    conn({ relation: 'competes_with', entity_type: 'bottle', slug: 'old-forester-1920', title: 'Old Forester 1920', href: '/bourbon/compare?mode=bottles&a=wild-turkey-101&b=old-forester-1920', teaser: '115 proof alternative — heat with different fruit.', group: 'Rival bottles' }),
    conn({ relation: 'controversy_about', entity_type: 'debate', slug: 'best-value-bourbon', title: 'Best value bourbon under $35?', href: '/bourbon/lore', teaser: '101 always in the conversation — overrated or legendary?', group: 'Debates' }),
    conn({ relation: 'controversy_about', entity_type: 'debate', slug: 'high-proof-entry', title: 'Is 101 too hot for beginners?', href: '/bourbon/academy/three-pours-one-method', teaser: 'Purists say yes. Russell said character requires proof.', group: 'Debates' }),
    conn({ relation: 'explores', entity_type: 'mystery', slug: 'recipe-unchanged', title: 'Why has the recipe barely changed?', href: '/bourbon/detective/weller-ghost', teaser: 'Consistency as philosophy — or corporate inertia?', group: 'Mysteries' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'rickhouse', title: 'Rickhouse', href: '/bourbon/atlas/rickhouse', teaser: 'Where 101 ages — warehouse position matters.', group: 'Atlas terms' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'barrel-proof', title: 'Barrel proof', href: '/bourbon/atlas/barrel-proof', teaser: '101 is fixed proof — not barrel strength.', group: 'Atlas terms' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'mash-bill', title: 'Mash bill', href: '/bourbon/atlas/mash-bill', teaser: 'High rye recipe — the Turkey spice signature.', group: 'Atlas terms' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'char-level', title: 'Char level', href: '/bourbon/atlas/char-level', teaser: 'Barrel char drives vanilla and tannin.', group: 'Atlas terms' }),
    conn({ relation: 'part_of', entity_type: 'collection', slug: 'wheated-explorer', title: 'Kentucky Classics (value shelf)', href: '/bourbon/portfolio', teaser: 'Not wheated — but every value collection includes 101.', group: 'Collections' }),
    conn({ relation: 'located_in', entity_type: 'place', slug: 'lawrenceburg', title: 'Lawrenceburg, Kentucky', href: '/bourbon/map', teaser: 'Wild Turkey campus — pilgrimage destination.', group: 'Places' }),
    conn({ relation: 'located_in', entity_type: 'place', slug: 'wild-turkey-visitor', title: 'Wild Turkey Visitor Center', href: '/bourbon/campus', teaser: 'Tours, rickhouses, Russell family story.', group: 'Pilgrimages' }),
    conn({ relation: 'recommended_after', entity_type: 'bottle', slug: 'russells-reserve-10', title: "Russell's Reserve 10", href: '/bourbon/bottles/russells-reserve-10', teaser: 'Same house, less heat — step up path.', group: 'Suggested next' }),
    conn({ relation: 'explores', entity_type: 'detective', slug: 'allocated-worth', title: 'Allocated Worth Case', href: '/bourbon/detective/allocated-worth', teaser: '101 proves you do not need allocation for great bourbon.', group: 'Investigations' }),
    conn({ relation: 'unlocks', entity_type: 'artifact', slug: 'tasting-note', title: 'Log a tasting note', href: '/bourbon/experiences/tasting-journal', teaser: 'Your pour becomes an artifact — identity evidence.', group: 'Artifacts (040A)' }),
    conn({ relation: 'unlocks', entity_type: 'artifact', slug: 'shelf-entry', title: 'Add to your shelf', href: '/bourbon/portfolio', teaser: 'Own it in your personal database.', group: 'Artifacts (040A)' }),
    conn({ relation: 'related_to', entity_type: 'lore', slug: 'bourbon-value-wars', title: 'The value bourbon wars', href: '/bourbon/wars', teaser: 'How 101 became the benchmark pour.', group: 'Lore' }),
  ],
};

WILD_TURKEY_101.connection_count = WILD_TURKEY_101.connections.length;

export const BOURBON_BOTTLE_GRAPHS: Record<string, EntityGraphView> = {
  'wild-turkey-101': WILD_TURKEY_101,
};

/** Minimal graph for bottles without full seed — producer + compare hub */
export function bourbonBottleGraphFallback(slug: string): EntityGraphView | null {
  // Dynamic import avoided — caller passes catalog data via platform layer
  return null;
}
