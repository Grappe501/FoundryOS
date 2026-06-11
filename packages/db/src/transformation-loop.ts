import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';

export type TransformationLoopRow = {
  id: string;
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
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function getTransformationLoopByUserSlug(
  userSlug: string
): Promise<TransformationLoopRow | null> {
  if (!isSupabaseConfigured()) return null;
  const client = createServiceClient();
  if (!client) return null;

  const { data, error } = await client
    .from('transformation_loops')
    .select('*')
    .eq('user_slug', userSlug)
    .maybeSingle();

  if (error || !data) return null;
  return data as TransformationLoopRow;
}

export async function upsertTransformationLoop(
  record: Omit<TransformationLoopRow, 'id' | 'created_at' | 'updated_at'> & { id?: string }
): Promise<{ row: TransformationLoopRow | null; persisted: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { row: null, persisted: false, error: 'Supabase not configured' };
  }
  const client = createServiceClient();
  if (!client) {
    return { row: null, persisted: false, error: 'Service client unavailable' };
  }

  const payload = {
    user_slug: record.user_slug,
    user_display_name: record.user_display_name,
    goal: record.goal,
    outcome_slug: record.outcome_slug,
    outcome_display_name: record.outcome_display_name,
    path_slug: record.path_slug,
    path_display_name: record.path_display_name,
    project_slug: record.project_slug,
    project_display_name: record.project_display_name,
    action_text: record.action_text,
    evidence: record.evidence,
    reflections: record.reflections,
    insight: record.insight,
    next_action: record.next_action,
    next_action_why: record.next_action_why,
    loop_complete: record.loop_complete,
    status: record.status,
    completed_at: record.completed_at,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await client
    .from('transformation_loops')
    .upsert(payload, { onConflict: 'user_slug' })
    .select('*')
    .single();

  if (error) {
    return { row: null, persisted: false, error: error.message };
  }

  if (record.loop_complete) {
    await client.from('platform_metrics').upsert(
      {
        metric_key: 'transformation_loop_completion_rate',
        metric_value: { rate: 1, loops_started: 1, loops_completed: 1 },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'metric_key' }
    );
    await client.from('platform_metrics').upsert(
      {
        metric_key: 'meaningful_progress_events',
        metric_value: { count: 1, last_event: 'first-speech-delivered' },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'metric_key' }
    );
  }

  return { row: data as TransformationLoopRow, persisted: true };
}

export async function ensureDemoUserLoop(
  buildRecord: () => {
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
    status: string;
    completed_at?: string | null;
  }
): Promise<{ row: TransformationLoopRow | null; persisted: boolean; error?: string }> {
  const existing = await getTransformationLoopByUserSlug('demo-user');
  if (existing?.loop_complete) {
    return { row: existing, persisted: true };
  }
  const record = buildRecord();
  return upsertTransformationLoop({
    ...record,
    completed_at: record.completed_at ?? new Date().toISOString(),
  });
}
