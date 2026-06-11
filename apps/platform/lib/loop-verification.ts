import { ensureDemoUserLoop } from '@foundry/db';
import {
  buildDemoUserLoopRecord,
  buildVerificationChecklist,
  isLoopVerificationComplete,
  type TransformationLoopRecord,
} from '@foundry/transformation-loop';

function rowToRecord(row: {
  user_slug: string;
  user_display_name: string;
  goal: string;
  outcome_slug: string | null;
  outcome_display_name: string | null;
  path_slug: string | null;
  path_display_name: string | null;
  project_slug: string | null;
  project_display_name: string | null;
  action_text: string | null;
  evidence: Record<string, unknown>;
  reflections: Record<string, string>;
  insight: string | null;
  next_action: string | null;
  next_action_why: string | null;
  loop_complete: boolean;
  status: string;
}): TransformationLoopRecord {
  return {
    user_slug: row.user_slug,
    user_display_name: row.user_display_name,
    goal: row.goal,
    outcome_slug: row.outcome_slug ?? '',
    outcome_display_name: row.outcome_display_name ?? '',
    path_slug: row.path_slug ?? '',
    path_display_name: row.path_display_name ?? '',
    project_slug: row.project_slug ?? '',
    project_display_name: row.project_display_name ?? '',
    action_text: row.action_text ?? '',
    evidence: row.evidence,
    reflections: row.reflections,
    insight: row.insight ?? '',
    next_action: row.next_action ?? '',
    next_action_why: row.next_action_why ?? '',
    loop_complete: row.loop_complete,
    status: row.status as TransformationLoopRecord['status'],
  };
}

export async function loadPass010Verification() {
  const built = buildDemoUserLoopRecord();
  const { row, persisted, error } = await ensureDemoUserLoop(() => built);

  const record = row ? rowToRecord(row) : built;
  const checklist = buildVerificationChecklist(record);
  const complete = isLoopVerificationComplete(checklist);

  return {
    record,
    checklist,
    complete,
    db: {
      persisted,
      error: error ?? null,
      table: 'transformation_loops',
    },
  };
}
