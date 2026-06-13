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
      { heading: 'Bond rules recap', body: 'One distilling season · one distiller · 4+ years · 100 proof. Evan Williams White BiB, Rittenhouse Rye BiB, Old Overholt BiB — under-$30 anchors.' },
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
      { heading: 'Requirements', body: '(1) Two saved Tasting Lab flights OR one flight + one comparison grid. (2) Five distinct flavor family words used correctly across notes. (3) One paragraph: high-rye vs wheated OR bourbon vs rye vs Tennessee. (4) Two atlas producers explored beyond Level 1. (5) Flavor wheel updated at least once.' },
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
];
