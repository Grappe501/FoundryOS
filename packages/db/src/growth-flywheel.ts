/**
 * PASS-032 — Growth Flywheel Engine
 * Connects: Learning Engine → Marketing → World → Revenue → Insights (loop)
 */
import { isSupabaseConfigured } from './env';
import {
  fetchRevenueEvents,
  buildRevenueSnapshotFromEvents,
  resolveWorldSlug,
  resolveMissionSlug,
  KNOWN_WORLDS,
} from './revenue-analytics';
import type { ValidationEventRow } from './validation-events';

export const FLYWHEEL_LOOP =
  'traffic → users → missions → community → revenue → insights → better marketing';

export type ConversionInsight = {
  label: string;
  slug: string;
  world_slug?: string;
  metric: string;
  value: number;
  avg_value: number;
  multiplier: number;
  sample_size: number;
};

export type MarketingAssetRecommendation = {
  priority: number;
  world_slug: string;
  world_label: string;
  asset_type: 'seo' | 'youtube' | 'tiktok' | 'email' | 'lead_magnet' | 'parent' | 'educator';
  title: string;
  reason: string;
  suggested_channel: string;
};

export type SourceOutcomeAttribution = {
  source: string;
  visitors: number;
  mission_starts: number;
  community_joins: number;
  upgrade_intent: number;
  upgrade_completed: number;
  mission_start_rate_pct: number;
  paid_rate_pct: number;
};

export type RevenueEarner = {
  rank: number;
  entity_type: 'world' | 'mission' | 'community';
  slug: string;
  label: string;
  world_slug?: string;
  upgrade_completed: number;
  upgrade_intent: number;
  mission_completions: number;
  revenue_signal_score: number;
};

export type ProductBuildSignal = {
  priority: number;
  action: string;
  signal: string;
  based_on: string;
};

export type DomainExpansionScore = {
  slug: string;
  display_name: string;
  status: 'live' | 'candidate';
  scores: {
    traffic: number;
    conversion: number;
    retention: number;
    revenue: number;
    community_potential: number;
  };
  total_score: number;
  recommendation: string;
};

export type GrowthFlywheelSnapshot = {
  pass: 'PASS-033';
  generated_at: string;
  event_count: number;
  /** System 1 — Learning → Marketing */
  insight_to_marketing: {
    best_mission: ConversionInsight | null;
    best_world: ConversionInsight | null;
    best_segment: ConversionInsight | null;
    best_lead_magnet: ConversionInsight | null;
    recommendations: MarketingAssetRecommendation[];
  };
  /** System 2 — Marketing → World */
  marketing_to_world: {
    by_source: SourceOutcomeAttribution[];
    top_landing_pages: { page: string; mission_starts: number; community_joins: number }[];
  };
  /** System 3 — Revenue → Product */
  revenue_to_product: {
    top_earners: RevenueEarner[];
    build_next: ProductBuildSignal[];
    worlds_with_proven_retention: string[];
    worlds_with_proven_conversion: string[];
  };
  /** System 4 — Domain expansion */
  domain_expansion: DomainExpansionScore[];
};

const WORLD_LABELS: Record<string, string> = {
  'ai-builder': 'AI Builder',
  'financial-independence': 'Financial Independence',
  'public-speaking': 'Public Speaking',
  bourbon: 'Bourbon',
  bbq: 'BBQ',
  poker: 'Poker',
  chess: 'Chess',
  'civic-engagement': 'Civic Engagement',
};

