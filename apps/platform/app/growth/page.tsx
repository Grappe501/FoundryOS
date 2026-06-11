import Link from 'next/link';
import { getDomainProofKpiCounts, isSupabaseConfigured } from '@foundry/db';
import {
  FIRST_TEN_DOMAINS,
  GROWTH_NORTH_STAR,
  getGrowthKpiSnapshot,
  getLaunchCostKpiSnapshot,
  getLaunchCostSnapshot,
  GROWTH_STAT_LABELS,
  JANUARY_2027_TARGETS,
  PRODUCTION_LAUNCH,
  REVENUE_MILESTONES,
  SEO_PAGE_TYPES,
  type GrowthKpiSnapshot,
} from '../../lib/growth-os';
import { countExploreCatalogPaths } from '../../lib/explore-catalog';
import { listTrafficOpportunities } from '../../lib/opportunity-registry';
import {
  ACTIVE_DOMAIN_CRITERIA,
  GROWTH_FACTORY_FUNNEL,
} from '../../lib/growth-factory';

export const dynamic = 'force-dynamic';

function formatGrowthValue(key: keyof GrowthKpiSnapshot, value: number | null): string {
  if (value == null) return '—';
  if (key === 'mrr_usd' || key === 'cac_usd') return `$${value.toLocaleString()}`;
  if (key === 'referral_rate' || key === 'domain_activation_rate') return `${Math.round(value * 100)}%`;
  return value.toLocaleString();
}

