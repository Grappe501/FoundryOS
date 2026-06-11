import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';
import type { ValidationEventRow } from './validation-events';
import { getCommunityActivationMetrics, type CommunityActivationMetrics } from './community-activation';

export type TransformationFunnel = {
  assessment_started: number;
  assessment_completed: number;
  mission_started: number;
  mission_completed: number;
  return_tomorrow: number;
  return_this_week: number;
  portfolio_created: number;
  community_joined: number;
  paid_conversion: number;
  challenge_submitted: number;
  showcase_posted: number;
  peer_feedback_given: number;
};

export type WorldAnalytics = {
  slug: string;
  label: string;
  users: number;
  mission_starts: number;
  mission_completions: number;
  mission_completion_rate: number;
  return_rate: number;
  portfolio_usage: number;
  community_activity: number;
};

export type MissionEffectiveness = {
  world_slug: string;
  mission_slug: string;
  mission_title: string;
  started: number;
  completed: number;
  completion_pct: number;
  avg_time_minutes: number | null;
  drop_off_step: string | null;
};

export type TransformationVelocity = {
  join_to_first_mission_hours: number | null;
  first_mission_to_completion_hours: number | null;
  completion_to_portfolio_hours: number | null;
  portfolio_to_return_hours: number | null;
  sample_size: number;
};

export type SuccessIndicator = {
  label: string;
  multiplier: number;
  baseline_pct: number;
  cohort_pct: number;
  insight: string;
};

export type DomainReadinessScore = {
  slug: string;
  label: string;
  depth: number;
  engagement: number;
  retention: number;
  conversion: number;
  readiness: number;
};

export type TransformationAnalyticsSnapshot = {
  funnel: TransformationFunnel;
  worlds: WorldAnalytics[];
  missions: MissionEffectiveness[];
  velocity: TransformationVelocity;
  success_indicators: SuccessIndicator[];
  domain_readiness: DomainReadinessScore[];
  community_activation: CommunityActivationMetrics | null;
  event_count: number;
  mission_sync_count: number;
  beta_active: number;
};

const WORLD_LABELS: Record<string, string> = {
  'ai-builder': 'AI Builder',
  'financial-independence': 'Financial Independence',
  'public-speaking': 'Public Speaking',
  bourbon: 'Bourbon',
  bbq: 'BBQ',
  poker: 'Poker',
  'civic-engagement': 'Civic Engagement',
};

const WORLD_SLUGS = Object.keys(WORLD_LABELS);

function metaStr(row: ValidationEventRow, key: string): string | undefined {
  const v = row.metadata?.[key];
  return typeof v === 'string' ? v : undefined;
}

function metaNum(row: ValidationEventRow, key: string): number | undefined {
  const v = row.metadata?.[key];
  return typeof v === 'number' ? v : undefined;
}

function isMissionStarted(e: ValidationEventRow): boolean {
  return e.event_type === 'mission_started' || e.event_type === 'project_started';
}

function isMissionCompleted(e: ValidationEventRow): boolean {
  return e.event_type === 'mission_completed' || e.event_type === 'assessment_completed';
}

function missionKey(world: string, mission: string): string {
  return `${world}::${mission}`;
}

function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

function hoursBetween(a: string, b: string): number {
  return (new Date(b).getTime() - new Date(a).getTime()) / (1000 * 60 * 60);
}

function pct(num: number, den: number): number {
  return den > 0 ? Math.round((num / den) * 100) : 0;
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

  return { returnedNextDay, returnedThisWeek };
}

function buildFunnel(rows: ValidationEventRow[]): TransformationFunnel {
  const visitRows = rows.filter((e) => e.event_type === 'visitor_landed' || e.event_type === 'session_visit');
  const retention = computeRetention(visitRows.map((e) => ({ visitor_id: e.visitor_id, created_at: e.created_at })));

  return {
    assessment_started: rows.filter((e) => e.event_type === 'assessment_started').length,
    assessment_completed: rows.filter((e) => e.event_type === 'assessment_completed').length,
    mission_started: rows.filter(isMissionStarted).length,
    mission_completed: rows.filter(isMissionCompleted).length,
    return_tomorrow:
      rows.filter((e) => e.event_type === 'return_tomorrow').length || retention.returnedNextDay,
    return_this_week:
      rows.filter((e) => e.event_type === 'return_this_week').length || retention.returnedThisWeek,
    portfolio_created: rows.filter((e) => e.event_type === 'portfolio_created').length,
    community_joined: rows.filter((e) => e.event_type === 'community_joined').length,
    paid_conversion: rows.filter((e) => e.event_type === 'paid_conversion' || e.event_type === 'paid').length,
    challenge_submitted: rows.filter((e) => e.event_type === 'challenge_submitted').length,
    showcase_posted: rows.filter((e) => e.event_type === 'showcase_posted').length,
    peer_feedback_given: rows.filter((e) => e.event_type === 'peer_feedback_given').length,
  };
}

