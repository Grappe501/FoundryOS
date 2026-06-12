'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FLAVOR_WHEEL_NOTES, flavorWheelSummary, type FlavorNote, type FlavorWheelProfile } from '../../../lib/bourbon-level-1/agency/flavor-wheel';
import { getFlavorWheel, saveFlavorWheel } from '../../../lib/bourbon-level-1/storage';
import { RabbitHoleFooter } from './RabbitHoleFooter';

const ACCENT = '#C8A96E';

export function FlavorWheelBuilder() {
  const [profile, setProfile] = useState<FlavorWheelProfile>({ notes: {}, updatedAt: new Date().toISOString() });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = getFlavorWheel();
    if (saved) setProfile(saved);
  }, []);

  function adjust(note: FlavorNote, delta: number) {
    const next: FlavorWheelProfile = {
      notes: { ...profile.notes, [note]: Math.max(0, Math.min(10, (profile.notes[note] ?? 0) + delta)) },
      updatedAt: new Date().toISOString(),
    };
    setProfile(next);
    saveFlavorWheel(next);
  }

  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.7 }}>
        Drag intensity with +/− — your wheel saves into Bourbon DNA flavor lean.
      </p>
      <div style={{ marginTop: 24, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {FLAVOR_WHEEL_NOTES.map((note) => (
          <div key={note} style={{ padding: 14, background: '#111114', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#E8E8EC', fontSize: 14, textTransform: 'capitalize' }}>{note}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button type="button" onClick={() => adjust(note, -1)} style={{ width: 28, height: 28, borderRadius: 4, border: '1px solid #2A2A2E', background: 'transparent', color: '#8A8A8E', cursor: 'pointer' }}>−</button>
              <span style={{ color: ACCENT, minWidth: 20, textAlign: 'center' }}>{profile.notes[note] ?? 0}</span>
              <button type="button" onClick={() => adjust(note, 1)} style={{ width: 28, height: 28, borderRadius: 4, border: '1px solid #2A2A2E', background: 'transparent', color: ACCENT, cursor: 'pointer' }}>+</button>
            </div>
          </div>
        ))}
      </div>
      {mounted && (
        <article style={{ marginTop: 24, padding: 18, background: '#2A2520', borderRadius: 10 }}>
          <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{flavorWheelSummary(profile)}</p>
          <Link href="/bourbon/dna" style={{ display: 'inline-block', marginTop: 12, color: ACCENT, fontSize: 13 }}>View Bourbon DNA →</Link>
        </article>
      )}
      <RabbitHoleFooter seed="flavor-wheel" />
    </div>
  );
}
