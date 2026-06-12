import type { WorldLoreBundle } from '../types';

export const BBQ_LORE: WorldLoreBundle = {
  world_slug: 'bbq',
  world_name: 'BBQ',
  tagline: 'Pit legends, regional wars, smoke mythology.',
  heroes: [{ id: 'pitmaster', name: 'The overnight pitmaster', tagline: 'Fire, fat, and patience.', obsession: 'Hold temp through the stall.', failure: 'Every brisket teaches humility.', breakthrough: 'First perfect bark — remembered forever.', whyMatters: 'BBQ is time made edible.' }],
  legends: [{ id: 'first-brisket', title: 'The First Brisket That Didn\'t Fail', hook: 'Twelve hours of doubt — then the slice.', chapters: [{ heading: 'The stall', body: 'Internal temp stuck for hours. Panic is normal.' }, { heading: 'The slice', body: 'Smoke ring, bend test, silence at the table.' }], whyRemembered: 'Every pitmaster has a first-brisket story.' }],
  rivalries: [{ id: 'sauce-vs-dry', title: 'Sauce vs no sauce', sideA: { label: 'Sauce', argument: 'Regional identity — KC, Memphis, Carolina.' }, sideB: { label: 'Dry rub', argument: 'Meat speaks — Texas tradition.' }, foundryTake: 'Both camps have a pit that proves it.' }],
  mysteries: [{ id: 'stall-why', question: 'Why does the stall happen?', tease: 'Evaporative cooling — not your fault.', answer: 'Collagen breaking down releases moisture. Wait it out or wrap — both are legitimate.' }],
  debates: [{ id: 'offset-vs-pellet', title: 'Offset vs pellet?', campA: { label: 'Offset', argument: 'Real fire, real skill, real smoke.' }, campB: { label: 'Pellet', argument: 'Consistency, sleep, still delicious.' }, whyPeopleReturn: 'Identity attached to your cooker.' }],
  pilgrimages: [{ id: 'first-comp', title: 'First competition', description: 'Judges, turn-in boxes, adrenaline.', href: '/bbq/missions' }],
  controversies: [{ id: 'wrap', debate: 'Wrap or no wrap?', campA: 'Wrap — beat the stall.', campB: 'Never wrap — bark is sacred.', whyItEndures: 'Every brisket thread ends here.' }],
  secrets: [{ id: 'rest', headline: 'Rest longer than you think.', body: 'Carryover cooking continues off heat — slice too early, lose juice.', whyFeelsSecret: 'Hungry guests pressure you. Insiders wait.' }],
  timeline: [{ year: '1800s', title: 'Southern pit tradition', body: 'Whole hog and brisket — community food.' }],
  whyMatters: [{ topic: 'Smoke', notThis: 'Smoke flavor only.', insteadThis: 'Smoke is time, wood choice, and fire management.', body: 'The ring, the bark, the stall — all teach patience.' }],
};

export const POKER_LORE: WorldLoreBundle = {
  world_slug: 'poker',
  world_name: 'Poker',
  tagline: 'Legendary hands, famous bluffs, casino mythology.',
  heroes: [{ id: 'rounder', name: 'The rounder', tagline: 'Grind, read, survive.', obsession: 'Edge over hours — not one hand.', failure: 'Bankroll management ignored once — remembered forever.', breakthrough: 'First month positive — proof the study works.', whyMatters: 'Poker rewards discipline disguised as luck.' }],
  legends: [{ id: 'moneymaker', title: 'The Moneymaker Effect', hook: 'One amateur won the Main Event — and poker exploded.', chapters: [{ heading: '2003', body: 'Online qualifier wins WSOP. TV table. Global boom.' }, { heading: 'The flood', body: 'Millions learned Texas Hold\'em — fish and sharks together.' }], whyRemembered: 'Proof that one story changes an industry.' }],
  rivalries: [{ id: 'gto-vs-exploit', title: 'GTO vs exploitative', sideA: { label: 'GTO', argument: 'Unexploitable baseline — solver culture.' }, sideB: { label: 'Exploit', argument: 'Target weaknesses — live reads matter.' }, foundryTake: 'Learn GTO, deviate with evidence.' }],
  mysteries: [{ id: 'online-rigged', question: 'Are online sites rigged?', tease: 'Bad beats feel rigged — math says variance.', answer: 'Licensed sites have massive incentive not to cheat. Humans remember losses.' }],
  debates: [{ id: 'luck-skill', title: 'Is poker luck or skill?', campA: { label: 'Luck', argument: 'One hand decides nights.' }, campB: { label: 'Skill', argument: 'Thousands of hands — edge appears.' }, whyPeopleReturn: 'Every bad beat reopens the case.' }],
  pilgrimages: [{ id: 'home-game', title: 'Host first home game', description: 'Chips, dealers, culture.', href: '/poker/missions' }],
  controversies: [{ id: 'slowroll', debate: 'Slow roll etiquette?', campA: 'Gamesmanship.', campB: 'Disrespect — always.', whyItEndures: 'Social contract at the table.' }],
  secrets: [{ id: 'position', headline: 'Position is power.', body: 'Act last — see more, bluff cheaper, control pot size.', whyFeelsSecret: 'Beginners focus on cards, not seats.' }],
  timeline: [{ year: '2003', title: 'Poker boom', body: 'Moneymaker wins Main Event — TV and online explode.' }],
  whyMatters: [{ topic: 'Bankroll', notThis: 'How much to buy in.', insteadThis: 'Survival math — can you weather variance?', body: 'Without bankroll discipline, skill never compounds.' }],
};

