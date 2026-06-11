/** PASS-029 — Stripe billing configuration */

export type PaidTier = 'build' | 'mastery';

export const TIER_PRICING: Record<PaidTier, { label: string; priceUsd: number; tierLevel: 2 | 3 }> = {
  build: { label: 'Build', priceUsd: 4, tierLevel: 2 },
  mastery: { label: 'Mastery', priceUsd: 18, tierLevel: 3 },
};

export function isStripeConfigured(): boolean {
  const key = process.env.STRIPE_SECRET_KEY;
  return Boolean(key && !key.includes('your-stripe') && key.startsWith('sk_'));
}

export function getStripePriceId(tier: PaidTier): string | null {
  const id = tier === 'build' ? process.env.STRIPE_PRICE_BUILD : process.env.STRIPE_PRICE_MASTERY;
  if (!id || id.includes('your-')) return null;
  return id;
}

export function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
}
