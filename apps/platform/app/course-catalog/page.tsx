import Link from 'next/link';
import {
  EXPLORE_PATHS,
  EXPLORE_STATUS_COLORS,
  EXPLORE_STATUS_LABELS,
  getExplorePathHref,
  countExploreCatalogPaths,
} from '../../lib/explore-catalog';

export const metadata = {
  title: 'Course Catalog | Foundry (Operator)',
  description: 'Internal path registry — public view at /explore',
};

export default function CourseCatalogPage() {
  const sorted = [...EXPLORE_PATHS].sort((a, b) => (a.launch_rank ?? 99) - (b.launch_rank ?? 99));

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--foundry-bg)',
        color: 'var(--foundry-text)',
        padding: '2rem',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>
        ← Mission Control
      </Link>
      <p style={{ color: '#8B4545', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>
        Operator view · Public catalog at /explore
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '1.75rem', marginTop: 8 }}>Course Catalog</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>
        {countExploreCatalogPaths()} paths · launch ranks · status keys · href targets
      </p>
      <Link href="/explore" style={{ color: 'var(--foundry-success)', fontSize: 13, display: 'inline-block', marginTop: 12 }}>
        View consumer /explore →
      </Link>

      <div style={{ marginTop: 28, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--foundry-border)', color: 'var(--foundry-text-faint)', textAlign: 'left' }}>
              <th style={{ padding: '10px 8px' }}>Rank</th>
              <th style={{ padding: '10px 8px' }}>Path</th>
              <th style={{ padding: '10px 8px' }}>Outcome</th>
              <th style={{ padding: '10px 8px' }}>Status</th>
              <th style={{ padding: '10px 8px' }}>Tier</th>
              <th style={{ padding: '10px 8px' }}>Section</th>
              <th style={{ padding: '10px 8px' }}>Href</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((path) => {
              const c = EXPLORE_STATUS_COLORS[path.status];
              const href = getExplorePathHref(path);
              return (
                <tr key={path.slug} style={{ borderBottom: '1px solid var(--foundry-border-subtle)' }}>
                  <td style={{ padding: '12px 8px', color: 'var(--foundry-text-faint)' }}>{path.launch_rank ?? '—'}</td>
                  <td style={{ padding: '12px 8px', color: 'var(--foundry-text)' }}>{path.name}</td>
                  <td style={{ padding: '12px 8px', color: 'var(--foundry-text-muted)', maxWidth: 220 }}>{path.outcome}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{ color: c.text, fontSize: 11 }}>
                      {path.status} · {EXPLORE_STATUS_LABELS[path.status]}
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px', color: 'var(--foundry-text-muted)' }}>{path.tier}</td>
                  <td style={{ padding: '12px 8px', color: 'var(--foundry-text-faint)', fontSize: 11 }}>{path.section_id}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <Link href={href} style={{ color: 'var(--foundry-success)', fontSize: 12 }}>
                      {href}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
