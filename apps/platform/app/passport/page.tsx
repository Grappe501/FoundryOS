'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { resolveFoundryIdentityStory } from '@foundry/identity-narrative-engine';
import { assembleAllSignalBundles } from '../../lib/identity-narrative/assemble-signals';
import { getStoredDisplayName } from '../../lib/living-worlds/client-journey';
import { getWorldEventsState } from '../../lib/world-events/client-state';
import { getAllCollections } from '../../lib/collector/client-state';
import { ConsumerNav } from '../../components/ConsumerNav';

export default function PassportPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const data = useMemo(() => {
    if (!mounted) return null;
    const name = getStoredDisplayName();
    const bundles = assembleAllSignalBundles();
    const { story, activeCount } = resolveFoundryIdentityStory(bundles, name);
    const events = getWorldEventsState();
    const collections = getAllCollections();
    const collectionItems = collections.reduce((n, c) => n + c.unlocked_count, 0);
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
      stats: {
        collections: collectionItems,
        events_participated: events.viewed.length,
        votes: Object.keys(events.votes).length,
        challenges: events.completed.length,
      },
      worldTitles,
    };
  }, [mounted]);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <ConsumerNav />
      <p style={{ color: '#C8A96E', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>
        Foundry Passport · Preview
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 8 }}>
        {mounted && data ? data.name : 'Your Passport'}
      </h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.7 }}>
        Not a profile — a living record of who you are across worlds. Full Passport ships with Level 2 engines (PASS-040).
      </p>

      {mounted && data && (
        <>
          <section style={{ marginTop: 28, padding: 24, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 10 }}>
            <p style={{ color: '#6B6B70', fontSize: 11, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Stamps forming
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
              {['Explorer', 'Collector', data.stats.challenges > 0 ? 'Participant' : null].filter(Boolean).map((s) => (
                <span key={s} style={{ padding: '6px 12px', background: '#111114', borderRadius: 4, fontSize: 12, color: '#C8A96E' }}>
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

      <Link href="/my-journey" style={{ display: 'inline-block', marginTop: 28, color: '#6B9B6B', fontSize: 14 }}>
        ← Full story on My Journey
      </Link>
    </main>
  );
}
