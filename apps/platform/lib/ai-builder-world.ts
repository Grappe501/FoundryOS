/** PASS-017 — AI Builder World (not a course). Mission → Build → Show → Debrief → Refine → Teach */

import type { MissionLoopPhase } from './voice-loop';

export const AI_BUILDER_LOOP = [
  { step: 'Mission', description: 'Pick a real problem worth solving' },
  { step: 'Build', description: 'Use AI to create something that works' },
  { step: 'Show', description: 'Share what you built — screenshot, demo, or link' },
  { step: 'Debrief', description: 'Write what you learned and what surprised you' },
  { step: 'Refine', description: 'Iterate — make it better based on feedback' },
  { step: 'Teach', description: 'Teach someone else or help a peer' },
] as const;

export type AcademyLevel = {
  slug: string;
  level: number;
  title: string;
  tagline: string;
  unlocks: string[];
};

export const AI_BUILDER_ACADEMY_LEVELS: AcademyLevel[] = [
  { slug: 'explorer', level: 1, title: 'AI Explorer', tagline: 'Understand what AI is and what it can do', unlocks: ['Mission 1: Homework Assistant'] },
  { slug: 'user', level: 2, title: 'AI User', tagline: 'Use AI tools confidently every day', unlocks: ['Prompt Lab'] },
  { slug: 'creator', level: 3, title: 'AI Creator', tagline: 'Combine tools to produce original work', unlocks: ['Mission 2: Research Agent'] },
  { slug: 'builder', level: 4, title: 'AI Builder', tagline: 'Ship working projects that solve problems', unlocks: ['Mission 3: Business Assistant', 'Automation Lab'] },
  { slug: 'architect', level: 5, title: 'AI Architect', tagline: 'Design systems — agents, workflows, integrations', unlocks: ['Mission 4: Website Builder', 'Agent Lab'] },
  { slug: 'entrepreneur', level: 6, title: 'AI Entrepreneur', tagline: 'Turn AI skills into value others will pay for', unlocks: ['Mission 5: Personal AI Team', 'Business Lab'] },
  { slug: 'mentor', level: 7, title: 'AI Mentor', tagline: 'Teach others and lead the AI Builders Circle', unlocks: ['Peer Reviews', 'Weekly Challenges'] },
];

export type MissionStep = {
  phase: MissionLoopPhase;
  title: string;
  body: string;
  checklist?: string[];
};

export type AiBuilderMission = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  outcome: string;
  evidence: string;
  timeEstimate: string;
  requiredLevel: string;
  futureProof: string;
  toolsNeeded?: string;
  tomorrowHook: string;
  nextMissionSlug?: string;
  track?: string;
  trackLabel?: string;
  steps: MissionStep[];
};

