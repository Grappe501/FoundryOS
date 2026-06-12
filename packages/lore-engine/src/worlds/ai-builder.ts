import type { WorldLoreBundle } from '../types';

export const AI_BUILDER_LORE: WorldLoreBundle = {
  world_slug: 'ai-builder',
  world_name: 'AI Builder',
  tagline: 'Origin stories of builders — not celebrity worship.',
  heroes: [
    {
      id: 'early-hacker',
      name: 'The garage hacker',
      tagline: 'Built because the tool did not exist yet.',
      obsession: 'Shipping before permission — scripts that saved an hour became products that saved a year.',
      failure: 'Most projects died in private repos. Documentation never happened.',
      breakthrough: 'One tool shared publicly became the portfolio piece that changed a career.',
      whyMatters: 'Every AI Builder starts as a hacker with a problem — not a certificate.',
    },
    {
      id: 'indie-founder',
      name: 'The indie founder',
      tagline: 'Distribution before perfection.',
      obsession: 'One paying user as proof — not one perfect feature.',
      failure: 'Built for six months without talking to customers.',
      breakthrough: 'Launched ugly, iterated weekly, raised prices when value was obvious.',
      whyMatters: 'Code is cheap. Distribution is the moat.',
    },
  ],
  rivalries: [
    {
      id: 'nocode-vs-code',
      title: 'No-code vs Code',
      sideA: { label: 'No-code', argument: 'Speed to validation — Zapier, Bubble, AI wrappers ship in days.' },
      sideB: { label: 'Code', argument: 'Ownership, scale, and defensibility when the product survives contact.' },
      foundryTake: 'Start no-code to learn; graduate to code when revenue proves the idea.',
      href: '/ai-builder/missions',
    },
    {
      id: 'builder-vs-consultant',
      title: 'Builder vs Consultant',
      sideA: { label: 'Builder', argument: 'Equity in your own product — asymmetric upside.' },
      sideB: { label: 'Consultant', argument: 'Cash now, learn many domains, lower risk.' },
      foundryTake: 'Consulting funds building. Building validates consulting. Most careers need both.',
    },
  ],
  mysteries: [
    {
      id: 'why-succeed',
      question: 'Why do some projects succeed?',
      tease: 'Usually distribution + timing + one painful problem — rarely "best code."',
      answer: 'Winners solve a problem someone already pays to fix, ship before perfect, and talk to users weekly.',
      rabbitHoleHref: '/my-future',
    },
    {
      id: 'why-fail',
      question: 'Why do most startups fail?',
      tease: 'No market, not no product.',
      answer: 'Building what nobody asked for. Avoiding sales. Running out of runway before learning.',
    },
  ],
  pilgrimages: [
    { id: 'first-automation', title: 'First automation that saves real time', description: 'Not a tutorial — a workflow you use twice.', href: '/ai-builder/missions/homework-assistant', legendaryObjectId: 'first-automation' },
    { id: 'first-app', title: 'First app someone else opens', description: 'URL shared, not localhost.', href: '/ai-builder/portfolio', legendaryObjectId: 'first-website' },
    { id: 'first-dollar', title: 'First paying user', description: 'Money exchanged for your creation — the line between hobby and business.', legendaryObjectId: 'first-paying-user' },
  ],
  controversies: [
    { id: 'ai-replace', debate: 'Will AI replace builders?', campA: 'Yes — commodity tasks vanish.', campB: 'No — orchestration and taste compound.', whyItEndures: 'Every tool wave triggers this panic. Builders who ship win.' },
  ],
  secrets: [
    { id: 'distribution', headline: 'Distribution beats code.', body: 'The best product in a empty room loses to a good product with an audience.', whyFeelsSecret: 'Builders love building; markets love visibility.' },
    { id: 'ship-ugly', headline: 'Ship before you feel ready.', body: 'Feedback is the only teacher that matters after basics.', whyFeelsSecret: 'Perfectionism feels like quality; it is often fear.' },
  ],
  timeline: [
    { year: '1970s', title: 'Homebrew computing', body: 'Hobbyists become Apple and Microsoft — permissionless creation.' },
    { year: '2000s', title: 'Open source & web', body: 'GitHub, Stack Overflow — build in public culture.' },
    { year: '2020s', title: 'AI copilots', body: 'Natural language becomes interface — builders multiply.' },
  ],
  legends: [
    { id: 'garage-to-github', title: 'The Garage Repo That Changed Everything', hook: 'One public script became a career.', chapters: [{ heading: 'Private years', body: 'Tools built for yourself — undocumented, messy, real.' }, { heading: 'The share', body: 'One README, one demo GIF. The internet noticed.' }], whyRemembered: 'Build in public started as embarrassment — then became leverage.' },
    { id: 'dot-com-ghost', title: 'The Startup That Died Before PMF', hook: 'Six months of perfect code. Zero paying users.', chapters: [{ heading: 'The build', body: 'Features stacked. Customers did not.' }, { heading: 'The lesson', body: 'Market first — always market first.' }], whyRemembered: 'Every builder has a graveyard repo. The smart ones visit it often.' },
  ],
  debates: [
    { id: 'ai-replace-builders', title: 'Will AI replace builders?', campA: { label: 'Yes', argument: 'Commodity code generation collapses junior tasks.' }, campB: { label: 'No', argument: 'Orchestration, taste, and distribution compound.' }, whyPeopleReturn: 'Every tool wave triggers panic — then new winners emerge.' },
    { id: 'nocode-real', title: 'Is no-code "real" building?', campA: { label: 'Real enough', argument: 'Shipped product beats perfect architecture.' }, campB: { label: 'Training wheels', argument: 'Without code you rent your moat.' }, whyPeopleReturn: 'Both sides have revenue screenshots.' },
  ],
  foundryOriginals: [
    { id: 'ai-mw', kind: 'mystery-of-week', title: 'Why did this side project suddenly get users?', body: 'Nothing changed in the code. Distribution changed.' },
    { id: 'ai-fd', kind: 'forgotten-distillery', title: 'Forgotten: The first app store indie gold rush', body: '2010 iPhone devs shipped in weeks — before App Store saturation.' },
    { id: 'ai-mb', kind: 'mythbuster', title: 'Mythbuster: You need to learn everything first', body: 'False. You need one shipped artifact and one user conversation.' },
  ],
  whyMatters: [
    { topic: 'Automation', notThis: 'Save time on tasks.', insteadThis: 'Buy back hours to spend on what only you can do.', body: 'Automation is not laziness — it is leverage.' },
  ],
  experienceBeyond: [
    { id: 'environment', factor: 'Build environment', why: 'Distraction-free blocks beat scattered hours.', tip: 'One mission per session. Ship artifact before closing laptop.' },
    { id: 'feedback', factor: 'User feedback loop', why: 'Code without users is a diary.', tip: 'Show one person before adding features.' },
  ],
};
