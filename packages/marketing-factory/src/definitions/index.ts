import type { MarketingBlueprint } from '../types';

export const PRIMARY_MARKETING_WORLDS = ['ai-builder', 'financial-independence', 'public-speaking'] as const;

export const ALL_MARKETING_WORLDS = [
  ...PRIMARY_MARKETING_WORLDS,
  'civic-engagement',
  'bourbon',
  'bbq',
  'poker',
] as const;

const BLUEPRINTS: Record<string, MarketingBlueprint> = {
  'ai-builder': {
    slug: 'ai-builder',
    display_name: 'AI Builder',
    frame: 'Create Value',
    outcome_statement: 'Become an AI Builder',
    care_reason:
      'AI is reshaping every career. Parents, students, and professionals need to create value — not just consume tutorials.',
    parent_headline: 'Help your child become future-proof with AI — not just use ChatGPT.',
    portfolio_label: 'My AI Portfolio',
    community_name: 'Foundry AI Lab',
    priority_tier: 'primary',
    target_audiences: ['students', 'parents', 'educators', 'adult_learners'],
    missions: [
      { slug: 'homework-assistant', title: 'Homework Assistant' },
      { slug: 'research-agent', title: 'Research Agent' },
      { slug: 'business-assistant', title: 'Business Assistant' },
      { slug: 'website-landing', title: 'Website Landing Page' },
      { slug: 'personal-ai-team', title: 'Personal AI Team' },
    ],
    seo_pages: [
      { slug: 'how-to-learn-ai', title: 'How Do I Learn AI?', intent: 'traffic' },
      { slug: 'what-is-ai-builder', title: 'What Is an AI Builder?', intent: 'definition' },
      { slug: 'beginner-guide', title: 'Beginner Guide to Building with AI', intent: 'beginner' },
      { slug: 'road-to-expert', title: 'Road to AI Builder', intent: 'path' },
      { slug: 'projects', title: 'AI Builder Projects', intent: 'projects' },
    ],
    projects: ['Homework Assistant', 'Research Agent', 'Business Workflow', 'First Website', 'Personal AI Team'],
    tier_2_hook: 'My AI Portfolio — projects, workflows, evidence of what you built',
    tier_3_hook: 'Foundry AI Lab — ship together, get feedback, find collaborators',
    traffic_sources: ['SEO', 'Future-Proof Assessment', 'YouTube', 'Homeschool', 'Parents'],
  },
  'financial-independence': {
    slug: 'financial-independence',
    display_name: 'Financial Independence',
    frame: 'Keep Value',
    outcome_statement: 'Achieve Financial Independence',
    care_reason: 'Money literacy changes life outcomes. Parents pay for it. Schools struggle to teach it.',
    parent_headline: 'Give your teen real money skills — not just allowance.',
    portfolio_label: 'My Wealth Builder',
    community_name: 'Wealth Builders Circle',
    priority_tier: 'primary',
    target_audiences: ['students', 'parents', 'educators', 'adult_learners'],
    missions: [
      { slug: 'first-budget', title: 'First Budget' },
      { slug: 'save-1000', title: 'Save $1,000' },
      { slug: 'analyze-stock', title: 'Analyze a Stock' },
      { slug: 'emergency-fund', title: 'Emergency Fund' },
      { slug: 'retirement-projection', title: 'Retirement Projection' },
    ],
    seo_pages: [
      { slug: 'what-is-financial-independence', title: 'What Is Financial Independence?', intent: 'definition' },
      { slug: 'beginner-guide-money', title: 'Beginner Guide to Money', intent: 'beginner' },
      { slug: 'how-to-budget', title: 'How to Build Your First Budget', intent: 'projects' },
      { slug: 'first-stock', title: 'How to Buy Your First Stock', intent: 'projects' },
      { slug: 'common-money-mistakes', title: 'Common Money Mistakes', intent: 'mistakes' },
    ],
    projects: ['First Budget', 'Save $1,000', 'Stock Analysis', 'Emergency Fund', 'Side Income Plan'],
    tier_2_hook: 'My Wealth Builder — budgets, reflections, progress synced',
    tier_3_hook: 'Wealth Builders Circle — accountability and peer learning',
    traffic_sources: ['SEO', 'Parents', 'Homeschool', 'Adult learners', 'Educators'],
  },
  'public-speaking': {
    slug: 'public-speaking',
    display_name: 'Public Speaking',
    frame: 'Communicate Value',
    outcome_statement: 'Become a Confident Speaker',
    care_reason: 'Speaking confidence unlocks leadership, career, and civic impact.',
    parent_headline: 'Help your child find their voice — one talk at a time.',
    portfolio_label: 'My Speaking Portfolio',
    community_name: 'Speaker Circle',
    priority_tier: 'primary',
    target_audiences: ['students', 'parents', 'educators', 'adult_learners'],
    missions: [
      { slug: 'first-talk', title: 'First Talk' },
      { slug: 'record-review', title: 'Record & Review' },
      { slug: 'story-that-lands', title: 'Story That Lands' },
      { slug: 'impromptu-speech', title: 'Impromptu Speech' },
      { slug: 'teach-back', title: 'Teach Back' },
    ],
    seo_pages: [
      { slug: 'what-is-public-speaking', title: 'What Is Public Speaking Mastery?', intent: 'definition' },
      { slug: 'beginner-guide', title: 'Beginner Guide to Public Speaking', intent: 'beginner' },
      { slug: 'first-speech', title: 'How to Give Your First Speech', intent: 'projects' },
      { slug: 'overcome-fear', title: 'Overcome Speaking Fear', intent: 'traffic' },
      { slug: 'common-mistakes', title: 'Common Speaking Mistakes', intent: 'mistakes' },
    ],
    projects: ['3-Minute Speech', 'Story Structure', 'Record & Review', 'Impromptu Practice', 'Teach Back'],
    tier_2_hook: 'My Speaking Portfolio — talks, reflections, progress',
    tier_3_hook: 'Speaker Circle — peer feedback and mentor pathways',
    traffic_sources: ['SEO', 'Parents', 'Educators', 'Career changers', 'Civic leaders'],
  },
  'civic-engagement': {
    slug: 'civic-engagement',
    display_name: 'Civic Engagement',
    frame: 'Lead Value',
    outcome_statement: 'Become a Civic Leader',
    care_reason: 'Democracy requires citizens who show up informed and ready to act.',
    parent_headline: 'Raise a citizen who participates — not just watches.',
    portfolio_label: 'My Civic Portfolio',
    community_name: 'Civic Action Circle',
    priority_tier: 'expansion',
    target_audiences: ['students', 'educators', 'adult_learners'],
    missions: [
      { slug: 'research-ballot', title: 'Research Your Ballot' },
      { slug: 'local-meeting', title: 'Attend a Local Meeting' },
      { slug: 'volunteer-cause', title: 'Volunteer for a Cause' },
    ],
    seo_pages: [
      { slug: 'how-to-research-your-ballot', title: 'How to Research Your Ballot', intent: 'traffic' },
      { slug: 'attending-your-first-town-hall', title: 'Attending Your First Town Hall', intent: 'beginner' },
    ],
    projects: ['Ballot Research', 'Town Hall Notes', 'Volunteer Log'],
    tier_2_hook: 'Civic portfolio sync',
    tier_3_hook: 'Civic Action Circle',
    traffic_sources: ['SEO', 'Educators', 'Election cycles'],
  },
  bourbon: {
    slug: 'bourbon',
    display_name: 'Bourbon',
    frame: 'Passion Trinity',
    outcome_statement: 'Become a Bourbon Steward',
    care_reason: 'Bourbon is culture, craft, and community — not just consumption.',
    parent_headline: 'N/A — adult hobby vertical',
    portfolio_label: 'My Bourbon Shelf',
    community_name: 'Central Arkansas Bourbon Society',
    priority_tier: 'retention',
    target_audiences: ['hobbyists', 'adult_learners'],
    missions: [
      { slug: 'first-tasting', title: 'First Tasting' },
      { slug: 'first-shelf', title: 'First Shelf' },
    ],
    seo_pages: [{ slug: 'what-is', title: 'What Is Bourbon?', intent: 'definition' }],
    projects: ['Blind Tasting', 'Bourbon Shelf', 'Distillery Visit'],
    tier_2_hook: 'Tasting portfolio',
    tier_3_hook: 'Bourbon Society',
    traffic_sources: ['SEO', 'Local events', 'Affiliates'],
  },
  bbq: {
    slug: 'bbq',
    display_name: 'BBQ',
    frame: 'Passion Trinity',
    outcome_statement: 'Become a Pitmaster',
    care_reason: 'BBQ is patience, fire, and community.',
    parent_headline: 'N/A — adult hobby vertical',
    portfolio_label: 'My Cook Log',
    community_name: 'Pitmaster Collective',
    priority_tier: 'retention',
    target_audiences: ['hobbyists', 'adult_learners'],
    missions: [
      { slug: 'first-pork-butt', title: 'First Pork Butt' },
      { slug: 'first-brisket', title: 'First Brisket' },
    ],
    seo_pages: [{ slug: 'what-is', title: 'What Is BBQ Mastery?', intent: 'definition' }],
    projects: ['Brisket Cook Log', 'Backyard BBQ', 'Competition Timeline'],
    tier_2_hook: 'Cook log portfolio',
    tier_3_hook: 'Pitmaster Collective',
    traffic_sources: ['SEO', 'YouTube', 'Seasonal (summer)'],
  },
  poker: {
    slug: 'poker',
    display_name: 'Poker',
    frame: 'Passion Trinity',
    outcome_statement: 'Become a Strategic Thinker',
    care_reason: 'Poker teaches probability, psychology, and discipline.',
    parent_headline: 'N/A — adult hobby vertical',
    portfolio_label: 'My Poker Journal',
    community_name: 'Strategic Thinking Society',
    priority_tier: 'retention',
    target_audiences: ['hobbyists', 'adult_learners'],
    missions: [
      { slug: 'track-bankroll', title: 'Track Bankroll' },
      { slug: 'review-ten-hands', title: 'Review Ten Hands' },
    ],
    seo_pages: [{ slug: 'what-is', title: 'What Is Poker Strategy?', intent: 'definition' }],
    projects: ['Hand Analysis', 'Bankroll Tracker', 'Tournament Prep'],
    tier_2_hook: 'Poker journal sync',
    tier_3_hook: 'Strategic Thinking Society',
    traffic_sources: ['SEO', 'Reddit', 'YouTube'],
  },
};

export function getMarketingBlueprint(slug: string): MarketingBlueprint {
  const bp = BLUEPRINTS[slug];
  if (!bp) throw new Error(`Unknown marketing slug: ${slug}. Available: ${Object.keys(BLUEPRINTS).join(', ')}`);
  return bp;
}

export function listMarketingBlueprints(): MarketingBlueprint[] {
  return Object.values(BLUEPRINTS);
}

export function listPrimaryBlueprints(): MarketingBlueprint[] {
  return PRIMARY_MARKETING_WORLDS.map((s) => BLUEPRINTS[s]!);
}
