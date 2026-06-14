'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LABEL_DECODER_DRILLS, getLabelDrill } from '../../../lib/bourbon-level-4/label-decoder-drills';
import { getBottleXRay } from '../../../lib/bourbon-level-1/agency/bottle-xray';
import { getBottle } from '../../../lib/bourbon-level-1/bottles';
import { saveLabelDecodeSession } from '../../../lib/bourbon-level-4/storage';

const ACCENT = 'var(--foundry-primary)';

type Props = { initialDrillId?: string };

export function LabelDecoderTool({ initialDrillId }: Props) {
  const [drillId, setDrillId] = useState(initialDrillId ?? LABEL_DECODER_DRILLS[0].id);
  const [prediction, setPrediction] = useState('');
  const [notes, setNotes] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [saved, setSaved] = useState(false);

  const drill = getLabelDrill(drillId) ?? LABEL_DECODER_DRILLS[0];
  const xray = getBottleXRay(drill.bottleSlug);
  const bottle = getBottle(drill.bottleSlug);

  useEffect(() => {
    setRevealed(false);
    setSaved(false);
    setPrediction('');
    setNotes('');
  }, [drillId]);

  function handleSave() {
    saveLabelDecodeSession({
      drillId,
      prediction,
      notes,
      completedAt: new Date().toISOString(),
    });
    setSaved(true);
  }

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Read the label cold — predict the pour before reveal. Eight drills from BiB to barrel proof to craft NCF.
      </p>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {LABEL_DECODER_DRILLS.map((d) => (
          <button key={d.id} type="button" onClick={() => setDrillId(d.id)} style={chip(drillId === d.id)}>
            {d.title}
          </button>
        ))}
      </div>

      <section style={{ marginTop: 24, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
        <p style={{ color: ACCENT, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Drill</p>
        <h2 style={{ fontWeight: 400, fontSize: '1.35rem', marginTop: 8 }}>{drill.title}</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 10 }}>{drill.prompt}</p>

        {!revealed ? (
          <>
            <p style={{ fontSize: 13, color: 'var(--foundry-text-faint)', marginTop: 16 }}>Fields to read on label</p>
            <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, lineHeight: 1.6 }}>
              {drill.fieldsToRead.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p style={{ fontSize: 13, color: ACCENT, marginTop: 12 }}>{drill.predictQuestion}</p>
            <textarea
              value={prediction}
              onChange={(e) => { setPrediction(e.target.value); setSaved(false); }}
              placeholder="Your prediction — mash, proof, category, nose expectation"
              rows={3}
              style={textareaStyle}
            />
            <button type="button" onClick={() => setRevealed(true)} style={primaryBtn}>
              Reveal bottle + X-Ray
            </button>
          </>
        ) : (
          <>
            {bottle && (
              <div style={{ marginTop: 16, padding: 14, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
                <Link href={`/bourbon/bottles/${bottle.slug}`} style={{ color: 'var(--foundry-text)', fontSize: 16, textDecoration: 'none' }}>
                  {bottle.name}
                </Link>
                <p style={{ fontSize: 12, color: 'var(--foundry-text-faint)', marginTop: 6 }}>
                  ${bottle.priceUsd} · {bottle.proof} proof · {bottle.category.replace(/_/g, ' ')} · {bottle.mashbill}
                </p>
              </div>
            )}
            {xray && (
              <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
                {xray.layers.slice(0, 5).map((l) => (
                  <div key={l.label} style={{ fontSize: 13 }}>
                    <span style={{ color: ACCENT }}>{l.label}: </span>
                    <span style={{ color: 'var(--foundry-text-muted)' }}>{l.value}</span>
                  </div>
                ))}
              </div>
            )}
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 16, fontStyle: 'italic' }}>{drill.revealInsight}</p>
            <textarea
              value={notes}
              onChange={(e) => { setNotes(e.target.value); setSaved(false); }}
              placeholder="Was your prediction right? One sentence lesson."
              rows={2}
              style={{ ...textareaStyle, marginTop: 12 }}
            />
            <div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
              <button type="button" onClick={handleSave} style={primaryBtn}>Save decode</button>
              <Link href={`/bourbon/x-ray?bottle=${drill.bottleSlug}`} style={{ color: ACCENT, fontSize: 12 }}>Full X-Ray →</Link>
              {saved && <span style={{ color: ACCENT, fontSize: 13 }}>Saved</span>}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

const textareaStyle = {
  width: '100%',
  padding: 12,
  fontSize: 13,
  borderRadius: 6,
  border: '1px solid var(--foundry-border-subtle)',
  background: 'var(--foundry-surface-raised)',
  color: 'var(--foundry-text)',
  resize: 'vertical' as const,
};

const primaryBtn = {
  marginTop: 16,
  padding: '10px 18px',
  fontSize: 13,
  borderRadius: 6,
  border: 'none',
  background: 'var(--foundry-primary)',
  color: 'var(--foundry-bg)',
  cursor: 'pointer' as const,
};

function chip(active: boolean) {
  return {
    padding: '8px 14px',
    fontSize: 12,
    borderRadius: 6,
    border: `1px solid ${active ? 'var(--foundry-primary)' : 'var(--foundry-border-subtle)'}`,
    background: active ? 'var(--foundry-surface-raised)' : 'transparent',
    color: active ? 'var(--foundry-primary)' : 'var(--foundry-text-muted)',
    cursor: 'pointer' as const,
  };
}
