'use client';

import Link from 'next/link';
import { LEVEL_2_TOOLS, LEVEL_2_LESSON_LINK, LEVEL_1_BACK_LINK, LEVEL_2_STATS } from '../../../lib/bourbon-level-2/hub';
import { LEVEL_2_MODULES } from '../../../lib/bourbon-level-2/curriculum';
import { BourbonDeepToolCard } from '../BourbonDeepToolCard';
import { getLevel2Stats } from '../../../lib/bourbon-level-2/storage';
import { useEffect, useState } from 'react';

const ACCENT = 'var(--foundry-primary)';

export function Level2Hub({ toolsOnly = false }: { toolsOnly?: boolean }) {
  const sorted = [...LEVEL_2_TOOLS].sort((a, b) => a.priority - b.priority);
  const taste = sorted.filter((t) => t.category === 'taste');
  const compare = sorted.filter((t) => t.category === 'compare');
  const practice = sorted.filter((t) => t.category === 'practice');
  const learn = sorted.filter((t) => t.category === 'learn');

  const [stats, setStats] = useState({ flights: 0, grids: 0, journal: 0, ready: false });

  useEffect(() => {
    const s = getLevel2Stats();
    setStats({ flights: s.flights, grids: s.grids, journal: s.journal, ready: s.checkpointReady });
  }, []);

  return (
    <div>
      {!toolsOnly && (
        <section style={{ marginTop: 0, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
          <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>Confident Taster</p>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.65 }}>
            {LEVEL_2_STATS.flights} tasting flights · {LEVEL_2_STATS.grids} comparison grids · {LEVEL_2_STATS.lessons} academy lessons · {LEVEL_2_STATS.modules} curriculum modules.
            Vocabulary meets the glass — mash bills, craft, finish, proof, category literacy.
          </p>
          {stats.ready ? (
            <p style={{ color: ACCENT, fontSize: 13, marginTop: 12, marginBottom: 0 }}>
              Checkpoint ready — submit Level 2 evidence →
              <Link href="/bourbon/academy/level-2-checkpoint" style={{ color: ACCENT, marginLeft: 6 }}>Open checkpoint</Link>
            </p>
          ) : (
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12, marginBottom: 0 }}>
              Progress: {stats.flights} flight{stats.flights !== 1 ? 's' : ''} · {stats.grids} grid{stats.grids !== 1 ? 's' : ''} · {stats.journal} journal — 3 flights or 2 flights + 2 grids for checkpoint.
            </p>
          )}
        </section>
      )}

      {!toolsOnly && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
            Curriculum — 16 modules
          </h2>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>
            Work top to bottom or jump to your confusion. Each module links flight, grid, and academy lesson.
          </p>
          <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>
            {LEVEL_2_MODULES.slice(0, 8).map((m) => (
              <ModuleRow key={m.id} module={m} />
            ))}
          </div>
          <details style={{ marginTop: 12 }}>
            <summary style={{ color: ACCENT, fontSize: 13, cursor: 'pointer' }}>Modules 9–16 (craft, finish, checkpoint)</summary>
            <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
              {LEVEL_2_MODULES.slice(8).map((m) => (
                <ModuleRow key={m.id} module={m} />
              ))}
            </div>
          </details>
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

function ModuleRow({ module: m }: { module: (typeof LEVEL_2_MODULES)[number] }) {
  return (
    <div style={{ padding: '12px 14px', background: 'var(--foundry-surface-raised)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
      <p style={{ margin: 0, color: 'var(--foundry-text)' }}>
        <span style={{ color: 'var(--foundry-text-faint)', marginRight: 8 }}>{m.order}.</span>
        {m.title}
      </p>
      <p style={{ margin: '4px 0 8px', color: 'var(--foundry-text-muted)', fontSize: 12 }}>{m.goal}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {m.flightId && (
          <Link href={`/bourbon/tasting-lab?flight=${m.flightId}`} style={{ color: ACCENT, fontSize: 12 }}>Flight →</Link>
        )}
        {m.gridId && (
          <Link href={`/bourbon/comparison-grid?preset=${m.gridId}`} style={{ color: ACCENT, fontSize: 12 }}>Grid →</Link>
        )}
        <Link href={`/bourbon/academy/${m.academySlug}`} style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>Lesson →</Link>
      </div>
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
