import { PS_CAREERS } from '../../../lib/public-speaking-world';

export default function PsCareersPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>What careers use this?</h1>
      {PS_CAREERS.map((c) => (
        <article key={c.title} style={{ padding: 20, marginTop: 10, background: 'var(--foundry-surface)', borderRadius: 8 }}>
          <h2 style={{ fontSize: 15, fontWeight: 400, margin: 0 }}>{c.title}</h2>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>{c.connection}</p>
        </article>
      ))}
    </section>
  );
}