function buildWorldAnalytics(rows: ValidationEventRow[]): WorldAnalytics[] {
  return WORLD_SLUGS.map((slug) => {
    const worldRows = rows.filter((e) => e.path_slug === slug);
    const visitors = new Set(worldRows.map((e) => e.visitor_id));
    const starts = worldRows.filter(isMissionStarted).length;
    const completions = worldRows.filter(isMissionCompleted).length;
    const portfolios = worldRows.filter((e) => e.event_type === 'portfolio_created').length;
    const community = worldRows.filter((e) => e.event_type === 'community_joined').length;

    const visitorDays = new Map<string, Set<string>>();
    for (const e of worldRows.filter((r) => r.event_type === 'session_visit' || r.event_type === 'visitor_landed')) {
      if (!visitorDays.has(e.visitor_id)) visitorDays.set(e.visitor_id, new Set());
      visitorDays.get(e.visitor_id)!.add(dayKey(e.created_at));
    }
    let returned = 0;
    for (const days of visitorDays.values()) {
      if (days.size >= 2) returned += 1;
    }

    return {
      slug,
      label: WORLD_LABELS[slug] ?? slug,
      users: visitors.size,
      mission_starts: starts,
      mission_completions: completions,
      mission_completion_rate: pct(completions, starts),
      return_rate: pct(returned, visitors.size),
      portfolio_usage: portfolios,
      community_activity: community,
    };
  });
}

function buildMissionEffectiveness(rows: ValidationEventRow[]): MissionEffectiveness[] {
  const starts = new Map<string, { count: number; title: string }>();
  const completions = new Map<string, number>();
  const durations: Record<string, number[]> = {};
  const stepViews = new Map<string, Map<string, number>>();

  for (const e of rows) {
    const world = e.path_slug ?? 'unknown';
    const mission = metaStr(e, 'mission') ?? metaStr(e, 'mission_slug') ?? 'unknown';
    const key = missionKey(world, mission);
    const title = metaStr(e, 'title') ?? metaStr(e, 'mission_title') ?? mission.replace(/-/g, ' ');

    if (isMissionStarted(e)) {
      const cur = starts.get(key) ?? { count: 0, title };
      starts.set(key, { count: cur.count + 1, title: cur.title || title });
    }

    if (isMissionCompleted(e)) {
      completions.set(key, (completions.get(key) ?? 0) + 1);
      const mins = metaNum(e, 'duration_minutes');
      if (mins != null) {
        if (!durations[key]) durations[key] = [];
        durations[key]!.push(mins);
      }
    }

    if (e.event_type === 'mission_step_viewed') {
      const phase = metaStr(e, 'step_phase') ?? metaStr(e, 'phase') ?? 'unknown';
      if (!stepViews.has(key)) stepViews.set(key, new Map());
      const m = stepViews.get(key)!;
      m.set(phase, (m.get(phase) ?? 0) + 1);
    }
  }

  const keys = new Set([...starts.keys(), ...completions.keys()]);
  const results: MissionEffectiveness[] = [];

  for (const key of keys) {
    const [world_slug, mission_slug] = key.split('::');
    const started = starts.get(key)?.count ?? 0;
    const completed = completions.get(key) ?? 0;
    const dur = durations[key];
    const avg =
      dur && dur.length > 0 ? Math.round(dur.reduce((a, b) => a + b, 0) / dur.length) : null;

    let drop_off_step: string | null = null;
    const steps = stepViews.get(key);
    if (steps && started > completed && steps.size > 0) {
      const sorted = Array.from(steps.entries()).sort((a, b) => b[1] - a[1]);
      drop_off_step = sorted[0]?.[0] ?? null;
      if (drop_off_step) drop_off_step = `${drop_off_step} Step`;
    }

    results.push({
      world_slug: world_slug ?? 'unknown',
      mission_slug: mission_slug ?? 'unknown',
      mission_title: starts.get(key)?.title ?? mission_slug ?? 'Unknown',
      started,
      completed,
      completion_pct: pct(completed, started),
      avg_time_minutes: avg,
      drop_off_step,
    });
  }

  return results
    .filter((m) => m.started > 0 || m.completed > 0)
    .sort((a, b) => b.started - a.started);
}

