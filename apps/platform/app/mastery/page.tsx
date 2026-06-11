import Link from 'next/link';
import {
  PASS_013_MASTERY_EXIT,
  PASS_013_MASTERY_TITLE,
} from '@foundry/mastery-engine';
import { MASTERY_PRINCIPLE, PASS_013_CHAIN, REPUTATION_PRINCIPLE } from '@foundry/reputation-engine';
import { loadPass013MasteryVerification } from '../../lib/mastery-verification';

export const dynamic = 'force-dynamic';

export default async function MasteryProofPage() {
  const verification = await loadPass013MasteryVerification();
  const { evidence, assignment, checklist, complete, chain, db } = verification;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <p style={{ color: '#8B4545', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 16 }}>
        PASS-013 · exit criteria
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{PASS_013_MASTERY_TITLE}</h1>
      <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 8 }}>{PASS_013_MASTERY_EXIT}</p>
      <p style={{ color: '#8A8A8E', fontSize: 12, marginTop: 8 }}>
        {REPUTATION_PRINCIPLE} · {MASTERY_PRINCIPLE}
      </p>
      <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 6 }}>{chain}</p>

      <section style={{ marginTop: 28, padding: 24, background: '#0F0F12', border: `1px solid ${complete ? '#2A4A2A' : '#2A2520'}`, borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Verification Checklist</h2>
        <div style={{ marginTop: 16 }}>
          {checklist.map((step) => (
            <div key={step.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1A1A1E', fontSize: 14 }}>
              <span>{step.label}</span>
              <span style={{ color: step.complete ? '#6B9B6B' : '#8B4545' }}>{step.complete ? '✓' : '—'}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>Mastery Engine</p>
          <p style={{ color: complete ? '#6B9B6B' : '#C8A96E', fontSize: 20, fontWeight: 300, marginTop: 8 }}>
            {complete ? 'OPERATIONAL' : 'INCOMPLETE'}
          </p>
        </div>
        <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 16, textAlign: 'center' }}>
          Database: {db.persisted ? 'persisted ✓' : `in-memory only${db.error ? ` (${db.error})` : ''}`}
        </p>
      </section>

      {assignment && (
        <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', borderRadius: 8 }}>
          <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Mastery Assigned</h2>
          <p style={{ color: '#E8E8EC', fontSize: 18, marginTop: 12 }}>{assignment.mastery_title}</p>
          <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.8, color: '#8A8A8E' }}>
            <div>Path: {assignment.path_display_name}</div>
            <div>Milestone: {assignment.milestone_label}</div>
            <div>Domain: {assignment.domain_slug}</div>
            {assignment.community_instance_slug && (
              <div>Community: {assignment.community_instance_slug}
                {assignment.community_recognition_updated ? ' · recognition updated ✓' : ''}
              </div>
            )}
            <div style={{ marginTop: 8, color: '#E8E8EC' }}>{assignment.identity_impact}</div>
          </div>
        </section>
      )}

      {evidence && (
        <section style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8 }}>
          <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Demo User Success Test</h2>
          <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.8, color: '#8A8A8E' }}>
            <div>Delivered first speech ✓</div>
            <div>Evidence submitted & verified ✓</div>
            <div>Reputation: Trusted Speaker Candidate</div>
            <div>Mastery: Road to Confident Speaker — Milestone 1 Complete</div>
            <div>Identity: Public Speaker Path Progress Increased</div>
          </div>
        </section>
      )}

      <section style={{ marginTop: 32, fontSize: 12, color: '#4A4A4E' }}>
        <p>
          Reputation: <Link href="/reputation" style={{ color: '#6B6B70' }}>/reputation</Link>
          {' · '}
          Evidence: <Link href="/evidence" style={{ color: '#6B6B70' }}>/evidence</Link>
          {' · '}
          Community: <Link href="/community" style={{ color: '#6B6B70' }}>/community</Link>
        </p>
      </section>
    </main>
  );
}
