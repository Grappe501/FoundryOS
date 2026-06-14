import type { CopilotRequest } from './copilots';
import type { OrchestrationRequest } from './types';

const ADULT_ONLY_WORLDS = new Set(['bourbon', 'poker', 'cigars', 'medical-cannabis-literacy']);

const RESTRICTED_FOR_STUDENTS = new Set([...ADULT_ONLY_WORLDS, 'bbq', 'astrology']);

export type SafetyResult = { allowed: boolean; reason?: string };

type SafetyRequest = Pick<CopilotRequest, 'user_segment' | 'world_slug'> & {
  action: CopilotRequest['action'] | OrchestrationRequest['action'];
};

export function validateCopilotSafety(request: SafetyRequest): SafetyResult {
  const { user_segment, world_slug } = request;

  if ((user_segment === 'student' || user_segment === 'teen') && RESTRICTED_FOR_STUDENTS.has(world_slug)) {
    return {
      allowed: false,
      reason: `${world_slug} copilot is not available for ${user_segment} accounts.`,
    };
  }

  if (user_segment === 'student' && request.action === 'connect_related_worlds') {
    // downstream recommendation engine also filters — belt and suspenders
    return { allowed: true };
  }

  const blockedActionsForStudents: CopilotRequest['action'][] = [];
  if (user_segment === 'student' && blockedActionsForStudents.includes(request.action as CopilotRequest['action'])) {
    return { allowed: false, reason: 'This copilot action requires an adult account.' };
  }

  return { allowed: true };
}

export const COPILOT_SAFETY_RULES = [
  'No medical advice',
  'No legal advice',
  'No financial guarantees',
  'No political persuasion',
  'No adult-restricted recommendations to minors',
  'Every recommendation respects world audience registry',
] as const;
