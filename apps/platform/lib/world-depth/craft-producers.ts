/** Craft distillery atlas entries — merged into BOURBON_PRODUCERS */
import type { BourbonProducer } from './bourbon-producers';

export const CRAFT_BOURBON_PRODUCERS: BourbonProducer[] = [
  {
    slug: 'wilderness-trail',
    name: 'Wilderness Trail Distillery',
    tagline: 'Science lab that happens to sell whiskey.',
    hookQuestion: 'Why do craft nerds treat a Danville BiB like a textbook?',
    founded: '2012',
    headquarters: 'Danville, Kentucky',
    parentCompany: 'Independent (Wilson & Meyer)',
    dspNote: 'DSP-KY-11205 — sweet mash, on-site grain handling',
    styleTags: ['craft', 'wheated', 'balanced'],
    mashBillSignature:
      'Wheated and traditional mash bills — fermentation and barrel entry proof treated as variables, not secrets. BiB releases anchor the brand.',
    differentiator:
      'Craft transparency without costume. Wilderness Trail publishes process detail and lets BiB law do marketing work — wheated craft you can blind against Maker\'s with age on the label.',
    history: [
      {
        heading: 'Engineering-first craft',
        body:
          'Founded by biochemists who wanted data-driven distilling in an era of sourced juice stories. Danville campus became a field trip for enthusiasts comparing sweet mash ferment character to sour mash majors.',
      },
      {
        heading: 'BiB as craft strategy',
        body:
          'Bottled-in-Bond releases prove age and proof without influencer hype — a craft house using 1897 law as quality signal.',
      },
    ],
    timeline: [
      { year: '2012', event: 'Wilderness Trail opens in Danville.' },
      { year: '2018', event: 'BiB bourbon gains national craft shelf presence.' },
      { year: 'Today', event: 'Single barrel and rye programs expand campus tours.' },
    ],
    sweetSpot: [
      {
        name: 'Wilderness Trail BiB Bourbon',
        priceUsd: '$45–55',
        proof: '100',
        role: 'daily',
        whatToExpect: 'Wheated BiB — honey, soft spice, structured finish.',
      },
      {
        name: 'Wilderness Trail Rye',
        priceUsd: '$50–60',
        proof: '100',
        role: 'step-up',
        whatToExpect: 'Rye-forward craft — compare to high-rye majors.',
      },
    ],
    crownJewel: {
      name: 'Wilderness Trail Single Barrel picks',
      priceUsd: '$60–75',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Store picks — fermentation lot variance visible.',
    },
    priceLadder: { tier: 'BiB daily → Single barrels', range: '$48 → $70', note: 'Craft wheated BiB is the teaching bottle.' },
    firstPourExpectation: 'BiB: soft wheat, vanilla, gentle rye snap — cleaner than NAS giants, more body than Maker\'s.',
    hiddenQuestions: [
      { question: 'Sweet mash vs sour mash — taste it?', answer: 'Wilderness Trail sweet mash can show brighter ferment fruit — compare to Heaven Hill same night.' },
      { question: 'Is craft BiB better than Evan Williams BiB?', answer: 'Different homework — price vs lesson. Blind both before opining.' },
    ],
    compareWith: ['makers-mark', 'new-riff', 'heaven-hill'],
  },
  {
    slug: 'willett',
    name: 'Willett Distillery',
    tagline: 'Purple tops are lottery — Pot Still is the lesson.',
    hookQuestion: 'How does one family stay Bardstown royalty through sourcing eras and distilling returns?',
    founded: '1936 (family); modern distilling return 2012',
    headquarters: 'Bardstown, Kentucky',
    parentCompany: 'Independent (Willett family)',
    styleTags: ['craft', 'wheated', 'heritage'],
    mashBillSignature:
      'Wheated bourbon profile on pot still — Pot Still Reserve is the accessible Willett identity before purple-top allocated hype.',
    differentiator:
      'Heritage craft with honest scarcity tiers. Willett teaches **family distillery revival** — sourced era history, modern pot still character, and allocation culture on higher shelves.',
    history: [
      {
        heading: 'From sourced to stills',
        body:
          'Willett spent years as a respected NDP/selector before returning to distilling on campus. Pot Still bottle shape became instant shelf recognition — craft branding before craft was default.',
      },
    ],
    timeline: [
      { year: '1936', event: 'Willett family enters whiskey business.' },
      { year: '2012', event: 'Distilling returns to Bardstown campus.' },
      { year: 'Today', event: 'Pot Still Reserve + Family Estate allocated lines.' },
    ],
    sweetSpot: [
      {
        name: 'Willett Pot Still Reserve',
        priceUsd: '$50–60',
        proof: '94',
        role: 'step-up',
        whatToExpect: 'Wheated fruit — banana, caramel, soft spice.',
      },
    ],
    crownJewel: {
      name: 'Willett Family Estate Bottled Bourbon',
      priceUsd: '$150+',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Allocation purple — not Week 1. Pot Still first.',
    },
    priceLadder: { tier: 'Pot Still → Estate', range: '$55 → $150+', note: 'Learn wheated craft before chasing purple.' },
    firstPourExpectation: 'Pot Still: soft wheat, fruity nose, medium finish — hosting-friendly craft.',
    hiddenQuestions: [
      { question: 'Is every Willett bottle distilled on site?', answer: 'Read label era and DSP — Willett history includes sourced stocks. Pot Still Reserve is the modern campus baseline.' },
    ],
    compareWith: ['makers-mark', 'heaven-hill', 'wilderness-trail'],
  },
  {
    slug: 'peerless',
    name: 'Peerless Distilling Co.',
    tagline: 'Louisville vertical integration — sweet mash, zero shortcuts.',
    hookQuestion: 'What happens when a craft house refuses to release young whiskey?',
    founded: '2015 (revival)',
    headquarters: 'Louisville, Kentucky',
    parentCompany: 'Independent (Corken family)',
    dspNote: 'DSP-KY-20004 — grain to glass downtown',
    styleTags: ['craft', 'heritage', 'balanced'],
    mashBillSignature:
      'Sweet mash bourbon — darker fruit, molasses, high proof bottlings with BiB discipline when labeled.',
    differentiator:
      'Patience as brand. Peerless waited for age rather than rush NAS craft — teaches **release timing** vs hype cycles in urban Louisville.',
    history: [
      {
        heading: 'Revival with a wait',
        body:
          'Family name from 1880s Louisville revived with modern downtown campus — rickhouses visible from city streets, tours that explain sweet mash end to end.',
      },
    ],
    timeline: [
      { year: '1880s', event: 'Original Peerless era — pre-Prohibition Louisville.' },
      { year: '2015', event: 'Modern Peerless opens downtown.' },
      { year: '2019+', event: 'Age-stated bourbon hits national craft shelves.' },
    ],
    sweetSpot: [
      {
        name: 'Peerless Bourbon',
        priceUsd: '$60–70',
        proof: '107',
        role: 'splurge',
        whatToExpect: 'Dark fruit, molasses, rich mouthfeel — craft dessert profile.',
      },
    ],
    crownJewel: {
      name: 'Peerless Single Barrel',
      priceUsd: '$80+',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Barrel lottery — molasses and oak intensity.',
    },
    priceLadder: { tier: 'Core bourbon → Single barrel', range: '$65 → $90+', note: 'Splurge craft after value triangle mastered.' },
    firstPourExpectation: 'Rich sweetness, oak spice, long finish — compare to Buffalo Trace for body vs elegance.',
    hiddenQuestions: [
      { question: 'Why higher proof default?', answer: 'House style choice — add water and note structure change.' },
    ],
    compareWith: ['buffalo-trace', 'michters', 'rabbit-hole'],
  },
  {
    slug: 'rabbit-hole',
    name: 'Rabbit Hole Distillery',
    tagline: 'Louisville design studio that distills.',
    hookQuestion: 'Can a four-grain mash bill teach more than a single-number hype bottle?',
    founded: '2012',
    headquarters: 'Louisville, Kentucky',
    parentCompany: 'Pernod Ricard (majority stake)',
    styleTags: ['craft', 'high-rye', 'finished'],
    mashBillSignature:
      'Cavehill four-grain recipe — malted barley plus corn, rye, and wheat for layered ferment character.',
    differentiator:
      'Mash bill as story without hiding DSP. Rabbit Hole pushes **recipe literacy** in a beautiful urban campus — gateway craft before Dareringer cask finishes.',
    history: [
      {
        heading: 'Urban craft showroom',
        body:
          'Whiskey Row-adjacent campus made bourbon tourism downtown-friendly — Cavehill as flagship teaches grain layering before finished expressions.',
      },
    ],
    timeline: [
      { year: '2012', event: 'Rabbit Hole founded in Louisville.' },
      { year: '2019', event: 'Pernod Ricard investment scales distribution.' },
      { year: 'Today', event: 'Cavehill + cask-finished line expansion.' },
    ],
    sweetSpot: [
      {
        name: 'Rabbit Hole Cavehill Bourbon',
        priceUsd: '$40–50',
        proof: '95',
        role: 'daily',
        whatToExpect: 'Honey, rye spice, malty mid-palate — four-grain complexity.',
      },
      {
        name: 'Dareringer PX Sherry Cask',
        priceUsd: '$55–65',
        proof: 'Varies',
        role: 'step-up',
        whatToExpect: 'Finished craft — dessert wine cask lesson.',
      },
    ],
    crownJewel: {
      name: 'Boxergrail Rye',
      priceUsd: '$50–60',
      proof: '95',
      role: 'crown',
      whatToExpect: 'Rye program — cross-category craft homework.',
    },
    priceLadder: { tier: 'Cavehill → Finished', range: '$45 → $65', note: 'Straight bourbon before sherry finishes.' },
    firstPourExpectation: 'Cavehill: floral nose, honey palate, pepper finish — host bottle craft tier.',
    hiddenQuestions: [
      { question: 'Corporate ownership — juice change?', answer: 'Evaluate current bottles blind; DSP and label tell today\'s story.' },
    ],
    compareWith: ['four-roses', 'new-riff', 'castle-key'],
  },
  {
    slug: 'bardstown',
    name: 'Bardstown Bourbon Company',
    tagline: 'Collaboration distillery — fusion finishes as graduate school.',
    hookQuestion: 'Why does a contract-distilling campus also make great straight bourbon?',
    founded: '2014',
    headquarters: 'Bardstown, Kentucky',
    parentCompany: 'Independent',
    dspNote: 'DSP-KY-20002 — custom mash bills at scale',
    styleTags: ['craft', 'finished', 'balanced'],
    mashBillSignature:
      'Multiple mash bills for partners — house bourbon line is polished traditional before Fusion Series wine and rum cask experiments.',
    differentiator:
      'Craft at collaboration scale. BBC teaches **straight bourbon first, finish second** — campus tours show partner brands and house label side by side.',
    history: [
      {
        heading: 'The collaboration model',
        body:
          'Built to custom-distill for brands while releasing house labels — transparency about scale craft vs garage marketing.',
      },
    ],
    timeline: [
      { year: '2014', event: 'BBC opens on Bardstown-Chapel Road.' },
      { year: '2018', event: 'Fusion Series launches — finish education.' },
      { year: 'Today', event: 'Discovery and collaborative releases rotate.' },
    ],
    sweetSpot: [
      {
        name: 'Bardstown Bourbon Company Bourbon',
        priceUsd: '$38–45',
        proof: '93',
        role: 'daily',
        whatToExpect: 'Clean caramel, gentle oak — craft daily driver.',
      },
      {
        name: 'Fusion Series',
        priceUsd: '$60–120',
        proof: 'Varies',
        role: 'splurge',
        whatToExpect: 'Cask finish graduate pours — after straight baseline.',
      },
    ],
    crownJewel: {
      name: 'Collaborative Series picks',
      priceUsd: '$100+',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Limited collabs — collector craft tier.',
    },
    priceLadder: { tier: 'Straight → Fusion', range: '$42 → $100+', note: 'House bourbon before wine cask homework.' },
    firstPourExpectation: 'Straight bourbon: caramel, vanilla, soft spice — compare to Buffalo Trace for craft polish.',
    hiddenQuestions: [
      { question: 'Do they only make other people\'s whiskey?', answer: 'Contract distilling funds house labels — taste BBC bourbon on its own merits.' },
    ],
    compareWith: ['buffalo-trace', 'heaven-hill', 'castle-key'],
  },
  {
    slug: 'castle-key',
    name: 'Castle & Key Distillery',
    tagline: 'Old Taylor ruins rebuilt — botanicals and bourbon.',
    hookQuestion: 'Can a Frankfort revival teach craft without burning your palate on proof?',
    founded: '2014 (restoration)',
    headquarters: 'Frankfort, Kentucky',
    parentCompany: 'Independent',
    dspNote: 'DSP-KY-20003 — historic Old Taylor site',
    styleTags: ['craft', 'heritage', 'balanced'],
    mashBillSignature:
      'Traditional bourbon mash — Restoration Release aims for floral, approachable craft entry before higher-proof batches.',
    differentiator:
      'Place as protagonist. Castle & Key restored a National Historic Landmark — tours, gardens, and gin program fund bourbon patience.',
    history: [
      {
        heading: 'Ruins to rickhouses',
        body:
          'Partners bought the neglected Old Taylor castle campus and rebuilt distilling on a pilgrimage site — craft with archaeology.',
      },
    ],
    timeline: [
      { year: '1887', event: 'Colonel Taylor builds showplace distillery.' },
      { year: '2014', event: 'Castle & Key restoration begins.' },
      { year: '2020s', event: 'Restoration Release bourbon hits shelves.' },
    ],
    sweetSpot: [
      {
        name: 'Castle & Key Restoration Release',
        priceUsd: '$40–48',
        proof: '90',
        role: 'daily',
        whatToExpect: 'Floral, honey, light oak — gentle craft intro.',
      },
    ],
    crownJewel: {
      name: 'Castle & Key Single Barrel program',
      priceUsd: '$60+',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Campus picks — variation by warehouse.',
    },
    priceLadder: { tier: 'Restoration → Single barrel', range: '$44 → $65', note: 'Tour the campus — place teaches more than label.' },
    firstPourExpectation: 'Soft floral nose, honey palate, short-medium finish — beginner-friendly craft.',
    hiddenQuestions: [
      { question: 'Is this the same as Old Taylor bourbon?', answer: 'New distillery on historic site — name history ≠ juice continuity. Taste today\'s DSP.' },
    ],
    compareWith: ['buffalo-trace', 'woodford-reserve', 'bardstown'],
  },
];
