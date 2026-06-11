import Link from 'next/link';
import { ConsumerNav } from '../../../components/ConsumerNav';
import { TesterFeedbackForm } from '../../../components/feedback/TesterFeedbackForm';

export const metadata = {
  title: 'Beta Feedback | Foundry',
  description: 'Tell us what confused you, what you liked, and what to build next.',
};

export default function BetaFeedbackPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 640, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 24 }}>
        <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Private beta</p>
        <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Your feedback shapes Foundry.</h1>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
          We&apos;re learning from testers — not guessing. Tell us what worked, what didn&apos;t, and what to build next.
        </p>
      </section>
      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <TesterFeedbackForm />
      </section>
      <p style={{ marginTop: 20, fontSize: 13, color: '#6B6B70' }}>
        <Link href="/beta/welcome" style={{ color: '#6B6B70' }}>Welcome guide</Link>
        {' · '}
        <Link href="/account" style={{ color: '#6B6B70' }}>Account</Link>
      </p>
    </main>
  );
}
