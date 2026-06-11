import { createServiceClient } from './client';

export type BetaSegment = 'student' | 'parent' | 'adult_learner' | 'educator' | 'hobbyist';

export type BetaWaitlistEntry = {
  id: string;
  email: string;
  segment: BetaSegment;
  interested_worlds: string[];
  visitor_id: string | null;
  source: string | null;
  status: string;
  created_at: string;
};

export async function insertBetaWaitlist(input: {
  email: string;
  segment: BetaSegment;
  interested_worlds: string[];
  visitor_id?: string;
  source?: string;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const db = createServiceClient();
  if (!db) return { ok: false, error: 'Database not configured' };

  const { data, error } = await db
    .from('beta_waitlist')
    .upsert(
      {
        email: input.email.toLowerCase().trim(),
        segment: input.segment,
        interested_worlds: input.interested_worlds,
        visitor_id: input.visitor_id ?? null,
        source: input.source ?? 'beta_page',
        status: 'pending',
      },
      { onConflict: 'email' },
    )
    .select('id')
    .single();

  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data.id };
}

export async function getBetaWaitlistStats() {
  const db = createServiceClient();
  if (!db) {
    return {
      total: 0,
      by_segment: {} as Record<string, number>,
      by_world: {} as Record<string, number>,
      recent: [] as BetaWaitlistEntry[],
    };
  }

  const { data, error } = await db
    .from('beta_waitlist')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500);

  if (error || !data) {
    return { total: 0, by_segment: {}, by_world: {}, recent: [] };
  }

  const by_segment: Record<string, number> = {};
  const by_world: Record<string, number> = {};
  for (const row of data) {
    by_segment[row.segment] = (by_segment[row.segment] ?? 0) + 1;
    for (const w of row.interested_worlds ?? []) {
      by_world[w] = (by_world[w] ?? 0) + 1;
    }
  }

  return {
    total: data.length,
    by_segment,
    by_world,
    recent: data as BetaWaitlistEntry[],
  };
}
