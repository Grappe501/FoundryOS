import Link from 'next/link';
import {
  DEMO_ACTION_SLUG,
  EVIDENCE_PRINCIPLE,
  EVIDENCE_TIERS,
  EVIDENCE_TIERS_PRINCIPLE,
  PASS_011_EXIT_CRITERIA,
  PASS_011_VERIFICATION_TITLE,
  tierLabel,
} from '@foundry/evidence-engine';
import { loadPass011Verification } from '../../lib/evidence-verification';

export const dynamic = 'force-dynamic';

export default async function EvidenceProofPage() {
  const verification = await loadPass011Verification();
  const { submission, guidance, checklist, complete, loopLinked, db } = verification;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <p style={{ color: '#8B4545', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 16 }}>
        PASS-011 · exit criteria
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{PASS_011_VERIFICATION_TITLE}</h1>
      <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 8 }}>{PASS_011_EXIT_CRITERIA}</p>
      <p style={{ color: '#8A8A8E', fontSize: 12, marginTop: 8 }}>
        {EVIDENCE_PRINCIPLE.chain} — {EVIDENCE_TIERS_PRINCIPLE}
      </p>

      <section style={{ marginTop: 28, padding: 24, background: '#0F0F12', border: `1px solid ${complete ? '#2A4A2A' : '#2A2520'}`, borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Verification Checklist</h2>
        <div style={{ marginTop: 16 }}>
          {checklist.map((step) => (
            <div key={step.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1A1A1E', fontSize: 14 }}>
              <span style={{ color: '#E8E8EC' }}>{step.label}</span>
              <span style={{ color: step.complete ? '#6B9B6B' : '#8B4545' }}>{step.complete ? '✓' : '—'}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>Evidence Engine</p>
          <p style={{ color: complete ? '#6B9B6B' : '#C8A96E', fontSize: 20, fontWeight: 300, marginTop: 8, letterSpacing: '0.1em' }}>
            {complete ? 'OPERATIONAL' : 'INCOMPLETE'}
          </p>
        </div>
        <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 16, textAlign: 'center' }}>
          Database: {db.persisted ? 'persisted ✓' : `in-memory only${db.error ? ` (${db.error})` : ''}`}
          {loopLinked ? ' · loop linked ✓' : ''}
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Evidence Tiers</h2>
        <div style={{ marginTop: 12 }}>
          {EVIDENCE_TIERS.map((t) => (
            <div key={t.tier} style={{ padding: '8px 0', fontSize: 13, borderBottom: '1px solid #1A1A1E' }}>
              <span style={{ color: submission.tier === t.tier ? '#C8A96E' : '#6B6B70' }}>
                {t.label}
              </span>
              <span style={{ color: '#4A4A4E' }}> — {t.example}</span>
              {submission.tier === t.tier && (
                <span style={{ color: '#6B9B6B', marginLeft: 8 }}>← Demo User</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Submitted Evidence</h2>
        <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 12 }}>{submission.title}</p>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{submission.description}</p>
        <div style={{ marginTop: 16, fontSize: 13, lineHeight: 1.8, color: '#8A8A8E' }}>
          <div>Action: {submission.action_text}</div>
          <div>Tier: {tierLabel(submission.tier)}</div>
          <div>Status: {submission.verification_status}</div>
          <div>Trust weight: {submission.trust_weight}%</div>
          {typeof submission.metadata.audience_size === 'number' && (
            <div>Audience: {submission.metadata.audience_size as number}</div>
          )}
          {typeof submission.metadata.location === 'string' && (
            <div>Location: {submission.metadata.location as string}</div>
          )}
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8, border: '1px solid #2A2520' }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Identity &amp; Next Step</h2>
        <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Identity strengthened</p>
        <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 6 }}>{guidance.identity_strength}</p>
        <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Progress signal</p>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 6 }}>{guidance.progress_signal}</p>
        <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Next step informed</p>
        <p style={{ color: '#C8A96E', fontSize: 14, marginTop: 6 }}>{guidance.next_step_influence}</p>
      </section>

      <section style={{ marginTop: 32, fontSize: 12, color: '#4A4A4E' }}>
        <p>
          Linked loop: <Link href="/loop" style={{ color: '#6B6B70' }}>/loop</Link>
          {' · '}
          Action slug: {DEMO_ACTION_SLUG}
        </p>
        <p style={{ marginTop: 8 }}>PASS-012: Collections + Communities — see <Link href="/collections" style={{ color: '#6B6B70' }}>/collections</Link> and <Link href="/community" style={{ color: '#6B6B70' }}>/community</Link>.</p>
      </section>
    </main>
  );
}
