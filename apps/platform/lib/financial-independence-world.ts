/** PASS-018 — Financial Independence World (Keep Value) */

import type { WorldMission } from '../components/world/WorldMissionRunner';

export const FI_LOOP = [
  { step: 'Mission', description: 'Pick a real money goal worth pursuing' },
  { step: 'Build', description: 'Create a budget, plan, or analysis that works' },
  { step: 'Show', description: 'Document numbers — spreadsheet, screenshot, or summary' },
  { step: 'Debrief', description: 'Write what changed in how you think about money' },
  { step: 'Refine', description: 'Adjust based on what you learned' },
  { step: 'Teach', description: 'Teach a family member or peer one money habit' },
] as const;

export const FI_ACADEMY_LEVELS = [
  { slug: 'saver', level: 1, title: 'Money Explorer', tagline: 'Understand where money comes from and goes', unlocks: ['Mission 1: First Budget'] },
  { slug: 'budgeter', level: 2, title: 'Budget Builder', tagline: 'Track income and expenses with confidence', unlocks: ['Savings Lab'] },
  { slug: 'accumulator', level: 3, title: 'Saver', tagline: 'Build your first $1,000 cushion', unlocks: ['Mission 2: Save $1,000'] },
  { slug: 'investor', level: 4, title: 'Investor', tagline: 'Understand stocks, funds, and compound growth', unlocks: ['Mission 3: Analyze a Stock', 'Investing Lab'] },
  { slug: 'planner', level: 5, title: 'Wealth Planner', tagline: 'Design a long-term investment plan', unlocks: ['Mission 4: Investment Plan'] },
  { slug: 'strategist', level: 6, title: 'Wealth Strategist', tagline: 'Integrate income, savings, investing, and goals', unlocks: ['Mission 5: Personal Wealth Strategy'] },
  { slug: 'mentor', level: 7, title: 'Financial Mentor', tagline: 'Teach others — family, peers, community', unlocks: ['Wealth Builders Circle'] },
];

