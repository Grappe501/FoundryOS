import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';
import { insertValidationEvent } from './validation-events';

export type FoundryTier = 'explore' | 'build' | 'mastery';

export type SubscriptionRow = {
  id: string;
  user_id: string;
  tier_level: number;
  tier_name: string | null;
  status: string;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  amount_usd: number | null;
  current_period_end: string | null;
  created_at: string;
};

export type SubscriptionStats = {
  paid_users: number;
  mrr_usd: number;
  build_subscribers: number;
  mastery_subscribers: number;
};

const TIER_AMOUNTS: Record<string, number> = { build: 4, mastery: 18 };

export function tierLevelForName(tier: 'build' | 'mastery'): 2 | 3 {
  return tier === 'build' ? 2 : 3;
}

export function tierNameForLevel(level: number): FoundryTier {
  if (level >= 3) return 'mastery';
  if (level >= 2) return 'build';
  return 'explore';
}

export async function getUserTierLevel(userId: string): Promise<1 | 2 | 3> {
  if (!isSupabaseConfigured()) return 1;
  const client = createServiceClient();
  if (!client) return 1;

  const { data: profile } = await client.from('user_profiles').select('tier_level').eq('id', userId).maybeSingle();
  if (profile?.tier_level) return profile.tier_level as 1 | 2 | 3;

  const { data: sub } = await client
    .from('subscriptions')
    .select('tier_level')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('tier_level', { ascending: false })
    .limit(1)
    .maybeSingle();

  return (sub?.tier_level as 1 | 2 | 3) ?? 1;
}

export async function getSubscriptionStats(): Promise<SubscriptionStats> {
  if (!isSupabaseConfigured()) {
    return { paid_users: 0, mrr_usd: 0, build_subscribers: 0, mastery_subscribers: 0 };
  }
  const client = createServiceClient();
  if (!client) {
    return { paid_users: 0, mrr_usd: 0, build_subscribers: 0, mastery_subscribers: 0 };
  }

  const { data: subs } = await client
    .from('subscriptions')
    .select('user_id, tier_name, tier_level, amount_usd')
    .eq('status', 'active');

  const rows = subs ?? [];
  const uniqueUsers = new Set(rows.map((r) => r.user_id));
  let mrr = 0;
  let build = 0;
  let mastery = 0;

  for (const row of rows) {
    const amount = row.amount_usd ?? TIER_AMOUNTS[row.tier_name ?? ''] ?? (row.tier_level === 3 ? 18 : 4);
    mrr += Number(amount);
    if (row.tier_name === 'mastery' || row.tier_level === 3) mastery++;
    else build++;
  }

  return {
    paid_users: uniqueUsers.size,
    mrr_usd: Math.round(mrr * 100) / 100,
    build_subscribers: build,
    mastery_subscribers: mastery,
  };
}

export async function upsertSubscriptionFromCheckout(input: {
  user_id: string;
  tier: 'build' | 'mastery';
  stripe_subscription_id: string;
  stripe_price_id?: string;
  stripe_customer_id?: string;
  current_period_end?: string;
  visitor_id?: string;
  world_slug?: string;
  context?: string;
  mission_slug?: string;
  community_slug?: string;
  persona?: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured()) return { ok: false, error: 'Database not configured' };
  const client = createServiceClient();
  if (!client) return { ok: false, error: 'Database not configured' };

  const tier_level = tierLevelForName(input.tier);
  const amount_usd = TIER_AMOUNTS[input.tier];

  if (input.stripe_customer_id) {
    await client.from('user_profiles').update({ stripe_customer_id: input.stripe_customer_id, tier_level }).eq('id', input.user_id);
  } else {
    await client.from('user_profiles').update({ tier_level }).eq('id', input.user_id);
  }

  const { error: subError } = await client
    .from('subscriptions')
    .update({ status: 'cancelled' })
    .eq('user_id', input.user_id)
    .eq('status', 'active');

  if (subError) return { ok: false, error: subError.message };

  const { error: insertError } = await client.from('subscriptions').insert({
    user_id: input.user_id,
    tier_level,
    tier_name: input.tier,
    status: 'active',
    stripe_subscription_id: input.stripe_subscription_id,
    stripe_price_id: input.stripe_price_id ?? null,
    amount_usd,
    current_period_end: input.current_period_end ?? null,
  });

  if (insertError) return { ok: false, error: insertError.message };

  await insertValidationEvent({
    visitor_id: input.visitor_id ?? input.user_id.slice(0, 64),
    event_type: 'upgrade_completed',
    category: 'conversion',
    path_slug: input.world_slug,
    metadata: {
      tier: input.tier,
      context: input.context,
      mission: input.mission_slug,
      community_slug: input.community_slug,
      persona: input.persona,
      stripe_subscription_id: input.stripe_subscription_id,
    },
  });

  await insertValidationEvent({
    visitor_id: input.visitor_id ?? input.user_id.slice(0, 64),
    event_type: 'paid',
    category: 'conversion',
    path_slug: input.world_slug,
    metadata: { tier: input.tier, amount_usd },
  });

  await insertValidationEvent({
    visitor_id: input.visitor_id ?? input.user_id.slice(0, 64),
    event_type: 'paid_conversion',
    category: 'conversion',
    path_slug: input.world_slug,
    metadata: { tier: input.tier },
  });

  return { ok: true };
}
