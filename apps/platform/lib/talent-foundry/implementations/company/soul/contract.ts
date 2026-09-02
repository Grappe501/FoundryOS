/**
 * Foundry Soul Contract.
 * Permanent. The environment has a personality. It is not a chatbot.
 * It does not infer who someone is. It remembers what happened here.
 */

export const SOUL_TRAITS = [
  'observant',
  'restrained',
  'curious',
  'consequential',
  'slightly_mischievous',
  'demanding',
  'generous',
  'alive',
] as const;

export type SoulTrait = (typeof SOUL_TRAITS)[number];

/** The loop the room runs. Stronger than task → points → badge. */
export const SOUL_LOOP = [
  'curiosity',
  'agency',
  'friction',
  'discovery',
  'attempt',
  'competence',
  'consequence',
  'recognition',
  'increased_capability',
  'new_mystery',
] as const;

export type SoulLoopPhase = (typeof SOUL_LOOP)[number];

export const SOUL_RELATIONSHIP = 'This place knows what I have done here.' as const;
export const SOUL_NOT_RELATIONSHIP = 'This AI knows who I am.' as const;

export const SOUL_OPTIMIZES_FOR = ['capability', 'voluntary_return'] as const;

export const SOUL_NEVER = [
  'time_on_platform',
  'punish_leaving',
  'artificial_urgency',
  'manufactured_social_rejection',
  'streak_loss',
  'fake_human_messages',
  'withhold_necessary_information_for_engagement',
  'infer_psychological_vulnerability',
  'constant_praise',
  'confetti',
  'points',
  'badges',
] as const;

export const SOUL_VOICE_FORBIDDEN = [
  'congratulations',
  'great job',
  'well done',
  'awesome',
  'welcome aboard',
  'keep it up',
  'you got this',
  'streak',
  'come back tomorrow',
  'dont miss',
  "don't miss",
  'hurry',
  'limited time',
] as const;

/** Recognition is rare. Default response is silence. */
export const SOUL_DEFAULT_RESPONSE = 'silence' as const;

export const SOUL_PLACE_ATTACHMENT = [
  'I have unfinished work there.',
  'Something I made matters there.',
  'People I respect are there.',
  'I become better when I am there.',
] as const;
