/** Bourbon Academy — Level 1: Curious Drinker (full authored curriculum) */

import type { AcademyLesson } from './types';

export const BOURBON_LEVEL_1_LESSONS: AcademyLesson[] = [
  {
    level: 1,
    slug: 'what-bourbon-actually-is',
    title: 'What bourbon actually is',
    description:
      'The legal definition, what the label is telling you, and how bourbon fits inside the wider whiskey family — before you buy another bottle.',
    outcome:
      'Explain the five legal requirements for bourbon, read a label for proof and type, and tell someone the difference between “whiskey” and “bourbon.”',
    estimatedMinutes: 25,
    summary:
      'Bourbon is not a vibe or a marketing word — it is American whiskey that meets a specific federal standard. Once you know the rules, every label becomes readable instead of intimidating.',
    glossaryTerms: ['Mash bill', 'Kentucky straight bourbon', 'Proof', 'Straight whiskey', 'New charred oak'],
    sections: [
      {
        heading: 'The five legal requirements',
        body:
          'Under U.S. law, a spirit must meet all of these to be called bourbon: (1) made in the United States; (2) mash bill at least 51% corn; (3) distilled to no more than 160 proof (80% ABV); (4) entered into the barrel at no more than 125 proof; (5) aged in new, charred oak containers. No added flavoring or coloring. That last point matters — bourbon gets its color and most of its flavor from the barrel, not from caramel additive.',
      },
      {
        heading: 'What “straight bourbon” adds',
        body:
          '“Straight bourbon” means aged at least two years. If aged less than four years, the label must state age. Straight whiskey cannot contain added flavor or color. Many shelf staples — Jim Beam White Label, Evan Williams Black, Old Forester 86 — are straight bourbons. “Kentucky straight bourbon” additionally means distilled in Kentucky, though bourbon can legally be made anywhere in the U.S.',
      },
      {
        heading: 'Reading the label in 60 seconds',
        body:
          'Find four things: (1) proof or ABV — proof is twice the alcohol percentage (90 proof = 45% ABV); (2) “straight” or age statement if present; (3) “Bottled in bond” if present — that means one distilling season, one distiller, at least four years, 100 proof; (4) DSP number — the Distilled Spirits Plant ID that tells you who actually distilled the liquid (important when brands source whiskey). Ignore fancy words like “handcrafted” until the legal terms make sense.',
      },
      {
        heading: 'Whiskey is the family; bourbon is one member',
        body:
          'All bourbon is whiskey. Not all whiskey is bourbon. Rye whiskey (51%+ rye), Tennessee whiskey (charcoal filtered before barreling), corn whiskey (80%+ corn), scotch, and Irish whiskey each follow different rules. You will taste cousins in Level 2. For now: if it says bourbon on the label, the five rules above apply. If it only says whiskey, read closer — it may be a blend or a different category entirely.',
      },
      {
        heading: 'Why corn dominates the flavor',
        body:
          'Corn ferments into more fermentable sugar than rye or barley, which tends to produce a sweeter baseline spirit before the barrel ever touches it. That is why many bourbons show caramel, honey, and corn bread notes even at young ages. Rye in the mash bill adds spice; wheat adds softness. You will learn to taste those differences in the next lessons — but first understand that bourbon’s legal corn minimum shapes the whole category.',
      },
    ],
    historyNote: {
      heading: 'Why corn? (60-second history)',
      body:
        'Frontier distillers in Kentucky and surrounding states had abundant corn and limestone-filtered water that cleaned fermentation. After Prohibition destroyed most distilleries, the industry consolidated around consistent sour-mash bourbon production — corn-forward, oak-aged, repeatable. In 1964 Congress declared bourbon “America’s Native Spirit,” but the rules above are what actually protect you as a buyer. History explains the geography; the law explains the glass.',
    },
    tryThis: {
      title: 'Label scavenger hunt',
      steps: [
        'Take one bottle from your shelf (or a photo from a shop shelf online).',
        'Write down proof, whether it says straight, and any age statement.',
        'Search the brand + “DSP” if curious who distilled it.',
        'Say out loud: “This is bourbon because…” using at least two of the five legal rules.',
      ],
      whatToNotice:
        'Many popular bottles carry no age statement — that does not mean they are low quality; it means the blender is not guaranteeing a minimum age on the label.',
    },
  },
  {
    level: 1,
    slug: 'first-nosing-ritual',
    title: 'Your first nosing ritual',
    description:
      'How to smell bourbon without burning your nose, why glass shape matters, and the small physical habits that separate tasting from shot-taking.',
    outcome:
      'Demonstrate a repeatable nosing and sipping ritual; use water correctly; avoid the three words that kill tasting notes (“smooth,” “strong,” “good”).',
    estimatedMinutes: 20,
    summary:
      'Most beginners either gulp bourbon or inhale too hard and get nothing but alcohol burn. A short ritual — glass, distance, small sip, water — unlocks flavor your nose can already detect.',
    glossaryTerms: ['Nose', 'Glencairn', 'Neat', 'Palate', 'Finish'],
    sections: [
      {
        heading: 'Glassware: why it matters',
        body:
          'A Glencairn or other tulip-shaped tasting glass concentrates aroma toward your nose. A wide rocks glass spreads aroma away — fine for casual drinking, weaker for learning. A wine glass works in a pinch. For Level 1, use the smallest clean glass you have with a narrowing rim. Pour no more than ½ oz (about 1.5 cl) — you are evaluating, not finishing a pour.',
      },
      {
        heading: 'The nose: open mouth, short distance',
        body:
          'Hold the glass at chest level first. Bring it to your chin, not your nostril. With your mouth slightly open, sniff gently twice. Alcohol vapor hits your nose harder with a closed mouth. If you only smell burn, pull the glass back an inch and try again — or let it sit 60 seconds. Do not swirl aggressively on the first pass; you can swirl on the second sniff to wake up heavier aromas.',
      },
      {
        heading: 'The sip: small, chew, locate heat',
        body:
          'Take a small sip — enough to coat your tongue, not enough to swallow fire. Let it sit briefly; some tasters lightly “chew” to aerate. Notice sweetness on the tip, spice on the sides, oak and dryness toward the back. Swallow or spit (spitting is professional and valid when comparing many pours). Count how long flavor lingers — that is the finish.',
      },
      {
        heading: 'Water: one drop changes the equation',
        body:
          'Add one drop of still water (not ice yet) with a straw or dropper if you have one — or the smallest splash from a spoon. Nose again. Taste again. Water can release esters and reduce alcohol shock, revealing fruit or floral notes that heat hid. Some bottles open up dramatically; others barely change. Note the difference — this is real data about the pour.',
      },
      {
        heading: 'Words to retire',
        body:
          '“Smooth” describes texture without teaching you anything. “Strong” usually means high proof or alcohol burn — say the number instead (100 proof). “Good” is a verdict without evidence. Replace them with: one nose word (caramel, vanilla, cinnamon), one palate word (honey, pepper, oak), and finish length (short / medium / long). That is enough for Level 1.',
      },
    ],
    tryThis: {
      title: 'Two-sniff drill',
      steps: [
        'Pour ½ oz neat at room temperature.',
        'Sniff twice with mouth open — write the first word that arrives, even if it is “alcohol.”',
        'Wait 90 seconds. Sniff again after a gentle swirl.',
        'Sip once. Write nose / palate / finish in three short phrases.',
        'Add one drop of water. Repeat the three phrases.',
      ],
      whatToNotice:
        'If the second sniff after waiting is softer, your nose was overwhelmed at first — pace matters more than courage.',
    },
  },
  {
    level: 1,
    slug: 'three-pours-one-method',
    title: 'Three pours, one method',
    description:
      'Mission 1 prep: pick three bourbons in the $18–40 range, run the same ritual on each, and prepare to host one other person.',
    outcome:
      'Complete a structured three-pour lineup using identical note format; choose bottles with intentional variation; ready to run Mission 1: Host First Tasting.',
    estimatedMinutes: 45,
    recommendedMission: 'first-tasting',
    summary:
      'One bourbon teaches habit. Three bourbons teach comparison. Use the same method on each pour so differences pop — not your changing technique.',
    glossaryTerms: ['Mash bill', 'Wheated bourbon', 'High-rye bourbon', 'Proof'],
    sections: [
      {
        heading: 'Pick three with one variable in mind',
        body:
          'Choose three bottles between roughly $18 and $40. Start simple: (A) entry daily bourbon ~$20; (B) different mash tilt — wheated (softer, honey) OR high-rye (spicier); (C) step up ~$35–45 or higher proof. Examples people often find (swap for local availability): Evan Williams Black Label, Maker’s Mark, Wild Turkey 101. Names matter less than variation — if you cannot find these, match the roles, not the brands.',
      },
      {
        heading: 'Setup that respects the palate',
        body:
          'Line glasses in order A → B → C. Label paper underneath if needed. Same pour size each time (½ oz). Water cup and notebook ready. If hosting a guest, pour theirs after you demo the ritual once — teach by showing, not lecturing. Crackers or plain bread between pours optional; water is mandatory.',
      },
      {
        heading: 'The note template (use for all three)',
        body:
          'For each pour write: Bottle name · Proof · Nose (2–5 words) · Palate (2–5 words) · Finish (short/medium/long + one word) · Water drop change (yes/no + one word). Optional: rank 1–3 at the end. Identical format is what makes comparison honest.',
      },
      {
        heading: 'Order of pours',
        body:
          'Taste lowest proof to highest when possible — palate fatigue is real. If one bottle is cask strength, save it for last. Take notes before hearing a guest’s opinion — social bias is powerful. Reveal prices only after ranking if you want a humility lesson (optional for Mission 1).',
      },
      {
        heading: 'Hosting one person',
        body:
          'Your goal is not to impress — it is to give them a repeatable method. Walk through one pour completely: nose, sip, water, note. Let them do the second pour solo while you ask “what did you smell first?” Save the third for side-by-side ranking. A 60–90 minute session with conversation is normal.',
      },
    ],
    tryThis: {
      title: 'Mini flight tonight',
      steps: [
        'Buy or open three bourbons that fit slots A, B, and C above.',
        'Run the two-sniff drill from Lesson 1.2 on each.',
        'Fill the note template for all three.',
        'Pick a winner and write two sentences defending your choice — no “because it was smooth.”',
        'Schedule Mission 1 within seven days while memory is fresh.',
      ],
      whatToNotice:
        'The cheapest pour sometimes wins — that is a success, not a mistake. It means your palate works.',
    },
  },
  {
    level: 1,
    slug: 'flavor-words-that-mean-something',
    title: 'Flavor words that mean something',
    description:
      'Build a tasting vocabulary across sweet, oak, spice, fruit, and grain — the five families stewards actually use.',
    outcome:
      'Use at least five precise flavor words across three pours; map words to the flavor wheel; teach one word to someone else.',
    estimatedMinutes: 30,
    summary:
      'Flavor wheels are not decoration — they are shared language. When you say “caramel” and someone else says “caramel,” you are calibrating palates.',
    flavorWords: [
      'caramel',
      'vanilla',
      'honey',
      'cinnamon',
      'pepper',
      'oak',
      'corn bread',
      'cherry',
      'toffee',
      'leather',
    ],
    glossaryTerms: ['Nose', 'Palate', 'Finish', 'Wheated bourbon', 'High-rye bourbon'],
    sections: [
      {
        heading: 'Five families on the wheel',
        body:
          'Sweet (caramel, honey, vanilla, toffee, maple) · Oak (cedar, toasted nut, coconut from barrel toast, sawdust) · Spice (cinnamon, pepper, clove, rye spice) · Fruit (cherry, apple, orange peel, dried apricot — often from fermentation) · Grain (corn bread, wheat bread, cereal, malt). Most pours span two or three families. Your job is to name which dominate, not every possible note.',
      },
      {
        heading: 'Wheated vs high-rye in plain language',
        body:
          'Wheated bourbons replace rye with wheat in the mash bill — often softer, bread-and-honey on the palate (Maker’s Mark is the famous example). High-rye bourbons keep more rye — pepper and baking spice forward (Wild Turkey 101, many Four Roses recipes). When you taste Lesson 1.3’s three pours, tag each with wheated, balanced, or high-rye tilt if you know the mash bill — if not, tag spice level instead.',
      },
      {
        heading: 'Nose vs palate vs finish',
        body:
          'Nose is aroma only — sometimes chocolate on the nose, vanilla on the palate. Finish is after swallowing — oak and spice often show here even when the sip was sweet. Write separately; combining them hides what you learned.',
      },
      {
        heading: 'Building your personal word bank',
        body:
          'Pick three words you will use this week every time you taste: one sweet, one spice, one oak. Consistency beats poetry. Add one new word per week from the wheel until you have ten you trust. Cross out “smooth” on your notebook cover if you must.',
      },
      {
        heading: 'Teaching one word',
        body:
          'Explain “finish” to someone: “After you swallow, count how long flavor stays — short, medium, or long — and name the last flavor you notice.” That single lesson upgrades a beginner faster than a hour of brand history.',
      },
    ],
    tryThis: {
      title: 'Word lock exercise',
      steps: [
        'Open your three-pour notes from Lesson 1.3.',
        'Replace any vague word (“good,” “smooth,” “nice”) with a wheel family word.',
        'Add one word from a family you ignored (often fruit or grain).',
        'Read notes aloud — if a stranger would understand, you succeeded.',
        'Teach one word to a friend or voice memo yourself teaching it.',
      ],
      whatToNotice:
        'Notes feel shorter but clearer — that is the point. Stewards write less and mean more.',
    },
  },
  {
    level: 1,
    slug: 'level-1-checkpoint',
    title: 'Level 1 checkpoint — Curious Drinker',
    description:
      'Prove Level 1: one hosted or solo structured tasting, five flavor words, legal definition in your own voice, evidence in your journal.',
    outcome:
      'Complete the Curious Drinker checkpoint; submit evidence; unlock Level 2 and Mission 1 portfolio credit.',
    estimatedMinutes: 60,
    checkpoint: true,
    recommendedMission: 'first-tasting',
    summary:
      'You are not passing a quiz — you are submitting proof you can taste with structure and explain bourbon without reciting marketing.',
    sections: [
      {
        heading: 'Checkpoint requirements',
        body:
          'Complete all four: (1) Three-pour tasting using the Lesson 1.3 template — hosted for 1–2 people OR solo with voice memo walkthrough; (2) Written notes with nose, palate, finish on each pour; (3) Five distinct flavor words used correctly across notes; (4) One paragraph in your own words: “Bourbon is ___ because ___” citing at least three legal requirements.',
      },
      {
        heading: 'Evidence to capture',
        body:
          'Photo of lineup (labels visible or hidden — your choice) · tasting notes (photo or typed) · one reflection paragraph answering “Which pour won and what word was new?” · optional: 2-minute voice memo teaching the nosing ritual. Save to My Bourbon Journey or submit via Mission 1.',
      },
      {
        heading: 'Self-check before you claim Level 1',
        body:
          'Can you nose without burying your nose in the glass? Can you avoid “smooth”? Can you explain proof as a number? Can you name one way bourbon differs from rye? If yes to all four, you are ready for Level 2: Confident Taster — mash bills, proof comparisons, and your first rye side-by-side.',
      },
      {
        heading: 'What unlocks next',
        body:
          'Level 2 lessons: mash bill in your mouth, wheated vs high-rye tasting, rye and Tennessee whiskey as cousins, comparison grids. Tools: Flavor Wheel and Comparison Grid in Experiences. Community: share one note in Bourbon Circle with the weekly challenge flavor word.',
      },
    ],
    tryThis: {
      title: 'Run Mission 1 — Host First Tasting',
      steps: [
        'Open /bourbon/missions/first-tasting and follow the six loop steps.',
        'Use three bourbons from Lesson 1.3 roles.',
        'Submit lineup photo + notes + reflection.',
        'Mark Level 1 complete in your journal.',
        'Optional: post one note in Bourbon Circle.',
      ],
      whatToNotice:
        'Mission 1 is the capstone — if notes exist, you already passed the craft test. Everything else is vocabulary polish.',
    },
  },
];
