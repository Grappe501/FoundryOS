import Link from 'next/link';
import { ConsumerNav } from '../../../components/ConsumerNav';
import { TesterFeedbackForm } from '../../../components/feedback/TesterFeedbackForm';

export const metadata = {
  title: 'Beta Feedback | Foundry',
  description: 'Tell us what confused you, what you liked, and what to build next.',
};

export default function BetaFeedbackPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 640, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 24 }}>
        <p style={{ color: 'var(--foundry-success)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Private beta</p>
        <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Your feedback shapes Foundry.</h1>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
          We&apos;re learning from testers — not guessing. Tell us what worked, what didn&apos;t, and what to build next.
        </p>
      </section>
      <section style={{ marginTop: 24, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
        <TesterFeedbackForm />
      </section>
      <p style={{ marginTop: 20, fontSize: 13, color: 'var(--foundry-text-faint)' }}>
        <Link href="/beta/welcome" style={{ color: 'var(--foundry-text-faint)' }}>Welcome guide</Link>
        {' · '}
        <Link href="/account" style={{ color: 'var(--foundry-text-faint)' }}>Account</Link>
      </p>
    </main>
  );
}
