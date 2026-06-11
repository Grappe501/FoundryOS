import type { FullWorldBlueprint } from '../types.js';

const bourbon: FullWorldBlueprint = {
  slug: 'bourbon',
  displayName: 'Bourbon',
  kind: 'passion',
  frame: 'Appreciate Craft',
  outcomeStatement: 'Become a Bourbon Steward',
  portfolioLabel: 'My Bourbon Journey',
  portfolioKey: 'foundry-bourbon-portfolio',
  communityName: 'Bourbon Circle',
  parentHeadline: 'Why Bourbon matters for your child',
  parentOneLiner:
    'Your child learns to appreciate craft, host tastings, and build a real collection — not just consume.',
  accentColor: '#C8A96E',
  borderColor: '#4A4020',
  mission1Slug: 'first-tasting',
  missions: [
    { slug: 'first-tasting', number: 1, title: 'Host First Tasting' },
    { slug: 'first-shelf', number: 2, title: 'Build First Shelf' },
    { slug: 'compare-five', number: 3, title: 'Compare 5 Bourbons' },
    { slug: 'blind-tasting', number: 4, title: 'Blind Tasting Night' },
    { slug: 'distillery-visit', number: 5, title: 'Visit First Distillery' },
  ],
  exploreSectionId: 'food-drink',
  exploreTier: 'Hobby',
  exploreCategories: ['all', 'hobbies', 'food_drink'],
  exploreBecome: 'Someone who appreciates craft, hosts tastings, and leads the Bourbon Circle.',
  exploreLaunchRank: 6,
  plannedProjects: ['Host first tasting', 'Build first shelf', 'Blind tasting night', 'Visit a distillery'],
  glossaryTerms: [
    { term: 'Mash bill', definition: 'The grain recipe used to make bourbon.' },
    { term: 'Proof', definition: 'Alcohol content — twice the ABV percentage.' },
  ],
  careerPaths: [
    { title: 'Brand Ambassador', description: 'Represent distilleries and educate consumers.' },
    { title: 'Bar Program Director', description: 'Curate spirits programs for venues.' },
  ],
  playgroundLabs: [
    { slug: 'tasting-lab', title: 'Tasting Lab', unlockLevel: 2 },
    { slug: 'pairing-lab', title: 'Food Pairing Lab', unlockLevel: 3 },
  ],
  portfolioSections: [
    { slug: 'tastings', title: 'Tastings', description: 'Notes from every pour' },
    { slug: 'shelf', title: 'My Shelf', description: 'Collection photos and philosophy' },
  ],
  corePromise: 'Learn to appreciate craft, host tastings, and build a bourbon journey that lasts decades.',
  nextWorldSlug: 'bbq',
};

const bbq: FullWorldBlueprint = {
  slug: 'bbq',
  displayName: 'BBQ',
  kind: 'passion',
  frame: 'Create Experiences',
  outcomeStatement: 'Become a Pitmaster',
  portfolioLabel: 'My BBQ Journal',
  portfolioKey: 'foundry-bbq-portfolio',
  communityName: 'Pitmasters Circle',
  parentHeadline: 'Why BBQ matters for your child',
  parentOneLiner:
    'Your child learns patience, hosting, and real cooking skills through smokes and backyard experiences.',
  accentColor: '#B06B50',
  borderColor: '#4A3020',
  mission1Slug: 'first-pork-butt',
  missions: [
    { slug: 'first-pork-butt', number: 1, title: 'Smoke First Pork Butt' },
    { slug: 'first-brisket', number: 2, title: 'Smoke First Brisket' },
    { slug: 'backyard-bbq', number: 3, title: 'Host Backyard BBQ' },
    { slug: 'first-competition', number: 4, title: 'Enter First Competition' },
    { slug: 'judge-competition', number: 5, title: 'Judge a Competition' },
  ],
  exploreSectionId: 'food-drink',
  exploreTier: 'Hobby',
  exploreCategories: ['all', 'hobbies', 'food_drink'],
  exploreBecome: 'Someone who creates memorable experiences around fire, food, and community.',
  exploreLaunchRank: 7,
  plannedProjects: ['Smoke first pork butt', 'Smoke first brisket', 'Host backyard BBQ'],
  glossaryTerms: [{ term: 'Low and slow', definition: 'Cooking at low temperature for many hours.' }],
  careerPaths: [{ title: 'Competition Pitmaster', description: 'Travel the BBQ circuit.' }],
  playgroundLabs: [{ slug: 'fire-lab', title: 'Fire Management Lab', unlockLevel: 2 }],
  portfolioSections: [{ slug: 'cooks', title: 'Cook Logs', description: 'Temps and outcomes' }],
  corePromise: 'Create experiences around the pit — patience, hosting, and craft that feeds a crowd.',
  nextWorldSlug: 'poker',
};

