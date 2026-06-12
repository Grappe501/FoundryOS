import Link from 'next/link';
import {
  buildJourneyStory,
  EXAMPLE_STEVE_JOURNEY,
  EXAMPLE_STEVE_JOURNEY_TIMELINE,
  getActiveProjects,
  getProjectsForVertical,
  HUMAN_OS_PRODUCT,
  LIFE_GRAPHS,
  MOBILE_HOME_QUESTION,
  PASS_GATE_QUESTION,
} from '@foundry/project-engine';

export default function ProjectsPage() {
  const bourbonProjects = getProjectsForVertical('bourbon');
  const activeProjects = getActiveProjects();
  const journeyStory = buildJourneyStory(EXAMPLE_STEVE_JOURNEY);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Project Engine</h1>
      <p style={{ color: 'var(--foundry-text-muted)', marginTop: 8, fontSize: 14 }}>
        Experts don&apos;t just learn. Experts build things. Projects transform knowledge into action.
      </p>

      <section style={{ marginTop: 28, padding: 20, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-warm)', borderRadius: 8 }}>
        <div style={{ color: 'var(--foundry-primary)', fontSize: 13 }}>The Actual Product</div>
        <p style={{ color: 'var(--foundry-text)', fontSize: 16, marginTop: 8, fontWeight: 300 }}>{HUMAN_OS_PRODUCT}</p>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12 }}>
          Mobile home: {MOBILE_HOME_QUESTION}
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Foundry Life Graph</h2>
        {LIFE_GRAPHS.map((g) => (
          <div key={g.key} style={{ padding: '10px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
            <span style={{ color: 'var(--foundry-text)' }}>{g.label}</span>
            <span style={{ color: 'var(--foundry-text-faint)', marginLeft: 8 }}>— {g.description}</span>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32, padding: 20, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-subtle)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Steve&apos;s Journey</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12, lineHeight: 1.7 }}>{journeyStory}</p>
        <p style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 12 }}>
          This story is more valuable than any AI-generated article.
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Journey Memory</h2>
        {EXAMPLE_STEVE_JOURNEY_TIMELINE.map((e) => (
          <div key={e.year} style={{ padding: '12px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
            <span style={{ color: 'var(--foundry-primary)' }}>{e.year}</span>
            <span style={{ color: 'var(--foundry-text)', marginLeft: 12 }}>{e.title}</span>
            <div style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>{e.description}</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Bourbon Projects ({bourbonProjects.length})</h2>
        {bourbonProjects.map((p) => (
          <div key={p.slug} style={{ padding: '14px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
            <div style={{ color: 'var(--foundry-text)' }}>{p.display_name}</div>
            <div style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>{p.tagline}</div>
            <div style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 4 }}>
              {p.steps.length} steps · {p.category}
              {p.path_slug && ` · advances ${p.path_slug}`}
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Catalog ({activeProjects.length} active)</h2>
        <p style={{ fontSize: 12, color: 'var(--foundry-text-dim)', marginTop: 8 }}>
          Bourbon, BBQ, Books, Genealogy, Politics — projects are nodes in the Transformation Graph. No Bourbon UI until PASS-014.
        </p>
      </section>

      <section style={{ marginTop: 32, padding: 16, background: 'var(--foundry-surface)', borderRadius: 8 }}>
        <div style={{ color: 'var(--foundry-primary)', fontSize: 13 }}>Pass Gate Question</div>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>{PASS_GATE_QUESTION}</p>
      </section>
    </main>
  );
}
