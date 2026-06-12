'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMonthlyHunt } from '../../../lib/bourbon-level-1/intelligence/hunt-engine';
import { getHuntProgress, toggleHuntMission } from '../../../lib/bourbon-level-1/storage';

const ACCENT = 'var(--foundry-primary)';

export function BourbonHuntEngine() {
  const hunt = getMonthlyHunt();
  const [completed, setCompleted] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const p = getHuntProgress();
    if (p?.monthKey === hunt.monthKey) setCompleted(p.completed);
  }, [hunt.monthKey]);

  function toggle(id: string) {
    toggleHuntMission(hunt.monthKey, id);
    const p = getHuntProgress();
    setCompleted(p?.monthKey === hunt.monthKey ? p.completed : []);
  }

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Not inventory — hunting. Check missions off. Participate in the month.
      </p>
      <p style={{ color: ACCENT, fontSize: 13, marginTop: 12 }}>{hunt.label}</p>
      {mounted && (
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>
          {completed.length}/{hunt.missions.length} complete
        </p>
      )}
      <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
        {hunt.missions.map((m) => {
          const done = completed.includes(m.id);
          return (
            <article key={m.id} style={{ padding: 18, background: done ? '#1A1814' : 'var(--foundry-surface-raised)', borderRadius: 10, border: `1px solid ${done ? ACCENT + '44' : 'var(--foundry-border-subtle)'}` }}>
              <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
                <input type="checkbox" checked={done} onChange={() => toggle(m.id)} style={{ marginTop: 4, accentColor: ACCENT }} />
                <span>
                  <p style={{ color: 'var(--foundry-text)', fontSize: 15, margin: 0, textDecoration: done ? 'line-through' : 'none' }}>{m.title}</p>
                  <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>{m.description}</p>
                  <Link href={m.href} onClick={(e) => e.stopPropagation()} style={{ display: 'inline-block', marginTop: 10, color: ACCENT, fontSize: 12 }}>
                    Start hunt →
                  </Link>
                </span>
              </label>
            </article>
          );
        })}
      </div>
    </div>
  );
}
