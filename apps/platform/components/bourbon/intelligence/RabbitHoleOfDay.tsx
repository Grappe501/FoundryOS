'use client';

import Link from 'next/link';
import { getRabbitHoleOfDay } from '../../../lib/bourbon-level-1/intelligence/rabbit-hole-day';

const ACCENT = '#C8A96E';

export function RabbitHoleOfDay({ compact }: { compact?: boolean }) {
  const hole = getRabbitHoleOfDay();

  if (compact) {
    return (
      <article style={{ padding: 22, background: 'linear-gradient(135deg, #141418 0%, #0F0F12 100%)', borderRadius: 12, border: `1px dashed ${ACCENT}55` }}>
        <p style={{ color: ACCENT, fontSize: 11, margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Rabbit hole of the day</p>
        <p style={{ color: '#E8E8EC', fontSize: 18, marginTop: 10, lineHeight: 1.4 }}>{hole.title}</p>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8 }}>{hole.tease}</p>
        <Link href={hole.href} style={{ display: 'inline-block', marginTop: 14, color: ACCENT, fontSize: 14 }}>
          Five minutes — go weird →
        </Link>
      </article>
    );
  }

  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.7 }}>
        One weird thing. Not random — curated. Five minutes. Return tomorrow.
      </p>
      <article style={{ marginTop: 24, padding: 28, background: '#111114', borderRadius: 12, border: `1px solid ${ACCENT}` }}>
        <p style={{ color: '#6B6B70', fontSize: 12, margin: 0 }}>{hole.dateKey} · ~{hole.readMinutes} min</p>
        <p style={{ color: '#E8E8EC', fontSize: 22, marginTop: 12, lineHeight: 1.35, fontWeight: 300 }}>{hole.title}</p>
        <p style={{ color: ACCENT, fontSize: 15, marginTop: 12 }}>{hole.tease}</p>
        <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 16, lineHeight: 1.7 }}>{hole.body}</p>
        <Link href={hole.href} style={{ display: 'inline-block', marginTop: 20, padding: '12px 20px', borderRadius: 8, background: '#2A2520', border: `1px solid ${ACCENT}`, color: ACCENT, fontSize: 14, textDecoration: 'none' }}>
          Fall in →
        </Link>
      </article>
    </div>
  );
}
