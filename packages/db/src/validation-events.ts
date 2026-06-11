import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';

export type ValidationEventType =
  | 'visitor_landed'
  | 'assessment_started'
  | 'assessment_completed'
  | 'path_started'
  | 'project_started'
  | 'session_visit'
  | 'explore_viewed'
  | 'path_clicked'
  | 'interest_submitted'
  | 'account_created'
  | 'trial_started'
  | 'paid'
  | 'beta_joined'
  | 'pricing_viewed'
  | 'pricing_clicked'
  | 'sign_in_started'
  | 'sign_up_started'
  | 'mission_started'
  | 'mission_completed'
  | 'mission_step_viewed'
  | 'return_tomorrow'
  | 'return_this_week'
  | 'portfolio_created'
  | 'community_joined'
  | 'paid_conversion'
  | 'challenge_submitted'
  | 'showcase_posted'
  | 'peer_feedback_given'
  | 'community_feed_viewed'
  | 'upgrade_initiated'
  | 'upgrade_completed'
  | 'checkout_cancelled'
  | 'checkout_blocked_signin'
  | 'subscription_cancelled'
  | 'discussion_posted';

export type ValidationCategory = 'acquisition' | 'activation' | 'retention' | 'conversion';

export type ValidationEventInput = {
  visitor_id: string;
  event_type: ValidationEventType;
  category: ValidationCategory;
  landing_page?: string;
  source?: string;
  path_slug?: string;
  metadata?: Record<string, unknown>;
};

export type ValidationEventRow = ValidationEventInput & {
  id: string;
  created_at: string;
};

export type ValidationDashboardMetrics = {
  stranger_goal: number;
  acquisition: {
    visitors: number;
    by_landing_page: Record<string, number>;
    by_source: Record<string, number>;
  };
  activation: {
    assessment_started: number;
    assessment_completed: number;
    path_started: number;
    project_started: number;
    explore_viewed: number;
    path_clicked: number;
    completion_rate: number;
  };
  retention: {
    returned_next_day: number;
    returned_this_week: number;
    unique_visitors: number;
  };
  conversion: {
    interest_submitted: number;
    account_created: number;
    trial_started: number;
    paid: number;
  };
  pass_016_exit: {
    strangers_with_full_funnel: number;
    strangers_returned: number;
    criteria_met: boolean;
    note: string;
  };
  recent_events: ValidationEventRow[];
};

const EVENT_CATEGORY: Record<ValidationEventType, ValidationCategory> = {
  visitor_landed: 'acquisition',
  session_visit: 'acquisition',
  explore_viewed: 'acquisition',
  assessment_started: 'activation',
  assessment_completed: 'activation',
  path_started: 'activation',
  project_started: 'activation',
  path_clicked: 'activation',
  interest_submitted: 'conversion',
  account_created: 'conversion',
  trial_started: 'conversion',
  paid: 'conversion',
  beta_joined: 'conversion',
  pricing_viewed: 'acquisition',
  pricing_clicked: 'conversion',
  sign_in_started: 'activation',
  sign_up_started: 'conversion',
  mission_started: 'activation',
  mission_completed: 'activation',
  mission_step_viewed: 'activation',
  return_tomorrow: 'retention',
  return_this_week: 'retention',
  portfolio_created: 'activation',
  community_joined: 'retention',
  paid_conversion: 'conversion',
  challenge_submitted: 'activation',
  showcase_posted: 'activation',
  peer_feedback_given: 'retention',
  community_feed_viewed: 'acquisition',
  upgrade_initiated: 'conversion',
  upgrade_completed: 'conversion',
  checkout_cancelled: 'conversion',
  checkout_blocked_signin: 'conversion',
  subscription_cancelled: 'conversion',
  discussion_posted: 'retention',
};

export function categoryForEvent(type: ValidationEventType): ValidationCategory {
  return EVENT_CATEGORY[type];
}

export async function insertValidationEvent(input: ValidationEventInput): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  const client = createServiceClient();
  if (!client) return false;

  const { error } = await client.from('validation_events').insert({
    visitor_id: input.visitor_id,
    event_type: input.event_type,
    category: input.category,
    landing_page: input.landing_page ?? null,
    source: input.source ?? null,
    path_slug: input.path_slug ?? null,
    metadata: input.metadata ?? {},
  });

  return !error;
}

function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

