import Link from 'next/link';
import { FutureProofAssessment } from '../../components/FutureProofAssessment';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';
import { PASS_016_PASS_GATE } from '@foundry/domain-blueprint';
import { TRINITY_PATHS } from '../../lib/future-proof-assessment';

export const metadata = {
  title: 'Become Future-Proof | Foundry',
  description:
    'Create value · Communicate value · Keep value. AI Builder, Financial Independence, and Public Speaking — one transformation platform.',
};

export default async function FutureProofPage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string }>;
}) {
  const params = await searchParams;
  const deferred = params?.path;
  const deferredMeta =
    deferred && deferred in TRINITY_PATHS
      ? TRINITY_PATHS[deferred as keyof typeof TRINITY_PATHS]
      : null;

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#08080A',
        color: '#E8E8EC',
        padding: '2rem',
        maxWidth: 900,
        margin: '0 auto',
      }}
    >
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>
        foundryos.com
      </Link>
      <ValidationPageTracker page="/future-proof" />
      <p
        style={{
          color: '#6B9B6B',
          fontSize: 11,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginTop: 16,
        }}
      >
        PASS-016 · Foundry Trinity
      </p>
      {deferredMeta && deferred !== 'ai-builder' && (
        <section style={{ marginTop: 16, padding: 16, background: '#111114', borderRadius: 8, border: '1px solid #2A2520' }}>
          <p style={{ color: '#C8A96E', fontSize: 14, margin: 0 }}>
            {deferredMeta.label} — PASS-{deferred === 'financial-independence' ? '017' : '018'} coming next
          </p>
          <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>
            Same Life Leverage pattern: evidence-backed projects, not content.{' '}
            <Link href="/ai-builder" style={{ color: '#6B9B6B' }}>
              Start with AI Builder now →
            </Link>
          </p>
        </section>
      )}
      <FutureProofAssessment />
      <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 32, lineHeight: 1.6 }}>
        Pass gate: {PASS_016_PASS_GATE}
      </p>
    </main>
  );
}
