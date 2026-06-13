import type { EntityGraphView, GraphConnection } from '../../types';
import { PRIORITY_ATLAS_TERM_GRAPHS } from './atlas-term-priority-graphs';

function conn(partial: Omit<GraphConnection, 'id'> & { id?: string }): GraphConnection {
  return { id: partial.id ?? `${partial.entity_type}-${partial.slug}`, ...partial };
}

const whyBiB =
  'Before 1897, rectifiers could sell colored grain spirit as "bourbon." Bottled-in-Bond is the law that said: one distillery, one season, four years, 100 proof — and the government guarantees it. Every BiB label is a trust contract between producer, regulator, and you. This is not a glossary entry; it is a weekend rabbit hole.';

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
    compare: '/bourbon/compare?mode=bottles&a=old-forester-1920&b=evan-williams-black',
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
    teaser:
      'The 1897 act was food-purity reform applied to whiskey — rectifiers had been coloring neutral spirit and calling it bourbon. Start here to understand why a green label still signals government supervision, not marketing fluff.',
    group: 'Eras & events',
    confidence: 'verified',
    source_label: 'Bottled-in-Bond Act of 1897',
  }),
  connection_count: 0,
  connections: [
    conn({ relation: 'enabled_by', entity_type: 'event', slug: 'bottled-in-bond-act-1897', title: 'Bottled-in-Bond Act of 1897', href: '/bourbon/origins', teaser: 'Government reform after rectifier fraud — the legal spine that still defines what "bonded" means on a modern label.', group: 'Eras & events', confidence: 'verified', source_label: '1897 federal statute' }),
    conn({ relation: 'related_to', entity_type: 'person', slug: 'colonel-eh-taylor', title: 'Colonel E.H. Taylor (heritage slot)', href: '/bourbon/origins', teaser: 'Taylor is widely cited in bonded-whiskey history — Foundry references the heritage figure but verifies each claim independently. No fabricated biography; follow primary sources before repeating distillery lore.', group: 'Known people', confidence: 'commonly_reported', source_label: 'heritage · verify independently' }),
    conn({ relation: 'related_to', entity_type: 'organization', slug: 'buffalo-trace', title: 'Buffalo Trace · E.H. Taylor line', href: '/bourbon/producers/buffalo-trace', teaser: 'Buffalo Trace’s E.H. Taylor series is a modern BiB showcase — premium proof points that teach what bonded discipline looks like when a house invests in the label instead of treating it as a budget tier.', group: 'Organizations', confidence: 'commonly_reported', source_label: 'producer materials' }),
    conn({ relation: 'works_for', entity_type: 'organization', slug: 'heaven-hill', title: 'Heaven Hill', href: '/bourbon/producers/heaven-hill', teaser: 'Heaven Hill is the value BiB king — Evan Williams White Label class proves bonded whiskey can be daily-drinker honest. Follow this hallway when the debate is whether BiB still matters for under-$25 shelves.', group: 'Organizations', confidence: 'commonly_reported', source_label: 'producer registry' }),
    conn({ relation: 'located_in', entity_type: 'place', slug: 'frankfort', title: 'Frankfort, Kentucky', href: '/bourbon/map', teaser: 'Frankfort sits where government oversight and distilling history intersect on the Kentucky River — useful geography when you connect federal bonded warehouses to the houses that still use the label today.', group: 'Places', confidence: 'commonly_reported', source_label: 'atlas · place' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'proof', title: '100 proof minimum', href: '/bourbon/atlas/proof', teaser: 'BiB requires 100 proof — exactly 50% ABV — as part of the government guarantee. Proof literacy here separates bonded discipline from barrel-strength hype: the law fixed strength so buyers knew what they paid for.', group: 'Atlas terms', confidence: 'verified', source_label: '27 CFR · BiB' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'age-statement', title: 'At least 4 years', href: '/bourbon/atlas/age-statement', teaser: 'Four years minimum aging is the time dimension of BiB — one distilling season plus years in bonded warehouse. Compare against NAS shelf staples to feel what the law buys you in oak extraction.', group: 'Atlas terms', confidence: 'verified', source_label: '27 CFR · BiB' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'dsp', title: 'One distiller', href: '/bourbon/atlas/dsp', teaser: 'One distiller, one DSP — the D in BiB is a fingerprint. When a label says bonded, you should be able to trace a single distilling plant. The DSP detective case teaches you to read that fingerprint.', group: 'Atlas terms', confidence: 'verified', source_label: 'TTB DSP · BiB rule' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'rickhouse', title: 'Bonded warehouses', href: '/bourbon/atlas/rickhouse', teaser: 'Bonded warehouses were government-supervised storage — the physical embodiment of trust. Modern rickhouses still shape flavor through heat cycling; BiB connects legal supervision to the warehouse vocabulary you taste.', group: 'Atlas terms', confidence: 'commonly_reported', source_label: 'atlas · warehouse history' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'straight-bourbon', title: 'One distilling season', href: '/bourbon/atlas/straight-bourbon', teaser: 'One distilling season means the whiskey in the bottle came from a defined window — seasonal discipline that prevents blending across years for the bonded statement. It is the time-box that makes BiB a snapshot, not a averaged blend.', group: 'Atlas terms', confidence: 'verified', source_label: '27 CFR · BiB' }),
    conn({ relation: 'part_of', entity_type: 'bottle', slug: 'evan-williams-black', title: 'Evan Williams Bottled-in-Bond class', href: '/bourbon/bottles/evan-williams-black', teaser: 'Evan Williams White/BiB class is the textbook value BiB — proof you can trust without a lottery ticket. Start a BiB flight here before chasing allocated bonded releases.', group: 'Bottles', confidence: 'commonly_reported', source_label: 'intelligence registry' }),
    conn({ relation: 'part_of', entity_type: 'bottle', slug: 'old-forester-1920', title: 'Old Forester 1920', href: '/bourbon/bottles/old-forester-1920', teaser: 'Old Forester 1920 is BiB discipline at 115 proof — shows how bonded rules coexist with barrel-strength character when a house chooses to exceed the minimum without abandoning the standard.', group: 'Bottles', confidence: 'commonly_reported', source_label: 'intelligence registry' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'bottled-in-bond', title: 'Old Grand-Dad Bonded (reference)', href: '/bourbon/atlas/bottled-in-bond', teaser: 'Old Grand-Dad Bonded is a classic BiB label cited in collector conversations — verify current SKU and proof on shelf before you hunt; the graph references the category, not a price guarantee.', group: 'Bottles', confidence: 'commonly_reported', source_label: 'market reference · verify shelf' }),
    conn({ relation: 'controversy_about', entity_type: 'debate', slug: 'bib-still-matters', title: 'Does BiB still matter?', href: '/bourbon/graph/bib-still-matters', teaser: '1897 trust vs 2026 single-barrel transparency — both camps have evidence. This debate is the philosophical exit ramp of the BiB weekend: is government formula still your quality signal?', group: 'Debates', confidence: 'editorial', source_label: 'debate node' }),
    conn({ relation: 'controversy_about', entity_type: 'debate', slug: 'bib-vs-single-barrel', title: 'BiB vs Single Barrel', href: '/bourbon/graph/bib-vs-single-barrel', teaser: 'Law vs barrel lottery — BiB guarantees process; single barrel guarantees uniqueness. Neither guarantees you will love the pour. Compare both on your passport before picking a camp.', group: 'Debates', confidence: 'editorial', source_label: 'debate node' }),
    conn({ relation: 'controversy_about', entity_type: 'debate', slug: 'best-value-bourbon', title: 'Value bourbon path', href: '/bourbon/graph/best-value-bourbon', teaser: 'BiB as value strategy — under $25 proof you can trust. The value path asks whether bonded labels beat NAS hype on teaching dollars per lesson, not Instagram flex.', group: 'Debates', confidence: 'editorial', source_label: 'debate node' }),
    conn({ relation: 'explores', entity_type: 'detective', slug: 'bib-guarantee', title: 'BiB Guarantee Case', href: '/bourbon/detective/bib-guarantee', teaser: 'Does the green label still mean what you think? This detective case walks label language against federal rules so you can spot marketing drift before you pay BiB prices for non-BiB juice.', group: 'Investigations', confidence: 'commonly_reported', source_label: 'detective case' }),
    conn({ relation: 'part_of', entity_type: 'collection', slug: 'bottled-in-bond-collection', title: 'BiB collector path', href: '/bourbon/portfolio', teaser: 'Collect the law on your shelf — Evan Williams, Old Forester 1920, and whatever bonded picks you trust. The collection path turns this weekend graph into passport evidence, not bookmark hoarding.', group: 'Collections', confidence: 'editorial', source_label: 'collection path' }),
    conn({ relation: 'emerged_in_era', entity_type: 'era', slug: 'post-prohibition-quality', title: 'Government trust era', href: '/bourbon/origins', teaser: 'BiB emerged in a reform wave alongside food purity movements — whiskey identity as consumer protection. Understanding that era explains why bonded language still carries moral weight on labels.', group: 'Eras & events', confidence: 'commonly_reported', source_label: 'history · atlas' }),
    conn({ relation: 'competes_with', entity_type: 'atlas_term', slug: 'single-barrel', title: 'Single barrel alternative', href: '/bourbon/atlas/single-barrel', teaser: 'Single barrel offers transparency without government formula — barrel lottery instead of legal guarantee. Tasting both philosophies in one weekend is the compare behavior this graph unlocks.', group: 'Compare', confidence: 'commonly_reported', source_label: 'atlas compare' }),
    conn({ relation: 'unlocks', entity_type: 'artifact', slug: 'bib-review', title: 'Review a BiB bottle', href: '/bourbon/experiences/tasting-journal', teaser: 'Your verdict on a bonded pour becomes artifact evidence — timestamped, passport-visible, immune to hype amnesia. Log at least two BiB bottles to complete the weekend practice layer.', group: 'Artifacts', confidence: 'editorial', source_label: 'artifact engine' }),
    conn({ relation: 'explores', entity_type: 'mystery', slug: 'bib-label-drift', title: 'Has the BiB label lost meaning?', href: '/bourbon/detective/bib-guarantee', teaser: 'Modern labeling sometimes borrows bonded romance without meeting the standard. This mystery asks whether shoppers still recognize the difference — investigate before you trust green text alone.', group: 'Mysteries', confidence: 'editorial', source_label: 'detective · mystery' }),
    conn({ relation: 'unlocks', entity_type: 'experience', slug: 'bib-weekend-flight', title: 'Suggested BiB tasting mission', href: '/bourbon/experiences/tasting-journal', teaser: 'Weekend mission: pour Evan Williams BiB class and Old Forester 1920 side-by-side. Note proof, age read, and value verdict. One session, three artifacts, one debate position — that is Layer 1 depth.', group: 'Missions', confidence: 'editorial', source_label: 'mission · weekend exemplar' }),
    conn({ relation: 'related_to', entity_type: 'atlas_term', slug: 'american-whiskey', title: 'American whiskey comparison', href: '/bourbon/atlas/straight-bourbon', teaser: 'BiB is bourbon-specific federal language — compare against rye, Tennessee whiskey, and Canadian whisky categories so you know exactly which identity rules apply when the label says bonded.', group: 'Atlas terms', confidence: 'verified', source_label: '27 CFR Part 5' }),
    conn({ relation: 'recommended_after', entity_type: 'atlas_term', slug: 'bottled-in-bond', title: 'Weekend graph tour', href: '/bourbon/graph/bottled-in-bond', teaser: 'You are already inside the hub — follow suggested next stops clockwise: Act → proof → age → warehouse → value bottles → detective → debate → mission. One Atlas term, full weekend.', group: 'Suggested next stop', confidence: 'editorial', source_label: 'graph tour' }),
  ],
};

BOTTLED_IN_BOND_GRAPH.connection_count = BOTTLED_IN_BOND_GRAPH.connections.length;

export const BOURBON_ATLAS_TERM_GRAPHS: Record<string, EntityGraphView> = {
  'bottled-in-bond': BOTTLED_IN_BOND_GRAPH,
  ...PRIORITY_ATLAS_TERM_GRAPHS,
};
