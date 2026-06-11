import { createServiceClient } from './client';

export type MissionCompletionRow = {
  id: string;
  user_id: string;
  world_slug: string;
  mission_slug: string;
  mission_title: string;
  portfolio_key: string;
  reflection: string | null;
  evidence_note: string | null;
  completed_at: string;
};

export async function upsertMissionCompletion(input: {
  user_id: string;
  world_slug: string;
  mission_slug: string;
  mission_title: string;
  portfolio_key: string;
  reflection?: string;
  evidence_note?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const db = createServiceClient();
  if (!db) return { ok: false, error: 'Database not configured' };

  const { error } = await db.from('user_mission_completions').upsert(
    {
      user_id: input.user_id,
      world_slug: input.world_slug,
      mission_slug: input.mission_slug,
      mission_title: input.mission_title,
      portfolio_key: input.portfolio_key,
      reflection: input.reflection ?? null,
      evidence_note: input.evidence_note ?? null,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,world_slug,mission_slug' },
  );

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function getMissionCompletionsForUser(userId: string): Promise<MissionCompletionRow[]> {
  const db = createServiceClient();
  if (!db) return [];

  const { data, error } = await db
    .from('user_mission_completions')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false });

  if (error || !data) return [];
  return data as MissionCompletionRow[];
}

export async function getMissionCompletionStats() {
  const db = createServiceClient();
  if (!db) return { total: 0, by_world: {} as Record<string, number> };

  const { data, error } = await db.from('user_mission_completions').select('world_slug');

  if (error || !data) return { total: 0, by_world: {} };

  const by_world: Record<string, number> = {};
  for (const row of data) {
    by_world[row.world_slug] = (by_world[row.world_slug] ?? 0) + 1;
  }
  return { total: data.length, by_world };
}
