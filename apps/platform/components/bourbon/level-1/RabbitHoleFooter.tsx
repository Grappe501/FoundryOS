'use client';

import Link from 'next/link';
import { randomCuriosityHook } from '../../../lib/bourbon-level-1/agency';

const ACCENT = '#C8A96E';

type Props = { seed?: string; className?: string };

export function RabbitHoleFooter({ seed }: Props) {
  const hook = randomCuriosityHook(seed);

  return (
    <aside
      style={{
        marginTop: 40,
        padding: 22,
        background: 'linear-gradient(135deg, #0F0F12 0%, #141418 100%)',
        borderRadius: 10,
        border: `1px dashed ${ACCENT}44`,
      }}
    >
      <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
        Want to know something weird?
      </p>
      <Link
        href={hook.href}
        style={{ display: 'block', color: '#E8E8EC', fontSize: 15, marginTop: 10, lineHeight: 1.5, textDecoration: 'none' }}
      >
        {hook.text} →
      </Link>
    </aside>
  );
}
