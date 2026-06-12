import Link from 'next/link';
import { ConsumerNav } from '../../components/ConsumerNav';
import { AuthForm } from '../../components/auth/AuthForm';

export const metadata = { title: 'Sign In | Foundry' };

export default function SignInPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 480, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 24 }}>
        <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Sign in</h1>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12 }}>Save mission progress and sync your portfolio across devices.</p>
        <div style={{ marginTop: 28, padding: 28, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
          <AuthForm mode="sign-in" />
        </div>
        <p style={{ marginTop: 20, fontSize: 13, color: 'var(--foundry-text-faint)' }}>
          No account? <Link href="/create-account" style={{ color: 'var(--foundry-success)' }}>Create one</Link>
          {' · '}
          <Link href="/beta" style={{ color: 'var(--foundry-text-faint)' }}>Join beta waitlist</Link>
        </p>
      </section>
    </main>
  );
}
