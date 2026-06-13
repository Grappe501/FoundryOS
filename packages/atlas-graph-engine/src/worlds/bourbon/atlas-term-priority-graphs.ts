import type { EntityGraphView, GraphConnection } from '../../types';

function conn(partial: Omit<GraphConnection, 'id'> & { id?: string }): GraphConnection {
  return { id: partial.id ?? `${partial.entity_type}-${partial.slug}`, ...partial };
}

type TermBlueprint = {
  slug: string;
  title: string;
  why: string;
  identities: string[];
  terms: { slug: string; title: string; teaser: string }[];
  bottles: { slug: string; title: string; teaser: string }[];
  producers: { slug: string; title: string; teaser: string }[];
  extras?: GraphConnection[];
};

function buildTermGraph(b: TermBlueprint): EntityGraphView {
  const connections: GraphConnection[] = [
    ...b.terms.map((t) =>
      conn({
        relation: 'related_to',
        entity_type: 'atlas_term',
        slug: t.slug,
        title: t.title,
        href: `/bourbon/atlas/${t.slug}`,
        teaser: t.teaser,
        group: 'Atlas terms',
        confidence: 'verified',
      }),
    ),
    ...b.bottles.map((bot) =>
      conn({
        relation: 'part_of',
        entity_type: 'bottle',
        slug: bot.slug,
        title: bot.title,
        href: `/bourbon/bottles/${bot.slug}`,
        teaser: bot.teaser,
        group: 'Bottles',
        confidence: 'commonly_reported',
      }),
    ),
    ...b.producers.map((p) =>
      conn({
        relation: 'works_for',
        entity_type: 'producer',
        slug: p.slug,
        title: p.title,
        href: `/bourbon/producers/${p.slug}`,
        teaser: p.teaser,
        group: 'Producers',
        confidence: 'commonly_reported',
      }),
    ),
    conn({
      relation: 'explores',
      entity_type: 'detective',
      slug: 'dsp-numbers',
      title: 'DSP detective case',
      href: '/bourbon/detective/dsp-numbers',
      teaser: 'Trace who distilled what — label literacy connects every atlas term to real bottles.',
      group: 'Investigations',
      confidence: 'editorial',
    }),
    conn({
      relation: 'part_of',
      entity_type: 'collection',
      slug: 'atlas-journal',
      title: 'Log field notes',
      href: '/bourbon/experiences/tasting-journal',
      teaser: 'Your take on this term becomes passport evidence — not bookmark hoarding.',
      group: 'Artifacts',
      confidence: 'editorial',
    }),
    conn({
      relation: 'related_to',
      entity_type: 'atlas_term',
      slug: 'bottled-in-bond',
      title: 'BiB hallway',
      href: '/bourbon/graph/bottled-in-bond',
      teaser: 'Government-trust standards anchor many production and proof terms.',
      group: 'Graph',
      confidence: 'verified',
    }),
    conn({
      relation: 'controversy_about',
      entity_type: 'debate',
      slug: 'best-value-bourbon',
      title: 'Value bourbon debate',
      href: '/bourbon/graph/best-value-bourbon',
      teaser: 'Atlas literacy saves money — debate where shelf staples beat hype.',
      group: 'Debates',
      confidence: 'editorial',
    }),
    ...(b.extras ?? []),
  ];

  const view: EntityGraphView = {
    world_slug: 'bourbon',
    entity_type: 'atlas_term',
    slug: b.slug,
    title: b.title,
    why_should_i_care: b.why,
    why_it_matters: b.why,
    identities: b.identities,
    connections,
    connection_count: connections.length,
    suggested_next: connections[0],
  };
  view.connection_count = view.connections.length;
  return view;
}

