import { BBQ_PLAYGROUND_LABS } from '../../../lib/bbq-world-meta';

export default function BbqPlaygroundPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Playground</h1>
      {BBQ_PLAYGROUND_LABS.map((lab) => (
        <article key={lab.slug} style={{ padding: 24, marginTop: 12, background: '#0F0F12', borderRadius: 8 }}>
          <h2 style={{ fontSize: 16, fontWeight: 400, color: '#E8E8EC', margin: 0 }}>{lab.title}</h2>
          <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{lab.description}</p>
        </article>
      ))}
    </section>
  );
}
