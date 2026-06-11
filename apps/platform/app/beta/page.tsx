import Link from 'next/link';
import { ConsumerNav } from '../../components/ConsumerNav';
import { BetaJoinForm } from '../../components/beta/BetaJoinForm';

export const metadata = {
  title: 'Private Beta | Foundry',
  description: 'Foundry is in private beta. Join the early access list.',
};

export default function BetaPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 640, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 24, padding: 32, background: '#0F0F12', borderRadius: 8, border: '1px solid #2A4A2A' }}>
        <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Private beta</p>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 12 }}>Foundry is in private beta.</h1>
        <p style={{ color: '#8A8A8E', fontSize: 16, marginTop: 16, lineHeight: 1.7 }}>
          We&apos;re inviting handpicked testers — not opening to the public yet. Join the early access list and tell us who you are and which worlds interest you.
        </p>
      </section>
      <section style={{ marginTop: 24, padding: 28, background: '#111114', borderRadius: 8 }}>
        <BetaJoinForm />
      </section>
      <p style={{ marginTop: 24, fontSize: 13, color: '#6B6B70' }}>
        Already invited?{' '}
        <Link href="/sign-in" style={{ color: '#6B9B6B' }}>Sign in</Link>
        {' · '}
        <Link href="/pricing" style={{ color: '#6B6B70' }}>View pricing</Link>
      </p>
    </main>
  );
}
