import { POKER_PLAYGROUND_LABS } from '../../../lib/poker-world-meta';

export default function PokerPlaygroundPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Playground</h1>
      {POKER_PLAYGROUND_LABS.map((lab) => (
        <article key={lab.slug} style={{ padding: 24, marginTop: 12, background: 'var(--foundry-surface)', borderRadius: 8 }}>
          <h2 style={{ fontSize: 16, fontWeight: 400, color: 'var(--foundry-text)', margin: 0 }}>{lab.title}</h2>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>{lab.description}</p>
        </article>
      ))}
    </section>
  );
}
