/** Tennessee whiskey producers — cross-category catalog */
import type { BourbonProducer } from './bourbon-producers';

export const TENNESSEE_PRODUCERS: BourbonProducer[] = [
  {
    slug: 'jack-daniel',
    name: "Jack Daniel's Distillery",
    tagline: 'Lynchburg — charcoal mellowing before the barrel.',
    hookQuestion: 'Why is the world\'s best-selling whiskey not labeled bourbon?',
    founded: '1866 (registered 1866; modern era post-Prohibition)',
    headquarters: 'Lynchburg, Tennessee',
    parentCompany: 'Brown-Forman',
    dspNote: 'DSP-TN-1 — Lincoln County Process on site',
    styleTags: ['heritage', 'craft', 'balanced'],
    mashBillSignature:
      'Corn-forward mash — charcoal mellowed through sugar maple charcoal before barreling into new oak. Tennessee whiskey identity, not bourbon label.',
    differentiator:
      'Charcoal filtering defines the category. Jack teaches **process before proof** — softer entry, banana-forward new make, global brand scale from one small town.',
    history: [
      {
        heading: 'Lincoln County Process',
        body:
          'New make drips through vats of sugar maple charcoal before entering barrel — Tennessee signature step. Legally bourbon-class mash; label says Tennessee whiskey instead.',
      },
      {
        heading: 'Lynchburg pilgrimage',
        body:
          'Dry county tours — millions visit without buying on site. The brand is pop culture, barbecue companion, and category gateway in one black label.',
      },
    ],
    timeline: [
      { year: '1866', event: 'Jasper Newton Daniel registers distillery.' },
      { year: '1904', event: 'Gold medal at St. Louis World\'s Fair — global fame begins.' },
      { year: 'Today', event: 'Best-selling American whiskey worldwide — Old No. 7 baseline.' },
    ],
    sweetSpot: [
      {
        name: "Jack Daniel's Old No. 7",
        priceUsd: '$25–30',
        proof: '80',
        role: 'entry',
        whatToExpect: 'Banana, caramel, charcoal softness — cocktail and sip baseline.',
      },
      {
        name: "Jack Daniel's Single Barrel",
        priceUsd: '$45–55',
        proof: '94',
        role: 'step-up',
        whatToExpect: 'More depth — single barrel variance on Tennessee profile.',
      },
    ],
    crownJewel: {
      name: "Jack Daniel's Barrel Proof",
      priceUsd: '$65+',
      proof: '125+',
      role: 'crown',
      whatToExpect: 'Full Tennessee heat — charcoal discipline at barrel strength.',
    },
    priceLadder: { tier: 'Old No. 7 → Single Barrel → Barrel Proof', range: '$28 → $50 → $70+', note: 'Start Old No. 7 before chasing single barrel.' },
    firstPourExpectation: 'Banana bread, caramel, gentle charcoal — softer than WT101, less corn-sweet than BT.',
    hiddenQuestions: [
      { question: 'Is Jack bourbon?', answer: 'Mash qualifies — charcoal mellowing and Tennessee identity move it to Tennessee whiskey category on the label.' },
      { question: 'Does charcoal remove flavor?', answer: 'Filters some harshness — compare to straight bourbon same proof to feel the difference.' },
    ],
    compareWith: ['george-dickel', 'buffalo-trace', 'makers-mark'],
  },
  {
    slug: 'george-dickel',
    name: 'George Dickel Distillery',
    tagline: 'Cascade Hollow — chill charcoal, Tennessee quiet.',
    hookQuestion: 'Why did Dickel spell whisky without the e before it was trendy?',
    founded: '1870 (revived 1958; modern Cascade Hollow)',
    headquarters: 'Tullahoma, Tennessee',
    parentCompany: 'Diageo',
    dspNote: 'Cascade Hollow — charcoal mellowed Tennessee whiskey',
    styleTags: ['heritage', 'balanced', 'value'],
    mashBillSignature:
      'Corn-forward mash, charcoal mellowed — traditionally chill-filtered through charcoal at lower temperature than Jack Daniel\'s hot process lore.',
    differentiator:
      'The other Tennessee giant — less neon, often value-priced. Dickel teaches that **Tennessee is a category, not one flavor** — compare No. 8 to Jack side by side.',
    history: [
      {
        heading: 'Cascade Hollow revival',
        body:
          'George Dickel brand slept through mid-century consolidation; Diageo rebuilt Cascade Hollow as a tour destination and value Tennessee anchor.',
      },
    ],
    timeline: [
      { year: '1870', event: 'George Dickel brand origins.' },
      { year: '1958', event: 'Modern production revival.' },
      { year: 'Today', event: 'No. 8 and Barrel Select on national shelves.' },
    ],
    sweetSpot: [
      {
        name: 'George Dickel No. 8',
        priceUsd: '$22–28',
        proof: '80',
        role: 'entry',
        whatToExpect: 'Maple, vanilla, light charcoal — gentle Tennessee daily pour.',
      },
      {
        name: 'George Dickel Barrel Select',
        priceUsd: '$35–42',
        proof: '86',
        role: 'daily',
        whatToExpect: 'Richer body — step-up without barrel proof heat.',
      },
    ],
    crownJewel: {
      name: 'George Dickel Bottled in Bond',
      priceUsd: '$45–55',
      proof: '100',
      role: 'crown',
      whatToExpect: 'BiB Tennessee — age and proof transparency.',
    },
    priceLadder: { tier: 'No. 8 → Barrel Select → BiB', range: '$25 → $38 → $50', note: 'Value Tennessee before Jack single barrel prices.' },
    firstPourExpectation: 'Soft maple, vanilla, light fruit — less banana-forward than Jack for many palates.',
    hiddenQuestions: [
      { question: 'Jack vs Dickel — which first?', answer: 'Pour both at 80 proof blind — category literacy starts with contrast, not loyalty.' },
    ],
    compareWith: ['jack-daniel', 'buffalo-trace', 'evan-williams-black'],
  },
];