const FI_FOUNDATION_MISSIONS: WorldMission[] = [
  {
    slug: 'first-budget',
    number: 1,
    title: 'Build Your First Budget',
    subtitle: 'See exactly where your money goes — the foundation of everything',
    outcome: 'A working monthly budget you can actually follow — income, fixed costs, variable spending, and savings',
    evidence: 'Budget spreadsheet or app screenshot + one paragraph on your biggest surprise',
    timeEstimate: '45–60 min',
    requiredLevel: 'Money Explorer (Level 1 — you start here)',
    futureProof: 'You cannot keep value you do not understand. Every adult wishes they learned this at 14.',
    toolsNeeded: 'Spreadsheet (Google Sheets, Excel) or free app like Monarch, YNAB trial, or your bank app — plus one month of spending to review.',
    tomorrowHook: 'Tomorrow: open Mission 2 and set up your first automatic transfer toward $1,000 saved.',
    nextMissionSlug: 'save-1000',
    steps: [
      { phase: 'Mission', title: 'Pick your timeframe', body: 'Use last month or this month. List every income source: allowance, job, gifts, side hustle. Write the total.' },
      {
        phase: 'Build',
        title: 'Build the budget',
        body: 'Create four rows: Income · Fixed costs (phone, subscriptions) · Variable (food, fun) · Savings. Assign every dollar. If money is left over, assign it to savings before spending.',
        checklist: ['List all income sources', 'Track every expense category', 'Assign a savings amount — even $5 counts'],
      },
      { phase: 'Show', title: 'Save your budget', body: 'Screenshot or export your budget. This goes in My Wealth Portfolio.' },
      { phase: 'Debrief', title: 'Biggest surprise?', body: 'Write 2–3 sentences in the reflection box below: Where did you spend more than expected? What one category would you change next month? This becomes your portfolio artifact.' },
      { phase: 'Refine', title: 'Cut one thing', body: 'Find one subscription or habit to reduce. Update the budget.' },
      { phase: 'Teach', title: 'Show a parent', body: 'Walk a parent through your budget. Ask what they wish they knew at your age.' },
    ],
  },
  {
    slug: 'save-1000',
    number: 2,
    title: 'Save Your First $1,000',
    subtitle: 'Build the emergency cushion that changes how safe you feel',
    outcome: 'A savings plan with automatic transfers and a visible progress tracker toward $1,000',
    evidence: 'Savings tracker screenshot + reflection on how it feels to have a goal',
    timeEstimate: '60 min setup + weeks to reach goal',
    requiredLevel: 'Saver (Level 3)',
    futureProof: 'Financial stress ruins focus. A $1,000 cushion is the first wall against chaos.',
    tomorrowHook: 'Tomorrow: research one stock or index fund for Mission 3.',
    nextMissionSlug: 'analyze-stock',
    steps: [
      { phase: 'Mission', title: 'Name your why', body: 'Write why $1,000 matters: emergency fund, first car, college buffer, independence from asking parents.' },
      { phase: 'Build', title: 'Automate savings', body: 'Open or use a savings account. Set automatic weekly transfer — even $10/week. Create a tracker: starting balance, target, date.' },
      { phase: 'Show', title: 'Document the plan', body: 'Screenshot your automation + tracker. Add to portfolio.' },
      { phase: 'Debrief', title: 'What got easier?', body: 'Did automating remove decision fatigue? What would make you quit — and how do you prevent that?' },
      { phase: 'Refine', title: 'Find $20 more', body: 'One side task, sold item, or cut to accelerate the goal by one week.' },
      { phase: 'Teach', title: 'Challenge a friend', body: 'Invite someone to a savings challenge — compare progress monthly.' },
    ],
  },
  {
    slug: 'analyze-stock',
    number: 3,
    title: 'Analyze a Stock',
    subtitle: 'Understand what you are buying before you buy anything',
    outcome: 'A one-page analysis of one company: what they do, revenue, risks, and your verdict',
    evidence: 'Analysis document + buy/hold/wait recommendation with reasons',
    timeEstimate: '60–90 min',
    requiredLevel: 'Investor (Level 4)',
    futureProof: 'Investing without understanding is gambling. Analysis is how you keep value instead of losing it.',
    tomorrowHook: 'Tomorrow: draft your first full investment plan in Mission 4.',
    nextMissionSlug: 'investment-plan',
    steps: [
      { phase: 'Mission', title: 'Pick one company', body: 'Choose a company you know: Apple, Nike, Disney, or a local brand. Not crypto — one public company.' },
      { phase: 'Build', title: 'Research and analyze', body: 'Answer: What do they sell? How do they make money? What could go wrong? Use free sources: company investor page, Yahoo Finance, annual report summary.' },
      { phase: 'Show', title: 'Write your verdict', body: 'One page: summary, bull case, bear case, your recommendation (learn now / watch / not yet).' },
      { phase: 'Debrief', title: 'What was hard to find?', body: 'What information was confusing? What would you check before investing real money?' },
      { phase: 'Refine', title: 'Compare to an index fund', body: 'Add one paragraph: why might an index fund be simpler for beginners?' },
      { phase: 'Teach', title: 'Explain to someone', body: 'Teach a parent or sibling how you analyzed the company in 3 minutes.' },
    ],
  },
  {
    slug: 'investment-plan',
    number: 4,
    title: 'Build an Investment Plan',
    subtitle: 'Connect your goals to a long-term strategy — not random picks',
    outcome: 'A written plan: goals, timeline, risk level, account type, and allocation approach',
    evidence: 'Investment plan document (1–2 pages)',
    timeEstimate: '90 min',
    requiredLevel: 'Wealth Planner (Level 5)',
    futureProof: 'Wealth is built by plan, not luck. This document is something adults pay advisors thousands to write.',
    tomorrowHook: 'Tomorrow: integrate everything into your Personal Wealth Strategy — Mission 5.',
    nextMissionSlug: 'wealth-strategy',
    steps: [
      { phase: 'Mission', title: 'Define 3 goals', body: 'Short (1 yr), medium (5 yr), long (20+ yr). Examples: laptop, college, financial independence.' },
      { phase: 'Build', title: 'Write the plan', body: 'For each goal: amount needed, timeline, risk you can accept, account type (savings, brokerage, retirement when older), suggested approach (index funds, bonds mix).' },
      { phase: 'Show', title: 'Save the plan', body: 'Add to My Wealth Portfolio. Share with a parent if under 18.' },
      { phase: 'Debrief', title: 'What surprised you?', body: 'How much do you need to invest monthly to hit a long-term goal?' },
      { phase: 'Refine', title: 'Stress test', body: 'What happens if markets drop 30%? Write how you would respond without panic selling.' },
      { phase: 'Teach', title: 'Review with an adult', body: 'Ask a parent or trusted adult to critique your plan — one improvement.' },
    ],
  },
  {
    slug: 'wealth-strategy',
    number: 5,
    title: 'Build a Personal Wealth Strategy',
    subtitle: 'Create + Keep value together — your complete money operating system',
    outcome: 'Integrated strategy linking budget, savings, investing, and income growth',
    evidence: 'Wealth strategy one-pager + link to AI Builder if you automate tracking with AI',
    timeEstimate: '2–3 hours',
    requiredLevel: 'Wealth Strategist (Level 6)',
    futureProof: 'AI Builder creates value. Financial Independence keeps it. Together: future-proof.',
    tomorrowHook: 'Tomorrow: start Public Speaking World — deliver your first 3-minute talk at /public-speaking.',
    steps: [
      { phase: 'Mission', title: 'Audit your system', body: 'Gather: budget (M1), savings plan (M2), stock analysis (M3), investment plan (M4). What is missing?' },
      { phase: 'Build', title: 'Write your strategy', body: 'One page: monthly money flow, savings rate %, investment approach, one income growth action, review cadence (monthly).' },
      { phase: 'Show', title: 'Publish to portfolio', body: 'This is your capstone artifact — the proof you understand money.' },
      { phase: 'Debrief', title: 'Create + Keep', body: 'How does earning more (AI Builder) matter without keeping it (FI)? Write 3 sentences.' },
      { phase: 'Refine', title: 'Set calendar review', body: 'Schedule first monthly money review — 30 minutes, same day each month.' },
      { phase: 'Teach', title: 'Wealth Builders Circle', body: 'Share one lesson from your strategy with a peer or family member.' },
    ],
  },
];

