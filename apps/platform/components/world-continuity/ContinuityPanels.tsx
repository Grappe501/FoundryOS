'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { resolveJourneyContinuity, resolveWorldContinuity, resolveMemoryTimeline } from '@foundry/world-continuity-engine';
import { assembleAllContinuityBundles, assembleContinuityBundle } from '../../lib/world-continuity/assemble-signals';
import { recordWorldVisit } from '../../lib/world-continuity/client-state';

const ACCENT = '#6B9BC9';

export function JourneyContinuityPanel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const snapshot = useMemo(() => {
    if (!mounted) return null;
    return resolveJourneyContinuity(assembleAllContinuityBundles());
  }, [mounted]);

  if (!mounted || !snapshot) return null;

  const hasStory = snapshot.last_time_you_were.length > 0 || snapshot.active_memory.length > 0;

  return (
    <section
      style={{
        marginTop: 28,
        padding: 24,
        background: 'linear-gradient(135deg, #0F1018 0%, #111114 100%)',
        border: '1px solid #2A3A4A',
        borderRadius: 10,
      }}
    >
      <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
        {snapshot.headline}
      </p>
      <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.75 }}>{snapshot.intro}</p>

      {snapshot.last_time_you_were.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <p style={{ color: '#6B6B70', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
            Last time you were
          </p>
          <ul style={{ margin: '12px 0 0', paddingLeft: 18, color: '#E8E8EC', fontSize: 14, lineHeight: 1.8 }}>
            {snapshot.last_time_you_were.map((w) => (
              <li key={w.world_name}>
                <Link href={w.href} style={{ color: ACCENT, textDecoration: 'none' }}>
                  {w.world_name}
                </Link>
                {' — '}
                {w.summary}
              </li>
            ))}
          </ul>
        </div>
      )}

      {snapshot.since_then.length > 0 && hasStory && (
        <div style={{ marginTop: 20 }}>
          <p style={{ color: '#6B6B70', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
            Since then
          </p>
          <ul style={{ margin: '10px 0 0', paddingLeft: 18, color: '#8A8A8E', fontSize: 13, lineHeight: 1.7 }}>
            {snapshot.since_then.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {snapshot.active_memory.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <p style={{ color: 'var(--foundry-primary)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
            Unfinished business
          </p>
          <ul style={{ margin: '10px 0 0', paddingLeft: 18 }}>
            {snapshot.active_memory.slice(0, 5).map((t) => (
              <li key={t.id} style={{ marginTop: 6 }}>
                <Link href={t.href} style={{ color: '#E8E8EC', fontSize: 13, textDecoration: 'none' }}>
                  {t.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {snapshot.anticipation && (
        <div style={{ marginTop: 20, padding: 16, background: '#0A1218', borderRadius: 8, border: '1px solid #2A3A4A' }}>
          <p style={{ color: '#6B9B6B', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
            Anticipation
          </p>
          <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 10, lineHeight: 1.7 }}>{snapshot.anticipation.curiosity}</p>
          <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.65 }}>{snapshot.anticipation.suggestion}</p>
          <Link href={snapshot.anticipation.href} style={{ color: ACCENT, fontSize: 13, marginTop: 12, display: 'inline-block' }}>
            {snapshot.anticipation.label} →
          </Link>
        </div>
      )}

      {snapshot.story_memory.length > 0 && (
        <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {snapshot.story_memory.map((m) => (
            <span
              key={m.id}
              title={m.story}
              style={{ padding: '6px 12px', background: '#1A160F', borderRadius: 4, fontSize: 11, color: 'var(--foundry-primary)' }}
            >
              {m.title}
            </span>
          ))}
        </div>
      )}

      <Link href="/passport/timeline" style={{ display: 'inline-block', marginTop: 20, color: '#6B6B70', fontSize: 12 }}>
        View memory timeline →
      </Link>
    </section>
  );
}

export function WorldContinuityReturnPanel({ worldSlug, accent = ACCENT }: { worldSlug: string; accent?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    recordWorldVisit(worldSlug);
  }, [worldSlug]);

  const snapshot = useMemo(() => {
    if (!mounted) return null;
    return resolveWorldContinuity(assembleContinuityBundle(worldSlug));
  }, [mounted, worldSlug]);

  if (!mounted || !snapshot) return null;

  const isEmpty =
    snapshot.active_memory.length === 0 &&
    snapshot.story_memory.length === 0 &&
    snapshot.context.startsWith('You were getting your bearings');

  if (isEmpty) {
    return (
      <section style={{ marginTop: 24, padding: 18, background: '#111114', borderRadius: 8, border: `1px solid ${accent}33` }}>
        <p style={{ color: accent, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
          World continuity
        </p>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.6 }}>
          Leave evidence here — a mystery, a saved rabbit hole, a collection almost done — and Foundry will remember where you left off.
        </p>
        <Link href={`/${worldSlug}/today`} style={{ color: accent, fontSize: 13, marginTop: 10, display: 'inline-block' }}>
          See what is alive today →
        </Link>
      </section>
    );
  }

  return (
    <section style={{ marginTop: 24, padding: 22, background: '#111114', borderRadius: 10, border: `1px solid ${accent}44` }}>
      <p style={{ color: accent, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
        Last time you were here
      </p>
      <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 12, lineHeight: 1.75, whiteSpace: 'pre-line' }}>{snapshot.narrative}</p>

      {snapshot.since_then.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <p style={{ color: '#6B6B70', fontSize: 11, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Since then
          </p>
          {snapshot.since_then.map((line) => (
            <p key={line} style={{ color: '#8A8A8E', fontSize: 13, margin: '6px 0 0', lineHeight: 1.6 }}>
              • {line}
            </p>
          ))}
        </div>
      )}

      {snapshot.anticipation && (
        <div style={{ marginTop: 18, padding: 14, background: '#0A1218', borderRadius: 8 }}>
          <p style={{ color: '#6B9B6B', fontSize: 11, margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            What comes next
          </p>
          <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 8, lineHeight: 1.65 }}>{snapshot.anticipation.suggestion}</p>
        </div>
      )}

      <Link
        href={snapshot.continue.href}
        style={{
          display: 'inline-block',
          marginTop: 18,
          padding: '10px 16px',
          background: '#1A2530',
          borderRadius: 6,
          color: '#E8E8EC',
          fontSize: 13,
          textDecoration: 'none',
          border: `1px solid ${accent}55`,
        }}
      >
        {snapshot.headline} — {snapshot.continue.label} →
      </Link>
    </section>
  );
}

export function MemoryTimelinePanel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const entries = useMemo(() => {
    if (!mounted) return [];
    return resolveMemoryTimeline(assembleAllContinuityBundles());
  }, [mounted]);

  if (!mounted) return null;

  const byMonth = entries.reduce<Record<string, typeof entries>>((acc, e) => {
    (acc[e.month_label] ??= []).push(e);
    return acc;
  }, {});

  return (
    <section style={{ marginTop: 28 }}>
      {entries.length === 0 ? (
        <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.75 }}>
          Your memory timeline starts when you leave evidence — a first tasting, a closed mystery, a completed collection.
          Not activity. Stories.
        </p>
      ) : (
        Object.entries(byMonth).map(([month, items]) => (
          <div key={month} style={{ marginBottom: 28 }}>
            <p style={{ color: 'var(--foundry-primary)', fontSize: 13, letterSpacing: '0.06em', margin: '0 0 12px' }}>{month}</p>
            {items.map((e) => (
              <div
                key={e.id}
                style={{ marginBottom: 16, paddingLeft: 16, borderLeft: '2px solid #2A2520' }}
              >
                {e.href ? (
                  <Link href={e.href} style={{ color: '#E8E8EC', fontSize: 15, textDecoration: 'none' }}>
                    {e.title}
                  </Link>
                ) : (
                  <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0 }}>{e.title}</p>
                )}
                <p style={{ color: '#6B6B70', fontSize: 12, margin: '4px 0 0' }}>{e.world_name}</p>
                {e.story && (
                  <p style={{ color: '#8A8A8E', fontSize: 13, margin: '6px 0 0', lineHeight: 1.6 }}>{e.story}</p>
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </section>
  );
}
