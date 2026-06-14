'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLevel2Stats } from '../../../lib/bourbon-level-2/storage';
import { LEVEL_2_STATS } from '../../../lib/bourbon-level-2/hub';

const ACCENT = 'var(--foundry-primary)';

export function Level2ProgressPanel() {
  const [stats, setStats] = useState({
    flights: 0,
    grids: 0,
    journal: 0,
    blinds: 0,
    programWeeks: 0,
    hostNights: 0,
    sessions: 0,
    checkpointReady: false,
  });

  useEffect(() => {
    setStats(getLevel2Stats());
  }, []);

  const flightPct = Math.min(100, Math.round((stats.flights / 5) * 100));
  const gridPct = Math.min(100, Math.round((stats.grids / 4) * 100));
  const programPct = Math.round((stats.programWeeks / 8) * 100);

  return (
    <section style={{ padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
      <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>Progress dashboard</p>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>
        Catalog: {LEVEL_2_STATS.flights} flights · {LEVEL_2_STATS.grids} grids · {LEVEL_2_STATS.lessons} lessons · {LEVEL_2_STATS.modules} modules
      </p>

      <div style={{ marginTop: 16, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
        <StatCell label="Flights done" value={stats.flights} sub={`${stats.sessions} sessions`} />
        <StatCell label="Grids done" value={stats.grids} />
        <StatCell label="Journal" value={stats.journal} />
        <StatCell label="Blind sessions" value={stats.blinds} />
        <StatCell label="Program weeks" value={`${stats.programWeeks}/8`} />
        <StatCell label="Host nights" value={stats.hostNights} />
      </div>

      <div style={{ marginTop: 20 }}>
        <ProgressBar label="Flights toward checkpoint (5 target)" pct={flightPct} />
        <ProgressBar label="Grids toward checkpoint (4 target)" pct={gridPct} />
        <ProgressBar label="8-week program" pct={programPct} />
      </div>

      {stats.checkpointReady ? (
        <p style={{ color: ACCENT, fontSize: 13, marginTop: 16, marginBottom: 0 }}>
          Checkpoint ready →
          <Link href="/bourbon/academy/level-2-checkpoint" style={{ color: ACCENT, marginLeft: 6 }}>Submit evidence</Link>
        </p>
      ) : (
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 16, marginBottom: 0 }}>
          Tip: 3 flights · or 2 flights + 2 grids · or 6 program weeks + 2 flights · or 2 blinds + 1 flight + 1 grid
        </p>
      )}

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <Link href="/bourbon/tasting-program" style={{ color: ACCENT, fontSize: 12 }}>8-week program →</Link>
        <Link href="/bourbon/blind-flight" style={{ color: ACCENT, fontSize: 12 }}>Blind flights →</Link>
        <Link href="/bourbon/host-night" style={{ color: ACCENT, fontSize: 12 }}>Host kits →</Link>
      </div>
    </section>
  );
}

function StatCell({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{ padding: 12, background: 'var(--foundry-surface-raised)', borderRadius: 6, border: '1px solid var(--foundry-border-subtle)' }}>
      <p style={{ margin: 0, fontSize: 11, color: 'var(--foundry-text-faint)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
      <p style={{ margin: '6px 0 0', fontSize: 22, fontWeight: 300, color: 'var(--foundry-text)' }}>{value}</p>
      {sub && <p style={{ margin: '4px 0 0', fontSize: 11, color: 'var(--foundry-text-faint)' }}>{sub}</p>}
    </div>
  );
}

function ProgressBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--foundry-text-faint)' }}>{label}</span>
        <span style={{ fontSize: 12, color: ACCENT }}>{pct}%</span>
      </div>
      <div style={{ height: 4, background: 'var(--foundry-surface-raised)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: ACCENT, borderRadius: 2 }} />
      </div>
    </div>
  );
}
