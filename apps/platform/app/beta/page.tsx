import Link from 'next/link';
import { ConsumerNav } from '../../components/ConsumerNav';
import { BetaJoinForm } from '../../components/beta/BetaJoinForm';

export const metadata = {
  title: 'Private Beta | Foundry',
  description: 'Foundry is in private beta. Join the early access list.',
};

export default function BetaPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 640, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 24, padding: 32, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-success-bg)' }}>
        <p style={{ color: 'var(--foundry-success)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Private beta</p>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 12 }}>Foundry is in private beta.</h1>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 16, marginTop: 16, lineHeight: 1.7 }}>
          We&apos;re inviting handpicked testers — not opening to the public yet. Join the early access list and tell us who you are and which worlds interest you.
        </p>
      </section>
      <section style={{ marginTop: 24, padding: 28, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
        <BetaJoinForm />
      </section>
      <p style={{ marginTop: 24, fontSize: 13, color: 'var(--foundry-text-faint)' }}>
        Already invited?{' '}
        <Link href="/sign-in" style={{ color: 'var(--foundry-success)' }}>Sign in</Link>
        {' · '}
        <Link href="/beta/welcome" style={{ color: 'var(--foundry-success)' }}>Welcome guide</Link>
        {' · '}
        <Link href="/beta/feedback" style={{ color: 'var(--foundry-success)' }}>Send feedback</Link>
        {' · '}
        <Link href="/pricing" style={{ color: 'var(--foundry-text-faint)' }}>View pricing</Link>
      </p>
    </main>
  );
}