export const FI_LORE: WorldLoreBundle = {
  world_slug: 'financial-independence',
  world_name: 'Financial Independence',
  tagline: 'Wall Street legends, crash stories, wealth myths.',
  heroes: [{ id: 'index-investor', name: 'The index investor', tagline: 'Boring beats brilliant — over decades.', obsession: 'Fees are the enemy.', failure: 'Panic sold at the bottom once.', breakthrough: 'Automated contributions through a crash — wealth compounded.', whyMatters: 'Time in market beats timing the market.' }],
  legends: [{ id: '1929', title: 'Black Tuesday', hook: 'Fortunes vanished in days — lessons lasted generations.', chapters: [{ heading: 'The crash', body: 'Margin calls, bank runs, despair.' }, { heading: 'The rebuild', body: 'Regulation, FDIC, skepticism of hype.' }], whyRemembered: 'Every bubble echoes 1929.' }],
  rivalries: [{ id: 'active-vs-passive', title: 'Active vs passive investing', sideA: { label: 'Active', argument: 'Skill can beat markets — rarely, expensively.' }, sideB: { label: 'Passive', argument: 'Index funds win after fees — data agrees.' }, foundryTake: 'Start passive; earn the right to be active.' }],
  mysteries: [{ id: 'millionaire-next-door', question: 'Why are the richest people invisible?', tease: 'Stealth wealth vs display wealth.', answer: 'Compounding favors boring behavior — not Instagram cars.' }],
  debates: [{ id: 'fire-real', title: 'Is FIRE realistic for everyone?', campA: { label: 'Yes', argument: 'Savings rate matters more than income.' }, campB: { label: 'No', argument: 'Structural costs and income floors limit some paths.' }, whyPeopleReturn: 'Personal stories vs macro reality.' }],
  pilgrimages: [{ id: 'first-budget', title: 'First honest budget month', description: 'Every dollar named — no judgment.', href: '/financial-independence/missions' }],
  controversies: [{ id: 'debt-pay', debate: 'Avalanche vs snowball?', campA: 'Math — highest rate first.', campB: 'Psychology — smallest win first.', whyItEndures: 'Both work — identity picks the method.' }],
  secrets: [{ id: 'fees', headline: '1% fee destroys compounding.', body: 'Over 30 years, fees eat years of retirement.', whyFeelsSecret: 'Advisors do not lead with this math.' }],
  timeline: [{ year: '2008', title: 'Financial crisis', body: 'Housing collapse — index investors who held won the next decade.' }],
  whyMatters: [{ topic: 'Compound interest', notThis: 'A formula.', insteadThis: 'Time is the asset — start early, stay boring.', body: 'Wealth is behavior over decades, not one brilliant trade.' }],
};

export const CIVIC_LORE: WorldLoreBundle = {
  world_slug: 'civic-engagement',
  world_name: 'Civic Engagement',
  tagline: 'Constitutional mysteries, movement legends, civic debates.',
  heroes: [{ id: 'organizer', name: 'The block organizer', tagline: 'Two minutes at the mic that moved a vote.', obsession: 'One clear ask — not three paragraphs.', failure: 'Lost the room with data before story.', breakthrough: 'Neighbor\'s name opened hearts.', whyMatters: 'Democracy is local repetition.' }],
  legends: [{ id: 'town-hall', title: 'The Town Hall That Flipped One Vote', hook: 'One council member. One packed room.', chapters: [{ heading: 'The ask', body: 'Specific, timed, achievable.' }, { heading: 'The vote', body: '5–4 became 4–5 — margins are real.' }], whyRemembered: 'Proof that showing up matters.' }],
  rivalries: [{ id: 'vote-vs-organize', title: 'Vote vs organize?', sideA: { label: 'Vote', argument: 'Elections decide policy windows.' }, sideB: { label: 'Organize', argument: 'Between elections is when change is built.' }, foundryTake: 'Both — elections are deadlines, organizing is the work.' }],
  mysteries: [{ id: 'electoral-college', question: 'Why does the Electoral College exist?', tease: 'Compromise of 1787 — still shaping outcomes.', answer: 'Small-state influence and federal structure — reform debates continue.' }],
  debates: [{ id: 'local-federal', title: 'Local vs federal focus?', campA: { label: 'Local', argument: 'School board and city council touch daily life.' }, campB: { label: 'Federal', argument: 'Rights and resources scale nationally.' }, whyPeopleReturn: 'Where can one person move the needle?' }],
  pilgrimages: [{ id: 'first-meeting', title: 'First public meeting spoken', description: 'Three minutes — name, ask, thank you.', href: '/civic-engagement/missions' }],
  controversies: [{ id: 'protest', debate: 'Protest vs policy work?', campA: 'Visibility moves Overton window.', campB: 'Committee work passes ordinances.', whyItEndures: 'Movements need both — factions argue anyway.' }],
  secrets: [{ id: 'agenda', headline: 'Read the agenda before you arrive.', body: 'Comment periods have rules — insiders know the flow.', whyFeelsSecret: 'First-timers walk in blind.' }],
  timeline: [{ year: '1787', title: 'Constitutional Convention', body: 'Framework still debated — original mysteries unresolved.' }],
  whyMatters: [{ topic: 'Local government', notThis: 'Boring meetings.', insteadThis: 'Where your block actually gets paved.', body: 'Civic power is repetitive attendance — not one viral moment.' }],
};
