/** PASS-025 — Financial Independence world depth bundle */

import { buildAcademyLessons } from '../build-academy';
import { buildGlossary } from '../build-glossary';
import type { WorldDepthBundle } from '../types';
import {
  FI_ACADEMY_LEVELS,
  FI_COMMUNITY,
  FI_PARENT_VIEW,
  FI_PORTFOLIO_SECTIONS,
} from '../../financial-independence-world';

export const FI_DEPTH: WorldDepthBundle = {
  slug: 'financial-independence',
  displayName: 'Financial Independence',
  accentColor: 'var(--foundry-success)',
  portfolioLabel: 'My Wealth Portfolio',

  academyLessons: buildAcademyLessons(
    FI_ACADEMY_LEVELS.map((l) => ({
      level: l.level,
      title: l.title,
      tagline: l.tagline,
      missionSlug:
        l.level === 1
          ? 'first-budget'
          : l.level === 3
            ? 'save-1000'
            : l.level === 4
              ? 'analyze-stock'
              : l.level === 5
                ? 'investment-plan'
                : l.level === 6
                  ? 'wealth-strategy'
                  : undefined,
    })),
    'Financial Independence',
  ),

  glossary: buildGlossary([
    ['Budget', 'A plan assigning every dollar of income to expenses, savings, or goals', 'You cannot keep value you do not track — budgeting is the foundation', 'Income $400 · Fixed $120 · Variable $180 · Savings $100 — every dollar named', ['Cash Flow', 'Savings Rate']],
    ['Emergency Fund', 'Cash reserved for unexpected costs — start with $1,000, grow toward 3–6 months expenses', 'Prevents debt spirals when life happens', 'Car repair hits; you pay from savings instead of a 24% APR credit card', ['Compound Interest', 'Liquidity']],
    ['Compound Interest', 'Earning returns on both principal and prior interest — time multiplies growth', 'Why starting young beats starting rich late', '$100/month at 7% for 40 years grows far beyond what you put in', ['Index Fund', 'Time Horizon']],
    ['Index Fund', 'Low-cost fund tracking a broad market index like the S&P 500', 'Simplest diversified start for long-term investors', 'VOO or FXAIX mirrors 500 large U.S. companies in one purchase', ['ETF', 'Diversification']],
    ['Stock', 'A share of ownership in one company — higher risk, requires research', 'Mission 3 teaches analysis before buying anything', 'You own a slice of Apple — you share in profits and price moves', ['Dividend', 'Capital Gains']],
    ['Asset Allocation', 'How you divide money among stocks, bonds, cash, and other assets', 'Matches risk to timeline — aggressive young, steadier near goals', 'Age 16: mostly index funds; near college: more cash for tuition', ['Diversification', 'Rebalancing']],
    ['ROI', 'Return on Investment — gain relative to what you put in', 'Compares options: side hustle vs cut subscription vs invest', 'Earn $200 on a $50 tool resale — 300% ROI on that flip', ['Compound Interest', 'Opportunity Cost']],
    ['Inflation', 'General rise in prices — cash loses purchasing power over time', 'Why saving alone is not enough for long goals', 'What cost $100 ten years ago may cost $130 today', ['Real Return', 'Savings Rate']],
    ['Net Worth', 'Everything you own minus everything you owe', 'The scoreboard for wealth — track it yearly', '$2,000 savings + $800 laptop − $500 owed = $2,300 net worth', ['Asset', 'Liability']],
    ['Passive Income', 'Money earned with minimal ongoing time — investing, royalties, rent', 'Long-term FI goal — investments working while you sleep', 'Index fund dividends reinvested without selling hours', ['Dividend', 'FIRE']],
    ['ETF', 'Exchange-Traded Fund — trades like a stock, holds a basket of assets', 'Flexible, often low-fee way to invest in indexes', 'Buy one share of an ETF at market open like any stock', ['Index Fund', 'Expense Ratio']],
    ['Mutual Fund', 'Pooled investment managed professionally — buy at end-of-day NAV', 'Alternative to ETFs; watch fees and minimums', 'Target-date fund shifts from stocks to bonds as you age', ['Index Fund', 'Expense Ratio']],
    ['Bond', 'Loan to a government or company paying interest over time', 'Usually lower risk and return than stocks — stabilizes portfolios', 'U.S. Treasury bond pays fixed interest until maturity', ['Asset Allocation', 'Yield']],
    ['Dividend', 'Company payment to shareholders from profits', 'Income stream some investors reinvest', 'You own shares; company pays $0.50 per share quarterly', ['Stock', 'Passive Income']],
    ['Capital Gains', 'Profit when you sell an asset for more than you paid', 'Taxes may apply — know holding periods', 'Buy fund at $50, sell at $65 — $15 short-term gain', ['Stock', 'Tax-Advantaged Account']],
    ['Brokerage Account', 'Account at a firm where you buy and sell investments', 'Gateway to stocks, ETFs, and funds once you are ready', 'Fidelity, Schwab, or Vanguard youth/custodial account with a parent', ['Index Fund', 'Asset Allocation']],
    ['401(k)', 'Employer-sponsored retirement plan with tax benefits — for when you work', 'Start early when eligible — employer match is free money', 'Employer matches 3% of pay if you contribute 3%', ['Roth IRA', 'Tax-Advantaged Account']],
    ['IRA', 'Individual Retirement Account — tax-advantaged investing for retirement', 'Decades of compound growth — parents can help open custodial versions', 'Contribute earned income from a summer job into a Roth IRA', ['Roth IRA', 'Compound Interest']],
    ['Roth IRA', 'IRA funded with after-tax dollars; qualified withdrawals tax-free later', 'Powerful for young earners in low tax brackets now', 'Invest summer job money; decades of growth withdraw tax-free in retirement', ['IRA', 'Tax-Advantaged Account']],
    ['Liquidity', 'How quickly an asset converts to cash without major loss', 'Emergency fund must be liquid — not locked in risky bets', 'Savings account: high liquidity. House: low liquidity.', ['Emergency Fund', 'Cash Flow']],
    ['Diversification', 'Spreading money across many assets to reduce single-company risk', 'Avoid betting everything on one stock you heard about online', 'Index fund holds hundreds of companies — one failure barely moves you', ['Index Fund', 'Asset Allocation']],
    ['Expense Ratio', 'Annual fee charged by a fund, expressed as percent of assets', 'Small differences compound to huge costs over decades', '0.03% index fund vs 1.2% active fund — keep the difference', ['Index Fund', 'ETF']],
    ['S&P 500', 'Index of 500 large U.S. companies — common benchmark for market returns', 'Context for how your investments compare to the broad market', 'If the S&P 500 returns 10% and your stock picks return 2%, rethink strategy', ['Index Fund', 'Benchmark']],
    ['Bull Market', 'Extended period of rising stock prices and optimism', 'Stay the course — do not confuse luck with skill', 'Markets rise for years; panic selling locks in losses', ['Bear Market', 'Dollar-Cost Averaging']],
    ['Bear Market', 'Extended decline of roughly 20%+ — fear and selling dominate', 'Plans written in calm times prevent panic decisions', 'Portfolio drops 25%; your written plan says keep contributing monthly', ['Bull Market', 'Rebalancing']],
    ['Recession', 'Broad economic slowdown — jobs, spending, and markets often suffer', 'Emergency fund and skills (AI Builder) matter more in downturns', 'Unemployment rises; side income and savings buffer help', ['Emergency Fund', 'Cash Flow']],
    ['Debt', 'Money you owe — credit cards, loans, student debt', 'High-interest debt destroys wealth faster than investing builds it', 'Pay off 22% card balance before chasing 7% market averages', ['Interest Rate', 'Credit Score']],
    ['Credit Score', 'Number summarizing borrowing history — affects loan rates', 'Future car, apartment, and business loans depend on it', 'Pay on time, keep balances low — score improves over years', ['Debt', 'APR']],
    ['Interest Rate', 'Cost of borrowing or reward for saving — expressed as annual percent', 'Compares savings APY vs credit card APR instantly', 'Savings earns 4% APY; card charges 24% APR — math is brutal', ['APR', 'Compound Interest']],
    ['APR', 'Annual Percentage Rate — yearly cost of borrowing including fees', 'True cost of credit cards and loans', 'Advertised 19.99% APR on a card — paying minimum keeps you in debt years', ['Interest Rate', 'Debt']],
    ['Cash Flow', 'Money in minus money out over a period — the pulse of your finances', 'Positive cash flow funds savings and investing', 'Earn $600, spend $550 — $50/month toward $1,000 goal', ['Budget', 'Savings Rate']],
    ['Fixed Costs', 'Expenses that stay roughly the same each month — rent, phone, subscriptions', 'Cutting fixed costs frees money every month automatically', 'Phone $45 + streaming $15 = $60 fixed before food or fun', ['Variable Costs', 'Budget']],
    ['Variable Costs', 'Spending that changes month to month — food, gas, entertainment', 'Where most budget surprises hide', 'Dining out $120 one month, $60 the next — track the pattern', ['Fixed Costs', 'Budget']],
    ['Savings Rate', 'Percent of income saved or invested — key FI metric', 'Higher savings rate accelerates every goal', 'Save $80 of $400 income — 20% savings rate', ['Budget', 'FIRE']],
    ['FIRE', 'Financial Independence, Retire Early — live off investments, not a paycheck', 'North star concept; teen version is habits and optionality', 'Save aggressively, invest simply, gain freedom to choose work you love', ['Passive Income', 'Withdrawal Rate']],
    ['Withdrawal Rate', 'Percent of portfolio withdrawn yearly in retirement — 4% rule is famous', 'Connects portfolio size to living expenses', '$40,000/year needs roughly $1M at 4% — long horizon for teens', ['FIRE', 'Compound Interest']],
    ['Dollar-Cost Averaging', 'Investing fixed amounts on a schedule regardless of market price', 'Removes timing stress — buy more shares when prices dip', '$25 every Friday into an index fund whether market is up or down', ['Index Fund', 'Bear Market']],
    ['Rebalancing', 'Adjusting portfolio back to target allocation after market moves', 'Discipline skill — sell high, buy low in small doses', 'Stocks grew to 90% of portfolio; plan says 80% — sell some, buy bonds', ['Asset Allocation', 'Diversification']],
    ['Tax-Advantaged Account', 'Account with special tax rules — IRAs, 401(k)s, HSAs when eligible', 'Keep more of what compound growth earns', 'Roth IRA growth may never be taxed if rules followed', ['Roth IRA', 'Capital Gains']],
    ['HSA', 'Health Savings Account — triple tax advantage when paired with eligible health plan', 'Adult tool to know; powerful for medical costs later', 'Contribute pre-tax, grow tax-free, withdraw for qualified medical expenses', ['Tax-Advantaged Account', 'Emergency Fund']],
    ['CD', 'Certificate of Deposit — bank savings locked for a term at fixed rate', 'Safe place for money needed in 1–2 years', '12-month CD at 4.5% for laptop fund due next school year', ['Liquidity', 'Emergency Fund']],
    ['Money Market', 'Low-risk account or fund holding short-term debt — modest yield', 'Parking spot between checking and investing', 'Hold tuition chunk earning more than checking until bill due', ['Liquidity', 'CD']],
    ['Gross Income', 'Total earnings before taxes and deductions', 'Starting number on every budget', 'Paycheck says $500 gross — not all lands in your account', ['Net Income', 'Cash Flow']],
    ['Net Income', 'Take-home pay after taxes and deductions', 'What actually hits your bank for budgeting', '$500 gross becomes $420 net after tax — budget the $420', ['Gross Income', 'Budget']],
    ['Lifestyle Inflation', 'Spending more as income rises — new money disappears', 'Wealthy-feeling broke people often suffer this', 'Raise allowance $50 but spend $50 more on snacks — savings flat', ['Savings Rate', 'Budget']],
    ['Opportunity Cost', 'Value of the next-best option you give up when you choose', 'Every dollar has a tradeoff — teaches smart decisions', 'Spend $80 on shoes or add $80 to investment plan — what matters more?', ['ROI', 'Budget']],
    ['Principal', 'Original amount of money saved or invested before interest', 'Compound growth stacks on principal over time', '$1,000 principal at 6% earns $60 year one; more each year after', ['Compound Interest', 'Yield']],
    ['Yield', 'Income return on an investment — interest or dividends as percent', 'Compares savings accounts, bonds, and dividend stocks', 'Savings account yields 4%; bond fund yields 3.5%', ['Dividend', 'Bond']],
    ['Real Return', 'Investment return minus inflation — purchasing power gained', 'Nominal 7% return with 3% inflation ≈ 4% real', 'Your account grows but groceries cost more — real return is what counts', ['Inflation', 'Compound Interest']],
    ['Benchmark', 'Standard used to judge performance — often an index', 'Know if stock picking beat doing nothing smart', 'Compare your picks to S&P 500 over the same period', ['S&P 500', 'Index Fund']],
  ]),

  community: {
    name: FI_COMMUNITY.name,
    memberRoles: [
      { role: 'Explorer', description: 'Building first budgets and tracking spending — shares surprises, not shame' },
      { role: 'Saver', description: 'Members actively pursuing $1,000 cushion with visible trackers' },
      { role: 'Analyst', description: 'Completes stock research missions — posts bull/bear summaries' },
      { role: 'Planner', description: 'Shares redacted investment plans and monthly review notes' },
      { role: 'Mentor', description: 'Level 7 members who facilitate Monthly Money Review and family challenges' },
    ],
    weeklyChallenge: 'Log every purchase for seven days — post one insight and one change you will make next week (no dollar amounts required if you prefer privacy).',
    showcaseFormat: 'Strategy card: mission name, one chart or screenshot (redact account numbers), reflection paragraph, and optional ask for feedback.',
    peerFeedbackLoop: 'Comment on two strategy showcases with: One strength · One risk you see · One question. Request feedback only after giving two reviews.',
    mentorRole: 'Mentors lead Monthly Money Review threads, share age-appropriate resources, and pair peers for savings accountability buddies.',
  },

  parent: {
    headline: FI_PARENT_VIEW.headline,
    oneLiner: FI_PARENT_VIEW.oneLiner,
    whyItMatters:
      'Schools rarely teach budgeting, saving, and investing consistently. Foundry fills the gap with missions that produce real documents — budgets, trackers, analyses, and plans — stored in My Wealth Portfolio.',
    whatTheyBuild:
      'Five missions: first budget, $1,000 savings plan, stock analysis, investment plan, and personal wealth strategy — plus labs for compound interest, paper trading, and side income brainstorming.',
    skillsDemonstrated: [
      'Monthly budgeting and cash-flow awareness',
      'Automated savings habits',
      'Company research before investing',
      'Long-term goal and allocation planning',
      'Integrated wealth strategy',
      'Teaching family members money habits',
      'Monthly review discipline',
    ],
    howProgressMeasured:
      'Budget and plan documents · Savings tracker screenshots · Stock analysis write-ups · Reflections on money mindset · Portfolio artifacts — not worksheets or test scores.',
    successAfter30Days:
      'After 30 days, a committed student has a working budget, automatic savings started (even small amounts), one written reflection on spending surprises, and can walk you through their numbers without embarrassment.',
    sections: FI_PARENT_VIEW.sections,
  },

  seoGuides: [
    {
      slug: 'what-is',
      title: 'What Is Financial Independence World?',
      summary: 'A mission-based path to understand, save, invest, and plan money — Create value with AI Builder, keep value here.',
      sections: [
        { heading: 'Keep value, not just earn it', body: 'Financial Independence World teaches budgeting, emergency savings, research-before-investing, and long-term planning through five missions with evidence stored in My Wealth Portfolio.' },
        { heading: 'Who it is for', body: 'Teens with allowance or first jobs, young adults starting careers, and parents who want structured money education beyond school.' },
        { heading: 'Trinity context', body: 'AI Builder creates value. Financial Independence keeps it. Public Speaking helps you explain your plans to family, investors, or employers.' },
      ],
    },
    {
      slug: 'beginner-guide',
      title: 'Financial Independence Beginner Guide',
      summary: 'Start at Money Explorer (Level 1). Mission 1: build your first real monthly budget in 45–60 minutes.',
      sections: [
        { heading: 'Day one', body: 'List last month income and expenses. Use Google Sheets or a free app. Assign every dollar. Screenshot your budget.' },
        { heading: 'First week', body: 'Track every purchase. Note your biggest surprise category. Write two sentences in your reflection box.' },
        { heading: 'Tools', body: 'Spreadsheet, bank app export, or Monarch/YNAB trial. One month of spending history helps.' },
        { heading: 'Mindset', body: 'No judgment — clarity first. Every adult wishes they started younger.' },
      ],
    },
    {
      slug: 'road-to-role',
      title: 'Road to Financial Mentor — Seven Levels',
      summary: 'From Money Explorer to Financial Mentor — each level unlocks missions and Wealth Builders Circle privileges.',
      sections: [
        { heading: 'Levels 1–2', body: 'Money Explorer and Budget Builder — Mission 1: First Budget. Savings Lab unlocks.' },
        { heading: 'Level 3', body: 'Saver — Mission 2: Save $1,000 with automation and tracker.' },
        { heading: 'Levels 4–5', body: 'Investor and Wealth Planner — Missions 3–4: stock analysis and investment plan.' },
        { heading: 'Levels 6–7', body: 'Wealth Strategist integrates everything; Financial Mentor leads circle reviews.' },
      ],
    },
    {
      slug: 'common-mistakes',
      title: 'Common Financial Independence Mistakes',
      summary: 'Skipping the budget, chasing hot stocks, and investing before an emergency fund.',
      sections: [
        { heading: 'Investing before budgeting', body: 'You need cash flow clarity before market picks. Mission order exists for a reason.' },
        { heading: 'Crypto as first investment', body: 'Mission 3 analyzes one public company — learn research discipline on understandable assets first.' },
        { heading: 'No emergency fund', body: 'One surprise expense without $1,000 saved forces expensive debt.' },
        { heading: 'Panic in downturns', body: 'Mission 4 stress-tests plans — write your response before fear hits.' },
        { heading: 'Secrets from parents', body: 'Under 18, share plans with a trusted adult. Custodial accounts require it anyway.' },
      ],
    },
    {
      slug: 'first-5-projects',
      title: 'First 5 Financial Independence Projects',
      summary: 'Five missions that build your complete money operating system.',
      sections: [
        { heading: '1. First Budget', body: '45–60 min. Monthly budget with income, fixed, variable, savings. Evidence: screenshot + surprise paragraph.' },
        { heading: '2. Save $1,000', body: 'Setup plus weeks of saving. Automated transfers and tracker. Evidence: automation screenshot + reflection.' },
        { heading: '3. Analyze a Stock', body: '60–90 min. One company, bull/bear case, verdict. Evidence: one-page analysis.' },
        { heading: '4. Investment Plan', body: '90 min. Three goals, timelines, allocation approach. Evidence: 1–2 page plan.' },
        { heading: '5. Wealth Strategy', body: '2–3 hours. Integrate budget, savings, investing, income growth, monthly review calendar.' },
      ],
    },
    {
      slug: 'glossary-index',
      title: 'Financial Independence Glossary — 50 Terms',
      summary: 'Budget, compound interest, index funds, asset allocation, FIRE, and the vocabulary of keeping value.',
      sections: [
        { heading: 'Foundations', body: 'Budget, cash flow, fixed costs, variable costs, net worth, savings rate, pay yourself first.' },
        { heading: 'Saving and safety', body: 'Emergency fund, liquidity, CD, money market, lifestyle inflation, opportunity cost.' },
        { heading: 'Investing', body: 'Stock, index fund, ETF, compound interest, diversification, dollar-cost averaging, expense ratio.' },
        { heading: 'Planning', body: 'Asset allocation, FIRE, withdrawal rate, tax-advantaged account, Roth IRA, benchmark, real return.' },
      ],
    },
    {
      slug: 'parent-guide',
      title: 'Financial Independence — Parent Guide',
      summary: 'What your child learns, how to support them, and realistic 30-day outcomes.',
      sections: [
        { heading: 'Why now', body: FI_PARENT_VIEW.sections[0].body },
        { heading: 'Skills that compound', body: FI_PARENT_VIEW.sections[2].body },
        { heading: 'Portfolio artifacts', body: 'Budgets in ' + FI_PORTFOLIO_SECTIONS[0].title + ', savings in ' + FI_PORTFOLIO_SECTIONS[1].title + ', analyses in ' + FI_PORTFOLIO_SECTIONS[2].title + '.' },
        { heading: 'Conversation starters', body: 'What surprised you in your budget? How much are you saving automatically? Explain your stock pick in three minutes.' },
        { heading: '30-day success', body: 'Working budget, savings automation live, one stock or index fund researched (even if not bought), and a scheduled monthly review on the calendar.' },
      ],
    },
  ],
};
