export type EconomyTopic = {
  id: string;
  title: string;
  tease: string;
  explanation: string;
  rabbitHole?: { label: string; href: string };
};

export const BOURBON_ECONOMY_TOPICS: EconomyTopic[] = [
  {
    id: 'allocation',
    title: 'Allocation',
    tease: 'Why your store gets six bottles and the forum gets six hundred angry posts.',
    explanation: 'Distillers allocate scarce SKUs by state, account tier, and sales history. Liquor boards in control states add another layer. Allocation is not malice — it is supply chain math meeting hype velocity.',
    rabbitHole: { label: 'Case: Why can\'t I find Weller?', href: '/bourbon/detective/weller-ghost' },
  },
  {
    id: 'distributors',
    title: 'Distributors',
    tease: 'The invisible middle between rickhouse and your shelf.',
    explanation: 'Three-tier system: producer → distributor → retailer. Distributors negotiate volume, drive brand placement, and influence what your local shop even has access to. Your "local selection" is partly their portfolio decision.',
  },
  {
    id: 'secondary',
    title: 'Secondary market',
    tease: 'When bourbon becomes furniture for your identity.',
    explanation: 'Facebook groups, auction sites, and parking lot trades price bottles on scarcity and status — not sensory quality. MSRP is the hobby; secondary is speculation. Blind tastings often collapse the gap.',
    rabbitHole: { label: 'Case: Eagle Rare price variance', href: '/bourbon/detective/eagle-rare-price' },
  },
  {
    id: 'msrp',
    title: 'MSRP vs street',
    tease: 'The price on the website vs the price in your hand.',
    explanation: 'MSRP is manufacturer suggestion. Stores set retail. In hype markets, retail exceeds MSRP legally. In control states, price floors and ceilings change the game. Always ask: which price am I looking at?',
  },
  {
    id: 'scarcity',
    title: 'Manufactured vs real scarcity',
    tease: 'Some bottles are rare. Some are rare on purpose.',
    explanation: 'True scarcity: aged stock limits (24yr juice). Perceived scarcity: low batch releases, lottery drops, influencer amplification. Both feel the same in line — only DSP, volume data, and patience tell them apart.',
  },
  {
    id: 'value',
    title: 'The $30 sweet spot',
    tease: 'Where bourbon quality diverges from bourbon marketing.',
    explanation: 'Wild Turkey 101, Evan Williams BiB, Old Forester, Larceny — the enthusiast secret is that learning happens under $35. Splurge bottles reward palates that know what they are paying extra for.',
    rabbitHole: { label: 'Compare daily drinkers', href: '/bourbon/compare' },
  },
];
