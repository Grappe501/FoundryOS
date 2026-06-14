'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { BOURBON_BOTTLES, getBottle } from '../../../lib/bourbon-level-1/bottles';
import { FLAVOR_FAMILIES, FORBIDDEN_NOTE_WORDS, emptyJournalEntry, validateNoteWord, type JournalEntryTemplate } from '../../../lib/bourbon-level-2/note-template';
import { getJournalEntries, saveJournalEntry, getLevel2Stats } from '../../../lib/bourbon-level-2/storage';
import { RabbitHoleFooter } from '../level-1/RabbitHoleFooter';

const ACCENT = 'var(--foundry-primary)';

export function PalateJournalTool() {
  const [bottleSlug, setBottleSlug] = useState(BOURBON_BOTTLES[0]?.slug ?? '');
  const bottle = getBottle(bottleSlug);
  const [entry, setEntry] = useState<JournalEntryTemplate>(() =>
    emptyJournalEntry(bottleSlug, bottle?.proof ?? 90),
  );
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<ReturnType<typeof getJournalEntries>>([]);
  const [stats, setStats] = useState({ journal: 0, checkpointReady: false });

  useEffect(() => {
    setHistory(getJournalEntries());
    const s = getLevel2Stats();
    setStats({ journal: s.journal, checkpointReady: s.checkpointReady });
  }, [saved]);

  useEffect(() => {
    const b = getBottle(bottleSlug);
    if (b) setEntry(emptyJournalEntry(bottleSlug, b.proof));
    setSaved(false);
  }, [bottleSlug]);

  const familySet = useMemo(() => new Set(entry.flavorFamilies), [entry.flavorFamilies]);

  function toggleFamily(id: string) {
    setEntry((e) => ({
      ...e,
      flavorFamilies: e.flavorFamilies.includes(id)
        ? e.flavorFamilies.filter((f) => f !== id)
        : [...e.flavorFamilies, id].slice(0, 5),
    }));
  }

  function handleSave() {
    saveJournalEntry(entry);
    setSaved(true);
  }

  const noseCheck = entry.nose ? validateNoteWord(entry.nose.split(/\s+/)[0]) : { ok: true };

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Structured journal entries for Level 2 checkpoint evidence. Five flavor families — forbidden words: {FORBIDDEN_NOTE_WORDS.join(', ')}.
      </p>

      <div style={{ marginTop: 16, padding: 14, background: 'var(--foundry-surface-raised)', borderRadius: 8, fontSize: 13, color: 'var(--foundry-text-muted)' }}>
        {stats.journal} journal entries · {stats.checkpointReady ? (
          <span style={{ color: ACCENT }}>Checkpoint ready</span>
        ) : (
          '3+ entries help checkpoint — pair with Tasting Lab saves'
        )}
      </div>

      <section style={{ marginTop: 24 }}>
        <label style={{ display: 'block' }}>
          <span style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>Bottle</span>
          <select
            value={bottleSlug}
            onChange={(e) => setBottleSlug(e.target.value)}
            style={{ width: '100%', maxWidth: 420, marginTop: 6, padding: '8px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border)', background: 'var(--foundry-surface-raised)', color: 'var(--foundry-text)' }}
          >
            {BOURBON_BOTTLES.map((b) => (
              <option key={b.slug} value={b.slug}>{b.name}</option>
            ))}
          </select>
        </label>
      </section>

      <section style={{ marginTop: 20, display: 'grid', gap: 12, maxWidth: 520 }}>
        <label>
          <span style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>Serve</span>
          <select
            value={entry.serve}
            onChange={(e) => setEntry({ ...entry, serve: e.target.value as JournalEntryTemplate['serve'] })}
            style={{ width: '100%', marginTop: 4, padding: '8px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border)', background: 'var(--foundry-surface-raised)', color: 'var(--foundry-text)' }}
          >
            <option value="neat">Neat</option>
            <option value="water">Neat + water drop</option>
            <option value="rock">On the rocks</option>
          </select>
        </label>
        <label>
          <span style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>Context</span>
          <select
            value={entry.context}
            onChange={(e) => setEntry({ ...entry, context: e.target.value as JournalEntryTemplate['context'] })}
            style={{ width: '100%', marginTop: 4, padding: '8px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border)', background: 'var(--foundry-surface-raised)', color: 'var(--foundry-text)' }}
          >
            <option value="solo">Solo pour</option>
            <option value="host">Hosting</option>
            <option value="blind">Blind</option>
            <option value="flight">Part of flight</option>
          </select>
        </label>
        {(['nose', 'palate', 'finish'] as const).map((field) => (
          <label key={field}>
            <span style={{ color: 'var(--foundry-text-faint)', fontSize: 12, textTransform: 'capitalize' }}>{field}</span>
            <input
              value={entry[field]}
              onChange={(e) => setEntry({ ...entry, [field]: e.target.value })}
              style={{ width: '100%', marginTop: 4, padding: '8px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border)', background: 'var(--foundry-surface-raised)', color: 'var(--foundry-text)' }}
            />
          </label>
        ))}
        {!noseCheck.ok && <p style={{ color: '#c96', fontSize: 12, margin: 0 }}>{noseCheck.reason}</p>}
        <label>
          <span style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>One lesson sentence</span>
          <textarea
            value={entry.lesson}
            onChange={(e) => setEntry({ ...entry, lesson: e.target.value })}
            rows={2}
            style={{ width: '100%', marginTop: 4, padding: 10, fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border)', background: 'var(--foundry-surface-raised)', color: 'var(--foundry-text)' }}
          />
        </label>
      </section>

      <section style={{ marginTop: 20 }}>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, margin: '0 0 8px' }}>Flavor families (pick 2+)</p>
        <div style={{ display: 'grid', gap: 10 }}>
          {FLAVOR_FAMILIES.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => toggleFamily(f.id)}
              style={{
                textAlign: 'left',
                padding: '10px 14px',
                borderRadius: 6,
                border: `1px solid ${familySet.has(f.id) ? ACCENT : 'var(--foundry-border)'}`,
                background: familySet.has(f.id) ? 'var(--foundry-border-warm)' : 'var(--foundry-surface)',
                cursor: 'pointer',
                color: 'var(--foundry-text-muted)',
                fontSize: 13,
              }}
            >
              <strong style={{ color: 'var(--foundry-text)' }}>{f.label}</strong>
              <span style={{ marginLeft: 8, fontSize: 12 }}>{f.examples.join(' · ')}</span>
            </button>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={handleSave}
        disabled={entry.flavorFamilies.length < 2 || !entry.nose || !entry.lesson}
        style={{ marginTop: 20, padding: '10px 20px', fontSize: 13, borderRadius: 6, border: 'none', background: ACCENT, color: 'var(--foundry-bg)', cursor: 'pointer', fontWeight: 600, opacity: entry.flavorFamilies.length < 2 ? 0.5 : 1 }}
      >
        Save journal entry
      </button>
      {saved && <p style={{ color: ACCENT, fontSize: 13, marginTop: 10 }}>Entry saved — {stats.journal + 1} total.</p>}

      {history.length > 0 && (
        <section style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>Recent entries</h2>
          <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
            {history.slice(0, 5).map((h, i) => {
              const b = getBottle(h.bottleSlug);
              return (
                <div key={i} style={{ padding: 14, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
                  <p style={{ margin: 0, color: 'var(--foundry-text)' }}>{b?.name ?? h.bottleSlug} · {h.date}</p>
                  <p style={{ margin: '6px 0 0', color: 'var(--foundry-text-muted)' }}>{h.nose} / {h.palate} / {h.finish}</p>
                  <p style={{ margin: '6px 0 0', color: 'var(--foundry-text-faint)', fontStyle: 'italic' }}>{h.lesson}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <RabbitHoleFooter seed="palate-journal" />
    </div>
  );
}
