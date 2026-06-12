/** Bourbon in the Wild — unexpected connection topics */

export type WildTopic = {
  slug: string;
  title: string;
  hook: string;
  myth?: string;
  truth: string;
  paragraphs: string[];
  rabbitHoles: { title: string; href: string; tease: string }[];
};

export const WILD_TOPICS: WildTopic[] = [
  {
    slug: 'bourbon-street',
    title: 'Why is Bourbon Street called Bourbon Street?',
    hook: 'Spoiler: not the whiskey.',
    myth: 'Named after bourbon whiskey because New Orleans loves to drink.',
    truth: 'Named for the French House of Bourbon during Spanish colonial rule — honoring French royalty when Louisiana changed hands.',
    paragraphs: [
      'In the 1700s, New Orleans was a French city that passed through Spanish administration. Bourbon Street was named to honor the French Bourbon dynasty — the same royal family that indirectly lent its name to Kentucky counties.',
      'Bourbon whiskey arrived in New Orleans through trade routes and later tourism, but the street predates the drink\'s fame. The confusion is perfect bar trivia: same word, two branches, one royal family.',
    ],
    rabbitHoles: [
      { title: 'Origin map — two branches', href: '/bourbon/origins', tease: 'France → whiskey vs France → street' },
      { title: 'New Orleans & jazz', href: '/bourbon/wild/new-orleans-jazz', tease: 'French Quarter culture' },
      { title: 'Mint juleps', href: '/bourbon/pop-culture#sports', tease: 'Crushed ice tradition' },
    ],
  },
  {
    slug: 'kentucky-bourbon-state',
    title: 'Why is Kentucky called the Bourbon State?',
    hook: 'Limestone, corn, and rickhouse geography.',
    truth: 'Kentucky produces ~95% of the world\'s bourbon — not because of law, but water, grain, climate, and centuries of institutional knowledge.',
    paragraphs: [
      'Limestone-filtered water removes iron that can muddy whiskey. Corn was abundant on the frontier. Rickhouses built for hot summers and cold winters create angel\'s share magic.',
      'The "Bourbon State" nickname is economic and cultural — distilleries, the Trail, Derby week, and export identity rolled into two words.',
    ],
    rabbitHoles: [
      { title: 'Kentucky map', href: '/bourbon/map', tease: 'Regions & trail' },
      { title: 'Producer Atlas', href: '/bourbon/producers', tease: '12 houses' },
      { title: 'Agriculture & corn', href: '/bourbon/lab', tease: 'Why mash bills matter' },
    ],
  },
  {
    slug: 'derby-bourbon',
    title: 'Why does the Kentucky Derby and bourbon seem connected?',
    hook: 'Horse racing, juleps, and Kentucky identity in one weekend.',
    truth: 'The Derby is Kentucky\'s global stage — bourbon is the state\'s global export. Churchill Downs mint juleps cement the link in one photograph.',
    paragraphs: [
      'Every first Saturday in May, Churchill Downs serves roughly 120,000 mint juleps — bourbon, mint, sugar, crushed ice, often in a collectible silver cup.',
      'Tailgating, black ties, and barrel-aged hype converge. You do not need to bet to feel why bourbon and racing share a zip code.',
    ],
    rabbitHoles: [
      { title: 'Pop culture · Sports', href: '/bourbon/pop-culture#sports', tease: 'Derby deep dive' },
      { title: 'Pour guide · crushed ice', href: '/bourbon/pour-guide', tease: 'Julep dilution' },
    ],
  },
  {
    slug: 'new-orleans-jazz',
    title: 'How is jazz connected to bourbon culture?',
    hook: 'French Quarter nights — different branch, same city name confusion.',
    truth: 'Jazz and bourbon whiskey both became symbols of New Orleans nightlife — parallel cultures that tourists merge into one weekend.',
    paragraphs: [
      'Bourbon Street hosts music clubs; bourbon whiskey flows in French Quarter bars. The street name is royal; the drink is Kentucky — but the vibe merges in the visitor\'s memory.',
    ],
    rabbitHoles: [
      { title: 'Bourbon Street origin', href: '/bourbon/wild/bourbon-street', tease: 'Not the whiskey' },
      { title: 'Connections graph', href: '/bourbon/connections', tease: 'Click jazz node' },
    ],
  },
  {
    slug: 'bourbon-south',
    title: 'Why is bourbon connected to the South?',
    hook: 'Corn, hospitality, and porch culture.',
    truth: 'Production clusters in Kentucky and surrounding states; consumption mythology ties to Southern hospitality, BBQ, and storytelling.',
    paragraphs: [
      'Geography and agriculture explain production. Culture explains the feeling — porch pours, hunting camps, Derby, and country music lyrics.',
    ],
    rabbitHoles: [
      { title: 'BBQ pairings', href: '/bourbon/pairings', tease: 'Smoke & pour' },
      { title: 'Country music', href: '/bourbon/pop-culture#music', tease: 'Lyric lore' },
    ],
  },
  {
    slug: 'wwii-bourbon',
    title: 'What bourbons were served during WWII?',
    hook: 'Rationing, morale, and military supply chains.',
    truth: 'Whiskey production was reduced for grain rationing; bourbon remained an American morale symbol in officer clubs and USO culture — specific brands varied by supply.',
    paragraphs: [
      'Distilleries shifted to industrial alcohol for the war effort. What reached soldiers and sailors was often whatever regional brands supply chains could move — making WWII-era bottles rare collector objects today.',
    ],
    rabbitHoles: [
      { title: 'Prohibition story', href: '/bourbon/stories/prohibition', tease: 'Before WWII' },
      { title: 'Presidents & politics', href: '/bourbon/pop-culture#politics', tease: 'State dinners' },
    ],
  },
];

export function getWildTopic(slug: string): WildTopic | undefined {
  return WILD_TOPICS.find((t) => t.slug === slug);
}
