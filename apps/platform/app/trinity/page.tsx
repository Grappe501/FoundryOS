import Link from 'next/link';
import { ConsumerNav } from '../../components/ConsumerNav';
import { TrinityHub } from '../../components/trinity/TrinityHub';

export const metadata = {
  title: 'The Future-Proof Trinity | Foundry',
  description: 'Create value with AI Builder. Keep value with Financial Independence. Communicate value with Public Speaking.',
};

export default function TrinityPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 16 }}>
        <p style={{ color: 'var(--foundry-success)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
          The core story
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.5rem', marginTop: 12 }}>Future-Proof Trinity</h1>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 16, marginTop: 16, lineHeight: 1.7, maxWidth: 640 }}>
          Three worlds. One journey. AI is reshaping every career — the people who thrive will create value, keep value,
          and communicate value. Foundry teaches all three through real missions.
        </p>
        <TrinityHub />
        <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/future-proof" style={{ padding: '14px 24px', background: 'var(--foundry-success-bg)', borderRadius: 6, color: 'var(--foundry-text)', fontSize: 14, textDecoration: 'none' }}>
            Which world should I start? →
          </Link>
          <Link href="/my-journey" style={{ padding: '14px 24px', border: '1px solid var(--foundry-border-subtle)', borderRadius: 6, color: 'var(--foundry-text-muted)', fontSize: 14, textDecoration: 'none' }}>
            My journey
          </Link>
        </div>
      </section>
    </main>
  );
}
