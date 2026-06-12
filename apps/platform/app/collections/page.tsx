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
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <p style={{ color: '#8B4545', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 16 }}>
        PASS-012 · exit criteria
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{PASS_012_COLLECTIONS_TITLE}</h1>
      <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 8 }}>{PASS_012_COLLECTIONS_EXIT}</p>
      <p style={{ color: '#8A8A8E', fontSize: 12, marginTop: 8 }}>
        {COLLECTION_PRINCIPLE.headline} — {COLLECTION_PRINCIPLE.rule}
      </p>

      <section style={{ marginTop: 28, padding: 24, background: '#0F0F12', border: `1px solid ${complete ? '#2A4A2A' : '#2A2520'}`, borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Verification Checklist</h2>
        <div style={{ marginTop: 16 }}>
          {checklist.map((step) => (
            <div key={step.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1A1A1E', fontSize: 14 }}>
              <span style={{ color: '#E8E8EC' }}>{step.label}</span>
              <span style={{ color: step.complete ? '#6B9B6B' : '#8B4545' }}>{step.complete ? '✓' : '—'}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>Personal Knowledge Assets</p>
          <p style={{ color: complete ? '#6B9B6B' : 'var(--foundry-primary)', fontSize: 20, fontWeight: 300, marginTop: 8, letterSpacing: '0.1em' }}>
            {complete ? 'OPERATIONAL' : 'INCOMPLETE'}
          </p>
        </div>
        <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 16, textAlign: 'center' }}>
          Database: {db.persisted ? 'persisted ✓' : `in-memory only${db.error ? ` (${db.error})` : ''}`}
          {identityUpdated ? ' · identity updated ✓' : ''}
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>{asset.display_name}</h2>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{asset.domain_slug} · {asset.asset_type.replace(/_/g, ' ')}</p>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>{asset.description}</p>
        <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 16 }}>{asset.identity_impact}</p>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Entities in Collection</h2>
        {items.map((item) => (
          <div key={item.entity_slug} style={{ padding: '12px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
            <div style={{ color: '#E8E8EC' }}>{item.entity_display_name}</div>
            {item.personal_rating != null && (
              <div style={{ color: '#6B6B70', marginTop: 4 }}>Rating: {item.personal_rating}/10</div>
            )}
            {item.personal_notes && (
              <div style={{ color: '#8A8A8E', marginTop: 4 }}>{item.personal_notes}</div>
            )}
            {item.evidence_submission_id && (
              <div style={{ color: '#6B9B6B', marginTop: 4 }}>Evidence linked ✓</div>
            )}
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32, fontSize: 12, color: '#4A4A4E' }}>
        <p>
          Linked evidence: <Link href="/evidence" style={{ color: '#6B6B70' }}>/evidence</Link>
          {' · '}
          Transformation loop: <Link href="/loop" style={{ color: '#6B6B70' }}>/loop</Link>
          {' · '}
          Community: <Link href="/community" style={{ color: '#6B6B70' }}>/community</Link>
        </p>
        <p style={{ marginTop: 8 }}>{COLLECTION_PRINCIPLE.core_rule}</p>
      </section>
    </main>
  );
}
