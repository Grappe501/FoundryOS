'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { resolveFoundryIdentityStory } from '@foundry/identity-narrative-engine';
import { FOUNDRY_VISION_STATEMENT, VIRAL_SHARE_HOOK } from '@foundry/ownership-graph';
import { assembleAllSignalBundles } from '../../lib/identity-narrative/assemble-signals';
import { getStoredDisplayName } from '../../lib/living-worlds/client-journey';
import { IdentityStoryPanel } from '../../components/identity-narrative/IdentityStoryPanel';

export function IdentityNarrativePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const name = mounted ? getStoredDisplayName() : 'You';
  const recognition = useMemo(() => {
    if (!mounted) return null;
    const { story } = resolveFoundryIdentityStory(assembleAllSignalBundles(), name);
    return story.primary_world?.recognition ?? story.primary_world?.mentor_notice;
  }, [mounted, name]);

  return (
    <>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Home</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Foundry Identity</h1>
      <p style={{ color: '#8A8A8E', marginTop: 8, fontSize: 14 }}>
        Not an account — who you are becoming across every world.
      </p>

      {recognition && (
        <section style={{ marginTop: 28, padding: 24, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
          <div style={{ fontSize: 22, fontWeight: 300 }}>{name}</div>
          <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 16, lineHeight: 1.75 }}>{recognition}</p>
          <Link href="/passport" style={{ display: 'inline-block', marginTop: 16, color: '#C8A96E', fontSize: 13 }}>
            Foundry Passport →
          </Link>
        </section>
      )}

      <IdentityStoryPanel />

      <section style={{ marginTop: 32, padding: 20, background: '#0F0F12', border: '1px solid #1E1E22', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Share — {VIRAL_SHARE_HOOK}</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, lineHeight: 1.6 }}>
          {name} is becoming someone worth following — not what they consumed, what they are mastering.
        </p>
      </section>

      <section style={{ marginTop: 32, padding: 20, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
        <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0, lineHeight: 1.7 }}>{FOUNDRY_VISION_STATEMENT.headline}</p>
        {FOUNDRY_VISION_STATEMENT.lines.map((line) => (
          <p key={line} style={{ color: '#8A8A8E', fontSize: 14, margin: '8px 0 0', lineHeight: 1.6 }}>{line}</p>
        ))}
      </section>
    </>
  );
}
