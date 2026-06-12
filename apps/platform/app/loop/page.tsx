import Link from 'next/link';
import {
  DEMO_EVIDENCE,
  DEMO_INSIGHT,
  DEMO_NEXT_ACTION,
  DEMO_REFLECTIONS,
  DEMO_USER_EXIT_MESSAGE,
  PASS_010_EXIT_CRITERIA,
  PASS_010_VERIFICATION_TITLE,
} from '@foundry/transformation-loop';
import { loadPass010Verification } from '../../lib/loop-verification';

export const dynamic = 'force-dynamic';

export default async function LoopProofPage() {
  const verification = await loadPass010Verification();
  const { record, checklist, complete, db } = verification;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <p style={{ color: '#8B4545', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 16 }}>
        PASS-010 · exit criteria
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{PASS_010_VERIFICATION_TITLE}</h1>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 8 }}>{PASS_010_EXIT_CRITERIA}</p>

      <section style={{ marginTop: 28, padding: 24, background: 'var(--foundry-surface)', border: `1px solid ${complete ? 'var(--foundry-success-bg)' : 'var(--foundry-border-warm)'}`, borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Verification Checklist</h2>
        <div style={{ marginTop: 16 }}>
          {checklist.map((step) => (
            <div key={step.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 14 }}>
              <span style={{ color: 'var(--foundry-text)' }}>{step.label}</span>
              <span style={{ color: step.complete ? 'var(--foundry-success)' : '#8B4545' }}>{step.complete ? '✓' : '—'}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>Transformation Loop</p>
          <p style={{ color: complete ? 'var(--foundry-success)' : 'var(--foundry-primary)', fontSize: 20, fontWeight: 300, marginTop: 8, letterSpacing: '0.1em' }}>
            {complete ? 'COMPLETE' : 'INCOMPLETE'}
          </p>
        </div>
        <p style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 16, textAlign: 'center' }}>
          Database: {db.persisted ? 'persisted ✓' : `in-memory only${db.error ? ` (${db.error})` : ''}`}
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Demo User</h2>
        <p style={{ color: 'var(--foundry-text)', fontSize: 15, marginTop: 12 }}>{record.user_display_name}</p>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 4 }}>Goal: {record.goal}</p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>System Assignment</h2>
        {[
          ['Outcome', record.outcome_display_name],
          ['Path', record.path_display_name],
          ['Project', record.project_display_name],
          ['Action', record.action_text],
        ].map(([label, value]) => (
          <div key={label} style={{ padding: '10px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
            <span style={{ color: 'var(--foundry-text-faint)' }}>{label}</span>
            <span style={{ color: 'var(--foundry-text)' }}> — {value}</span>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Evidence</h2>
        <div style={{ fontSize: 13, color: 'var(--foundry-text-muted)', lineHeight: 1.8 }}>
          <div>{DEMO_EVIDENCE.status}</div>
          <div>Audience size: {DEMO_EVIDENCE.audience_size}</div>
          <div>Location: {DEMO_EVIDENCE.location}</div>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Reflection</h2>
        {Object.entries(DEMO_REFLECTIONS).map(([key, value]) => (
          <div key={key} style={{ marginTop: 12, fontSize: 13 }}>
            <div style={{ color: 'var(--foundry-text-faint)', textTransform: 'capitalize' }}>{key.replace(/_/g, ' ')}</div>
            <div style={{ color: 'var(--foundry-text-muted)', marginTop: 4 }}>{value}</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Insight</h2>
        <p style={{ color: 'var(--foundry-text)', fontSize: 14, marginTop: 12 }}>{DEMO_INSIGHT}</p>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Next Best Action</h2>
        <p style={{ color: 'var(--foundry-primary)', fontSize: 15, marginTop: 12 }}>{DEMO_NEXT_ACTION.action}</p>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 12, marginTop: 12 }}>Why: {DEMO_NEXT_ACTION.why}</p>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>User Exit State</h2>
        <p style={{ color: 'var(--foundry-text)', fontSize: 16, marginTop: 12, fontStyle: 'italic' }}>&ldquo;{DEMO_USER_EXIT_MESSAGE}&rdquo;</p>
      </section>

      <section style={{ marginTop: 32, fontSize: 12, color: 'var(--foundry-text-dim)' }}>
        <p>Verify routes: <Link href="/transformation-graph" style={{ color: 'var(--foundry-text-faint)' }}>/transformation-graph</Link> · <Link href="/equation" style={{ color: 'var(--foundry-text-faint)' }}>/equation</Link></p>
        <p style={{ marginTop: 8 }}>Do not start PASS-011 · Collections · Clubs · Bourbon until this loop is deployed and verified.</p>
      </section>
    </main>
  );
}
