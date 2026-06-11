import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';
import { insertValidationEvent } from './validation-events';
import {
  buildRevenueSnapshotFromEvents,
  fetchRevenueEvents,
  getDashboardConsistencyCheck,
  normalizeTier,
  type RevenueValidationSnapshot,
} from './revenue-analytics';

export type RevenuePersona = {
  id: string;
  name: string;
  segment: 'student' | 'parent' | 'adult_learner' | 'educator' | 'hobbyist';
  world_slug: string;
  mission_slug: string;
  tier: 'build' | 'mastery';
  journey: string[];
};

export const REVENUE_TEST_PERSONAS: RevenuePersona[] = [
  {
    id: 'persona-sam',
    name: 'Student Sam',
    segment: 'student',
    world_slug: 'ai-builder',
    mission_slug: 'homework-assistant',
    tier: 'build',
    journey: ['assessment', 'mission_1', 'portfolio', 'community', 'pricing', 'checkout_initiated', 'paid'],
  },
  {
    id: 'persona-paula',
    name: 'Parent Paula',
    segment: 'parent',
    world_slug: 'financial-independence',
    mission_slug: 'first-budget',
    tier: 'build',
    journey: ['assessment', 'mission_1', 'portfolio', 'pricing', 'checkout_initiated'],
  },
  {
    id: 'persona-alex',
    name: 'Adult Learner Alex',
    segment: 'adult_learner',
    world_slug: 'bourbon',
    mission_slug: 'first-tasting',
    tier: 'build',
    journey: ['mission_1', 'pricing_clicked'],
  },
  {
    id: 'persona-emma',
    name: 'Educator Emma',
    segment: 'educator',
    world_slug: 'public-speaking',
    mission_slug: 'first-talk',
    tier: 'mastery',
    journey: ['mission_1', 'community', 'pricing', 'checkout_initiated', 'paid'],
  },
  {
    id: 'persona-hank',
    name: 'Hobbyist Hank',
    segment: 'hobbyist',
    world_slug: 'bbq',
    mission_slug: 'first-pork-butt',
    tier: 'build',
    journey: ['mission_1', 'community', 'checkout_initiated', 'checkout_cancelled'],
  },
];

export type VerificationCheck = {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
};

export type RevenueVerificationResult = {
  personas_seeded: number;
  checks: VerificationCheck[];
  passed: boolean;
  snapshot: RevenueValidationSnapshot | null;
  consistency: Awaited<ReturnType<typeof getDashboardConsistencyCheck>>;
};

function daysAgo(n: number): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - n);
  return d.toISOString();
}

async function clearPersonaEvents(): Promise<void> {
  const client = createServiceClient();
  if (!client) return;
  for (const p of REVENUE_TEST_PERSONAS) {
    await client.from('validation_events').delete().eq('visitor_id', p.id);
  }
}

export async function seedRevenueVerificationPersonas(): Promise<{ ok: boolean; seeded: number; error?: string }> {
  if (!isSupabaseConfigured()) return { ok: false, seeded: 0, error: 'Database not configured' };

  await clearPersonaEvents();

  let seeded = 0;
  for (const p of REVENUE_TEST_PERSONAS) {
    const base = {
      visitor_id: p.id,
      path_slug: p.world_slug,
      metadata: { persona: p.name, segment: p.segment, mission: p.mission_slug, tier: p.tier },
    };

    const events: Parameters<typeof insertValidationEvent>[0][] = [
      { ...base, event_type: 'assessment_started', category: 'activation', metadata: { ...base.metadata, step: 'assessment' } },
      { ...base, event_type: 'assessment_completed', category: 'activation' },
      { ...base, event_type: 'mission_started', category: 'activation', metadata: { ...base.metadata, mission: p.mission_slug } },
      { ...base, event_type: 'mission_completed', category: 'activation', metadata: { ...base.metadata, mission: p.mission_slug } },
      { ...base, event_type: 'portfolio_created', category: 'activation', landing_page: `/${p.world_slug}/portfolio` },
      { ...base, event_type: 'pricing_viewed', category: 'acquisition', landing_page: '/pricing' },
      { ...base, event_type: 'pricing_clicked', category: 'conversion', landing_page: '/pricing', metadata: { ...base.metadata, tier: p.tier } },
      { ...base, event_type: 'upgrade_initiated', category: 'conversion', metadata: { ...base.metadata, tier: p.tier, context: `mission_complete:${p.mission_slug}` } },
    ];

    if (p.journey.includes('community')) {
      events.push({
        ...base,
        event_type: 'community_joined',
        category: 'retention',
        landing_page: `/community/${p.world_slug}`,
        metadata: { ...base.metadata, community_slug: p.world_slug },
      });
    }

    if (p.journey.includes('checkout_cancelled')) {
      events.push({
        ...base,
        event_type: 'checkout_cancelled',
        category: 'conversion',
        landing_page: '/pricing',
        metadata: { ...base.metadata, tier: p.tier, reason: 'user_cancelled' },
      });
    }

    if (p.journey.includes('paid')) {
      events.push({
        ...base,
        event_type: 'upgrade_completed',
        category: 'conversion',
        metadata: { ...base.metadata, tier: p.tier, context: `mission_complete:${p.mission_slug}` },
      });
      events.push({
        ...base,
        event_type: 'paid',
        category: 'conversion',
        metadata: { ...base.metadata, tier: p.tier, amount_usd: p.tier === 'mastery' ? 18 : 4 },
      });
    }

    if (p.id === 'persona-alex') {
      // Alex only clicks pricing — remove upgrade_initiated from default batch
      const filtered = events.filter((e) => e.event_type !== 'upgrade_initiated' && e.event_type !== 'upgrade_completed' && e.event_type !== 'paid');
      for (const ev of filtered) await insertValidationEvent(ev);
    } else if (p.id === 'persona-paula') {
      // Paula initiates but doesn't pay
      const filtered = events.filter((e) => e.event_type !== 'upgrade_completed' && e.event_type !== 'paid');
      for (const ev of filtered) await insertValidationEvent(ev);
    } else {
      for (const ev of events) {
        if (p.id === 'persona-hank' && (ev.event_type === 'upgrade_completed' || ev.event_type === 'paid')) continue;
        await insertValidationEvent(ev);
      }
    }
    seeded++;
  }

  return { ok: true, seeded };
}

