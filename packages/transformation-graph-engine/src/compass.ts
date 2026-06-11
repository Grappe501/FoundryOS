/**
 * Foundry Compass — evolves from Next Best Action to direction, not just tasks.
 */
export const FOUNDRY_COMPASS = {
  headline: 'Foundry Compass',
  evolves_from: 'What should I do next?',
  evolves_to: 'What direction should I be moving?',
  timing: 'Evolves from Next Best Action Engine — PASS-010 foundation, full compass later',
} as const;

export type CompassDirectionType =
  | 'project'
  | 'find_mentor'
  | 'join_community'
  | 'practice_skill'
  | 'reflect_on_failure'
  | 'help_someone';

export type CompassDirection = {
  type: CompassDirectionType;
  label: string;
  when: string;
};

/** The graph should understand — next step is not always a project */
export const COMPASS_DIRECTION_TYPES: CompassDirection[] = [
  { type: 'project', label: 'Complete a project', when: 'Agency gap — ready to act' },
  { type: 'find_mentor', label: 'Find a mentor', when: 'Stuck or accelerating' },
  { type: 'join_community', label: 'Join a community', when: 'Belonging or accountability needed' },
  { type: 'practice_skill', label: 'Practice a skill', when: 'Capability building' },
  { type: 'reflect_on_failure', label: 'Reflect on a failure', when: 'Momentum stalled after setback' },
  { type: 'help_someone', label: 'Help someone else', when: 'Ready to contribute or mentor' },
];
