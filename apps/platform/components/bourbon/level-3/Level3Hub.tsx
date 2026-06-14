'use client';

import Link from 'next/link';
import { LEVEL_3_TOOLS, LEVEL_3_LESSON_LINK, LEVEL_2_BACK_LINK, LEVEL_3_STATS, BOURBON_LEVEL_3_VERSION } from '../../../lib/bourbon-level-3/hub';
import { LEVEL_3_MODULES } from '../../../lib/bourbon-level-3/curriculum';
import { BourbonDeepToolCard } from '../BourbonDeepToolCard';
import { getLevel3Stats } from '../../../lib/bourbon-level-3/storage';
import { useEffect, useState } from 'react';

const ACCENT = 'var(--foundry-primary)';

export function Level3Hub({ toolsOnly = false }: { toolsOnly?: boolean }) {
  const sorted = [...LEVEL_3_TOOLS].sort((a, b) => a.priority - b.priority);
  const curate = sorted.filter((t) => t.category === 'curate');
  const value = sorted.filter((t) => t.category === 'value');
  const analyze = sorted.filter((t) => t.category === 'analyze');
  const learn = sorted.filter((t) => t.category === 'learn');
  const checkpoint = sorted.filter((t) => t.category === 'checkpoint');

  const [stats, setStats] = useState({ themes: 0, shelves: 0, defenses: 0, gaps: 0, ready: false });

  useEffect(() => {
    const s = getLevel3Stats();
    setStats({ themes: s.themesViewed, shelves: s.shelvesSaved, defenses: s.defensesSaved, gaps: s.gapAnalyses, ready: s.checkpointReady });
  }, []);

  return (
    <div>
      {!toolsOnly && (
        <section style={{ marginTop: 0, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
          <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
            Shelf Builder · {BOURBON_LEVEL_3_VERSION}
          </p>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.65 }}>
            {LEVEL_3_STATS.themes} shelf themes · {LEVEL_3_STATS.priceTiers} price tiers · {LEVEL_3_STATS.lessons} academy lessons · {LEVEL_3_STATS.modules} curriculum modules · {LEVEL_3_STATS.shelfRoles} bottle roles.
            Curate 5–8 bottles around a defensible theme — daily vs occasion, value vs splurge, craft vs major.
          </p>
          {stats.ready ? (
            <p style={{ color: ACCENT, fontSize: 13, marginTop: 12, marginBottom: 0 }}>
              Checkpoint ready →
              <Link href="/bourbon/academy/level-3-checkpoint" style={{ color: ACCENT, marginLeft: 6 }}>Submit Level 3 evidence</Link>
            </p>
          ) : (
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12, marginBottom: 0 }}>
              Progress: {stats.themes} themes viewed · {stats.shelves} shelves saved · {stats.gaps} gap analyses · {stats.defenses} defenses
            </p>
          )}
        </section>
      )}

      {!toolsOnly && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
            Curriculum — {LEVEL_3_STATS.modules} modules
          </h2>
          <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>
            {LEVEL_3_MODULES.slice(0, 6).map((m) => (
              <ModuleRow key={m.id} module={m} />
            ))}
          </div>
          <details style={{ marginTop: 12 }}>
            <summary style={{ color: ACCENT, fontSize: 13, cursor: 'pointer' }}>Modules 7–12 (gap, hype-free, defense, checkpoint)</summary>
            <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
              {LEVEL_3_MODULES.slice(6).map((m) => (
                <ModuleRow key={m.id} module={m} />
              ))}
            </div>
          </details>
        </section>
      )}

      <ToolSection title="Curate — themed shelves" tools={curate} />
      <ToolSection title="Value — price ladder" tools={value} />
      <ToolSection title="Analyze — gap and compare" tools={analyze} />
      <ToolSection title="Learn — BiB and Level 2 bridge" tools={learn} />
      <ToolSection title="Checkpoint — shelf defense" tools={checkpoint} />

      <section style={{ marginTop: 40, padding: 20, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, margin: 0 }}>{LEVEL_3_LESSON_LINK.label}</p>
        <Link href={LEVEL_3_LESSON_LINK.href} style={{ color: ACCENT, fontSize: 14, marginTop: 8, display: 'inline-block' }}>
          {LEVEL_3_LESSON_LINK.sub} →
        </Link>
        <span style={{ color: 'var(--foundry-text-dim)', margin: '0 8px' }}>·</span>
        <Link href={LEVEL_2_BACK_LINK.href} style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>
          {LEVEL_2_BACK_LINK.label}
        </Link>
      </section>
    </div>
  );
}

function ModuleRow({ module: m }: { module: (typeof LEVEL_3_MODULES)[number] }) {
  return (
    <div style={{ padding: '12px 14px', background: 'var(--foundry-surface-raised)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
      <p style={{ margin: 0, color: 'var(--foundry-text)' }}>
        <span style={{ color: 'var(--foundry-text-faint)', marginRight: 8 }}>{m.order}.</span>
        {m.title}
      </p>
      <p style={{ margin: '4px 0 8px', color: 'var(--foundry-text-muted)', fontSize: 12 }}>{m.goal}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {m.themeId && (
          <Link href={`/bourbon/themed-shelf?theme=${m.themeId}`} style={{ color: ACCENT, fontSize: 12 }}>Theme →</Link>
        )}
        {m.toolHref && (
          <Link href={m.toolHref} style={{ color: ACCENT, fontSize: 12 }}>Tool →</Link>
        )}
        <Link href={`/bourbon/academy/${m.academySlug}`} style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>Lesson →</Link>
      </div>
    </div>
  );
}

function ToolSection({ title, tools }: { title: string; tools: typeof LEVEL_3_TOOLS }) {
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
