/** Persisted transformation loop — PASS-010 proof record */
export type TransformationLoopRecord = {
  id?: string;
  user_slug: string;
  user_display_name: string;
  goal: string;
  outcome_slug: string;
  outcome_display_name: string;
  path_slug: string;
  path_display_name: string;
  project_slug: string;
  project_display_name: string;
  action_text: string;
  evidence: Record<string, unknown>;
  reflections: Record<string, string>;
  insight: string;
  next_action: string;
  next_action_why: string;
  loop_complete: boolean;
  status: 'in_progress' | 'complete' | 'archived';
  completed_at?: string | null;
};