const AI_BUILDER_FOUNDATION_MISSIONS: AiBuilderMission[] = [
  {
    slug: 'homework-assistant',
    number: 1,
    title: 'Build an AI Homework Assistant',
    subtitle: 'Your first real project — help yourself or a sibling study smarter',
    outcome: 'A working assistant that explains concepts, quizzes you, and tracks what you learned',
    evidence: 'Screenshot + 3-sentence reflection on what it helped you understand',
    timeEstimate: '45–90 min',
    requiredLevel: 'AI Explorer (Level 1 — you start here)',
    futureProof: 'Every future job will expect you to learn faster — this teaches you to learn with AI, not cheat with it.',
    toolsNeeded: 'Any free AI chat: ChatGPT, Claude, or Google Gemini — plus your phone or laptop for screenshots.',
    tomorrowHook: 'Tomorrow: open Mission 2 and build a Research Agent on a topic you actually care about.',
    nextMissionSlug: 'research-agent',
    steps: [
      {
        phase: 'Mission',
        title: 'Pick your subject',
        body: 'Choose one class where you want help: math, history, science, or language. Write down one specific problem — like "I forget vocabulary" or "I need practice problems before the test." That is your mission.',
      },
      {
        phase: 'Build',
        title: 'Build your assistant',
        body: 'Open ChatGPT, Claude, or Gemini (all have free tiers). Paste this starter prompt: "You are my homework assistant for [your subject]. Explain concepts simply, quiz me, and check my answers. Ask me one question at a time." Then test it on 3 real homework questions.',
        checklist: [
          'Open a free AI chat (ChatGPT, Claude, or Gemini)',
          'Paste and customize the starter prompt for your subject',
          'Test it on 3 real homework questions and save your best prompt',
        ],
      },
      {
        phase: 'Show',
        title: 'Document what you built',
        body: 'Screenshot your assistant in action. Save the prompt. If you built a simple workflow (Notion + AI, Google Doc + AI), link it.',
      },
      {
        phase: 'Debrief',
        title: 'What did you learn?',
        body: 'Write 3 sentences: What worked? What was harder than expected? Would you use this again before a test?',
      },
      {
        phase: 'Refine',
        title: 'Make it better',
        body: 'Ask a friend or parent to try your assistant. Fix one thing based on their feedback.',
      },
      {
        phase: 'Teach',
        title: 'Teach someone',
        body: 'Show a classmate or sibling how you built it. Help them create their own version for a different subject.',
      },
    ],
  },
  {
    slug: 'research-agent',
    number: 2,
    title: 'Build a Research Agent',
    subtitle: 'Go deep on a topic you actually care about',
    outcome: 'An agent that finds sources, summarizes findings, and produces a brief you could present',
    evidence: 'Research brief (1 page) + list of sources the agent helped you evaluate',
    timeEstimate: '60–120 min',
    requiredLevel: 'AI Creator (Level 3)',
    futureProof: 'Research is how you make better decisions — in school, career, and life. AI accelerates it; you stay in control.',
    tomorrowHook: 'Tomorrow: sketch Mission 3 — find one repetitive task at home or school you could automate.',
    nextMissionSlug: 'business-assistant',
    steps: [
      { phase: 'Mission', title: 'Choose your question', body: 'Pick a question worth answering: college major, local issue, hobby deep-dive, career path. Write it as one clear sentence.' },
      {
        phase: 'Build',
        title: 'Design your research agent',
        body: 'Build a prompt chain or workflow: find sources → summarize → compare viewpoints → draft conclusions. Use RAG if you can (upload PDFs or paste articles).',
        checklist: ['Define 3 sub-questions', 'Run the agent on 5+ sources', 'Produce a 1-page brief'],
      },
      { phase: 'Show', title: 'Publish your brief', body: 'Save your research brief to your portfolio. Include source list with one sentence on why each source is credible.' },
      { phase: 'Debrief', title: 'What surprised you?', body: 'Did the agent miss anything important? What would you verify manually next time?' },
      { phase: 'Refine', title: 'Fact-check one claim', body: 'Pick the most important claim in your brief. Verify it without AI. Update the brief.' },
      { phase: 'Teach', title: 'Present findings', body: 'Explain your topic to someone in 2 minutes. Use your brief, not the AI output.' },
    ],
  },
  {
    slug: 'business-assistant',
    number: 3,
    title: 'Build a Business Assistant',
    subtitle: 'Automate something real — for a side hustle, family, or school club',
    outcome: 'A workflow that saves time on email, scheduling, customer replies, or inventory',
    evidence: 'Before/after description + time saved estimate',
    timeEstimate: '60–90 min',
    requiredLevel: 'AI Builder (Level 4)',
    futureProof: 'Businesses pay for people who automate work. This is employable skill — not theory.',
    tomorrowHook: 'Tomorrow: start Mission 4 and publish something live on the web.',
    nextMissionSlug: 'website-builder',
    steps: [
      { phase: 'Mission', title: 'Find the bottleneck', body: 'Pick a real repetitive task: club emails, Etsy listings, lawn-care scheduling, tutoring intake. Time how long it takes today.' },
      {
        phase: 'Build',
        title: 'Build the assistant',
        body: 'Create templates, automations, or an AI workflow that handles 80% of the task. Zapier, Make, or plain ChatGPT with saved prompts all count.',
        checklist: ['Document the old process', 'Build the automation', 'Run it on 3 real cases'],
      },
      { phase: 'Show', title: 'Show time saved', body: 'Record before/after. Screenshot the workflow. Add to My Automations in your portfolio.' },
      { phase: 'Debrief', title: 'Would a business pay for this?', body: 'Write who would pay, how much time it saves per week, and what could break.' },
      { phase: 'Refine', title: 'Handle an edge case', body: 'Find one situation your assistant fails. Fix it or document when to escalate to a human.' },
      { phase: 'Teach', title: 'Offer it to someone', body: 'Help a parent, club leader, or friend set up a similar assistant for their task.' },
    ],
  },
  {
    slug: 'website-builder',
    number: 4,
    title: 'Build a Website with AI',
    subtitle: 'Ship something live on the internet — portfolio, club page, or project site',
    outcome: 'A live URL you can share — built with AI assistance, owned by you',
    evidence: 'Live link + short build log (what AI did vs what you decided)',
    timeEstimate: '90–120 min',
    requiredLevel: 'AI Architect (Level 5)',
    futureProof: 'If you can ship on the web, you can ship anything. AI makes the first version fast; taste makes it yours.',
    tomorrowHook: 'Tomorrow: begin Mission 5 — design a team of AI agents for one ambitious project.',
    nextMissionSlug: 'personal-ai-team',
    steps: [
      { phase: 'Mission', title: 'Define the site', body: 'One page is enough. Portfolio, club, event, personal brand. Write: audience, 3 sections, one call-to-action.' },
      {
        phase: 'Build',
        title: 'Build and deploy',
        body: 'Use AI for copy, layout ideas, and code help. Deploy to Netlify, Vercel, GitHub Pages, or Carrd. You make the decisions.',
        checklist: ['Draft structure with AI', 'Build or generate pages', 'Deploy to a live URL'],
      },
      { phase: 'Show', title: 'Share the link', body: 'Add to My AI Projects. Post the URL somewhere real — bio, club chat, family group.' },
      { phase: 'Debrief', title: 'What was yours vs AI\'s?', body: 'List decisions only you could make: tone, structure, what to cut, what to emphasize.' },
      { phase: 'Refine', title: 'Get feedback', body: 'Ask 2 people to visit on mobile. Fix the worst issue they find.' },
      { phase: 'Teach', title: 'Help someone else ship', body: 'Walk a peer through deploying their first page.' },
    ],
  },
  {
    slug: 'personal-ai-team',
    number: 5,
    title: 'Build a Personal AI Team',
    subtitle: 'Multiple agents working together — researcher, writer, critic, planner',
    outcome: 'A coordinated team of AI roles that produces higher-quality output than one chat',
    evidence: 'Team diagram + one deliverable the team produced + reflection on coordination',
    timeEstimate: '2–3 hours',
    requiredLevel: 'AI Entrepreneur (Level 6)',
    futureProof: 'The future is not one chatbot — it\'s teams of agents. People who orchestrate them create disproportionate value.',
    tomorrowHook: 'Tomorrow: share your best project in AI Builders Circle and review someone else\'s work.',
    steps: [
      { phase: 'Mission', title: 'Define the deliverable', body: 'Pick something ambitious: business plan, event, app spec, campaign. You need 3+ specialized roles.' },
      {
        phase: 'Build',
        title: 'Assemble the team',
        body: 'Create distinct agents: Researcher, Writer, Editor, Planner, Devil\'s Advocate. Define handoffs between them.',
        checklist: ['Define 3+ agent roles with prompts', 'Run one full pipeline', 'Produce final deliverable'],
      },
      { phase: 'Show', title: 'Show the team at work', body: 'Diagram your agent team. Save the deliverable and one example of agent-to-agent handoff.' },
      { phase: 'Debrief', title: 'Where did coordination break?', body: 'Which handoff failed? What would a human still need to do?' },
      { phase: 'Refine', title: 'Add a quality gate', body: 'Insert a review step before final output. Re-run once.' },
      { phase: 'Teach', title: 'Demo the team', body: 'Show someone how multi-agent workflows beat single prompts for complex work.' },
    ],
  },
];

