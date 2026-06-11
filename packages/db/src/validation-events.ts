import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';

export type ValidationEventType =
  | 'visitor_landed'
  | 'assessment_started'
  | 'assessment_completed'
  | 'path_started'
  | 'project_started'
  | 'session_visit'
  | 'account_created'
  | 'trial_started'
  | 'paid';

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
    completion_rate: number;
  };
  retention: {
    returned_next_day: number;
    returned_this_week: number;
    unique_visitors: number;
  };
  conversion: {
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
  assessment_started: 'activation',
  assessment_completed: 'activation',
  path_started: 'activation',
  project_started: 'activation',
  account_created: 'conversion',
  trial_started: 'conversion',
  paid: 'conversion',
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
    stranger_goal: 10,
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
      completion_rate:
        assessmentStarted > 0 ? Math.round((assessmentCompleted / assessmentStarted) * 100) : 0,
    },
    retention: {
      returned_next_day: retention.returnedNextDay,
      returned_this_week: retention.returnedThisWeek,
      unique_visitors: retention.uniqueVisitors,
    },
    conversion: {
      account_created: rows.filter((e) => e.event_type === 'account_created').length,
      trial_started: rows.filter((e) => e.event_type === 'trial_started').length,
      paid: rows.filter((e) => e.event_type === 'paid').length,
    },
    pass_016_exit: {
      strangers_with_full_funnel: strangersWithFunnel,
      strangers_returned: strangersReturned,
      criteria_met: criteriaMet,
      note: 'PASS-016 closes when ≥1 stranger starts a transformation AND returns without explanation.',
    },
    recent_events: rows.slice(0, 25),
  };
}
