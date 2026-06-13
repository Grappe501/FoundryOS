'use client';

import Link from 'next/link';
import { LEVEL_2_TOOLS, LEVEL_2_LESSON_LINK, LEVEL_1_BACK_LINK } from '../../../lib/bourbon-level-2/hub';
import { BourbonDeepToolCard } from '../BourbonDeepToolCard';
import { getLevel2Progress } from '../../../lib/bourbon-level-2/storage';
import { useEffect, useState } from 'react';

const ACCENT = 'var(--foundry-primary)';

export function Level2Hub({ toolsOnly = false }: { toolsOnly?: boolean }) {
  const sorted = [...LEVEL_2_TOOLS].sort((a, b) => a.priority - b.priority);
  const taste = sorted.filter((t) => t.category === 'taste');
  const compare = sorted.filter((t) => t.category === 'compare');
  const practice = sorted.filter((t) => t.category === 'practice');
  const learn = sorted.filter((t) => t.category === 'learn');

  const [progress, setProgress] = useState({ flights: 0, grids: 0, ready: false });

  useEffect(() => {
    const p = getLevel2Progress();
    setProgress({ flights: p.flightsCompleted.length, grids: p.gridsCompleted.length, ready: p.checkpointReady });
  }, []);

  return (
    <div>
      {!toolsOnly && (
        <section style={{ marginTop: 0, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
          <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>Confident Taster</p>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.65 }}>
            Level 2 is where vocabulary meets the glass — mash bills, categories, comparison grids, and flights that teach cause and effect. No syllabus guilt: pick one flight tonight.
          </p>
          {progress.ready ? (
            <p style={{ color: ACCENT, fontSize: 13, marginTop: 12, marginBottom: 0 }}>
              Checkpoint ready — submit Level 2 academy evidence →
              <Link href="/bourbon/academy/level-2-checkpoint" style={{ color: ACCENT, marginLeft: 6 }}>Open checkpoint</Link>
            </p>
          ) : (
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12, marginBottom: 0 }}>
              Progress: {progress.flights} flight{progress.flights !== 1 ? 's' : ''} · {progress.grids} grid{progress.grids !== 1 ? 's' : ''} — complete 2 flights + 1 grid for checkpoint hint.
            </p>
          )}
        </section>
      )}

      <ToolSection title="Taste — guided flights" tools={taste} />
      <ToolSection title="Compare — hold one variable" tools={compare} />
      <ToolSection title="Practice — build palate habit" tools={practice} />
      <ToolSection title="Learn — category literacy" tools={learn} />

      <section style={{ marginTop: 40, padding: 20, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, margin: 0 }}>{LEVEL_2_LESSON_LINK.label}</p>
        <Link href={LEVEL_2_LESSON_LINK.href} style={{ color: ACCENT, fontSize: 14, marginTop: 8, display: 'inline-block' }}>
          {LEVEL_2_LESSON_LINK.sub} →
        </Link>
        <span style={{ color: 'var(--foundry-text-dim)', margin: '0 8px' }}>·</span>
        <Link href={LEVEL_1_BACK_LINK.href} style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>
          {LEVEL_1_BACK_LINK.label}
        </Link>
      </section>
    </div>
  );
}

function ToolSection({ title, tools }: { title: string; tools: typeof LEVEL_2_TOOLS }) {
  if (tools.length === 0) return null;
  return (
    <section style={{ marginTop: 32 }}>
      <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
        {title}
      </h2>
      <div style={{ marginTop: 14, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {tools.map((t) => (
          <BourbonDeepToolCard key={t.slug} tool={t} />
        ))}
      </div>
    </section>
  );
}
