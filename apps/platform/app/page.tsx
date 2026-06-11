import Link from 'next/link';
import { getDatabaseStatus } from '@foundry/db';
import { FOUNDRY_VISION_STATEMENT } from '@foundry/ownership-graph';
import {
  DEFENSIBILITY_FOCUS,
  FOUNDRY_EQUATION_FLOW,
  FOUNDRY_MISSION,
  HUMAN_POTENTIAL_INFRASTRUCTURE,
  PRIMARY_DASHBOARD_QUESTION,
} from '@foundry/outcome-engine';
import { TRANSFORMATION_PASS_GATE } from '@foundry/transformation-graph-engine';
import { DbStatusPanel } from '../components/DbStatusPanel';
import { getMissionControlStats, getPlatformAssetStory, PASSES } from '../lib/mission-control';

const platformStatLabels: Record<string, string> = {
  topics_in_registry: 'Topics',
  total_entities: 'Entities',
  total_relationships: 'Relationships',
  total_collections: 'Collections',
};

const northStarLabels: Record<string, string> = {
  transformations_in_progress: 'Transformations in Progress',
  active_transformations: 'Active Transformations',
  completed_transformations: 'Completed Transformations',
  transformation_insights_captured: 'Transformation Insights Captured',
  transformation_loop_completion_rate: 'Loop Completion Rate',
  meaningful_progress_events: 'Meaningful Progress Events',
  mentorship_connections: 'Mentorship Connections',
  projects_completed: 'Projects Completed',
  path_completion_rate: 'Path Completion Rate',
  active_paths: 'Active Paths',
  users_on_paths: 'Users on Paths',
  academy_graduates: 'Academy Graduates',
  community_leaders: 'Community Leaders',
  expert_contributors: 'Expert Contributors',
  club_hosts: 'Club Hosts',
};

