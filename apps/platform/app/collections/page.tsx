import Link from 'next/link';
import {
  COLLECTION_PRINCIPLE,
  PASS_012_COLLECTIONS_EXIT,
  PASS_012_COLLECTIONS_TITLE,
} from '@foundry/collection-engine';
import { loadPass012CollectionsVerification } from '../../lib/collections-verification';

export const dynamic = 'force-dynamic';

export default async function CollectionsProofPage() {
  const verification = await loadPass012CollectionsVerification();
  const { asset, items, checklist, complete, identityUpdated, db } = verification;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <p style={{ color: '#8B4545', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 16 }}>
        PASS-012 · exit criteria
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{PASS_012_COLLECTIONS_TITLE}</h1>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 8 }}>{PASS_012_COLLECTIONS_EXIT}</p>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 12, marginTop: 8 }}>
        {COLLECTION_PRINCIPLE.headline} — {COLLECTION_PRINCIPLE.rule}
      </p>

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
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>Personal Knowledge Assets</p>
          <p style={{ color: complete ? 'var(--foundry-success)' : 'var(--foundry-primary)', fontSize: 20, fontWeight: 300, marginTop: 8, letterSpacing: '0.1em' }}>
            {complete ? 'OPERATIONAL' : 'INCOMPLETE'}
          </p>
        </div>
        <p style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 16, textAlign: 'center' }}>
          Database: {db.persisted ? 'persisted ✓' : `in-memory only${db.error ? ` (${db.error})` : ''}`}
          {identityUpdated ? ' · identity updated ✓' : ''}
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>{asset.display_name}</h2>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>{asset.domain_slug} · {asset.asset_type.replace(/_/g, ' ')}</p>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12 }}>{asset.description}</p>
        <p style={{ color: 'var(--foundry-text)', fontSize: 14, marginTop: 16 }}>{asset.identity_impact}</p>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Entities in Collection</h2>
        {items.map((item) => (
          <div key={item.entity_slug} style={{ padding: '12px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
            <div style={{ color: 'var(--foundry-text)' }}>{item.entity_display_name}</div>
            {item.personal_rating != null && (
              <div style={{ color: 'var(--foundry-text-faint)', marginTop: 4 }}>Rating: {item.personal_rating}/10</div>
            )}
            {item.personal_notes && (
              <div style={{ color: 'var(--foundry-text-muted)', marginTop: 4 }}>{item.personal_notes}</div>
            )}
            {item.evidence_submission_id && (
              <div style={{ color: 'var(--foundry-success)', marginTop: 4 }}>Evidence linked ✓</div>
            )}
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32, fontSize: 12, color: 'var(--foundry-text-dim)' }}>
        <p>
          Linked evidence: <Link href="/evidence" style={{ color: 'var(--foundry-text-faint)' }}>/evidence</Link>
          {' · '}
          Transformation loop: <Link href="/loop" style={{ color: 'var(--foundry-text-faint)' }}>/loop</Link>
          {' · '}
          Community: <Link href="/community" style={{ color: 'var(--foundry-text-faint)' }}>/community</Link>
        </p>
        <p style={{ marginTop: 8 }}>{COLLECTION_PRINCIPLE.core_rule}</p>
      </section>
    </main>
  );
}
