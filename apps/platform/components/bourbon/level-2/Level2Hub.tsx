'use client';

import Link from 'next/link';
import { LEVEL_2_TOOLS, LEVEL_2_LESSON_LINK, LEVEL_1_BACK_LINK, LEVEL_2_STATS, BOURBON_LEVEL_2_VERSION } from '../../../lib/bourbon-level-2/hub';
import { LEVEL_2_MODULES } from '../../../lib/bourbon-level-2/curriculum';
import { BourbonDeepToolCard } from '../BourbonDeepToolCard';
import { Level2ProgressPanel } from './Level2ProgressPanel';
import { getLevel2Stats } from '../../../lib/bourbon-level-2/storage';
import { useEffect, useState } from 'react';

const ACCENT = 'var(--foundry-primary)';

export function Level2Hub({ toolsOnly = false }: { toolsOnly?: boolean }) {
  const sorted = [...LEVEL_2_TOOLS].sort((a, b) => a.priority - b.priority);
  const program = sorted.filter((t) => t.category === 'program');
  const taste = sorted.filter((t) => t.category === 'taste');
  const blind = sorted.filter((t) => t.category === 'blind');
  const compare = sorted.filter((t) => t.category === 'compare');
  const host = sorted.filter((t) => t.category === 'host');
  const practice = sorted.filter((t) => t.category === 'practice');
  const learn = sorted.filter((t) => t.category === 'learn');

  const [stats, setStats] = useState({ flights: 0, grids: 0, journal: 0, programWeeks: 0, ready: false });

  useEffect(() => {
    const s = getLevel2Stats();
    setStats({ flights: s.flights, grids: s.grids, journal: s.journal, programWeeks: s.programWeeks, ready: s.checkpointReady });
  }, []);

  return (
    <div>
      {!toolsOnly && (
        <section style={{ marginTop: 0, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
          <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
            Confident Taster · v3 · {BOURBON_LEVEL_2_VERSION}
          </p>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.65 }}>
            {LEVEL_2_STATS.flights} tasting flights · {LEVEL_2_STATS.grids} comparison grids · {LEVEL_2_STATS.lessons} academy lessons · {LEVEL_2_STATS.modules} curriculum modules · {LEVEL_2_STATS.blindPresets} blind presets · {LEVEL_2_STATS.hostKits} host kits · {LEVEL_2_STATS.programWeeks}-week program.
            Vocabulary meets the glass — mash bills, craft, finish, proof, blind hosting, splurge tests.
          </p>
          {stats.ready ? (
            <p style={{ color: ACCENT, fontSize: 13, marginTop: 12, marginBottom: 0 }}>
              Checkpoint ready — submit Level 2 evidence →
              <Link href="/bourbon/academy/level-2-checkpoint" style={{ color: ACCENT, marginLeft: 6 }}>Open checkpoint</Link>
            </p>
          ) : (
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12, marginBottom: 0 }}>
              Progress: {stats.flights} flights · {stats.grids} grids · {stats.journal} journal · {stats.programWeeks}/8 program weeks — see dashboard below.
            </p>
          )}
        </section>
      )}

      {!toolsOnly && (
        <section style={{ marginTop: 20 }}>
          <Level2ProgressPanel />
        </section>
      )}

      {!toolsOnly && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
            Curriculum — {LEVEL_2_STATS.modules} modules
          </h2>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>
            Work top to bottom or jump to your confusion. Each module links flight, grid, blind, host kit, and academy lesson.
          </p>
          <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>
            {LEVEL_2_MODULES.slice(0, 8).map((m) => (
              <ModuleRow key={m.id} module={m} />
            ))}
          </div>
          <details style={{ marginTop: 12 }}>
            <summary style={{ color: ACCENT, fontSize: 13, cursor: 'pointer' }}>Modules 9–16 (craft, finish, checkpoint)</summary>
            <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
              {LEVEL_2_MODULES.slice(8, 16).map((m) => (
                <ModuleRow key={m.id} module={m} />
              ))}
            </div>
          </details>
          <details style={{ marginTop: 12 }}>
            <summary style={{ color: ACCENT, fontSize: 13, cursor: 'pointer' }}>Modules 17–24 (v3 — blind, host, splurge, program)</summary>
            <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
              {LEVEL_2_MODULES.slice(16).map((m) => (
                <ModuleRow key={m.id} module={m} />
              ))}
            </div>
          </details>
        </section>
      )}

      <ToolSection title="Program — structured path" tools={program} />
      <ToolSection title="Taste — guided flights" tools={taste} />
      <ToolSection title="Blind — bag before reveal" tools={blind} />
      <ToolSection title="Compare — hold one variable" tools={compare} />
      <ToolSection title="Host — generous nights" tools={host} />
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
        {m.blindId && (
          <Link href={`/bourbon/blind-flight?preset=${m.blindId}`} style={{ color: ACCENT, fontSize: 12 }}>Blind →</Link>
        )}
        {m.hostKitId && (
          <Link href={`/bourbon/host-night?kit=${m.hostKitId}`} style={{ color: ACCENT, fontSize: 12 }}>Host →</Link>
        )}
        {m.id === 'flight-builder' && (
          <Link href="/bourbon/flight-builder" style={{ color: ACCENT, fontSize: 12 }}>Builder →</Link>
        )}
        {m.id === 'eight-week-program' && (
          <Link href="/bourbon/tasting-program" style={{ color: ACCENT, fontSize: 12 }}>Program →</Link>
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
