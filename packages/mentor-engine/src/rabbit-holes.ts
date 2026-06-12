/** PASS-034D — Rabbit hole engine */

export type RabbitHole = {
  title: string;
  href: string;
  tease: string;
};

export type RabbitHoleTopic = {
  topic_key: string;
  world_slug: string;
  holes: RabbitHole[];
};

export const RABBIT_HOLE_REGISTRY: RabbitHoleTopic[] = [
  {
    topic_key: 'makers-mark',
    world_slug: 'bourbon',
    holes: [
      { title: 'Wheated bourbon', href: '/bourbon/encyclopedia/wheated-bourbon', tease: 'Why wheat replaces rye' },
      { title: 'Stitzel-Weller legacy', href: '/bourbon/stories/pappy-van-winkle', tease: 'The family tree behind the hype' },
      { title: 'Pappy Van Winkle', href: '/bourbon/stories/pappy-van-winkle', tease: 'How scarcity became mythology' },
      { title: 'Barrel char', href: '/bourbon/lab', tease: 'Slide char levels in the Lab' },
      { title: "Maker's Mark producer dive", href: '/bourbon/producers/makers-mark', tease: 'Red wax and Loretto campus' },
    ],
  },
  {
    topic_key: 'mash-bill',
    world_slug: 'bourbon',
    holes: [
      { title: 'High rye vs wheated', href: '/bourbon/games', tease: 'Blind match the mash bill' },
      { title: 'Four Roses ten recipes', href: '/bourbon/producers/four-roses', tease: 'Why one brand has many personalities' },
      { title: 'What should I buy?', href: '/bourbon/what-should-i-buy', tease: 'Pick your mash bill lane' },
      { title: 'Distillery wars', href: '/bourbon/wars', tease: 'Compare houses side-by-side' },
    ],
  },
  {
    topic_key: 'buffalo-trace',
    world_slug: 'bourbon',
    holes: [
      { title: 'Producer Atlas: Buffalo Trace', href: '/bourbon/producers/buffalo-trace', tease: 'Why $25 shares DNA with hype bottles' },
      { title: 'Eagle Rare age', href: '/bourbon/what-should-i-buy', tease: 'What ten years tastes like' },
      { title: 'Kentucky map', href: '/bourbon/map', tease: 'Frankfort campus on the trail' },
      { title: 'Bourbon myths', href: '/bourbon/myths', tease: 'Older is always better?' },
    ],
  },
  {
    topic_key: 'automation',
    world_slug: 'ai-builder',
    holes: [
      { title: 'Homework Assistant mission', href: '/ai-builder/missions/homework-assistant', tease: 'Ship your first automation' },
      { title: 'Software Founder path', href: '/my-journey', tease: 'Hidden path when you ship enough' },
      { title: 'Entrepreneur crossover', href: '/my-future', tease: 'Build something people pay for' },
    ],
  },
  {
    topic_key: 'confidence',
    world_slug: 'public-speaking',
    holes: [
      { title: 'First Talk mission', href: '/public-speaking/missions/first-talk', tease: 'Three minutes, one audience' },
      { title: 'Host a bourbon tasting', href: '/bourbon/missions/first-tasting', tease: 'Cross-world speaking rep' },
      { title: 'Mentor challenge', href: '/my-journey', tease: 'Speech Coach weekly challenge' },
    ],
  },
  {
    topic_key: 'budget',
    world_slug: 'financial-independence',
    holes: [
      { title: 'Compound interest', href: '/financial-independence/glossary', tease: 'The eighth wonder' },
      { title: 'First index fund research', href: '/financial-independence/missions', tease: 'After the budget lands' },
      { title: 'Investor ambition', href: '/my-future', tease: 'Map your financial identity' },
    ],
  },
];

export function getRabbitHoles(topicKey: string): RabbitHoleTopic | undefined {
  const key = topicKey.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return RABBIT_HOLE_REGISTRY.find((t) => t.topic_key === key || topicKey.toLowerCase().includes(t.topic_key));
}

export function rabbitHolesForProducer(producerSlug: string): RabbitHole[] {
  const topic = getRabbitHoles(producerSlug);
  return topic?.holes ?? [];
}

export function rabbitHolesForTerm(term: string): RabbitHole[] {
  const normalized = term.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const topic = RABBIT_HOLE_REGISTRY.find(
    (t) => t.topic_key === normalized || normalized.includes(t.topic_key) || t.topic_key.includes(normalized),
  );
  if (topic) return topic.holes;
  if (/wheat|wheated|rye|mash|char|proof|barrel/i.test(term)) {
    return getRabbitHoles('mash-bill')?.holes ?? [];
  }
  return [];
}
