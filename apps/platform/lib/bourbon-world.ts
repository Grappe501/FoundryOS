/** Bourbon World — Passion Trinity · Appreciate Craft (PASS-023 foundation) */

import type { WorldMission } from '../components/world/WorldMissionRunner';

export const BOURBON_LOOP = [
  { step: 'Mission', description: 'Pick a tasting, shelf, or experience worth pursuing' },
  { step: 'Build', description: 'Prepare, compare, or document your bourbon journey' },
  { step: 'Show', description: 'Share notes, photos, or your shelf with someone' },
  { step: 'Reflect', description: 'Write what you tasted, smelled, and learned' },
  { step: 'Improve', description: 'Refine your palate or collection strategy' },
  { step: 'Mentor', description: 'Guide a friend through their first proper tasting' },
] as const;

export const BOURBON_ACADEMY_LEVELS = [
  { slug: 'curious', level: 1, title: 'Curious Drinker', tagline: 'Understand what bourbon is and how to taste it', unlocks: ['Mission 1: Host First Tasting'] },
  { slug: 'taster', level: 2, title: 'Confident Taster', tagline: 'Identify flavors and compare pours with purpose', unlocks: ['Tasting Lab'] },
  { slug: 'collector', level: 3, title: 'Shelf Builder', tagline: 'Curate a collection that tells your story', unlocks: ['Mission 2: Build First Shelf'] },
  { slug: 'connoisseur', level: 4, title: 'Connoisseur', tagline: 'Know regions, mash bills, and distilleries', unlocks: ['Mission 3: Compare 5 Bourbons'] },
  { slug: 'host', level: 5, title: 'Tasting Host', tagline: 'Run blind tastings and themed nights', unlocks: ['Mission 4: Blind Tasting Night'] },
  { slug: 'traveler', level: 6, title: 'Distillery Traveler', tagline: 'Connect place, process, and pour', unlocks: ['Mission 5: Visit First Distillery'] },
  { slug: 'steward', level: 7, title: 'Bourbon Steward', tagline: 'Teach others and lead the Bourbon Circle', unlocks: ['Bourbon Circle mentorship'] },
];

