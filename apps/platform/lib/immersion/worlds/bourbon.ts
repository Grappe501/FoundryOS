import type { WorldMission } from '../../../components/world/WorldMissionRunner';
import type { WorldImmersionMeta, ImmersionMissionBlueprint } from '../types';
import { buildImmersionMission, chainMissions } from '../mission-builder';

const NEW_BOURBON: ImmersionMissionBlueprint[] = [
  { slug: 'flavor-wheel-tasting', number: 6, track: 'Experience', title: 'Build Your Flavor Wheel', subtitle: 'Map sweet, oak, spice, fruit on 5 pours', outcome: 'Personal flavor wheel with 5 bourbon entries', evidence: 'Wheel photo + tasting notes', timeEstimate: '90 min', requiredLevel: 'Taster (Level 2)', futureProof: 'Taste vocabulary separates enthusiasts from casual drinkers.', tomorrowHook: 'Blind tasting journal next.', missionFocus: 'Taste 5 bourbons. Note nose, palate, finish. Plot on flavor wheel template.', buildChecklist: ['Taste 5 pours', 'Complete wheel', 'Compare two favorites'], showArtifact: 'Save wheel + notes.', reflectPrompt: 'Which descriptor was hardest?', improveAction: 'Blind one pour and guess.', mentorAction: 'Host tasting for 2 friends.' },
  { slug: 'blind-tasting-journal', number: 7, track: 'Experience', title: 'Start a Blind Tasting Journal', subtitle: 'Guess, reveal, learn — the steward path', outcome: '3 blind entries with guesses and reveals', evidence: 'Journal pages photo', timeEstimate: '60 min', requiredLevel: 'Collector (Level 3)', futureProof: 'Blind tasting is how pros calibrate palate.', tomorrowHook: 'Regional map mission.', missionFocus: 'Run 3 blind pours with friend. Log guess vs reveal. Note tells you missed.', buildChecklist: ['3 blind entries', 'Log guesses', 'Note learning'], showArtifact: 'Save journal pages.', reflectPrompt: 'What fooled you most?', improveAction: 'Add water drop test on one.', mentorAction: 'Trade blinds with society member.' },
  { slug: 'regional-bourbon-map', number: 8, track: 'Experience', title: 'Map Regional Bourbon on Your Shelf', subtitle: 'Kentucky, Indiana, Tennessee — geography of flavor', outcome: 'Shelf map with region labels and one fact each', evidence: 'Map photo + 3 region facts', timeEstimate: '45 min', requiredLevel: 'Collector (Level 3)', futureProof: 'Region explains mash bill and culture.', tomorrowHook: 'Distillery trip planner.', missionFocus: 'Label each bottle by distillery state/region. Research one fact per region represented.', buildChecklist: ['Label shelf', 'Research 3 regions', 'Photo map'], showArtifact: 'Save map.', reflectPrompt: 'Which region do you gravitate to?', improveAction: 'Buy one new region.', mentorAction: 'Present map at society meetup.' },
  { slug: 'distillery-trip-planner', number: 9, track: 'Experience', title: 'Plan a Distillery Trip', subtitle: 'Itinerary, bookings, and tasting goals', outcome: 'A 1–2 day trip plan with 2+ distilleries', evidence: 'Itinerary doc', timeEstimate: '60 min', requiredLevel: 'Ambassador (Level 4)', futureProof: 'Pilgrimage deepens craft appreciation.', tomorrowHook: 'Food pairing dinner.', missionFocus: 'Pick route. Book or note tours. Set tasting goals per stop.', buildChecklist: ['Pick 2 distilleries', 'Draft itinerary', 'Set budget'], showArtifact: 'Save itinerary.', reflectPrompt: 'What will you ask on the tour?', improveAction: 'Share plan in society.', mentorAction: 'Coordinate group trip interest.' },
  { slug: 'bourbon-food-pairing', number: 10, track: 'Experience', title: 'Host a Bourbon Food Pairing', subtitle: 'Chocolate, cheese, BBQ — match complementary flavors', outcome: 'Pairing menu with 3 courses and 3 pours', evidence: 'Menu + guest reactions', timeEstimate: '2 hours', requiredLevel: 'Ambassador (Level 4)', futureProof: 'Pairing is hospitality — stewards host.', tomorrowHook: 'Keep exploring in Bourbon Society.', missionFocus: 'Design 3 pairings. Host 2+ guests. Log reactions.', buildChecklist: ['Design menu', 'Host pairing', 'Log reactions'], showArtifact: 'Save menu + notes.', reflectPrompt: 'Best surprise pairing?', improveAction: 'Repeat with one swap.', mentorAction: 'Teach pairing basics to newcomer.' },
];

export function expandBourbonMissions(existing: WorldMission[]): WorldMission[] {
  return chainMissions([...existing, ...NEW_BOURBON.map((bp) => buildImmersionMission(bp))]);
}

export const BOURBON_IMMERSION: WorldImmersionMeta = {
  slug: 'bourbon',
  displayName: 'Bourbon',
  missionTarget: 10,
  estimatedHours: '30+',
  tracks: [{ slug: 'experience', label: 'Steward Experiences', description: 'Tastings, travel, pairings', estimatedHours: '20+' }],
  experiences: [
    { slug: 'distillery-explorer', title: 'Distillery Explorer', description: 'Map distilleries visited and want-to-visit', category: 'explorer', estimatedMinutes: 20 },
    { slug: 'flavor-wheel', title: 'Flavor Wheel', description: 'Interactive tasting vocabulary', category: 'tool', estimatedMinutes: 30 },
    { slug: 'blind-tasting-journal', title: 'Blind Tasting Journal', description: 'Guess-and-reveal log', category: 'journal', estimatedMinutes: 25, portfolioSection: 'tastings' },
    { slug: 'regional-map', title: 'Regional Bourbon Map', description: 'Shelf by region', category: 'explorer', estimatedMinutes: 15 },
    { slug: 'collection-tracker', title: 'Collection Tracker', description: 'Bottles owned and ranked', category: 'tracker', estimatedMinutes: 15, href: '/bourbon/portfolio' },
    { slug: 'trip-planner', title: 'Trip Planner', description: 'Distillery routes and notes', category: 'tool', estimatedMinutes: 40 },
    { slug: 'food-pairings', title: 'Food Pairings', description: 'Pairing experiments log', category: 'journal', estimatedMinutes: 20 },
  ],
};