function computeRetention(rows: { visitor_id: string; created_at: string }[]) {
  const byVisitor = new Map<string, Set<string>>();
  for (const row of rows) {
    if (!byVisitor.has(row.visitor_id)) byVisitor.set(row.visitor_id, new Set());
    byVisitor.get(row.visitor_id)!.add(dayKey(row.created_at));
  }

  let returnedNextDay = 0;
  let returnedThisWeek = 0;

  for (const days of byVisitor.values()) {
    const sorted = Array.from(days).sort();
    if (sorted.length >= 2) returnedThisWeek += 1;
    for (let i = 0; i < sorted.length - 1; i++) {
      const a = new Date(sorted[i]!);
      const b = new Date(sorted[i + 1]!);
      const diff = (b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24);
      if (diff >= 1 && diff <= 2) {
        returnedNextDay += 1;
        break;
      }
    }
  }

  return { returnedNextDay, returnedThisWeek, uniqueVisitors: byVisitor.size };
}

export async function getValidationDashboardMetrics(): Promise<ValidationDashboardMetrics | null> {
  if (!isSupabaseConfigured()) return null;
  const client = createServiceClient();
  if (!client) return null;

  const { data: events, error } = await client
    .from('validation_events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5000);

  if (error || !events) return null;

  const rows = events as ValidationEventRow[];
  const visitRows = rows.filter(
    (e) => e.event_type === 'visitor_landed' || e.event_type === 'session_visit'
  );

  const visitors = new Set(
    rows.filter((e) => e.event_type === 'visitor_landed').map((e) => e.visitor_id)
  );

  const byLanding: Record<string, number> = {};
  const bySource: Record<string, number> = {};
  for (const e of rows.filter((r) => r.event_type === 'visitor_landed')) {
    const page = e.landing_page || 'unknown';
    byLanding[page] = (byLanding[page] ?? 0) + 1;
    const src = e.source || 'direct';
    bySource[src] = (bySource[src] ?? 0) + 1;
  }

  const assessmentStarted = rows.filter((e) => e.event_type === 'assessment_started').length;
  const assessmentCompleted = rows.filter((e) => e.event_type === 'assessment_completed').length;
  const pathStarted = rows.filter((e) => e.event_type === 'path_started').length;
  const projectStarted = rows.filter((e) => e.event_type === 'project_started').length;
  const exploreViewed = rows.filter((e) => e.event_type === 'explore_viewed').length;
  const pathClicked = rows.filter((e) => e.event_type === 'path_clicked').length;
  const interestSubmitted = rows.filter((e) => e.event_type === 'interest_submitted').length;

  const retention = computeRetention(
    visitRows.map((e) => ({ visitor_id: e.visitor_id, created_at: e.created_at }))
  );

  const funnelVisitors = new Set<string>();
  const returnedVisitors = new Set<string>();
  for (const vid of visitors) {
    const hasPath = rows.some((e) => e.visitor_id === vid && e.event_type === 'path_started');
    const hasProject = rows.some((e) => e.visitor_id === vid && e.event_type === 'project_started');
    if (hasPath || hasProject) funnelVisitors.add(vid);
    const days = visitRows.filter((e) => e.visitor_id === vid).map((e) => dayKey(e.created_at));
    if (new Set(days).size >= 2) returnedVisitors.add(vid);
  }

  const strangersReturned = returnedVisitors.size;
  const strangersWithFunnel = funnelVisitors.size;
  const criteriaMet = strangersReturned >= 1 && strangersWithFunnel >= 1;

  return {
    stranger_goal: 0,
    acquisition: {
      visitors: visitors.size,
      by_landing_page: byLanding,
      by_source: bySource,
    },
    activation: {
      assessment_started: assessmentStarted,
      assessment_completed: assessmentCompleted,
      path_started: pathStarted,
      project_started: projectStarted,
      explore_viewed: exploreViewed,
      path_clicked: pathClicked,
      completion_rate:
        assessmentStarted > 0 ? Math.round((assessmentCompleted / assessmentStarted) * 100) : 0,
    },
    retention: {
      returned_next_day: retention.returnedNextDay,
      returned_this_week: retention.returnedThisWeek,
      unique_visitors: retention.uniqueVisitors,
    },
    conversion: {
      interest_submitted: interestSubmitted,
      account_created: rows.filter((e) => e.event_type === 'account_created').length,
      trial_started: rows.filter((e) => e.event_type === 'trial_started').length,
      paid: rows.filter((e) => e.event_type === 'paid').length,
    },
    pass_016_exit: {
      strangers_with_full_funnel: strangersWithFunnel,
      strangers_returned: strangersReturned,
      criteria_met: criteriaMet,
      note: 'Private build mode — funnel metrics for internal observation. Public beta gate at PASS-022.',
    },
    recent_events: rows.slice(0, 25),
  };
}
