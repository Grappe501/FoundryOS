'use client';

import { useEffect, useState } from 'react';
import { BOURBON_BOTTLES } from '../../../lib/bourbon-level-1/bottles';
import {
  getCollection,
  upsertCollectionItem,
  removeCollectionItem,
  type CollectionItem,
} from '../../../lib/bourbon-level-1/storage';
import { listBourbonProducers } from '../../../lib/world-depth/bourbon-producers';

const ACCENT = '#C8A96E';
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
    setItems(getCollection());
  }

  function remove(slug: string, st: CollectionItem['status']) {
    removeCollectionItem(slug, st);
    setItems(getCollection());
  }

  return (
    <section style={{ marginTop: 32, padding: 24, background: '#0F1210', borderRadius: 12, border: `1px solid ${ACCENT}33` }}>
      <h2 style={{ fontSize: 18, fontWeight: 400, margin: 0, color: '#E8E8EC' }}>My Bourbon Shelf</h2>
      <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>Owned · tasted · wish list · empty bottles — not just notes.</p>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <Stat label="Bottles tracked" value={items.length} />
        <Stat label="Houses explored" value={`${housesExplored}/${producers.length}`} />
        <Stat label="Shelf value (est.)" value={`$${shelfValue}`} />
      </div>

      <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <select value={bottleSlug} onChange={(e) => setBottleSlug(e.target.value)} style={{ padding: 10, background: '#111114', border: '1px solid #2A2A2E', borderRadius: 6, color: '#E8E8EC', fontSize: 13 }}>
          {BOURBON_BOTTLES.map((b) => (
            <option key={b.slug} value={b.slug}>{b.name}</option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value as CollectionItem['status'])} style={{ padding: 10, background: '#111114', border: '1px solid #2A2A2E', borderRadius: 6, color: '#E8E8EC', fontSize: 13 }}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button type="button" onClick={add} style={{ padding: '10px 16px', background: '#4A4020', border: 'none', borderRadius: 6, color: '#E8E8EC', cursor: 'pointer' }}>
          Add
        </button>
      </div>

      {items.length > 0 && (
        <ul style={{ marginTop: 20, padding: 0, listStyle: 'none' }}>
          {items.map((i) => {
            const b = BOURBON_BOTTLES.find((x) => x.slug === i.bottleSlug);
            return (
              <li key={i.bottleSlug + i.status} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
                <span style={{ color: '#E8E8EC' }}>{b?.name ?? i.bottleSlug} <span style={{ color: '#6B6B70' }}>({i.status})</span></span>
                <button type="button" onClick={() => remove(i.bottleSlug, i.status)} style={{ background: 'none', border: 'none', color: '#6B6B70', cursor: 'pointer', fontSize: 12 }}>Remove</button>
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
      <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 4 }}>{label}</p>
    </div>
  );
}
