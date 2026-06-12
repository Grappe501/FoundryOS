/** Level 1 Hobby HQ — hub card registry (curriculum disappears into tools) */

export type Level1Tool = {
  slug: string;
  href: string;
  title: string;
  hook: string;
  icon: string;
  priority: number;
  category: 'decide' | 'play' | 'explore' | 'collect' | 'learn' | 'wild' | 'investigate';
};

export const LEVEL_1_TOOLS: Level1Tool[] = [
  { slug: 'watchtower', href: '/bourbon/watchtower', title: 'Watchtower', hook: 'Signals — what people are talking about this week', icon: '📡', priority: 1.4, category: 'investigate' },
  { slug: 'rabbit-hole', href: '/bourbon/rabbit-hole', title: 'Rabbit Hole of the Day', hook: 'One weird thing — curated — five minutes', icon: '🕳', priority: 1.45, category: 'investigate' },
  { slug: 'hunt', href: '/bourbon/hunt', title: "This Month's Hunt", hook: 'Check off missions — BiB, store pick, wheated compare', icon: '🎯', priority: 1.55, category: 'investigate' },
  { slug: 'shelf-intel', href: '/bourbon/shelf-intelligence', title: 'Shelf Intelligence', hook: 'Gaps, next bottle, blind spots', icon: '🧠', priority: 1.65, category: 'investigate' },
  { slug: 'chains', href: '/bourbon/chains', title: 'Progression Chains', hook: 'WT101 → Rare Breed → Russell\'s ladders', icon: '⛓', priority: 1.75, category: 'investigate' },
  { slug: 'detective', href: '/bourbon/detective', title: 'Bourbon Detective', hook: 'Close cases — pricing, Weller, DSP, store picks', icon: '🕵', priority: 1.6, category: 'investigate' },
  { slug: 'x-ray', href: '/bourbon/x-ray', title: 'Bottle X-Ray', hook: 'Analyst breakdown — mashbill to flavor sources', icon: '📡', priority: 1.7, category: 'investigate' },
  { slug: 'compare', href: '/bourbon/compare', title: 'Compare 5 Bottles', hook: 'Bookmark comparison — value, proof, best use', icon: '⚖', priority: 1.8, category: 'investigate' },
  { slug: 'shelf-psych', href: '/bourbon/shelf-psychology', title: 'Shelf Psychology', hook: 'What your shelf says about you — shareable', icon: '🪞', priority: 1.9, category: 'investigate' },
  { slug: 'personalities', href: '/bourbon/personalities', title: 'Bourbon Personalities', hook: 'Hunter, Historian, Host — viral profiles', icon: '🎭', priority: 2.0, category: 'investigate' },
  { slug: 'store-picks', href: '/bourbon/store-picks', title: 'Store Pick Academy', hook: 'Massive rabbit hole — when picks are worth it', icon: '🏪', priority: 2.1, category: 'investigate' },
  { slug: 'economy', href: '/bourbon/economy', title: 'Bourbon Economy', hook: 'Allocation, MSRP, secondary — hidden rabbit hole', icon: '💰', priority: 2.2, category: 'investigate' },
  { slug: 'campus', href: '/bourbon/campus', title: 'Campus Maps', hook: 'Buffalo Trace, Heaven Hill, Beam — click to learn', icon: '🏛', priority: 2.3, category: 'investigate' },
  { slug: 'flavor-wheel', href: '/bourbon/flavor-wheel', title: 'Flavor Wheel', hook: 'Build profile — feeds Bourbon DNA', icon: '🎡', priority: 2.4, category: 'investigate' },
  { slug: 'league', href: '/bourbon/league', title: 'Blind Tasting League', hook: 'Monthly challenges — return every month', icon: '🏆', priority: 2.5, category: 'investigate' },
  { slug: 'trail-planner', href: '/bourbon/trail-planner', title: 'Trail Planner', hook: 'Trip builder — days, budget, traveler type', icon: '🛣', priority: 2.6, category: 'investigate' },
  { slug: 'bottles-db', href: '/bourbon/bottles', title: 'Bottle Progression', hook: 'What it teaches, who it is for, what comes next', icon: '🥃', priority: 2.7, category: 'investigate' },
  { slug: 'daily', href: '/bourbon/daily', title: 'Daily Bourbon', hook: 'One fact, one bottle, one challenge — every day', icon: '☀', priority: 3, category: 'decide' },
  { slug: 'beyond', href: '/bourbon/beyond-the-bottle', title: 'Beyond the Bottle', hook: 'Origins, pop culture, connections — bourbon in the wild', icon: '🌍', priority: 2, category: 'wild' },
  { slug: 'lore', href: '/bourbon/lore', title: 'World Lore', hook: 'Heroes, rivalries, mysteries — mythology that pulls you back', icon: '📜', priority: 2.5, category: 'wild' },
  { slug: 'today', href: '/bourbon/today', title: "What's Alive Today", hook: 'Daily mystery, debate, legend — not a lesson', icon: '✦', priority: 2.4, category: 'investigate' },
  { slug: 'universe', href: '/bourbon/universe', title: 'Bourbon Universe', hook: 'Click Kentucky, Jazz, Prohibition — wander the map', icon: '🌌', priority: 2.45, category: 'wild' },
  { slug: 'buy', href: '/bourbon/what-should-i-buy', title: 'What Should I Buy?', hook: 'Three bottles matched to your budget and taste', icon: '🛒', priority: 3, category: 'decide' },
  { slug: 'dna', href: '/bourbon/dna', title: 'Bourbon DNA', hook: 'Your flavor fingerprint from games and picks', icon: '🧬', priority: 4, category: 'decide' },
  { slug: 'pour', href: '/bourbon/pour-guide', title: 'Pour Impact Guide', hook: 'Neat, rocks, cola, julep — how serve changes taste', icon: '🧊', priority: 5, category: 'wild' },
  { slug: 'games', href: '/bourbon/games', title: 'Blind Tasting Games', hook: 'Mystery bottle and distillery match — beat your buddy', icon: '🎯', priority: 6, category: 'play' },
  { slug: 'origins', href: '/bourbon/origins', title: 'Origins Map', hook: 'House of Bourbon → whiskey & Bourbon Street', icon: '👑', priority: 7, category: 'wild' },
  { slug: 'pop', href: '/bourbon/pop-culture', title: 'Pop Culture', hook: 'Movies, music, Derby, presidents', icon: '🎬', priority: 8, category: 'wild' },
  { slug: 'connections', href: '/bourbon/connections', title: 'Connections Graph', hook: 'Click bourbon — wander the universe', icon: '🕸', priority: 9, category: 'wild' },
  { slug: 'where-buy', href: '/bourbon/where-to-buy', title: 'Where to Buy', hook: 'Kentucky, NYC, Texas, online — regional tips', icon: '📍', priority: 10, category: 'wild' },
  { slug: 'shelf', href: '/bourbon/shelf-builder', title: 'Shelf Builder', hook: 'Starter, advanced, or collector shelf for your budget', icon: '📚', priority: 11, category: 'collect' },
  { slug: 'wars', href: '/bourbon/wars', title: 'Distillery Wars', hook: 'Buffalo Trace vs Heaven Hill — vote with your palate', icon: '⚔', priority: 12, category: 'play' },
  { slug: 'lab', href: '/bourbon/lab', title: 'Bourbon Lab', hook: 'Char, age, and proof simulators — slide and learn', icon: '⚗', priority: 13, category: 'explore' },
  { slug: 'pairings', href: '/bourbon/pairings', title: 'Pairing Engine', hook: 'Steak, BBQ, chocolate — what to pour', icon: '🥩', priority: 14, category: 'explore' },
  { slug: 'map', href: '/bourbon/map', title: 'Kentucky Map', hook: 'Regions, distilleries, Bourbon Trail planner', icon: '🗺', priority: 15, category: 'explore' },
  { slug: 'myths', href: '/bourbon/myths', title: 'Bourbon Myths', hook: 'Older is better? Kentucky only? True or false.', icon: '❓', priority: 16, category: 'learn' },
  { slug: 'stories', href: '/bourbon/stories', title: 'History Stories', hook: 'Pappy, Prohibition, red wax — narrative rabbit holes', icon: '📖', priority: 17, category: 'learn' },
  { slug: 'producers', href: '/bourbon/producers', title: 'Producer Atlas', hook: '12 houses — history, sweet spots, hidden questions', icon: '🏭', priority: 18, category: 'explore' },
  { slug: 'collector', href: '/bourbon/collector', title: 'Collector Track', hook: 'Beginner, enthusiast, or collector — different tools', icon: '🏆', priority: 19, category: 'collect' },
  { slug: 'shelf-track', href: '/bourbon/portfolio', title: 'My Bourbon Shelf', hook: 'Owned, tasted, wish list, empty bottles', icon: '🥃', priority: 20, category: 'collect' },
];

export const LEVEL_1_LESSON_LINK = {
  href: '/bourbon/academy/what-bourbon-actually-is',
  label: 'Need the basics first?',
  sub: '8 short lessons when you want them — not before.',
};
