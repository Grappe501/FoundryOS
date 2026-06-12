export type BourbonStory = {
  slug: string;
  title: string;
  subtitle: string;
  readMinutes: number;
  paragraphs: string[];
  relatedProducer?: string;
};

export const BOURBON_STORIES: BourbonStory[] = [
  {
    slug: 'pappy-van-winkle',
    title: 'The Pappy Van Winkle Story',
    subtitle: 'How a retired brand became bourbon\'s most hunted name',
    readMinutes: 6,
    paragraphs: [
      'Julian "Pappy" Van Winkle Sr. spent decades at Stitzel-Weller, the distillery that defined wheated bourbon in the 20th century. When the family sold the distillery in 1972, Pappy retired — but the recipes and reputation lived on.',
      'For years, Old Rip Van Winkle and Pappy Van Winkle were cult objects known mainly to Kentucky insiders. Then whiskey writers, auction results, and social media turned scarcity into mythology. Today, MSRP bears little relationship to street price — and most liquid never reaches a shelf at all.',
      'The lesson for enthusiasts: Pappy tastes excellent, but the hunt often costs more than the pour. Many wheated bourbons from the same family tree — Weller, Larceny, Maker\'s — teach the same mash bill lesson without the lottery.',
    ],
    relatedProducer: 'buffalo-trace',
  },
  {
    slug: 'prohibition',
    title: 'Prohibition and Bourbon\'s Near Death',
    subtitle: 'Why only a handful of distilleries survived 1920–1933',
    readMinutes: 5,
    paragraphs: [
      'When the 18th Amendment took effect in 1920, legal distillation stopped — except for six companies granted medicinal whiskey licenses. Inventory aged in warehouses; equipment rusted; institutional knowledge walked out the door.',
      'Bootleggers filled the gap with often rough, quickly produced spirit. When Repeal came in 1933, the industry rebuilt slowly. Consolidation followed: fewer distilleries, larger brands, consistent sour-mash production at scale.',
      'That consolidation shaped today\'s shelf: a handful of campus distilleries (Beam, Heaven Hill, Buffalo Trace, Wild Turkey) produce a huge share of what Americans drink — often under dozens of label names.',
    ],
  },
  {
    slug: 'bourbon-trail',
    title: 'Birth of the Bourbon Trail',
    subtitle: 'Tourism that saved Kentucky\'s identity',
    readMinutes: 4,
    paragraphs: [
      'In 1999, seven distilleries launched the Kentucky Bourbon Trail as a coordinated tourism play — at a time when bourbon was considered your grandfather\'s drink. Visitors could stamp passports, tour rickhouses, and taste at the source.',
      'The Trail worked. Visitation exploded, craft cocktail culture returned, and premium bourbon became a global export category. Today the Trail includes major campuses and craft stops — and planning a long weekend is its own hobby.',
      'If you cannot visit yet, virtual tours plus the Producer Atlas on Foundry teach the same houses — Buffalo Trace, Maker\'s, Woodford — before you book flights.',
    ],
  },
  {
    slug: 'wild-turkey-jimmy',
    title: 'Wild Turkey and Jimmy Russell',
    subtitle: 'Six decades of the same rickhouses',
    readMinutes: 5,
    paragraphs: [
      'Jimmy Russell joined Wild Turkey in 1954 as a teenager and became one of the longest-tenured master distillers in history. His philosophy: high rye mash bill, patient aging, and proof that respects the consumer who adds water.',
      'Wild Turkey 101 became the benchmark for "bold but fair" — 101 proof as a statement that flavor can carry heat. Russell\'s son Eddie continues the lineage, keeping camp tradition alive while expanding Russell\'s Reserve and rare releases.',
      'Taste Wild Turkey 101 next to 81 proof bourbon from the same house — the same family, different decisions. That comparison is a free master class.',
    ],
    relatedProducer: 'wild-turkey',
  },
  {
    slug: 'makers-wax',
    title: 'Maker\'s Mark and the Red Wax Ritual',
    subtitle: 'Marketing that became tradition',
    readMinutes: 4,
    paragraphs: [
      'Bill Samuels Sr. burned the family recipe — literally — and rebuilt Maker\'s around soft red winter wheat instead of rye. The goal: a bourbon wives would drink. The red wax dip was originally hand-done and became iconic.',
      'Every bottle dipped in wax signals craft attention, even at massive scale. Visitors to Loretto, Kentucky can dip their own bottle — a ritual that turns purchase into memory.',
      'Maker\'s is the hosting bottle for a reason: approachable proof, wheated softness, and a story guests remember after the pour is gone.',
    ],
    relatedProducer: 'makers-mark',
  },
];

export function getStory(slug: string): BourbonStory | undefined {
  return BOURBON_STORIES.find((s) => s.slug === slug);
}
