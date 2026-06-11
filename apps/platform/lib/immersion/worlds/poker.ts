import type { WorldMission } from '../../../components/world/WorldMissionRunner';
import type { WorldImmersionMeta, ImmersionMissionBlueprint } from '../types';
import { buildImmersionMission, chainMissions } from '../mission-builder';

const NEW_POKER: ImmersionMissionBlueprint[] = [
  { slug: 'hand-analysis-deep', number: 6, track: 'Experience', title: 'Deep Hand Analysis Session', subtitle: '10 hands with equity, line, and alternative lines', outcome: 'Analysis doc on 10 hands with lessons', evidence: 'Hand history doc', timeEstimate: '90 min', requiredLevel: 'Grinder (Level 2)', futureProof: 'Winners review hands — losers replay luck.', tomorrowHook: 'Tournament journal mission.', missionFocus: 'Record 10 hands. For each: preflop rationale, sizing, alternative line, mistake tag.', buildChecklist: ['Record 10 hands', 'Tag 3 mistakes', 'Write one lesson'], showArtifact: 'Save analysis.', reflectPrompt: 'Most expensive mistake pattern?', improveAction: 'Replay one hand with mentor.', mentorAction: 'Review peer hand in society.' },
  { slug: 'tournament-journal', number: 7, track: 'Experience', title: 'Start a Tournament Journal', subtitle: 'Buy-ins, placements, key hands, leaks', outcome: 'Journal with 3 tournament entries', evidence: 'Journal pages', timeEstimate: '3 sessions', requiredLevel: 'Grinder (Level 2)', futureProof: 'Long-term winners track variance honestly.', tomorrowHook: 'Bankroll rules mission.', missionFocus: 'Log 3 tournaments or home games: buy-in, placement, 2 key hands, emotional state.', buildChecklist: ['3 entries', 'Note leaks', 'Calculate ROI roughly'], showArtifact: 'Save journal.', reflectPrompt: 'Tilt trigger identified?', improveAction: 'Set one pre-session rule.', mentorAction: 'Share journal format.' },
  { slug: 'bankroll-rules', number: 8, track: 'Experience', title: 'Define Your Bankroll Rules', subtitle: 'Stop-loss, buy-in caps, game selection', outcome: 'Written bankroll policy you follow', evidence: 'Policy doc + one month adherence log', timeEstimate: '60 min', requiredLevel: 'Strategist (Level 3)', futureProof: 'Bankroll discipline is the whole game.', tomorrowHook: 'Strategy academy module.', missionFocus: 'Set total bankroll, max buy-in, stop-loss, allowed stakes. Log adherence for 2 weeks.', buildChecklist: ['Write policy', 'Log 2 weeks', 'Note one temptation'], showArtifact: 'Save policy.', reflectPrompt: 'When did you want to break rules?', improveAction: 'Add accountability partner.', mentorAction: 'Discuss policy with mentor.' },
  { slug: 'strategy-module-positions', number: 9, track: 'Experience', title: 'Complete Positions Strategy Module', subtitle: 'UTG tight, BTN wide — play 100 practice decisions', outcome: '100-hand drill log with position tags', evidence: 'Drill log + accuracy score', timeEstimate: '2 hours', requiredLevel: 'Strategist (Level 3)', futureProof: 'Position is power — drill until automatic.', tomorrowHook: 'Final table prep mission.', missionFocus: 'Run position drill (app or review). Log 100 decisions. Score open/call/fold accuracy.', buildChecklist: ['100 decisions', 'Score accuracy', 'Note weakest position'], showArtifact: 'Save drill log.', reflectPrompt: 'Where do you leak most?', improveAction: 'Drill weakest position 50 more.', mentorAction: 'Quiz peer on BTN ranges.' },
  { slug: 'final-table-simulation', number: 10, track: 'Experience', title: 'Final Table Simulation', subtitle: 'ICM, short stacks, pay jumps — pressure practice', outcome: 'One simulated final table with decision log', evidence: 'Simulation notes + 3 ICM decisions', timeEstimate: '90 min', requiredLevel: 'Mentor (Level 4)', futureProof: 'Final tables are a different game.', tomorrowHook: 'Teach in Strategic Thinking Society.', missionFocus: 'Run FT sim (software or home game). Log 3 ICM spots and choices.', buildChecklist: ['Run simulation', 'Log 3 ICM spots', 'Write takeaway'], showArtifact: 'Save notes.', reflectPrompt: 'Risk too much or too little?', improveAction: 'Review one spot with solver or mentor.', mentorAction: 'Host FT sim for society.' },
];

export function expandPokerMissions(existing: WorldMission[]): WorldMission[] {
  return chainMissions([...existing, ...NEW_POKER.map((bp) => buildImmersionMission(bp))]);
}

export const POKER_IMMERSION: WorldImmersionMeta = {
  slug: 'poker',
  displayName: 'Poker',
  missionTarget: 10,
  estimatedHours: '30+',
  tracks: [{ slug: 'experience', label: 'Strategic Experiences', description: 'Analysis, journal, bankroll', estimatedHours: '25+' }],
  experiences: [
    { slug: 'hand-analysis', title: 'Hand Analysis', description: 'Deep review workspace', category: 'tool', estimatedMinutes: 30 },
    { slug: 'tournament-journal', title: 'Tournament Journal', description: 'Results and key hands', category: 'journal', estimatedMinutes: 15 },
    { slug: 'bankroll-tracker', title: 'Bankroll Tracker', description: 'Rules and session log', category: 'tracker', estimatedMinutes: 15, href: '/poker/portfolio' },
    { slug: 'strategy-academy', title: 'Strategy Academy', description: 'Position and ICM drills', category: 'pathway', href: '/poker/academy' },
  ],
};
