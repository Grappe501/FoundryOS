import Link from 'next/link';
import { FIRST_25_TESTER_PLAN } from '../../../lib/beta-tester-plan';
import { InviteOperationsPanel } from '../../../components/operator/InviteOperationsPanel';
import { getInviteOpsStats, isSupabaseConfigured, listBetaWaitlist } from '@foundry/db';

export const dynamic = 'force-dynamic';

export default async function OperatorInvitesPage() {
  const cohortTargets = Object.fromEntries(FIRST_25_TESTER_PLAN.map((p) => [p.cohort, p.count]));

  const rows = isSupabaseConfigured() ? await listBetaWaitlist() : [];
  const fullStats = isSupabaseConfigured() ? await getInviteOpsStats(cohortTargets) : null;

  const stats = fullStats ?? {
    pending: 0,
    invited: 0,
    joined: 0,
    active: 0,
    by_cohort: cohortTargets,
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <Link href="/operator" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <Link href="/operator/beta" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Beta dashboard</Link>

      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Invite + Tester Operations</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        Review waitlist · approve testers · assign cohort and starting world · copy invite message · track invited / joined / active.
      </p>

      <section style={{ marginTop: 20, padding: 16, background: '#1A1A14', borderRadius: 8, border: '1px solid #3A3A2A' }}>
        <p style={{ color: 'var(--foundry-primary)', fontSize: 12, margin: 0, fontWeight: 500 }}>Before first invite — confirm Supabase Auth</p>
        <ul style={{ color: '#8A8A8E', fontSize: 12, margin: '8px 0 0', paddingLeft: 18, lineHeight: 1.7 }}>
          <li>Site URL: <code style={{ color: '#E8E8EC' }}>https://foundry-os.netlify.app</code></li>
          <li>Redirect URL: <code style={{ color: '#E8E8EC' }}>https://foundry-os.netlify.app/auth/callback</code></li>
        </ul>
        <p style={{ color: '#6B6B70', fontSize: 11, margin: '8px 0 0' }}>Dashboard → Authentication → URL Configuration</p>
      </section>

      {!isSupabaseConfigured() ? (
        <p style={{ marginTop: 24, color: '#C96B6B', fontSize: 13 }}>Supabase not configured — set env vars to manage invites.</p>
      ) : (
        <InviteOperationsPanel
          initialRows={rows}
          stats={{
            pending: fullStats?.pending ?? 0,
            invited: fullStats?.invited ?? 0,
            joined: fullStats?.joined ?? 0,
            active: fullStats?.active ?? 0,
            by_cohort: fullStats?.by_cohort ?? Object.fromEntries(
              FIRST_25_TESTER_PLAN.map((p) => [p.cohort, { invited: 0, joined: 0, active: 0, target: p.count }]),
            ),
          }}
        />
      )}
    </main>
  );
}
