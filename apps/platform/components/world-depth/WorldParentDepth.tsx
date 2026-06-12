import type { WorldDepthBundle } from '../../lib/world-depth/types';

type Props = {
  bundle: WorldDepthBundle;
};

export function WorldParentDepth({ bundle }: Props) {
  const p = bundle.parent;
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>{p.headline}</h1>
      <p style={{ color: bundle.accentColor, fontSize: 16, marginTop: 16, lineHeight: 1.7 }}>{p.oneLiner}</p>

      <section style={{ marginTop: 28, padding: 24, background: 'var(--foundry-surface)', borderRadius: 8, border: `1px solid ${bundle.accentColor}33` }}>
        <h2 style={{ fontSize: 14, color: bundle.accentColor, margin: 0 }}>Why this matters</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{p.whyItMatters}</p>
      </section>

      <section style={{ marginTop: 16, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-text)', margin: 0 }}>What your student builds</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{p.whatTheyBuild}</p>
      </section>

      <section style={{ marginTop: 16, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-text)', margin: 0 }}>Skills demonstrated</h2>
        <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12, paddingLeft: 20, lineHeight: 1.8 }}>
          {p.skillsDemonstrated.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 16, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-text)', margin: 0 }}>How progress is measured</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{p.howProgressMeasured}</p>
      </section>

      <section style={{ marginTop: 16, padding: 24, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-success-bg)' }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-success)', margin: 0 }}>Success after 30 days</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{p.successAfter30Days}</p>
      </section>

      {p.sections.map((section) => (
        <section key={section.title} style={{ marginTop: 16, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
          <h2 style={{ fontSize: 14, color: bundle.accentColor, margin: 0 }}>{section.title}</h2>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{section.body}</p>
        </section>
      ))}
    </section>
  );
}
