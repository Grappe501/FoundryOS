/** Bourbon Academy — Levels 2–7 authored curriculum (replaces templated buildAcademyLessons) */

import type { AcademyLesson } from './types';

function lesson(
  level: number,
  slug: string,
  title: string,
  description: string,
  outcome: string,
  sections: { heading: string; body: string }[],
  extra?: Partial<AcademyLesson>,
): AcademyLesson {
  return { level, slug, title, description, outcome, sections, estimatedMinutes: extra?.estimatedMinutes ?? 20, ...extra };
}

export const BOURBON_LEVELS_2_7_LESSONS: AcademyLesson[] = [
  // ── Level 2: Confident Taster ──
  lesson(2, 'mash-bill-in-the-mouth', 'Mash bill in your mouth', 'Translate grain recipes into flavor — high rye, wheated, and traditional corn-forward profiles.', 'Blind-identify wheated vs high-rye pours and name the grain driving each sensation.', [
    { heading: 'Three mash bill families', body: 'Traditional bourbon (~10–15% rye) reads corn-sweet with gentle spice. High-rye bourbon pushes pepper, mint, and fruit. Wheated bourbon replaces rye with wheat — softer, bread-and-honey texture. You do not need exact percentages to taste the fork.' },
    { heading: 'The two-bottle drill', body: 'Pour Maker\'s Mark (wheated) and Wild Turkey 101 (high-rye) at the same proof if possible. Nose both. The wheated pour collapses toward sweetness; the high-rye pour lifts spice on the finish. Write one word per pour that is not "smooth."' },
    { heading: 'Common trap', body: 'High-rye bourbon is not rye whiskey. Bulleit Bourbon feels spicy but is still corn-majority bourbon. Compare to Rittenhouse Rye in Level 2 lesson 3 for the legal line.' },
  ], { glossaryTerms: ['Mash bill', 'Wheated bourbon', 'High-rye bourbon'], relatedProducers: ['makers-mark', 'wild-turkey'] }),

  lesson(2, 'flavor-wheel-practice', 'Flavor wheel practice', 'Build a personal flavor vocabulary beyond "good" and "smooth."', 'Use five distinct flavor families in written notes: sweet, spice, fruit, oak, and texture.', [
    { heading: 'The five families', body: 'Sweet: caramel, honey, brown sugar. Spice: cinnamon, pepper, rye heat. Fruit: cherry, apple, banana esters. Oak: vanilla, tannin, sawdust. Texture: oily, thin, creamy, hot. Force every note into a family before you write it.' },
    { heading: 'Weekly challenge alignment', body: 'Bourbon Circle asks for one new flavor word per week. Pick from the wheel at /bourbon/experiences — link words to Atlas glossary terms so vocabulary sticks.' },
    { heading: 'Evidence habit', body: 'Photo your note card after each session. Three pours × three families = nine words minimum per tasting. That journal becomes Level 2 checkpoint proof.' },
  ], { glossaryTerms: ['Nose', 'Palate', 'Finish'] }),

  lesson(2, 'rye-and-tennessee-cousins', 'Rye and Tennessee as bourbon cousins', 'American whiskey categories share barrels but diverge on grain law and process.', 'Explain why rye whiskey and Tennessee whiskey are not bourbon labels despite similar shelves.', [
    { heading: 'Rye whiskey rules', body: '≥51% rye grain, new charred oak, same U.S. straight whiskey aging floor. Rittenhouse BiB and Wild Turkey Rye are textbook — compare to WT101 same night.' },
    { heading: 'Tennessee process', body: 'Jack Daniel\'s and George Dickel use charcoal mellowing before barreling. Mash may qualify as bourbon-class; label says Tennessee whiskey because of process + state identity.' },
    { heading: 'Category flight homework', body: 'Run the Foundry preset: Buffalo Trace + Rittenhouse Rye + Jack Daniel\'s No. 7. Same proof zone, three categories — write which grain or process drove each difference.' },
  ], { glossaryTerms: ['Rye whiskey', 'Tennessee whiskey'], relatedProducers: ['jack-daniel', 'heaven-hill'] }),

  lesson(2, 'comparison-grid-basics', 'Comparison grid basics', 'Hold one variable constant so your palate learns cause and effect.', 'Complete a three-pour grid with nose, palate, finish, and rank — one controlled variable.', [
    { heading: 'Pick the variable', body: 'Same distillery different proof. Same proof different mash bill. Same mash bill different age. Never change everything at once on your first grids.' },
    { heading: 'Grid columns', body: 'Nose · Palate · Finish length (short/medium/long) · Sweet vs spice balance · Score 1–10 · One sentence why. Five columns, three rows — fits one page.' },
    { heading: 'Tool link', body: 'Use /bourbon/compare presets or the Comparison Grid in Experiences. Export mental notes to My Bourbon Journey even if you do not screenshot.' },
  ]),

  lesson(2, 'level-2-checkpoint', 'Level 2 checkpoint — Confident Taster', 'Submit proof you taste with structure and category literacy.', 'Pass Level 2 with a comparison grid, five flavor words, and one category contrast paragraph.', [
    { heading: 'Requirements', body: '(1) Three-pour grid with one controlled variable. (2) Five flavor words from distinct families. (3) One paragraph: high-rye vs wheated OR bourbon vs rye vs Tennessee from your flight. (4) Two atlas producers explored beyond Level 1.' },
    { heading: 'Unlocks', body: 'Level 3 Shelf Builder lessons, Tasting Lab tools, and Mission 2 prep. Post one note in Bourbon Circle with your best new flavor word.' },
  ], { checkpoint: true, estimatedMinutes: 45 }),

  // ── Level 3: Shelf Builder ──
  lesson(3, 'shelf-themes-that-teach', 'Shelf themes that teach', 'Curate 5–8 bottles around a story — not random accumulation.', 'Write a one-sentence shelf theme and assign each bottle a role (daily, step-up, guest, experiment).', [
    { heading: 'Theme examples', body: 'Proof ladder (80 → 100 → barrel proof). Distillery tour (BT, HH, Beam). Mash bill education (wheated row + high-rye row). Under-$35 all-stars. Category flight (bourbon + rye + Tennessee).' },
    { heading: 'Role tags', body: 'Daily drinker · Host pour · Learning bottle · Splurge · Backup. Every bottle on your shelf should answer "why are you here?" in one phrase.' },
    { heading: 'Anti-pattern', body: 'Shelf of allocated trophies with no daily drinkers teaches markets, not palate. Include at least two wide-availability bottles in every theme.' },
  ], { recommendedMission: 'first-shelf' }),

  lesson(3, 'value-ladder-under-40', 'The under-$40 value ladder', 'Build expertise without hype tax — shelf staples that teach.', 'Stock four value-tier bottles that cover traditional, high-rye, wheated, and BiB transparency.', [
    { heading: 'The core four', body: 'Evan Williams Black (traditional value). Wild Turkey 101 (high-rye proof). Larceny or Maker\'s (wheated). Evan Williams White BiB or Old Overholt Rye BiB (bond transparency).' },
    { heading: 'Price is not quality', body: 'Blind these against $60 bottles — 101 often beats hype. Your shelf theme card should say what each teaches, not what each cost.' },
  ], { relatedProducers: ['heaven-hill', 'wild-turkey'] }),

  lesson(3, 'craft-vs-major-houses', 'Craft vs major houses on one shelf', 'Place New Riff or Wilderness Trail next to Buffalo Trace — compare process stories.', 'Explain grain-to-glass vs sourced juice using DSP and one craft + one major bottle from your shelf.', [
    { heading: 'What craft proves', body: 'Single-campus DSP, NCF choices, BiB discipline, sweet mash experiments. Craft teaches process literacy — not automatic superiority.' },
    { heading: 'What majors prove', body: 'Consistency at scale, blender skill, rickhouse systems. Buffalo Trace NAS is a masterclass in house style without age statements.' },
    { heading: 'Shelf layout tip', body: 'Dedicate one shelf zone to "same proof, different process" — e.g., 100 proof BiB row: New Riff, Wilderness Trail, Rittenhouse Rye.' },
  ], { relatedProducers: ['new-riff', 'wilderness-trail', 'buffalo-trace'] }),

  lesson(3, 'bib-on-the-shelf', 'Why BiB bottles anchor a shelf', 'Bottled-in-Bond as transparency shortcut when age statements disappear.', 'Place two BiB bottles on your shelf and explain bond rules to a beginner in plain language.', [
    { heading: 'Bond rules recap', body: 'One distilling season · one distiller · 4+ years · 100 proof. Evan Williams White Label BiB and Rittenhouse Rye BiB are under-$30 anchors.' },
    { heading: 'When to reach for BiB', body: 'When you want proof and age floor without NDP mystery. BiB is not "best" — it is legally specific.' },
  ], { glossaryTerms: ['Bottled in bond'] }),

  lesson(3, 'level-3-checkpoint', 'Level 3 checkpoint — Shelf Builder', 'Photograph your themed shelf and defend every bottle\'s role.', 'Complete Mission 2 evidence: shelf photo, theme statement, gift recommendation.', [
    { heading: 'Requirements', body: '5–8 bottles · written theme · one bottle you would gift with three-sentence rationale · photo with labels visible · gap analysis ("what bottle fills my next slot?").' },
    { heading: 'Mission link', body: 'Open /bourbon/missions/first-shelf and submit evidence to My Bourbon Journey. Unlock Level 4 Connoisseur path.' },
  ], { checkpoint: true, recommendedMission: 'first-shelf', estimatedMinutes: 60 }),

  // ── Level 4: Connoisseur ──
  lesson(4, 'kentucky-vs-beyond', 'Kentucky vs beyond — region literacy', 'Most shelf bourbon is Kentucky — know what geography actually changes.', 'Name three non-flavor reasons Kentucky dominates and one thing region does not guarantee.', [
    { heading: 'Why Kentucky', body: 'Limestone water · climate swings · legacy infrastructure · blender talent density. Region explains supply, not automatic quality.' },
    { heading: 'Beyond KY', body: 'Tennessee (charcoal process). Indiana MGP sourced profiles. Texas, Colorado craft — different climate aging experiments. Read DSP, not just state romance.' },
  ], { glossaryTerms: ['Kentucky straight bourbon', 'DSP number'] }),

  lesson(4, 'dsp-sourcing-literacy', 'DSP and sourcing literacy', 'Read the fine print — who distilled vs who bottled.', 'Find DSP on two bottles and explain whether each is grain-to-glass or sourced.', [
    { heading: 'Label archaeology', body: 'Back label fine print: "Distilled in Kentucky" + DSP-KY-###. Match DSP to producer atlas. Mismatch between brand story and DSP is data, not scandal.' },
    { heading: 'Detective link', body: 'Work cases "DSP numbers" and "Craft marketing truth" at /bourbon/detective — then verify with bottles on your shelf.' },
  ], { relatedProducers: ['four-roses', 'bardstown'] }),

  lesson(4, 'single-barrel-variance', 'Single barrel variance', 'One recipe, many personalities — why picks matter.', 'Compare standard expression vs single barrel (or store pick) from the same house if available.', [
    { heading: 'What changes', body: 'One barrel · one floor · one season. Four Roses Single Barrel vs Yellow Label is the textbook — same campus, different selection philosophy.' },
    { heading: 'Store pick preview', body: 'Level 5 blind work builds on this — for now, taste one single barrel and write how it diverged from the standard bottling.' },
  ], { glossaryTerms: ['Single barrel', 'Small batch'], relatedProducers: ['four-roses'] }),

  lesson(4, 'compare-five-mission-prep', 'Compare Five mission prep', 'Structured five-bottle comparison — hold one variable sacred.', 'Plan a five-bottle flight with hypothesis before pouring.', [
    { heading: 'Preset starting points', body: 'Use Foundry compare presets: daily under $35, wheated showdown, category flight, age flight. Customize one slot to your shelf gap.' },
    { heading: 'Hypothesis first', body: 'Write: "I expect ___ to win because ___." Reveal rankings, then check bias. Mission 3 grid is your evidence template.' },
  ], { recommendedMission: 'compare-five' }),

  lesson(4, 'level-4-checkpoint', 'Level 4 checkpoint — Connoisseur', 'Run Compare Five and defend your top pick with process vocabulary.', 'Complete five-bottle grid + DSP scavenger hunt + one single-barrel note.', [
    { heading: 'Requirements', body: 'Five-pour comparison grid · top pick defended in three sentences · DSP identified on two bottles · one producer atlas deep dive completed · Mission 3 evidence optional but recommended.' },
  ], { checkpoint: true, recommendedMission: 'compare-five', estimatedMinutes: 90 }),

  // ── Level 5: Tasting Host ──
  lesson(5, 'blind-protocol-design', 'Blind protocol design', 'Remove label bias — bag, number, score, reveal.', 'Design a blind flight for two guests with anonymous score cards.', [
    { heading: 'Equipment', body: 'Paper bags or foil · numbered tags · identical pour volume (½ oz) · water · spit cup optional · reveal sheet hidden until scores locked.' },
    { heading: 'Ethics', body: 'No hints from pour color alone — match proof bands when possible. Host participates blind too — credibility matters.' },
  ], { glossaryTerms: ['Blind tasting'] }),

  lesson(5, 'hosting-without-gatekeeping', 'Hosting without gatekeeping', 'Teach one technique per guest — never humiliate a beginner palate.', 'Host a three-pour session where every guest submits one written note.', [
    { heading: 'Opening script', body: '"There are no wrong notes — only vague ones. Pick one smell word and one taste word per pour." Demonstrate nosing distance.' },
    { heading: 'Forbidden words', body: 'Ban "smooth," "strong," and "good" for the night — replace with family words from Level 2 wheel.' },
  ]),

  lesson(5, 'price-and-hype-bias', 'Price and hype bias', 'Why expensive bottles lose blind nights — and why that is good news.', 'Run one blind pour where price order differs from rank order and write what changed after reveal.', [
    { heading: 'Bias sources', body: 'Label recognition · pour cost · friend hype · allocated status. Blind removes half the stack — humility is the lesson.' },
    { heading: 'Detective tie-in', body: 'Read "Allocated worth it?" and "Secondary market math" before your next host night — conversation fuel, not sermon.' },
  ]),

  lesson(5, 'water-and-proof-hosting', 'Water and proof at the table', 'Teach additive water as tool — not weakness.', 'Demonstrate one high-proof pour neat vs one drop of water for guests.', [
    { heading: 'When to add water', body: '100+ proof · barrel proof · first-time drinkers on heat-sensitive pours. One drop, re-nose, re-taste — collective "aha" moment.' },
    { heading: 'When to stay neat', body: 'Comparison grids at matched proof — keep variables clean. Blind nights can include one water round after initial scores.' },
  ], { glossaryTerms: ['Proof', 'Barrel proof'] }),

  lesson(5, 'level-5-checkpoint', 'Level 5 checkpoint — Tasting Host', 'Run Blind Tasting Night with evidence.', 'Complete Mission 4: anonymous scores, reveal surprise, one guest taught a technique.', [
    { heading: 'Requirements', body: '2+ participants · numbered pours · score cards · reveal photo or summary · biggest surprise paragraph · one technique taught (document in journal).' },
  ], { checkpoint: true, recommendedMission: 'blind-tasting', estimatedMinutes: 120 }),

  // ── Level 6: Distillery Traveler ──
  lesson(6, 'campus-tour-literacy', 'Campus tour literacy', 'Map still, rickhouse, bottling — connect place to pour.', 'Complete one virtual or in-person tour and label five process steps.', [
    { heading: 'Campus maps tool', body: 'Use /bourbon/campus — click rickhouse, still, bottling on Buffalo Trace, Wild Turkey, or Jack Daniel\'s maps. Write why each stop matters before your visit.' },
    { heading: 'Tour questions', body: 'Ask guides: entry proof? Rickhouse floors? Sour vs sweet mash? NCF? Most love curious questions — not allocation gossip.' },
  ], { relatedProducers: ['buffalo-trace', 'jack-daniel'] }),

  lesson(6, 'fermentation-to-still', 'From fermentation to still', 'Where flavor is born before oak — cook, ferment, distillation cuts.', 'Trace grain → cook → ferment → hearts cut in one paragraph.', [
    { heading: 'Fermentation flavor', body: 'Longer ferment · house yeast · sour mash backset — each shifts esters. Banana notes on Old Forester tie to yeast and ferment, not barrel alone.' },
    { heading: 'Still type', body: 'Column = volume and clean hearts. Pot component = weight and texture. Woodford\'s pot still story matches heavier mouthfeel.' },
  ], { glossaryTerms: ['Sour mash', 'Fermentation', 'Hearts cut'] }),

  lesson(6, 'rickhouse-microclimate', 'Rickhouse microclimate', 'Heat rises — floor position is a hidden variable in every barrel.', 'Explain top vs bottom floor aging and link to one Detective case.', [
    { heading: 'Angel\'s share by floor', body: 'Top floors lose more volume, extract faster, often run hotter flavor. Single barrel picks are warehouse position bets.' },
    { heading: 'Campus tie-in', body: 'Revisit campus map rickhouse pins — Heaven Hill rows vs BT experimental warehouses tell different lottery stories.' },
  ], { glossaryTerms: ['Rickhouse', 'Angel\'s share'] }),

  lesson(6, 'tennessee-charcoal-floor', 'Tennessee charcoal on the floor', 'Lincoln County Process — see it on tour or video, taste it blind.', 'Describe charcoal mellowing and compare Jack vs Dickel at equal proof.', [
    { heading: 'Process not poetry', body: 'Charcoal vats filter new make before barrel — softens harshness, shifts banana and caramel balance. Mash may be bourbon-class; label reflects process.' },
    { heading: 'Homework', body: 'Pour Jack No. 7 vs George Dickel No. 8 vs Buffalo Trace — three categories, one proof band, one page of notes.' },
  ], { relatedProducers: ['jack-daniel', 'george-dickel'] }),

  lesson(6, 'level-6-checkpoint', 'Level 6 checkpoint — Distillery Traveler', 'Visit or virtual tour with process evidence.', 'Complete Mission 5 notes: five process steps, one insight that changed tasting.', [
    { heading: 'Requirements', body: 'Tour evidence (photos or virtual notes) · grain-to-glass diagram · one campus map explored · one process insight applied to your next pour · Mission 5 submission.' },
  ], { checkpoint: true, recommendedMission: 'distillery-visit', estimatedMinutes: 180 }),

  // ── Level 7: Bourbon Steward ──
  lesson(7, 'steward-teaching-loop', 'The steward teaching loop', 'Teach tastings, mentor newcomers, model humility when hype loses blind.', 'Guide one Curious Member through first nosing ritual and review their notes.', [
    { heading: 'Steward responsibilities', body: 'Monthly office hours in Bourbon Circle · review first-tasting evidence · suggest one upgrade (glass, grid, water technique) · invite to themed months.' },
    { heading: 'Teaching one technique', body: 'Pick nosing distance OR water addition OR flavor wheel — teach it in five minutes, watch them repeat, correct once, praise specificity.' },
    { heading: 'Humility protocol', body: 'When your expensive bottle loses blind, say so publicly — stewards earn trust by celebrating palate truth over shelf flex.' },
  ], { estimatedMinutes: 30 }),

  lesson(7, 'level-7-steward-checkpoint', 'Level 7 checkpoint — Bourbon Steward', 'Demonstrate mentorship and full loop completion.', 'Complete steward checklist: mentor session, themed host night, community contribution.', [
    { heading: 'Steward requirements', body: '(1) Mentor one member through Level 1 nosing ritual. (2) Host one themed night (wheated, BiB, category flight, or value blind). (3) Post shelf showcase or trip report with teaching intent. (4) Answer one Detective-style question for a beginner in Circle.' },
    { heading: 'What stewards unlock', body: 'Bourbon Circle mentorship role · portfolio steward badge · permission to set monthly themes — not gatekeeping, teaching.' },
  ], { checkpoint: true, estimatedMinutes: 60 }),
];
