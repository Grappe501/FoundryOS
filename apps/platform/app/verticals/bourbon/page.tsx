import Link from 'next/link';
import { BOURBON_DOMAIN_BLUEPRINT, PASS_014_PRINCIPLE } from '@foundry/domain-blueprint';
import { loadPass014Verification } from '../../../lib/bourbon-verification';

export const dynamic = 'force-dynamic';

export default async function BourbonVerticalPage() {
  const { blueprint, loop, complete } = await loadPass014Verification();
  const bp = blueprint ?? BOURBON_DOMAIN_BLUEPRINT;

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
          color: '#8B4545',
          fontSize: 11,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginTop: 16,
        }}
      >
        bourbon.foundryos.com · transformation context
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{bp.display_name}</h1>
      <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{PASS_014_PRINCIPLE}</p>
      <p style={{ color: complete ? '#6B9B6B' : '#C8A96E', fontSize: 12, marginTop: 8 }}>
        Domain proof: {complete ? 'OPERATIONAL' : 'IN PROGRESS'} —{' '}
        <Link href="/bourbon" style={{ color: '#6B6B70' }}>
          /bourbon
        </Link>
      </p>

      <section style={{ marginTop: 32, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Why should someone care?</h2>
        <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 16, lineHeight: 1.7 }}>
          {bp.care_reason}
        </p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 12 }}>
          Not an encyclopedia. Not reviews. A lifelong identity domain where taste, history, and
          community compound over decades.
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>What can they become?</h2>
        <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 16 }}>{bp.outcome.display_name}</p>
        <div style={{ marginTop: 20 }}>
          <p style={{ color: '#6B6B70', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Mastery path
          </p>
          <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {bp.mastery_levels.map((level, i) => (
              <span key={level.slug} style={{ fontSize: 13, color: '#8A8A8E' }}>
                {i > 0 && <span style={{ color: '#4A4A4E', margin: '0 6px' }}>→</span>}
                <span style={{ color: i === 1 ? '#C8A96E' : '#E8E8EC' }}>{level.display_name}</span>
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <p style={{ color: '#6B6B70', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Roles
          </p>
          <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{bp.roles.join(' · ')}</p>
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>What projects can they complete?</h2>
        <div style={{ marginTop: 16 }}>
          {bp.projects.map((project, i) => (
            <div
              key={project.slug}
              style={{
                padding: '12px 0',
                borderBottom: i < bp.projects.length - 1 ? '1px solid #1A1A1E' : undefined,
                fontSize: 14,
              }}
            >
              <span style={{ color: i === 0 ? '#C8A96E' : '#E8E8EC' }}>{project.display_name}</span>
              {i === 0 && loop && (
                <span style={{ color: '#6B9B6B', marginLeft: 12, fontSize: 12 }}>
                  ← Demo User active project
                </span>
              )}
            </div>
          ))}
        </div>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 16 }}>
          Personal Knowledge Asset:{' '}
          <span style={{ color: '#E8E8EC' }}>{bp.collection.display_name}</span>
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>What community can they join?</h2>
        <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 16 }}>{bp.community.display_name}</p>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>
          Shared mastery — members, projects, tastings, and evidence. Not just social.
        </p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 12 }}>
          Region: Central Arkansas · Type: {bp.community.community_type}
        </p>
      </section>

      <section style={{ marginTop: 32, padding: 20, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
        <p style={{ color: '#6B6B70', fontSize: 11, margin: 0, textTransform: 'uppercase' }}>
          Factory note
        </p>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, lineHeight: 1.7 }}>
          This page is populated from the Domain Blueprint — the same template that will manufacture
          Poker, Public Speaking, Physics, AI Builder, Master Gardener, and every future domain.
          Bourbon is the first instance, not a special case.
        </p>
      </section>
    </main>
  );
}
