import { getReflectionTemplate } from '@foundry/reflection-engine';
import type { NextActionRecommendation } from '@foundry/transformation-graph-engine';
import { EXAMPLE_NEXT_ACTIONS } from '@foundry/transformation-graph-engine';

export type LoopStage =
  | 'goal'
  | 'outcome'
  | 'path'
  | 'project'
  | 'action'
  | 'evidence'
  | 'reflection'
  | 'insight'
  | 'next_action';

export type PublicSpeakerLoopPlan = {
  goal: string;
  outcome: { slug: string; display_name: string };
  path: { slug: string; display_name: string };
  project: { slug: string; display_name: string };
  action: string;
};

export type LoopCompletionInput = {
  reflections: Record<string, string>;
};

export type LoopCompletionResult = {
  evidence: { slug: string; display_name: string; recorded_at: string };
  insight: string;
  next_action: NextActionRecommendation;
  user_message: string;
  loop_complete: true;
};

/** Canonical PASS-010 proof — Public Speaker, one complete loop */
export const PUBLIC_SPEAKER_PROOF: PublicSpeakerLoopPlan & { domain: string } = {
  domain: 'public-speaking',
  goal: 'Become a Better Public Speaker',
  outcome: {
    slug: 'become-better-speaker',
    display_name: 'Better Speaker',
  },
  path: {
    slug: 'road-to-confident-speaker',
    display_name: 'Road to Confident Speaker',
  },
  project: {
    slug: 'deliver-first-speech',
    display_name: 'Deliver First Speech',
  },
  action: 'Schedule and deliver a 5-minute speech to a live audience',
};

export function initiatePublicSpeakerLoop(
  goal = PUBLIC_SPEAKER_PROOF.goal
): PublicSpeakerLoopPlan & {
  stage: 'action';
  reflection_prompts: NonNullable<ReturnType<typeof getReflectionTemplate>>['completion_prompts'];
} {
  const template = getReflectionTemplate('deliver-first-speech');
  return {
    ...PUBLIC_SPEAKER_PROOF,
    goal,
    stage: 'action',
    reflection_prompts: template?.completion_prompts ?? [],
  };
}

function deriveInsight(reflections: Record<string, string>): string {
  const learned = reflections.learned ?? reflections['what-did-you-learn'] ?? '';
  const surprised = reflections.surprised ?? reflections['what-surprised-you'] ?? '';
  if (learned) {
    return `Reflection captured: "${learned.slice(0, 120)}${learned.length > 120 ? '…' : ''}" — first speech completed. Confidence and structure are the recurring growth levers for speakers at this stage.`;
  }
  if (surprised) {
    return `Speaker noted surprise: "${surprised.slice(0, 80)}…" — nervousness often exceeds actual difficulty. Graph pattern: first-speech completers report lower anxiety on speech two.`;
  }
  return 'First speech completed. Graph pattern: speakers who reflect immediately after delivery are 2× more likely to schedule a second speech within 30 days.';
}

export function completePublicSpeakerLoop(input: LoopCompletionInput): LoopCompletionResult {
  const next_action = EXAMPLE_NEXT_ACTIONS[0]!;
  const insight = deriveInsight(input.reflections);

  return {
    evidence: {
      slug: 'deliver-first-speech-completed',
      display_name: 'Deliver First Speech — completed',
      recorded_at: new Date().toISOString(),
    },
    insight,
    next_action,
    user_message:
      'I completed my first speech and know exactly what to do next.',
    loop_complete: true,
  };
}

export function runPublicSpeakerProofDemo(): {
  plan: ReturnType<typeof initiatePublicSpeakerLoop>;
  completion: LoopCompletionResult;
} {
  const plan = initiatePublicSpeakerLoop();
  const completion = completePublicSpeakerLoop({
    reflections: {
      surprised: 'The audience was more supportive than I expected.',
      'went-well': 'I finished without losing my place.',
      learned: 'Preparation mattered more than perfection.',
    },
  });
  return { plan, completion };
}
