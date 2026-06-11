import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';
import { categoryForEvent, insertValidationEvent, type ValidationEventRow } from './validation-events';

/** Shared attribution helpers — single source for all revenue dashboards */

export function normalizeTier(raw: unknown): string {
  if (typeof raw !== 'string') return 'unknown';
  const t = raw.toLowerCase();
  if (t.includes('build')) return 'build';
  if (t.includes('mastery')) return 'mastery';
  if (t.includes('explore')) return 'explore';
  return t;
}

export function resolveWorldSlug(e: ValidationEventRow): string | null {
  if (e.path_slug) return e.path_slug;
  const meta = e.metadata?.world_slug;
  if (typeof meta === 'string' && meta) return meta;
  const landing = e.landing_page ?? '';
  for (const world of KNOWN_WORLDS) {
    if (landing.includes(`/${world}`)) return world;
  }
  return null;
}

export function resolveMissionSlug(e: ValidationEventRow): string | null {
  const m = e.metadata?.mission ?? e.metadata?.mission_slug;
  return typeof m === 'string' && m ? m : null;
}

export function resolvePersona(e: ValidationEventRow): string | null {
  const p = e.metadata?.persona;
  return typeof p === 'string' ? p : null;
}

export const KNOWN_WORLDS = [
  'ai-builder',
  'financial-independence',
  'public-speaking',
  'bourbon',
  'bbq',
  'poker',
  'civic-engagement',
] as const;

export const REVENUE_EVENT_TYPES = [
  'pricing_viewed',
  'pricing_clicked',
  'upgrade_initiated',
  'upgrade_completed',
  'checkout_cancelled',
  'checkout_blocked_signin',
  'paid',
  'paid_conversion',
  'subscription_cancelled',
] as const;

export type RevenueFunnel = {
  pricing_viewed: number;
  pricing_clicked: number;
  upgrade_initiated: number;
  upgrade_completed: number;
  checkout_cancelled: number;
  checkout_blocked_signin: number;
  paid: number;
  unique_pricing_viewers: number;
  unique_upgrade_intent: number;
  view_to_click_rate: number;
  click_to_initiate_rate: number;
  initiate_to_paid_rate: number;
};

export type WorldRevenueMetrics = {
  world_slug: string;
  pricing_clicks: number;
  upgrade_initiated: number;
  upgrade_completed: number;
  mission_completions: number;
};

export type MissionRevenueMetrics = {
  world_slug: string;
  mission_slug: string;
  completions: number;
  upgrade_initiated: number;
  upgrade_completed: number;
  pricing_clicks: number;
};

export type CommunityUpgradeCorrelation = {
  community_joiners: number;
  joiners_with_upgrade_intent: number;
  upgrade_intent_rate_pct: number;
  by_world: { world_slug: string; joiners: number; upgrade_intent: number }[];
};

export type PersonaPaymentRecord = {
  persona: string;
  segment: string;
  world_slug: string;
  mission_slug: string | null;
  tier: string | null;
  paid: boolean;
  context: string | null;
};

export type RevenueValidationSnapshot = {
  funnel: RevenueFunnel;
  by_world: WorldRevenueMetrics[];
  by_mission: MissionRevenueMetrics[];
  by_tier_click: Record<string, number>;
  by_tier_initiated: Record<string, number>;
  by_tier_paid: Record<string, number>;
  community_correlation: CommunityUpgradeCorrelation;
  persona_payments: PersonaPaymentRecord[];
  recent_upgrade_events: ValidationEventRow[];
  event_count: number;
};

export type DashboardConsistencyCheck = {
  pricing_viewed: number;
  pricing_clicked: number;
  upgrade_initiated: number;
  upgrade_completed: number;
  paid_users_subscriptions: number;
  paid_event_count: number;
  aligned: boolean;
  notes: string[];
};

function countEvents(rows: ValidationEventRow[], type: string): number {
  return rows.filter((e) => e.event_type === type).length;
}

function uniqueVisitors(rows: ValidationEventRow[], type: string): number {
  return new Set(rows.filter((e) => e.event_type === type).map((e) => e.visitor_id)).size;
}