import { expandAiBuilderMissions, AI_BUILDER_TRACKS } from './immersion/worlds/ai-builder';

export { AI_BUILDER_TRACKS };
export const AI_BUILDER_MISSIONS: AiBuilderMission[] = expandAiBuilderMissions(AI_BUILDER_FOUNDATION_MISSIONS);

export const AI_BUILDER_PLAYGROUND_LABS = [
  { slug: 'prompt-lab', title: 'Prompt Lab', description: 'Experiment with prompts. Compare outputs. Save winners to your toolkit.', unlockLevel: 'AI User' },
  { slug: 'automation-lab', title: 'Automation Lab', description: 'Chain steps together — when X happens, AI does Y. No code required to start.', unlockLevel: 'AI Builder' },
  { slug: 'agent-lab', title: 'Agent Lab', description: 'Give AI a goal, tools, and memory. Watch it plan and execute.', unlockLevel: 'AI Architect' },
  { slug: 'workflow-lab', title: 'Workflow Lab', description: 'Map real processes. Find where AI fits. Redesign for speed.', unlockLevel: 'AI Builder' },
  { slug: 'business-lab', title: 'Business Lab', description: 'Prototype offers, pricing, and outreach with AI — then validate with humans.', unlockLevel: 'AI Entrepreneur' },
];