import { expandFiMissions, FI_TRACKS } from './immersion/worlds/financial-independence';

export { FI_TRACKS };
export const FI_MISSIONS = expandFiMissions(FI_FOUNDATION_MISSIONS);

export const FI_PLAYGROUND_LABS = [
  { slug: 'savings-lab', title: 'Savings Lab', description: 'Experiment with compound interest calculators and savings rates.', unlockLevel: 'Budget Builder' },
  { slug: 'investing-lab', title: 'Investing Lab', description: 'Paper trade, compare ETFs, simulate 10-year growth.', unlockLevel: 'Investor' },
  { slug: 'budget-lab', title: 'Budget Lab', description: 'Try zero-based vs 50/30/20 budgeting on sample incomes.', unlockLevel: 'Money Explorer' },
  { slug: 'side-income-lab', title: 'Side Income Lab', description: 'Brainstorm age-appropriate ways to earn — link to AI Builder automations.', unlockLevel: 'Saver' },
  { slug: 'family-lab', title: 'Family Lab', description: 'Model household budgets, college costs, and family financial goals.', unlockLevel: 'Wealth Planner' },
];

export const FI_PORTFOLIO_SECTIONS = [
  { slug: 'budgets', title: 'My Budgets', description: 'Monthly budgets and revisions' },
  { slug: 'savings', title: 'My Savings Goals', description: 'Progress toward milestones' },
  { slug: 'analyses', title: 'My Analyses', description: 'Stock and investment research' },
  { slug: 'wins', title: 'My Wins', description: 'Evidence, reflections, money habits formed' },
];

export const FI_PARENT_VIEW = {
  headline: 'Why Financial Independence matters for your child',
  oneLiner:
    'Your child learns to budget, save, and invest through real missions—not worksheets—and builds money skills schools skip.',
  sections: [
    { title: 'Why money matters now', body: 'Financial literacy is not taught consistently in schools. Foundry fills the gap with projects that stick — budget, save, analyze, plan.' },
    { title: 'Jobs and life skills', body: 'Every career needs money management. Plus: financial analyst, planner, accountant, entrepreneur — all start with understanding cash flow.' },
    { title: 'Skills that compound', body: 'Budgeting · Saving automatically · Research before investing · Long-term planning · Teaching others (mentor level)' },
    { title: 'What your child is building', body: 'Five missions: first budget, $1,000 saved, stock analysis, investment plan, personal wealth strategy — all in My Wealth Portfolio.' },
    { title: 'How progress is measured', body: 'Evidence documents · Reflections · Portfolio artifacts · Not test scores — real financial decisions documented.' },
  ],
};

export const FI_CAREERS = [
  { title: 'Financial Planner', connection: 'Help families keep and grow value' },
  { title: 'Accountant', connection: 'Track and optimize money flows' },
  { title: 'Entrepreneur', connection: 'Keep the value you create in business' },
  { title: 'Real Estate Investor', connection: 'Build wealth through assets' },
  { title: 'Teacher', connection: 'Model financial responsibility for the next generation' },
  { title: 'Doctor / Professional', connection: 'High earners who fail to keep value — FI prevents that' },
  { title: 'Public Policy', connection: 'Understand economics and household impact' },
  { title: 'Parent', connection: 'The first paying customer — teach your household' },
];

export const FI_GLOSSARY = [
  { term: 'Budget', definition: 'A plan for income and expenses — every dollar assigned' },
  { term: 'Emergency Fund', definition: 'Cash saved for unexpected costs — typically 3–6 months expenses; start with $1,000' },
  { term: 'Compound Interest', definition: 'Earning interest on interest — time is the multiplier' },
  { term: 'Index Fund', definition: 'A fund that tracks the whole market — diversified, low-cost starting point' },
  { term: 'Stock', definition: 'Ownership share in one company — higher risk, higher research need' },
  { term: 'Asset Allocation', definition: 'How you split money between stocks, bonds, cash' },
  { term: 'ROI', definition: 'Return on investment — what you gained relative to what you put in' },
  { term: 'Inflation', definition: 'Money losing purchasing power over time — why saving alone is not enough' },
  { term: 'Net Worth', definition: 'What you own minus what you owe' },
  { term: 'Passive Income', definition: 'Money earned without trading hours — investing, rentals, royalties' },
];

export const FI_COMMUNITY = {
  name: 'Wealth Builders Circle',
  features: [
    { title: 'Strategy Showcases', description: 'Share budgets and plans — learn from peers' },
    { title: 'Monthly Money Review', description: 'Group accountability — did you hit savings goals?' },
    { title: 'Family Challenges', description: 'Parents and kids on the same savings mission' },
  ],
};

export function getFiMission(slug: string): WorldMission | undefined {
  return FI_MISSIONS.find((m) => m.slug === slug);
}

export const FI_PORTFOLIO_KEY = 'foundry-fi-portfolio';
