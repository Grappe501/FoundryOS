import Link from 'next/link';
import { ConsumerNav } from '../../components/ConsumerNav';
import { AuthForm } from '../../components/auth/AuthForm';

export const metadata = { title: 'Create Account | Foundry' };

export default function CreateAccountPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 480, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 24 }}>
        <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Create account</h1>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12 }}>
          Private beta — create an account to save missions, portfolios, and assessment results.
        </p>
        <div style={{ marginTop: 28, padding: 28, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
          <AuthForm mode="create-account" />
        </div>
        <p style={{ marginTop: 20, fontSize: 13, color: 'var(--foundry-text-faint)' }}>
          Already have an account? <Link href="/sign-in" style={{ color: 'var(--foundry-success)' }}>Sign in</Link>
        </p>
      </section>
    </main>
  );
}
