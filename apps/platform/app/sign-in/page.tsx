import Link from 'next/link';
import { ConsumerNav } from '../../components/ConsumerNav';
import { AuthForm } from '../../components/auth/AuthForm';

export const metadata = { title: 'Sign In | Foundry' };

export default function SignInPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 480, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 24 }}>
        <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Sign in</h1>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12 }}>Save mission progress and sync your portfolio across devices.</p>
        <div style={{ marginTop: 28, padding: 28, background: '#111114', borderRadius: 8 }}>
          <AuthForm mode="sign-in" />
        </div>
        <p style={{ marginTop: 20, fontSize: 13, color: '#6B6B70' }}>
          No account? <Link href="/create-account" style={{ color: '#6B9B6B' }}>Create one</Link>
          {' · '}
          <Link href="/beta" style={{ color: '#6B6B70' }}>Join beta waitlist</Link>
        </p>
      </section>
    </main>
  );
}
