import type { TransformationLoopRecord } from './types';

export type VerificationStep = {
  key: string;
  label: string;
  complete: boolean;
};

export const PASS_010_VERIFICATION_TITLE = 'PASS-010 Verification';

export function buildVerificationChecklist(
  loop: Pick<
    TransformationLoopRecord,
    | 'goal'
    | 'outcome_display_name'
    | 'path_display_name'
    | 'project_display_name'
    | 'action_text'
    | 'evidence'
    | 'reflections'
    | 'insight'
    | 'next_action'
    | 'next_action_why'
    | 'loop_complete'
  >
): VerificationStep[] {
  const hasEvidence =
    loop.evidence &&
    typeof loop.evidence === 'object' &&
    Object.keys(loop.evidence as object).length > 0;
  const hasReflections =
    loop.reflections &&
    typeof loop.reflections === 'object' &&
    Object.keys(loop.reflections as object).length >= 3;

  return [
    { key: 'goal', label: 'Goal Selected', complete: Boolean(loop.goal) },
    { key: 'path', label: 'Path Assigned', complete: Boolean(loop.path_display_name) },
    { key: 'project', label: 'Project Assigned', complete: Boolean(loop.project_display_name) },
    { key: 'action', label: 'Action Generated', complete: Boolean(loop.action_text) },
    { key: 'evidence', label: 'Evidence Captured', complete: hasEvidence },
    { key: 'reflection', label: 'Reflection Captured', complete: hasReflections },
    { key: 'insight', label: 'Insight Generated', complete: Boolean(loop.insight) },
    { key: 'next_action', label: 'Next Action Created', complete: Boolean(loop.next_action) },
    { key: 'why', label: 'Why Generated', complete: Boolean(loop.next_action_why) },
  ];
}

export function isLoopVerificationComplete(steps: VerificationStep[]): boolean {
  return steps.every((s) => s.complete);
}