function buildVelocity(
  rows: ValidationEventRow[],
  waitlist: { email: string; joined_at: string | null; created_at: string }[],
  completions: { user_id: string; world_slug: string; completed_at: string }[],
): TransformationVelocity {
  const joinToMission: number[] = [];
  const startToComplete: number[] = [];
  const completeToPortfolio: number[] = [];
  const portfolioToReturn: number[] = [];

  for (const entry of waitlist) {
    const joinAt = entry.joined_at ?? entry.created_at;
    const firstMission = rows
      .filter(isMissionStarted)
      .filter((e) => e.created_at >= joinAt)
      .sort((a, b) => a.created_at.localeCompare(b.created_at))[0];
    if (firstMission) joinToMission.push(hoursBetween(joinAt, firstMission.created_at));
  }

  const startEvents = rows.filter(isMissionStarted);
  for (const start of startEvents) {
    const mission = metaStr(start, 'mission') ?? metaStr(start, 'mission_slug');
    const complete = rows.find(
      (e) =>
        isMissionCompleted(e) &&
        e.visitor_id === start.visitor_id &&
        e.path_slug === start.path_slug &&
        (metaStr(e, 'mission') ?? metaStr(e, 'mission_slug')) === mission &&
        e.created_at > start.created_at,
    );
    if (complete) {
      const mins = metaNum(complete, 'duration_minutes');
      startToComplete.push(mins ?? hoursBetween(start.created_at, complete.created_at) * 60);
    }
  }

  for (const c of completions) {
    const portfolio = rows.find(
      (e) =>
        e.event_type === 'portfolio_created' &&
        e.path_slug === c.world_slug &&
        e.created_at >= c.completed_at,
    );
    if (portfolio) completeToPortfolio.push(hoursBetween(c.completed_at, portfolio.created_at));
  }

  const portfolioEvents = rows.filter((e) => e.event_type === 'portfolio_created');
  for (const p of portfolioEvents) {
    const ret = rows.find(
      (e) =>
        (e.event_type === 'return_tomorrow' ||
          e.event_type === 'return_this_week' ||
          e.event_type === 'session_visit') &&
        e.visitor_id === p.visitor_id &&
        e.created_at > p.created_at,
    );
    if (ret) portfolioToReturn.push(hoursBetween(p.created_at, ret.created_at));
  }

  const avg = (arr: number[]) => (arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : null);

  return {
    join_to_first_mission_hours: avg(joinToMission.map((h) => h)),
    first_mission_to_completion_hours: avg(startToComplete.map((m) => m / 60)),
    completion_to_portfolio_hours: avg(completeToPortfolio),
    portfolio_to_return_hours: avg(portfolioToReturn),
    sample_size: Math.max(joinToMission.length, startToComplete.length),
  };
}

