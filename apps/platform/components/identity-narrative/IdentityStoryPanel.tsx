'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  resolveFoundryIdentityStory,
  resolveWorldIdentityNarrative,
  type IdentityNarrative,
} from '@foundry/identity-narrative-engine';
import { assembleAllSignalBundles, assembleSignalBundle } from '../../lib/identity-narrative/assemble-signals';
import { getStoredDisplayName } from '../../lib/living-worlds/client-journey';
import { getActiveWorld } from '../../lib/living-worlds/active-worlds';

const ACCENT = 'var(--foundry-success)';

function NarrativeBlock({ narrative, accent = ACCENT }: { narrative: IdentityNarrative; accent?: string }) {
  return (
    <article
      style={{
        padding: 22,
        background: 'var(--foundry-surface-raised)',
        borderRadius: 10,
        border: '1px solid #2A3A2A',
      }}
    >
      <p style={{ color: accent, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
        {narrative.mentor_name}
      </p>
      <p style={{ color: 'var(--foundry-text)', fontSize: 15, marginTop: 14, lineHeight: 1.75 }}>{narrative.origin}</p>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, marginTop: 12, lineHeight: 1.75 }}>{narrative.recent_pattern}</p>
      <p style={{ color: 'var(--foundry-primary)', fontSize: 14, marginTop: 16, lineHeight: 1.7, fontStyle: 'italic' }}>
        {narrative.mentor_notice}
      </p>
      {narrative.recognition && (
        <p style={{ color: 'var(--foundry-text)', fontSize: 14, marginTop: 14, lineHeight: 1.7, paddingLeft: 12, borderLeft: `3px solid ${accent}` }}>
          {narrative.recognition}
        </p>
      )}
      <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--foundry-border-subtle)' }}>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Suggested next step
        </p>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{narrative.suggested_next.reason}</p>
        <Link
          href={narrative.suggested_next.href}
          style={{
            display: 'inline-block',
            marginTop: 10,
            padding: '8px 14px',
            background: 'var(--foundry-success-bg)',
            borderRadius: 6,
            color: 'var(--foundry-text)',
            fontSize: 13,
            textDecoration: 'none',
          }}
        >
          {narrative.suggested_next.label} →
        </Link>
      </div>
    </article>
  );
}

/** Full story for /my-journey */
export function IdentityStoryPanel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { story, activeWorlds } = useMemo(() => {
    if (!mounted) return { story: null, activeWorlds: [] as IdentityNarrative[] };
    const name = getStoredDisplayName();
    const bundles = assembleAllSignalBundles();
    const { story, activeCount } = resolveFoundryIdentityStory(bundles, name);
    const active = story.worlds.filter((w) =>
      bundles.some(
        (b) =>
          b.world_slug === w.world_slug &&
          (b.missions_completed > 0 ||
            b.consequence_node_ids.length > 0 ||
            b.events_completed.length > 0 ||
            b.active_collections.some((c) => c.unlocked > 0)),
      ),
    );
    return { story, activeWorlds: active.length > 0 ? active : story.worlds.slice(0, 1), activeCount };
  }, [mounted]);

  if (!mounted || !story) return null;

  return (
    <section style={{ marginTop: 28 }}>
      <h2 style={{ fontSize: 14, color: ACCENT, fontWeight: 400, margin: 0 }}>{story.headline}</h2>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, marginTop: 12, lineHeight: 1.75 }}>{story.opening}</p>
      <div style={{ marginTop: 20, display: 'grid', gap: 16 }}>
        {(story.primary_world ? [story.primary_world, ...activeWorlds.filter((w) => w.world_slug !== story.primary_world?.world_slug)] : activeWorlds)
          .slice(0, 3)
          .map((n) => (
            <div key={n.world_slug}>
              <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: '0 0 8px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {n.world_name}
              </p>
              <NarrativeBlock narrative={n} />
            </div>
          ))}
      </div>
      <Link href="/passport" style={{ display: 'inline-block', marginTop: 18, color: ACCENT, fontSize: 13 }}>
        Open Foundry Passport (preview) →
      </Link>
    </section>
  );
}

/** Compact panel for world hubs */
export function WorldIdentityNarrativePanel({ worldSlug, accent = ACCENT }: { worldSlug: string; accent?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const narrative = useMemo(() => {
    if (!mounted) return null;
    const config = getActiveWorld(worldSlug);
    const signals = assembleSignalBundle(worldSlug);
    return resolveWorldIdentityNarrative(signals, config?.mentorName);
  }, [mounted, worldSlug]);

  if (!mounted || !narrative) return null;

  return (
    <section style={{ marginTop: 24 }}>
      <p style={{ color: accent, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
        Who you are becoming
      </p>
      <NarrativeBlock narrative={narrative} accent={accent} />
    </section>
  );
}
