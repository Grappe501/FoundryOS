import {
  DEMO_ACTION,
  DEMO_EVIDENCE,
  DEMO_INSIGHT,
  DEMO_NEXT_ACTION,
  DEMO_REFLECTIONS,
  DEMO_USER,
  DEMO_USER_EXIT_MESSAGE,
} from './demo-user';
import { PUBLIC_SPEAKER_PROOF } from './public-speaker-loop';
import type { TransformationLoopRecord } from './types';

/** Build the canonical Demo User loop record — all 9 steps */
export function buildDemoUserLoopRecord(): TransformationLoopRecord {
  const now = new Date().toISOString();
  return {
    user_slug: DEMO_USER.slug,
    user_display_name: DEMO_USER.display_name,
    goal: DEMO_USER.goal,
    outcome_slug: PUBLIC_SPEAKER_PROOF.outcome.slug,
    outcome_display_name: PUBLIC_SPEAKER_PROOF.outcome.display_name,
    path_slug: PUBLIC_SPEAKER_PROOF.path.slug,
    path_display_name: PUBLIC_SPEAKER_PROOF.path.display_name,
    project_slug: PUBLIC_SPEAKER_PROOF.project.slug,
    project_display_name: PUBLIC_SPEAKER_PROOF.project.display_name,
    action_text: DEMO_ACTION,
    evidence: { ...DEMO_EVIDENCE },
    reflections: { ...DEMO_REFLECTIONS },
    insight: DEMO_INSIGHT,
    next_action: DEMO_NEXT_ACTION.action,
    next_action_why: DEMO_NEXT_ACTION.why,
    loop_complete: true,
    status: 'complete',
    completed_at: now,
  };
}

export function getDemoUserProofSummary() {
  const record = buildDemoUserLoopRecord();
  return {
    record,
    exit_message: DEMO_USER_EXIT_MESSAGE,
    next_action_impact: DEMO_NEXT_ACTION.impact,
  };
}
