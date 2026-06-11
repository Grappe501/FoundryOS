import type { WorldMission } from '../../../components/world/WorldMissionRunner';
import type { WorldImmersionMeta, ImmersionMissionBlueprint } from '../types';
import { buildImmersionMission, chainMissions } from '../mission-builder';

const NEW_BBQ: ImmersionMissionBlueprint[] = [
  { slug: 'cook-log-system', number: 6, track: 'Experience', title: 'Start a Cook Log System', subtitle: 'Every cook: temps, times, wood, weather, result', outcome: 'A structured log with 3 cooks documented', evidence: 'Log pages + best cook photo', timeEstimate: 'Varies — 3 cooks', requiredLevel: 'Backyard Cook (Level 2)', futureProof: 'Pitmasters learn from logs — not memory.', tomorrowHook: 'Temperature tracking mission.', missionFocus: 'Create log template. Document 3 cooks with temps, wrap time, rest, rating.', buildChecklist: ['Create template', 'Log 3 cooks', 'Note one pattern'], showArtifact: 'Save log.', reflectPrompt: 'What variable mattered most?', improveAction: 'Change one variable next cook.', mentorAction: 'Share log format in Pitmaster Collective.' },
  { slug: 'temperature-tracking', number: 7, track: 'Experience', title: 'Master Temperature Tracking', subtitle: 'Probes, zones, stall — data beats guessing', outcome: 'Temp graph or table from one long cook', evidence: 'Temp log + stall notes', timeEstimate: 'One brisket or butt cook', requiredLevel: 'Pitmaster (Level 3)', futureProof: 'Consistent BBQ is thermodynamics.', tomorrowHook: 'Recipe journal mission.', missionFocus: 'Log probe temps every 45 min on one cook. Note stall and wrap decision.', buildChecklist: ['Log every 45 min', 'Note stall', 'Record rest time'], showArtifact: 'Save temp log.', reflectPrompt: 'When would you wrap differently?', improveAction: 'Try different wrap point once.', mentorAction: 'Help newbie read probe temps.' },
  { slug: 'recipe-journal', number: 8, track: 'Experience', title: 'Build a Recipe Journal', subtitle: 'Rubs, injections, spritzes — your signature', outcome: '3 recipes documented with tweaks history', evidence: 'Recipe cards + photos', timeEstimate: '90 min', requiredLevel: 'Pitmaster (Level 3)', futureProof: 'Signature recipes are identity.', tomorrowHook: 'Competition prep timeline.', missionFocus: 'Document 3 recipes with ingredients, steps, and version notes.', buildChecklist: ['Document 3 recipes', 'Photo each', 'Note v1 vs v2 tweaks'], showArtifact: 'Save recipe cards.', reflectPrompt: 'Which is your signature?', improveAction: 'Cook signature for guests.', mentorAction: 'Swap recipes with collective member.' },
  { slug: 'competition-prep-timeline', number: 9, track: 'Experience', title: 'Build a Competition Prep Timeline', subtitle: 'Turn-in times working backward from noon', outcome: 'A full timeline for one competition or mock comp', evidence: 'Timeline doc + one executed milestone', timeEstimate: '2 hours planning', requiredLevel: 'Competition Cook (Level 4)', futureProof: 'Competition BBQ is logistics plus fire.', tomorrowHook: 'Judge pathway prep.', missionFocus: 'Pick comp category. Work backward from turn-in. Schedule prep, fire, rest.', buildChecklist: ['Build timeline', 'Execute one milestone', 'Adjust buffer times'], showArtifact: 'Save timeline.', reflectPrompt: 'Where is your buffer thin?', improveAction: 'Add 30 min buffer to weakest step.', mentorAction: 'Review timeline with experienced comp cook.' },
  { slug: 'judge-certification-prep', number: 10, track: 'Experience', title: 'Prepare for Judging Pathway', subtitle: 'KCBS-style scoring practice on 4 categories', outcome: 'Mock judge scorecard with notes on 4 samples', evidence: 'Scorecard photo + calibration notes', timeEstimate: '90 min', requiredLevel: 'Judge (Level 5)', futureProof: 'Judges taste with criteria — stewards respect craft.', tomorrowHook: 'Keep cooking in Pitmaster Collective.', missionFocus: 'Study judging criteria. Score 4 practice samples (or review photos/videos). Write calibration notes.', buildChecklist: ['Study criteria', 'Complete scorecard', 'Write calibration notes'], showArtifact: 'Save scorecard.', reflectPrompt: 'Where is your bias?', improveAction: 'Judge blind one sample.', mentorAction: 'Discuss scores with collective.' },
];

export function expandBbqMissions(existing: WorldMission[]): WorldMission[] {
  return chainMissions([...existing, ...NEW_BBQ.map((bp) => buildImmersionMission(bp))]);
}

export const BBQ_IMMERSION: WorldImmersionMeta = {
  slug: 'bbq',
  displayName: 'BBQ',
  missionTarget: 10,
  estimatedHours: '30+',
  tracks: [{ slug: 'experience', label: 'Pitmaster Experiences', description: 'Cooks, logs, competition', estimatedHours: '25+' }],
  experiences: [
    { slug: 'cook-log', title: 'Cook Log', description: 'Every smoke documented', category: 'journal', estimatedMinutes: 15, href: '/bbq/portfolio' },
    { slug: 'recipe-journal', title: 'Recipe Journal', description: 'Rubs and tweaks over time', category: 'journal', estimatedMinutes: 20 },
    { slug: 'temperature-tracker', title: 'Temperature Tracker', description: 'Probe logs and stall notes', category: 'tracker', estimatedMinutes: 10 },
    { slug: 'competition-prep', title: 'Competition Prep', description: 'Timeline and checklist', category: 'tool', estimatedMinutes: 45 },
    { slug: 'judge-pathway', title: 'Judge Pathway', description: 'Scorecards and calibration', category: 'pathway', estimatedMinutes: 60 },
  ],
};