const PRIORITY_BLUEPRINTS: TermBlueprint[] = [
  {
    slug: 'mash-bill',
    title: 'Mash bill',
    why: 'The grain recipe is the chord progression of bourbon — corn sweetness, rye spice, wheat softness. Mash bill literacy is the fastest way to predict flavor before you pay.',
    identities: ['grain', 'production', 'flavor_architecture', 'beginner_guide'],
    terms: [
      { slug: 'corn', title: 'Corn', teaser: 'Minimum 51% — body and sweetness anchor.' },
      { slug: 'rye', title: 'Rye', teaser: 'Spice grain — pepper and mint when elevated.' },
      { slug: 'wheat', title: 'Wheat', teaser: 'Soft replacement for rye in wheated bourbon.' },
      { slug: 'wheated-bourbon', title: 'Wheated bourbon', teaser: 'Wheat as flavor grain — Maker\'s and Weller lane.' },
      { slug: 'high-rye-bourbon', title: 'High-rye bourbon', teaser: 'Elevated rye — Four Roses and Old Forester spice.' },
    ],
    bottles: [
      { slug: 'makers-mark', title: "Maker's Mark", teaser: 'Wheated gateway — bread and honey baseline.' },
      { slug: 'wild-turkey-101', title: 'Wild Turkey 101', teaser: 'High-rye Turkey spice at 101 proof.' },
      { slug: 'four-roses-yellow', title: 'Four Roses Yellow', teaser: 'Blend baseline — gentle high-rye intro.' },
    ],
    producers: [
      { slug: 'four-roses', title: 'Four Roses', teaser: 'Ten recipes — mash bill as religion.' },
      { slug: 'makers-mark', title: "Maker's Mark", teaser: 'Wheated house identity.' },
      { slug: 'wild-turkey', title: 'Wild Turkey', teaser: 'Rye-forward house profile.' },
    ],
  },
  {
    slug: 'proof',
    title: 'Proof',
    why: 'Proof is twice ABV — the number that tells you heat, dilution headroom, and BiB compliance. Proof literacy separates daily drinkers from hazmat tourists.',
    identities: ['legal', 'tasting', 'beginner_guide', 'value_signal'],
    terms: [
      { slug: 'barrel-proof', title: 'Barrel proof', teaser: 'Strength in barrel — often hotter than bottle.' },
      { slug: 'bottled-in-bond', title: 'Bottled-in-Bond', teaser: '100 proof minimum by law.' },
      { slug: 'cask-strength', title: 'Cask strength', teaser: 'Uncut bottling — water is your tool.' },
      { slug: 'bottling-proof', title: 'Bottling proof', teaser: 'Final ABV after cut water.' },
      { slug: 'hazmat-proof', title: 'Hazmat proof', teaser: 'Above 140 — logistics and heat extremes.' },
    ],
    bottles: [
      { slug: 'wild-turkey-101', title: 'Wild Turkey 101', teaser: '101 as teaching proof — not accident.' },
      { slug: 'old-forester-1920', title: 'Old Forester 1920', teaser: '115 proof BiB discipline.' },
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: '90 proof daily baseline contrast.' },
    ],
    producers: [
      { slug: 'wild-turkey', title: 'Wild Turkey', teaser: '101 proof as brand signature.' },
      { slug: 'old-forester', title: 'Old Forester', teaser: 'Whiskey Row proof experiments.' },
    ],
    extras: [
      conn({
        relation: 'controversy_about',
        entity_type: 'debate',
        slug: 'high-proof-entry',
        title: 'Is 101 too hot for beginners?',
        href: '/bourbon/graph/high-proof-entry',
        teaser: 'Proof as teacher vs barrier — taste both sides.',
        group: 'Debates',
        confidence: 'editorial',
      }),
    ],
  },
  {
    slug: 'dsp',
    title: 'DSP',
    why: 'Distilled Spirits Plant numbers trace who actually made the whiskey — sourcing debates, BiB rules, and detective work all start at the DSP.',
    identities: ['legal', 'traceability', 'investigation', 'quality_standard'],
    terms: [
      { slug: 'bottled-in-bond', title: 'BiB one-distiller rule', teaser: 'One DSP per bonded statement.' },
      { slug: 'sourcing', title: 'Sourcing', teaser: 'When juice travels between plants.' },
      { slug: 'straight-bourbon', title: 'Straight bourbon', teaser: 'Identity rules tied to DSP records.' },
      { slug: 'age-statement', title: 'Age statement', teaser: 'Label claims verified against plant records.' },
    ],
    bottles: [
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'Campus DSP tracing exercise.' },
      { slug: 'evan-williams-black', title: 'Evan Williams', teaser: 'Sourced vs distilled label reads.' },
    ],
    producers: [
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'Multi-brand campus — read the fine print.' },
      { slug: 'heaven-hill', title: 'Heaven Hill', teaser: 'Value house with clear DSP story.' },
    ],
    extras: [
      conn({
        relation: 'explores',
        entity_type: 'detective',
        slug: 'dsp-numbers',
        title: 'DSP Numbers Case',
        href: '/bourbon/detective/dsp-numbers',
        teaser: 'Walk a label against TTB records.',
        group: 'Investigations',
        confidence: 'commonly_reported',
      }),
    ],
  },
  {
    slug: 'rickhouse',
    title: 'Rickhouse',
    why: 'Multi-story warehouses where barrels breathe through seasons — rickhouse position explains why two barrels from the same mash can taste unrelated.',
    identities: ['barrel', 'aging', 'geography', 'flavor_driver'],
    terms: [
      { slug: 'warehouse-floor', title: 'Warehouse floor', teaser: 'Vertical position changes aging speed.' },
      { slug: 'heat-cycling', title: 'Heat cycling', teaser: 'Seasonal expansion into wood.' },
      { slug: 'angels-share', title: "Angel's share", teaser: 'Evaporation loss over years.' },
      { slug: 'barrel-proof', title: 'Barrel proof', teaser: 'Proof rises as water exits the barrel.' },
    ],
    bottles: [
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'Campus rickhouse tours — taste position lore.' },
      { slug: 'bookers', title: "Booker's", teaser: 'Barrel-proof warehouse lottery.' },
    ],
    producers: [
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'Iconic Frankfort rickhouses.' },
      { slug: 'heaven-hill', title: 'Heaven Hill', teaser: 'Bardstown warehouse rows.' },
    ],
    extras: [
      conn({
        relation: 'explores',
        entity_type: 'detective',
        slug: 'barrel-floor',
        title: 'Barrel floor myth case',
        href: '/bourbon/detective/barrel-floor',
        teaser: 'Does top-rick hype hold up blind?',
        group: 'Investigations',
        confidence: 'editorial',
      }),
      conn({
        relation: 'located_in',
        entity_type: 'place',
        slug: 'kentucky',
        title: 'Kentucky map',
        href: '/bourbon/map',
        teaser: 'Warehouse geography — climate drives the rickhouse story.',
        group: 'Places',
        confidence: 'commonly_reported',
      }),
    ],
  },
  {
    slug: 'single-barrel',
    title: 'Single barrel',
    why: 'One barrel bottled — variation expected, transparency earned. Single barrel literacy is store-pick religion and Blanton\'s origin story combined.',
    identities: ['barrel', 'market', 'transparency', 'lottery'],
    terms: [
      { slug: 'store-pick', title: 'Store pick', teaser: 'Retailer-selected single barrels.' },
      { slug: 'barrel-number', title: 'Barrel number', teaser: 'Traceability on the label.' },
      { slug: 'small-batch', title: 'Small batch', teaser: 'Modest blend vs one barrel.' },
      { slug: 'private-selection', title: 'Private selection', teaser: 'Club and restaurant picks.' },
    ],
    bottles: [
      { slug: 'four-roses-single-barrel', title: 'Four Roses Single Barrel', teaser: 'Recipe code on every pick.' },
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'Compare single barrel to flagship blend.' },
    ],
    producers: [
      { slug: 'four-roses', title: 'Four Roses', teaser: 'OBSV/OESK picker culture.' },
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'Blanton\'s lineage — single barrel category birth.' },
    ],
    extras: [
      conn({
        relation: 'controversy_about',
        entity_type: 'debate',
        slug: 'bib-vs-single-barrel',
        title: 'BiB vs single barrel',
        href: '/bourbon/graph/bib-vs-single-barrel',
        teaser: 'Law vs barrel lottery — both camps have evidence.',
        group: 'Debates',
        confidence: 'editorial',
      }),
      conn({
        relation: 'related_to',
        entity_type: 'experience',
        slug: 'store-pick-academy',
        title: 'Store pick academy',
        href: '/bourbon/store-picks',
        teaser: 'Learn picker discipline before MSRP becomes secondary.',
        group: 'Tools',
        confidence: 'editorial',
      }),
    ],
  },
  {
    slug: 'barrel-proof',
    title: 'Barrel proof',
    why: 'Strength straight from the barrel — often uncut heat with richer mouthfeel. Barrel proof is where water becomes a tasting tool, not an insult.',
    identities: ['proof', 'tasting', 'enthusiast', 'value_debate'],
    terms: [
      { slug: 'cask-strength', title: 'Cask strength', teaser: 'No dilution to standard proof.' },
      { slug: 'proof', title: 'Proof', teaser: 'ABV doubled — read the label math.' },
      { slug: 'non-chill-filtered', title: 'Non-chill filtered', teaser: 'Often paired with full proof.' },
      { slug: 'entry-proof', title: 'Entry proof', teaser: 'What went into wood affects exit proof.' },
    ],
    bottles: [
      { slug: 'bookers', title: "Booker's", teaser: 'Barrel proof batch culture.' },
      { slug: 'old-forester-1920', title: 'Old Forester 1920', teaser: '115 proof BiB barrel character.' },
      { slug: 'wild-turkey-101', title: 'Wild Turkey 101', teaser: 'Fixed proof vs barrel proof contrast.' },
    ],
    producers: [
      { slug: 'jim-beam', title: 'Jim Beam', teaser: "Booker's and Knob Creek heat." },
      { slug: 'old-forester', title: 'Old Forester', teaser: '1920 as proof education.' },
    ],
  },
  {
    slug: 'age-statement',
    title: 'Age statement',
    why: 'Youngest whiskey age on the label — transparency or its absence shapes every shelf debate. Age statements are honesty tools, not automatic quality scores.',
    identities: ['legal', 'market', 'debate', 'collecting'],
    terms: [
      { slug: 'non-age-stated', title: 'Non-age stated', teaser: 'NAS blending strategy.' },
      { slug: 'angels-share', title: "Angel's share", teaser: 'Why older bottles cost more.' },
      { slug: 'straight-bourbon', title: 'Straight bourbon', teaser: 'Two-year minimum baseline.' },
      { slug: 'bottled-in-bond', title: 'BiB four-year rule', teaser: 'Age floor in bonded whiskey.' },
    ],
    bottles: [
      { slug: 'eagle-rare', title: 'Eagle Rare 10', teaser: 'Age statement on same mash as BT.' },
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'NAS flagship — what are you buying?' },
      { slug: 'russells-reserve-10', title: "Russell's Reserve 10", teaser: 'Decade statement on Turkey line.' },
    ],
    producers: [
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'NAS vs aged portfolio contrast.' },
      { slug: 'wild-turkey', title: 'Wild Turkey', teaser: 'Russell age ladder.' },
    ],
  },
  {
    slug: 'straight-bourbon',
    title: 'Straight bourbon',
    why: 'Two years in new charred oak, no flavoring — the legal identity most shelf bourbon shares. Straight is the baseline identity rule before BiB and single barrel add constraints.',
    identities: ['legal', 'beginner_guide', 'quality_floor', 'label_literacy'],
    terms: [
      { slug: 'bottled-in-bond', title: 'Bottled-in-Bond', teaser: 'Stricter straight subset.' },
      { slug: 'kentucky-straight-bourbon', title: 'Kentucky straight', teaser: 'Geographic production identity.' },
      { slug: 'american-whiskey', title: 'American whiskey', teaser: 'Bourbon as subset of wider category.' },
      { slug: 'age-statement', title: 'Age statement', teaser: 'Optional transparency on straight whiskey.' },
    ],
    bottles: [
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'Straight bourbon daily drinker.' },
      { slug: 'makers-mark', title: "Maker's Mark", teaser: 'Straight wheated identity.' },
      { slug: 'wild-turkey-101', title: 'Wild Turkey 101', teaser: 'Straight at teaching proof.' },
    ],
    producers: [
      { slug: 'jim-beam', title: 'Jim Beam', teaser: 'Volume straight bourbon baseline.' },
      { slug: 'heaven-hill', title: 'Heaven Hill', teaser: 'Value straight portfolio.' },
    ],
  },
  {
    slug: 'char-level',
    title: 'Char level',
    why: 'Burnt inner barrel surface filters and flavors spirit — char depth is vanilla, smoke, and tannin economics in wood.',
    identities: ['barrel', 'production', 'flavor', 'cooperage'],
    terms: [
      { slug: 'toasting', title: 'Toasting', teaser: 'Heat before char — coconut and almond.' },
      { slug: 'new-charred-oak', title: 'New charred oak', teaser: 'Virgin oak legal requirement.' },
      { slug: 'cooperage', title: 'Cooperage', teaser: 'Barrel craft and char specs.' },
      { slug: 'stave', title: 'Stave', teaser: 'Oak plank grain direction.' },
    ],
    bottles: [
      { slug: 'woodford-reserve', title: 'Woodford Reserve', teaser: 'Pot still + char character.' },
      { slug: 'makers-mark', title: "Maker's Mark", teaser: 'Char and wheat softness interplay.' },
    ],
    producers: [
      { slug: 'woodford-reserve', title: 'Woodford Reserve', teaser: 'Cooperage-forward campus tours.' },
      { slug: 'makers-mark', title: "Maker's Mark", teaser: 'Red wax and barrel finishing lore.' },
    ],
  },
  {
    slug: 'wheated-bourbon',
    title: 'Wheated bourbon',
    why: 'Wheat replaces rye as the flavor grain — softer, bready, honeyed pours that host well and hunt badly when allocated.',
    identities: ['grain', 'style', 'allocation', 'beginner_friendly'],
    terms: [
      { slug: 'wheat', title: 'Wheat', teaser: 'Soft grain in mash bill.' },
      { slug: 'mash-bill', title: 'Mash bill', teaser: 'Recipe architecture context.' },
      { slug: 'allocation', title: 'Allocation', teaser: 'Weller line scarcity economics.' },
      { slug: 'store-pick', title: 'Store pick', teaser: 'Wheated picks at MSRP only.' },
    ],
    bottles: [
      { slug: 'makers-mark', title: "Maker's Mark", teaser: 'Accessible wheated gateway.' },
      { slug: 'larceny', title: 'Larceny', teaser: 'Heaven Hill wheated step-up.' },
      { slug: 'weller-special-reserve', title: 'Weller Special Reserve', teaser: 'Allocation wheated — hunt responsibly.' },
    ],
    producers: [
      { slug: 'makers-mark', title: "Maker's Mark", teaser: 'Wheated house origin.' },
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'Weller line campus.' },
    ],
    extras: [
      conn({
        relation: 'explores',
        entity_type: 'detective',
        slug: 'weller-ghost',
        title: 'Weller ghost case',
        href: '/bourbon/detective/weller-ghost',
        teaser: 'Allocation vs juice — investigate before you line up.',
        group: 'Investigations',
        confidence: 'editorial',
      }),
    ],
  },
  {
    slug: 'high-rye-bourbon',
    title: 'High-rye bourbon',
    why: 'Elevated rye percentage — pepper, mint, and baking spice forward pours for palates that want backbone over softness.',
    identities: ['grain', 'style', 'spice', 'comparison'],
    terms: [
      { slug: 'rye', title: 'Rye grain', teaser: 'Spice driver in mash bill.' },
      { slug: 'mash-bill', title: 'Mash bill', teaser: 'Compare rye percentages across houses.' },
      { slug: 'rye-whiskey', title: 'Rye whiskey', teaser: '51%+ rye — cousin category.' },
    ],
    bottles: [
      { slug: 'wild-turkey-101', title: 'Wild Turkey 101', teaser: 'Turkey rye spice baseline.' },
      { slug: 'four-roses-single-barrel', title: 'Four Roses OBSV', teaser: 'High-rye recipe code.' },
      { slug: 'old-forester-1920', title: 'Old Forester 1920', teaser: 'Brown-Forman rye-forward heat.' },
    ],
    producers: [
      { slug: 'wild-turkey', title: 'Wild Turkey', teaser: 'Rye-forward house DNA.' },
      { slug: 'four-roses', title: 'Four Roses', teaser: 'Multiple high-rye recipes.' },
      { slug: 'old-forester', title: 'Old Forester', teaser: 'Whiskey Row spice.' },
    ],
  },
  {
    slug: 'store-pick',
    title: 'Store pick',
    why: 'Retailer-selected single barrels — picker skill, MSRP discipline, and barrel lottery in one label. Store picks are where atlas literacy meets local hunting ethics.',
    identities: ['market', 'single_barrel', 'community', 'economics'],
    terms: [
      { slug: 'single-barrel', title: 'Single barrel', teaser: 'One barrel bottled — variation expected.' },
      { slug: 'private-selection', title: 'Private selection', teaser: 'Club and group picks.' },
      { slug: 'allocation', title: 'Allocation', teaser: 'When picks replace lottery lines.' },
      { slug: 'msrp', title: 'MSRP', teaser: 'Suggested vs shelf vs secondary.' },
    ],
    bottles: [
      { slug: 'four-roses-single-barrel', title: 'Four Roses pick', teaser: 'Recipe code literacy required.' },
      { slug: 'buffalo-trace', title: 'Buffalo Trace pick', teaser: 'Campus juice — picker variance.' },
    ],
    producers: [
      { slug: 'four-roses', title: 'Four Roses', teaser: 'National pick program.' },
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'High-demand pick culture.' },
    ],
    extras: [
      conn({
        relation: 'related_to',
        entity_type: 'experience',
        slug: 'store-picks-tool',
        title: 'Store pick academy',
        href: '/bourbon/store-picks',
        teaser: 'Picker discipline before secondary markup.',
        group: 'Tools',
        confidence: 'editorial',
      }),
    ],
  },
  {
    slug: 'allocation',
    title: 'Allocation',
    why: 'Distillery-controlled scarcity — distribution math, hype cycles, and the ethics of camping for juice. Allocation literacy protects your wallet and your palate.',
    identities: ['market', 'economics', 'ethics', 'hype'],
    terms: [
      { slug: 'allocation-season', title: 'Allocation season', teaser: 'Periodic drop calendar.' },
      { slug: 'msrp', title: 'MSRP', teaser: 'Suggested vs reality.' },
      { slug: 'secondary-market', title: 'Secondary market', teaser: 'Aftermarket pricing debate.' },
      { slug: 'store-pick', title: 'Store pick', teaser: 'Alternative to lottery lines.' },
    ],
    bottles: [
      { slug: 'weller-special-reserve', title: 'Weller Special Reserve', teaser: 'Allocation poster child.' },
      { slug: 'eagle-rare', title: 'Eagle Rare', teaser: 'MSRP drift case study.' },
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'Gateway before allocation chase.' },
    ],
    producers: [
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'BTAC and Weller allocation hub.' },
    ],
    extras: [
      conn({
        relation: 'explores',
        entity_type: 'detective',
        slug: 'allocated-worth',
        title: 'Allocated worth case',
        href: '/bourbon/detective/allocated-worth',
        teaser: 'Is the line worth the pour?',
        group: 'Investigations',
        confidence: 'editorial',
      }),
      conn({
        relation: 'related_to',
        entity_type: 'experience',
        slug: 'economy',
        title: 'Bourbon economy',
        href: '/bourbon/economy',
        teaser: 'MSRP, markup, and shelf economics.',
        group: 'Tools',
        confidence: 'editorial',
      }),
    ],
  },
  {
    slug: 'sour-mash',
    title: 'Sour mash',
    why: 'Backset from prior fermentation stabilizes pH — most Kentucky majors use sour mash for consistency. Sweet mash craft contrasts show how process shapes funk.',
    identities: ['production', 'fermentation', 'house_character', 'craft_contrast'],
    terms: [
      { slug: 'sweet-mash', title: 'Sweet mash', teaser: 'No backset — bolder ferment character.' },
      { slug: 'fermentation', title: 'Fermentation', teaser: 'Beer stage before still.' },
      { slug: 'yeast-strain', title: 'Yeast strain', teaser: 'House cultures and esters.' },
      { slug: 'distillate', title: 'Distillate', teaser: 'Spirit off the still.' },
    ],
    bottles: [
      { slug: 'jim-beam', title: 'Jim Beam', teaser: 'Classic sour mash at scale.' },
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'Campus ferment story.' },
    ],
    producers: [
      { slug: 'jim-beam', title: 'Jim Beam', teaser: 'Sour mash textbook at volume.' },
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'Open fermenter tours.' },
    ],
  },
  {
    slug: 'angels-share',
    title: "Angel's share",
    why: 'Whiskey lost to evaporation — roughly 2–4% per year in barrel. Angel\'s share explains why age costs money and why rickhouse humidity matters.',
    identities: ['barrel', 'aging', 'economics', 'science'],
    terms: [
      { slug: 'rickhouse', title: 'Rickhouse', teaser: 'Where evaporation happens.' },
      { slug: 'heat-cycling', title: 'Heat cycling', teaser: 'Seasonal barrel breathing.' },
      { slug: 'age-statement', title: 'Age statement', teaser: 'Time cost in the bottle.' },
      { slug: 'entry-proof', title: 'Entry proof', teaser: 'Starting strength affects loss profile.' },
    ],
    bottles: [
      { slug: 'eagle-rare', title: 'Eagle Rare 10', teaser: 'A decade of angel tax.' },
      { slug: 'russells-reserve-10', title: "Russell's Reserve 10", teaser: 'Ten-year warehouse loss.' },
    ],
    producers: [
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'Aged stock stewardship.' },
      { slug: 'wild-turkey', title: 'Wild Turkey', teaser: 'Lawrenceburg warehouse rows.' },
    ],
  },
  {
    slug: 'non-chill-filtered',
    title: 'Non-chill filtered',
    why: 'Skipped cold filtration — richer mouthfeel, possible haze when iced. NCF is enthusiast shorthand for “more barrel in the bottle.”',
    identities: ['chemistry', 'mouthfeel', 'enthusiast', 'transparency'],
    terms: [
      { slug: 'chill-filtration', title: 'Chill filtration', teaser: 'Cold filter for clarity.' },
      { slug: 'mouthfeel', title: 'Mouthfeel', teaser: 'Texture and weight on palate.' },
      { slug: 'barrel-proof', title: 'Barrel proof', teaser: 'Often paired with NCF.' },
      { slug: 'cask-strength', title: 'Cask strength', teaser: 'Full proof bottlings.' },
    ],
    bottles: [
      { slug: 'four-roses-single-barrel', title: 'Four Roses Single Barrel', teaser: 'NCF flagship example.' },
      { slug: 'bookers', title: "Booker's", teaser: 'Barrel proof NCF heat.' },
    ],
    producers: [
      { slug: 'four-roses', title: 'Four Roses', teaser: 'NCF single barrel program.' },
      { slug: 'jim-beam', title: 'Jim Beam', teaser: "Booker's line." },
    ],
  },
  {
    slug: 'small-batch',
    title: 'Small batch',
    why: 'Modest number of barrels blended for consistency — between single-barrel lottery and mass NAS blending. Small batch is house style at manageable scale.',
    identities: ['barrel', 'blending', 'consistency', 'step_up'],
    terms: [
      { slug: 'single-barrel', title: 'Single barrel', teaser: 'One barrel vs small blend.' },
      { slug: 'blending', title: 'Blending', teaser: 'Barrel selection art.' },
      { slug: 'non-age-stated', title: 'NAS', teaser: 'Age transparency varies.' },
    ],
    bottles: [
      { slug: 'knob-creek-9', title: 'Knob Creek 9', teaser: 'Small batch at 100 proof.' },
      { slug: '1792-small-batch', title: '1792 Small Batch', teaser: 'Barton small batch identity.' },
      { slug: 'woodford-reserve', title: 'Woodford Reserve', teaser: 'Pot still small batch character.' },
    ],
    producers: [
      { slug: 'jim-beam', title: 'Jim Beam', teaser: 'Knob Creek small batch.' },
      { slug: 'barton-1792', title: '1792 Barton', teaser: 'Small batch naming.' },
    ],
  },
  {
    slug: 'rye',
    title: 'Rye',
    why: 'Spice grain in bourbon mash — higher rye means pepper and mint on the palate. Rye literacy separates wheated softness from Turkey backbone.',
    identities: ['grain', 'spice', 'mash_bill', 'flavor'],
    terms: [
      { slug: 'high-rye-bourbon', title: 'High-rye bourbon', teaser: 'Elevated rye recipes.' },
      { slug: 'mash-bill', title: 'Mash bill', teaser: 'Grain recipe context.' },
      { slug: 'rye-whiskey', title: 'Rye whiskey', teaser: '51%+ rye category.' },
    ],
    bottles: [
      { slug: 'wild-turkey-101', title: 'Wild Turkey 101', teaser: 'Rye-forward daily pour.' },
      { slug: 'bulleit-bourbon', title: 'Bulleit Bourbon', teaser: 'High-rye mash marketing.' },
      { slug: 'four-roses-yellow', title: 'Four Roses Yellow', teaser: 'High-rye blend baseline.' },
    ],
    producers: [
      { slug: 'wild-turkey', title: 'Wild Turkey', teaser: 'Rye spice house.' },
      { slug: 'four-roses', title: 'Four Roses', teaser: 'Recipe matrix education.' },
    ],
  },
  {
    slug: 'fermentation',
    title: 'Fermentation',
    why: 'Yeast converting grain sugars to alcohol — the beer stage before distillation. Ferment time and vessel shape create esters that survive into the glass.',
    identities: ['production', 'yeast', 'flavor', 'house_character'],
    terms: [
      { slug: 'yeast-strain', title: 'Yeast strain', teaser: 'House cultures guarded for decades.' },
      { slug: 'sour-mash', title: 'Sour mash', teaser: 'Backset pH control.' },
      { slug: 'esters', title: 'Esters', teaser: 'Fruity ferment compounds.' },
      { slug: 'distillate', title: 'Distillate', teaser: 'Spirit off the still.' },
    ],
    bottles: [
      { slug: 'four-roses-yellow', title: 'Four Roses Yellow', teaser: 'Yeast education via recipe codes.' },
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'Open fermenter campus tours.' },
    ],
    producers: [
      { slug: 'four-roses', title: 'Four Roses', teaser: 'Yeast library religion.' },
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'Ferment room visibility.' },
    ],
  },
  {
    slug: 'bourbon-trail',
    title: 'Bourbon trail',
    why: 'Kentucky distillery tourism — campuses, rickhouses, and tasting rooms where atlas vocabulary becomes smell and proof. The trail is geography plus pilgrimage.',
    identities: ['culture', 'geography', 'tourism', 'pilgrimage'],
    terms: [
      { slug: 'kentucky-straight-bourbon', title: 'Kentucky straight', teaser: 'Production region identity.' },
      { slug: 'rickhouse', title: 'Rickhouse', teaser: 'Warehouse tours on trail.' },
      { slug: 'dsp', title: 'DSP', teaser: 'Trace juice at each stop.' },
    ],
    bottles: [
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'Frankfort campus anchor stop.' },
      { slug: 'makers-mark', title: "Maker's Mark", teaser: 'Loretto wheated pilgrimage.' },
      { slug: 'woodford-reserve', title: 'Woodford Reserve', teaser: 'Versailles pot still campus.' },
    ],
    producers: [
      { slug: 'buffalo-trace', title: 'Buffalo Trace', teaser: 'Free tour — book early.' },
      { slug: 'makers-mark', title: "Maker's Mark", teaser: 'Dip-your-own-wax lore.' },
      { slug: 'woodford-reserve', title: 'Woodford Reserve', teaser: 'Historic distiller campus.' },
    ],
    extras: [
      conn({
        relation: 'located_in',
        entity_type: 'place',
        slug: 'kentucky',
        title: 'Kentucky map',
        href: '/bourbon/map',
        teaser: 'Plot campuses before you drive.',
        group: 'Places',
        confidence: 'commonly_reported',
      }),
      conn({
        relation: 'related_to',
        entity_type: 'experience',
        slug: 'trail-planner',
        title: 'Trail planner',
        href: '/bourbon/trail-planner',
        teaser: 'Weekend routing tool.',
        group: 'Tools',
        confidence: 'editorial',
      }),
    ],
  },
];

export const PRIORITY_ATLAS_TERM_GRAPHS: Record<string, EntityGraphView> = Object.fromEntries(
  PRIORITY_BLUEPRINTS.map((b) => {
    const g = buildTermGraph(b);
    return [b.slug, g];
  }),
);
