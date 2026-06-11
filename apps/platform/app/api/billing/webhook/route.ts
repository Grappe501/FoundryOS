import { NextResponse } from 'next/server';
import { upsertSubscriptionFromCheckout, createServiceClient, insertValidationEvent } from '@foundry/db';
import { isStripeConfigured } from '../../../../lib/billing';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ ok: false, error: 'Stripe not configured' }, { status: 503 });
  }

  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  if (!sig) {
    return NextResponse.json({ ok: false, error: 'Missing signature' }, { status: 400 });
  }

  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook error';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.client_reference_id ?? session.metadata?.user_id;
    const tier = (session.metadata?.tier ?? 'build') as 'build' | 'mastery';
    const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;

    if (userId && subscriptionId && (tier === 'build' || tier === 'mastery')) {
      await upsertSubscriptionFromCheckout({
        user_id: userId,
        tier,
        stripe_subscription_id: subscriptionId,
        stripe_customer_id: typeof session.customer === 'string' ? session.customer : session.customer?.id,
        world_slug: session.metadata?.world_slug || undefined,
        context: session.metadata?.context || 'stripe_checkout',
        mission_slug: session.metadata?.mission_slug || undefined,
        community_slug: session.metadata?.community_slug || undefined,
      });
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object;
    const userId = subscription.metadata?.user_id;
    if (userId) {
      const client = createServiceClient();
      if (client) {
        await client.from('subscriptions').update({ status: 'cancelled' }).eq('stripe_subscription_id', subscription.id);
        await client.from('user_profiles').update({ tier_level: 1 }).eq('id', userId);
      }
      await insertValidationEvent({
        visitor_id: userId.slice(0, 64),
        event_type: 'subscription_cancelled',
        category: 'conversion',
        metadata: { stripe_subscription_id: subscription.id },
      });
    }
  }

  return NextResponse.json({ ok: true, received: true });
}
