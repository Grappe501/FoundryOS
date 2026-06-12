'use client';

import { useEffect, useState } from 'react';
import { BOURBON_BOTTLES } from '../../../lib/bourbon-level-1/bottles';
import {
  getCollection,
  upsertCollectionItem,
  removeCollectionItem,
  type CollectionItem,
} from '../../../lib/bourbon-level-1/storage';
import { createShelfArtifact } from '../../../lib/artifacts/create-from-action';
import { listBourbonProducers } from '../../../lib/world-depth/bourbon-producers';

const ACCENT = 'var(--foundry-primary)';
const STATUSES: CollectionItem['status'][] = ['owned', 'tasted', 'wishlist', 'gifted', 'traded', 'empty', 'favorite'];

export function BourbonShelfTracker() {
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [bottleSlug, setBottleSlug] = useState(BOURBON_BOTTLES[0].slug);
  const [status, setStatus] = useState<CollectionItem['status']>('owned');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setItems(getCollection());
  }, []);

  if (!mounted) return null;

  const producers = listBourbonProducers();
  const housesExplored = new Set(items.map((i) => BOURBON_BOTTLES.find((b) => b.slug === i.bottleSlug)?.producerSlug).filter(Boolean)).size;
  const shelfValue = items
    .filter((i) => i.status === 'owned' || i.status === 'favorite')
    .reduce((s, i) => s + (BOURBON_BOTTLES.find((b) => b.slug === i.bottleSlug)?.priceUsd ?? 0), 0);

  function add() {
    upsertCollectionItem({ bottleSlug, status, at: new Date().toISOString() });
    createShelfArtifact(bottleSlug, status);
    setItems(getCollection());
  }

  function remove(slug: string, st: CollectionItem['status']) {
    removeCollectionItem(slug, st);
    setItems(getCollection());
  }

  return (
    <section style={{ marginTop: 32, padding: 24, background: '#0F1210', borderRadius: 12, border: `1px solid ${ACCENT}33` }}>
      <h2 style={{ fontSize: 18, fontWeight: 400, margin: 0, color: 'var(--foundry-text)' }}>My Bourbon Shelf</h2>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>Owned · tasted · wish list · empty bottles — not just notes.</p>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <Stat label="Bottles tracked" value={items.length} />
        <Stat label="Houses explored" value={`${housesExplored}/${producers.length}`} />
        <Stat label="Shelf value (est.)" value={`$${shelfValue}`} />
      </div>

      <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <select value={bottleSlug} onChange={(e) => setBottleSlug(e.target.value)} style={{ padding: 10, background: 'var(--foundry-surface-raised)', border: '1px solid var(--foundry-border)', borderRadius: 6, color: 'var(--foundry-text)', fontSize: 13 }}>
          {BOURBON_BOTTLES.map((b) => (
            <option key={b.slug} value={b.slug}>{b.name}</option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value as CollectionItem['status'])} style={{ padding: 10, background: 'var(--foundry-surface-raised)', border: '1px solid var(--foundry-border)', borderRadius: 6, color: 'var(--foundry-text)', fontSize: 13 }}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button type="button" onClick={add} style={{ padding: '10px 16px', background: 'var(--foundry-primary-border-dim)', border: 'none', borderRadius: 6, color: 'var(--foundry-text)', cursor: 'pointer' }}>
          Add
        </button>
      </div>

      {items.length > 0 && (
        <ul style={{ marginTop: 20, padding: 0, listStyle: 'none' }}>
          {items.map((i) => {
            const b = BOURBON_BOTTLES.find((x) => x.slug === i.bottleSlug);
            return (
              <li key={i.bottleSlug + i.status} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
                <span style={{ color: 'var(--foundry-text)' }}>{b?.name ?? i.bottleSlug} <span style={{ color: 'var(--foundry-text-faint)' }}>({i.status})</span></span>
                <button type="button" onClick={() => remove(i.bottleSlug, i.status)} style={{ background: 'none', border: 'none', color: 'var(--foundry-text-faint)', cursor: 'pointer', fontSize: 12 }}>Remove</button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p style={{ color: ACCENT, fontSize: 20, margin: 0, fontWeight: 300 }}>{value}</p>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, marginTop: 4 }}>{label}</p>
    </div>
  );
}
