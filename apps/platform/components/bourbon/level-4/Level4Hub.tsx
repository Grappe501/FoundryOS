'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  LEVEL_4_TOOLS,
  LEVEL_4_LESSON_LINK,
  LEVEL_3_BACK_LINK,
  LEVEL_4_STATS,
  BOURBON_LEVEL_4_VERSION,
} from '../../../lib/bourbon-level-4/hub';
import { LEVEL_4_MODULES } from '../../../lib/bourbon-level-4/curriculum';
import { BourbonDeepToolCard } from '../BourbonDeepToolCard';
import { getLevel4Stats } from '../../../lib/bourbon-level-4/storage';

const ACCENT = 'var(--foundry-primary)';

export function Level4Hub({ toolsOnly = false }: { toolsOnly?: boolean }) {
  const sorted = [...LEVEL_4_TOOLS].sort((a, b) => a.priority - b.priority);
  const decode = sorted.filter((t) => t.category === 'decode');
  const compare = sorted.filter((t) => t.category === 'compare');
  const process = sorted.filter((t) => t.category === 'process');
  const learn = sorted.filter((t) => t.category === 'learn');
  const checkpoint = sorted.filter((t) => t.category === 'checkpoint');

  const [stats, setStats] = useState({ drills: 0, compareLabs: 0, dspHunts: 0, labsViewed: 0, ready: false });

  useEffect(() => {
    const s = getLevel4Stats();
    setStats({ drills: s.drills, compareLabs: s.compareLabs, dspHunts: s.dspHunts, labsViewed: s.labsViewed, ready: s.checkpointReady });
  }, []);

  return (
    <div>
      {!toolsOnly && (
        <section style={{ marginTop: 0, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
          <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
            Connoisseur · {BOURBON_LEVEL_4_VERSION}
          </p>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.65 }}>
            {LEVEL_4_STATS.labelDrills} label drills · {LEVEL_4_STATS.comparePresets} Compare Five presets · {LEVEL_4_STATS.dspHunts} DSP hunts · {LEVEL_4_STATS.lessons} academy lessons · {LEVEL_4_STATS.modules} modules.
            Read labels cold — predict the pour before X-Ray reveal.
          </p>
          {stats.ready ? (
            <p style={{ color: ACCENT, fontSize: 13, marginTop: 12, marginBottom: 0 }}>
              Checkpoint ready →
              <Link href="/bourbon/academy/level-4-checkpoint" style={{ color: ACCENT, marginLeft: 6 }}>Submit Level 4 evidence</Link>
            </p>
          ) : (
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12, marginBottom: 0 }}>
              Progress: {stats.drills} decodes · {stats.compareLabs} compare labs · {stats.dspHunts} DSP hunts · {stats.labsViewed} labs viewed
            </p>
          )}
        </section>
      )}

      {!toolsOnly && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
            Curriculum — {LEVEL_4_STATS.modules} modules
          </h2>
          <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>
            {LEVEL_4_MODULES.slice(0, 6).map((m) => (
              <ModuleRow key={m.id} module={m} />
            ))}
          </div>
          <details style={{ marginTop: 12 }}>
            <summary style={{ color: ACCENT, fontSize: 13, cursor: 'pointer' }}>Modules 7–12 (NCF, cask strength, store picks, checkpoint)</summary>
            <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
              {LEVEL_4_MODULES.slice(6).map((m) => (
                <ModuleRow key={m.id} module={m} />
              ))}
            </div>
          </details>
        </section>
      )}

      <ToolSection title="Decode — label literacy" tools={decode} />
      <ToolSection title="Compare — hypothesis labs" tools={compare} />
      <ToolSection title="Process — barrel, age, picks" tools={process} />
      <ToolSection title="Learn — atlas and detective" tools={learn} />
      <ToolSection title="Checkpoint — connoisseur evidence" tools={checkpoint} />

      <section style={{ marginTop: 40, padding: 20, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, margin: 0 }}>{LEVEL_4_LESSON_LINK.label}</p>
        <Link href={LEVEL_4_LESSON_LINK.href} style={{ color: ACCENT, fontSize: 14, marginTop: 8, display: 'inline-block' }}>
          {LEVEL_4_LESSON_LINK.sub} →
        </Link>
        <span style={{ color: 'var(--foundry-text-dim)', margin: '0 8px' }}>·</span>
        <Link href={LEVEL_3_BACK_LINK.href} style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>
          {LEVEL_3_BACK_LINK.label}
        </Link>
      </section>
    </div>
  );
}

function ModuleRow({ module: m }: { module: (typeof LEVEL_4_MODULES)[number] }) {
  const toolHref = m.toolHref ?? (m.presetId ? `/bourbon/compare-five-lab?preset=${m.presetId}` : undefined);
  return (
    <div style={{ padding: '12px 14px', background: 'var(--foundry-surface-raised)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
      <p style={{ margin: 0, color: 'var(--foundry-text)' }}>
        <span style={{ color: 'var(--foundry-text-faint)', marginRight: 8 }}>{m.order}.</span>
        {m.title}
      </p>
      <p style={{ margin: '4px 0 8px', color: 'var(--foundry-text-muted)', fontSize: 12 }}>{m.goal}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {toolHref && <Link href={toolHref} style={{ color: ACCENT, fontSize: 12 }}>Tool →</Link>}
        <Link href={`/bourbon/academy/${m.academySlug}`} style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>Lesson →</Link>
      </div>
    </div>
  );
}

function ToolSection({ title, tools }: { title: string; tools: typeof LEVEL_4_TOOLS }) {
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
