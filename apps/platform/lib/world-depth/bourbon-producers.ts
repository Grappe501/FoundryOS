/** Bourbon Producer Atlas — Level 1 deep-dive registry */

export type ProducerBottle = {
  name: string;
  priceUsd: string;
  proof: string;
  role: 'entry' | 'daily' | 'step-up' | 'splurge' | 'crown';
  whatToExpect: string;
};

export type HiddenQuestion = {
  question: string;
  answer: string;
};

export type ProducerTimelineEvent = {
  year: string;
  event: string;
};

export type BourbonProducer = {
  slug: string;
  name: string;
  tagline: string;
  hookQuestion: string;
  founded: string;
  headquarters: string;
  parentCompany: string;
  dspNote?: string;
  styleTags: ('wheated' | 'high-rye' | 'balanced' | 'value' | 'heritage' | 'craft' | 'finished')[];
  mashBillSignature: string;
  differentiator: string;
  history: { heading: string; body: string }[];
  timeline: ProducerTimelineEvent[];
  sweetSpot: ProducerBottle[];
  crownJewel: ProducerBottle;
  priceLadder: { tier: string; range: string; note: string };
  firstPourExpectation: string;
  hiddenQuestions: HiddenQuestion[];
  compareWith: string[];
  academyLessonSlug?: string;
};

