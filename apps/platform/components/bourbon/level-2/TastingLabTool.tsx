'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { TASTING_FLIGHTS, getTastingFlight } from '../../../lib/bourbon-level-2/tasting-flights';
import { getBottle } from '../../../lib/bourbon-level-1/bottles';
import { saveTastingSession, getTastingSessions, type PourNote } from '../../../lib/bourbon-level-2/storage';
import { RabbitHoleFooter } from '../level-1/RabbitHoleFooter';

const ACCENT = 'var(--foundry-primary)';

const NOSING_CHECKLIST = [
  'Glass at lip distance — not buried in the bowl',
  'One nose word before the first sip',
  'Small sip — let it sit on the tongue',
  'Optional: one drop of water on high-proof pours only',
  'Second nose after 30 seconds — note change',
];

const FLAVOR_SUGGESTIONS = ['caramel', 'vanilla', 'pepper', 'cherry', 'honey', 'oak', 'banana', 'cinnamon', 'chocolate', 'leather'];

type Props = { initialFlightId?: string; proofMode?: boolean };

export function TastingLabTool({ initialFlightId, proofMode = false }: Props) {
  const defaultId = proofMode ? 'proof-ladder' : initialFlightId ?? TASTING_FLIGHTS[0].id;
  const [flightId, setFlightId] = useState(defaultId);
  const flight = getTastingFlight(flightId) ?? TASTING_FLIGHTS[0];

  const [pours, setPours] = useState<PourNote[]>(() =>
    flight.bottleSlugs.map((slug) => ({ bottleSlug: slug, nose: '', palate: '', finish: '', flavorWords: [] })),
  );
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);

  useEffect(() => {
    setHistoryCount(getTastingSessions().length);
  }, [saved]);

  useEffect(() => {
    const f = getTastingFlight(flightId) ?? TASTING_FLIGHTS[0];
    setPours(f.bottleSlugs.map((slug) => ({ bottleSlug: slug, nose: '', palate: '', finish: '', flavorWords: [] })));
    setReflection('');
    setSaved(false);
  }, [flightId]);

  const bottles = useMemo(
    () => flight.bottleSlugs.map((s) => getBottle(s)).filter(Boolean),
    [flight],
  );

  function updatePour(idx: number, patch: Partial<PourNote>) {
    setPours((prev) => prev.map((p, i) => (i === idx ? { ...p, ...patch } : p)));
    setSaved(false);
  }

  function toggleWord(idx: number, word: string) {
    setPours((prev) =>
      prev.map((p, i) => {
        if (i !== idx) return p;
        const has = p.flavorWords.includes(word);
        const flavorWords = has ? p.flavorWords.filter((w) => w !== word) : [...p.flavorWords, word].slice(0, 5);
        return { ...p, flavorWords };
      }),
    );
  }

  function handleSave() {
    saveTastingSession({
      flightId,
      pours,
      reflection,
      completedAt: new Date().toISOString(),
    });
    setSaved(true);
  }

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        {proofMode
          ? 'Proof mode — ladder pours with water experiment. Hold the house constant when you can.'
          : 'Pick a flight, pour small, write real notes. Sessions save locally for Level 2 checkpoint evidence.'}
      </p>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {TASTING_FLIGHTS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFlightId(f.id)}
            style={{
              padding: '8px 14px',
              fontSize: 12,
              borderRadius: 6,
              border: `1px solid ${flightId === f.id ? ACCENT : 'var(--foundry-border)'}`,
              background: flightId === f.id ? 'var(--foundry-border-warm)' : 'transparent',
              color: flightId === f.id ? 'var(--foundry-text)' : 'var(--foundry-text-muted)',
              cursor: 'pointer',
            }}
          >
            {f.title}
          </button>
        ))}
      </div>

      <article style={{ marginTop: 20, padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 10 }}>
        <p style={{ color: ACCENT, fontSize: 11, margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Variable held</p>
        <p style={{ color: 'var(--foundry-text)', fontSize: 16, marginTop: 8 }}>{flight.variable}</p>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 10, lineHeight: 1.6 }}>{flight.tagline}</p>
        <ol style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 14, paddingLeft: 20, lineHeight: 1.7 }}>
          {flight.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12, fontStyle: 'italic' }}>{flight.whatToNotice}</p>
        {flight.academySlug && (
          <Link href={`/bourbon/academy/${flight.academySlug}`} style={{ display: 'inline-block', marginTop: 12, color: ACCENT, fontSize: 13 }}>
            Related academy lesson →
          </Link>
        )}
      </article>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
          Nosing checklist
        </h2>
        <ul style={{ marginTop: 10, paddingLeft: 20, color: 'var(--foundry-text-muted)', fontSize: 13, lineHeight: 1.8 }}>
          {NOSING_CHECKLIST.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
          Note cards
        </h2>
        <div style={{ marginTop: 14, display: 'grid', gap: 16 }}>
          {pours.map((pour, idx) => {
            const b = bottles[idx];
            if (!b) return null;
            return (
              <div key={pour.bottleSlug} style={{ padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ color: 'var(--foundry-text)', fontSize: 15, margin: 0 }}>{b.name}</p>
                    <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>
                      {b.proof} proof · {b.mashbill} · {b.category.replace(/_/g, ' ')}
                    </p>
                  </div>
                  <Link href={`/bourbon/bottles/${b.slug}`} style={{ color: ACCENT, fontSize: 12 }}>
                    Bottle →
                  </Link>
                </div>
                <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
                  {(['nose', 'palate', 'finish'] as const).map((field) => (
                    <label key={field} style={{ display: 'block' }}>
                      <span style={{ color: 'var(--foundry-text-faint)', fontSize: 11, textTransform: 'capitalize' }}>{field}</span>
                      <input
                        value={pour[field]}
                        onChange={(e) => updatePour(idx, { [field]: e.target.value })}
                        placeholder={field === 'finish' ? 'short / medium / long + one word' : 'one specific word or phrase'}
                        style={{ width: '100%', marginTop: 4, padding: '8px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border)', background: 'var(--foundry-surface-raised)', color: 'var(--foundry-text)' }}
                      />
                    </label>
                  ))}
                </div>
                <div style={{ marginTop: 12 }}>
                  <span style={{ color: 'var(--foundry-text-faint)', fontSize: 11 }}>Flavor words</span>
                  <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {FLAVOR_SUGGESTIONS.map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => toggleWord(idx, w)}
                        style={{
                          padding: '4px 10px',
                          fontSize: 11,
                          borderRadius: 4,
                          border: `1px solid ${pour.flavorWords.includes(w) ? ACCENT : 'var(--foundry-border)'}`,
                          background: pour.flavorWords.includes(w) ? 'var(--foundry-border-warm)' : 'transparent',
                          color: pour.flavorWords.includes(w) ? 'var(--foundry-text)' : 'var(--foundry-text-muted)',
                          cursor: 'pointer',
                          textTransform: 'capitalize',
                        }}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <label style={{ display: 'block' }}>
          <span style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>Flight reflection — which pour won and why?</span>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            rows={3}
            style={{ width: '100%', marginTop: 8, padding: 12, fontSize: 13, borderRadius: 8, border: '1px solid var(--foundry-border)', background: 'var(--foundry-surface-raised)', color: 'var(--foundry-text)', resize: 'vertical' }}
          />
        </label>
        <button
          type="button"
          onClick={handleSave}
          style={{ marginTop: 12, padding: '10px 20px', fontSize: 13, borderRadius: 6, border: 'none', background: ACCENT, color: 'var(--foundry-bg)', cursor: 'pointer', fontWeight: 600 }}
        >
          Save session
        </button>
        {saved && (
          <p style={{ color: ACCENT, fontSize: 13, marginTop: 10 }}>
            Saved — {historyCount + 1} session{historyCount + 1 !== 1 ? 's' : ''} in journal.
            <Link href="/bourbon/portfolio" style={{ color: ACCENT, marginLeft: 8 }}>My Shelf →</Link>
          </p>
        )}
      </section>

      <RabbitHoleFooter seed="tasting-lab" />
    </div>
  );
}
