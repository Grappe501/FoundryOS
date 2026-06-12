/** PASS-025 — Bourbon world depth bundle */

import { buildAcademyLessons } from '../build-academy';
import { buildGlossary } from '../build-glossary';
import { BOURBON_LEVEL_1_LESSONS } from '../bourbon-academy-level-1';
import type { WorldDepthBundle } from '../types';
import { BOURBON_ACADEMY_LEVELS } from '../../bourbon-world';

const academyLevels = BOURBON_ACADEMY_LEVELS.map((l) => ({
  level: l.level,
  title: l.title,
  tagline: l.tagline,
  missionSlug:
    l.level === 1
      ? 'first-tasting'
      : l.level === 3
        ? 'first-shelf'
        : l.level === 4
          ? 'compare-five'
          : l.level === 5
            ? 'blind-tasting'
            : l.level === 6
              ? 'distillery-visit'
              : undefined,
}));

const levelsTwoThroughSeven = academyLevels.filter((l) => l.level > 1);
const templatedUpperLessons = buildAcademyLessons(levelsTwoThroughSeven, 'Bourbon');

export const BOURBON_DEPTH: WorldDepthBundle = {
  slug: 'bourbon',
  displayName: 'Bourbon World',
  accentColor: '#C8A96E',
  portfolioLabel: 'My Bourbon Journal',

  academyLessons: [...BOURBON_LEVEL_1_LESSONS, ...templatedUpperLessons],

  academyLevelMeta: BOURBON_ACADEMY_LEVELS.map((l) => ({
    level: l.level,
    title: l.title,
    tagline: l.tagline,
  })),

  glossary: buildGlossary([
    ['Mash bill', 'The grain recipe used to make whiskey — corn must be at least 51% for bourbon.', 'Flavor profile starts here; high rye tastes spicier, wheated tastes softer.', 'Buffalo Trace uses a low-rye mash bill; Four Roses uses multiple recipes.', ['High-rye bourbon', 'Wheated bourbon']],
    ['Proof', 'Twice the alcohol by volume — 100 proof equals 50% ABV.', 'Higher proof carries more flavor intensity and burns more on the finish.', 'A 90-proof pour feels gentler than a 115-proof barrel pick.', ['Barrel proof', 'Bottling proof']],
    ['Rickhouse', 'A warehouse where bourbon barrels age, often many stories tall.', 'Temperature swings drive barrel interaction — upper floors age faster.', 'Angel\'s share is highest on hot upper ricks in Kentucky summers.', ['Angel\'s share', 'Cooperage']],
    ['Barrel char', 'The layer of burnt wood inside a new oak barrel that filters and flavors spirit.', 'Char level affects color, vanilla notes, and caramel extraction.', 'Level 3 char is common; deeper char can add smoke and spice.', ['Charring', 'New charred oak']],
    ['Angel\'s share', 'Whiskey lost to evaporation during aging — roughly 2–4% per year.', 'Explains why older bottles cost more and why rickhouse humidity matters.', 'A 12-year bourbon may lose a quarter of its volume to the angels.', ['Rickhouse', 'Age statement']],
    ['Wheated bourbon', 'Bourbon that replaces rye with wheat as the flavor grain.', 'Tends toward soft, bread-and-honey notes instead of pepper.', 'Maker\'s Mark and Weller are classic wheated examples.', ['Mash bill', 'High-rye bourbon']],
    ['High-rye bourbon', 'Bourbon with a larger rye percentage in the mash bill.', 'Delivers spice, mint, and pepper on the palate.', 'Four Roses Single Barrel and Old Forester 100 often read high-rye.', ['Mash bill', 'Wheated bourbon']],
    ['Single barrel', 'Bottled from one barrel instead of a blend of many.', 'Each barrel varies — one pick may be stellar, another merely good.', 'Store picks are often single barrels chosen by a buyer.', ['Small batch', 'Barrel proof']],
    ['Small batch', 'A blend of a modest number of barrels selected for consistency.', 'More uniform flavor than single barrel while keeping character.', 'Knob Creek Small Batch blends barrels for a house style.', ['Single barrel', 'Blending']],
    ['Bottled in bond', 'US legal category: one distiller, one season, aged 4+ years, 100 proof.', 'A quality baseline — no mystery sourcing or watered-down proof.', 'Old Grand-Dad Bonded is a widely available example.', ['Proof', 'DSP number']],
    ['Distillation proof', 'Strength of spirit coming off the still before barreling.', 'Higher distillation can mean lighter, cleaner new make.', 'Many bourbons enter the barrel around 125 proof after distillation.', ['Entry proof', 'Hearts cut']],
    ['Entry proof', 'Proof when new make whiskey goes into the barrel.', 'Lower entry can extract more flavor; higher entry can age slower and cleaner.', 'Buffalo Trace often enters around 125 proof; some craft distillers go lower.', ['Distillation proof', 'Barrel char']],
    ['Charring', 'Burning the inside of a barrel to create char and open wood pores.', 'Activates lignin and hemicellulose for vanilla and caramel.', 'Coopers flame the staves before assembly or burn assembled barrels.', ['Barrel char', 'Cooperage']],
    ['Kentucky straight bourbon', 'Bourbon distilled in Kentucky, aged 2+ years in new charred oak.', 'Kentucky dominates production due to limestone water and climate.', 'Most shelf staples like Jim Beam and Wild Turkey fit this label.', ['Straight whiskey', 'Mash bill']],
    ['Corn whiskey', 'At least 80% corn; can be unaged or aged — not the same as bourbon.', 'Understanding the line helps decode labels and flavor expectations.', 'Mellow Corn is a known unaged corn whiskey; bourbon requires 51% corn minimum.', ['Mash bill', 'Kentucky straight bourbon']],
    ['Rye whiskey', 'At least 51% rye — spicier cousin to bourbon, not bourbon itself.', 'Helps tasters compare spice-forward American whiskeys.', 'Rittenhouse Rye and Wild Turkey Rye sit beside bourbon on many shelves.', ['High-rye bourbon', 'Mash bill']],
    ['Sour mash', 'Using spent mash from a prior batch to start fermentation.', 'Controls pH and consistency — standard in large Kentucky distilleries.', 'Jim Beam and most major bourbon brands use sour mash.', ['Sweet mash', 'Fermentation']],
    ['Sweet mash', 'Fermentation started with fresh yeast and grain only — no backset.', 'Can produce bolder, funkier flavors in craft settings.', 'Some newer craft distillers highlight sweet mash on the label.', ['Sour mash', 'Yeast strain']],
    ['Fermentation', 'Converting grain sugars to alcohol using yeast before distillation.', 'Longer ferments can develop fruity, estery notes in the beer.', 'A 72-hour ferment differs noticeably from a rushed 48-hour run.', ['Yeast strain', 'Sour mash']],
    ['Yeast strain', 'The specific yeast culture used during fermentation.', 'House yeast is a secret weapon — flavor signatures often trace here.', 'Heaven Hill and Wild Turkey guard proprietary yeast lines.', ['Fermentation', 'Congener']],
    ['Pot still', 'Batch distillation in a copper pot — often heavier, richer spirit.', 'Some bourbons use pot still components for texture.', 'Woodford Reserve highlights pot still heritage in marketing.', ['Column still', 'Distillation proof']],
    ['Column still', 'Continuous distillation — efficient, high-proof, clean new make.', 'Most bourbon volume runs through column stills or hybrids.', 'Column distillation enables the scale of major Kentucky plants.', ['Pot still', 'Hearts cut']],
    ['New charred oak', 'Legal requirement for bourbon barrels — virgin American oak, charred inside.', 'Defines bourbon\'s vanilla, caramel, and oak backbone.', 'Reuse barrels go to scotch or rum — bourbon barrels are one-time use.', ['Barrel char', 'Cooperage']],
    ['Age statement', 'Label claim of youngest whiskey in the bottle.', 'Transparency about maturity — older is not always better.', 'Eagle Rare 10 carries an age statement; many NAS bottles do not.', ['Non-age stated', 'Angel\'s share']],
    ['Non-age stated (NAS)', 'No age printed — youngest whiskey may be minimum legal age.', 'Lets blenders maintain flavor when stocks run short.', 'Buffalo Trace flagship has no age statement but consistent profile.', ['Age statement', 'Blending']],
    ['Cask strength', 'Bottled at barrel proof without adding water to standard proof.', 'Full intensity — flavor and heat uncut.', 'Booker\'s and many store picks release at cask strength.', ['Barrel proof', 'Proof']],
    ['Chill filtration', 'Cold-filtering whiskey to remove fatty compounds before bottling.', 'Prevents cloudiness when chilled — may strip some mouthfeel.', 'Many premium bourbons advertise non-chill filtered instead.', ['Non-chill filtered', 'Mouthfeel']],
    ['Non-chill filtered', 'Skipped chill filtration — may haze when iced but retains texture.', 'Enthusiasts often prefer richer mouthfeel and fuller flavor.', 'Four Roses Single Barrel and many craft releases skip chill filtering.', ['Chill filtration', 'Cask strength']],
    ['Nose', 'Aroma perceived before tasting — often half the experience.', 'Training your nose speeds up flavor identification.', 'Cinnamon, caramel, and oak on the nose often preview the palate.', ['Palate', 'Glencairn']],
    ['Palate', 'Flavors and mouthfeel while the whiskey is on your tongue.', 'Where sweetness, spice, and oak balance become clear.', 'A wheated bourbon palate may show honey; high rye shows pepper.', ['Nose', 'Finish']],
    ['Finish', 'Flavors that linger after swallowing — short, medium, or long.', 'Separates memorable pours from forgettable ones.', 'A long vanilla-and-oak finish suggests quality barrel integration.', ['Palate', 'Neat']],
    ['Glencairn', 'Tulip-shaped tasting glass that concentrates aromas.', 'Better nosing than a rocks glass for serious tasting.', 'Use at tastings to compare three bourbons side by side.', ['Neat', 'Nose']],
    ['Neat', 'Whiskey served alone at room temperature — no ice or mixers.', 'Reveals true character for evaluation and comparison.', 'Mission 1 tastings use neat pours with water on the side.', ['On the rocks', 'Proof']],
    ['On the rocks', 'Served over ice — dilution and chill change the experience.', 'Fine for casual drinking; less ideal for blind comparison.', 'Large ice melts slower and dilutes less aggressively.', ['Neat', 'Chill filtration']],
    ['Tennessee whiskey', 'Filtered through charcoal (Lincoln County Process) before barreling — not bourbon.', 'Explains why Jack Daniel\'s is not labeled bourbon despite corn mash.', 'George Dickel also uses charcoal mellowing.', ['Kentucky straight bourbon', 'Charcoal mellowing']],
    ['Straight whiskey', 'Aged at least two years; no added flavoring or coloring.', 'Legal term that signals minimum maturation standards.', 'Straight bourbon must meet bourbon grain rules plus aging.', ['Age statement', 'Bottled in bond']],
    ['Blending', 'Combining barrels to hit a consistent flavor target.', 'Master blenders are the unsung architects of house style.', 'Small batch is blending with a lighter touch than massive vats.', ['Small batch', 'Single barrel']],
    ['Master distiller', 'Lead craftsman overseeing production and quality.', 'Their palate sets the brand\'s direction for decades.', 'Jimmy Russell (Wild Turkey) and Chris Morris (Woodford) are legends.', ['Blending', 'DSP number']],
    ['DSP number', 'Distilled Spirits Plant ID assigned by the TTB.', 'Traces who actually made the liquid — important for sourced whiskey.', 'DSP-KY-1 appears on many Buffalo Trace labels.', ['Bottled in bond', 'Sourcing']],
    ['Bottling proof', 'Final ABV in the bottle after any proofing with water.', 'Distillers cut barrel proof down for balance and approachability.', 'Eagle Rare 90 is bottled lower than many barrel picks at 120+.', ['Proof', 'Cask strength']],
    ['Congener', 'Flavor compounds beyond ethanol — esters, aldehydes, fusel oils.', 'Congeners create character; distillation cuts control their balance.', 'Heavier congener profile often reads as richer on the palate.', ['Hearts cut', 'Fermentation']],
    ['Hearts cut', 'The middle fraction of distillation kept for whiskey — between heads and tails.', 'Only the hearts become bourbon; heads and tails are discarded or recycled.', 'Skillful cuts separate harsh from harmonious spirit.', ['Heads', 'Tails']],
    ['Heads', 'First volatile fraction off the still — often solvent-like.', 'Improper inclusion makes whiskey harsh.', 'Experienced still operators know when to switch from heads to hearts.', ['Hearts cut', 'Tails']],
    ['Tails', 'Final fraction — heavier, oily, sometimes soapy notes.', 'Too much tail in hearts ruins the batch.', 'Cut points define house character as much as mash bill.', ['Hearts cut', 'Heads']],
    ['Cooperage', 'The craft and industry of making whiskey barrels.', 'Oak species, stave size, and toast level all matter.', 'Independent cooperages supply most major distilleries.', ['Stave', 'Barrel char']],
    ['Stave', 'Individual curved oak plank forming a barrel.', 'Grain direction and seasoning time affect leak rate and flavor.', 'Air-seasoned staves for 12+ months are preferred over kiln-dried.', ['Cooperage', 'Toasting']],
    ['Toasting', 'Heating barrel staves before charring — develops coconut and almond notes.', 'Toast plus char layers complexity beyond char alone.', 'Many barrels are toasted then charred for bourbon.', ['Charring', 'Cooperage']],
    ['Store pick', 'Single barrel selected by a retailer for exclusive bottling.', 'Community events around picks build local bourbon culture.', 'A liquor store pick of Eagle Rare can differ wildly from another store.', ['Single barrel', 'Barrel proof']],
    ['Barrel proof', 'Strength of whiskey inside the barrel — often higher than bottling proof.', 'Many enthusiasts chase barrel proof for unfiltered intensity.', 'Stagg Jr. (now Stagg) showcases barrel proof hype.', ['Cask strength', 'Proof']],
    ['Blind tasting', 'Samples served without revealing labels until after scoring.', 'Removes price and hype bias from judgment.', 'Mission 4 centers on numbered bags and anonymous score cards.', ['Single barrel', 'Glencairn']],
  ]),

  community: {
    name: 'Bourbon Circle',
    memberRoles: [
      { role: 'Curious Member', description: 'New to bourbon — completes first tasting, asks questions, shares beginner notes.' },
      { role: 'Regular Taster', description: 'Hosts small tastings, maintains a journal, compares pours with structure.' },
      { role: 'Shelf Curator', description: 'Documents collection themes, recommends bottles, leads shelf showcase threads.' },
      { role: 'Bourbon Steward', description: 'Mentors newcomers, sets monthly themes, moderates blind nights and trip reports.' },
    ],
    weeklyChallenge: 'Post one tasting note with nose, palate, finish, and one flavor word you had never used before.',
    showcaseFormat: 'Shelf Snapshot — photo plus a 3-sentence theme statement (daily drinkers, proof ladder, distillery tour, etc.).',
    peerFeedbackLoop: 'Members reply with one thoughtful question and one suggestion — never gatekeeping, always teaching.',
    mentorRole: 'Bourbon Stewards host monthly office hours, review first-tasting evidence, and invite members to blind nights.',
  },

  parent: {
    headline: 'What your teen builds in Bourbon World',
    oneLiner: 'Structured appreciation — tastings, notes, and hospitality — not drinking for its own sake.',
    whyItMatters: 'Bourbon World teaches sensory attention, curation, hosting, and honest judgment. Those skills show up in school projects, job interviews, and how they treat guests at your table.',
    whatTheyBuild: 'A bourbon journal with tasting notes, a curated shelf story, blind tasting events, and optional distillery field notes — all documented as evidence of growing craft literacy.',
    skillsDemonstrated: [
      'Structured observation (nose, palate, finish)',
      'Comparison thinking and bias awareness',
      'Collection curation with intentional themes',
      'Event hosting and guest hospitality',
      'Teaching fundamentals to beginners',
      'Reflective writing and palate vocabulary',
    ],
    howProgressMeasured: 'Academy level checkpoints, completed missions with photo and note evidence, community showcases, and steward mentorship milestones — not bottle count.',
    successAfter30Days: 'They can host a three-pour tasting for family or friends, explain what bourbon legally is, maintain a journal with five-plus entries, and recommend a starter bottle under $35 with reasons.',
    sections: [
      {
        title: 'Safety and family context',
        body: 'Foundry assumes legal drinking age for consumption missions. Parents can co-host tastings, focus on smell-only exercises for younger learners, or treat the world as production-and-culture study with virtual distillery tours. The skills — attention, hosting, writing — transfer regardless.',
      },
      {
        title: 'What evidence looks like',
        body: 'You will see tasting note screenshots, shelf photos with theme cards, blind ranking sheets, and short reflection paragraphs. Each mission specifies evidence so progress is visible without guesswork.',
      },
      {
        title: 'How mentorship works',
        body: 'Bourbon Stewards in the Circle comment on first missions, suggest one upgrade (glassware, note template, or water technique), and invite members to themed months like high-rye February or budget blind summer.',
      },
      {
        title: 'Connection to real life',
        body: 'Blind protocols build humility. Shelf curation builds identity awareness. Distillery visits connect place to product. These are life skills dressed in bourbon language.',
      },
    ],
  },

  seoGuides: [
    {
      slug: 'what-is',
      title: 'What Is Bourbon World?',
      summary: 'A structured path from curious drinker to Bourbon Steward — tastings, shelves, blind nights, and distillery literacy.',
      sections: [
        { heading: 'More than a whiskey hobby', body: 'Bourbon World is a transformation loop: pick a mission, build a real experience, show your work, reflect, improve, and mentor. You are not collecting bottles for flex — you are learning to taste with intention, host with generosity, and teach without jargon.' },
        { heading: 'Seven academy levels', body: 'From Curious Drinker through Bourbon Steward, each level unlocks skills and optional missions. Five core missions anchor the journey: first tasting, first shelf, compare five, blind night, and distillery visit.' },
        { heading: 'Who it is for', body: 'Adults exploring American whiskey, hosts who want better dinner parties, travelers planning Kentucky trips, and parents supporting a disciplined hobby. No hype chase required — $20 bottles welcome.' },
      ],
    },
    {
      slug: 'beginner-guide',
      title: 'Beginner Guide to Bourbon World',
      summary: 'Start with three bottles, one notebook, and Mission 1 — host your first tasting this week.',
      sections: [
        { heading: 'Your first shopping list', body: 'Pick three different bourbons between $20 and $40 — vary proof or style if you can. Grab a notebook, small glasses or a Glencairn, and still water. That is enough for Level 1.' },
        { heading: 'How to taste without sounding silly', body: 'Nose gently, sip small, note sweet vs spicy vs oak, add a drop of water, taste again. Write one sentence per pour. Avoid empty words like "smooth" — name a flavor: caramel, cinnamon, vanilla, pepper.' },
        { heading: 'First 30 days', body: 'Week 1: Mission 1 tasting. Week 2: repeat with one swap. Week 3: start journal entries for daily drinkers. Week 4: share notes in Bourbon Circle and ask one question about mash bill.' },
      ],
    },
    {
      slug: 'road-to-role',
      title: 'Road to Bourbon Steward',
      summary: 'The steward role means you can teach tastings, lead blind nights, and guide newcomers — here is the path.',
      sections: [
        { heading: 'Levels 1–3: Palate and shelf', body: 'Complete first tasting and build a themed shelf of 5–8 bottles you can explain. You should compare pours side by side and know wheated vs high-rye basics.' },
        { heading: 'Levels 4–6: Host and traveler', body: 'Run a blind tasting for two or more people. Visit a distillery or complete a virtual tour with process notes. Connect mash, barrel, and pour in one story you can tell at a table.' },
        { heading: 'Level 7: Steward responsibilities', body: 'Stewards mentor Curious Members, set tasting themes, and model humility when expensive bottles lose blind nights. Teaching one technique — how to nose, how to add water — counts more than bottle count.' },
      ],
    },
    {
      slug: 'common-mistakes',
      title: 'Common Bourbon Beginner Mistakes',
      summary: 'Avoid hype chasing, vague tasting notes, and label bias — fix these early.',
      sections: [
        { heading: 'Chasing rare bottles first', body: 'Allocated hype teaches FOMO, not palate. Start with widely available bottles so you learn variables — proof, mash bill, age — without bankruptcy.' },
        { heading: 'Writing useless notes', body: '"Good" and "smooth" are not notes. Force one nose word, one palate word, and one finish length per pour. Your future self will thank you.' },
        { heading: 'Ignoring blind structure', body: 'Knowing the label changes your score. Bag bottles, number pours, reveal later. Humility is a feature, not a bug.' },
        { heading: 'Pouring too much', body: 'Comparison tastings need ½ oz pours. Big pours early end the night before you learn.' },
      ],
    },
    {
      slug: 'first-5-projects',
      title: 'First 5 Bourbon Projects',
      summary: 'Five missions that define your early journey — each produces shareable evidence.',
      sections: [
        { heading: '1. Host First Tasting', body: 'Three bourbons, structured notes, one guest or voice memo. Outcome: flavor vocabulary and hosting confidence.' },
        { heading: '2. Build First Shelf', body: '5–8 bottles with a written theme. Outcome: curation identity, not random accumulation.' },
        { heading: '3. Compare 5 Bourbons', body: 'Hold one variable constant, rank with a grid. Outcome: trust your palate over marketing.' },
        { heading: '4. Blind Tasting Night', body: 'Numbered pours, anonymous scores, reveal. Outcome: bias awareness and group fun.' },
        { heading: '5. Visit First Distillery', body: 'In person or virtual with process notes. Outcome: storytelling that connects place to pour.' },
      ],
    },
    {
      slug: 'glossary-index',
      title: 'Bourbon Glossary — 50 Terms That Matter',
      summary: 'From mash bill to rickhouse — the vocabulary stewards use in tastings and teaching.',
      sections: [
        { heading: 'Production terms', body: 'Mash bill, sour mash, fermentation, distillation proof, entry proof, new charred oak, char level, angel\'s share, and rickhouse — learn these before debating age statements.' },
        { heading: 'Label terms', body: 'Straight bourbon, bottled in bond, single barrel, small batch, cask strength, non-chill filtered, and DSP numbers decode what is in the bottle and who made it.' },
        { heading: 'Tasting terms', body: 'Nose, palate, finish, neat, Glencairn, blind tasting, and flavor families (caramel, vanilla, oak, rye spice) turn sips into sentences.' },
        { heading: 'How to use this glossary', body: 'Pick one term per tasting. Use it in your journal entry. Link related terms until the web sticks — that is how connoisseurs are made, one word at a time.' },
      ],
    },
    {
      slug: 'parent-guide',
      title: 'Parent Guide to Bourbon World',
      summary: 'What your teen is building, how progress is measured, and how to support without encouraging excess.',
      sections: [
        { heading: 'Skills, not shots', body: 'The product is attention, hosting, writing, and teaching. Consumption missions assume legal age; younger learners can focus on production literacy and smell-only exercises.' },
        { heading: 'Evidence you can review', body: 'Tasting templates, shelf theme cards, blind score sheets, and distillery notes — tangible work you can discuss at dinner.' },
        { heading: 'Conversation starters', body: 'Ask what surprised them in a blind tasting, which bottle they would gift and why, and what one technique they would teach a friend.' },
        { heading: 'When to worry', body: 'If journaling stops and bottle acquisition accelerates without notes or hosting, redirect to missions and community accountability — not accumulation.' },
      ],
    },
  ],
};
