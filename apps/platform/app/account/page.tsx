import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ConsumerNav } from '../../components/ConsumerNav';
import { createClient } from '../../lib/supabase/server';
import { getMissionCompletionsForUser } from '@foundry/db';

export const metadata = { title: 'My Account | Foundry' };
export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const completions = await getMissionCompletionsForUser(user.id);
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
      <section style={{ marginTop: 24, padding: 32, background: '#0F0F12', borderRadius: 8, border: '1px solid #2A4A2A' }}>
        <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Your account</p>
        <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>{displayName}</h1>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8 }}>{user.email}</p>
        <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 16 }}>Tier: Explore (free) — upgrade when billing opens in beta.</p>
      </section>

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
