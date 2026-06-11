import Link from 'next/link';
import { Suspense } from 'react';
import { ConsumerNav } from '../../components/ConsumerNav';
import { PricingTiers } from '../../components/pricing/PricingTiers';

export const metadata = {
  title: 'Pricing | Foundry',
  description: 'Free to explore. Build and save progress. Mastery for communities and mentors.',
};

export default function PricingPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 24 }}>
        <h1 style={{ fontWeight: 300, fontSize: '2.5rem', margin: 0 }}>Simple pricing</h1>
        <p style={{ color: '#8A8A8E', fontSize: 16, marginTop: 12, lineHeight: 1.7, maxWidth: 560 }}>
          Start free. Upgrade when you want to save progress across devices, build portfolios, and join communities.
        </p>
      </section>
      <Suspense fallback={<p style={{ color: '#6B6B70', marginTop: 32 }}>Loading pricing…</p>}>
        <PricingTiers />
      </Suspense>
      <section style={{ marginTop: 32, padding: 24, background: '#111114', borderRadius: 8 }}>
        <p style={{ color: '#8A8A8E', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
          Foundry is in <strong style={{ fontWeight: 400, color: '#E8E8EC' }}>private beta</strong>. Billing is not live yet — explore everything and join the waitlist for early access pricing.
        </p>
        <Link href="/beta" style={{ display: 'inline-block', marginTop: 16, color: '#6B9B6B', fontSize: 14 }}>
          Join the beta →
        </Link>
      </section>
    </main>
  );
}