export default async function MissionControlHome() {
  const [stats, dbStatus] = await Promise.all([getMissionControlStats(), getDatabaseStatus()]);
  const assets = getPlatformAssetStory(stats);
  const platformStats = Object.entries(platformStatLabels).map(([key, label]) => ({
    label,
    value: stats[key as keyof typeof stats] as number,
  }));
  const northStarStats = Object.entries(northStarLabels).map(([key, label]) => {
    const raw = stats[key as keyof typeof stats] as number;
    const value =
      key === 'path_completion_rate' || key === 'transformation_loop_completion_rate'
        ? `${Math.round(raw * 100)}%`
        : raw.toLocaleString();
    return { label, value };
  });

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC' }}>
      <header style={{ borderBottom: '1px solid #1A1A1E', padding: '1.5rem 2rem' }}>
        <p style={{ color: '#6B6B70', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>
          Mission Control
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', margin: '4px 0 0' }}>FoundryOS</h1>
        <p style={{ color: '#8A8A8E', marginTop: 8, fontSize: 14 }}>
          Living platform headquarters — not a brochure
        </p>
      </header>

      <section
        style={{
          padding: '2rem',
          maxWidth: 1100,
          margin: '0 auto',
          borderBottom: '1px solid #1A1A1E',
        }}
      >
        <p style={{ color: '#6B6B70', fontSize: 11, margin: 0, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {HUMAN_POTENTIAL_INFRASTRUCTURE.headline}
        </p>
        <p style={{ color: '#E8E8EC', fontSize: 18, fontWeight: 300, margin: '8px 0 0', lineHeight: 1.5 }}>
          {FOUNDRY_MISSION}
        </p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{FOUNDRY_EQUATION_FLOW}</p>
        {FOUNDRY_VISION_STATEMENT.lines.map((line) => (
          <p key={line} style={{ color: '#8A8A8E', fontSize: 14, margin: '6px 0 0', lineHeight: 1.6 }}>
            {line}
          </p>
        ))}
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 16 }}>
          MasterClass teaches ({FOUNDRY_VISION_STATEMENT.contrast.teaches}) · Foundry transforms ({FOUNDRY_VISION_STATEMENT.contrast.transforms})
        </p>
        <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 12, fontStyle: 'italic' }}>
          Pass gate: {TRANSFORMATION_PASS_GATE}
        </p>
        <p style={{ color: '#4A4A4E', fontSize: 10, marginTop: 6 }}>{DEFENSIBILITY_FOCUS}</p>
      </section>

      <section style={{ padding: '2rem', maxWidth: 1100, margin: '0 auto' }}>
        <DbStatusPanel status={dbStatus} />

        <div
          style={{
            marginBottom: 24,
            padding: 16,
            background: '#0F0F12',
            border: '1px solid #2A2520',
            borderRadius: 8,
            fontSize: 14,
            color: '#8A8A8E',
          }}
        >
          <span style={{ color: '#C8A96E' }}>Platform Assets</span>
          {' — '}
          Topics: {assets.topics} · Entities: {assets.entities} · Relationships: {assets.relationships} · Collections: {assets.collections}
        </div>

        <p style={{ fontSize: 11, color: '#6B6B70', marginBottom: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Platform Assets</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
          {platformStats.map((s) => (
            <div key={s.label} style={{ padding: '1rem', background: '#0F0F12', border: '1px solid #1E1E22', borderRadius: 8 }}>
              <div style={{ fontSize: 22, fontWeight: 300, color: '#C8A96E' }}>{s.value.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: '#6B6B70', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 11, color: '#6B6B70', marginBottom: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          North Star — {PRIMARY_DASHBOARD_QUESTION}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
          {northStarStats.map((s) => (
            <div key={s.label} style={{ padding: '1rem', background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
              <div style={{ fontSize: 22, fontWeight: 300, color: '#C8A96E' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#6B6B70', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: 20, background: '#0F0F12', border: '1px solid #1E1E22', borderRadius: 12 }}>
          <h2 style={{ fontSize: 14, color: '#C8A96E', fontWeight: 500, margin: 0 }}>Current State</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginTop: 16, fontSize: 13 }}>
            <div><span style={{ color: '#6B6B70' }}>Version</span><br />{stats.version}</div>
            <div><span style={{ color: '#6B6B70' }}>Last Pass</span><br />{stats.last_pass}</div>
            <div><span style={{ color: '#6B6B70' }}>Next Pass</span><br />{stats.next_pass}</div>
            <div><span style={{ color: '#6B6B70' }}>Launch Readiness</span><br />{stats.launch_readiness_pct}%</div>
            <div style={{ gridColumn: '1 / -1' }}><span style={{ color: '#6B6B70' }}>Current Focus</span><br />{stats.current_focus}</div>
          </div>
        </div>

        <nav style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/passes" style={{ color: '#C8A96E', fontSize: 14 }}>Build Journal →</Link>
          <Link href="/investors" style={{ color: '#C8A96E', fontSize: 14 }}>Investors →</Link>
          <Link href="/verticals" style={{ color: '#C8A96E', fontSize: 14 }}>Vertical Domains →</Link>
          <Link href="/architecture" style={{ color: '#C8A96E', fontSize: 14 }}>Architecture →</Link>
          <Link href="/operations" style={{ color: '#C8A96E', fontSize: 14 }}>Operations →</Link>
          <Link href="/routing" style={{ color: '#C8A96E', fontSize: 14 }}>Routing →</Link>
          <Link href="/factory" style={{ color: '#C8A96E', fontSize: 14 }}>Factory →</Link>
          <Link href="/knowledge" style={{ color: '#C8A96E', fontSize: 14 }}>Knowledge Universe →</Link>
          <Link href="/paths" style={{ color: '#C8A96E', fontSize: 14 }}>Road to Expert →</Link>
          <Link href="/identity" style={{ color: '#C8A96E', fontSize: 14 }}>Foundry Identity →</Link>
          <Link href="/projects" style={{ color: '#C8A96E', fontSize: 14 }}>Project Engine →</Link>
          <Link href="/community" style={{ color: '#C8A96E', fontSize: 14 }}>Community OS →</Link>
          <Link href="/legacy" style={{ color: '#C8A96E', fontSize: 14 }}>Legacy Engine →</Link>
          <Link href="/domains" style={{ color: '#C8A96E', fontSize: 14 }}>Identity Domains →</Link>
          <Link href="/university" style={{ color: '#C8A96E', fontSize: 14 }}>Foundry University →</Link>
          <Link href="/outcomes" style={{ color: '#C8A96E', fontSize: 14 }}>Human Outcomes →</Link>
          <Link href="/equation" style={{ color: '#C8A96E', fontSize: 14 }}>Foundry Equation →</Link>
          <Link href="/transformation" style={{ color: '#C8A96E', fontSize: 14 }}>Transformation Factory →</Link>
          <Link href="/loop" style={{ color: '#C8A96E', fontSize: 14, fontWeight: 500 }}>Prove the Loop (PASS-010) →</Link>
          <Link href="/transformation-graph" style={{ color: '#C8A96E', fontSize: 14 }}>Transformation Graph →</Link>
        </nav>

        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 400, marginBottom: 16 }}>Recent Passes</h2>
          {PASSES.filter((p) => p.status === 'completed').map((p) => (
            <div key={p.code} style={{ padding: '12px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
              <span style={{ color: '#C8A96E' }}>{p.code}</span>
              <span style={{ color: '#8A8A8E', margin: '0 8px' }}>—</span>
              <span>{p.title}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
