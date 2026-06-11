import type { HumanOutcome } from '../types';
import { OUTCOME_BETTER_LEADER } from './better-leader';
import { OUTCOME_FINANCIALLY_INDEPENDENT } from './financially-independent';
import { OUTCOME_MASTER_GARDENER } from './master-gardener';
import { OUTCOME_AI_BUILDER } from './ai-builder';
import { OUTCOME_DOCTOR } from './doctor';
import {
  OUTCOME_BETTER_MENTOR,
  OUTCOME_BETTER_NEGOTIATOR,
  OUTCOME_BETTER_ORGANIZER,
  OUTCOME_BETTER_SPEAKER,
  OUTCOME_BETTER_WRITER,
} from './community-leader-outcomes';

/** The most important registry — goals, not subjects */
export const HUMAN_OUTCOMES_REGISTRY: HumanOutcome[] = [
  OUTCOME_BETTER_LEADER,
  OUTCOME_FINANCIALLY_INDEPENDENT,
  OUTCOME_MASTER_GARDENER,
  OUTCOME_AI_BUILDER,
  OUTCOME_DOCTOR,
  OUTCOME_BETTER_SPEAKER,
  OUTCOME_BETTER_ORGANIZER,
  OUTCOME_BETTER_WRITER,
  OUTCOME_BETTER_NEGOTIATOR,
  OUTCOME_BETTER_MENTOR,
];

export function getHumanOutcome(slug: string): HumanOutcome | undefined {
  return HUMAN_OUTCOMES_REGISTRY.find((o) => o.slug === slug);
}

export function getOutcomesForDomain(domainSlug: string): HumanOutcome[] {
  return HUMAN_OUTCOMES_REGISTRY.filter((o) => o.linked_domains.includes(domainSlug));
}