/** Baselines aligned with apps/platform/lib/incoming-worlds.ts — do not add worlds ad hoc */
const EXPANSION_CANDIDATES: {
  slug: string;
  display_name: string;
  baseline: DomainExpansionScore['scores'];
  recommendation: string;
}[] = [
  {
    slug: 'career-change',
    display_name: 'Career Change',
    baseline: { traffic: 88, conversion: 90, retention: 85, revenue: 92, community_potential: 80 },
    recommendation: 'Life Leverage — parents and adult learners buy outcomes · rank #1 incoming',
  },
  {
    slug: 'grassroots-nonprofit',
    display_name: 'Grassroots & Nonprofits',
    baseline: { traffic: 76, conversion: 82, retention: 88, revenue: 74, community_potential: 92 },
    recommendation: '501(c)(3) vs (c)(4) education + campaign ops · rank #3 incoming',
  },
  {
    slug: 'master-gardener',
    display_name: 'Master Gardener',
    baseline: { traffic: 75, conversion: 76, retention: 90, revenue: 70, community_potential: 88 },
    recommendation: 'Seasonal projects + local chapters · rank #2 incoming',
  },
  {
    slug: 'homesteading',
    display_name: 'Homesteading',
    baseline: { traffic: 82, conversion: 78, retention: 95, revenue: 75, community_potential: 92 },
    recommendation: 'High retention wedge — project-heavy · rank #3 incoming',
  },
  {
    slug: 'campaign-management',
    display_name: 'Campaign Management',
    baseline: { traffic: 72, conversion: 74, retention: 82, revenue: 78, community_potential: 86 },
    recommendation: 'Civic career path · rank #4 incoming',
  },
  {
    slug: 'computer-science',
    display_name: 'Computer Science',
    baseline: { traffic: 78, conversion: 80, retention: 84, revenue: 76, community_potential: 72 },
    recommendation: 'Student pathway · rank #5 incoming',
  },
  {
    slug: 'chess',
    display_name: 'Chess',
    baseline: { traffic: 70, conversion: 72, retention: 88, revenue: 65, community_potential: 85 },
    recommendation: 'Skills Guild prototype in_build · rank #8 incoming — club/tournament/school channels',
  },
];

function pct(num: number, den: number): number {
  return den > 0 ? Math.round((num / den) * 100) : 0;
}

function avg(nums: number[]): number {
  return nums.length > 0 ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
}