export async function runRevenueVerificationChecks(): Promise<RevenueVerificationResult> {
  const rows = await fetchRevenueEvents();
  const snapshot = buildRevenueSnapshotFromEvents(rows);
  const consistency = await getDashboardConsistencyCheck();
  const checks: VerificationCheck[] = [];

  // Funnel events present
  for (const type of ['pricing_viewed', 'pricing_clicked', 'upgrade_initiated', 'upgrade_completed'] as const) {
    const count = snapshot.funnel[type];
    checks.push({
      id: `funnel_${type}`,
      label: `${type} tracked`,
      passed: count > 0,
      detail: `${count} events`,
    });
  }

  // World attribution — AI Builder 3 upgrade clicks/initiated, FI 2, PS 1 (from seeded personas)
  const aiBuilder = snapshot.by_world.find((w) => w.world_slug === 'ai-builder');
  const fi = snapshot.by_world.find((w) => w.world_slug === 'financial-independence');
  const ps = snapshot.by_world.find((w) => w.world_slug === 'public-speaking');

  checks.push({
    id: 'world_ai_builder',
    label: 'AI Builder world attribution',
    passed: (aiBuilder?.upgrade_initiated ?? 0) >= 1,
    detail: `${aiBuilder?.upgrade_initiated ?? 0} upgrade initiated · ${aiBuilder?.pricing_clicks ?? 0} pricing clicks`,
  });
  checks.push({
    id: 'world_fi',
    label: 'Financial Independence world attribution',
    passed: (fi?.upgrade_initiated ?? 0) >= 1,
    detail: `${fi?.upgrade_initiated ?? 0} upgrade initiated`,
  });
  checks.push({
    id: 'world_ps',
    label: 'Public Speaking world attribution',
    passed: (ps?.upgrade_initiated ?? 0) >= 1,
    detail: `${ps?.upgrade_initiated ?? 0} upgrade initiated`,
  });

  // Mission attribution
  const homework = snapshot.by_mission.find((m) => m.mission_slug === 'homework-assistant');
  const firstBudget = snapshot.by_mission.find((m) => m.mission_slug === 'first-budget');
  checks.push({
    id: 'mission_homework',
    label: 'Homework Assistant mission attribution',
    passed: (homework?.upgrade_initiated ?? 0) >= 1,
    detail: `${homework?.upgrade_initiated ?? 0} upgrade initiated`,
  });
  checks.push({
    id: 'mission_first_budget',
    label: 'First Budget mission attribution',
    passed: (firstBudget?.upgrade_initiated ?? 0) >= 1,
    detail: `${firstBudget?.upgrade_initiated ?? 0} upgrade initiated`,
  });

  // Stripe failure paths
  checks.push({
    id: 'checkout_cancelled',
    label: 'Checkout cancelled tracked',
    passed: snapshot.funnel.checkout_cancelled >= 1,
    detail: `${snapshot.funnel.checkout_cancelled} cancelled events (Hank persona)`,
  });

  // Community correlation
  checks.push({
    id: 'community_upgrade_correlation',
    label: 'Community → upgrade intent correlation',
    passed: snapshot.community_correlation.community_joiners > 0 && snapshot.community_correlation.joiners_with_upgrade_intent > 0,
    detail: `${snapshot.community_correlation.joiners_with_upgrade_intent}/${snapshot.community_correlation.community_joiners} joiners showed upgrade intent (${snapshot.community_correlation.upgrade_intent_rate_pct}%)`,
  });

  // Dashboard consistency
  checks.push({
    id: 'dashboard_consistency',
    label: 'Dashboard funnel numbers consistent',
    passed: consistency?.aligned ?? false,
    detail: consistency?.notes.join(' · ') ?? 'No consistency check',
  });

  if (consistency) {
    checks.push({
      id: 'business_revenue_match',
      label: 'Business + Revenue pages share funnel counts',
      passed:
        consistency.pricing_viewed === snapshot.funnel.pricing_viewed &&
        consistency.upgrade_initiated === snapshot.funnel.upgrade_initiated,
      detail: `pricing_viewed ${consistency.pricing_viewed} · upgrade_initiated ${consistency.upgrade_initiated}`,
    });
  }

  // Persona payment records
  checks.push({
    id: 'persona_who_paid',
    label: 'Can answer who paid and why',
    passed: snapshot.persona_payments.filter((p) => p.paid).length >= 2,
    detail: snapshot.persona_payments.map((p) => `${p.persona}: ${p.paid ? 'paid' : 'intent'} (${p.world_slug})`).join('; '),
  });

  const passed = checks.every((c) => c.passed);

  return {
    personas_seeded: REVENUE_TEST_PERSONAS.length,
    checks,
    passed,
    snapshot,
    consistency,
  };
}

export async function runFullRevenueVerification(): Promise<RevenueVerificationResult> {
  await seedRevenueVerificationPersonas();
  return runRevenueVerificationChecks();
}
