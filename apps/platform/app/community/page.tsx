import Link from 'next/link';
import {
  CENTRAL_ARKANSAS_BOURBON_SOCIETY,
  COMMUNITY_OS_CAPABILITIES,
  COMMUNITY_OS_TAGLINE,
} from '@foundry/community-engine';
import { ROLE_CATALOG } from '@foundry/ownership-graph';

export default function CommunityPage() {
  const society = CENTRAL_ARKANSAS_BOURBON_SOCIETY;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Community OS</h1>
      <p style={{ color: '#8A8A8E', marginTop: 8, fontSize: 14 }}>{COMMUNITY_OS_TAGLINE}</p>

      <section style={{ marginTop: 28, padding: 24, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
        <div style={{ fontSize: 18, fontWeight: 300 }}>{society.display_name}</div>
        <div style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{society.region} · {society.member_count} members</div>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>{society.tagline}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          {society.capabilities.map((c) => {
            const label = COMMUNITY_OS_CAPABILITIES.find((x) => x.key === c)?.label ?? c;
            return (
              <span key={c} style={{ padding: '6px 12px', background: '#111114', borderRadius: 4, fontSize: 12, color: '#C8A96E' }}>
                {label}
              </span>
            );
          })}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Community OS Capabilities</h2>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>
          A full operating system for real-world communities — not a club feature.
        </p>
        {COMMUNITY_OS_CAPABILITIES.map((c) => (
          <div key={c.key} style={{ padding: '8px 0', fontSize: 13, color: '#8A8A8E' }}>{c.label}</div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Roles by Vertical</h2>
        {Object.entries(ROLE_CATALOG).map(([vertical, roles]) => (
          <div key={vertical} style={{ padding: '12px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
            <span style={{ color: '#E8E8EC', textTransform: 'capitalize' }}>{vertical}</span>
            <span style={{ color: '#6B6B70', marginLeft: 8 }}>{roles.join(' · ')}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
