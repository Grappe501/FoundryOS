/** Foundry mission loop — craft-first labels (see docs/VOICE_GUIDE.md) */

export const FOUNDRY_MISSION_PHASES = [
  'Mission',
  'Build',
  'Show',
  'Debrief',
  'Refine',
  'Teach',
] as const;

export type FoundryMissionPhase = (typeof FOUNDRY_MISSION_PHASES)[number];

/** Legacy phase names still accepted in mission step data */
export type LegacyMissionPhase = 'Reflect' | 'Improve' | 'Mentor';

export type MissionLoopPhase = FoundryMissionPhase | LegacyMissionPhase;

export const FOUNDRY_MISSION_LOOP_TEXT = FOUNDRY_MISSION_PHASES.join(' → ');

export const FOUNDRY_MISSION_LOOP = [
  { step: 'Mission' as const, description: 'Pick the line, cook, puzzle, or project worth doing' },
  { step: 'Build' as const, description: 'Play, ship, smoke, solve — with intention' },
  { step: 'Show' as const, description: 'Log evidence: PGN, hand history, screenshot, or artifact' },
  { step: 'Debrief' as const, description: 'Name what you missed, what worked, and why' },
  { step: 'Refine' as const, description: 'One adjustment — repertoire, temps, prompt, or process' },
  { step: 'Teach' as const, description: 'Walk someone through what you just learned' },
] as const;

export const FOUNDRY_DEBRIEF_PLACEHOLDER =
  'What did you miss? What will you refine or drill next?';

export const FOUNDRY_MISSION_TRACKS_SUBTITLE =
  `Experiences — not lessons. ${FOUNDRY_MISSION_LOOP_TEXT}.`;

/** Normalize legacy step labels for display and analytics */
export function normalizeMissionPhase(phase: MissionLoopPhase): FoundryMissionPhase {
  if (phase === 'Reflect') return 'Debrief';
  if (phase === 'Improve') return 'Refine';
  if (phase === 'Mentor') return 'Teach';
  return phase;
}