function buildFunnelFromRows(rows: ValidationEventRow[]): RevenueFunnel {
  const pricingViewed = countEvents(rows, 'pricing_viewed');
  const pricingClicked = countEvents(rows, 'pricing_clicked');
  const upgradeInitiated = countEvents(rows, 'upgrade_initiated');
  const upgradeCompleted = countEvents(rows, 'upgrade_completed');

  return {
    pricing_viewed: pricingViewed,
    pricing_clicked: pricingClicked,
    upgrade_initiated: upgradeInitiated,
    upgrade_completed: upgradeCompleted,
    checkout_cancelled: countEvents(rows, 'checkout_cancelled'),
    checkout_blocked_signin: countEvents(rows, 'checkout_blocked_signin'),
    paid: countEvents(rows, 'paid'),
    unique_pricing_viewers: uniqueVisitors(rows, 'pricing_viewed'),
    unique_upgrade_intent: uniqueVisitors(rows, 'upgrade_initiated'),
    view_to_click_rate: pricingViewed > 0 ? Math.round((pricingClicked / pricingViewed) * 100) : 0,
    click_to_initiate_rate: pricingClicked > 0 ? Math.round((upgradeInitiated / pricingClicked) * 100) : 0,
    initiate_to_paid_rate: upgradeInitiated > 0 ? Math.round((upgradeCompleted / upgradeInitiated) * 100) : 0,
  };
}

function buildCommunityCorrelation(rows: ValidationEventRow[]): CommunityUpgradeCorrelation {
  const joinersByVisitor = new Map<string, Set<string>>();
  const upgradeIntentVisitors = new Set(
    rows.filter((e) => e.event_type === 'upgrade_initiated').map((e) => e.visitor_id),
  );

  for (const e of rows.filter((r) => r.event_type === 'community_joined')) {
    const world = resolveWorldSlug(e);
    if (!world) continue;
    if (!joinersByVisitor.has(e.visitor_id)) joinersByVisitor.set(e.visitor_id, new Set());
    joinersByVisitor.get(e.visitor_id)!.add(world);
  }

  let joinersWithIntent = 0;
  for (const vid of joinersByVisitor.keys()) {
    if (upgradeIntentVisitors.has(vid)) joinersWithIntent++;
  }

  const byWorld = KNOWN_WORLDS.map((world_slug) => {
    let joiners = 0;
    let upgradeIntent = 0;
    for (const [vid, worlds] of joinersByVisitor) {
      if (worlds.has(world_slug)) {
        joiners++;
        if (upgradeIntentVisitors.has(vid)) upgradeIntent++;
      }
    }
    return { world_slug, joiners, upgrade_intent: upgradeIntent };
  }).filter((w) => w.joiners > 0);

  const totalJoiners = joinersByVisitor.size;
  return {
    community_joiners: totalJoiners,
    joiners_with_upgrade_intent: joinersWithIntent,
    upgrade_intent_rate_pct: totalJoiners > 0 ? Math.round((joinersWithIntent / totalJoiners) * 100) : 0,
    by_world: byWorld,
  };
}

function buildPersonaPayments(rows: ValidationEventRow[]): PersonaPaymentRecord[] {
  const personas = new Map<string, PersonaPaymentRecord>();

  for (const e of rows) {
    const persona = resolvePersona(e);
    if (!persona) continue;
    if (!personas.has(persona)) {
      personas.set(persona, {
        persona,
        segment: (e.metadata?.segment as string) ?? 'unknown',
        world_slug: resolveWorldSlug(e) ?? '',
        mission_slug: null,
        tier: null,
        paid: false,
        context: null,
      });
    }
    const rec = personas.get(persona)!;
    const world = resolveWorldSlug(e);
    if (world) rec.world_slug = world;
    const mission = resolveMissionSlug(e);
    if (mission) rec.mission_slug = mission;
    if (e.event_type === 'upgrade_initiated') {
      rec.tier = normalizeTier(e.metadata?.tier);
      rec.context = (e.metadata?.context as string) ?? null;
    }
    if (e.event_type === 'upgrade_completed' || e.event_type === 'paid') {
      rec.paid = true;
      rec.tier = normalizeTier(e.metadata?.tier);
    }
  }

  return Array.from(personas.values());
}

export async function fetchRevenueEvents(limit = 10000): Promise<ValidationEventRow[]> {
  if (!isSupabaseConfigured()) return [];
  const client = createServiceClient();
  if (!client) return [];
  const { data } = await client.from('validation_events').select('*').order('created_at', { ascending: false }).limit(limit);
  return (data ?? []) as ValidationEventRow[];
}

