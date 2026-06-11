/** PASS-025 — BBQ world depth bundle */

import { buildAcademyLessons } from '../build-academy';
import { buildGlossary } from '../build-glossary';
import type { WorldDepthBundle } from '../types';
import { BBQ_ACADEMY_LEVELS } from '../../bbq-world';

const academyLevels = BBQ_ACADEMY_LEVELS.map((l) => ({
  level: l.level,
  title: l.title,
  tagline: l.tagline,
  missionSlug:
    l.level === 1
      ? 'first-pork-butt'
      : l.level === 3
        ? 'first-brisket'
        : l.level === 4
          ? 'backyard-bbq'
          : l.level === 5
            ? 'first-competition'
            : l.level === 6
              ? 'judge-competition'
              : undefined,
}));

export const BBQ_DEPTH: WorldDepthBundle = {
  slug: 'bbq',
  displayName: 'BBQ World',
  accentColor: '#B06B50',
  portfolioLabel: 'My BBQ Journal',

  academyLessons: buildAcademyLessons(academyLevels, 'BBQ'),

  glossary: buildGlossary([
    ['Bark', 'The dark, flavorful crust on smoked meat from rub, smoke, and heat.', 'Bark is texture and taste — competition cooks chase it deliberately.', 'A pork butt with thick bark contrasts beautifully with pulled interior.', ['Rub', 'Smoke ring']],
    ['Stall', 'Plateau where internal temp stops rising for hours during a long cook.', 'Understanding the stall prevents panic and bad decisions.', 'Brisket often stalls around 150–170°F until collagen breaks down.', ['Low and slow', 'Wrap']],
    ['Brisket', 'Beef cut from the chest — the graduate exam of American BBQ.', 'Flat and point behave differently; whole packer teaches both.', 'Your first brisket teaches humility; your fifth teaches patience.', ['Brisket flat', 'Brisket point']],
    ['Pork butt', 'Shoulder cut — misnamed, ideal for pulled pork low-and-slow.', 'Forgiving first smoke that feeds a crowd.', 'Mission 1 targets 195–203°F internal before pull test.', ['Pulled pork', 'Smoke ring']],
    ['Smoke ring', 'Pink band under the bark from nitrogen dioxide binding myoglobin.', 'Visual sign of clean smoke and proper fire — not doneness.', 'A thin smoke ring on ribs signals good combustion.', ['Bark', 'Clean smoke']],
    ['Rub', 'Dry spice blend applied before smoke — salt, pepper, paprika, sugar, etc.', 'Salt penetrates; sugar helps bark; pepper adds bite.', 'Texas salt-and-pepper is a rub with one ingredient list.', ['Bark', 'Marinade']],
    ['Marinade', 'Liquid soak before cooking — flavor and sometimes tenderizing.', 'Less common on long smokes than rub; watch sugar burn.', 'Overnight marinade works for ribs; brisket often gets rub only.', ['Injection', 'Rub']],
    ['Injection', 'Syringing flavorful liquid into the meat for moisture and taste.', 'Competition cooks inject for consistency under time pressure.', 'Broth, butter, and phosphates appear in comp injections.', ['Marinade', 'Moisture']],
    ['Mop', 'Thin sauce brushed during cook — adds flavor and surface moisture.', 'Distinct from heavy finishing sauce.', 'Vinegar mop on pork is classic Carolina style.', ['Sauce', 'Spritz']],
    ['Low and slow', 'Cooking at roughly 225–275°F for hours until collagen melts.', 'Foundation technique for tough cuts.', 'Pork butt at 250°F for 10–12 hours is textbook low and slow.', ['Stall', 'Probe tender']],
    ['Kansas City style', 'Tomato-based sweet sauce, variety of meats, burnt ends tradition.', 'What many Americans picture as "BBQ sauce."', 'Gates and Joe\'s KC represent the sauced, balanced style.', ['Texas style', 'Carolina style']],
    ['Texas style', 'Beef-forward, salt-and-pepper rub, sauce on the side if at all.', 'Central Texas emphasizes meat and post oak smoke.', 'Franklin Barbecue lines define modern Texas brisket craft.', ['Kansas City style', 'Post oak']],
    ['Carolina style', 'Whole hog or pork with vinegar or mustard sauces.', 'Eastern NC vinegar; Lexington adds ketchup; SC mustard.', 'Lexington dip is tangy ketchup-vinegar hybrid.', ['Memphis style', 'Mop']],
    ['Memphis style', 'Ribs prominent — dry rub or wet with tomato sauce.', 'Dry rub ribs served with sauce on side at Rendezvous.', 'Memphis in May is the pilgrimage event for rib lovers.', ['Kansas City style', 'Rub']],
    ['Pellet smoker', 'Electric auger feeds wood pellets — set-and-forget friendly.', 'Great for beginners learning temp stability.', 'Traeger and Pit Boss dominate backyard pellet market.', ['Offset smoker', 'Kamado']],
    ['Offset smoker', 'Firebox beside cooking chamber — classic stick burner.', 'Teaches fire management and clean smoke.', 'Aaron Franklin built reputation on offset mastery.', ['Pellet smoker', 'Clean smoke']],
    ['Kamado', 'Ceramic egg-shaped grill — excellent heat retention.', 'Works for low smoke and high heat pizza.', 'Big Green Egg is the iconic kamado brand.', ['Kettle grill', 'Two-zone cooking']],
    ['Kettle grill', 'Charcoal kettle — versatile with snake or minion methods.', 'Budget entry to real smoke without a dedicated smoker.', 'Weber kettle plus foil pan can smoke a pork butt.', ['Chimney starter', 'Charcoal']],
    ['Brisket flat', 'Leaner rectangular portion of the brisket.', 'Easier to slice for sandwiches; dries if overcooked.', 'Many first-timers start with a flat before whole packer.', ['Brisket point', 'Slicing against grain']],
    ['Brisket point', 'Fattier deckle end — burnt ends source.', 'Richer, more forgiving, shreds beautifully.', 'Chopped point on Texas trays is pure luxury.', ['Burnt ends', 'Brisket flat']],
    ['Burnt ends', 'Caramelized point cubes — Kansas City specialty.', 'Double-smoked or sauced point candy.', 'Joe\'s KC burnt ends created a national craving.', ['Brisket point', 'Kansas City style']],
    ['Pulled pork', 'Shredded smoked pork shoulder — forks and gloved hands.', 'Feeds crowds; forgiving cook for Mission 1.', 'Serve on buns with slaw and vinegar splash.', ['Pork butt', 'Resting']],
    ['Spare ribs', 'Full rib rack from belly — more bone, more fat, more time.', 'Heavier than baby backs; competition staple.', 'St. Louis trim removes skirt and cartilage for box fit.', ['Baby back ribs', 'Memphis style']],
    ['Baby back ribs', 'Shorter rack from loin — leaner, faster cook.', 'Great intro rib cook for backyard hosts.', '3-2-1 method popular on baby backs at 225°F.', ['Spare ribs', 'Smoke ring']],
    ['Fat cap', 'Fat layer on meat — trim strategy affects flavor and bark.', 'Brisket fat cap often trimmed to ¼ inch.', 'Too much fat blocks rub penetration; zero fat dries out.', ['Trim', 'Render']],
    ['Trim', 'Removing silver skin, excess fat, and uneven edges before rub.', 'Even shape cooks evenly; comp trim fits turn-in box.', 'Brisket trim saves for tallow or discard — your call.', ['Fat cap', 'Turn-in box']],
    ['Wrap (Texas crutch)', 'Foil or butcher paper wrap mid-cook to push through stall.', 'Speeds cook, softens bark unless crutched late.', 'Butcher paper breathes more than foil — Aaron Franklin popularized it.', ['Stall', 'Bark']],
    ['Probe tender', 'When a thermometer probe slides in like softened butter.', 'Better doneness signal than temp alone for brisket.', 'Brisket can read 203°F in one spot and resist in another — probe everywhere.', ['Internal temp', 'Resting']],
    ['Internal temp', 'Meat temperature measured away from bone.', 'Target ranges guide pull time — not the only signal.', 'Pork butt often done 195–205°F depending on feel.', ['Probe tender', 'Instant-read thermometer']],
    ['Resting', 'Holding cooked meat off heat so juices redistribute.', 'Skipping rest loses moisture on the cutting board.', 'Wrap brisket in cooler towel rest 1–4 hours for service.', ['Holding', 'Pulled pork']],
    ['Clean smoke', 'Thin, blue-tinted smoke — not thick white billows.', 'White smoke tastes bitter; clean smoke builds proper flavor.', 'Adjust air intake until smoke thins after startup.', ['Smoke ring', 'Offset smoker']],
    ['Post oak', 'Texas favorite smoking wood — medium strength, long burn.', 'Pairs naturally with beef.', 'Central Texas pits run almost exclusively on post oak.', ['Hickory', 'Fruit wood']],
    ['Hickory', 'Strong classic smoke — bacon-like aroma.', 'Easy to over-smoke poultry or long pork.', 'Use sparingly mixed with oak for balanced profile.', ['Mesquite', 'Post oak']],
    ['Fruit wood', 'Apple, cherry, peach — milder, sweeter smoke.', 'Great for pork and poultry.', 'Cherry wood adds color and gentle sweetness to ribs.', ['Hickory', 'Clean smoke']],
    ['Charcoal', 'Carbonized wood fuel — lump or briquettes.', 'Lump burns hotter faster; briquettes steady longer.', 'Chimney starter lights charcoal without lighter fluid taste.', ['Chimney starter', 'Kettle grill']],
    ['Chimney starter', 'Metal cylinder to ignite charcoal with newspaper.', 'Avoids petroleum lighter fluid flavor on food.', 'Fill chimney, light bottom, dump coals when ashed over.', ['Charcoal', 'Kettle grill']],
    ['Water pan', 'Pan of water in smoker for humidity and temp buffer.', 'Helps on offset and cabinet smokers in dry climates.', 'Half-full pan under grates stabilizes heat spikes.', ['Pellet smoker', 'Two-zone cooking']],
    ['Two-zone cooking', 'Hot side for sear, cool side for indirect heat.', 'Essential kettle technique when no dedicated smoker.', 'Bank coals one side; meat on the other with lid vent open.', ['Reverse sear', 'Kettle grill']],
    ['Reverse sear', 'Smoke low first, finish hot for crust.', 'Alternative to sear-then-smoke for steaks and thick cuts.', 'Smoke tri-tip to 115°F, then grill hot for crust.', ['Two-zone cooking', 'Hot and fast']],
    ['Hot and fast', 'Cooking above 275°F — shorter window, different bark tradeoffs.', 'Some pitmasters cook brisket hot and fast with tight wrap.', '275°F brisket in 6–8 hours is hot-and-fast territory.', ['Low and slow', 'Wrap']],
    ['Drip pan', 'Catches fat and juice under grates.', 'Prevents flare-ups and enables au jus collection.', 'Empty drip pans prevent grease fires on long cooks.', ['Fat rendering', 'Water pan']],
    ['Fat rendering', 'Melting intramuscular fat during long cooks.', 'Makes tough cuts tender — the whole point of BBQ.', 'Collagen and fat break down together after hours in the stall.', ['Connective tissue', 'Low and slow']],
    ['Connective tissue', 'Collagen and elastin that tighten then melt with heat and time.', 'Why brisket is tough at 160°F and tender at 200°F.', 'Without time, shoulder and brisket stay chewy.', ['Collagen breakdown', 'Stall']],
    ['Collagen breakdown', 'Conversion to gelatin above ~160°F over hours.', 'Creates silky mouthfeel in properly smoked meat.', 'That jiggle in a rested brisket slice is gelatin, not raw meat.', ['Probe tender', 'Resting']],
    ['Slaw', 'Shredded cabbage side — vinegar or creamy.', 'Acid cuts richness of fatty smoked meat.', 'Eastern NC slaw on pulled pork sandwich is mandatory tradition.', ['Carolina style', 'Pulled pork']],
    ['Turn-in box', 'Competition box with precisely arranged meat for judges.', 'Appearance, tenderness, taste scored separately.', 'Four bone ribs, brisket slices, and pulled pork each get their own box.', ['KCBS', 'Competition trimming']],
    ['KCBS', 'Kansas City Barbeque Society — largest US competition circuit.', 'Standardized judging categories and rules.', 'Mission 4 and 5 align with KCBS turn-in and judging mindset.', ['Turn-in box', 'Judging criteria']],
    ['Judging criteria', 'Appearance, tenderness, taste — scored 1–9 in KCBS.', 'Judges eat many bites; balance wins over one-note sugar bombs.', 'Dry brisket scores low on tenderness even if flavor pops.', ['Table judge', 'Turn-in box']],
    ['Table judge', 'Certified taster at sanctioned events — Mission 6 role.', 'Learns calibration and constructive feedback.', 'Judges cleanse palate between bites with water and unsalted crackers.', ['KCBS', 'Judging criteria']],
    ['Slicing against grain', 'Cutting perpendicular to muscle fibers for tender bite.', 'Wrong direction ruins even perfect brisket.', 'Flat and point grains differ — rotate the board when slicing.', ['Brisket flat', 'Burnt ends']],
  ]),

  community: {
    name: 'Pitmasters Circle',
    memberRoles: [
      { role: 'Fire Starter', description: 'First smokes — shares cook logs, asks stall questions, posts learning mistakes openly.' },
      { role: 'Backyard Host', description: 'Plans menus, feeds groups, documents timelines that actually work.' },
      { role: 'Comp Cook', description: 'Builds turn-in boxes, debriefs scores, mentors on appearance and tenderness.' },
      { role: 'Pitmaster Mentor', description: 'Leads the Circle, certifies judges, reviews brisket evidence, sets seasonal wood challenges.' },
    ],
    weeklyChallenge: 'Post a cook log with start temp, stall time, wrap decision, pull temp, and one honest 1–10 rating.',
    showcaseFormat: 'Smoke Report — hero photo, cut shot, 5-line log (rub, wood, hours, verdict, next variable to change).',
    peerFeedbackLoop: 'Reply with one diagnostic question ("When did bark set?") and one actionable tweak — no ego, no dunking.',
    mentorRole: 'Pitmaster Mentors run virtual fire checks before Mission 1, review brisket slice photos, and pair comp cooks with rookies.',
  },

  parent: {
    headline: 'What your teen builds in BBQ World',
    oneLiner: 'Patience, fire safety, hosting, and craft — feeding people on purpose.',
    whyItMatters: 'Long cooks teach systems thinking. Hosting teaches leadership. Judging teaches criteria-based feedback — the same skills as project management and peer review.',
    whatTheyBuild: 'A BBQ journal with cook logs, a hosted backyard meal, competition turn-in evidence, and judging notes — documented transformation from backyard cook to mentor.',
    skillsDemonstrated: [
      'Fire management and safety awareness',
      'Time planning and backward scheduling',
      'Temperature monitoring and record keeping',
      'Hospitality and crowd feeding',
      'Structured evaluation (appearance, tenderness, taste)',
      'Teaching prep and stall science to beginners',
    ],
    howProgressMeasured: 'Academy checkpoints, mission evidence (photos, logs, guest quotes), Circle smoke reports, and mentor sign-off on first brisket.',
    successAfter30Days: 'They complete a pork butt cook with a full log, explain the stall in plain language, host at least two people once, and adjust one variable on cook #2.',
    sections: [
      {
        title: 'Safety first',
        body: 'Fire, hot surfaces, and food safety are non-negotiable. Missions emphasize thermometers, handoff zones, and never leaving a live fire unattended. Parents should know their local burn rules and set physical boundaries for smokers.',
      },
      {
        title: 'Evidence over Instagram',
        body: 'Progress is cook logs and honest scores — not only glamour shots. A dry brisket photo with "4/10 — pulled early" is better evidence than a filter and silence.',
      },
      {
        title: 'Hosting as leadership',
        body: 'Mission 3 builds menus, delegation, and guest experience. Ask who brought sides, what ran late, and what guests remembered — those answers mirror real event planning.',
      },
      {
        title: 'Path to mentor',
        body: 'Judging mission teaches giving constructive feedback. Mentors use that same voice when guiding Fire Starters through first pork butts.',
      },
    ],
  },

  seoGuides: [
    {
      slug: 'what-is',
      title: 'What Is BBQ World?',
      summary: 'Create experiences around the pit — low-and-slow craft, backyard hosting, and competition discipline.',
      sections: [
        { heading: 'Experience, not just food', body: 'BBQ World follows the Foundry loop: mission, build, show, reflect, improve, mentor. You are learning fire, timing, hospitality, and honest evaluation — pulled pork is the proof, not the product.' },
        { heading: 'Seven levels to Pitmaster Mentor', body: 'From Backyard Cook through Pitmaster Mentor, academy lessons stack skills. Five missions anchor the path: pork butt, brisket, backyard BBQ, first competition, and judging.' },
        { heading: 'Gear is not destiny', body: 'Kettle, pellet, offset, or kamado — all work. Thermometer discipline and cook logs matter more than price tags.' },
      ],
    },
    {
      slug: 'beginner-guide',
      title: 'Beginner Guide to BBQ World',
      summary: 'Start with one pork butt, one probe thermometer, and a notebook — Mission 1 this weekend.',
      sections: [
        { heading: 'Shopping list', body: 'Pork butt (8–10 lb), simple rub (salt, pepper, paprika), probe thermometer, notebook. Smoker or kettle setup with steady 250°F target.' },
        { heading: 'Timeline basics', body: 'Work backward from serve time. Plan 10–14 hours cook plus 30-minute rest. Log temps hourly — the stall is normal, not failure.' },
        { heading: 'First month', body: 'Week 1: pork butt Mission 1. Week 2: repeat one rub or wood change. Week 3: feed two people and capture guest quote. Week 4: post Smoke Report in Pitmasters Circle.' },
      ],
    },
    {
      slug: 'road-to-role',
      title: 'Road to Pitmaster Mentor',
      summary: 'From first smoke to leading the Circle — the role path in plain language.',
      sections: [
        { heading: 'Levels 1–2: Fire confidence', body: 'Complete pork butt with log. Manage temps without panic. Explain clean smoke vs white smoke to a friend.' },
        { heading: 'Levels 3–4: Brisket and hosting', body: 'Brisket teaches humility. Backyard BBQ teaches menus and timelines for four or more guests.' },
        { heading: 'Levels 5–7: Comp and mentor', body: 'Enter a structured competition, judge with criteria, then mentor Fire Starters. Mentors review logs — they do not gatekeep gear.' },
      ],
    },
    {
      slug: 'common-mistakes',
      title: 'Common BBQ Beginner Mistakes',
      summary: 'Opening the lid, chasing temps, and skipping rest — fix these early.',
      sections: [
        { heading: 'Lid peeking', body: 'Every open drops temp and adds cook time. Trust the probe, log on schedule, open only when needed.' },
        { heading: 'Panic at the stall', body: 'Temp flatlines for hours — collagen is working. Do not crank heat to 350°F unless you intend hot-and-fast tradeoffs.' },
        { heading: 'No rest', body: 'Slicing immediately floods the board, not the bite. Rest wrapped meat 30 minutes minimum; brisket loves a cooler hold.' },
        { heading: 'Changing everything at once', body: 'One variable per cook — wood, rub, wrap time, or temp target. Otherwise you learn nothing.' },
      ],
    },
    {
      slug: 'first-5-projects',
      title: 'First 5 BBQ Projects',
      summary: 'Five missions that define your smoke journey — each produces evidence.',
      sections: [
        { heading: '1. Smoke First Pork Butt', body: 'Low and slow with full log and pull test. Outcome: stall literacy and crowd feeding.' },
        { heading: '2. Smoke First Brisket', body: 'Probe tender, slice against grain, honest score. Outcome: resilience and precision.' },
        { heading: '3. Host Backyard BBQ', body: 'Menu, timeline, four guests, one story at the table. Outcome: hospitality leadership.' },
        { heading: '4. Enter First Competition', body: 'Turn-in box and scoresheet. Outcome: feedback acceleration.' },
        { heading: '5. Judge a Competition', body: 'Structured scores and written notes for cooks. Outcome: calibrated palate and mentor voice.' },
      ],
    },
    {
      slug: 'glossary-index',
      title: 'BBQ Glossary — 50 Terms That Matter',
      summary: 'Bark, stall, wrap, turn-in — the vocabulary pitmasters use every cook.',
      sections: [
        { heading: 'Cook science', body: 'Stall, collagen breakdown, probe tender, internal temp, smoke ring, and fat rendering explain why BBQ takes hours.' },
        { heading: 'Gear and fire', body: 'Offset, pellet, kamado, kettle, clean smoke, post oak, chimney starter, and two-zone cooking cover backyard setups.' },
        { heading: 'Regional and comp', body: 'Texas, Kansas City, Carolina, Memphis styles plus KCBS, turn-in box, and judging criteria connect craft to community.' },
        { heading: 'How to study', body: 'Pick one term per cook. Write it in your journal when you see it happen — stall day is the best day to define stall.' },
      ],
    },
    {
      slug: 'parent-guide',
      title: 'Parent Guide to BBQ World',
      summary: 'Fire safety, cook logs, and hosting skills — what your teen is actually building.',
      sections: [
        { heading: 'Why long cooks help', body: 'Planning a 12-hour cook backward from dinner is the same muscle as planning a science fair or team project — show up on schedule.' },
        { heading: 'Review their log', body: 'Ask stall time, wrap decision, and rating. Praise honest low scores; they predict faster improvement than fake tens.' },
        { heading: 'Supervise fire', body: 'Establish yard rules, extinguisher location, and no-solo-fire policy until you are confident in their checklist.' },
        { heading: 'Celebrate hosting', body: 'Mission 3 guest quote is gold — ask what made the meal memorable beyond the meat.' },
      ],
    },
  ],
};
