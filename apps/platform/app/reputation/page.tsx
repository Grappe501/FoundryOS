import Link from 'next/link';
import {
  MASTERY_PRINCIPLE,
  PASS_013_CHAIN,
  PASS_013_REPUTATION_EXIT,
  PASS_013_REPUTATION_TITLE,
  REPUTATION_PRINCIPLE,
} from '@foundry/reputation-engine';
import { loadPass013ReputationVerification } from '../../lib/reputation-verification';

export const dynamic = 'force-dynamic';

export default async function ReputationProofPage() {
  const verification = await loadPass013ReputationVerification();
  const { evidence, record, checklist, complete, chain, db } = verification;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <p style={{ color: '#8B4545', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 16 }}>
        PASS-013 · exit criteria
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{PASS_013_REPUTATION_TITLE}</h1>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 8 }}>{PASS_013_REPUTATION_EXIT}</p>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 12, marginTop: 8 }}>
        {REPUTATION_PRINCIPLE} · {MASTERY_PRINCIPLE}
      </p>
      <p style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 6 }}>{chain}</p>

      <section style={{ marginTop: 28, padding: 24, background: 'var(--foundry-surface)', border: `1px solid ${complete ? 'var(--foundry-success-bg)' : 'var(--foundry-border-warm)'}`, borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Verification Checklist</h2>
        <div style={{ marginTop: 16 }}>
          {checklist.map((step) => (
            <div key={step.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 14 }}>
              <span>{step.label}</span>
              <span style={{ color: step.complete ? 'var(--foundry-success)' : '#8B4545' }}>{step.complete ? '✓' : '—'}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>Reputation Engine</p>
          <p style={{ color: complete ? 'var(--foundry-success)' : 'var(--foundry-primary)', fontSize: 20, fontWeight: 300, marginTop: 8 }}>
            {complete ? 'OPERATIONAL' : 'INCOMPLETE'}
          </p>
        </div>
        <p style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 16, textAlign: 'center' }}>
          Database: {db.persisted ? 'persisted ✓' : `in-memory only${db.error ? ` (${db.error})` : ''}`}
        </p>
      </section>

      {record && (
        <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface)', borderRadius: 8 }}>
          <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Reputation Assigned</h2>
          <p style={{ color: 'var(--foundry-text)', fontSize: 18, marginTop: 12 }}>{record.reputation_title}</p>
          <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.8, color: 'var(--foundry-text-muted)' }}>
            <div>Scope: {record.scope} · Trust weight: {record.trust_weight}%</div>
            <div>Domain: {record.domain_slug ?? '—'}</div>
            <div style={{ marginTop: 8, color: 'var(--foundry-text)' }}>{record.identity_impact}</div>
          </div>
        </section>
      )}

      {evidence && (
        <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
          <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Source Evidence</h2>
          <p style={{ color: 'var(--foundry-text)', marginTop: 12 }}>{evidence.title}</p>
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>
            Tier: {evidence.tier} · Status: {evidence.verification_status}
          </p>
        </section>
      )}

      <section style={{ marginTop: 32, fontSize: 12, color: 'var(--foundry-text-dim)' }}>
        <p>
          Evidence: <Link href="/evidence" style={{ color: 'var(--foundry-text-faint)' }}>/evidence</Link>
          {' · '}
          Mastery: <Link href="/mastery" style={{ color: 'var(--foundry-text-faint)' }}>/mastery</Link>
        </p>
        <p style={{ marginTop: 8 }}>Not points · not XP · not badges-for-clicking.</p>
      </section>
    </main>
  );
}
