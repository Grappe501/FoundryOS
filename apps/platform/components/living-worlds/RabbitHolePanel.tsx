import Link from 'next/link';
import { rabbitHolesForProducer, rabbitHolesForTerm } from '@foundry/mentor-engine';

type Props = {
  topicKey?: string;
  term?: string;
  producerSlug?: string;
  accent?: string;
};

export function RabbitHolePanel({ topicKey, term, producerSlug, accent = '#C8A96E' }: Props) {
  const holes = producerSlug
    ? rabbitHolesForProducer(producerSlug)
    : term
      ? rabbitHolesForTerm(term)
      : topicKey
        ? rabbitHolesForTerm(topicKey)
        : [];

  if (holes.length === 0) return null;

  return (
    <section style={{ marginTop: 28, padding: 22, background: '#0F0F12', borderRadius: 10, border: `1px solid ${accent}33` }}>
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
              background: '#111114',
              borderRadius: 6,
              textDecoration: 'none',
              border: '1px solid #1A1A1E',
            }}
          >
            <span style={{ color: '#E8E8EC', fontSize: 14 }}>{h.title}</span>
            <span style={{ display: 'block', color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{h.tease}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
