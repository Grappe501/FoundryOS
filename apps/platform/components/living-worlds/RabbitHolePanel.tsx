import Link from 'next/link';
import { rabbitHolesForProducer, rabbitHolesForTerm } from '@foundry/mentor-engine';

type Props = {
  topicKey?: string;
  term?: string;
  producerSlug?: string;
  accent?: string;
};

export function RabbitHolePanel({ topicKey, term, producerSlug, accent = 'var(--foundry-primary)' }: Props) {
  const holes = producerSlug
    ? rabbitHolesForProducer(producerSlug)
    : term
      ? rabbitHolesForTerm(term)
      : topicKey
        ? rabbitHolesForTerm(topicKey)
        : [];

  if (holes.length === 0) return null;

  return (
    <section style={{ marginTop: 28, padding: 22, background: 'var(--foundry-surface)', borderRadius: 10, border: `1px solid ${accent}33` }}>
      <p style={{ color: accent, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
        Rabbit holes — disappear for an hour
      </p>
      <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>
        {holes.slice(0, 5).map((h) => (
          <Link
            key={h.href + h.title}
            href={h.href}
            style={{
              display: 'block',
              padding: 14,
              background: 'var(--foundry-surface-raised)',
              borderRadius: 6,
              textDecoration: 'none',
              border: '1px solid var(--foundry-border-subtle)',
            }}
          >
            <span style={{ color: 'var(--foundry-text)', fontSize: 14 }}>{h.title}</span>
            <span style={{ display: 'block', color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>{h.tease}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