export default async function GrowthOsPage() {
  const domainProof = isSupabaseConfigured() ? await getDomainProofKpiCounts() : null;
  const topOpportunities = listTrafficOpportunities().slice(0, 5);
  const activeDomains = Math.max(domainProof?.domain_proofs_complete ?? 0, 1);
  const domainsBuilt = Math.max(domainProof?.domain_blueprints_active ?? 0, activeDomains, 1);
  const growth = getGrowthKpiSnapshot({
    active_domains: activeDomains,
    domains_built: domainsBuilt,
    domain_activation_rate: activeDomains / domainsBuilt,
  });
  const launchCost = getLaunchCostKpiSnapshot();
  const launchCostDetail = getLaunchCostSnapshot();

  const stats = Object.entries(GROWTH_STAT_LABELS).map(([key, label]) => ({
    key: key as keyof GrowthKpiSnapshot,
    label,
    value: formatGrowthValue(key as keyof GrowthKpiSnapshot, growth[key as keyof GrowthKpiSnapshot]),
  }));

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#08080A',
        color: '#E8E8EC',
        padding: '2rem',
        maxWidth: 1000,
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
        PASS-015 · Growth Lane
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Growth OS</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8 }}>
        Customer Acquisition Infrastructure — parallel to Human Potential Infrastructure.
      </p>
      <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>
        Production launch: {PRODUCTION_LAUNCH} · Business north star: {GROWTH_NORTH_STAR}
      </p>
      <p style={{ color: '#6B9B6B', fontSize: 12, marginTop: 8 }}>
        Future-Proof Academy: AI Builder · Financial Independence · Public Speaking · Civic Engagement
      </p>
      <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 8 }}>
        Growth Factory: {GROWTH_FACTORY_FUNNEL.join(' → ')}
      </p>

      <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', border: '1px solid #4A4020', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Cost To Launch A Domain — primary operational KPI</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
          Investors care about launch cost more than current domain count. Target: factory launches in &lt; 1 hour (PASS-024).
        </p>
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
          <div style={{ padding: 14, background: '#111114', borderRadius: 6 }}>
            <div style={{ fontSize: 22, fontWeight: 300, color: '#C8A96E' }}>{launchCost.avg_hours_completed ?? '—'}h</div>
            <div style={{ fontSize: 11, color: '#6B6B70', marginTop: 4 }}>Avg completed (hand-built)</div>
          </div>
          <div style={{ padding: 14, background: '#111114', borderRadius: 6 }}>
            <div style={{ fontSize: 22, fontWeight: 300, color: '#6B9B6B' }}>{launchCost.next_domain_target_hours}h</div>
            <div style={{ fontSize: 11, color: '#6B6B70', marginTop: 4 }}>Next domain target</div>
          </div>
          <div style={{ padding: 14, background: '#111114', borderRadius: 6 }}>
            <div style={{ fontSize: 22, fontWeight: 300, color: '#6B9B6B' }}>&lt; {launchCost.factory_target_hours}h</div>
            <div style={{ fontSize: 11, color: '#6B6B70', marginTop: 4 }}>Factory target</div>
          </div>
          <div style={{ padding: 14, background: '#111114', borderRadius: 6 }}>
            <div style={{ fontSize: 22, fontWeight: 300, color: launchCost.avg_automation_pct >= 80 ? '#6B9B6B' : '#C8A96E' }}>
              {launchCost.avg_automation_pct}%
            </div>
            <div style={{ fontSize: 11, color: '#6B6B70', marginTop: 4 }}>Automation (target {launchCost.factory_automation_target_pct}%+)</div>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          {launchCostDetail.entries.map((e) => (
            <div key={e.slug} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
              <span style={{ color: '#E8E8EC' }}>{e.displayName}</span>
              <span style={{ color: '#8A8A8E' }}>
                {e.hoursActual != null ? `${e.hoursActual}h actual` : e.hoursTarget != null ? `${e.hoursTarget}h target` : '—'}
                {' · '}{e.automationPct}% auto
                {e.consumerLive ? ' · live' : ''}
              </span>
            </div>
          ))}
        </div>
        <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 12 }}>
          Curve: #1 hand built → #2 mostly generated → #3 heavily generated → #10 almost entirely generated ·{' '}
          <code style={{ color: '#6B6B70' }}>npm run audit:worlds</code>
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', border: '1px solid #2A4A2A', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Exceptional Domains — Jan 2027 target: 5 + factory for 100</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
          Active ≠ built. Full HPI stack operational: {ACTIVE_DOMAIN_CRITERIA.join(' · ')}
        </p>
        <p style={{ color: '#E8E8EC', fontSize: 22, fontWeight: 300, marginTop: 12 }}>
          {growth.active_domains} active · {growth.domains_built} built · {Math.round(growth.domain_activation_rate * 100)}% activation
        </p>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
          Public catalog:{' '}
          <Link href="/explore" style={{ color: '#6B9B6B' }}>
            {growth.public_catalog_paths || countExploreCatalogPaths()} paths listed
          </Link>
          {' · '}
          <Link href="/course-catalog" style={{ color: '#6B6B70', fontSize: 12 }}>
            operator view
          </Link>
        </p>
      </section>

      <section style={{ marginTop: 28, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Growth Metrics</h2>
        <div
          style={{
            marginTop: 16,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 12,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.key}
              style={{
                padding: '1rem',
                background: '#111114',
                border: '1px solid #1E1E22',
                borderRadius: 8,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 300, color: '#C8A96E' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#6B6B70', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 16 }}>
          Analytics wiring in PASS-015. Domain count reflects domain proofs complete.
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>January 2027 Targets</h2>
        <div style={{ marginTop: 16 }}>
          {JANUARY_2027_TARGETS.map((t) => (
            <div
              key={t.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid #1A1A1E',
                fontSize: 14,
              }}
            >
              <span>{t.label}</span>
              <span style={{ color: '#C8A96E' }}>
                {t.target} · {t.deadline}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Revenue Milestones</h2>
        <div style={{ marginTop: 16 }}>
          {REVENUE_MILESTONES.map((m) => (
            <div
              key={m.period}
              style={{
                padding: '12px 0',
                borderBottom: '1px solid #1A1A1E',
                fontSize: 13,
              }}
            >
              <span style={{ color: '#E8E8EC' }}>{m.period}</span>
              <span style={{ color: '#6B6B70', margin: '0 8px' }}>—</span>
              <span style={{ color: '#C8A96E' }}>
                {m.paid_users.toLocaleString()} paid · {m.mrr} MRR
              </span>
              <p style={{ color: '#4A4A4E', fontSize: 11, margin: '4px 0 0' }}>{m.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8, border: '1px solid #2A2520' }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Traffic Opportunities (PASS-015A)</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
          Events feed permanent domains — not disposable apps. World Cup → Soccer, not World Cup App.
        </p>
        <div style={{ marginTop: 16 }}>
          {topOpportunities.map((o) => (
            <div
              key={o.slug}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid #1A1A1E',
                fontSize: 13,
              }}
            >
              <span style={{ color: '#E8E8EC' }}>
                {o.display_name} → {o.permanent_domain_name}
              </span>
              <span style={{ color: '#C8A96E' }}>{o.total_score}</span>
            </div>
          ))}
        </div>
        <Link href="/growth/opportunities" style={{ color: '#C8A96E', fontSize: 13, marginTop: 16, display: 'inline-block' }}>
          Full scorecard →
        </Link>
        <Link href="/growth/launch" style={{ color: '#C8A96E', fontSize: 13, marginTop: 16, marginLeft: 16, display: 'inline-block' }}>
          Launch Factory →
        </Link>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>First 10 Domains</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
          Identity-driven. People proudly self-identify. Market the domain — not Foundry.
        </p>
        <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 12, lineHeight: 1.8 }}>
          {FIRST_TEN_DOMAINS.map((d) => d.replace(/-/g, ' ')).join(' · ')}
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>SEO Factory — Page Types Per Domain</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
          Generated from blueprint. Not manually. 25 domains × 500 entities × 20 pages/entity → 250k+
          indexed pages.
        </p>
        <p style={{ color: '#E8E8EC', fontSize: 13, marginTop: 16 }}>
          {SEO_PAGE_TYPES.join(' · ')}
        </p>
      </section>

      <section style={{ marginTop: 32, fontSize: 12, color: '#4A4A4E' }}>
        <p>
          Marketing workspace: <code style={{ color: '#6B6B70' }}>marketing/</code> · Docs:{' '}
          <Link href="/" style={{ color: '#6B6B70' }}>
            docs/GROWTH_OS.md
          </Link>
        </p>
        <p style={{ marginTop: 8 }}>
          Platform lane: Domain Factory (domains #2–#25) runs parallel to Growth lane.
        </p>
      </section>
    </main>
  );
}
