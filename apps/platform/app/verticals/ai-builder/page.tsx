import Link from 'next/link';
import { AI_BUILDER_DOMAIN_BLUEPRINT, PASS_016_PRINCIPLE } from '@foundry/domain-blueprint';
import { loadPass016Verification } from '../../../lib/ai-builder-verification';

export const dynamic = 'force-dynamic';

export default async function AiBuilderVerticalPage() {
  const { blueprint, loop, complete } = await loadPass016Verification();
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
      <p
        style={{
          color: '#6B9B6B',
          fontSize: 11,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginTop: 16,
        }}
      >
        ai-builder.foundryos.com · Life Leverage Domain
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{bp.display_name}</h1>
      <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{PASS_016_PRINCIPLE}</p>
      <p style={{ color: complete ? '#6B9B6B' : '#C8A96E', fontSize: 12, marginTop: 8 }}>
        Domain proof: {complete ? 'OPERATIONAL' : 'IN PROGRESS'} —{' '}
        <Link href="/ai-builder" style={{ color: '#6B6B70' }}>
          /ai-builder
        </Link>
        {' · '}
        <Link href="/future-proof" style={{ color: '#6B6B70' }}>
          /future-proof
        </Link>
      </p>

      <section style={{ marginTop: 32, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Trinity question</h2>
        <p style={{ color: '#E8E8EC', fontSize: 18, marginTop: 12 }}>How do I create value?</p>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, lineHeight: 1.7 }}>{bp.care_reason}</p>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>What can they become?</h2>
        <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 16 }}>{bp.outcome.display_name}</p>
        <div style={{ marginTop: 20 }}>
          {bp.mastery_levels.map((level, i) => (
            <span key={level.slug} style={{ fontSize: 13, color: '#8A8A8E' }}>
              {i > 0 && <span style={{ color: '#4A4A4E', margin: '0 6px' }}>→</span>}
              <span style={{ color: i === 0 ? '#6B9B6B' : '#E8E8EC' }}>{level.display_name}</span>
            </span>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Evidence-backed projects</h2>
        <div style={{ marginTop: 16 }}>
          {bp.projects.map((project, i) => (
            <div key={project.slug} style={{ padding: '12px 0', borderBottom: '1px solid #1A1A1E', fontSize: 14 }}>
              <span style={{ color: i === 0 ? '#6B9B6B' : '#E8E8EC' }}>{project.display_name}</span>
              {i === 0 && loop && (
                <span style={{ color: '#6B9B6B', marginLeft: 12, fontSize: 12 }}>← active first project</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Community</h2>
        <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 16 }}>{bp.community.display_name}</p>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>
          Ship projects together — feedback, accountability, shared mastery.
        </p>
      </section>
    </main>
  );
}
