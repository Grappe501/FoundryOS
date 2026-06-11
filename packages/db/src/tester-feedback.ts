import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';

export type TesterFeedbackRow = {
  id: string;
  visitor_id: string | null;
  user_id: string | null;
  email: string | null;
  segment: string | null;
  world_slug: string | null;
  mission_slug: string | null;
  confused: string | null;
  liked: string | null;
  build_next: string | null;
  created_at: string;
};

export async function insertTesterFeedback(input: {
  visitor_id?: string;
  user_id?: string;
  email?: string;
  segment?: string;
  world_slug?: string;
  mission_slug?: string;
  confused?: string;
  liked?: string;
  build_next?: string;
}): Promise<{ ok: boolean; id?: string; error?: string }> {
  if (!isSupabaseConfigured()) return { ok: false, error: 'Database not configured' };
  const client = createServiceClient();
  if (!client) return { ok: false, error: 'Database not configured' };

  const { data, error } = await client
    .from('tester_feedback')
    .insert({
      visitor_id: input.visitor_id ?? null,
      user_id: input.user_id ?? null,
      email: input.email?.toLowerCase() ?? null,
      segment: input.segment ?? null,
      world_slug: input.world_slug ?? null,
      mission_slug: input.mission_slug ?? null,
      confused: input.confused?.trim() || null,
      liked: input.liked?.trim() || null,
      build_next: input.build_next?.trim() || null,
    })
    .select('id')
    .single();

  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data.id };
}

export async function listTesterFeedback(limit = 100): Promise<TesterFeedbackRow[]> {
  if (!isSupabaseConfigured()) return [];
  const client = createServiceClient();
  if (!client) return [];

  const { data, error } = await client
    .from('tester_feedback')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data as TesterFeedbackRow[];
}

export async function getTesterFeedbackStats() {
  const rows = await listTesterFeedback(500);
  const by_world: Record<string, number> = {};
  const by_segment: Record<string, number> = {};
  for (const row of rows) {
    const w = row.world_slug ?? 'general';
    by_world[w] = (by_world[w] ?? 0) + 1;
    const s = row.segment ?? 'unknown';
    by_segment[s] = (by_segment[s] ?? 0) + 1;
  }
  return { total: rows.length, by_world, by_segment, recent: rows.slice(0, 20) };
}
