import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ConsumerNav } from '../../components/ConsumerNav';
import { UpgradeMoment } from '../../components/billing/UpgradeMoment';
import { createClient } from '../../lib/supabase/server';
import { getMissionCompletionsForUser, getUserTierLevel, tierNameForLevel } from '@foundry/db';
import { TIER_PRICING } from '../../lib/billing';

export const metadata = { title: 'My Account | Foundry' };
export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ upgraded?: string }>;
};

export default async function AccountPage({ searchParams }: Props) {
  const { upgraded } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const [completions, tierLevel] = await Promise.all([
    getMissionCompletionsForUser(user.id),
    getUserTierLevel(user.id),
  ]);
  const tierName = tierNameForLevel(tierLevel);
  const displayName = user.user_metadata?.display_name ?? user.email?.split('@')[0] ?? 'Member';

  async function signOut() {
    'use server';
    const sb = await createClient();
    await sb.auth.signOut();
    redirect('/');
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <ConsumerNav />
      {upgraded && (upgraded === 'build' || upgraded === 'mastery') && (
        <section style={{ marginTop: 16, padding: 16, background: '#1A2A1A', borderRadius: 8, border: '1px solid #2A4A2A' }}>
          <p style={{ color: '#6B9B6B', margin: 0, fontSize: 14 }}>
            Welcome to {TIER_PRICING[upgraded].label}! Your subscription is being confirmed.
          </p>
        </section>
      )}
      <section style={{ marginTop: 24, padding: 32, background: '#0F0F12', borderRadius: 8, border: '1px solid #2A4A2A' }}>
        <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Your account</p>
        <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>{displayName}</h1>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8 }}>{user.email}</p>
        <p style={{ color: tierLevel > 1 ? 'var(--foundry-primary)' : '#6B6B70', fontSize: 13, marginTop: 16 }}>
          Tier: {tierName.charAt(0).toUpperCase() + tierName.slice(1)}
          {tierLevel === 1 && ' (free)'}
          {tierLevel === 2 && ' — $4/mo'}
          {tierLevel === 3 && ' — $18/mo'}
        </p>
      </section>

      {tierLevel === 1 && (
        <section style={{ marginTop: 24 }}>
          <UpgradeMoment
            tier="build"
            headline="Sync progress across devices"
            body="Upgrade to Build for full academy access, portfolio sync, and community participation."
            context="account_page"
            compact
          />
        </section>
      )}

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Mission progress synced</h2>
        {completions.length === 0 ? (
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12 }}>
            No synced missions yet.{' '}
            <Link href="/ai-builder/missions/homework-assistant" style={{ color: '#6B9B6B' }}>Start Mission 1 →</Link>
          </p>
        ) : (
          completions.slice(0, 10).map((c) => (
            <div key={c.id} style={{ padding: '12px 0', borderBottom: '1px solid #1A1A1E' }}>
              <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{c.mission_title}</p>
              <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>
                {c.world_slug} · {new Date(c.completed_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </section>

      <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link href="/my-journey" style={{ padding: '12px 20px', background: '#2A4A2A', borderRadius: 6, color: '#E8E8EC', fontSize: 14, textDecoration: 'none' }}>
          My journey →
        </Link>
        <Link href="/pricing" style={{ padding: '12px 20px', border: '1px solid #1A1A1E', borderRadius: 6, color: '#8A8A8E', fontSize: 14, textDecoration: 'none' }}>
          View pricing
        </Link>
        <form action={signOut}>
          <button type="submit" style={{ padding: '12px 20px', background: 'transparent', border: '1px solid #1A1A1E', borderRadius: 6, color: '#6B6B70', fontSize: 14, cursor: 'pointer' }}>
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
