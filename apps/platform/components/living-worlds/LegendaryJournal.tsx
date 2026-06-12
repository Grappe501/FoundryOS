'use client';

import { useEffect, useState } from 'react';
import { getLegendaryCollection } from '@foundry/mentor-engine';
import {
  listLegendaryEntries,
  saveLegendaryEntry,
} from '../../lib/living-worlds/client-journey';

type Props = {
  worldSlug: string;
  accent?: string;
};

export function LegendaryJournal({ worldSlug, accent = '#C8A96E' }: Props) {
  const schema = getLegendaryCollection(worldSlug);
  const [section, setSection] = useState(schema?.sections[0]?.id ?? 'tastings');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [entries, setEntries] = useState<ReturnType<typeof listLegendaryEntries>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!schema || !mounted) return;
    setEntries(listLegendaryEntries(schema.storage_key, section));
  }, [schema, section, mounted]);

  if (!schema) return null;

  function addEntry() {
    if (!title.trim()) return;
    saveLegendaryEntry(schema!.storage_key, { section, title: title.trim(), body: body.trim() });
    setTitle('');
    setBody('');
    setEntries(listLegendaryEntries(schema!.storage_key, section));
  }

  const activeSection = schema.sections.find((s) => s.id === section);

  return (
    <section style={{ marginTop: 32, padding: 24, background: '#0F0F12', borderRadius: 10, border: `1px solid ${accent}33` }}>
      <p style={{ color: accent, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
        Legendary collection
      </p>
      <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 8, color: '#E8E8EC' }}>{schema.label}</h2>
      <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 6 }}>
        Obsession-grade journal — hours well spent. Syncs on this device until account sync ships.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 20 }}>
        {schema.sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSection(s.id)}
            style={{
              padding: '8px 12px',
              fontSize: 12,
              borderRadius: 999,
              border: `1px solid ${section === s.id ? accent : '#2A2A2E'}`,
              background: section === s.id ? '#1A160F' : 'transparent',
              color: section === s.id ? accent : '#8A8A8E',
              cursor: 'pointer',
            }}
          >
            {s.icon} {s.title}
          </button>
        ))}
      </div>

      {activeSection && (
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 14 }}>{activeSection.description}</p>
      )}

      <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
        <input
          placeholder="Title — e.g. Evan Williams BiB, Feb tasting"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 12, background: '#111114', border: '1px solid #1A1A1E', borderRadius: 6, color: '#E8E8EC', fontSize: 14 }}
        />
        <textarea
          placeholder="Notes — nose, palate, finish, what surprised you…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          style={{ padding: 12, background: '#111114', border: '1px solid #1A1A1E', borderRadius: 6, color: '#E8E8EC', fontSize: 14, resize: 'vertical' }}
        />
        <button
          type="button"
          onClick={addEntry}
          style={{ padding: '12px 18px', background: '#2A4A2A', border: 'none', borderRadius: 6, color: '#E8E8EC', fontSize: 13, cursor: 'pointer', justifySelf: 'start' }}
        >
          Add to journal
        </button>
      </div>

      <div style={{ marginTop: 24, display: 'grid', gap: 10 }}>
        {entries.length === 0 ? (
          <p style={{ color: '#6B6B70', fontSize: 13 }}>No entries yet in this section.</p>
        ) : (
          entries.map((e) => (
            <article key={e.id} style={{ padding: 14, background: '#111114', borderRadius: 6, border: '1px solid #1A1A1E' }}>
              <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{e.title}</p>
              <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 4 }}>{new Date(e.createdAt).toLocaleDateString()}</p>
              {e.body && <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{e.body}</p>}
            </article>
          ))
        )}
      </div>
    </section>
  );
}
