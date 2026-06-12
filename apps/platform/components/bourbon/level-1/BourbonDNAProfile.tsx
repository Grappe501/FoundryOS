'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { computeBourbonDna } from '../../../lib/bourbon-level-1/dna-engine';
import { getBlindScores, getBracketVotes } from '../../../lib/bourbon-level-1/storage';

const ACCENT = 'var(--foundry-primary)';

export function BourbonDNAProfile() {
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<ReturnType<typeof computeBourbonDna>>(null);

  useEffect(() => {
    setMounted(true);
    setProfile(computeBourbonDna());
  }, []);

  if (!mounted) return <p style={{ color: '#6B6B70' }}>Loading…</p>;

  if (!profile) {
    return (
      <div>
        <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.7 }}>
          Your Bourbon DNA forms from brackets, blind games, and distillery war votes.
          Play a few rounds — then come back.
        </p>
        <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <Link href="/bourbon/games" style={{ padding: '10px 18px', background: '#4A4020', borderRadius: 6, color: '#E8E8EC', fontSize: 13, textDecoration: 'none' }}>
            Play blind games →
          </Link>
          <Link href="/bourbon/wars" style={{ padding: '10px 18px', background: '#1A1A1E', borderRadius: 6, color: '#8A8A8E', fontSize: 13, textDecoration: 'none' }}>
            Distillery wars →
          </Link>
        </div>
      </div>
    );
  }

  const votes = getBracketVotes().length;
  const scores = getBlindScores().length;

  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.7 }}>{profile.summary}</p>
      <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{votes} bracket picks · {scores} game rounds</p>

      <section style={{ marginTop: 28, padding: 24, background: '#111114', borderRadius: 12, border: `1px solid ${ACCENT}44` }}>
        <h2 style={{ fontSize: 14, color: ACCENT, fontWeight: 400, margin: 0 }}>You prefer</h2>
        <ul style={{ color: '#E8E8EC', fontSize: 15, marginTop: 16, paddingLeft: 20, lineHeight: 1.8 }}>
          {profile.mashbill.map((m) => (
            <li key={m.style}>{m.label} ({m.confidence}% confidence)</li>
          ))}
          <li>{profile.proofPreference}</li>
          <li>{profile.agePreference}</li>
          {profile.flavorProfile.length > 0 && <li>Flavor lean: {profile.flavorProfile.join(', ')}</li>}
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 14, color: '#6B6B70', fontWeight: 400 }}>Recommended next bottles</h2>
        <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
          {profile.recommendedBottles.map((b) => (
            <div key={b.slug} style={{ padding: 16, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
              <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0 }}>{b.name}</p>
              <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6 }}>{b.oneLiner}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