const poker: FullWorldBlueprint = {
  slug: 'poker',
  displayName: 'Poker',
  kind: 'passion',
  frame: 'Strategic Thinking',
  outcomeStatement: 'Become a Strategic Player',
  portfolioLabel: 'My Poker Journey',
  portfolioKey: 'foundry-poker-portfolio',
  communityName: 'Poker Study Circle',
  parentHeadline: 'Why Poker matters for your child',
  parentOneLiner:
    'Your child learns decision-making under uncertainty and bankroll discipline — transferable life skills.',
  accentColor: '#6B8BB8',
  borderColor: '#3A4A6A',
  mission1Slug: 'track-bankroll',
  missions: [
    { slug: 'track-bankroll', number: 1, title: 'Track First Bankroll' },
    { slug: 'first-tournament', number: 2, title: 'Play First Tournament' },
    { slug: 'review-ten-hands', number: 3, title: 'Review 10 Hands' },
    { slug: 'final-table', number: 4, title: 'Final Table' },
    { slug: 'teach-new-player', number: 5, title: 'Teach New Player' },
  ],
  exploreSectionId: 'sports-games',
  exploreTier: 'Hobby',
  exploreCategories: ['all', 'hobbies', 'sports'],
  exploreBecome: 'Someone who thinks clearly under pressure and learns from every decision.',
  exploreLaunchRank: 8,
  plannedProjects: ['Track bankroll', 'Play first tournament', 'Review 10 hands'],
  glossaryTerms: [{ term: 'Bankroll', definition: 'Dedicated money for poker — separate from life expenses.' }],
  careerPaths: [{ title: 'Poker Coach', description: 'Teach decision-making and hand review.' }],
  playgroundLabs: [{ slug: 'hand-review-lab', title: 'Hand Review Lab', unlockLevel: 2 }],
  portfolioSections: [{ slug: 'sessions', title: 'Session Logs', description: 'Bankroll notes' }],
  corePromise: 'Build strategic thinking, bankroll discipline, and confidence at the table.',
  nextWorldSlug: 'bourbon',
};

const civicEngagement: FullWorldBlueprint = {
  slug: 'civic-engagement',
  displayName: 'Civic Engagement',
  kind: 'life-leverage',
  frame: 'Improve Your Community',
  outcomeStatement: 'Become an Informed Citizen',
  portfolioLabel: 'My Civic Portfolio',
  portfolioKey: 'foundry-civic-portfolio',
  communityName: 'Civic Circle',
  parentHeadline: 'Why Civic Engagement matters for your child',
  parentOneLiner:
    'Your child learns to research, participate, and lead locally — citizenship through action, not worksheets.',
  accentColor: '#6B9B6B',
  borderColor: '#2A4A2A',
  mission1Slug: 'research-ballot',
  missions: [
    { slug: 'research-ballot', number: 1, title: 'Research Your Ballot' },
    { slug: 'local-meeting', number: 2, title: 'Attend First Local Meeting' },
    { slug: 'volunteer-cause', number: 3, title: 'Volunteer for a Cause' },
    { slug: 'community-project', number: 4, title: 'Organize a Community Project' },
    { slug: 'lead-discussion', number: 5, title: 'Lead a Civic Conversation' },
  ],
  exploreSectionId: 'civic-life',
  exploreTier: 'Life Leverage',
  exploreCategories: ['all', 'life_leverage', 'civic', 'student_pathways'],
  exploreBecome: 'Someone who participates in community and leads locally.',
  exploreLaunchRank: 5,
  plannedProjects: ['Research ballot', 'Attend local meeting', 'Volunteer for a cause'],
  glossaryTerms: [{ term: 'Precinct', definition: 'Your local voting district.' }],
  careerPaths: [{ title: 'Community Organizer', description: 'Build coalitions around local issues.' }],
  playgroundLabs: [{ slug: 'ballot-lab', title: 'Ballot Research Lab', unlockLevel: 1 }],
  portfolioSections: [{ slug: 'actions', title: 'Civic Actions', description: 'Meetings and volunteer hours' }],
  corePromise: 'Improve your community through research, participation, and leadership that lasts.',
  nextWorldSlug: 'ai-builder',
};

export const WORLD_BLUEPRINTS: FullWorldBlueprint[] = [bourbon, bbq, poker, civicEngagement];

export function getFullBlueprint(slug: string): FullWorldBlueprint | undefined {
  return WORLD_BLUEPRINTS.find((b) => b.slug === slug);
}

export function listFullBlueprints(): FullWorldBlueprint[] {
  return WORLD_BLUEPRINTS;
}
