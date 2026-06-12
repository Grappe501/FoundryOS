import Link from 'next/link';
import {
  COMMUNITY_CORE_RULE,
  COMMUNITY_EXAMPLES,
  COMMUNITY_OS_CAPABILITIES,
  COMMUNITY_OS_TAGLINE,
  PASS_012_COMMUNITY_EXIT,
  PASS_012_COMMUNITY_TITLE,
} from '@foundry/community-engine';
import { loadPass012CommunityVerification } from '../../lib/community-verification';

export const dynamic = 'force-dynamic';

export default async function CommunityProofPage() {
  const verification = await loadPass012CommunityVerification();
  const { community, member, project, evidenceShare, checklist, complete, db } = verification;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <p style={{ color: '#8B4545', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 16 }}>
        PASS-012 · exit criteria
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{PASS_012_COMMUNITY_TITLE}</h1>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 8 }}>{PASS_012_COMMUNITY_EXIT}</p>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 12, marginTop: 8 }}>{COMMUNITY_OS_TAGLINE}</p>

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
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>Community OS</p>
          <p style={{ color: complete ? 'var(--foundry-success)' : 'var(--foundry-primary)', fontSize: 20, fontWeight: 300, marginTop: 8, letterSpacing: '0.1em' }}>
            {complete ? 'OPERATIONAL' : 'INCOMPLETE'}
          </p>
        </div>
        <p style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 16, textAlign: 'center' }}>
          Database: {db.persisted ? 'persisted ✓' : `in-memory only${db.error ? ` (${db.error})` : ''}`}
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-warm)', borderRadius: 8 }}>
        <div style={{ fontSize: 18, fontWeight: 300 }}>{community.display_name}</div>
        <div style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>
          {community.region} · {community.community_type} · {community.member_count} members
        </div>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12 }}>{community.tagline}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          {community.capabilities.map((c) => {
            const label = COMMUNITY_OS_CAPABILITIES.find((x) => x.key === c)?.label ?? c;
            return (
              <span key={c} style={{ padding: '6px 12px', background: 'var(--foundry-surface-raised)', borderRadius: 4, fontSize: 12, color: 'var(--foundry-primary)' }}>
                {label}
              </span>
            );
          })}
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Demo Proof</h2>
        <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.8, color: 'var(--foundry-text-muted)' }}>
          <div>Member joined: {member.user_slug} ({member.role})</div>
          <div>Project assigned: {project.project_title}</div>
          <div>Evidence shared: {evidenceShare ? '✓ linked to PASS-011 submission' : '— pending evidence'}</div>
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Same Architecture — Any Domain</h2>
        {COMMUNITY_EXAMPLES.slice(1).map((ex) => (
          <div key={ex.slug} style={{ padding: '10px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
            <span style={{ color: 'var(--foundry-text)' }}>{ex.display_name}</span>
            <span style={{ color: 'var(--foundry-text-faint)', marginLeft: 8 }}>({ex.community_type})</span>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32, fontSize: 12, color: 'var(--foundry-text-dim)' }}>
        <p>
          Collections: <Link href="/collections" style={{ color: 'var(--foundry-text-faint)' }}>/collections</Link>
          {' · '}
          Evidence: <Link href="/evidence" style={{ color: 'var(--foundry-text-faint)' }}>/evidence</Link>
          {' · '}
          Loop: <Link href="/loop" style={{ color: 'var(--foundry-text-faint)' }}>/loop</Link>
        </p>
        <p style={{ marginTop: 8 }}>{COMMUNITY_CORE_RULE}</p>
      </section>
    </main>
  );
}
