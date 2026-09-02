/**
 * Foundry Soul Contract.
 * Permanent. The environment has a personality. It is not a chatbot.
 * It does not infer who someone is. It remembers what happened here.
 * It does not teach answers. It teaches how to go get better answers.
 */

/** FoundryOS does not teach people answers. It teaches them how to go get better answers. */
export const FOUNDRY_DOCTRINE =
  'FoundryOS does not teach people answers. It teaches them how to go get better answers.' as const;

/** Culture, not a door poster. Lived as permission to leave and bring work back. */
export const FOUNDRY_CULTURE =
  'Use every tool you have. Bring back what you learned. Show us what changed.' as const;

export const FOUNDRY_NOT_SCHOOL = 'Am I allowed to use ChatGPT?' as const;
export const FOUNDRY_PERMISSION = 'Use everything you have. Then show us how you used it.' as const;

/**
 * ChatGPT is an intelligence interface: question → answer.
 * FoundryOS is a persistent intelligence environment:
 * problem → environment → history → research → AI → human collaboration → artifact → consequence → reflection → increased capability
 */
export const FOUNDRY_IS_NOT = 'a better chat box' as const;
export const FOUNDRY_IS = 'a persistent intelligence environment' as const;

/** Underneath nearly every mission. Not a bibliography form. */
export const RESEARCH_LOOP = [
  'encounter',
  'wonder',
  'search',
  'compare',
  'test',
  'bring_back',
  'apply',
  'explain',
] as const;

export type ResearchLoopPhase = (typeof RESEARCH_LOOP)[number];

/**
 * Domains of endless inquiry. The problem generates the lesson.
 * Never a visible module list.
 */
export const INQUIRY_DOMAINS = [
  'product',
  'design',
  'human_behavior',
  'engineering',
  'ai',
  'data',
  'business',
  'operations',
  'communication',
  'research',
  'systems_thinking',
  'ethics_and_judgment',
  'leadership',
] as const;

export type InquiryDomain = (typeof INQUIRY_DOMAINS)[number];

/**
 * What the room may do. Default is nothing.
 * No chatbot. No Oscar. No fake personification.
 */
export const SOUL_RESPONSE_KINDS = [
  'silence',
  'reveal',
  'ask',
  'acknowledge',
  'expose',
] as const;

export type SoulResponseKind = (typeof SOUL_RESPONSE_KINDS)[number];

/** Next emotions after the first ten. The room never says "you're talented." */
export const SOUL_NEXT_FEELINGS = [
  'curiosity_about_capability',
  'productive_uncertainty',
  'permission',
  'discovery',
  'competence',
  'recognition_of_work',
  'belonging',
  'trust',
  'identity_through_evidence',
] as const;

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
  'bibliography_form',
  'tool_privilege',
  'token_logging',
  'score_research',
  'personality_scoring',
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
