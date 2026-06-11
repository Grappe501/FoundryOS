import Link from 'next/link';
import {
  AI_BUILDER_ACTION_SLUG,
  AI_BUILDER_ASSET_SLUG,
  AI_BUILDER_COMMUNITY_SLUG,
  AI_BUILDER_DOMAIN_BLUEPRINT,
  PASS_016_NOT_DELIVERABLE,
  PASS_016_PRINCIPLE,
} from '@foundry/domain-blueprint';
import { loadPass016Verification } from '../../../lib/ai-builder-verification';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'AI Builder — Domain Proof (Internal)',
  description: 'Operator domain proof dashboard — not consumer-facing.',
};

export default async function AiBuilderVerticalPage() {
  const verification = await loadPass016Verification();
  const {
    blueprint,
    loop,
    identity,
    checklist,
    complete,
    narrative,
    firstProject,
    passGate,
    principle,
    title,
    db,
  } = verification;
  const bp = blueprint ?? AI_BUILDER_DOMAIN_BLUEPRINT;

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
      <Link href="/verticals" style={{ color: '#6B6B70', fontSize: 13 }}>
        ← Vertical Domains
      </Link>
      <p style={{ color: '#8B4545', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 16 }}>
        Internal · Domain Proof
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{bp.display_name}</h1>
      <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{PASS_016_PRINCIPLE}</p>
      <p style={{ color: complete ? '#6B9B6B' : '#C8A96E', fontSize: 12, marginTop: 8 }}>
        Domain proof: {complete ? 'OPERATIONAL' : 'IN PROGRESS'} — consumer world:{' '}
        <Link href="/ai-builder" style={{ color: '#6B9B6B' }}>
          /ai-builder
        </Link>
      </p>

      <section style={{ marginTop: 32, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Trinity question</h2>
        <p style={{ color: '#E8E8EC', fontSize: 18, marginTop: 12 }}>How do I create value?</p>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, lineHeight: 1.7 }}>{bp.care_reason}</p>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8, border: '1px solid #1A1A1E' }}>
        <p style={{ color: '#4A4A4E', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
          {title}
        </p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{passGate}</p>
        <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 4 }}>{principle}</p>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: '20px 0 0' }}>HPI Verification</h2>
        <div style={{ marginTop: 12 }}>
          {checklist.map((step) => (
            <div
              key={step.key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid #1A1A1E',
                fontSize: 13,
              }}
            >
              <span>{step.label}</span>
              <span style={{ color: step.complete ? '#6B9B6B' : '#8B4545' }}>{step.complete ? '✓' : '—'}</span>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: complete ? '#6B9B6B' : '#C8A96E', fontSize: 18, fontWeight: 300, marginTop: 20 }}>
          {complete ? 'OPERATIONAL' : 'INCOMPLETE'}
        </p>
        <p style={{ color: '#4A4A4E', fontSize: 11, textAlign: 'center' }}>
          Database: {db.persisted ? 'persisted ✓' : `in-memory${db.error ? ` (${db.error})` : ''}`}
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>First project</h2>
        <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 12 }}>{firstProject.display_name}</p>
      </section>

      {loop && (
        <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', borderRadius: 8 }}>
          <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Demo transformation loop</h2>
          <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.9, color: '#8A8A8E' }}>
            <div>
              Project: <span style={{ color: '#E8E8EC' }}>{loop.project_display_name}</span>
            </div>
            <div>
              Evidence: <span style={{ color: '#6B9B6B' }}>Project completed</span>
            </div>
            <div>
              Next: <span style={{ color: '#E8E8EC' }}>{loop.next_action}</span>
            </div>
          </div>
        </section>
      )}

      <section style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Success test</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, fontStyle: 'italic' }}>&ldquo;{narrative.start}&rdquo;</p>
        <p style={{ color: '#E8E8EC', fontSize: 13, marginTop: 12 }}>{narrative.end}</p>
      </section>

      {identity?.identity_titles && identity.identity_titles.length > 0 && (
        <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', borderRadius: 8 }}>
          <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Cross-domain identity</h2>
          <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {identity.identity_titles.map((t) => (
              <span key={t} style={{ padding: '6px 12px', background: '#111114', borderRadius: 4, fontSize: 13 }}>
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: 32, fontSize: 12, color: '#4A4A4E' }}>
        <p>
          Not: {PASS_016_NOT_DELIVERABLE.join(' · ')}
        </p>
        <p style={{ marginTop: 8 }}>
          {AI_BUILDER_ACTION_SLUG} · {AI_BUILDER_ASSET_SLUG} · {AI_BUILDER_COMMUNITY_SLUG}
        </p>
      </section>
    </main>
  );
}
