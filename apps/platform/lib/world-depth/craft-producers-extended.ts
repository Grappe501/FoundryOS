/** Extended craft distillery atlas — PASS-043 craft inventory expansion */
import type { BourbonProducer } from './bourbon-producers';

export const CRAFT_BOURBON_PRODUCERS_EXTENDED: BourbonProducer[] = [
  {
    slug: 'angels-envy',
    name: "Angel's Envy Distillery",
    tagline: 'Port-finish craft — dessert bourbon gateway.',
    hookQuestion: 'Can a finish teach craft before you chase single barrels?',
    founded: '2010',
    headquarters: 'Louisville, Kentucky',
    parentCompany: 'Angel\'s Envy (Brown-Forman partnership)',
    dspNote: 'Louisville — finished in port casks',
    styleTags: ['craft', 'finished', 'balanced'],
    mashBillSignature:
      'Traditional bourbon base aged in ruby port casks — finish-forward profile without hiding the underlying mash.',
    differentiator:
      'Finish literacy entry point. Angel\'s Envy teaches **cask finish vs straight bourbon** before Rabbit Hole Dareringer or Bardstown Fusion homework.',
    history: [
      {
        heading: 'Finish as craft identity',
        body:
          'Founded by Lincoln Henderson legacy — port barrel finishing became a category conversation starter on craft shelves nationwide.',
      },
    ],
    timeline: [
      { year: '2010', event: 'Angel\'s Envy brand launches.' },
      { year: '2019', event: 'Louisville distillery opens for tours.' },
      { year: 'Today', event: 'Rye and cask strength extensions rotate.' },
    ],
    sweetSpot: [
      {
        name: "Angel's Envy Bourbon",
        priceUsd: '$45–55',
        proof: '86.6',
        role: 'daily',
        whatToExpect: 'Port wine sweetness, raisin, vanilla — dessert bourbon.',
      },
      {
        name: "Angel's Envy Rye",
        priceUsd: '$55–70',
        proof: '100',
        role: 'step-up',
        whatToExpect: 'Rum cask finished rye — cross-category craft.',
      },
    ],
    crownJewel: {
      name: "Angel's Envy Cask Strength",
      priceUsd: '$80+',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Limited port-finish batches — finish at full intensity.',
    },
    priceLadder: { tier: 'Port finish → Cask strength', range: '$50 → $85', note: 'Learn finish before fusion series splurge.' },
    firstPourExpectation: 'Raisin, port sweetness, vanilla — compare to straight BT same night.',
    hiddenQuestions: [
      { question: 'Is it still bourbon?', answer: 'Finished bourbon — base qualifies; port cask adds flavor post-barrel.' },
    ],
    compareWith: ['rabbit-hole', 'bardstown', 'buffalo-trace'],
  },
  {
    slug: 'log-still',
    name: 'Log Still Distillery',
    tagline: 'Nelson County revival — Diving Bell wheated craft.',
    hookQuestion: 'What does a family revival taste like after sourced-era Kentucky?',
    founded: '2020 (distillery opening)',
    headquarters: 'Gethsemane, Kentucky',
    parentCompany: 'Independent (Dant family)',
    dspNote: 'Nelson County campus — on-site rickhouses',
    styleTags: ['craft', 'wheated', 'heritage'],
    mashBillSignature:
      'Wheated bourbon mash — Diving Bell as flagship, Neeley Family Reserve as step-up.',
    differentiator:
      'Heritage name on modern stills. Log Still teaches **family revival craft** outside Bardstown tourist orbit — wheated compare to Willett and Wilderness Trail.',
    history: [
      {
        heading: 'Dant family return',
        body:
          'Revival on a Nelson County site tied to Kentucky distilling lineage — campus designed for tours and transparent grain-to-glass story.',
      },
    ],
    timeline: [
      { year: '2020', event: 'Log Still distillery opens.' },
      { year: '2023', event: 'Diving Bell national craft shelf presence.' },
      { year: 'Today', event: 'Single barrel and reserve lines expand.' },
    ],
    sweetSpot: [
      {
        name: 'Log Still Diving Bell Bourbon',
        priceUsd: '$45–55',
        proof: '107',
        role: 'daily',
        whatToExpect: 'Wheated craft — honey, soft spice, structured finish.',
      },
    ],
    crownJewel: {
      name: 'Log Still Neeley Family Reserve',
      priceUsd: '$70+',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Older reserve stocks — splurge craft wheated.',
    },
    priceLadder: { tier: 'Diving Bell → Reserve', range: '$50 → $75', note: 'Wheated craft triangle with WT BiB and Willett.' },
    firstPourExpectation: 'Honey, vanilla, gentle wheat — higher proof than Maker\'s, softer than WT101.',
    hiddenQuestions: [
      { question: 'Another wheated craft — why care?', answer: 'Blind against Wilderness Trail BiB — same lesson, different ferment story.' },
    ],
    compareWith: ['wilderness-trail', 'willett', 'makers-mark'],
  },
  {
    slug: 'jeptha-creed',
    name: 'Jeptha Creed Distillery',
    tagline: 'Heirloom Bloody Butcher corn — farm craft.',
    hookQuestion: 'Does heritage grain change bourbon or just the tour script?',
    founded: '2016',
    headquarters: 'Shelbyville, Kentucky',
    parentCompany: 'Independent (Nethery family)',
    dspNote: 'Farm distillery — estate corn varieties',
    styleTags: ['craft', 'heritage', 'balanced'],
    mashBillSignature:
      'Bloody Butcher heirloom corn in mash — nutty, earthy baseline vs commercial corn majors.',
    differentiator:
      'Grain as protagonist. Jeptha Creed teaches **corn variety literacy** — same legal bourbon, different agricultural story.',
    history: [
      {
        heading: 'Farm-to-still',
        body:
          'Family farm grows Bloody Butcher corn used in flagship bourbon — tours connect field to fermenter visibly.',
      },
    ],
    timeline: [
      { year: '2016', event: 'Jeptha Creed opens Shelbyville.' },
      { year: '2020', event: 'Bloody Butcher bourbon hits regional shelves.' },
      { year: 'Today', event: 'Vodka and brandy expand farm portfolio.' },
    ],
    sweetSpot: [
      {
        name: 'Jeptha Creed Bloody Butcher Bourbon',
        priceUsd: '$40–50',
        proof: '90',
        role: 'daily',
        whatToExpect: 'Earthy corn, nutty mid-palate, floral nose — farm craft.',
      },
    ],
    crownJewel: {
      name: 'Jeptha Creed Straight Bourbon Store Picks',
      priceUsd: '$55+',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Single barrel heirloom corn — barrel lottery.',
    },
    priceLadder: { tier: 'Bloody Butcher → Store picks', range: '$45 → $60', note: 'Compare to Buffalo Trace for corn sweetness baseline.' },
    firstPourExpectation: 'Nutty, earthy corn, light fruit — less vanilla bomb than major NAS.',
    hiddenQuestions: [
      { question: 'Heirloom corn — taste or story?', answer: 'Side-by-side blind with BT — let palate decide if grain matters to you.' },
    ],
    compareWith: ['buffalo-trace', 'castle-key', 'wilderness-trail'],
  },
  {
    slug: 'green-river',
    name: 'Green River Distilling Co.',
    tagline: 'Owensboro revival — Kentucky heritage name returns.',
    hookQuestion: 'Can a 19th-century brand teach modern craft without NDP confusion?',
    founded: '2018 (revival)',
    headquarters: 'Owensboro, Kentucky',
    parentCompany: 'Independent (Green River Spirits)',
    dspNote: 'Owensboro campus — O.Z. Tyler adjacent heritage',
    styleTags: ['craft', 'heritage', 'value'],
    mashBillSignature:
      'Traditional Kentucky mash — Full Proof and Kentucky Straight lines anchor value craft shelf.',
    differentiator:
      'Heritage label, modern juice. Green River teaches **brand revival transparency** — taste today\'s DSP, not pre-Prohibition myth.',
    history: [
      {
        heading: 'Name on new stills',
        body:
          'Historic Green River brand revived with Owensboro production — value-priced craft alternative to majors on same shelf.',
      },
    ],
    timeline: [
      { year: '1885', event: 'Original Green River brand era.' },
      { year: '2018', event: 'Modern revival distilling begins.' },
      { year: 'Today', event: 'Full Proof and single barrels expand distribution.' },
    ],
    sweetSpot: [
      {
        name: 'Green River Kentucky Straight Bourbon',
        priceUsd: '$30–38',
        proof: '90',
        role: 'entry',
        whatToExpect: 'Caramel, vanilla, gentle oak — value craft daily.',
      },
      {
        name: 'Green River Full Proof',
        priceUsd: '$40–48',
        proof: '114',
        role: 'step-up',
        whatToExpect: 'Barrel-proof value — compare to 1920 at lower price.',
      },
    ],
    crownJewel: {
      name: 'Green River Single Barrel',
      priceUsd: '$50+',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Store picks — Owensboro warehouse character.',
    },
    priceLadder: { tier: '90 proof → Full Proof → Single barrel', range: '$35 → $55', note: 'Value craft before Peerless splurge.' },
    firstPourExpectation: 'Classic caramel-vanilla — cleaner than NAS majors, less polish than Woodford.',
    hiddenQuestions: [
      { question: 'Same as O.Z. Tyler?', answer: 'Related Owensboro production history — read current label DSP.' },
    ],
    compareWith: ['evan-williams-black', 'old-forester-86', 'heaven-hill'],
  },
  {
    slug: 'blue-run',
    name: 'Blue Run Spirits',
    tagline: 'Georgetown high-proof craft — small batch transparency.',
    hookQuestion: 'When does craft pricing buy juice vs bottle design?',
    founded: '2020',
    headquarters: 'Georgetown, Kentucky',
    parentCompany: 'Independent',
    dspNote: 'Kentucky craft — non-chill filtered releases',
    styleTags: ['craft', 'balanced', 'high-rye'],
    mashBillSignature:
      'High-rye leaning craft mash — aged stocks bottled at proof with NCF emphasis.',
    differentiator:
      'Splurge craft with proof transparency. Blue Run sits between Peerless and major single barrels — teaches **when craft worth $80+** vs hype.',
    history: [
      {
        heading: 'Georgetown craft premium',
        body:
          'Launched as transparent high-age craft in a market flooded with NAS — NCF and proof on label as selling points.',
      },
    ],
    timeline: [
      { year: '2020', event: 'Blue Run brand launches.' },
      { year: '2022', event: '12-year expressions gain collector attention.' },
      { year: 'Today', event: 'High Rye and Golden Rye expand line.' },
    ],
    sweetSpot: [
      {
        name: 'Blue Run High Rye Bourbon',
        priceUsd: '$75–90',
        proof: '109',
        role: 'splurge',
        whatToExpect: 'Rye spice, dark fruit, long finish — craft splurge pour.',
      },
      {
        name: 'Blue Run 8 Year Bourbon',
        priceUsd: '$80–100',
        proof: '109',
        role: 'splurge',
        whatToExpect: 'Age-stated craft — compare to Eagle Rare 10.',
      },
    ],
    crownJewel: {
      name: 'Blue Run 12 Year Bourbon',
      priceUsd: '$120+',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Older craft stocks — age vs over-oak lesson.',
    },
    priceLadder: { tier: 'High Rye → 8 Year → 12 Year', range: '$85 → $130', note: 'After value craft mastered — splurge homework.' },
    firstPourExpectation: 'Dark fruit, rye spice, structured oak — add water on 109 proof.',
    hiddenQuestions: [
      { question: 'Worth vs Eagle Rare 10?', answer: 'Blind both — craft premium must beat $45 age statement to justify shelf.' },
    ],
    compareWith: ['eagle-rare', 'peerless', 'four-roses-single-barrel'],
  },
];
