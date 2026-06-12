'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { resolveFoundryIdentityStory } from '@foundry/identity-narrative-engine';
import { summarizeUserArtifacts } from '@foundry/artifact-engine';
import { assembleAllSignalBundles } from '../../lib/identity-narrative/assemble-signals';
import { getStoredDisplayName } from '../../lib/living-worlds/client-journey';
import { getWorldEventsState } from '../../lib/world-events/client-state';
import { getAllCollections } from '../../lib/collector/client-state';
import {
  ARTIFACTS_CHANGED_EVENT,
  getLocalUserId,
  listClientArtifacts,
} from '../../lib/artifacts/client-store';
import { ConsumerNav } from '../../components/ConsumerNav';

const WORLD_LABELS: Record<string, string> = {
  bourbon: 'Bourbon',
  'ai-builder': 'AI Builder',
  'public-speaking': 'Public Speaking',
  'civic-engagement': 'Civic',
  bbq: 'BBQ',
  poker: 'Poker',
};

export default function PassportPage() {
  const [mounted, setMounted] = useState(false);
  const [artifactTick, setArtifactTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const refresh = () => setArtifactTick((n) => n + 1);
    window.addEventListener(ARTIFACTS_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(ARTIFACTS_CHANGED_EVENT, refresh);
  }, []);

  const data = useMemo(() => {
    if (!mounted) return null;
    const name = getStoredDisplayName();
    const userId = getLocalUserId();
    const bundles = assembleAllSignalBundles();
    const { story, activeCount } = resolveFoundryIdentityStory(bundles, name);
    const events = getWorldEventsState();
    const collections = getAllCollections();
    const collectionItems = collections.reduce((n, c) => n + c.unlocked_count, 0);
    const artifacts = listClientArtifacts({ user_id: userId });
    const evidence = summarizeUserArtifacts(artifacts, userId);
    const worldTitles = story.worlds
      .filter((w) =>
        bundles.some(
          (b) =>
            b.world_slug === w.world_slug &&
            (b.missions_completed > 0 || b.consequence_node_ids.length > 0),
        ),
      )
      .map((w) => w.world_name);

    return {
      name,
      story,
      activeCount,
      evidence,
      stats: {
        collections: collectionItems,
        events_participated: events.viewed.length,
        votes: Object.keys(events.votes).length,
        challenges: events.completed.length,
        artifacts: evidence.total,
      },
      worldTitles,
    };
  }, [mounted, artifactTick]);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <ConsumerNav />
      <p style={{ color: 'var(--foundry-primary)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>
        Foundry Passport · Preview
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 8 }}>
        {mounted && data ? data.name : 'Your Passport'}
      </h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.7 }}>
        Not a profile — evidence of who you are becoming across worlds.
      </p>

      {mounted && data && (
        <>
          <section style={{ marginTop: 28, padding: 24, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 10 }}>
            <p style={{ color: '#6B6B70', fontSize: 11, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Evidence wall
            </p>
            <p style={{ color: '#E8E8EC', fontSize: 28, fontWeight: 300, margin: '12px 0 0' }}>
              {data.evidence.total} artifact{data.evidence.total === 1 ? '' : 's'}
            </p>
            {data.evidence.total === 0 ? (
              <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, lineHeight: 1.7 }}>
                Save a tasting note, comparison, or shelf entry — artifacts appear here as proof, not levels.
              </p>
            ) : (
              <>
                {Object.entries(data.evidence.by_world).map(([slug, count]) => (
                  <p key={slug} style={{ color: '#8A8A8E', fontSize: 14, margin: '8px 0 0' }}>
                    <span style={{ color: 'var(--foundry-primary)' }}>{WORLD_LABELS[slug] ?? slug}</span>
                    {' · '}
                    {count} artifact{count === 1 ? '' : 's'}
                  </p>
                ))}
                {data.evidence.latest && (
                  <div style={{ marginTop: 16, padding: 14, background: '#111114', borderRadius: 8 }}>
                    <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>Latest artifact</p>
                    <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 6 }}>{data.evidence.latest.metadata.title}</p>
                    <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>
                      {data.evidence.latest.type.replace('_', ' ')} ·{' '}
                      {WORLD_LABELS[data.evidence.latest.metadata.world_slug] ??
                        data.evidence.latest.metadata.world_slug}
                    </p>
                  </div>
                )}
              </>
            )}
          </section>

          <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 10 }}>
            <p style={{ color: '#6B6B70', fontSize: 11, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Activity
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
              {['Explorer', 'Collector', data.stats.challenges > 0 ? 'Participant' : null].filter(Boolean).map((s) => (
                <span key={s} style={{ padding: '6px 12px', background: '#111114', borderRadius: 4, fontSize: 12, color: 'var(--foundry-primary)' }}>
                  {s}
                </span>
              ))}
            </div>
            {data.worldTitles.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>Worlds</p>
                {data.worldTitles.map((t) => (
                  <p key={t} style={{ color: '#E8E8EC', fontSize: 14, margin: '8px 0 0' }}>
                    {t}
                  </p>
                ))}
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 20, fontSize: 13 }}>
              <div>
                Artifacts <span style={{ color: '#E8E8EC' }}>{data.stats.artifacts}</span>
              </div>
              <div>
                Collection items <span style={{ color: '#E8E8EC' }}>{data.stats.collections}</span>
              </div>
              <div>
                Events touched <span style={{ color: '#E8E8EC' }}>{data.stats.events_participated}</span>
              </div>
              <div>
                Weekly votes <span style={{ color: '#E8E8EC' }}>{data.stats.votes}</span>
              </div>
              <div>
                Challenges done <span style={{ color: '#E8E8EC' }}>{data.stats.challenges}</span>
              </div>
            </div>
          </section>

          {data.story.primary_world && (
            <section style={{ marginTop: 24 }}>
              <p style={{ color: '#6B9B6B', fontSize: 13, lineHeight: 1.75 }}>
                {data.story.primary_world.mentor_notice}
              </p>
            </section>
          )}
        </>
      )}

      <Link href="/passport/timeline" style={{ display: 'inline-block', marginTop: 28, color: 'var(--foundry-primary)', fontSize: 14 }}>
        Memory timeline →
      </Link>
      <Link href="/my-journey" style={{ display: 'inline-block', marginTop: 28, marginLeft: 20, color: '#6B9B6B', fontSize: 14 }}>
        ← Full story on My Journey
      </Link>
    </main>
  );
}
