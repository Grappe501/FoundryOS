import type { CollectionDefinition, CollectionEarnRule } from './types';

function col(
  id: string,
  world_slug: string,
  title: string,
  story: string,
  items: { id: string; label: string; tease?: string }[],
  href?: string,
): CollectionDefinition {
  return { id, world_slug, title, story, items, href };
}

export const COLLECTION_DEFINITIONS: CollectionDefinition[] = [
  // ─── Bourbon ───────────────────────────────────────────────
  col('wheated-explorer', 'bourbon', 'Wheated Explorer', 'You chase softness over spice — the wheated shelf tells its own story.', [
    { id: 'first-wheated-pour', label: 'First wheated pour named', tease: 'Makers, Larceny, or Weller — name the softness' },
    { id: 'wheated-compare', label: 'Compared two wheated bottles', tease: 'Side by side, same proof band' },
    { id: 'weller-case', label: 'Closed the Weller mystery', tease: 'Allocation economics unlocked' },
    { id: 'wheated-blind', label: 'Blind-identified wheated mash', tease: 'Nose knows before label' },
    { id: 'wheated-host', label: 'Hosted a wheated flight', tease: 'Three pours, one story' },
  ], '/bourbon/portfolio'),
  col('bottled-in-bond-collection', 'bourbon', 'Bottled-in-Bond Collection', 'Transparency you can taste — one season, one distiller, four years, 100 proof.', [
    { id: 'bib-label-read', label: 'Read a BiB label correctly', tease: 'Green label or tax strip tells truth' },
    { id: 'bib-on-shelf', label: 'Logged a BiB bottle owned', tease: 'Evan Williams White counts' },
    { id: 'bib-case', label: 'Closed the BiB guarantee case', tease: '1897 promise still on shelf' },
    { id: 'bib-compare', label: 'Compared two BiB expressions', tease: 'Same law, different houses' },
  ], '/bourbon/portfolio'),
  col('distillery-pilgrim', 'bourbon', 'Distillery Pilgrim', 'Rickhouses visited in spirit — campus maps become pilgrimage.', [
    { id: 'campus-buffalo', label: 'Explored Buffalo Trace campus', tease: 'Still, rickhouse, bottling' },
    { id: 'campus-heaven-hill', label: 'Explored Heaven Hill campus', tease: 'Bardstown smoke' },
    { id: 'campus-beam', label: 'Explored Beam campus', tease: 'American stillhouse' },
    { id: 'trail-planned', label: 'Built a trail plan', tease: 'Days, budget, stops' },
    { id: 'distillery-visit', label: 'Visited a distillery in person', tease: 'Smelled the angel\'s share' },
    { id: 'second-house', label: 'Deep-dived a second producer atlas', tease: 'Sweet spot bottle identified' },
  ], '/bourbon/producers'),
  col('kentucky-heritage', 'bourbon', 'Kentucky Heritage', 'Bluegrass, corn, cooperage — the place bourbon calls home.', [
    { id: 'origins-map', label: 'Wandered origins map', tease: 'Name vs place vs juice' },
    { id: 'timeline-story', label: 'Read a history story', tease: 'Prohibition to modern boom' },
    { id: 'kentucky-map', label: 'Explored Kentucky regions', tease: 'Distillery clusters' },
    { id: 'heritage-pour', label: 'Poured a Kentucky-only flight', tease: 'Three regions, three glasses' },
  ], '/bourbon/origins'),
  col('store-pick-scout', 'bourbon', 'Store Pick Scout', 'You know when a pick is revelation versus sticker theater.', [
    { id: 'pick-academy', label: 'Finished store pick academy intro', tease: 'Programs and questions' },
    { id: 'pick-questions', label: 'Asked clerk three pick questions', tease: 'Barrel, floor, proof' },
    { id: 'first-pick-owned', label: 'Logged first store pick', tease: 'Named barrel if known' },
    { id: 'pick-compare', label: 'Compared pick vs standard', tease: 'Same recipe, different barrel' },
  ], '/bourbon/store-picks'),
  col('blind-tasting-detective', 'bourbon', 'Blind Tasting Detective', 'Label hidden, palate on trial — you trust nose over hype.', [
    { id: 'first-blind', label: 'Completed first blind game', tease: 'Mystery pour' },
    { id: 'detective-case', label: 'Closed any detective case', tease: 'Evidence over opinion' },
    { id: 'blind-league', label: 'Entered blind tasting league', tease: 'Monthly rep' },
    { id: 'blind-win', label: 'Won a blind round', tease: 'Defended your guess' },
  ], '/bourbon/detective'),

  // ─── AI Builder ──────────────────────────────────────────
  col('automation-builder', 'ai-builder', 'Automation Builder', 'You stopped doing manually what a machine could do reliably.', [
    { id: 'first-script', label: 'First working automation', tease: 'Something ran without you' },
    { id: 'scheduled-run', label: 'Scheduled a recurring task', tease: 'Time saved compounds' },
    { id: 'error-handled', label: 'Handled an automation failure', tease: 'Real builders debug' },
    { id: 'shared-automation', label: 'Shared automation with someone', tease: 'Teaching doubles learning' },
  ], '/ai-builder/portfolio'),
  col('ai-workflow-collector', 'ai-builder', 'AI Workflow Collector', 'Prompts chained into workflows that produce artifacts.', [
    { id: 'homework-assistant', label: 'Homework Assistant complete', tease: 'First shipped assistant' },
    { id: 'multi-step-flow', label: 'Built multi-step workflow', tease: 'Output feeds input' },
    { id: 'workflow-documented', label: 'Documented a workflow', tease: 'Future you says thanks' },
    { id: 'workflow-reused', label: 'Reused workflow on new problem', tease: 'Pattern recognition' },
  ], '/ai-builder/portfolio'),
  col('first-product-builder', 'ai-builder', 'First Product Builder', 'Not a demo — a thing with a name someone could use.', [
    { id: 'named-project', label: 'Named a project publicly', tease: 'Portfolio artifact live' },
    { id: 'user-tested', label: 'Someone else used your build', tease: 'Real feedback' },
    { id: 'iterated-ship', label: 'Shipped version two', tease: 'Iteration beats perfection' },
  ], '/ai-builder/portfolio'),
  col('prompt-lab-explorer', 'ai-builder', 'Prompt Lab Explorer', 'You treat prompts as instruments, not magic spells.', [
    { id: 'prompt-lab', label: 'Completed prompt lab module', tease: 'Variables and constraints' },
    { id: 'prompt-library', label: 'Saved five useful prompts', tease: 'Personal library' },
    { id: 'prompt-ab-test', label: 'A/B tested two prompts', tease: 'Measured difference' },
  ], '/ai-builder/playground'),
  col('software-founder-path', 'ai-builder', 'Software Founder Path', 'From builder to founder — someone paid or someone depended.', [
    { id: 'deployed-live', label: 'Deployed project live', tease: 'URL someone can visit' },
    { id: 'entrepreneur-link', label: 'Explored entrepreneur crossover', tease: 'Build for others' },
    { id: 'first-feedback', label: 'Incorporated user feedback', tease: 'Listened and changed' },
  ], '/ai-builder/careers'),

  // ─── Public Speaking ─────────────────────────────────────
  col('first-stage', 'public-speaking', 'First Stage', 'You stood up once — the hardest rep is the first.', [
    { id: 'first-talk', label: 'First Talk mission complete', tease: 'Words left your mouth on purpose' },
    { id: 'outline-written', label: 'Wrote a talk outline', tease: 'Structure before slides' },
    { id: 'rehearsed-aloud', label: 'Rehearsed aloud twice', tease: 'Mouth learns faster than eyes' },
  ], '/public-speaking/portfolio'),
  col('confidence-builder', 'public-speaking', 'Confidence Builder', 'Nerves converted to energy — structure holds you up.', [
    { id: 'record-review', label: 'Recorded and reviewed yourself', tease: 'Uncomfortable and essential' },
    { id: 'nerves-named', label: 'Named three physical nerves cues', tease: 'Body awareness' },
    { id: 'confidence-reflection', label: 'Logged a confidence reflection', tease: 'Evidence of growth' },
  ], '/public-speaking/portfolio'),
  col('storyteller', 'public-speaking', 'Storyteller', 'Facts arranged so someone else feels them.', [
    { id: 'story-arc', label: 'Built a story arc', tease: 'Beginning, turn, landing' },
    { id: 'anecdote-landed', label: 'Anecdote got a reaction', tease: 'Room moved' },
    { id: 'story-refined', label: 'Cut one unnecessary detail', tease: 'Editing is speaking' },
  ], '/public-speaking/playground'),
  col('event-host', 'public-speaking', 'Event Host', 'You run the room — tastings, meetings, gatherings.', [
    { id: 'hosted-gathering', label: 'Hosted a structured gathering', tease: 'Agenda + warmth' },
    { id: 'cross-bourbon-host', label: 'Explored host-a-tasting crossover', tease: 'Speaking + bourbon' },
    { id: 'audience-q', label: 'Answered audience question calmly', tease: 'Q&A rep' },
  ], '/public-speaking/missions'),
  col('audience-builder', 'public-speaking', 'Audience Builder', 'From one person to many — reach grows with reps.', [
    { id: 'audience-five', label: 'Spoke to five or more', tease: 'Small room counts' },
    { id: 'audience-fifty', label: 'Prepared for larger room', tease: 'Volume and pacing' },
    { id: 'feedback-requested', label: 'Asked for specific feedback', tease: 'Steward of improvement' },
  ], '/public-speaking/portfolio'),

  // ─── Civic Engagement ────────────────────────────────────
  col('voter-guide', 'civic-engagement', 'Voter Guide', 'Opinion became participation — ballot or registration.', [
    { id: 'register-mission', label: 'Registration mission complete', tease: 'First civic step' },
    { id: 'ballot-researched', label: 'Researched a ballot issue', tease: 'Informed vote' },
    { id: 'voted', label: 'Cast a vote or assisted someone', tease: 'Democracy as verb' },
  ], '/civic-engagement/portfolio'),
  col('forum-attendee', 'civic-engagement', 'Forum Attendee', 'You showed up where decisions happen in public.', [
    { id: 'meeting-found', label: 'Found a public meeting', tease: 'Agenda read' },
    { id: 'meeting-attended', label: 'Attended or watched live', tease: 'Presence counts' },
    { id: 'question-prepared', label: 'Prepared a public question', tease: 'Voice ready' },
  ], '/civic-engagement/missions'),
  col('public-meeting-tracker', 'civic-engagement', 'Public Meeting Tracker', 'Meetings logged — patterns in local power visible.', [
    { id: 'first-log', label: 'Logged first meeting', tease: 'Date, body, topic' },
    { id: 'three-meetings', label: 'Tracked three meetings', tease: 'Pattern emerges' },
    { id: 'follow-up-action', label: 'Took one follow-up action', tease: 'Meeting → deed' },
  ], '/civic-engagement/portfolio'),
  col('board-watcher', 'civic-engagement', 'Board Watcher', 'School boards, commissions, authorities — you read the packet.', [
    { id: 'packet-read', label: 'Read a meeting packet', tease: 'PDF courage' },
    { id: 'board-named', label: 'Named three local boards', tease: 'Who decides what' },
    { id: 'comment-submitted', label: 'Submitted written comment', tease: 'Record matters' },
  ], '/civic-engagement/missions'),
  col('community-organizer', 'civic-engagement', 'Community Organizer', 'You moved others — not alone in the work.', [
    { id: 'one-recruited', label: 'Recruited one person to act', tease: 'Multiplier' },
    { id: 'small-team', label: 'Coordinated small team task', tease: 'Shared ownership' },
    { id: 'event-held', label: 'Held a community event', tease: 'Room filled with purpose' },
  ], '/civic-engagement/community'),

  // ─── BBQ ─────────────────────────────────────────────────
  col('first-smoke', 'bbq', 'First Smoke', 'Smoke in the yard — patience measured in hours.', [
    { id: 'first-light', label: 'Lit smoker or grill properly', tease: 'Fire management' },
    { id: 'first-cook-log', label: 'Logged first cook', tease: 'Time and temp' },
    { id: 'first-share', label: 'Shared cook with someone', tease: 'BBQ is social' },
  ], '/bbq/portfolio'),
  col('brisket-apprentice', 'bbq', 'Brisket Apprentice', 'The cut that teaches humility — twelve hours of maybe.', [
    { id: 'brisket-mission', label: 'First brisket mission', tease: 'Trim, rub, wait' },
    { id: 'probe-learned', label: 'Learned probe tenderness', tease: 'Butter not mush' },
    { id: 'rest-respected', label: 'Rested full hour', tease: 'Juices redistribute' },
  ], '/bbq/missions'),
  col('pitmaster-journal', 'bbq', 'Pitmaster Journal', 'Every cook logged — mistakes become curriculum.', [
    { id: 'three-logs', label: 'Three cook logs saved', tease: 'Pattern hunting' },
    { id: 'variable-changed', label: 'Changed one variable intentionally', tease: 'Scientific method' },
    { id: 'journal-reflection', label: 'Wrote what surprised you', tease: 'Honest notes' },
  ], '/bbq/portfolio'),
  col('sauce-rub-lab', 'bbq', 'Sauce & Rub Lab', 'Salt, sugar, heat — your signature emerging.', [
    { id: 'rub-built', label: 'Built custom rub', tease: 'Ratios yours' },
    { id: 'sauce-tested', label: 'Tested sauce on cook', tease: 'Not only at table' },
    { id: 'recipe-named', label: 'Named a recipe', tease: 'Ownership' },
  ], '/bbq/playground'),
  col('competition-prep', 'bbq', 'Competition Prep', 'Turn-in boxes, timelines, nerves — competition mindset.', [
    { id: 'timeline-built', label: 'Built competition timeline', tease: 'Backwards from turn-in' },
    { id: 'box-practiced', label: 'Practiced turn-in box', tease: 'Presentation counts' },
    { id: 'judge-criteria', label: 'Studied judging criteria', tease: 'Know the rules' },
  ], '/bbq/missions'),

  // ─── Poker ───────────────────────────────────────────────
  col('bankroll-builder', 'poker', 'Bankroll Builder', 'Money managed — the house doesn\'t need your rent.', [
    { id: 'bankroll-tracked', label: 'Tracked bankroll one month', tease: 'Units not vibes' },
    { id: 'stop-loss', label: 'Honored a stop-loss', tease: 'Discipline' },
    { id: 'session-logged', label: 'Logged ten sessions', tease: 'Data beats stories' },
  ], '/poker/portfolio'),
  col('hand-analyst', 'poker', 'Hand Analyst', 'Hands reviewed — patterns visible in hindsight.', [
    { id: 'ten-hands', label: 'Reviewed ten hands', tease: 'Honest tags' },
    { id: 'leak-found', label: 'Named one leak', tease: 'Fix one thing' },
    { id: 'range-sketch', label: 'Sketched villain range', tease: 'Thinking in sets' },
  ], '/poker/missions'),
  col('tournament-tracker', 'poker', 'Tournament Tracker', 'Bounties, bubbles, ICM — tournament brain.', [
    { id: 'first-tournament', label: 'First tournament mission', tease: 'Survived level one' },
    { id: 'tournament-log', label: 'Logged tournament result', tease: 'ROI honest' },
    { id: 'bubble-note', label: 'Noted bubble decision', tease: 'Pressure remembered' },
  ], '/poker/portfolio'),
  col('position-student', 'poker', 'Position Student', 'Button, cutoff, blinds — position drives profit.', [
    { id: 'position-quiz', label: 'Passed position basics', tease: 'Act last, act best' },
    { id: 'steal-spot', label: 'Identified steal spot', tease: 'Fold equity' },
    { id: 'blind-defense', label: 'Logged blind defense', tease: 'Not every open folds' },
  ], '/poker/playground'),
  col('strategic-thinker', 'poker', 'Strategic Thinker', 'Long game over hero calls — EV over ego.', [
    { id: 'ev-estimate', label: 'Estimated EV on close spot', tease: 'Math attempted' },
    { id: 'tilt-named', label: 'Named tilt trigger', tease: 'Self-awareness' },
    { id: 'study-session', label: 'Completed study session', tease: 'Off-table work' },
  ], '/poker/missions'),

  // ─── Financial Independence ────────────────────────────────
  col('budget-builder', 'financial-independence', 'Budget Builder', 'Money named — every dollar assigned a job.', [
    { id: 'first-budget', label: 'First Budget mission', tease: 'Income minus plan' },
    { id: 'month-closed', label: 'Closed one month honestly', tease: 'No fantasy numbers' },
    { id: 'category-cut', label: 'Cut one category intentionally', tease: 'Tradeoffs visible' },
  ], '/financial-independence/portfolio'),
  col('savings-streak', 'financial-independence', 'Savings Streak', 'Streaks beat spikes — consistency compounds.', [
    { id: 'save-1000', label: 'Save $1000 mission progress', tease: 'Emergency fund start' },
    { id: 'three-months', label: 'Three months saved toward goal', tease: 'Habit formed' },
    { id: 'automated-transfer', label: 'Automated a transfer', tease: 'Pay yourself first' },
  ], '/financial-independence/missions'),
  col('credit-explorer', 'financial-independence', 'Credit Explorer', 'Score is a story — you read the chapters.', [
    { id: 'report-pulled', label: 'Reviewed credit report', tease: 'Errors hunted' },
    { id: 'utilization-tracked', label: 'Tracked utilization', tease: 'Under thirty percent' },
    { id: 'factor-named', label: 'Named top score factor', tease: 'Actionable focus' },
  ], '/financial-independence/playground'),
  col('investment-researcher', 'financial-independence', 'Investment Researcher', 'Ownership researched — thesis before ticker.', [
    { id: 'stock-worksheet', label: 'Completed analysis worksheet', tease: 'Business not symbol' },
    { id: 'thesis-written', label: 'Wrote one-paragraph thesis', tease: 'Why this, why now' },
    { id: 'risk-named', label: 'Named primary risk', tease: 'Honest bear case' },
  ], '/financial-independence/missions'),
  col('net-worth-tracker', 'financial-independence', 'Net Worth Tracker', 'Assets minus debts — the number you steer by.', [
    { id: 'first-snapshot', label: 'First net worth snapshot', tease: 'Baseline courage' },
    { id: 'quarter-update', label: 'Updated quarterly', tease: 'Trend over point' },
    { id: 'debt-plan', label: 'Debt paydown plan drafted', tease: 'Sequence matters' },
  ], '/financial-independence/portfolio'),
];

