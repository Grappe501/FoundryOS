import Link from 'next/link';
import {
  AI_BUILDER_ACTION_SLUG,
  AI_BUILDER_ASSET_SLUG,
  AI_BUILDER_COMMUNITY_SLUG,
  PASS_016_NOT_DELIVERABLE,
} from '@foundry/domain-blueprint';
import { loadPass016Verification } from '../../lib/ai-builder-verification';
import { ValidationPageTracker } from '../../components/ValidationPageTracker';
import { AiBuilderProjectStart } from '../../components/AiBuilderProjectStart';
import { ConsumerNav } from '../../components/ConsumerNav';
import { ChoosePathLink } from '../../components/ChoosePathLink';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Become an AI Builder | Foundry',
  description:
    'Use AI to solve real problems. Ship projects, earn evidence, join AI Builders Circle — the Create Value path inside Become Future-Proof.',
};

export default async function AiBuilderPage() {
  const verification = await loadPass016Verification();
  const {
    blueprint,
    loop,
    identity,
    checklist,
    complete,
    narrative,
    tomorrowHook,
    firstProject,
    passGate,
    principle,
    title,
    db,
  } = verification;

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
      <ValidationPageTracker page="/ai-builder" />
      <ConsumerNav />

      {/* Stranger entry — not internal proof UI first */}
      <section style={{ marginTop: 16, padding: 28, background: '#0F0F12', border: '1px solid #2A4A2A', borderRadius: 8 }}>
        <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Create value · Life Leverage Domain
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 12 }}>{blueprint.outcome.display_name}</h1>
        <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.7 }}>{blueprint.care_reason}</p>
        <p style={{ color: '#6B9B6B', fontSize: 14, marginTop: 20, lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 400, color: '#E8E8EC' }}>Your first project: </strong>
          {firstProject.display_name}
        </p>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, fontStyle: 'italic' }}>
          Pick one real problem in your life — scheduling, research, writing, planning — and use AI to solve it this week.
        </p>
        <p style={{ color: '#6B9B6B', fontSize: 13, marginTop: 16 }}>{tomorrowHook}</p>
        <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <AiBuilderProjectStart projectName={firstProject.display_name} />
          <ChoosePathLink />
          <Link
            href="/explore"
            style={{
              padding: '12px 20px',
              border: '1px solid #1A1A1E',
              borderRadius: 6,
              fontSize: 14,
              color: '#8A8A8E',
              textDecoration: 'none',
            }}
          >
            Explore all paths
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Mastery path</h2>
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 4, fontSize: 14 }}>
          {blueprint.mastery_levels.map((level, i) => (
            <span key={level.slug} style={{ color: i === 0 ? '#6B9B6B' : '#8A8A8E' }}>
              {i > 0 && <span style={{ color: '#4A4A4E', margin: '0 8px' }}>→</span>}
              {level.display_name}
            </span>
          ))}
        </div>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: '24px 0 0' }}>Projects (evidence-backed)</h2>
        <div style={{ marginTop: 12 }}>
          {blueprint.projects.map((p, i) => (
            <div key={p.slug} style={{ padding: '10px 0', borderBottom: '1px solid #1A1A1E', fontSize: 14 }}>
              <span style={{ color: i === 0 ? '#6B9B6B' : '#E8E8EC' }}>{p.display_name}</span>
              <span style={{ color: '#4A4A4E', marginLeft: 10, fontSize: 12 }}>Evidence: Project completed</span>
            </div>
          ))}
        </div>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 16 }}>
          Collection: {blueprint.collection.display_name} · Community: {blueprint.community.display_name}
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Who this is for</h2>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
          Students, parents, young professionals, and career changers — anyone who needs to create value in an AI world,
          not consume another tutorial.
        </p>
      </section>

      {/* Operational proof — PASS-016 verification */}
      <section style={{ marginTop: 32, padding: 20, background: '#111114', borderRadius: 8, border: '1px solid #1A1A1E' }}>
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
        <p
          style={{
            textAlign: 'center',
            color: complete ? '#6B9B6B' : '#C8A96E',
            fontSize: 18,
            fontWeight: 300,
            marginTop: 20,
          }}
        >
          {complete ? 'OPERATIONAL' : 'INCOMPLETE'}
        </p>
        <p style={{ color: '#4A4A4E', fontSize: 11, textAlign: 'center' }}>
          Database: {db.persisted ? 'persisted ✓' : `in-memory${db.error ? ` (${db.error})` : ''}`}
        </p>
      </section>

      {loop && (
        <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', borderRadius: 8 }}>
          <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Demo transformation loop</h2>
          <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.9, color: '#8A8A8E' }}>
            <div>Project: <span style={{ color: '#E8E8EC' }}>{loop.project_display_name}</span></div>
            <div>Evidence: <span style={{ color: '#6B9B6B' }}>Project completed</span></div>
            <div>Next: <span style={{ color: '#E8E8EC' }}>{loop.next_action}</span></div>
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
          Vertical:{' '}
          <Link href="/verticals/ai-builder" style={{ color: '#6B6B70' }}>
            /verticals/ai-builder
          </Link>
          {' · '}
          <Link href="/bourbon" style={{ color: '#6B6B70' }}>
            Bourbon proof
          </Link>
        </p>
        <p style={{ marginTop: 8 }}>
          Not: {PASS_016_NOT_DELIVERABLE.join(' · ')}
        </p>
        <p style={{ marginTop: 8 }}>
          {AI_BUILDER_ACTION_SLUG} · {AI_BUILDER_ASSET_SLUG} · {AI_BUILDER_COMMUNITY_SLUG}
        </p>
      </section>
    </main>
  );
}
