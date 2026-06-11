import { createServiceClient } from './client';
import type { BetaWaitlistEntry } from './beta-waitlist';

export type BetaSegment = 'student' | 'parent' | 'adult_learner' | 'educator' | 'hobbyist';

export type BetaWaitlistStatus = 'pending' | 'approved' | 'invited' | 'joined' | 'active' | 'declined';

export type BetaInviteEntry = BetaWaitlistEntry & {
  assigned_segment: BetaSegment | null;
  starting_world_slug: string | null;
  invite_code: string | null;
  invited_at: string | null;
  joined_at: string | null;
  active_at: string | null;
  operator_notes: string | null;
};

function randomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export async function listBetaWaitlist(): Promise<BetaInviteEntry[]> {
  const db = createServiceClient();
  if (!db) return [];

  const { data, error } = await db.from('beta_waitlist').select('*').order('created_at', { ascending: false });
  if (error || !data) return [];
  return data as BetaInviteEntry[];
}

export async function getBetaInviteByCode(code: string): Promise<BetaInviteEntry | null> {
  const db = createServiceClient();
  if (!db) return null;

  const { data, error } = await db.from('beta_waitlist').select('*').eq('invite_code', code.toUpperCase()).maybeSingle();
  if (error || !data) return null;
  return data as BetaInviteEntry;
}

export async function approveBetaTester(input: {
  id: string;
  assigned_segment?: BetaSegment;
  starting_world_slug: string;
  operator_notes?: string;
  send_invite?: boolean;
}): Promise<{ ok: true; entry: BetaInviteEntry } | { ok: false; error: string }> {
  const db = createServiceClient();
  if (!db) return { ok: false, error: 'Database not configured' };

  const invite_code = randomCode();
  const now = new Date().toISOString();

  const { data, error } = await db
    .from('beta_waitlist')
    .update({
      status: input.send_invite !== false ? 'invited' : 'approved',
      assigned_segment: input.assigned_segment ?? null,
      starting_world_slug: input.starting_world_slug,
      invite_code,
      invited_at: input.send_invite !== false ? now : null,
      operator_notes: input.operator_notes ?? null,
    })
    .eq('id', input.id)
    .select('*')
    .single();

  if (error) return { ok: false, error: error.message };
  return { ok: true, entry: data as BetaInviteEntry };
}

export async function declineBetaTester(id: string): Promise<{ ok: boolean; error?: string }> {
  const db = createServiceClient();
  if (!db) return { ok: false, error: 'Database not configured' };

  const { error } = await db.from('beta_waitlist').update({ status: 'declined' }).eq('id', id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function markBetaTesterActive(email: string): Promise<void> {
  const db = createServiceClient();
  if (!db) return;

  await db
    .from('beta_waitlist')
    .update({ status: 'active', active_at: new Date().toISOString() })
    .eq('email', email.toLowerCase())
    .in('status', ['joined', 'invited']);
}

export type InviteOpsStats = {
  total: number;
  pending: number;
  approved: number;
  invited: number;
  joined: number;
  active: number;
  declined: number;
  by_cohort: Record<string, { invited: number; joined: number; active: number; target: number }>;
};

export async function getInviteOpsStats(cohortTargets: Record<string, number>): Promise<InviteOpsStats> {
  const rows = await listBetaWaitlist();
  const stats: InviteOpsStats = {
    total: rows.length,
    pending: 0,
    approved: 0,
    invited: 0,
    joined: 0,
    active: 0,
    declined: 0,
    by_cohort: {},
  };

  for (const [cohort, target] of Object.entries(cohortTargets)) {
    stats.by_cohort[cohort] = { invited: 0, joined: 0, active: 0, target };
  }

  for (const row of rows) {
    const s = row.status as BetaWaitlistStatus;
    if (s === 'pending') stats.pending++;
    else if (s === 'approved') stats.approved++;
    else if (s === 'invited') stats.invited++;
    else if (s === 'joined') stats.joined++;
    else if (s === 'active') stats.active++;
    else if (s === 'declined') stats.declined++;

    const cohort = row.assigned_segment ?? row.segment;
    if (!stats.by_cohort[cohort]) {
      stats.by_cohort[cohort] = { invited: 0, joined: 0, active: 0, target: cohortTargets[cohort] ?? 0 };
    }
    if (['invited', 'joined', 'active'].includes(s)) stats.by_cohort[cohort].invited++;
    if (['joined', 'active'].includes(s)) stats.by_cohort[cohort].joined++;
    if (s === 'active') stats.by_cohort[cohort].active++;
  }

  return stats;
}