export const LIVE_COLLECTOR_WORLDS = [
  'bourbon',
  'ai-builder',
  'public-speaking',
  'civic-engagement',
  'bbq',
  'poker',
  'financial-independence',
] as const;

export function getCollectionDefinition(id: string): CollectionDefinition | undefined {
  return COLLECTION_DEFINITIONS.find((c) => c.id === id);
}

export function collectionsForWorld(worldSlug: string): CollectionDefinition[] {
  return COLLECTION_DEFINITIONS.filter((c) => c.world_slug === worldSlug);
}

/** How collections are earned — shown on /operator/collections */
export const COLLECTION_EARN_RULES: CollectionEarnRule[] = [
  // Bourbon consequences
  { id: 'weller-wheated', label: 'Close Weller detective case', world_slug: 'bourbon', action_type: 'detective_case_closed', action_id: 'weller-ghost', collection_id: 'wheated-explorer', item_id: 'weller-case' },
  { id: 'weller-blind', label: 'Close Weller case → blind detective path', world_slug: 'bourbon', action_type: 'detective_case_closed', action_id: 'weller-ghost', collection_id: 'blind-tasting-detective', item_id: 'detective-case' },
  { id: 'bib-case', label: 'Close BiB guarantee case', world_slug: 'bourbon', action_type: 'detective_case_closed', action_id: 'bib-guarantee', collection_id: 'bottled-in-bond-collection', item_id: 'bib-case' },
  { id: 'bib-shelf', label: 'Log a BiB bottle on shelf', world_slug: 'bourbon', action_type: 'collection_item_added', action_id: 'bottled-in-bond', collection_id: 'bottled-in-bond-collection', item_id: 'bib-on-shelf' },
  // AI Builder
  { id: 'homework-workflow', label: 'Complete Homework Assistant', world_slug: 'ai-builder', action_type: 'mission_completed', action_id: 'homework-assistant', collection_id: 'ai-workflow-collector', item_id: 'homework-assistant' },
  { id: 'homework-automation', label: 'Homework Assistant → automation path', world_slug: 'ai-builder', action_type: 'mission_completed', action_id: 'homework-assistant', collection_id: 'automation-builder', item_id: 'first-script' },
  { id: 'homework-product', label: 'Homework Assistant → product path', world_slug: 'ai-builder', action_type: 'mission_completed', action_id: 'homework-assistant', collection_id: 'first-product-builder', item_id: 'named-project' },
  // Public Speaking
  { id: 'first-talk-stage', label: 'Complete First Talk', world_slug: 'public-speaking', action_type: 'mission_completed', action_id: 'first-talk', collection_id: 'first-stage', item_id: 'first-talk' },
  { id: 'first-talk-confidence', label: 'First Talk → confidence', world_slug: 'public-speaking', action_type: 'mission_completed', action_id: 'first-talk', collection_id: 'confidence-builder', item_id: 'confidence-reflection' },
  { id: 'first-talk-host', label: 'First Talk → event host', world_slug: 'public-speaking', action_type: 'mission_completed', action_id: 'first-talk', collection_id: 'event-host', item_id: 'hosted-gathering' },
  // Civic
  { id: 'register-voter', label: 'Register to vote mission', world_slug: 'civic-engagement', action_type: 'mission_completed', action_id: 'register-to-vote', collection_id: 'voter-guide', item_id: 'register-mission' },
  // Generic progress rules (next unowned item)
  { id: 'any-detective-bourbon', label: 'Close any bourbon detective case', world_slug: 'bourbon', action_type: 'detective_case_closed', collection_id: 'blind-tasting-detective' },
  { id: 'portfolio-artifact', label: 'Create portfolio artifact', world_slug: 'ai-builder', action_type: 'portfolio_artifact_created', collection_id: 'first-product-builder' },
];

export function earnRulesForCollection(collectionId: string): CollectionEarnRule[] {
  return COLLECTION_EARN_RULES.filter((r) => r.collection_id === collectionId);
}

export function earnRulesForWorld(worldSlug: string): CollectionEarnRule[] {
  return COLLECTION_EARN_RULES.filter((r) => r.world_slug === worldSlug);
}