function missionTitle(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function resolveSegment(e: ValidationEventRow): string | null {
  const s = e.metadata?.segment;
  return typeof s === 'string' && s ? s : null;
}

function resolveLeadMagnet(e: ValidationEventRow): string | null {
  const lm = e.metadata?.lead_magnet ?? e.metadata?.campaign;
  if (typeof lm === 'string' && lm) return lm;
  const src = e.source ?? '';
  if (src.includes('youtube')) return 'youtube';
  if (src.includes('tiktok')) return 'tiktok';
  if (src.includes('google') || src.includes('seo')) return 'seo';
  if (src.includes('email')) return 'email';
  return null;
}

function conversionRate(rows: ValidationEventRow[], filter: (e: ValidationEventRow) => boolean): number {
  const filtered = rows.filter(filter);
  const visitors = new Set(filtered.map((e) => e.visitor_id)).size;
  const paid = new Set(
    filtered.filter((e) => e.event_type === 'upgrade_completed' || e.event_type === 'paid').map((e) => e.visitor_id),
  ).size;
  const intent = new Set(filtered.filter((e) => e.event_type === 'upgrade_initiated').map((e) => e.visitor_id)).size;
  if (visitors === 0) return intent > 0 ? intent * 10 : 0;
  return (paid / visitors) * 100 + (intent / visitors) * 50;
}

function buildMissionInsights(rows: ValidationEventRow[]): ConversionInsight | null {
  const byMission = new Map<string, { world: string; rows: ValidationEventRow[] }>();
  for (const e of rows) {
    const world = resolveWorldSlug(e);
    const mission = resolveMissionSlug(e);
    if (!world || !mission) continue;
    const key = `${world}:${mission}`;
    if (!byMission.has(key)) byMission.set(key, { world, rows: [] });
    byMission.get(key)!.rows.push(e);
  }

  const rates: { key: string; world: string; mission: string; rate: number; n: number }[] = [];
  for (const [key, { world, rows: mRows }] of byMission) {
    const [, mission] = key.split(':');
    const starts = mRows.filter((e) => e.event_type === 'mission_started').length;
    if (starts < 1) continue;
    rates.push({
      key,
      world,
      mission: mission!,
      rate: conversionRate(mRows, () => true),
      n: starts,
    });
  }
  if (rates.length === 0) return null;

  const mean = avg(rates.map((r) => r.rate)) || 1;
  const best = rates.sort((a, b) => b.rate - a.rate)[0]!;
  return {
    label: missionTitle(best.mission),
    slug: best.mission,
    world_slug: best.world,
    metric: 'upgrade intent + paid per visitor',
    value: Math.round(best.rate * 10) / 10,
    avg_value: Math.round(mean * 10) / 10,
    multiplier: mean > 0 ? Math.round((best.rate / mean) * 10) / 10 : 1,
    sample_size: best.n,
  };
}

function buildWorldInsight(rows: ValidationEventRow[]): ConversionInsight | null {
  const rates = KNOWN_WORLDS.map((slug) => {
    const wRows = rows.filter((e) => resolveWorldSlug(e) === slug);
    const users = new Set(wRows.map((e) => e.visitor_id)).size;
    return {
      slug,
      rate: conversionRate(wRows, () => true),
      n: users,
    };
  }).filter((r) => r.n > 0);

  if (rates.length === 0) return null;
  const mean = avg(rates.map((r) => r.rate)) || 1;
  const best = rates.sort((a, b) => b.rate - a.rate)[0]!;
  return {
    label: WORLD_LABELS[best.slug] ?? best.slug,
    slug: best.slug,
    metric: 'upgrade intent + paid per visitor',
    value: Math.round(best.rate * 10) / 10,
    avg_value: Math.round(mean * 10) / 10,
    multiplier: mean > 0 ? Math.round((best.rate / mean) * 10) / 10 : 1,
    sample_size: best.n,
  };
}

function buildSegmentInsight(rows: ValidationEventRow[]): ConversionInsight | null {
  const segments = new Map<string, ValidationEventRow[]>();
  for (const e of rows) {
    const seg = resolveSegment(e);
    if (!seg) continue;
    if (!segments.has(seg)) segments.set(seg, []);
    segments.get(seg)!.push(e);
  }
  const rates = Array.from(segments.entries()).map(([slug, sRows]) => ({
    slug,
    rate: conversionRate(sRows, () => true),
    n: new Set(sRows.map((e) => e.visitor_id)).size,
  })).filter((r) => r.n > 0);

  if (rates.length === 0) return null;
  const mean = avg(rates.map((r) => r.rate)) || 1;
  const best = rates.sort((a, b) => b.rate - a.rate)[0]!;
  return {
    label: best.slug.replace(/_/g, ' '),
    slug: best.slug,
    metric: 'upgrade intent + paid per visitor',
    value: Math.round(best.rate * 10) / 10,
    avg_value: Math.round(mean * 10) / 10,
    multiplier: mean > 0 ? Math.round((best.rate / mean) * 10) / 10 : 1,
    sample_size: best.n,
  };
}

function buildLeadMagnetInsight(rows: ValidationEventRow[]): ConversionInsight | null {
  const magnets = new Map<string, ValidationEventRow[]>();
  for (const e of rows) {
    const lm = resolveLeadMagnet(e);
    if (!lm) continue;
    if (!magnets.has(lm)) magnets.set(lm, []);
    magnets.get(lm)!.push(e);
  }
  const rates = Array.from(magnets.entries()).map(([slug, mRows]) => ({
    slug,
    rate: conversionRate(mRows, () => true),
    n: new Set(mRows.map((e) => e.visitor_id)).size,
  })).filter((r) => r.n > 0);

  if (rates.length === 0) return null;
  const mean = avg(rates.map((r) => r.rate)) || 1;
  const best = rates.sort((a, b) => b.rate - a.rate)[0]!;
  return {
    label: best.slug,
    slug: best.slug,
    metric: 'upgrade intent + paid per visitor',
    value: Math.round(best.rate * 10) / 10,
    avg_value: Math.round(mean * 10) / 10,
    multiplier: mean > 0 ? Math.round((best.rate / mean) * 10) / 10 : 1,
    sample_size: best.n,
  };
}

function buildMarketingRecommendations(
  bestMission: ConversionInsight | null,
  bestWorld: ConversionInsight | null,
  bestSegment: ConversionInsight | null,
): MarketingAssetRecommendation[] {
  const recs: MarketingAssetRecommendation[] = [];
  let priority = 1;

  if (bestMission && bestMission.multiplier >= 1.2) {
    const world = bestMission.world_slug ?? 'ai-builder';
    recs.push({
      priority: priority++,
      world_slug: world,
      world_label: WORLD_LABELS[world] ?? world,
      asset_type: 'tiktok',
      title: `Mission spotlight: ${bestMission.label}`,
      reason: `${bestMission.multiplier}x higher conversion than average mission`,
      suggested_channel: 'TikTok + YouTube short',
    });
    recs.push({
      priority: priority++,
      world_slug: world,
      world_label: WORLD_LABELS[world] ?? world,
      asset_type: 'seo',
      title: `${bestMission.label} — Step by Step`,
      reason: 'Top converting mission — prioritize in SEO cluster',
      suggested_channel: 'SEO top 100',
    });
    recs.push({
      priority: priority++,
      world_slug: world,
      world_label: WORLD_LABELS[world] ?? world,
      asset_type: 'lead_magnet',
      title: `${bestMission.label} Checklist (PDF)`,
      reason: 'Lead magnet aligned with highest-converting entry mission',
      suggested_channel: 'Email capture',
    });
  }

  if (bestWorld && bestWorld.multiplier >= 1.1) {
    recs.push({
      priority: priority++,
      world_slug: bestWorld.slug,
      world_label: bestWorld.label,
      asset_type: 'email',
      title: `${bestWorld.label} nurture sequence — lead with Mission 1`,
      reason: `${bestWorld.multiplier}x world-level conversion vs average`,
      suggested_channel: 'Email sequence',
    });
  }

  if (bestSegment && bestSegment.multiplier >= 1.1) {
    const assetType = bestSegment.slug.includes('parent')
      ? 'parent'
      : bestSegment.slug.includes('educator')
        ? 'educator'
        : 'email';
    recs.push({
      priority: priority++,
      world_slug: bestWorld?.slug ?? 'ai-builder',
      world_label: bestWorld?.label ?? 'AI Builder',
      asset_type: assetType,
      title: `${bestSegment.label} messaging pack`,
      reason: `${bestSegment.multiplier}x conversion vs other segments`,
      suggested_channel: assetType === 'parent' ? 'Facebook + homeschool' : 'Educator outreach',
    });
  }

  if (recs.length === 0) {
    recs.push({
      priority: 1,
      world_slug: 'ai-builder',
      world_label: 'AI Builder',
      asset_type: 'lead_magnet',
      title: 'Future-Proof Assessment',
      reason: 'Insufficient live conversion data — default Life Leverage entry',
      suggested_channel: 'SEO + parent channels',
    });
  }

  return recs.slice(0, 8);
}

function buildSourceAttribution(rows: ValidationEventRow[]): SourceOutcomeAttribution[] {
  const bySource = new Map<string, ValidationEventRow[]>();
  for (const e of rows) {
    const src = e.source || 'direct';
    if (!bySource.has(src)) bySource.set(src, []);
    bySource.get(src)!.push(e);
  }

  return Array.from(bySource.entries())
    .map(([source, sRows]) => {
      const visitors = new Set(
        sRows.filter((e) => e.event_type === 'visitor_landed' || e.event_type === 'session_visit').map((e) => e.visitor_id),
      ).size || new Set(sRows.map((e) => e.visitor_id)).size;
      const mission_starts = sRows.filter((e) => e.event_type === 'mission_started').length;
      const community_joins = sRows.filter((e) => e.event_type === 'community_joined').length;
      const upgrade_intent = sRows.filter((e) => e.event_type === 'upgrade_initiated').length;
      const upgrade_completed = sRows.filter((e) => e.event_type === 'upgrade_completed').length;
      return {
        source,
        visitors,
        mission_starts,
        community_joins,
        upgrade_intent,
        upgrade_completed,
        mission_start_rate_pct: pct(mission_starts, visitors),
        paid_rate_pct: pct(upgrade_completed, visitors),
      };
    })
    .filter((s) => s.visitors > 0 || s.mission_starts > 0)
    .sort((a, b) => b.upgrade_completed - a.upgrade_completed || b.mission_starts - a.mission_starts)
    .slice(0, 15);
}

function buildLandingOutcomes(rows: ValidationEventRow[]): { page: string; mission_starts: number; community_joins: number }[] {
  const byPage = new Map<string, { missions: number; community: number }>();
  for (const e of rows) {
    const page = e.landing_page ?? resolveWorldSlug(e) ?? 'unknown';
    if (!byPage.has(page)) byPage.set(page, { missions: 0, community: 0 });
    const entry = byPage.get(page)!;
    if (e.event_type === 'mission_started') entry.missions++;
    if (e.event_type === 'community_joined') entry.community++;
  }
  return Array.from(byPage.entries())
    .map(([page, v]) => ({ page, mission_starts: v.missions, community_joins: v.community }))
    .filter((p) => p.mission_starts > 0 || p.community_joins > 0)
    .sort((a, b) => b.mission_starts - a.mission_starts)
    .slice(0, 12);
}

function buildRevenueEarners(rows: ValidationEventRow[]): RevenueEarner[] {
  const revenue = buildRevenueSnapshotFromEvents(rows);
  const earners: RevenueEarner[] = [];

  for (const w of revenue.by_world.filter((x) => x.upgrade_completed > 0 || x.upgrade_initiated > 0)) {
    earners.push({
      rank: 0,
      entity_type: 'world',
      slug: w.world_slug,
      label: WORLD_LABELS[w.world_slug] ?? w.world_slug,
      upgrade_completed: w.upgrade_completed,
      upgrade_intent: w.upgrade_initiated,
      mission_completions: w.mission_completions,
      revenue_signal_score: w.upgrade_completed * 10 + w.upgrade_initiated * 3 + w.mission_completions,
    });
  }

  for (const m of revenue.by_mission.filter((x) => x.upgrade_completed > 0 || x.upgrade_initiated > 0)) {
    earners.push({
      rank: 0,
      entity_type: 'mission',
      slug: m.mission_slug,
      label: missionTitle(m.mission_slug),
      world_slug: m.world_slug,
      upgrade_completed: m.upgrade_completed,
      upgrade_intent: m.upgrade_initiated,
      mission_completions: m.completions,
      revenue_signal_score: m.upgrade_completed * 10 + m.upgrade_initiated * 3 + m.completions,
    });
  }

  for (const c of revenue.community_correlation.by_world.filter((x) => x.upgrade_intent > 0)) {
    earners.push({
      rank: 0,
      entity_type: 'community',
      slug: c.world_slug,
      label: `${WORLD_LABELS[c.world_slug] ?? c.world_slug} community`,
      world_slug: c.world_slug,
      upgrade_completed: 0,
      upgrade_intent: c.upgrade_intent,
      mission_completions: 0,
      revenue_signal_score: c.upgrade_intent * 5 + c.joiners,
    });
  }

  return earners
    .sort((a, b) => b.revenue_signal_score - a.revenue_signal_score)
    .slice(0, 12)
    .map((e, i) => ({ ...e, rank: i + 1 }));
}

function buildProductSignals(
  earners: RevenueEarner[],
  rows: ValidationEventRow[],
): ProductBuildSignal[] {
  const signals: ProductBuildSignal[] = [];
  let p = 1;

  const topWorld = earners.find((e) => e.entity_type === 'world');
  if (topWorld) {
    signals.push({
      priority: p++,
      action: `Double down on ${topWorld.label} — more missions + community hooks`,
      signal: `${topWorld.upgrade_completed} paid · ${topWorld.upgrade_intent} upgrade intent`,
      based_on: 'Revenue → Product loop',
    });
  }

  const topMission = earners.find((e) => e.entity_type === 'mission');
  if (topMission) {
    signals.push({
      priority: p++,
      action: `Clone ${topMission.label} pattern to adjacent missions in ${WORLD_LABELS[topMission.world_slug ?? ''] ?? topMission.world_slug}`,
      signal: 'Highest mission-level revenue signal',
      based_on: 'Mission conversion data',
    });
  }

  const lowCompletionWorlds = KNOWN_WORLDS.filter((slug) => {
    const wRows = rows.filter((e) => resolveWorldSlug(e) === slug);
    const starts = wRows.filter((e) => e.event_type === 'mission_started').length;
    const done = wRows.filter((e) => e.event_type === 'mission_completed').length;
    return starts >= 3 && pct(done, starts) < 40;
  });

  for (const slug of lowCompletionWorlds.slice(0, 2)) {
    signals.push({
      priority: p++,
      action: `Fix drop-off in ${WORLD_LABELS[slug]} — mission UX before new domains`,
      signal: 'Completion rate below 40% with meaningful traffic',
      based_on: 'Learning Engine retention signal',
    });
  }

  if (signals.length === 0) {
    signals.push({
      priority: 1,
      action: 'Invite PASS-030 testers — flywheel needs human signal',
      signal: 'Insufficient conversion data across worlds',
      based_on: 'Learning lane gate',
    });
  }

  return signals.slice(0, 6);
}

function provenRetention(rows: ValidationEventRow[]): string[] {
  return KNOWN_WORLDS.filter((slug) => {
    const wRows = rows.filter((e) => resolveWorldSlug(e) === slug || e.path_slug === slug);
    const visitors = new Set(wRows.map((e) => e.visitor_id));
    if (visitors.size < 2) return false;
    let returned = 0;
    const days = new Map<string, Set<string>>();
    for (const e of wRows.filter((r) => r.event_type === 'session_visit' || r.event_type === 'return_this_week')) {
      if (!days.has(e.visitor_id)) days.set(e.visitor_id, new Set());
      days.get(e.visitor_id)!.add(e.created_at.slice(0, 10));
    }
    for (const d of days.values()) if (d.size >= 2) returned++;
    return pct(returned, visitors.size) >= 30;
  });
}

function provenConversion(rows: ValidationEventRow[]): string[] {
  return KNOWN_WORLDS.filter((slug) => {
    const wRows = rows.filter((e) => resolveWorldSlug(e) === slug);
    const paid = wRows.filter((e) => e.event_type === 'upgrade_completed').length;
    const intent = wRows.filter((e) => e.event_type === 'upgrade_initiated').length;
    return paid >= 1 || intent >= 3;
  });
}

function scoreLiveWorld(slug: string, rows: ValidationEventRow[]): DomainExpansionScore['scores'] {
  const wRows = rows.filter((e) => resolveWorldSlug(e) === slug || e.path_slug === slug);
  const visitors = new Set(wRows.map((e) => e.visitor_id)).size;
  const starts = wRows.filter((e) => e.event_type === 'mission_started').length;
  const completions = wRows.filter((e) => e.event_type === 'mission_completed').length;
  const community = wRows.filter((e) => e.event_type === 'community_joined').length;
  const paid = wRows.filter((e) => e.event_type === 'upgrade_completed').length;
  const intent = wRows.filter((e) => e.event_type === 'upgrade_initiated').length;

  const traffic = Math.min(100, visitors * 8 + starts * 2);
  const conversion = Math.min(100, pct(intent + paid, Math.max(starts, 1)) * 2 + paid * 15);
  const retention = Math.min(100, pct(completions, Math.max(starts, 1)) + community * 5);
  const revenue = Math.min(100, paid * 25 + intent * 8);
  const community_potential = Math.min(100, community * 10 + 40);

  return { traffic, conversion, retention, revenue, community_potential };
}

function totalExpansionScore(scores: DomainExpansionScore['scores']): number {
  const weights = { traffic: 0.2, conversion: 0.25, retention: 0.2, revenue: 0.2, community_potential: 0.15 };
  return Math.round(
    scores.traffic * weights.traffic +
      scores.conversion * weights.conversion +
      scores.retention * weights.retention +
      scores.revenue * weights.revenue +
      scores.community_potential * weights.community_potential,
  );
}

function buildDomainExpansion(rows: ValidationEventRow[]): DomainExpansionScore[] {
  const live: DomainExpansionScore[] = KNOWN_WORLDS.map((slug) => {
    const scores = scoreLiveWorld(slug, rows);
    const hasData = scores.traffic > 0;
    return {
      slug,
      display_name: WORLD_LABELS[slug] ?? slug,
      status: 'live' as const,
      scores: hasData ? scores : { traffic: 20, conversion: 20, retention: 30, revenue: 10, community_potential: 40 },
      total_score: 0,
      recommendation: hasData ? 'Live world — optimize flywheel before expanding' : 'Seeded — awaiting PASS-030 signal',
    };
  }).map((d) => ({ ...d, total_score: totalExpansionScore(d.scores) }));

  const candidates: DomainExpansionScore[] = EXPANSION_CANDIDATES.map((c) => ({
    slug: c.slug,
    display_name: c.display_name,
    status: 'candidate' as const,
    scores: c.baseline,
    total_score: totalExpansionScore(c.baseline),
    recommendation: c.recommendation,
  }));

  return [...live, ...candidates].sort((a, b) => b.total_score - a.total_score);
}

export function buildGrowthFlywheelFromEvents(rows: ValidationEventRow[]): GrowthFlywheelSnapshot {
  const bestMission = buildMissionInsights(rows);
  const bestWorld = buildWorldInsight(rows);
  const bestSegment = buildSegmentInsight(rows);
  const bestLeadMagnet = buildLeadMagnetInsight(rows);
  const earners = buildRevenueEarners(rows);

  return {
    pass: 'PASS-033',
    generated_at: new Date().toISOString(),
    event_count: rows.length,
    insight_to_marketing: {
      best_mission: bestMission,
      best_world: bestWorld,
      best_segment: bestSegment,
      best_lead_magnet: bestLeadMagnet,
      recommendations: buildMarketingRecommendations(bestMission, bestWorld, bestSegment),
    },
    marketing_to_world: {
      by_source: buildSourceAttribution(rows),
      top_landing_pages: buildLandingOutcomes(rows),
    },
    revenue_to_product: {
      top_earners: earners,
      build_next: buildProductSignals(earners, rows),
      worlds_with_proven_retention: provenRetention(rows),
      worlds_with_proven_conversion: provenConversion(rows),
    },
    domain_expansion: buildDomainExpansion(rows),
  };
}

export async function getGrowthFlywheelSnapshot(): Promise<GrowthFlywheelSnapshot | null> {
  if (!isSupabaseConfigured()) return null;
  const rows = await fetchRevenueEvents(10000);
  return buildGrowthFlywheelFromEvents(rows);
}
