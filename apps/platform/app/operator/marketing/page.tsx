import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { getGrowthFlywheelSnapshot, isSupabaseConfigured } from '@foundry/db';
import { REVENUE_MILESTONES } from '../../../lib/growth-os';
import { PRIMARY_MARKETING_WORLDS, MARKETING_ARTIFACTS } from '@foundry/marketing-factory';

export const dynamic = 'force-dynamic';

function repoRoot(): string {
  return path.resolve(process.cwd(), '../..');
}

function listWorldPacks(): { slug: string; artifactCount: number; complete: boolean }[] {
  const worldsDir = path.join(repoRoot(), 'marketing/worlds');
  if (!fs.existsSync(worldsDir)) return [];

  return fs
    .readdirSync(worldsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const dir = path.join(worldsDir, d.name);
      const artifactCount = MARKETING_ARTIFACTS.filter((a) => fs.existsSync(path.join(dir, a))).length;
      return { slug: d.name, artifactCount, complete: artifactCount === MARKETING_ARTIFACTS.length };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export default async function OperatorMarketingPage() {
  const packs = listWorldPacks();
  const primary = PRIMARY_MARKETING_WORLDS as readonly string[];
  const flywheel = isSupabaseConfigured() ? await getGrowthFlywheelSnapshot() : null;
  const insights = flywheel?.insight_to_marketing;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 1040, margin: '0 auto' }}>
      <Link href="/operator" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <Link href="/operator/flywheel" style={{ color: '#8B4545', fontSize: 13, marginLeft: 16 }}>Flywheel</Link>
      <Link href="/operator/business" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Business</Link>

      <p style={{ color: 'var(--foundry-primary)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>Marketing Factory + Flywheel</p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Marketing</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        Manufacture distribution — insights from PASS-030 testers auto-surface here via the Growth Flywheel.
      </p>

      {/* PASS-032 System 1 — live on marketing page */}
      <section style={{ marginTop: 24, padding: 24, background: '#0F1210', border: '1px solid #2A3A2A', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Insight → Marketing (PASS-032)</h2>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>Best converters from learning lane — promote these first</p>

        {!insights ? (
          <p style={{ color: '#4A4A4E', fontSize: 13, marginTop: 16 }}>Connect Supabase for live flywheel insights.</p>
        ) : (
          <>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {insights.best_mission && (
                <div style={{ padding: 16, background: '#111114', borderRadius: 8, border: '1px solid #4A4020' }}>
                  <div style={{ fontSize: 11, color: '#6B6B70' }}>Best converting mission</div>
                  <div style={{ fontSize: 16, color: '#E8E8EC', marginTop: 8 }}>
                    {insights.best_mission.world_slug && (
                      <span style={{ color: 'var(--foundry-primary)', fontSize: 12 }}>{insights.best_mission.world_slug} · </span>
                    )}
                    {insights.best_mission.label}
                  </div>
                  <div style={{ fontSize: 14, color: '#6B9B6B', marginTop: 8, fontWeight: 500 }}>
                    {insights.best_mission.multiplier}x higher than average
                  </div>
                  <p style={{ fontSize: 11, color: '#6B6B70', marginTop: 8 }}>→ Feature in TikTok, SEO, lead magnets</p>
                </div>
              )}
              {insights.best_world && (
                <div style={{ padding: 16, background: '#111114', borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: '#6B6B70' }}>Best converting world</div>
                  <div style={{ fontSize: 16, color: '#E8E8EC', marginTop: 8 }}>{insights.best_world.label}</div>
                  <div style={{ fontSize: 14, color: 'var(--foundry-primary)', marginTop: 8 }}>{insights.best_world.multiplier}x vs average</div>
                </div>
              )}
              {insights.best_segment && (
                <div style={{ padding: 16, background: '#111114', borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: '#6B6B70' }}>Best converting segment</div>
                  <div style={{ fontSize: 16, color: '#E8E8EC', marginTop: 8, textTransform: 'capitalize' }}>{insights.best_segment.label}</div>
                  <div style={{ fontSize: 14, color: 'var(--foundry-primary)', marginTop: 8 }}>{insights.best_segment.multiplier}x vs average</div>
                </div>
              )}
              {insights.best_lead_magnet && (
                <div style={{ padding: 16, background: '#111114', borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: '#6B6B70' }}>Best channel / lead magnet</div>
                  <div style={{ fontSize: 16, color: '#E8E8EC', marginTop: 8 }}>{insights.best_lead_magnet.label}</div>
                  <div style={{ fontSize: 14, color: 'var(--foundry-primary)', marginTop: 8 }}>{insights.best_lead_magnet.multiplier}x vs average</div>
                </div>
              )}
            </div>

            <div style={{ marginTop: 20 }}>
              <h3 style={{ fontSize: 13, color: 'var(--foundry-primary)', margin: 0 }}>Auto-recommended assets</h3>
              {insights.recommendations.map((r) => (
                <div key={r.priority} style={{ padding: '10px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
                  <span style={{ color: '#E8E8EC' }}>{r.title}</span>
                  <span style={{ color: '#6B6B70', marginLeft: 8 }}>· {r.suggested_channel}</span>
                  <span style={{ color: '#8A8A8E', display: 'block', fontSize: 12, marginTop: 2 }}>{r.reason}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <section style={{ marginTop: 24, padding: 20, background: '#12100F', border: '1px solid #3A3020', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>CLI</h2>
        <pre style={{ marginTop: 12, padding: 14, background: '#0A0A0C', borderRadius: 6, fontSize: 12, color: '#A8A8AC', overflow: 'auto' }}>
{`npm run build:marketing -- ai-builder
npm run build:marketing -- --primary
npm run audit:marketing`}
        </pre>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 14, color: '#6B9BC9', margin: 0 }}>World packs</h2>
        <div style={{ marginTop: 16 }}>
          {packs.map((p) => (
            <div key={p.slug} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
              <span>
                {p.slug}
                {primary.includes(p.slug) && <span style={{ color: 'var(--foundry-primary)', marginLeft: 8, fontSize: 11 }}>PRIMARY</span>}
              </span>
              <span style={{ color: p.complete ? '#6B9B6B' : '#C96B6B' }}>
                {p.artifactCount}/{MARKETING_ARTIFACTS.length}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 28, padding: 20, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>MRR milestones</h2>
        <div style={{ marginTop: 16 }}>
          {REVENUE_MILESTONES.slice(0, 7).map((m) => (
            <div key={m.period} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 80px', gap: 12, padding: '8px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
              <span style={{ color: '#6B6B70' }}>{m.period}</span>
              <span style={{ color: '#8A8A8E' }}>{m.note}</span>
              <span style={{ color: 'var(--foundry-primary)', textAlign: 'right' }}>{m.mrr}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
