/** Bourbon Academy — Level 2: Confident Taster (full authored curriculum) */

import type { AcademyLesson } from './types';

function lesson(
  slug: string,
  title: string,
  description: string,
  outcome: string,
  sections: { heading: string; body: string }[],
  extra?: Partial<AcademyLesson>,
): AcademyLesson {
  return { level: 2, slug, title, description, outcome, sections, estimatedMinutes: extra?.estimatedMinutes ?? 20, ...extra };
}

export const BOURBON_LEVEL_2_LESSONS: AcademyLesson[] = [
  lesson(
    'mash-bill-in-the-mouth',
    'Mash bill in your mouth',
    'Translate grain recipes into flavor — high rye, wheated, and traditional corn-forward profiles.',
    'Blind-identify wheated vs high-rye pours and name the grain driving each sensation.',
    [
      { heading: 'Three mash bill families', body: 'Traditional bourbon (~10–15% rye) reads corn-sweet with gentle spice. High-rye bourbon pushes pepper, mint, and fruit. Wheated bourbon replaces rye with wheat — softer, bread-and-honey texture. You do not need exact percentages to taste the fork.' },
      { heading: 'The two-bottle drill', body: 'Pour Maker\'s Mark (wheated) and Wild Turkey 101 (high-rye) at the same proof if possible. Nose both. The wheated pour collapses toward sweetness; the high-rye pour lifts spice on the finish. Write one word per pour that is not "smooth."' },
      { heading: 'Common trap', body: 'High-rye bourbon is not rye whiskey. Bulleit Bourbon feels spicy but is still corn-majority bourbon. Compare to Rittenhouse Rye in the category lesson for the legal line.' },
      { heading: 'Producer context', body: 'Four Roses runs ten recipes — high-rye variants show fruit and spice even at lower proof. Heaven Hill wheated (Larceny) and Beam wheated (Weller tree) share wheat slot but different yeast and entry proof. House habits matter after mash bill.' },
    ],
    {
      summary: 'Mash bill is the personality fork — rye spice vs wheat softness starts in the grain, not the marketing story.',
      glossaryTerms: ['Mash bill', 'Wheated bourbon', 'High-rye bourbon'],
      relatedProducers: ['makers-mark', 'wild-turkey'],
      tryThis: {
        title: 'Mash bill triangle flight',
        steps: ['Open /bourbon/mashbill-flight or Tasting Lab → Mash bill triangle.', 'Pour Buffalo Trace, WT101, Maker\'s Mark at ½ oz each.', 'Write nose + palate + finish for each — rank and defend #1.', 'Save session for checkpoint evidence.'],
        whatToNotice: 'If you cannot tell wheated from high-rye blind, repeat at matched proof before adding age or barrel proof variables.',
      },
    },
  ),
  lesson(
    'flavor-wheel-practice',
    'Flavor wheel practice',
    'Build a personal flavor vocabulary beyond "good" and "smooth."',
    'Use five distinct flavor families in written notes: sweet, spice, fruit, oak, and texture.',
    [
      { heading: 'The five families', body: 'Sweet: caramel, honey, brown sugar. Spice: cinnamon, pepper, rye heat. Fruit: cherry, apple, banana esters. Oak: vanilla, tannin, sawdust. Texture: oily, thin, creamy, hot. Force every note into a family before you write it.' },
      { heading: 'Forbidden words', body: '"Smooth," "strong," and "good" are not notes — they describe your reflex, not the pour. Replace with family words: "hot" → cinnamon or ethanol heat; "smooth" → honey or soft wheat.' },
      { heading: 'Wheel → DNA', body: 'Your flavor wheel profile saves into Bourbon DNA — repeated sessions reveal whether you lean spice or sweet over time, not just tonight.' },
    ],
    {
      glossaryTerms: ['Nose', 'Palate', 'Finish', 'Flavor wheel'],
      tryThis: {
        title: 'Five-family session',
        steps: ['Open /bourbon/flavor-wheel — set intensity on 6+ notes.', 'Taste one pour — assign one word per family minimum.', 'Photo note card — upload to portfolio or journal.', 'Post one new word in Bourbon Circle weekly challenge.'],
        whatToNotice: 'Families overlap — cherry is fruit and can read sweet; pick primary family first, nuance second.',
      },
    },
  ),
  lesson(
    'rye-and-tennessee-cousins',
    'Rye and Tennessee as bourbon cousins',
    'American whiskey categories share barrels but diverge on grain law and process.',
    'Explain why rye whiskey and Tennessee whiskey are not bourbon labels despite similar shelves.',
    [
      { heading: 'Rye whiskey rules', body: '≥51% rye grain, new charred oak, same U.S. straight whiskey aging floor. Rittenhouse BiB and Wild Turkey Rye are textbook — compare to WT101 same night.' },
      { heading: 'Tennessee process', body: 'Jack Daniel\'s and George Dickel use charcoal mellowing before barreling. Mash may qualify as bourbon-class; label says Tennessee whiskey because of process + state identity.' },
      { heading: 'Category flight homework', body: 'Run preset: Buffalo Trace + Rittenhouse Rye + Jack Daniel\'s No. 7. Same proof zone, three categories — write which grain or process drove each difference.' },
    ],
    {
      glossaryTerms: ['Rye whiskey', 'Tennessee whiskey', 'Kentucky straight bourbon'],
      relatedProducers: ['jack-daniel', 'heaven-hill'],
      tryThis: {
        title: 'Category triangle',
        steps: ['Open /bourbon/tasting-lab → Category triangle.', 'Read label category line on each bottle before nosing.', 'Close detective case rye-vs-high-rye-bourbon after the flight.', 'Write one paragraph: grain vs process vs proof.'],
        whatToNotice: 'Bulleit Bourbon vs Bulleit Rye is the fastest same-brand category lesson on one shelf.',
      },
    },
  ),
  lesson(
    'comparison-grid-basics',
    'Comparison grid basics',
    'Hold one variable constant so your palate learns cause and effect.',
    'Complete a three-pour grid with nose, palate, finish, and rank — one controlled variable.',
    [
      { heading: 'Pick the variable', body: 'Same distillery different proof. Same proof different mash bill. Same mash bill different age. Never change everything at once on your first grids.' },
      { heading: 'Grid columns', body: 'Nose · Palate · Finish length (short/medium/long) · Sweet vs spice balance · Score 1–10 · One sentence why. Five columns, three rows — fits one page.' },
      { heading: 'Tool link', body: 'Use /bourbon/comparison-grid or Compare Five presets. Save grid sessions locally — they count toward Level 2 checkpoint.' },
    ],
    {
      tryThis: {
        title: 'First grid',
        steps: ['Open /bourbon/comparison-grid → Three mash bills.', 'Fill every cell before declaring a winner.', 'Write what mash bill variable taught you in the lesson field.', 'Save grid.'],
        whatToNotice: 'If every row scores within 1 point, your variable may be too subtle — try proof ladder next.',
      },
    },
  ),
  lesson(
    'water-and-proof-experiment',
    'Water and proof experiment',
    'Higher proof carries more flavor and more heat — water is a tool, not a crutch.',
    'Demonstrate one high-proof pour neat vs one drop of water and name what opened.',
    [
      { heading: 'Proof density', body: '100+ proof pours carry more volatiles — spice, oak, fruit can intensify. Lower proof can feel softer but may hide structure. Neither is superior — context matters.' },
      { heading: 'One drop rule', body: 'Add one drop with a straw or pipette, not a splash. Re-nose and re-taste. If the pour opens (fruit, caramel), proof was masking. If it collapses, stay neat next time.' },
      { heading: 'Hosting etiquette', body: 'Serve water alongside high-proof pours without apology. Teach guests the experiment — it beats arguing about "real men drink neat."' },
    ],
    {
      glossaryTerms: ['Proof', 'Barrel proof', 'Neat'],
      tryThis: {
        title: 'Proof ladder in Tasting Lab',
        steps: ['Open /bourbon/tasting-lab?mode=proof.', 'Run Proof ladder flight — tiny pours.', 'Water only on OF1920 or highest proof pour.', 'Note which slider setting matches your favorite bottle.'],
        whatToNotice: 'Barrel proof picks often need water to show dessert notes — heat is not failure, unopened flavor is.',
      },
    },
  ),
  lesson(
    'blind-one-pour-drill',
    'Blind one-pour drill',
    'Remove one label — build humility before the full blind night.',
    'Bag one bottle, score nose/palate/finish, reveal, and note whether price matched rank.',
    [
      { heading: 'Single-pour blind', body: 'Full blind nights overwhelm beginners. Start with one mystery pour among known references — or bag one of three.' },
      { heading: 'Score before reveal', body: 'Lock score 1–10 and three words before unbagging. Reveal only changes the story, not the score — adjust notes if needed, not score to match label.' },
      { heading: 'Value blind prep', body: 'Tasting Lab → Value blind prep uses four under-$35 staples — ideal first blind homework before allocated bottles enter the room.' },
    ],
    {
      glossaryTerms: ['Blind tasting'],
      tryThis: {
        title: 'One-bag drill',
        steps: ['Pick Evan Williams, WT101, Four Roses Yellow, or Larceny.', 'Bag one — number glasses.', 'Run flavor words only — no brand guesses.', 'Reveal and log surprise in portfolio.'],
        whatToNotice: 'If cheapest bottle wins, you learned more than if Pappy would have — humility is data.',
      },
    },
  ),
  lesson(
    'tennessee-charcoal-tasting',
    'Tennessee charcoal on the tongue',
    'Lincoln County Process changes entry — taste Jack vs Dickel vs bourbon baseline.',
    'Describe charcoal mellowing in flavor terms, not marketing terms.',
    [
      { heading: 'Process not poetry', body: 'Sugar maple charcoal filters new make before barrel — softens harshness, shifts banana and caramel balance. Same corn-forward mash can read gentler than bourbon at equal proof.' },
      { heading: 'Jack vs Dickel', body: 'Jack No. 7 often banana-forward; Dickel No. 8 maple-soft. Pour both at 80 proof with Buffalo Trace as bourbon baseline.' },
      { heading: 'Campus link', body: 'Visit /bourbon/campus → Jack Daniel\'s — charcoal vats pin explains the category better than any glossary.' },
    ],
    {
      relatedProducers: ['jack-daniel', 'george-dickel'],
      tryThis: {
        title: 'Tennessee duo flight',
        steps: ['Tasting Lab → Tennessee duo.', 'Note charcoal softness vs corn sweetness on each.', 'Read detective case tennessee-vs-bourbon-label.', 'Compare to category triangle if time allows.'],
        whatToNotice: 'Tennessee is process-defined — label teaches a production step happened.',
      },
    },
  ),
  lesson(
    'bib-tasting-lab',
    'BiB tasting lab',
    'Bottled-in-Bond guarantees specs — taste the transparency shortcut.',
    'Explain BiB rules and pour two bond bottles at 100 proof side by side.',
    [
      { heading: 'Bond rules recap', body: 'One distilling season · one distiller · 4+ years · 100 proof. Evan Williams BiB, Rittenhouse Rye BiB, Old Overholt BiB — under-$30 anchors.' },
      { heading: 'What BiB does not promise', body: 'BiB is legally specific, not automatically best. It removes mystery about age floor and proof — you still taste for balance.' },
      { heading: 'Compare at equal proof', body: 'New Riff BiB bourbon vs Rittenhouse BiB rye — same proof, different category. Mouthfeel and spice diverge.' },
    ],
    {
      glossaryTerms: ['Bottled in bond'],
      tryThis: {
        title: 'BiB flight',
        steps: ['Tasting Lab → BiB transparency flight.', 'Identify green BiB labels before pour.', 'Compare mouthfeel at 100 proof.', 'Close detective bib-guarantee case if not done.'],
        whatToNotice: 'BiB rye vs BiB bourbon teaches category faster than reading definitions alone.',
      },
    },
  ),
  lesson(
    'craft-kentucky-tasting',
    'Craft Kentucky on the tongue',
    'Craft is not one flavor — value revival, BiB, wheated, and farm grain differ.',
    'Run a craft campus flight and rank bottles by transparency vs taste, not hype.',
    [
      { heading: 'Craft tiers', body: 'Value craft (Green River) · BiB craft (New Riff, Wilderness Trail) · farm grain (Jeptha Creed) · wheated craft (Log Still, Willett) · splurge craft (Peerless, Blue Run). Each teaches a different lesson.' },
      { heading: 'Grain-to-glass literacy', body: 'Read DSP on label — same city does not mean same juice. Craft marketing loves romance; your job is palate + label honesty.' },
      { heading: 'Shelf strategy', body: 'Build craft inventory before chasing fusion finishes — know straight profile before port and wine cask homework.' },
    ],
    {
      glossaryTerms: ['Craft distiller', 'Grain to glass'],
      relatedProducers: ['new-riff', 'wilderness-trail', 'green-river'],
      tryThis: {
        title: 'Craft campus flight',
        steps: ['Tasting Lab → Craft campus flight.', 'Save session with rank + reflection.', 'Run craft inventory grid preset.', 'Visit one new craft producer in atlas.'],
        whatToNotice: 'If every craft pour tastes "smooth," your notes are reflexes — pick flavor family words.',
      },
    },
  ),
  lesson(
    'finish-tasting-lab',
    'Cask finish tasting lab',
    'Finish adds flavor post-primary barrel — learn straight baseline first.',
    'Compare straight bourbon to one finish pour and name what the second cask added.',
    [
      { heading: 'Finish types', body: 'Second new oak (Woodford Double Oaked) · port/wine cask (Angel\'s Envy) · fusion series (Bardstown) · stave finishing (Maker\'s 46). Different mechanics, same homework: what changed after primary aging?' },
      { heading: 'Dessert bourbon trap', body: 'Finish pours read sweet — great for skeptics, dangerous as only pour you know. Always keep a straight baseline in the flight.' },
      { heading: 'Price vs finish', body: 'Finish often costs more per proof point — blind against straight Eagle Rare or BT before paying fusion premiums.' },
    ],
    {
      tryThis: {
        title: 'Finish lab flight',
        steps: ['Tasting Lab → Finish lab.', 'Baseline with Buffalo Trace first.', 'Name dessert notes on Angel\'s Envy vs Double Oaked.', 'Run finish four-way grid.'],
        whatToNotice: 'Port finish vs second oak vs stave finish — three different sweetness mechanics.',
      },
    },
  ),
  lesson(
    'craft-rye-on-the-shelf',
    'Craft rye on the shelf',
    'Rye whiskey craft expanded — BiB, malted rye, major BiB anchor.',
    'Pour craft rye against Rittenhouse and explain mouthfeel vs spice differences.',
    [
      { heading: 'Craft rye landscape', body: 'New Riff BiB rye · Wilderness Trail BiB rye · Rabbit Hole Boxergrail (malted rye) · Michter\'s softer rye · Rittenhouse value BiB anchor.' },
      { heading: 'Same campus category switch', body: 'New Riff bourbon vs New Riff rye — legal category change on one DSP philosophy.' },
      { heading: 'Cocktail vs sip', body: 'Rittenhouse punches in Manhattan; Michter\'s rye sips softer — know your use case before splurge craft rye.' },
    ],
    {
      tryThis: {
        title: 'Craft rye flight',
        steps: ['Tasting Lab → Craft rye flight.', 'Compare to New Riff bourbon same night.', 'Run craft rye four grid.', 'Close rye-vs-high-rye-bourbon case if open.'],
        whatToNotice: '100 proof alignment makes craft vs major comparison fair — match bond bottles when possible.',
      },
    },
  ),
  lesson(
    'house-proof-ladders',
    'House proof ladders',
    'Major houses teach proof on one mash story — climb the ladder before chasing unicorns.',
    'Run one house ladder flight and explain what proof changed vs what age changed.',
    [
      { heading: 'Heaven Hill ladder', body: 'Evan Black → Evan BiB → Larceny (wheated fork) → Elijah Craig — value to step-up on one campus.' },
      { heading: 'Wild Turkey ladder', body: '101 → Russell\'s 10 → Rare Breed — spice mellowed then returned at barrel proof.' },
      { heading: 'Old Forester ladder', body: '86 → 100 → 1920 — banana bread house DNA with rising heat.' },
    ],
    {
      relatedProducers: ['heaven-hill', 'wild-turkey', 'old-forester'],
      tryThis: {
        title: 'Pick one ladder',
        steps: ['Tasting Lab → Heaven Hill or Wild Turkey ladder.', 'Water only on highest proof pour.', 'Run matching grid preset.', 'Write one sentence: proof vs age on your palate.'],
        whatToNotice: 'Larceny fork teaches wheated within a house — not only mash bill across brands.',
      },
    },
  ),
  lesson(
    'ncf-and-texture',
    'NCF and mouthfeel',
    'Filtration changes texture — taste NCF craft against filtered majors.',
    'Describe mouthfeel difference between New Riff BiB and Michter\'s US*1 in one sentence.',
    [
      { heading: 'Chill filtration', body: 'Removes fatty compounds that can haze with ice — may trim mouthfeel. Michter\'s often filtered for polish; New Riff BiB often NCF for weight.' },
      { heading: 'Not morality', body: 'NCF is not automatically better — some palates prefer clean exit over oily weight. Notice preference, not forum dogma.' },
      { heading: 'Ice test optional', body: 'NCF bottles may cloud with ice — feature not flaw. Only run if you serve on rocks regularly.' },
    ],
    {
      tryThis: {
        title: 'NCF duel',
        steps: ['Tasting Lab → NCF craft duel.', 'Focus on finish length and palate weight.', 'Run ncf-three grid.', 'Note in journal — texture family word required.'],
        whatToNotice: 'Same proof, different weight — filtration may explain more than mash bill on some pours.',
      },
    },
  ),
  lesson(
    'tasting-journal-structure',
    'Tasting journal structure',
    'Repeatable note template — nose, palate, finish, context, one lesson.',
    'Write five entries using the same template; no entry uses "smooth" alone.',
    [
      { heading: 'Template', body: 'Date · Bottle · Proof · Serve (neat/rock/water) · Nose (one word) · Palate (two words) · Finish (length + word) · Context (alone/host/blind) · One lesson sentence.' },
      { heading: 'Portfolio link', body: 'Save to My Bourbon Shelf or Tasting Lab sessions — evidence beats memory when checkpoint time arrives.' },
      { heading: 'Community', body: 'Bourbon Circle weekly challenge: one new flavor word. Journal entries are portfolio artifacts, not diary fluff.' },
    ],
    {
      tryThis: {
        title: 'Five-entry streak',
        steps: ['Complete one Tasting Lab flight — save session.', 'Complete one Comparison Grid — save grid.', 'Write three additional single-pour entries from daily drinkers.', 'Review — circle your most-used flavor family.'],
        whatToNotice: 'Patterns reveal identity — spice chaser, wheated host, BiB value learner — before personalities quiz confirms.',
      },
    },
  ),
  lesson(
    'level-2-checkpoint',
    'Level 2 checkpoint — Confident Taster',
    'Submit proof you taste with structure and category literacy.',
    'Pass Level 2 with a comparison grid, five flavor words, and one category contrast paragraph.',
    [
      { heading: 'Requirements', body: '(1) Three saved Tasting Lab flights OR two flights + two comparison grids OR 6+ program weeks + 2 flights. (2) Five distinct flavor family words used correctly across notes. (3) One paragraph: high-rye vs wheated OR bourbon vs rye vs Tennessee. (4) One craft or finish flight completed. (5) Flavor wheel updated · palate journal has 3+ entries · optional: one blind session saved.' },
      { heading: 'Evidence to capture', body: 'Tasting Lab save screenshot or exported notes · Comparison grid winner + lesson · flavor wheel profile link · optional: photo of bagged blind pour.' },
      { heading: 'Unlocks', body: 'Level 3 Shelf Builder · pairing lab at Level 3 · Mission 2 prep · Bourbon Circle posting with vocabulary.' },
    ],
    {
      checkpoint: true,
      estimatedMinutes: 45,
      tryThis: {
        title: 'Checkpoint checklist',
        steps: ['Verify Tasting Lab history (2+ flights or 1 flight + 1 grid).', 'Write category contrast paragraph in journal.', 'Mark Level 2 complete in portfolio.', 'Post one note in Bourbon Circle with best new flavor word.'],
        whatToNotice: 'Checkpoint is evidence, not ego — $20 bottles count if notes are specific.',
      },
    },
  ),
  lesson(
    'house-universe-flights',
    'House universe flights',
    'Major campuses teach tier progression — same mash family, different age and proof.',
    'Run Buffalo Trace universe or Four Roses ladder and explain what changed between tiers.',
    [
      { heading: 'Buffalo Trace tree', body: 'BT → Eagle Rare → E.H. Taylor → Weller — allocation noise aside, the lesson is tier and age on one campus philosophy.' },
      { heading: 'Four Roses system', body: 'Yellow → Small Batch → Single Barrel — ten recipes hidden in blends; single barrel reveals one recipe personality.' },
      { heading: 'Avoid unicorn chasing', body: 'Universe flights work with shelf bottles — you do not need Pappy to learn wheated fork within BT.' },
    ],
    {
      relatedProducers: ['buffalo-trace', 'four-roses'],
      tryThis: {
        title: 'Pick one universe',
        steps: ['Tasting Lab → Buffalo Trace universe or Four Roses ladder.', 'Read label proof and age before nosing.', 'Run buffalo-universe-four grid if four bottles available.', 'Write one sentence: tier vs mash bill on your palate.'],
        whatToNotice: 'Weller fork is wheated within BT — compare to Maker\'s same night for wheat vs wheat across houses.',
      },
    },
  ),
  lesson(
    'age-vs-proof-debate',
    'Age vs proof debate',
    'Age statements and barrel proof both change the pour — learn which variable moved tonight.',
    'Score age-statement flight and write whether oak or heat drove your ranking.',
    [
      { heading: 'Age is not quality', body: 'Knob Creek 9 and Eagle Rare 10 teach stated age — Blue Run 8 shows craft age. NAS BT can beat over-oak on some palates.' },
      { heading: 'Proof density', body: 'Rare Breed at NAS may feel older than OF86 — heat and oak compete. Hold one variable when comparing age flight to proof ladder.' },
      { heading: 'Label literacy', body: 'Age statement is one data point — entry proof, warehouse, and filtration still matter after the number.' },
    ],
    {
      tryThis: {
        title: 'Age statement flight',
        steps: ['Tasting Lab → Age statement flight.', 'Run age-statement-four grid.', 'Compare winner to proof-ladder winner same week.', 'Journal: oak family word required on each pour.'],
        whatToNotice: 'Young craft with transparency can beat NAS majors — age worship is a common trap.',
      },
    },
  ),
  lesson(
    'blind-hosting-etiquette',
    'Blind hosting etiquette',
    'Hosts bag bottles — guests rank, you teach after the reveal.',
    'Run value four blind solo or host night blind five and save blind session evidence.',
    [
      { heading: 'Bag discipline', body: 'Number glasses — no label hints on table. Score before reveal. Flavor words only during tasting, brands after.' },
      { heading: 'Host posture', body: 'You take notes, not scores, when guests rank — humility training for the room, not performance for you.' },
      { heading: 'Reveal ritual', body: 'Reveal price after rank on value flights — winner buys next round story, not loser shame.' },
    ],
    {
      tryThis: {
        title: 'Value blind solo',
        steps: ['Open /bourbon/blind-flight → Value four blind.', 'Bag bottles — complete setup checklist.', 'Save blind session when ranks locked.', 'Optional: run host kit value showdown with friends.'],
        whatToNotice: 'Cheapest bottle winning is success — it means your palate is honest, not that expensive juice failed.',
      },
    },
  ),
  lesson(
    'splurge-worth-it-test',
    'Splurge worth-it test',
    'Splurge bottles must beat value on your palate — blind rank vs price order.',
    'Run splurge worth-it flight blind and justify #1 in one sentence if it costs more than $60.',
    [
      { heading: 'Splurge jury', body: 'Peerless, Blue Run 8, Eagle Rare vs BT — marketing cannot vote, only your rank.' },
      { heading: 'Shelf consequence', body: 'If splurge loses blind to BT, it is a occasion pour — not daily shelf. No shame — clarity is the win.' },
      { heading: 'Craft splurge', body: 'Craft transparency (age, proof, NCF) earns trust — still must beat value on taste.' },
    ],
    {
      tryThis: {
        title: 'Splurge blind',
        steps: ['Blind Flight → Craft splurge blind.', 'Tasting Lab → Splurge worth-it as visible prep.', 'Run splurge-craft-four grid.', 'Journal splurge paragraph for checkpoint.'],
        whatToNotice: 'Preference order vs price order divergence is the lesson — write both sequences before forgetting.',
      },
    },
  ),
  lesson(
    'host-night-checklist',
    'Host night checklist',
    'Pre-built host kits — skeptic three, mash bill education, value showdown, craft intro.',
    'Run one host kit end-to-end and mark complete — guests rank before you lecture.',
    [
      { heading: 'Kit selection', body: 'Skeptic three for "I hate whiskey" friends. Mash bill education when room is curious. Value showdown when budgets mix.' },
      { heading: 'Timing', body: '45–75 min — three to four pours max for first-timers. Dessert finish kit is post-dinner only.' },
      { heading: 'Avoid list', body: 'Each kit lists avoid traps — barrel proof openers, allocation flex, mash bill lecture before first sip.' },
    ],
    {
      tryThis: {
        title: 'Skeptic three tonight',
        steps: ['Open /bourbon/host-night → Skeptic three.', 'Follow flight order and talking points.', 'Mark host night complete.', 'Send one guest to Level 1 buy engine with their winner mash bill.'],
        whatToNotice: 'Host wins when someone says "I didn\'t know I liked that" — not when you name ten yeast strains.',
      },
    },
  ),
  lesson(
    'cocktail-pour-vs-neat',
    'Cocktail pour vs neat sip',
    'Some bottles earn shelf space for Manhattan duty — not neat score alone.',
    'Run cocktail vs sip flight and write which bottle earns which job.',
    [
      { heading: 'Role clarity', body: 'Rittenhouse BiB punches in cocktails; Michter\'s rye sips softer. Evan Black value neat; WT101 both.' },
      { heading: 'Neat first', body: 'Always score neat before mixing — you need baseline to assign cocktail role honestly.' },
      { heading: 'Shelf taxonomy', body: 'Level 3 shelf themes split sipper vs mixer — Level 2 teaches the question.' },
    ],
    {
      tryThis: {
        title: 'Cocktail three grid',
        steps: ['Tasting Lab → Cocktail vs sip flight.', 'Neat score all pours.', 'One Manhattan with Rittenhouse.', 'Run cocktail-three grid — note role column mentally.'],
        whatToNotice: 'BiB rye often loses neat battle but wins cocktail — both belong, different slots.',
      },
    },
  ),
  lesson(
    'flight-builder-discipline',
    'Flight builder discipline',
    'Build custom flights from catalog filters — one variable, your shelf reality.',
    'Use flight builder templates and pour a wheated or value-under-30 custom flight.',
    [
      { heading: 'Filter logic', body: 'Mash bill, category, tag, price band, proof band — stack filters until list is pourable in one evening.' },
      { heading: 'Templates', body: 'Wheated shelf, under $30, full craft, 100+ proof, rye category — starting points, not prescriptions.' },
      { heading: 'Variable lock', body: 'Custom flight still needs one lesson — do not change mash bill and proof and age same session.' },
    ],
    {
      tryThis: {
        title: 'Build one flight',
        steps: ['Open /bourbon/flight-builder.', 'Pick value-under-30 or wheated-shelf template.', 'Pour results — save Tasting Lab session if you map bottles manually.', 'Write one sentence: why this filter for your shelf gap.'],
        whatToNotice: 'Catalog filter reveals gaps — all wheated and you only own Maker\'s means buy engine homework.',
      },
    },
  ),
  lesson(
    'eight-week-program-overview',
    '8-week Confident Taster program',
    'Structured path — mash bill to host night to checkpoint in eight weeks.',
    'Complete week 1 homework and mark week complete — or jump to your confusion week.',
    [
      { heading: 'Program arc', body: 'Week 1 mash · 2 vocabulary · 3 category · 4 proof · 5 blind · 6 craft · 7 finish/splurge · 8 host + checkpoint.' },
      { heading: 'Flexible pace', body: 'One week per week is ideal — two weeks per module is fine. Mark weeks complete when homework done, not when calendar says.' },
      { heading: 'Evidence stack', body: 'Program weeks link flights, grids, blinds, host kits — progress dashboard shows completion.' },
    ],
    {
      tryThis: {
        title: 'Start week 1',
        steps: ['Open /bourbon/tasting-program.', 'Complete week 1 flight + grid.', 'One journal entry — wheated vs high-rye sentence.', 'Mark week 1 complete.'],
        whatToNotice: 'Week 5 blind humility is the hinge — skip early and category literacy stays theoretical.',
      },
    },
  ),
];