export const BOURBON_PRODUCERS: BourbonProducer[] = [
  {
    slug: 'buffalo-trace',
    name: 'Buffalo Trace Distillery',
    tagline: 'The house that learned patience beats hype.',
    hookQuestion: 'Why does a $25 bottle share DNA with bottles people camp overnight for?',
    founded: '1775 (site); modern brand era 1990s',
    headquarters: 'Frankfort, Kentucky',
    parentCompany: 'Sazerac Company',
    dspNote: 'DSP-KY-113 — one of the most visited distilleries in America',
    styleTags: ['balanced', 'heritage', 'value'],
    mashBillSignature:
      'Buffalo Trace mash #1 — low rye (~10% rye), corn-forward, soft spice. Eagle Rare, Stagg, and Weller use different bills or proofs but the campus shares deep inventory culture.',
    differentiator:
      'Massive aged stock, single-campus production depth, and a culture of warehouse experimentation. Buffalo Trace is less one flavor and more one **system**: rickhouses, single barrels, and patient blending at scale.',
    history: [
      {
        heading: 'From riverside warehouse to national pilgrimage',
        body:
          'Distilling on this Frankfort site dates to the 18th century; the Buffalo Trace name arrived in 1999. Under Sazerac, the distillery invested in tourism, single-barrel programs, and long-aged inventory when rivals chased volume. That bet created today\'s paradox: flagship BT is an everyday bottle while siblings (Weller, Eagle Rare, Stagg line) fuel allocation culture.',
      },
      {
        heading: 'What they do differently',
        body:
          'They operate like a bourbon university on one campus — mash bills, barrel chars, and warehouse positions are variables you can taste side by side. Store picks and single barrels are not gimmicks; they are how the house teaches enthusiasts that **barrel #7 ≠ barrel #70**.',
      },
      {
        heading: 'The allocation shadow',
        body:
          'Beginners should ignore the line outside the gift shop until they understand the $20–40 shelf. Buffalo Trace bourbon (the namesake bottle) is the curriculum; allocated siblings are electives. Learn the house style on what you can actually buy.',
      },
    ],
    timeline: [
      { year: '1775', event: 'Historic distilling begins on the Kentucky River site.' },
      { year: '1999', event: 'Buffalo Trace brand name adopted; visitor experience expands.' },
      { year: '2013', event: 'Colonel E.H. Taylor line cements premium heritage storytelling.' },
      { year: 'Today', event: 'Campus tours + single-barrel culture define the brand globally.' },
    ],
    sweetSpot: [
      {
        name: 'Buffalo Trace Kentucky Straight Bourbon',
        priceUsd: '$25–32',
        proof: '90',
        role: 'entry',
        whatToExpect: 'Caramel, vanilla, gentle rye tick. Friendly, teachable — the textbook pour for Lesson 1.',
      },
      {
        name: 'Eagle Rare 10 Year',
        priceUsd: '$35–45 (MSRP varies)',
        proof: '90',
        role: 'daily',
        whatToExpect: 'More oak and dark fruit than BT; longer finish. Age statement transparency builds trust.',
      },
      {
        name: 'E.H. Taylor Small Batch',
        priceUsd: '$45–70',
        proof: '100',
        role: 'step-up',
        whatToExpect: 'Bottled-in-bond discipline — structured, creamy, classroom bourbon for proof lovers.',
      },
    ],
    crownJewel: {
      name: 'George T. Stagg (annual release)',
      priceUsd: 'MSRP ~$120; secondary higher',
      proof: '130+ (varies)',
      role: 'crown',
      whatToExpect: 'Barrel-proof intensity — not Level 1 sipping. Taste after you trust your palate with 90–100 proof.',
    },
    priceLadder: {
      tier: 'Entry → Daily → Splurge',
      range: '$25 → $40 → $70+',
      note: 'Stay on BT / Eagle Rare / Taylor Small Batch until blind tastings prove you need more heat.',
    },
    firstPourExpectation:
      'Start with standard Buffalo Trace: sweet corn, vanilla, light cinnamon. Nose gently — it opens with air. If you only smell alcohol, wait 90 seconds and try again. This bottle rewards patience more than ice.',
    hiddenQuestions: [
      {
        question: 'Is Buffalo Trace the same whiskey as Eagle Rare?',
        answer: 'Same distillery family, different age targets and blending goals. Eagle Rare carries a 10-year age statement; standard BT does not. Think siblings, not clones.',
      },
      {
        question: 'Why is Weller hard to find if Buffalo Trace is everywhere?',
        answer: 'Wheated mash bill + lower production + collector demand. Allocation is a supply and hype problem, not proof that $25 BT is "lesser."',
      },
      {
        question: 'Should I buy a store pick as my first bottle?',
        answer: 'Only if you want to learn barrel variation early. A standard BT or Eagle Rare teaches house style first; picks teach **variation within** the house.',
      },
      {
        question: 'What DSP should I look for on the label?',
        answer: 'Buffalo Trace campus bottles often show DSP-KY-113 or related Sazerac codes. If a "craft" label shares that DSP, you are tasting Frankfort, not a garage.',
      },
    ],
    compareWith: ['heaven-hill', 'four-roses', 'wild-turkey'],
    academyLessonSlug: 'three-pours-one-method',
  },
  {
    slug: 'jim-beam',
    name: 'Jim Beam (Beam Suntory)',
    tagline: 'The default setting of American bourbon — on purpose.',
    hookQuestion: 'If Jim Beam is "basic," why do bartenders still reach for it first?',
    founded: '1795 (Beam family); Jim Beam brand 1935',
    headquarters: 'Clermont, Kentucky',
    parentCompany: 'Beam Suntory',
    dspNote: 'DSP-KY-230 — world\'s best-selling bourbon family',
    styleTags: ['balanced', 'value', 'heritage'],
    mashBillSignature:
      'Classic Beam recipe — corn-heavy with rye spice, sour mash consistency. Knob Creek and Booker\'s push age and proof; Basil Hayden leans high-rye and lower proof.',
    differentiator:
      'Repeatability at global scale. Beam optimized **the same flavor tomorrow as today** — critical for cocktails, critical for teaching. Their ladder (White → Black → Knob → Booker) is a built-in curriculum.',
    history: [
      {
        heading: 'Seven generations, one surname',
        body:
          'Jacob Beam sold his first barrel in the 1790s. Prohibition wiped the family still; James B. Beam rebuilt at age 70 after Repeal — the namesake Jim Beam brand honors that rebuild. The lesson: bourbon history is collapse and comeback, not uninterrupted romance.',
      },
      {
        heading: 'Scale as craft',
        body:
          'Beam is often dismissed by enthusiasts — that is a mistake. Understanding Beam means understanding **sour mash at volume**, yeast consistency, and why "house pour" exists. Every steakhouse bourbon flight starts here for a reason.',
      },
    ],
    timeline: [
      { year: '1795', event: 'Jacob Beam begins selling whiskey.' },
      { year: '1935', event: 'Jim Beam brand launched post-Repeal.' },
      { year: '2014', event: 'Beam merges with Suntory — global distribution accelerates.' },
      { year: 'Today', event: 'American Stillhouse + Knob Creek small batch anchor the premium ladder.' },
    ],
    sweetSpot: [
      {
        name: 'Jim Beam Black Extra Aged',
        priceUsd: '$22–28',
        proof: '86',
        role: 'entry',
        whatToExpect: 'More oak than White Label, still approachable. Better Week 1 bottle than the cheapest shelf beam.',
      },
      {
        name: 'Knob Creek 9 Year',
        priceUsd: '$35–45',
        proof: '100',
        role: 'daily',
        whatToExpect: 'Peanut, vanilla, oak — textbook high-proof Beam without Booker intensity.',
      },
      {
        name: 'Booker\'s (batch releases)',
        priceUsd: '$85–100',
        proof: '125+',
        role: 'splurge',
        whatToExpect: 'Uncut intensity — caramel bomb, long finish. Graduate pour after Lesson 1.3.',
      },
    ],
    crownJewel: {
      name: 'Booker\'s (Fred & Booker legacy batches)',
      priceUsd: '$85–120',
      proof: 'Varies batch to batch',
      role: 'crown',
      whatToExpect: 'The Beam family\'s unfiltered personality — big, sweet, hot, memorable.',
    },
    priceLadder: {
      tier: 'Entry → Daily → Splurge',
      range: '$18 → $40 → $90+',
      note: 'Skip White Label for learning unless budget demands it — Black or Knob Creek 9 teach more per dollar.',
    },
    firstPourExpectation:
      'Beam Black or Knob Creek: peanut brittle, vanilla, oak. Beam yeast gives a nutty signature many tasters notice before caramel. If you hate "nutty," note it — that is your palate data.',
    hiddenQuestions: [
      {
        question: 'Is Knob Creek "real" Beam or a separate distillery?',
        answer: 'Same Clermont/Boston family, different age and proof targets. Knob Creek is Beam with the volume turned up and the clock run longer.',
      },
      {
        question: 'Why does Beam taste different in a bar vs at home?',
        answer: 'Fresh pour, glassware, ice, and bottle age (oxidation after opening). Beam is consistent from the distillery — context changes your perception.',
      },
      {
        question: 'Basil Hayden — bourbon or marketing?',
        answer: 'High-rye, lower proof Beam product. Great gateway if you want spice without 100-proof heat; not representative of core Beam mash.',
      },
    ],
    compareWith: ['heaven-hill', 'wild-turkey', 'buffalo-trace'],
  },
  {
    slug: 'heaven-hill',
    name: 'Heaven Hill Distillery',
    tagline: 'The value king that quietly supplies half the shelf.',
    hookQuestion: 'How does Evan Williams cost $15 and still teach real bourbon?',
    founded: '1935',
    headquarters: 'Bardstown, Kentucky',
    parentCompany: 'Heaven Hill Brands (family-owned)',
    dspNote: 'DSP-KY-31 — massive independent inventory in Bardstown',
    styleTags: ['value', 'balanced', 'heritage'],
    mashBillSignature:
      'Heaven Hill bourbon mash — moderate rye, consistent sour mash. Elijah Craig and Henry McKenna stretch age; Larceny and Old Fitzgerald bring wheated lines from the same campus ecosystem.',
    differentiator:
      'Independent, family-owned, and vertically stocked. Heaven Hill wins on **price-to-education ratio** — Evan Williams BiB is a national treasure for learning bottled-in-bond rules.',
    history: [
      {
        heading: 'Built in the Depression, burned, rebuilt',
        body:
          'The Shapira family founded Heaven Hill during Prohibition\'s tail end. A catastrophic 1996 rickhouse fire destroyed millions of gallons — yet the company persisted as one of the last large independent American distillers. That independence shows up in value pricing competitors struggle to match.',
      },
      {
        heading: 'The bardstown backbone',
        body:
          'If a bottle says "Distilled in Kentucky" at a improbable price, check DSP — Heaven Hill often distilled it. Learning Heaven Hill teaches **sourcing literacy**, not snobbery.',
      },
    ],
    timeline: [
      { year: '1935', event: 'Heaven Hill founded in Bardstown.' },
      { year: '1996', event: 'Devastating rickhouse fire — industry-defining loss.' },
      { year: '2000s', event: 'Elijah Craig and Evan Williams BiB become enthusiast darlings.' },
      { year: 'Today', event: 'Experience Center + deep value ladder under family control.' },
    ],
    sweetSpot: [
      {
        name: 'Evan Williams Black Label',
        priceUsd: '$14–18',
        proof: '86',
        role: 'entry',
        whatToExpect: 'Simple caramel-vanilla, short finish. Honest Week 1 bottle — no fake luxury.',
      },
      {
        name: 'Evan Williams Bottled in Bond (white label)',
        priceUsd: '$16–22',
        proof: '100',
        role: 'daily',
        whatToExpect: 'Bonded rules = teaching tool. Oak, corn sweetness, pepper on finish — best BiB value in America.',
      },
      {
        name: 'Elijah Craig Small Batch',
        priceUsd: '$28–35',
        proof: '94',
        role: 'step-up',
        whatToExpect: 'Toffee, oak, baking spice — step toward premium without allocation games.',
      },
    ],
    crownJewel: {
      name: 'Henry McKenna 10 Year BiB (when available)',
      priceUsd: '$40–60',
      proof: '100',
      role: 'crown',
      whatToExpect: 'Age-stated bonded bourbon — structured, oak-forward, competition winner when you find it at MSRP.',
    },
    priceLadder: {
      tier: 'Entry → Daily → Splurge',
      range: '$15 → $30 → $50+',
      note: 'Heaven Hill rewards frugal learners — spend savings on a Glencairn instead of hype bottles.',
    },
    firstPourExpectation:
      'Evan Williams BiB: bolder than Black Label — pepper, oak, corn sweetness at 100 proof. Add one water drop in Lesson 1.2 drill; watch fruit emerge.',
    hiddenQuestions: [
      {
        question: 'Is cheap Evan Williams "too young"?',
        answer: 'BiB requires at least 4 years — younger than many NAS bottles with fancier labels. Price ≠ age.',
      },
      {
        question: 'Heaven Hill vs Heaven Hill Distillery on label?',
        answer: 'Brand names vary; DSP-KY-31 (or listed distiller) tells you who made the liquid. Always read DSP when price seems too good.',
      },
      {
        question: 'Larceny vs Elijah Craig — same house?',
        answer: 'Same distilling universe; Larceny is wheated, EC is traditional rye-in-the-bill. Compare them for Lesson 1 mash tilt.',
      },
    ],
    compareWith: ['jim-beam', 'buffalo-trace', 'barton-1792'],
  },
  {
    slug: 'wild-turkey',
    name: 'Wild Turkey',
    tagline: 'High proof, high rye, zero apology.',
    hookQuestion: 'Why do people who hate "smooth" bourbon still love Wild Turkey 101?',
    founded: '1869 (site); Wild Turkey name 1940',
    headquarters: 'Lawrenceburg, Kentucky',
    parentCompany: 'Campari Group',
    dspNote: 'DSP-KY-52 — Jimmy & Eddie Russell legacy',
    styleTags: ['high-rye', 'heritage', 'value'],
    mashBillSignature:
      'Wild Turkey bourbon mash — rye-forward for the category, assertive spice, long ferment tradition. Russell\'s Reserve and Rare Breed stretch age and proof.',
    differentiator:
      'The Russell family palate — decades of consistency from master distillers who prefer **flavor over focus-group softness**. Wild Turkey 101 is the anti-"smooth" teaching bottle.',
    history: [
      {
        heading: 'From Austin Nichols to global icon',
        body:
          'The "Wild Turkey" name came from a hunting trip batch in 1940. Jimmy Russell started in 1954 and became the longest-tenured master distiller in Kentucky; son Eddie continues the line. Their philosophy: don\'t over-filter, don\'t over-dilute, let rye speak.',
      },
      {
        heading: '101 as curriculum',
        body:
          'At 101 proof, WT101 is deliberately louder than 86-proof competitors. It trains beginners to separate **heat from flavor** — a Level 1 superpower.',
      },
    ],
    timeline: [
      { year: '1940', event: 'Wild Turkey name born on Russell family watch.' },
      { year: '1954', event: 'Jimmy Russell begins — 60+ year tenure.' },
      { year: '1970s', event: '101 proof becomes identity marker.' },
      { year: 'Today', event: 'Campari ownership + visitor center + Russell\'s Reserve line.' },
    ],
    sweetSpot: [
      {
        name: 'Wild Turkey 101',
        priceUsd: '$25–32',
        proof: '101',
        role: 'daily',
        whatToExpect: 'Pepper, caramel, orange peel, long finish. Perfect high-rye slot for Lesson 1.3 flight.',
      },
      {
        name: 'Russell\'s Reserve 10 Year',
        priceUsd: '$35–45',
        proof: '90',
        role: 'step-up',
        whatToExpect: 'Softer than 101 but deeper oak — shows age without losing spice.',
      },
      {
        name: 'Rare Breed (barrel proof)',
        priceUsd: '$45–55',
        proof: '112+',
        role: 'splurge',
        whatToExpect: 'Uncut Russell spice — graduate after you can describe 101 without saying "strong."',
      },
    ],
    crownJewel: {
      name: 'Wild Turkey Master\'s Keep (limited releases)',
      priceUsd: '$150+',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Ultra-aged Russell experiments — storytelling bottles, not Week 1.',
    },
    priceLadder: {
      tier: 'Daily → Step-up → Splurge',
      range: '$28 → $40 → $55+',
      note: '101 is the classroom; Rare Breed is the field trip.',
    },
    firstPourExpectation:
      'WT101 will feel hot on first sip — expected. Small sip, wait, second sip. Look for pepper and caramel, not just burn. If you add water, add one drop only — this bottle is a proof lesson.',
    hiddenQuestions: [
      {
        question: 'Is Wild Turkey "too spicy" for beginners?',
        answer: 'It is spice-forward — that is the lesson. Compare to Maker\'s Mark in the same flight to feel wheated vs high-rye instantly.',
      },
      {
        question: 'Russell\'s Reserve vs 101 — which first?',
        answer: '101 first — it is the house idiom. Russell\'s 10 is the "aged remix" once you know the beat.',
      },
      {
        question: 'Does Campari ownership change the juice?',
        answer: 'Russell family still leads production philosophy. Taste batches, not headlines.',
      },
    ],
    compareWith: ['makers-mark', 'four-roses', 'jim-beam'],
  },
  {
    slug: 'makers-mark',
    name: 'Maker\'s Mark',
    tagline: 'Wheated softness — the gateway that still has a backbone.',
    hookQuestion: 'Why does Maker\'s taste "smooth" without being boring?',
    founded: '1953 (brand); Bill Samuels Sr. recipe',
    headquarters: 'Loretto, Kentucky',
    parentCompany: 'Beam Suntory',
    dspNote: 'DSP-KY-11 — red wax, rotating barrel program',
    styleTags: ['wheated', 'heritage'],
    mashBillSignature:
      'Soft red winter wheat replaces rye — bread, honey, vanilla forward. Maker\'s 46 adds stave-finishing; Cask Strength adds proof without adding rye spice.',
    differentiator:
      'Wheated bourbon as **intentional design**, not accident. Maker\'s teaches that "soft" can still have structure — rotatable barrel selection, consistent proofing, iconic brand craft.',
    history: [
      {
        heading: 'Bill Samuels burned the family recipe',
        body:
          'Samuels Sr. rejected a harsh family mash for wheated softness in 1953 — controversial then, prophetic now. The red wax, hand-dipped bottle, and Loretto campus made bourbon **giftable** before craft was a word.',
      },
      {
        heading: 'Wheat as vocabulary',
        body:
          'You cannot understand modern bourbon without a wheated reference point. Maker\'s is the global default — every high-rye bottle makes more sense after it.',
      },
    ],
    timeline: [
      { year: '1953', event: 'Bill Samuels Sr. launches wheated recipe.' },
      { year: '1980s', event: 'Red wax becomes icon; premium gift market grows.' },
      { year: '2010', event: 'Maker\'s 46 — stave finishing mainstreamed.' },
      { year: 'Today', event: 'Barrel rotation program + Loretto experience center.' },
    ],
    sweetSpot: [
      {
        name: 'Maker\'s Mark',
        priceUsd: '$28–35',
        proof: '90',
        role: 'daily',
        whatToExpect: 'Honey, vanilla, wheat bread — zero rye bite. Your wheated anchor for Lesson 1.3.',
      },
      {
        name: 'Maker\'s Mark 46',
        priceUsd: '$38–45',
        proof: '94',
        role: 'step-up',
        whatToExpect: 'More oak and spice from stave inserts — wheated plus wood complexity.',
      },
      {
        name: 'Maker\'s Mark Cask Strength',
        priceUsd: '$45–60',
        proof: '108–114',
        role: 'splurge',
        whatToExpect: 'Wheat sweetness at full volume — still no rye punch, but bigger body.',
      },
    ],
    crownJewel: {
      name: 'Maker\'s Mark Cellar Age (limited)',
      priceUsd: '$95+',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Extended aging wheated — dessert wine vibes, mentor pour.',
    },
    priceLadder: {
      tier: 'Daily → Step-up → Splurge',
      range: '$30 → $42 → $55+',
      note: 'Buy standard Maker\'s before 46 — learn wheat baseline first.',
    },
    firstPourExpectation:
      'Soft arrival, honey mid-palate, gentle oak finish. If you miss spice entirely, compare immediately to Wild Turkey 101 — the contrast is the lesson.',
    hiddenQuestions: [
      {
        question: 'Is Maker\'s "beginner bourbon" in a bad way?',
        answer: 'It is accessible, not simplistic. Stewards keep Maker\'s as a calibration bottle for wheated profiles forever.',
      },
      {
        question: 'Maker\'s vs Weller — same thing?',
        answer: 'Both wheated Kentucky bourbons — different houses, recipes, and availability. Weller is Buffalo Trace wheated; Maker\'s is Loretto wheated. Compare if you can find both.',
      },
      {
        question: 'Why hand-dipped wax?',
        answer: 'Brand craft signal — does not change flavor. You are paying for consistency and campus, not wax.',
      },
    ],
    compareWith: ['wild-turkey', 'four-roses', 'buffalo-trace'],
  },
  {
    slug: 'four-roses',
    name: 'Four Roses',
    tagline: 'Ten recipes, one obsession with consistency.',
    hookQuestion: 'How can one distillery taste like ten different bourbons on purpose?',
    founded: '1888 (brand); Lawrenceburg rebuild modern era',
    headquarters: 'Lawrenceburg, Kentucky',
    parentCompany: 'Kirin Holdings (Japan)',
    dspNote: 'DSP-KY-05 — two mash bills × five yeasts = ten recipes',
    styleTags: ['high-rye', 'balanced', 'heritage'],
    mashBillSignature:
      'Two mash bills (E = softer, B = bolder rye) × five proprietary yeast strains = ten distinct recipes. Single Barrel OBSV (high rye + delicate yeast) is the enthusiast shorthand.',
    differentiator:
      'Yeast as flavor engine. Four Roses proves **fermentation is a spice rack** — the same still, different yeast, different world.',
    history: [
      {
        heading: 'Japanese patience on Kentucky soil',
        body:
          'Four Roses survived Prohibition as medicinal producer, faded in the US while thriving in Japan, then returned stateside under Kirin with a fanatical focus on ten-recipe blending. The comeback story is quality over volume.',
      },
      {
        heading: 'The OBSV cult',
        body:
          'Enthusiasts speak in recipe codes (OBSV, OESQ, etc.). You do not need codes in Level 1 — you need to know **why** they exist: blenders choose recipes like chefs choose heat levels.',
      },
    ],
    timeline: [
      { year: '1888', event: 'Brand established — name from romantic legend.' },
      { year: '2002', event: 'US relaunch focus on premium recipes.' },
      { year: '2010s', event: 'Single Barrel OBSV becomes hunter bottle.' },
      { year: 'Today', event: 'Cox\'s Creek bottling + Cox visitor experience.' },
    ],
    sweetSpot: [
      {
        name: 'Four Roses Yellow Label',
        priceUsd: '$22–28',
        proof: '80',
        role: 'entry',
        whatToExpect: 'Light, floral, gentle — cocktail-friendly. Less ideal for Lesson 1 alone; pair with Single Barrel.',
      },
      {
        name: 'Four Roses Small Batch',
        priceUsd: '$28–35',
        proof: '90',
        role: 'daily',
        whatToExpect: 'Four recipes blended — balanced spice, fruit, finish. Best intro to the system.',
      },
      {
        name: 'Four Roses Single Barrel (OBSV if specified)',
        priceUsd: '$42–55',
        proof: '100',
        role: 'step-up',
        whatToExpect: 'High rye + floral yeast — mint, spice, long finish. The "aha" bottle for recipe nerds.',
      },
    ],
    crownJewel: {
      name: 'Four Roses Limited Edition Small Batch (annual)',
      priceUsd: '$150+',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Blender\'s symphony — multiple recipes at once. Collect after you can name one yeast difference.',
    },
    priceLadder: {
      tier: 'Entry → Daily → Step-up',
      range: '$25 → $32 → $50',
      note: 'Small Batch teaches the blend; Single Barrel teaches the recipe.',
    },
    firstPourExpectation:
      'Small Batch: fruit and spice in balance. Single Barrel: more pepper, longer finish. If Yellow Label feels thin, that is proof you are ready for Small Batch — your palate upgraded.',
    hiddenQuestions: [
      {
        question: 'What does OBSV mean?',
        answer: 'O = Four Roses; B = mash bill B (higher rye); S = straight; V = yeast strain V (floral/spicy). Decoder ring for enthusiasts — not required Week 1.',
      },
      {
        question: 'Why Japanese ownership?',
        answer: 'Kirin saved the brand\'s quality focus when US market treated it as cheap blend. Ownership country ≠ flavor country.',
      },
      {
        question: 'Single barrel vs small batch first?',
        answer: 'Small batch first — it is the house mix tape. Single barrel is one track.',
      },
    ],
    compareWith: ['wild-turkey', 'buffalo-trace', 'woodford-reserve'],
  },
  {
    slug: 'old-forester',
    name: 'Old Forester',
    tagline: 'The first bottled bourbon — still teaching history in the glass.',
    hookQuestion: 'What does "first bottled bourbon" actually mean for your shelf?',
    founded: '1870 (brand); Brown-Forman 1890s',
    headquarters: 'Louisville, Kentucky (distilling also Shively)',
    parentCompany: 'Brown-Forman',
    dspNote: 'DSP-KY-150 — historic brand in active production',
    styleTags: ['balanced', 'heritage', 'value'],
    mashBillSignature:
      'Brown-Forman bourbon mash — balanced rye, banana-forward fermentation notes on many batches, consistent entry proof ladder from 86 to 100+.',
    differentiator:
      'History you can taste without museum dust. Old Forester 1920 Prohibition Style and 1910 Double Barreled teach **process experiments** at mid-shelf prices.',
    history: [
      {
        heading: 'George Garvin Brown put bourbon in glass',
        body:
          'In 1870, Brown sold sealed glass bottles — revolutionary when barrels were the norm. That trust play is why "Old Forester" still means authenticity to historians. Today it is also a flavor lab: Birthday Bourbon, King of Kentucky, and the Whiskey Row series tell American timeline stories.',
      },
      {
        heading: 'Urban distillery tourism',
        body:
          'Whiskey Row on Louisville\'s Main Street rebuilt distilling in downtown — Old Forester is as much civic story as sip story.',
      },
    ],
    timeline: [
      { year: '1870', event: 'First bottled bourbon sold by George Garvin Brown.' },
      { year: '1920', event: 'Medicinal license during Prohibition — brand survives.' },
      { year: '2018', event: 'Whiskey Row distillery opens on Main Street.' },
      { year: 'Today', event: 'Statesman, 1920, 1910 expand flavor storytelling.' },
    ],
    sweetSpot: [
      {
        name: 'Old Forester 86',
        priceUsd: '$20–24',
        proof: '86',
        role: 'entry',
        whatToExpect: 'Banana bread, caramel, light spice — classic Brown-Forman profile.',
      },
      {
        name: 'Old Forester 100 Proof',
        priceUsd: '$24–30',
        proof: '100',
        role: 'daily',
        whatToExpect: 'More body, more oak — best value in the core line for tastings.',
      },
      {
        name: 'Old Forester 1920 Prohibition Style',
        priceUsd: '$55–65',
        proof: '115',
        role: 'step-up',
        whatToExpect: 'Dark fruit, cocoa, heat — history lesson in a bottle.',
      },
    ],
    crownJewel: {
      name: 'Old Forester Birthday Bourbon (annual)',
      priceUsd: '$150+',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Allocated birthday release — collect after you love 100 Proof.',
    },
    priceLadder: {
      tier: 'Entry → Daily → Storytelling',
      range: '$22 → $28 → $60',
      note: '100 Proof is the sleeper pick enthusiasts buy repeatedly.',
    },
    firstPourExpectation:
      'Distinct banana note on nose for many batches — polarizing until you expect it. Palate: caramel, baking spice, medium finish. If banana surprises you, write it down; you just detected fermentation signature.',
    hiddenQuestions: [
      {
        question: 'Old Forester vs Woodford Reserve — same company?',
        answer: 'Both Brown-Forman — different mash targets, proofs, and branding. Woodford is premium heritage; Old Forester is history + value ladder.',
      },
      {
        question: 'Is 1920 "really" Prohibition style?',
        answer: 'Inspired profile — higher proof, darker char influence. Marketing story plus real flavor shift.',
      },
      {
        question: 'Why banana?',
        answer: 'Ester profile from yeast and fermentation — common in Brown-Forman distillate. Not added flavor.',
      },
    ],
    compareWith: ['woodford-reserve', 'jim-beam', 'heaven-hill'],
  },
  {
    slug: 'woodford-reserve',
    name: 'Woodford Reserve',
    tagline: 'Pot still heritage in a premium package.',
    hookQuestion: 'Does pot still actually taste different, or is that marketing?',
    founded: '1996 (modern brand); site since 1812',
    headquarters: 'Versailles, Kentucky',
    parentCompany: 'Brown-Forman',
    dspNote: 'DSP-KY-150 / Versailles copper pot stills',
    styleTags: ['balanced', 'heritage'],
    mashBillSignature:
      'Woodford Reserve Distiller\'s Select — balanced, triple-distilled in pot stills (in combination with column), heavy oak integration.',
    differentiator:
      'Texture. Woodford sells **mouthfeel and finish length** — dried fruit, cocoa, structured oak. The Versailles campus is the most photographed in bourbon for a reason.',
    history: [
      {
        heading: 'Labrot & Graham reborn',
        body:
          'The Versailles site is a National Historic Landmark. Brown-Forman revived pot still bourbon at scale when column still efficiency dominated. Woodford became the premium face of that bet.',
      },
      {
        heading: 'Derby and diplomacy',
        body:
          'Official bourbon of the Kentucky Derby — premium positioning without allocation chaos. Woodford is where corporate bourbon still feels like an occasion.',
      },
    ],
    timeline: [
      { year: '1812', event: 'Oscar Pepper distillery era begins.' },
      { year: '1996', event: 'Woodford Reserve brand launches.' },
      { year: '2000s', event: 'Derby partnership cements premium identity.' },
      { year: 'Today', event: 'Double Oaked and Master\'s Collection push finishing science.' },
    ],
    sweetSpot: [
      {
        name: 'Woodford Reserve Distiller\'s Select',
        priceUsd: '$38–45',
        proof: '90.4',
        role: 'daily',
        whatToExpect: 'Dried fruit, cocoa, vanilla, long finish — premium Lesson 1 splurge slot.',
      },
      {
        name: 'Woodford Reserve Double Oaked',
        priceUsd: '$55–65',
        proof: '90.4',
        role: 'step-up',
        whatToExpect: 'Secondary barrel — maple, marshmallow, dessert forward. Finish lab in a bottle.',
      },
      {
        name: 'Woodford Reserve Rye',
        priceUsd: '$42–50',
        proof: '90.4',
        role: 'step-up',
        whatToExpect: 'Not bourbon — but same house style. Preview Level 2 rye cousin.',
      },
    ],
    crownJewel: {
      name: 'Woodford Reserve Master\'s Collection',
      priceUsd: '$130+',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Annual experiments — grain bills, finishes, age. For stewards, not Week 1.',
    },
    priceLadder: {
      tier: 'Daily → Finishing → Experiments',
      range: '$40 → $60 → $130+',
      note: 'Distiller\'s Select is enough for Level 1 — Double Oaked teaches finishing.',
    },
    firstPourExpectation:
      'Silky entry, cocoa and dried cherry mid-palate, oak on finish. Compare to Evan Williams BiB same night — same state, different ambition. Texture difference is the point.',
    hiddenQuestions: [
      {
        question: 'Pot still vs column — can I taste it?',
        answer: 'Often heavier mouthfeel and more ester complexity vs thin neutral spirit. Side-by-side with value bourbon reveals it.',
      },
      {
        question: 'Double Oaked — gimmick?',
        answer: 'Real secondary barrel influence — sweetness and wood extract jump. Try after baseline Woodford.',
      },
      {
        question: 'Worth the price for beginners?',
        answer: 'As a third pour in Lesson 1.3 "step-up" slot — yes. As first bottle ever — start cheaper, appreciate Woodford later.',
      },
    ],
    compareWith: ['old-forester', 'four-roses', 'makers-mark'],
  },
  {
    slug: 'barton-1792',
    name: 'Barton 1792 Distillery',
    tagline: 'Bardstown value with a full-proof punch.',
    hookQuestion: 'Why is 1792 Full Proof a secret handshake bottle under $50?',
    founded: '1879 (Barton); 1792 brand modern era',
    headquarters: 'Bardstown, Kentucky',
    parentCompany: 'Sazerac (same family as Buffalo Trace)',
    dspNote: 'DSP-KY-14 — Bardstown campus, separate from Frankfort',
    styleTags: ['value', 'high-rye', 'balanced'],
    mashBillSignature:
      '1792 mash — rye-forward Bardstown profile, high-proof releases without luxury pricing. Small Batch as daily; Full Proof as enthusiast value.',
    differentiator:
      'Proof heroics on a budget. 1792 Full Proof delivers barrel-strength experience without secondary-market insanity — when MSRP holds.',
    history: [
      {
        heading: 'Bardstown neighbor to giants',
        body:
          'Barton operated through corporate mergers until Sazerac consolidated Kentucky assets. 1792 (named for Kentucky statehood year) became the premium face of the Barton campus while retaining workman pricing.',
      },
    ],
    timeline: [
      { year: '1879', event: 'Barton brand roots in Bardstown.' },
      { year: '2009', event: '1792 Ridgemont Reserve rebrands to 1792.' },
      { year: 'Today', event: 'Full Proof and Single Barrel picks cult following.' },
    ],
    sweetSpot: [
      {
        name: '1792 Small Batch',
        priceUsd: '$28–32',
        proof: '93.7',
        role: 'daily',
        whatToExpect: 'Caramel, mint, rye spice — underrated flight member.',
      },
      {
        name: '1792 Bottled in Bond',
        priceUsd: '$35–40',
        proof: '100',
        role: 'step-up',
        whatToExpect: 'Structured, oaky, bonded reliability.',
      },
      {
        name: '1792 Full Proof',
        priceUsd: '$45–55',
        proof: '125',
        role: 'splurge',
        whatToExpect: 'Heat plus flavor — vanilla, pepper, long finish. Value barrel proof.',
      },
    ],
    crownJewel: {
      name: '1792 12 Year (when available)',
      priceUsd: '$60+',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Age-stated Barton — oak bomb for the patient.',
    },
    priceLadder: {
      tier: 'Daily → Bonded → Full Proof',
      range: '$30 → $38 → $50',
      note: 'Full Proof is your "graduate heat" bottle before chasing Stagg.',
    },
    firstPourExpectation:
      'Small Batch: mint and caramel. Full Proof: hold your nose open, small sip — pepper and vanilla behind the heat.',
    hiddenQuestions: [
      {
        question: '1792 vs Buffalo Trace — same owner?',
        answer: 'Both Sazerac — different campuses, mash bills, and brands. Compare to taste independence within a portfolio.',
      },
      {
        question: 'Why "1792"?',
        answer: 'Kentucky statehood year — marketing hook with real Bardstown production behind it.',
      },
    ],
    compareWith: ['buffalo-trace', 'heaven-hill', 'wild-turkey'],
  },
  {
    slug: 'michters',
    name: 'Michter\'s',
    tagline: 'The revival brand that priced like luxury before you noticed.',
    hookQuestion: 'If Michter\'s doesn\'t distill every drop, why do stewards still respect it?',
    founded: 'Modern revival 1990s; name from 1753',
    headquarters: 'Louisville, Kentucky (Fort Nelson)',
    parentCompany: 'Chatham Imports (independent)',
    styleTags: ['heritage', 'craft'],
    mashBillSignature:
      'Multiple sourced and distilled streams — US*1 Bourbon, barrel strength releases, careful filtering and proofing philosophy.',
    differentiator:
      'Luxury positioning with transparency about sourcing history. Michter\'s teaches **NDP vs distiller** conversations without shame — quality in the glass matters.',
    history: [
      {
        heading: 'Name older than the still',
        body:
          'Michter\'s revived a Pennsylvania-era name in Kentucky, initially sourcing while building Fort Nelson and production partnerships. The brand leaned into small-batch luxury — toasted barrel finishes, barrel strength, tight allocation.',
      },
      {
        heading: 'Sourcing literacy',
        body:
          'Level 1 lesson: many brands source whiskey. Michter\'s early era was transparent; today they distill and partner. Read labels, not forums.',
      },
    ],
    timeline: [
      { year: '1753', event: 'Original Michter\'s name origins (PA).' },
      { year: '1990s', event: 'Kentucky revival under Chatham Imports.' },
      { year: '2010s', event: 'Fort Nelson experience + US*1 flagship.' },
      { year: 'Today', event: 'Toasted barrel series + barrel strength hype.' },
    ],
    sweetSpot: [
      {
        name: 'Michter\'s US*1 Bourbon',
        priceUsd: '$45–55',
        proof: '91.4',
        role: 'step-up',
        whatToExpect: 'Refined, cherry-vanilla, soft oak — premium Lesson 1 splurge.',
      },
      {
        name: 'Michter\'s US*1 Toasted Barrel Finish',
        priceUsd: '$65–80',
        proof: '91.4',
        role: 'splurge',
        whatToExpect: 'Toasted staves — s\'mores, cocoa, dessert wine vibes.',
      },
      {
        name: 'Michter\'s Barrel Strength Bourbon',
        priceUsd: '$80–100',
        proof: '110+',
        role: 'crown',
        whatToExpect: 'Batch variation — rich, dark fruit, heat managed.',
      },
    ],
    crownJewel: {
      name: 'Michter\'s 10 Year Bourbon',
      priceUsd: '$150+',
      proof: 'Varies',
      role: 'crown',
      whatToExpect: 'Age-stated luxury — mentor pour.',
    },
    priceLadder: {
      tier: 'Premium daily → Finishing → Barrel strength',
      range: '$50 → $75 → $100+',
      note: 'Not Week 1 required — aspirational target after producer triangle.',
    },
    firstPourExpectation:
      'US*1: polished, cherry, vanilla, medium-long finish. Less fire than WT101, more refinement than Evan Williams — notice texture.',
    hiddenQuestions: [
      {
        question: 'Did Michter\'s "used to be" sourced?',
        answer: 'Yes, like many revivals. Evaluate current bottles on taste; DSP and label tell today\'s story.',
      },
      {
        question: 'Toasted vs standard US*1 first?',
        answer: 'Standard first — toasted is a finishing lesson.',
      },
    ],
    compareWith: ['woodford-reserve', 'buffalo-trace', 'old-forester'],
  },
  {
    slug: 'new-riff',
    name: 'New Riff Distilling',
    tagline: 'Modern craft — no nostalgia costume.',
    hookQuestion: 'Can a 2014 distillery teach you more than a 200-year name?',
    founded: '2014',
    headquarters: 'Newport, Kentucky',
    parentCompany: 'Independent',
    dspNote: 'DSP-KY-500 — grain-to-glass, non-chill filtered',
    styleTags: ['craft', 'high-rye', 'balanced'],
    mashBillSignature:
      'Three mash bills (rye-forward bourbon, balanced, malt-heavy) — all non-chill filtered, bottled in bond options, transparent age when stated.',
    differentiator:
      'Craft without mystery. New Riff publishes process, offers BiB at fair prices, and proves **young-but-honest** whiskey can educate palates trained on NAS giants.',
    history: [
      {
        heading: 'Grain to glass in the Ohio River shadow',
        body:
          'Founded by locals who wanted transparency in an era of sourced juice and fake heritage. Newport campus became a field trip for enthusiasts learning what "distilled and bottled by" actually means.',
      },
    ],
    timeline: [
      { year: '2014', event: 'New Riff opens in Newport, KY.' },
      { year: '2018', event: 'BiB releases prove age + transparency sell.' },
      { year: 'Today', event: 'Single barrel program + rye strength reputation.' },
    ],
    sweetSpot: [
      {
        name: 'New Riff Bottled in Bond Bourbon',
        priceUsd: '$45–55',
        proof: '100',
        role: 'daily',
        whatToExpect: 'Bold, grain-forward, non-chill filtered texture — craft baseline.',
      },
      {
        name: 'New Riff Single Barrel Bourbon',
        priceUsd: '$55–65',
        proof: 'Varies',
        role: 'step-up',
        whatToExpect: 'Barrel variation on full display — pick one, take notes.',
      },
      {
        name: 'New Riff Malt Bourbon (when available)',
        priceUsd: '$60+',
        proof: 'Varies',
        role: 'splurge',
        whatToExpect: 'Malt-forward experiment — bread and honey.',
      },
    ],
    crownJewel: {
      name: 'New Riff Single Barrel Proof Picks',
      priceUsd: '$65+',
      proof: '110+',
      role: 'crown',
      whatToExpect: 'Store picks — community events, real barrel education.',
    },
    priceLadder: {
      tier: 'BiB → Single barrel → Proof picks',
      range: '$50 → $60 → $70+',
      note: 'Compare to Heaven Hill BiB same night — age vs craft intensity.',
    },
    firstPourExpectation:
      'BiB: bold grain, pepper, vanilla oak. Mouthfeel richer than chill-filtered giants — note the texture difference in your journal.',
    hiddenQuestions: [
      {
        question: 'Is craft "too young"?',
        answer: 'BiB minimum 4 years — same legal floor as many NAS bottles. Youth vs NAS blending is the real comparison.',
      },
      {
        question: 'Non-chill filtered — will it cloud?',
        answer: 'May haze with ice — flavor compounds retained. Feature, not flaw.',
      },
    ],
    compareWith: ['heaven-hill', 'four-roses', 'michters'],
  },
];

export function getBourbonProducer(slug: string): BourbonProducer | undefined {
  return BOURBON_PRODUCERS.find((p) => p.slug === slug);
}

export function listBourbonProducers(): BourbonProducer[] {
  return BOURBON_PRODUCERS;
}

export const PRODUCER_STYLE_FILTERS = [
  { id: 'all', label: 'All houses' },
  { id: 'wheated', label: 'Wheated' },
  { id: 'high-rye', label: 'High rye' },
  { id: 'value', label: 'Value kings' },
  { id: 'heritage', label: 'Heritage' },
  { id: 'craft', label: 'Modern craft' },
] as const;
