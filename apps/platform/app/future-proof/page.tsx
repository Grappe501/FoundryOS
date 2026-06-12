import Link from 'next/link';
import { ConsumerNav } from '../../components/ConsumerNav';
import { FutureProofAssessment } from '../../components/FutureProofAssessment';
import { TrinityHub } from '../../components/trinity/TrinityHub';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';

export const metadata = {
  title: 'Build Future-Proof Skills | Foundry',
  description:
    'Create value · Communicate value · Keep value. AI Builder, Financial Independence, and Public Speaking — one transformation platform.',
};

export default async function FutureProofPage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string; choose?: string }>;
}) {
  const params = await searchParams;
  const choosePath = params?.choose;

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--foundry-bg)',
        color: 'var(--foundry-text)',
        padding: '2rem',
        maxWidth: 900,
        margin: '0 auto',
      }}
    >
      <ValidationPageTracker page="/future-proof" />
      <ConsumerNav />
      <FutureProofAssessment choosePath={choosePath} />
      <section style={{ marginTop: 32 }}>
        <TrinityHub compact />
        <Link href="/trinity" style={{ display: 'inline-block', marginTop: 16, color: 'var(--foundry-success)', fontSize: 14, textDecoration: 'none' }}>
          Learn about the Trinity →
        </Link>
      </section>
    </main>
  );
}