export function buildRevenueSnapshotFromEvents(rows: ValidationEventRow[]): RevenueValidationSnapshot {
  const byTierClick: Record<string, number> = {};
  const byTierInitiated: Record<string, number> = {};
  const byTierPaid: Record<string, number> = {};

  for (const e of rows) {
    if (e.event_type === 'pricing_clicked') {
      const t = normalizeTier(e.metadata?.tier);
      byTierClick[t] = (byTierClick[t] ?? 0) + 1;
    }
    if (e.event_type === 'upgrade_initiated') {
      const t = normalizeTier(e.metadata?.tier);
      byTierInitiated[t] = (byTierInitiated[t] ?? 0) + 1;
    }
    if (e.event_type === 'upgrade_completed' || e.event_type === 'paid') {
      const t = normalizeTier(e.metadata?.tier);
      byTierPaid[t] = (byTierPaid[t] ?? 0) + 1;
    }
  }

  const worldSet = new Set<string>(KNOWN_WORLDS);
  for (const e of rows) {
    const w = resolveWorldSlug(e);
    if (w) worldSet.add(w);
  }

  const byWorld: WorldRevenueMetrics[] = Array.from(worldSet).map((world_slug) => {
    const worldRows = rows.filter((e) => resolveWorldSlug(e) === world_slug);
    return {
      world_slug,
      pricing_clicks: worldRows.filter((e) => e.event_type === 'pricing_clicked').length,
      upgrade_initiated: worldRows.filter((e) => e.event_type === 'upgrade_initiated').length,
      upgrade_completed: worldRows.filter((e) => e.event_type === 'upgrade_completed').length,
      mission_completions: worldRows.filter((e) => e.event_type === 'mission_completed').length,
    };
  });

  const missionMap = new Map<string, MissionRevenueMetrics>();
  for (const e of rows) {
    const world = resolveWorldSlug(e);
    const mission = resolveMissionSlug(e);
    if (!world || !mission) continue;
    const key = `${world}:${mission}`;
    if (!missionMap.has(key)) {
      missionMap.set(key, {
        world_slug: world,
        mission_slug: mission,
        completions: 0,
        upgrade_initiated: 0,
        upgrade_completed: 0,
        pricing_clicks: 0,
      });
    }
    const entry = missionMap.get(key)!;
    if (e.event_type === 'mission_completed') entry.completions++;
    if (e.event_type === 'upgrade_initiated') entry.upgrade_initiated++;
    if (e.event_type === 'upgrade_completed') entry.upgrade_completed++;
    if (e.event_type === 'pricing_clicked') entry.pricing_clicks++;
  }

  const byMission = Array.from(missionMap.values())
    .filter((m) => m.completions > 0 || m.upgrade_initiated > 0 || m.pricing_clicks > 0)
    .sort((a, b) => b.upgrade_completed - a.upgrade_completed || b.upgrade_initiated - a.upgrade_initiated)
    .slice(0, 30);

  return {
    funnel: buildFunnelFromRows(rows),
    by_world: byWorld.sort((a, b) => b.upgrade_initiated - a.upgrade_initiated),
    by_mission: byMission,
    by_tier_click: byTierClick,
    by_tier_initiated: byTierInitiated,
    by_tier_paid: byTierPaid,
    community_correlation: buildCommunityCorrelation(rows),
    persona_payments: buildPersonaPayments(rows),
    recent_upgrade_events: rows
      .filter((e) =>
        [...REVENUE_EVENT_TYPES, 'community_joined', 'mission_completed'].includes(e.event_type as typeof REVENUE_EVENT_TYPES[number]),
      )
      .slice(0, 40),
    event_count: rows.length,
  };
}

export async function getRevenueValidationSnapshot(): Promise<RevenueValidationSnapshot | null> {
  const rows = await fetchRevenueEvents();
  if (!isSupabaseConfigured()) return null;
  return buildRevenueSnapshotFromEvents(rows);
}

