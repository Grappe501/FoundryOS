import { NextResponse } from 'next/server';
import { insertValidationEvent } from '@foundry/db';
import { createClient } from '../../../../lib/supabase/server';
import { getStripePriceId, getAppUrl, isStripeConfigured, type PaidTier } from '../../../../lib/billing';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const tier = body.tier as PaidTier;
  if (tier !== 'build' && tier !== 'mastery') {
    return NextResponse.json({ ok: false, error: 'tier must be build or mastery' }, { status: 400 });
  }

  const world_slug = typeof body.world_slug === 'string' ? body.world_slug : undefined;
  const context = typeof body.context === 'string' ? body.context : 'checkout';
  const mission_slug = typeof body.mission_slug === 'string' ? body.mission_slug : undefined;
  const community_slug = typeof body.community_slug === 'string' ? body.community_slug : undefined;
  const visitor_id = typeof body.visitor_id === 'string' ? body.visitor_id.slice(0, 64) : 'anonymous';

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const eventMeta = {
    tier,
    context,
    mission: mission_slug,
    mission_slug,
    world_slug,
    community_slug,
  };

  if (!user) {
    await insertValidationEvent({
      visitor_id,
      event_type: 'checkout_blocked_signin',
      category: 'conversion',
      path_slug: world_slug,
      metadata: eventMeta,
    });
    return NextResponse.json({ ok: false, sign_in_required: true });
  }

  await insertValidationEvent({
    visitor_id: user.id,
    event_type: 'upgrade_initiated',
    category: 'conversion',
    path_slug: world_slug,
    metadata: eventMeta,
  });

  if (!isStripeConfigured()) {
    return NextResponse.json({ ok: false, billing_not_configured: true });
  }

  const priceId = getStripePriceId(tier);
  if (!priceId) {
    return NextResponse.json({ ok: false, billing_not_configured: true, error: 'Price ID not configured' });
  }

  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const appUrl = getAppUrl();

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: user.email ?? undefined,
    client_reference_id: user.id,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/account?upgraded=${tier}`,
    cancel_url: `${appUrl}/pricing?cancelled=1&world=${world_slug ?? ''}&tier=${tier}`,
    metadata: {
      user_id: user.id,
      tier,
      world_slug: world_slug ?? '',
      context,
      mission_slug: mission_slug ?? '',
      community_slug: community_slug ?? '',
    },
    subscription_data: {
      metadata: { user_id: user.id, tier },
    },
  });

  return NextResponse.json({ ok: true, url: session.url });
}