export const AI_BUILDER_PORTFOLIO_SECTIONS = [
  { slug: 'projects', title: 'My AI Projects', description: 'Everything you shipped — with links and screenshots' },
  { slug: 'automations', title: 'My Automations', description: 'Workflows that save time every week' },
  { slug: 'experiments', title: 'My Experiments', description: 'Playground tests worth keeping' },
  { slug: 'wins', title: 'My Wins', description: 'Evidence earned, reflections written, skills demonstrated' },
];

export const AI_BUILDER_PARENT_VIEW = {
  headline: 'Why AI Builder matters for your child',
  oneLiner:
    'Your child builds real AI projects—not quizzes—and earns a portfolio that proves future-proof skills employers actually want.',
  sections: [
    {
      title: 'Why AI matters',
      body: 'AI is not a fad — it is infrastructure. Students who learn to build with AI will outperform those who only consume it. Foundry teaches creation, not dependency.',
    },
    {
      title: 'Jobs being created',
      body: 'AI Engineer, Prompt Engineer, Automation Specialist, AI Product Manager, AI Ethics Analyst — plus every existing role augmented by AI. The common skill: ship real projects.',
    },
    {
      title: 'Skills employers want',
      body: 'Problem-solving with AI · Building automations · Research and synthesis · Clear communication of technical work · Evidence of projects shipped',
    },
    {
      title: 'What your child is building',
      body: 'Missions — not quizzes. Each mission produces a portfolio artifact: a homework assistant, research brief, business workflow, live website, or multi-agent team.',
    },
    {
      title: 'How progress is measured',
      body: 'Evidence submitted · Reflections written · Mastery levels unlocked · Portfolio growth · Peer feedback in AI Builders Circle — not test scores.',
    },
  ],
};

export const AI_BUILDER_CAREERS = [
  { title: 'Software Engineer', connection: 'AI accelerates coding — builders who ship faster win' },
  { title: 'Marketing', connection: 'Content, research, campaigns — all AI-augmented now' },
  { title: 'Operations', connection: 'Automation is the core skill — AI Builder trains it directly' },
  { title: 'Research', connection: 'Research agents are standard — learn to orchestrate them' },
  { title: 'Sales', connection: 'Outreach, personalization, CRM workflows powered by AI' },
  { title: 'Entrepreneurship', connection: 'Build MVPs in days, not months' },
  { title: 'Education', connection: 'Teachers who build AI tools for their classroom lead' },
  { title: 'Politics & Policy', connection: 'Research, messaging, constituent workflows' },
  { title: 'Nonprofits', connection: 'Do more with less — automate grant research and outreach' },
];

export const AI_BUILDER_GLOSSARY = [
  { term: 'LLM', definition: 'Large Language Model — AI trained on text that predicts and generates language' },
  { term: 'Prompt', definition: 'Instructions you give an AI — quality of prompt determines quality of output' },
  { term: 'Token', definition: 'A piece of text the model processes — affects cost and context limits' },
  { term: 'Context Window', definition: 'How much text the model can consider at once' },
  { term: 'RAG', definition: 'Retrieval-Augmented Generation — AI that searches your documents before answering' },
  { term: 'Agent', definition: 'AI that plans steps, uses tools, and works toward a goal autonomously' },
  { term: 'API', definition: 'A way for programs to talk to AI services — enables automation' },
  { term: 'Workflow', definition: 'A series of steps — often partially automated with AI' },
  { term: 'Automation', definition: 'Software doing repetitive work without manual intervention each time' },
  { term: 'Embedding', definition: 'A numerical representation of meaning — powers search and RAG' },
  { term: 'Fine Tuning', definition: 'Training a model further on specialized data for your use case' },
];

export const AI_BUILDER_COMMUNITY = {
  name: 'AI Builders Circle',
  features: [
    { title: 'Project Showcases', description: 'Share what you shipped — get feedback from builders at your level' },
    { title: 'Weekly Challenges', description: 'One new mission prompt every week — optional, competitive, fun' },
    { title: 'Peer Reviews', description: 'Review two projects to get feedback on yours — quality over quantity' },
  ],
};

export const AI_BUILDER_ACADEMY_TOPICS = [
  'What is AI?',
  'How AI actually works',
  'Prompting',
  'Models',
  'Agents',
  'Automation',
  'Building things',
];

export function getMission(slug: string): AiBuilderMission | undefined {
  return AI_BUILDER_MISSIONS.find((m) => m.slug === slug);
}
