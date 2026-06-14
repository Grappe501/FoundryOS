'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TASTING_PROGRAM_WEEKS, getProgramWeek } from '../../../lib/bourbon-level-2/tasting-program';
import { markProgramWeekComplete, getLevel2Progress } from '../../../lib/bourbon-level-2/storage';

const ACCENT = 'var(--foundry-primary)';

type Props = { initialWeek?: number };

export function TastingProgramTool({ initialWeek }: Props) {
  const [activeWeek, setActiveWeek] = useState(initialWeek ?? 1);
  const week = getProgramWeek(activeWeek) ?? TASTING_PROGRAM_WEEKS[0];
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    setCompletedWeeks(getLevel2Progress().programWeeksCompleted);
  }, [justCompleted]);

  function handleWeekComplete() {
    markProgramWeekComplete(week.week);
    setJustCompleted(true);
  }

  const progressPct = Math.round((completedWeeks.length / 8) * 100);

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Eight-week Confident Taster arc — mash bill to host night to checkpoint. Mark weeks complete when homework is done.
      </p>

      <div style={{ marginTop: 16, padding: 14, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--foundry-text-faint)' }}>Program progress</span>
          <span style={{ fontSize: 13, color: ACCENT }}>{completedWeeks.length}/8 weeks · {progressPct}%</span>
        </div>
        <div style={{ height: 6, background: 'var(--foundry-surface-raised)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progressPct}%`, background: ACCENT, borderRadius: 3, transition: 'width 0.3s' }} />
        </div>
      </div>

      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {TASTING_PROGRAM_WEEKS.map((w) => {
          const done = completedWeeks.includes(w.week);
          return (
            <button
              key={w.week}
              type="button"
              onClick={() => setActiveWeek(w.week)}
              style={{
                padding: '10px 8px',
                fontSize: 11,
                borderRadius: 6,
                border: `1px solid ${activeWeek === w.week ? ACCENT : 'var(--foundry-border-subtle)'}`,
                background: done ? 'var(--foundry-surface-raised)' : 'var(--foundry-surface)',
                color: activeWeek === w.week ? ACCENT : done ? 'var(--foundry-text-muted)' : 'var(--foundry-text-faint)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {done ? '✓ ' : ''}W{w.week}
            </button>
          );
        })}
      </div>

      <section style={{ marginTop: 24, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
        <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>Week {week.week}</p>
        <h2 style={{ fontWeight: 400, fontSize: '1.35rem', marginTop: 8, marginBottom: 0 }}>{week.title}</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 10, lineHeight: 1.65 }}>{week.goal}</p>

        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 16, marginBottom: 8 }}>Homework</p>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{week.homework}</p>

        <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {week.flightId && (
            <Link href={`/bourbon/tasting-lab?flight=${week.flightId}`} style={{ color: ACCENT, fontSize: 12 }}>Flight →</Link>
          )}
          {week.gridId && (
            <Link href={`/bourbon/comparison-grid?preset=${week.gridId}`} style={{ color: ACCENT, fontSize: 12 }}>Grid →</Link>
          )}
          {week.blindId && (
            <Link href={`/bourbon/blind-flight?preset=${week.blindId}`} style={{ color: ACCENT, fontSize: 12 }}>Blind →</Link>
          )}
          {week.hostKitId && (
            <Link href={`/bourbon/host-night?kit=${week.hostKitId}`} style={{ color: ACCENT, fontSize: 12 }}>Host kit →</Link>
          )}
          <Link href={`/bourbon/academy/${week.academySlug}`} style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>Lesson →</Link>
        </div>

        <button
          type="button"
          onClick={handleWeekComplete}
          style={{
            marginTop: 20,
            padding: '10px 18px',
            fontSize: 13,
            borderRadius: 6,
            border: 'none',
            background: ACCENT,
            color: 'var(--foundry-bg)',
            cursor: 'pointer',
          }}
        >
          Mark week {week.week} complete
        </button>
      </section>
    </div>
  );
}
