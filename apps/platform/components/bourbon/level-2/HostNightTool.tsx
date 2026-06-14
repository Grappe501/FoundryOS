'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { HOST_NIGHT_KITS, getHostNightKit } from '../../../lib/bourbon-level-2/host-night-kits';
import { getBottle } from '../../../lib/bourbon-level-1/bottles';
import { markHostNightComplete, getLevel2Stats } from '../../../lib/bourbon-level-2/storage';

const ACCENT = 'var(--foundry-primary)';

type Props = { initialKitId?: string };

export function HostNightTool({ initialKitId }: Props) {
  const defaultId = initialKitId ?? HOST_NIGHT_KITS[0].id;
  const [kitId, setKitId] = useState(defaultId);
  const kit = getHostNightKit(kitId) ?? HOST_NIGHT_KITS[0];
  const [completed, setCompleted] = useState(false);
  const [hostCount, setHostCount] = useState(0);

  useEffect(() => {
    const s = getLevel2Stats();
    setHostCount(s.hostNights);
  }, [completed]);

  const bottles = useMemo(
    () => kit.flightOrder.map((s) => getBottle(s)).filter(Boolean),
    [kit],
  );

  function handleComplete() {
    markHostNightComplete(kitId);
    setCompleted(true);
  }

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Pre-built host scenarios — pour order, talking points, and avoid traps. Guests rank before you lecture.
      </p>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {HOST_NIGHT_KITS.map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => { setKitId(k.id); setCompleted(false); }}
            style={{
              padding: '8px 14px',
              fontSize: 12,
              borderRadius: 6,
              border: `1px solid ${kitId === k.id ? ACCENT : 'var(--foundry-border-subtle)'}`,
              background: kitId === k.id ? 'var(--foundry-surface-raised)' : 'var(--foundry-surface)',
              color: kitId === k.id ? ACCENT : 'var(--foundry-text-muted)',
              cursor: 'pointer',
            }}
          >
            {k.title}
          </button>
        ))}
      </div>

      <section style={{ marginTop: 24, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
        <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>{kit.guestProfile}</p>
        <h2 style={{ fontWeight: 400, fontSize: '1.35rem', marginTop: 8, marginBottom: 0 }}>{kit.title}</h2>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 6 }}>{kit.duration}</p>

        <h3 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400, marginTop: 20, marginBottom: 10 }}>Pour order</h3>
        <div style={{ display: 'grid', gap: 8 }}>
          {bottles.map((b, i) => b && (
            <div key={b.slug} style={{ padding: '12px 14px', background: 'var(--foundry-surface-raised)', borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'var(--foundry-text)' }}>
                <span style={{ color: 'var(--foundry-text-faint)', marginRight: 8 }}>{i + 1}.</span>
                {b.name}
              </span>
              <span style={{ fontSize: 12, color: 'var(--foundry-text-faint)' }}>{b.proof} proof · ${b.priceUsd}</span>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400, marginTop: 20, marginBottom: 10 }}>Talking points</h3>
        <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 14, lineHeight: 1.65, margin: 0, paddingLeft: 20 }}>
          {kit.talkingPoints.map((t) => (
            <li key={t} style={{ marginBottom: 6 }}>{t}</li>
          ))}
        </ul>

        <h3 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400, marginTop: 20, marginBottom: 10 }}>Avoid</h3>
        <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, lineHeight: 1.6, margin: 0, paddingLeft: 20 }}>
          {kit.avoid.map((a) => (
            <li key={a} style={{ marginBottom: 4 }}>{a}</li>
          ))}
        </ul>

        <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          {kit.linkedFlightId && (
            <Link href={`/bourbon/tasting-lab?flight=${kit.linkedFlightId}`} style={{ color: ACCENT, fontSize: 12 }}>Matching flight →</Link>
          )}
          {kit.linkedBlindId && (
            <Link href={`/bourbon/blind-flight?preset=${kit.linkedBlindId}`} style={{ color: ACCENT, fontSize: 12 }}>Blind version →</Link>
          )}
          <button
            type="button"
            onClick={handleComplete}
            style={{
              padding: '10px 18px',
              fontSize: 13,
              borderRadius: 6,
              border: 'none',
              background: ACCENT,
              color: 'var(--foundry-bg)',
              cursor: 'pointer',
            }}
          >
            Mark host night complete
          </button>
          {completed && <span style={{ color: ACCENT, fontSize: 13 }}>Logged · {hostCount} host nights</span>}
        </div>
      </section>
    </div>
  );
}
