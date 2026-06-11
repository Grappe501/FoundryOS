import Link from 'next/link';
import { ConsumerNav } from '../../../components/ConsumerNav';
import { STARTING_WORLDS } from '../../../lib/beta-tester-plan';
import { getBetaInviteByCode, isSupabaseConfigured } from '@foundry/db';

export const metadata = {
  title: 'Welcome to the Beta | Foundry',
  description: 'Your private beta welcome guide.',
};

type Props = {
  searchParams: Promise<{ code?: string }>;
};

export default async function BetaWelcomePage({ searchParams }: Props) {
  const { code } = await searchParams;
  const invite = code && isSupabaseConfigured() ? await getBetaInviteByCode(code) : null;

  const worldSlug = invite?.starting_world_slug ?? invite?.interested_worlds?.[0] ?? 'ai-builder';
  const world = STARTING_WORLDS.find((w) => w.slug === worldSlug) ?? STARTING_WORLDS[0];
  const segment = (invite?.assigned_segment ?? invite?.segment ?? 'tester').replace(/_/g, ' ');

  if (!code) {
    return (
      <WelcomeShell>
        <p style={{ color: '#C8A96E', fontSize: 14 }}>Missing invite code.</p>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
          Use the link from your invite email, or{' '}
          <Link href="/beta" style={{ color: '#6B9B6B' }}>join the waitlist</Link>.
        </p>
      </WelcomeShell>
    );
  }

  if (!invite) {
    return (
      <WelcomeShell>
        <p style={{ color: '#C8A96E', fontSize: 14 }}>Invite not found.</p>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
          Double-check your invite link or contact the Foundry team.
        </p>
      </WelcomeShell>
    );
  }

  return (
    <WelcomeShell>
      <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
        Private beta · handpicked tester
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Welcome to Foundry.</h1>
      <p style={{ color: '#8A8A8E', fontSize: 16, marginTop: 16, lineHeight: 1.7 }}>
        You&apos;re in a small, controlled group — not a public launch. Foundry helps you become the person you want to be through missions, portfolios, and real progress.
      </p>

      <section style={{ marginTop: 28, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 13, color: '#C8A96E', margin: 0 }}>Your setup</h2>
        <dl style={{ margin: '16px 0 0', fontSize: 14, lineHeight: 1.8 }}>
          <dt style={{ color: '#6B6B70', display: 'inline' }}>Cohort: </dt>
          <dd style={{ color: '#E8E8EC', display: 'inline', margin: 0, textTransform: 'capitalize' }}>{segment}</dd>
          <br />
          <dt style={{ color: '#6B6B70', display: 'inline' }}>Starting world: </dt>
          <dd style={{ color: '#E8E8EC', display: 'inline', margin: 0 }}>{world.label}</dd>
        </dl>
      </section>

      <section style={{ marginTop: 16, padding: 24, background: '#0F0F12', borderRadius: 8, border: '1px solid #2A4A2A' }}>
        <h2 style={{ fontSize: 13, color: '#6B9B6B', margin: 0 }}>Your first 3 steps</h2>
        <ol style={{ color: '#E8E8EC', fontSize: 14, margin: '16px 0 0', paddingLeft: 20, lineHeight: 2 }}>
          <li>
            <Link href="/create-account" style={{ color: '#6B9B6B' }}>Create your account</Link>
            {' '}— use the same email we invited ({invite.email})
          </li>
          <li>
            <Link href="/account" style={{ color: '#6B9B6B' }}>Open your account</Link>
            {' '}— mission progress syncs when signed in
          </li>
          <li>
            <Link href={world.href} style={{ color: '#6B9B6B' }}>Start Mission 1 in {world.label}</Link>
            {' '}— complete it to mark yourself active in our beta ops
          </li>
        </ol>
      </section>

      <p style={{ marginTop: 24, fontSize: 13, color: '#6B6B70' }}>
        Feedback shapes what we build next. Explore other worlds at{' '}
        <Link href="/explore" style={{ color: '#6B6B70' }}>/explore</Link>
        {' · '}
        <Link href="/pricing" style={{ color: '#6B6B70' }}>pricing</Link>
      </p>
    </WelcomeShell>
  );
}

function WelcomeShell({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 640, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 24 }}>{children}</section>
    </main>
  );
}
