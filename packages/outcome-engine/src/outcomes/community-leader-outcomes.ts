import type { HumanOutcome } from '../types';

/** Outcomes composing the Become a Community Leader journey */
export const OUTCOME_BETTER_SPEAKER: HumanOutcome = {
  slug: 'become-better-speaker',
  display_name: 'Become a Better Speaker',
  goal_statement: 'I want to communicate clearly and confidently in front of groups.',
  linked_domains: ['public-speaking', 'storytelling', 'rhetoric'],
  linked_paths: ['road-to-confident-speaker', 'road-to-keynote-speaker'],
  category: 'leadership',
  status: 'planned',
};

export const OUTCOME_BETTER_ORGANIZER: HumanOutcome = {
  slug: 'become-better-organizer',
  display_name: 'Become a Better Organizer',
  goal_statement: 'I want to build and run effective groups and events.',
  linked_domains: ['management', 'event-planning', 'volunteer-coordination'],
  category: 'leadership',
  status: 'planned',
};

export const OUTCOME_BETTER_WRITER: HumanOutcome = {
  slug: 'become-better-writer',
  display_name: 'Become a Better Writer',
  goal_statement: 'I want to write persuasively for my community and cause.',
  linked_domains: ['writing', 'journalism', 'copywriting'],
  category: 'creative',
  status: 'planned',
};

export const OUTCOME_BETTER_NEGOTIATOR: HumanOutcome = {
  slug: 'become-better-negotiator',
  display_name: 'Become a Better Negotiator',
  goal_statement: 'I want to resolve conflicts and align stakeholders.',
  linked_domains: ['negotiation', 'mediation', 'political-science'],
  category: 'leadership',
  status: 'planned',
};

export const OUTCOME_BETTER_MENTOR: HumanOutcome = {
  slug: 'become-better-mentor',
  display_name: 'Become a Better Mentor',
  goal_statement: 'I want to develop others and pass on what I have learned.',
  linked_domains: ['mentorship', 'coaching', 'teaching'],
  category: 'leadership',
  status: 'planned',
};

export const COMMUNITY_LEADER_OUTCOME_SLUGS = [
  OUTCOME_BETTER_SPEAKER.slug,
  OUTCOME_BETTER_ORGANIZER.slug,
  OUTCOME_BETTER_WRITER.slug,
  OUTCOME_BETTER_NEGOTIATOR.slug,
  OUTCOME_BETTER_MENTOR.slug,
] as const;