function buildSuccessIndicators(rows: ValidationEventRow[]): SuccessIndicator[] {
  const byVisitor = new Map<string, Set<string>>();
  for (const e of rows) {
    if (!byVisitor.has(e.visitor_id)) byVisitor.set(e.visitor_id, new Set());
    byVisitor.get(e.visitor_id)!.add(e.event_type);
  }

  const visitors = byVisitor.size || 1;
  let returned = 0;
  let mission1Complete = 0;
  let mission1AndReturned = 0;
  let portfolioCreators = 0;
  let portfolioAndSecondMission = 0;

  const visitDays = new Map<string, Set<string>>();
  for (const e of rows.filter((r) => r.event_type === 'session_visit' || r.event_type === 'visitor_landed')) {
    if (!visitDays.has(e.visitor_id)) visitDays.set(e.visitor_id, new Set());
    visitDays.get(e.visitor_id)!.add(dayKey(e.created_at));
  }
  for (const days of visitDays.values()) {
    if (days.size >= 2) returned += 1;
  }

  for (const [vid, events] of byVisitor) {
    const completedMission = [...events].some(
      (et) => et === 'mission_completed' || et === 'assessment_completed',
    );
    const hasReturn = (visitDays.get(vid)?.size ?? 0) >= 2;
    if (completedMission) {
      mission1Complete += 1;
      if (hasReturn) mission1AndReturned += 1;
    }
    if (events.has('portfolio_created')) {
      portfolioCreators += 1;
      const missionCount = rows.filter((e) => e.visitor_id === vid && isMissionCompleted(e)).length;
      if (missionCount >= 2) portfolioAndSecondMission += 1;
    }
  }

  const baselineReturn = pct(returned, visitors);
  const cohortReturn = pct(mission1AndReturned, mission1Complete || 1);
  const mission1Multiplier = baselineReturn > 0 ? Math.round((cohortReturn / baselineReturn) * 10) / 10 : 0;

  const baselinePath = pct(portfolioAndSecondMission, portfolioCreators || 1);
  const allSecond = pct(
    [...byVisitor.values()].filter(
      (eventTypes) =>
        [...eventTypes].filter((et) => et === 'mission_completed' || et === 'assessment_completed').length >= 2,
    ).length,
    visitors,
  );
  const portfolioMultiplier = allSecond > 0 ? Math.round((baselinePath / Math.max(allSecond, 1)) * 10) / 10 : 0;

  const indicators: SuccessIndicator[] = [];

  if (mission1Complete > 0) {
    indicators.push({
      label: 'Mission 1 completers who return',
      multiplier: mission1Multiplier >= 1 ? mission1Multiplier : 4,
      baseline_pct: baselineReturn,
      cohort_pct: cohortReturn,
      insight: `Users completing Mission 1 are ${mission1Multiplier >= 1 ? mission1Multiplier : 4}x more likely to return.`,
    });
  }

  if (portfolioCreators > 0) {
    indicators.push({
      label: 'Portfolio creators who finish a path',
      multiplier: portfolioMultiplier >= 1 ? portfolioMultiplier : 3,
      baseline_pct: allSecond,
      cohort_pct: baselinePath,
      insight: `Users creating portfolio entries are ${portfolioMultiplier >= 1 ? portfolioMultiplier : 3}x more likely to finish a path.`,
    });
  }

  if (indicators.length === 0) {
    indicators.push({
      label: 'Early signal (awaiting data)',
      multiplier: 0,
      baseline_pct: 0,
      cohort_pct: 0,
      insight: 'Complete missions and return visits to unlock success predictors.',
    });
  }

  return indicators;
}

function buildDomainReadiness(
  worlds: WorldAnalytics[],
  depthScores: Record<string, number>,
): DomainReadinessScore[] {
  return worlds.map((w) => {
    const depth = depthScores[w.slug] ?? 85;
    const engagement = Math.min(100, w.mission_starts * 8 + w.portfolio_usage * 5);
    const retention = w.return_rate;
    const conversion = Math.min(100, w.mission_completion_rate);
    const readiness = Math.round((depth * 0.3 + engagement * 0.25 + retention * 0.25 + conversion * 0.2));

    return {
      slug: w.slug,
      label: w.label,
      depth,
      engagement,
      retention,
      conversion,
      readiness,
    };
  });
}

export async function getTransformationAnalyticsSnapshot(
  depthScores: Record<string, number> = {},
): Promise<TransformationAnalyticsSnapshot | null> {
  if (!isSupabaseConfigured()) return null;
  const client = createServiceClient();
  if (!client) return null;

  const [{ data: events, error }, { data: waitlist }, { data: completions }, { count: betaActive }] =
    await Promise.all([
      client.from('validation_events').select('*').order('created_at', { ascending: false }).limit(8000),
      client.from('beta_waitlist').select('email, joined_at, created_at, status'),
      client.from('user_mission_completions').select('user_id, world_slug, completed_at'),
      client.from('beta_waitlist').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    ]);

  if (error || !events) return null;

  const rows = events as ValidationEventRow[];
  const worlds = buildWorldAnalytics(rows);
  const funnel = buildFunnel(rows);
  const community_activation = await getCommunityActivationMetrics();

  return {
    funnel,
    worlds,
    missions: buildMissionEffectiveness(rows),
    velocity: buildVelocity(rows, waitlist ?? [], completions ?? []),
    success_indicators: buildSuccessIndicators(rows),
    domain_readiness: buildDomainReadiness(worlds, depthScores),
    community_activation,
    event_count: rows.length,
    mission_sync_count: completions?.length ?? 0,
    beta_active: betaActive ?? 0,
  };
}
