import Link from 'next/link';
import {
  BOURBON_ACTION_SLUG,
  BOURBON_ASSET_SLUG,
  BOURBON_COMMUNITY_SLUG,
  PASS_014_NOT_DELIVERABLE,
  PASS_014_TITLE,
} from '@foundry/domain-blueprint';
import { loadPass014Verification } from '../../lib/bourbon-verification';

export const dynamic = 'force-dynamic';

export default async function BourbonDomainProofPage() {
  const verification = await loadPass014Verification();
  const { blueprint, loop, identity, checklist, complete, narrative, passGate, principle, db } =
    verification;

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
        ← Mission Control
      </Link>
      <p
        style={{
          color: '#8B4545',
          fontSize: 11,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginTop: 16,
        }}
      >
        {PASS_014_TITLE} · first domain instance
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Domain Proof — Bourbon</h1>
      <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 8 }}>{passGate}</p>
      <p style={{ color: '#8A8A8E', fontSize: 12, marginTop: 8 }}>{principle}</p>
      <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 8 }}>
        Not deliverable: {PASS_014_NOT_DELIVERABLE.join(' · ')}
      </p>

      <section
        style={{
          marginTop: 28,
          padding: 24,
          background: '#0F0F12',
          border: `1px solid ${complete ? '#2A4A2A' : '#2A2520'}`,
          borderRadius: 8,
        }}
      >
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Verification Checklist</h2>
        <div style={{ marginTop: 16 }}>
          {checklist.map((step) => (
            <div
              key={step.key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid #1A1A1E',
                fontSize: 14,
              }}
            >
              <span style={{ color: '#E8E8EC' }}>{step.label}</span>
              <span style={{ color: step.complete ? '#6B9B6B' : '#8B4545' }}>
                {step.complete ? '✓' : '—'}
              </span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>Domain Proof</p>
          <p
            style={{
              color: complete ? '#6B9B6B' : '#C8A96E',
              fontSize: 20,
              fontWeight: 300,
              marginTop: 8,
              letterSpacing: '0.1em',
            }}
          >
            {complete ? 'OPERATIONAL' : 'INCOMPLETE'}
          </p>
        </div>
        <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 16, textAlign: 'center' }}>
          Database: {db.persisted ? 'persisted ✓' : `in-memory only${db.error ? ` (${db.error})` : ''}`}
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Domain Blueprint</h2>
        <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 12 }}>{blueprint.display_name}</p>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{blueprint.care_reason}</p>
        <div style={{ marginTop: 16, fontSize: 13, lineHeight: 1.8, color: '#8A8A8E' }}>
          <div>
            Outcome: <span style={{ color: '#E8E8EC' }}>{blueprint.outcome.display_name}</span>
          </div>
          <div>
            Path tiers:{' '}
            {blueprint.mastery_levels.map((l) => l.display_name).join(' → ')}
          </div>
        </div>
      </section>

      {loop && (
        <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', borderRadius: 8 }}>
          <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Demo User Transformation Loop</h2>
          <div style={{ marginTop: 16, fontSize: 13, lineHeight: 1.9, color: '#8A8A8E' }}>
            <div>
              Goal: <span style={{ color: '#E8E8EC' }}>{loop.goal}</span>
            </div>
            <div>
              Path: <span style={{ color: '#E8E8EC' }}>{loop.path_display_name}</span>
            </div>
            <div>
              Project: <span style={{ color: '#E8E8EC' }}>{loop.project_display_name}</span>
            </div>
            <div>
              Action: <span style={{ color: '#E8E8EC' }}>{loop.action_text}</span>
            </div>
            <div>
              Evidence: <span style={{ color: '#6B9B6B' }}>Blind tasting completed</span>
            </div>
            <div>
              Insight: <span style={{ color: '#E8E8EC' }}>{loop.insight}</span>
            </div>
            <div>
              Next: <span style={{ color: '#C8A96E' }}>{loop.next_action}</span>
            </div>
          </div>
        </section>
      )}

      <section
        style={{
          marginTop: 24,
          padding: 20,
          background: '#111114',
          borderRadius: 8,
          border: '1px solid #2A2520',
        }}
      >
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Cross-Domain Identity</h2>
        {identity?.identity_titles && identity.identity_titles.length > 0 ? (
          <>
            <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {identity.identity_titles.map((title) => (
                <span
                  key={title}
                  style={{
                    padding: '8px 14px',
                    background: '#0F0F12',
                    border: '1px solid #2A2520',
                    borderRadius: 6,
                    fontSize: 14,
                    color: '#E8E8EC',
                  }}
                >
                  {title}
                </span>
              ))}
            </div>
            {identity.cross_domain_summary && (
              <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 16, lineHeight: 1.6 }}>
                {identity.cross_domain_summary}
              </p>
            )}
          </>
        ) : (
          <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 12 }}>Identity snapshot pending persistence.</p>
        )}
      </section>

      <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Success Test</h2>
        <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 12, textTransform: 'uppercase' }}>
          Start
        </p>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 6, fontStyle: 'italic' }}>
          &ldquo;{narrative.start}&rdquo;
        </p>
        <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 16, textTransform: 'uppercase' }}>
          End
        </p>
        <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 6 }}>{narrative.end}</p>
      </section>

      <section style={{ marginTop: 32, fontSize: 12, color: '#4A4A4E' }}>
        <p>
          Vertical context:{' '}
          <Link href="/verticals/bourbon" style={{ color: '#6B6B70' }}>
            /verticals/bourbon
          </Link>
        </p>
        <p style={{ marginTop: 8 }}>
          Action: {BOURBON_ACTION_SLUG} · Collection: {BOURBON_ASSET_SLUG} · Community:{' '}
          {BOURBON_COMMUNITY_SLUG}
        </p>
        <p style={{ marginTop: 8 }}>
          HPI chain:{' '}
          <Link href="/loop" style={{ color: '#6B6B70' }}>
            /loop
          </Link>
          {' · '}
          <Link href="/evidence" style={{ color: '#6B6B70' }}>
            /evidence
          </Link>
          {' · '}
          <Link href="/collections" style={{ color: '#6B6B70' }}>
            /collections
          </Link>
          {' · '}
          <Link href="/community" style={{ color: '#6B6B70' }}>
            /community
          </Link>
          {' · '}
          <Link href="/reputation" style={{ color: '#6B6B70' }}>
            /reputation
          </Link>
          {' · '}
          <Link href="/mastery" style={{ color: '#6B6B70' }}>
            /mastery
          </Link>
        </p>
      </section>
    </main>
  );
}