export const BOURBON_MISSIONS: WorldMission[] = [
  {
    slug: 'first-tasting',
    number: 1,
    title: 'Host First Tasting',
    subtitle: 'Three bourbons, one table, real notes — your palate starts here',
    outcome: 'A guided tasting for 1–3 people with written flavor notes for each pour',
    evidence: 'Tasting notes + photo of the lineup + one reflection paragraph',
    timeEstimate: '60–90 min',
    requiredLevel: 'Curious Drinker (Level 1 — you start here)',
    futureProof: 'Appreciating craft trains attention, patience, and storytelling — skills that transfer everywhere.',
    toolsNeeded: '3 bourbons (can start with $20–35 bottles) · glencairn or small glasses · water · notebook',
    tomorrowHook: 'Tomorrow: Mission 2 — build your first shelf with intention, not random bottles.',
    nextMissionSlug: 'first-shelf',
    steps: [
      { phase: 'Mission', title: 'Pick your three', body: 'Choose three different bourbons — different proof, brand, or price point. Write why you picked each.' },
      { phase: 'Build', title: 'Set up the tasting', body: 'Pour ½ oz each. Smell, taste, add a drop of water, taste again. Note: nose, palate, finish.' },
      { phase: 'Show', title: 'Host someone', body: 'Walk one person through the same three pours — or record a 2-minute voice memo of your notes.' },
      { phase: 'Reflect', title: 'What surprised you?', body: 'Which pour won? What flavor word was new to you?' },
      { phase: 'Improve', title: 'One upgrade', body: 'Pick one bottle you would replace and why.' },
      { phase: 'Mentor', title: 'Teach one technique', body: 'Show someone how to nose a glass without burning their nostrils.' },
    ],
  },
  {
    slug: 'first-shelf',
    number: 2,
    title: 'Build First Shelf',
    subtitle: 'A small collection with a point of view — not a random pile of bottles',
    outcome: '5–8 bottles organized by a theme you can explain (daily drinker, proof ladder, distilleries, etc.)',
    evidence: 'Shelf photo + written theme statement + one bottle you would gift and why',
    timeEstimate: '45–60 min',
    requiredLevel: 'Shelf Builder (Level 3)',
    futureProof: 'Curation is a life skill — collections reveal identity.',
    tomorrowHook: 'Tomorrow: Mission 3 — compare five bourbons side by side with structured notes.',
    nextMissionSlug: 'compare-five',
    steps: [
      { phase: 'Mission', title: 'Choose your theme', body: 'Daily drinkers · Kentucky vs elsewhere · high rye vs wheated · under $40 gems.' },
      { phase: 'Build', title: 'Curate the shelf', body: 'Arrange bottles with labels visible. Write a one-sentence theme on an index card.' },
      { phase: 'Show', title: 'Photograph and share', body: 'Take a shelf photo. Share with one friend who appreciates bourbon or wants to learn.' },
      { phase: 'Reflect', title: 'What is missing?', body: 'What gap would your next bottle fill?' },
      { phase: 'Improve', title: 'Swap one bottle', body: 'If you could only keep 5, which would go?' },
      { phase: 'Mentor', title: 'Recommend a starter bottle', body: 'Help a beginner pick their first bottle under $35 with one sentence of why.' },
    ],
  },
  {
    slug: 'compare-five',
    number: 3,
    title: 'Compare 5 Bourbons',
    subtitle: 'Structured comparison — learn what makes pours different',
    outcome: 'Comparison grid with nose, palate, finish, and preference ranking for five bourbons',
    evidence: 'Completed grid + top pick + one sentence on what variable mattered most (proof, age, mash bill)',
    timeEstimate: '90 min',
    requiredLevel: 'Connoisseur (Level 4)',
    futureProof: 'Comparison thinking beats hype — you learn to trust your palate.',
    tomorrowHook: 'Tomorrow: Mission 4 — run a blind tasting night.',
    nextMissionSlug: 'blind-tasting',
    steps: [
      { phase: 'Mission', title: 'Pick a variable', body: 'Hold one thing constant: same distillery different ages, same mash bill different proofs, etc.' },
      { phase: 'Build', title: 'Fill the grid', body: 'Nose · Palate · Finish · Sweet/Spicy · Overall score 1–10 for each.' },
      { phase: 'Show', title: 'Declare a winner', body: 'Rank all five. Defend #1 in three sentences.' },
      { phase: 'Reflect', title: 'Palate lesson', body: 'What did comparing teach you that single tastings did not?' },
      { phase: 'Improve', title: 'Retry the loser', body: 'Re-taste your lowest-ranked pour — did your opinion change?' },
      { phase: 'Mentor', title: 'Explain one difference', body: 'Teach someone the difference between wheated and high-rye in plain language.' },
    ],
  },
  {
    slug: 'blind-tasting',
    number: 4,
    title: 'Blind Tasting Night',
    subtitle: 'Remove the label bias — trust your senses',
    outcome: 'Blind tasting for 2+ people with numbered pours and reveal moment',
    evidence: 'Blind ranking vs revealed labels + one surprise result',
    timeEstimate: '2 hours',
    requiredLevel: 'Tasting Host (Level 5)',
    futureProof: 'Blind protocols build humility and honest judgment.',
    tomorrowHook: 'Tomorrow: Mission 5 — plan your first distillery visit.',
    nextMissionSlug: 'distillery-visit',
    steps: [
      { phase: 'Mission', title: 'Bag the bottles', body: 'Cover labels. Number pours. Prepare reveal sheet.' },
      { phase: 'Build', title: 'Run the night', body: 'Same pour size, water available, score cards anonymous.' },
      { phase: 'Show', title: 'Reveal and discuss', body: 'Uncover labels. Compare guesses to reality.' },
      { phase: 'Reflect', title: 'Biggest surprise', body: 'Which expensive bottle lost? Which budget bottle won?' },
      { phase: 'Improve', title: 'One protocol fix', body: 'What would you do differently next blind night?' },
      { phase: 'Mentor', title: 'Coach a first-timer', body: 'Help someone describe a flavor without saying "smooth."' },
    ],
  },
  {
    slug: 'distillery-visit',
    number: 5,
    title: 'Visit First Distillery',
    subtitle: 'See where it is made — mash, still, barrel, bottle',
    outcome: 'Distillery visit (or virtual tour + deep notes) with process observations',
    evidence: 'Photos or notes from tour + one process step that changed how you taste',
    timeEstimate: 'Half day or 2 hr virtual',
    requiredLevel: 'Distillery Traveler (Level 6)',
    futureProof: 'Place-based learning sticks — you become a storyteller, not just a drinker.',
    tomorrowHook: 'Tomorrow: explore BBQ World — create experiences around the pit.',
    steps: [
      { phase: 'Mission', title: 'Pick your visit', body: 'Local distillery tour, Kentucky trip, or official virtual tour with note-taking.' },
      { phase: 'Build', title: 'Learn the process', body: 'Track: grain · cook · ferment · distill · barrel · age · proof · bottle.' },
      { phase: 'Show', title: 'Share one insight', body: 'Tell someone one thing about production they did not know.' },
      { phase: 'Reflect', title: 'Tasting connection', body: 'How does knowing the process change your next pour?' },
      { phase: 'Improve', title: 'Plan bottle purchase', body: 'If the gift shop has exclusives, decide intentionally — not impulse.' },
      { phase: 'Mentor', title: 'Bring someone next time', body: 'Invite a friend on your next visit or share your virtual tour notes.' },
    ],
  },
];

export const BOURBON_PORTFOLIO_KEY = 'foundry-bourbon-portfolio';
export const BOURBON_PORTFOLIO_LABEL = 'My Bourbon Journey';

export const BOURBON_COMMUNITY = {
  name: 'Bourbon Circle',
  features: [
    { title: 'Monthly tasting themes', description: 'High rye month · single barrel picks · budget blind nights' },
    { title: 'Shelf showcases', description: 'Members share collection philosophy — not flexing, teaching' },
    { title: 'Distillery trip reports', description: 'Field notes from Kentucky and beyond' },
    { title: 'Mentorship', description: 'Stewards guide new members through first tastings' },
  ],
};

export function getBourbonMission(slug: string) {
  return BOURBON_MISSIONS.find((m) => m.slug === slug);
}