export async function getDashboardConsistencyCheck(): Promise<DashboardConsistencyCheck | null> {
  const rows = await fetchRevenueEvents();
  if (!isSupabaseConfigured()) return null;

  const funnel = buildFunnelFromRows(rows);
  const { getSubscriptionStats } = await import('./subscriptions');
  const subs = await getSubscriptionStats();

  const notes: string[] = [];
  if (funnel.paid !== funnel.upgrade_completed && funnel.upgrade_completed > 0) {
    notes.push('paid events may exceed upgrade_completed when webhook fires multiple conversion events');
  }
  if (subs.paid_users !== funnel.upgrade_completed) {
    notes.push(`subscriptions (${subs.paid_users}) vs upgrade_completed events (${funnel.upgrade_completed}) — subscriptions are authoritative for MRR`);
  }

  const aligned =
    funnel.pricing_viewed >= 0 &&
    funnel.upgrade_initiated >= funnel.upgrade_completed;

  return {
    pricing_viewed: funnel.pricing_viewed,
    pricing_clicked: funnel.pricing_clicked,
    upgrade_initiated: funnel.upgrade_initiated,
    upgrade_completed: funnel.upgrade_completed,
    paid_users_subscriptions: subs.paid_users,
    paid_event_count: funnel.paid,
    aligned,
    notes,
  };
}

/** Re-export for business dashboard — same funnel numbers guaranteed */
export { buildFunnelFromRows as getRevenueFunnelCounts };

import { getBetaWaitlistStats } from './beta-waitlist';
import { getInviteOpsStats } from './beta-invites';
import { getSubscriptionStats } from './subscriptions';

export type BusinessDashboardSnapshot = {
  waitlist_total: number;
  waitlist_by_segment: Record<string, number>;
  invites_sent: number;
  joined: number;
  active_testers: number;
  pending: number;
  pricing_viewed: number;
  pricing_clicked: number;
  upgrade_initiated: number;
  upgrade_completed: number;
  checkout_cancelled: number;
  paid_users: number;
  mrr_usd: number;
  build_subscribers: number;
  mastery_subscribers: number;
  transformations_in_progress: number;
  monthly_active_transformations: number;
  upgrade_intent: number;
  by_cohort: Record<string, { invited: number; joined: number; active: number; target: number }>;
};

const COHORT_TARGETS: Record<string, number> = {
  student: 5,
  parent: 5,
  educator: 5,
  hobbyist: 5,
  adult_learner: 5,
};

export async function getBusinessDashboardSnapshot(): Promise<BusinessDashboardSnapshot | null> {
  if (!isSupabaseConfigured()) return null;

  const rows = await fetchRevenueEvents();
  const funnel = buildFunnelFromRows(rows);

  const [subscriptionStats, waitlistStats, inviteStats] = await Promise.all([
    getSubscriptionStats(),
    getBetaWaitlistStats(),
    getInviteOpsStats(COHORT_TARGETS),
  ]);

  const client = createServiceClient();
  if (!client) return null;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { count: matCount } = await client
    .from('validation_events')
    .select('visitor_id', { count: 'exact', head: true })
    .eq('event_type', 'mission_completed')
    .gte('created_at', thirtyDaysAgo.toISOString());

  const { data: activeVisitors } = await client
    .from('validation_events')
    .select('visitor_id')
    .in('event_type', ['mission_started', 'mission_completed', 'portfolio_created'])
    .gte('created_at', thirtyDaysAgo.toISOString());

  const transformationsInProgress = new Set((activeVisitors ?? []).map((v) => v.visitor_id)).size;

  return {
    waitlist_total: waitlistStats?.total ?? 0,
    waitlist_by_segment: waitlistStats?.by_segment ?? {},
    invites_sent: inviteStats.invited + inviteStats.joined + inviteStats.active,
    joined: inviteStats.joined + inviteStats.active,
    active_testers: inviteStats.active,
    pending: inviteStats.pending,
    pricing_viewed: funnel.pricing_viewed,
    pricing_clicked: funnel.pricing_clicked,
    upgrade_initiated: funnel.upgrade_initiated,
    upgrade_completed: funnel.upgrade_completed,
    checkout_cancelled: funnel.checkout_cancelled,
    paid_users: subscriptionStats.paid_users,
    mrr_usd: subscriptionStats.mrr_usd,
    build_subscribers: subscriptionStats.build_subscribers,
    mastery_subscribers: subscriptionStats.mastery_subscribers,
    transformations_in_progress: transformationsInProgress,
    monthly_active_transformations: matCount ?? 0,
    upgrade_intent: funnel.unique_upgrade_intent,
    by_cohort: inviteStats.by_cohort,
  };
}
