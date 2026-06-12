'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  discoverCrossWorldPaths,
  generateDailyHooks,
  generateMentorInsights,
  generateMentorChallenges,
  getAdaptiveRecommendations,
  getSomeoneLikeMePatterns,
  getWorldCrossovers,
  getLegendaryObject,
  buildMentorMemory,
  pickPrimaryMentorInsight,
} from '@foundry/mentor-engine';
import {
  buildLivingJourneySnapshot,
  getStoredDisplayName,
  setStoredDisplayName,
} from '../../lib/living-worlds/client-journey';

const ACCENT = '#6B9B6B';

export function DailyFoundryHook({ compact = false }: { compact?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const snapshot = useMemo(() => (mounted ? buildLivingJourneySnapshot() : null), [mounted]);

  useEffect(() => setMounted(true), []);

  if (!mounted || !snapshot) return null;

  const hooks = generateDailyHooks(snapshot);
  const primary = hooks[0];

  return (
    <section
      style={{
        marginTop: compact ? 0 : 24,
        padding: compact ? 18 : 24,
        background: 'linear-gradient(135deg, #0F1210 0%, #111114 100%)',
        border: '1px solid #2A3A2A',
        borderRadius: 10,
      }}
    >
      <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
        For you today
      </p>
      <p style={{ color: '#E8E8EC', fontSize: compact ? 15 : 17, marginTop: 10, lineHeight: 1.5 }}>
        <span style={{ color: ACCENT }}>{primary.headline}</span> {primary.body}
      </p>
      {!compact && hooks.length > 1 && (
        <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
          {hooks.slice(1, 3).map((h) => (
            <Link
              key={h.id}
              href={h.href}
              style={{
                display: 'block',
                padding: 12,
                background: '#0F0F12',
                borderRadius: 6,
                textDecoration: 'none',
                color: '#8A8A8E',
                fontSize: 13,
              }}
            >
              <span style={{ color: '#E8E8EC' }}>{h.headline}</span> — {h.body.slice(0, 80)}…
            </Link>
          ))}
        </div>
      )}
      <Link href="/my-journey" style={{ display: 'inline-block', marginTop: 14, color: ACCENT, fontSize: 13 }}>
        Open My Journey →
      </Link>
    </section>
  );
}

export function WorldMentorPanel({ worldSlug }: { worldSlug: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const snapshot = buildLivingJourneySnapshot();
  const worldInsight = generateMentorInsights(snapshot).find((i) => i.world_slug === worldSlug);
  const insight = worldInsight ?? pickPrimaryMentorInsight(snapshot);
  const adaptive = getAdaptiveRecommendations(snapshot, worldSlug).slice(0, 2);
  const memory = buildMentorMemory(snapshot, snapshot.identity).filter((m) => !m.world_slug || m.world_slug === worldSlug).slice(0, 2);
  const challenges = generateMentorChallenges(snapshot, snapshot.identity).filter((c) => c.world_slug === worldSlug).slice(0, 1);
  const patterns = getSomeoneLikeMePatterns(snapshot, worldSlug);

  return (
    <section
      style={{
        marginTop: 24,
        padding: 22,
        background: '#111114',
        border: '1px solid #2A3A2A',
        borderRadius: 10,
      }}
    >
      <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
        {insight.mentor_name} · your mentor
      </p>
      {insight.becoming && (
        <p style={{ color: '#C8A96E', fontSize: 13, marginTop: 10, fontStyle: 'italic' }}>Becoming: {insight.becoming}</p>
      )}
      <h2 style={{ fontSize: 17, fontWeight: 400, marginTop: 10, color: '#E8E8EC', lineHeight: 1.4 }}>{insight.headline}</h2>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.7 }}>{insight.body}</p>
      {memory.length > 0 && (
        <div style={{ marginTop: 14, padding: 12, background: '#0F1210', borderRadius: 6, borderLeft: `3px solid ${ACCENT}` }}>
          <p style={{ color: '#6B6B70', fontSize: 10, margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>I remember</p>
          {memory.map((m, i) => (
            <p key={i} style={{ color: '#8A8A8E', fontSize: 13, margin: '6px 0 0', lineHeight: 1.5 }}>{m.text}</p>
          ))}
        </div>
      )}
      {challenges.map((c) => (
        <div key={c.id} style={{ marginTop: 14, padding: 14, background: '#1A1A20', borderRadius: 6, border: '1px solid #2A2A3A' }}>
          <p style={{ color: '#6B9BD4', fontSize: 11, margin: 0 }}>Challenge · {c.expires_hint}</p>
          <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 6 }}>{c.title}</p>
          <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>{c.body}</p>
          <Link href={c.href} style={{ color: ACCENT, fontSize: 12, marginTop: 8, display: 'inline-block' }}>Accept →</Link>
        </div>
      ))}
      {patterns.map((p, i) => (
        <p key={i} style={{ color: '#6B6B70', fontSize: 12, marginTop: 14, lineHeight: 1.5 }}>
          <span style={{ color: '#8A8A8E' }}>{p.message}</span>{' '}
          <Link href={p.href} style={{ color: ACCENT }}>{p.next_label} →</Link>
        </p>
      ))}
      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {insight.actions.slice(0, 3).map((a) => (
          <Link
            key={a.href}
            href={a.href}
            style={{
              padding: '8px 14px',
              background: '#2A4A2A',
              borderRadius: 6,
              color: '#E8E8EC',
              fontSize: 12,
              textDecoration: 'none',
            }}
          >
            {a.label}
          </Link>
        ))}
      </div>
      {adaptive.length > 0 && (
        <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #1A1A1E' }}>
          <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>Adaptive next steps</p>
          {adaptive.map((a) => (
            <Link key={a.href + a.title} href={a.href} style={{ display: 'block', marginTop: 8, color: '#8A8A8E', fontSize: 13, textDecoration: 'none' }}>
              → {a.title}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export function LivingJourneyDashboard() {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('You');
  const [editingName, setEditingName] = useState(false);

  useEffect(() => {
    setMounted(true);
    setName(getStoredDisplayName());
  }, []);

  if (!mounted) {
    return <p style={{ color: '#6B6B70', fontSize: 14, marginTop: 24 }}>Loading your journey…</p>;
  }

  const snapshot = buildLivingJourneySnapshot(name);
  const mentor = pickPrimaryMentorInsight(snapshot);
  const cross = discoverCrossWorldPaths(snapshot);
  const crossovers = getWorldCrossovers(snapshot);
  const adaptive = getAdaptiveRecommendations(snapshot);
  const hooks = generateDailyHooks(snapshot);
  const challenges = generateMentorChallenges(snapshot, snapshot.identity);
  const ambitions = snapshot.identity?.ambitions ?? [];
  const secretPaths = snapshot.secret_paths ?? [];
  const legendary = snapshot.unlocked_legendary ?? [];

  function saveName() {
    setStoredDisplayName(name);
    setEditingName(false);
  }

  const identities = snapshot.worlds.filter((w) => w.completed_missions.length > 0 || (w.journal_items ?? 0) > 0);

  return (
    <div>
      <DailyFoundryHook compact />

      <section style={{ marginTop: 32 }}>
        {editingName ? (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: 10, background: '#0F0F12', border: '1px solid #2A2A2E', borderRadius: 6, color: '#E8E8EC', fontSize: 16 }}
            />
            <button type="button" onClick={saveName} style={{ padding: '10px 16px', background: '#2A4A2A', border: 'none', borderRadius: 6, color: '#E8E8EC', cursor: 'pointer' }}>
              Save
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setEditingName(true)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
            <h1 style={{ fontWeight: 300, fontSize: '2.25rem', margin: 0, color: '#E8E8EC' }}>{name}</h1>
          </button>
        )}
        <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.6 }}>
          {ambitions.length > 0
            ? `Trying to become: ${ambitions.map((a) => a.label).join(' · ')}`
            : identities.length === 0
              ? 'You are becoming something — start one mission or map your future.'
              : `Becoming: ${identities.map((w) => w.identity_title).join(' · ')}`}
        </p>
        <Link href="/my-future" style={{ display: 'inline-block', marginTop: 10, color: ACCENT, fontSize: 13 }}>
          {ambitions.length > 0 ? 'Update ambitions →' : 'Map my future →'}
        </Link>
      </section>

      {secretPaths.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 14, color: '#C8A96E', fontWeight: 400 }}>Hidden paths discovered</h2>
          <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 6 }}>You did not pick these — Foundry noticed who you are becoming.</p>
          <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
            {secretPaths.map((p) => (
              <div key={p.id} id={`secret-${p.id}`} style={{ padding: 18, background: p.newly_discovered ? '#1A160F' : '#0F0F12', borderRadius: 8, border: `1px solid ${p.newly_discovered ? '#C8A96E44' : '#1A1A1E'}` }}>
                {p.newly_discovered && <p style={{ color: '#C8A96E', fontSize: 11, margin: '0 0 8px' }}>✦ Newly discovered</p>}
                <p style={{ color: '#E8E8EC', fontSize: 16, margin: 0 }}>{p.title}</p>
                <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6 }}>{p.tagline}</p>
                <ul style={{ color: '#6B6B70', fontSize: 12, marginTop: 10, paddingLeft: 18 }}>
                  {p.links_to.map((l) => (
                    <li key={l.world}>{l.label}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {legendary.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 14, color: '#C8A96E', fontWeight: 400 }}>Legendary objects</h2>
          <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {legendary.slice(0, 8).map((u) => {
              const obj = getLegendaryObject(u.object_id);
              if (!obj) return null;
              return (
                <div key={u.object_id} style={{ padding: 12, background: '#111114', borderRadius: 8, border: '1px solid #2A2520', maxWidth: 200 }}>
                  <span style={{ fontSize: 18 }}>{obj.icon}</span>
                  <p style={{ color: '#E8E8EC', fontSize: 13, margin: '8px 0 0' }}>{obj.title}</p>
                  <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 4, lineHeight: 1.4 }}>{obj.story}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {challenges.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 14, color: '#6B9BD4', fontWeight: 400 }}>Mentor challenges</h2>
          <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
            {challenges.map((c) => (
              <Link key={c.id} href={c.href} style={{ display: 'block', padding: 16, background: '#0F1014', borderRadius: 8, textDecoration: 'none', border: '1px solid #1A1A1E' }}>
                <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>{c.mentor_name} · {c.expires_hint}</p>
                <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 6 }}>{c.title}</p>
                <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>{c.body.slice(0, 120)}…</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {crossovers.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 14, color: '#6B9BC9', fontWeight: 400 }}>World crossovers</h2>
          <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
            {crossovers.map((x) => (
              <Link key={x.id} href={x.href} style={{ padding: 16, background: '#111114', borderRadius: 8, textDecoration: 'none', border: '1px solid #1A1A1E' }}>
                <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{x.title}</p>
                <p style={{ color: '#8A8A8E', fontSize: 12, marginTop: 6 }}>{x.description}</p>
                <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 6 }}>{x.worlds.join(' + ')}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: 28, padding: 24, background: '#111114', borderRadius: 10, border: '1px solid #2A3A2A' }}>
        <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>{mentor.mentor_name}</p>
        <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 8, color: '#E8E8EC' }}>{mentor.headline}</h2>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.7 }}>{mentor.body}</p>
        <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {mentor.actions.map((a) => (
            <Link key={a.href} href={a.href} style={{ padding: '8px 14px', background: '#2A4A2A', borderRadius: 6, color: '#E8E8EC', fontSize: 12, textDecoration: 'none' }}>
              {a.label}
            </Link>
          ))}
        </div>
      </section>

      {cross.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 14, color: '#C8A96E', fontWeight: 400 }}>Foundry expands you — next worlds</h2>
          <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 6 }}>Cross-world discovery from your evidence, not ads.</p>
          <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
            {cross.map((c) => (
              <Link
                key={c.world_slug}
                href={c.href}
                style={{ display: 'block', padding: 18, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E', textDecoration: 'none', color: 'inherit' }}
              >
                <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0 }}>{c.world_name}</p>
                <p style={{ color: ACCENT, fontSize: 13, marginTop: 6 }}>{c.reason}</p>
                <ul style={{ color: '#6B6B70', fontSize: 12, margin: '10px 0 0', paddingLeft: 18 }}>
                  {c.because.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 14, color: '#6B6B70', fontWeight: 400 }}>Current missions & evidence</h2>
        <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
          {snapshot.worlds.map((w) => (
            <div key={w.world_slug} style={{ padding: 16, background: '#111114', borderRadius: 8, border: '1px solid #1A1A1E' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>{w.identity_title}</p>
                  <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 4 }}>{w.world_name}</p>
                </div>
                <p style={{ color: '#6B6B70', fontSize: 12 }}>
                  {w.completed_missions.length}/{w.mission_count} missions
                  {(w.journal_items ?? 0) > 0 && ` · ${w.journal_items} journal entries`}
                </p>
              </div>
              {w.completed_missions.slice(0, 2).map((m) => (
                <p key={m.missionSlug} style={{ color: '#8A8A8E', fontSize: 12, marginTop: 10, lineHeight: 1.5 }}>
                  ✓ {m.missionTitle}
                  {m.reflection && ` — "${m.reflection.slice(0, 80)}${m.reflection.length > 80 ? '…' : ''}"`}
                </p>
              ))}
              <Link href={`${w.href}/portfolio`} style={{ display: 'inline-block', marginTop: 10, color: ACCENT, fontSize: 12 }}>
                Open portfolio →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {adaptive.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 14, color: '#6B9BD4', fontWeight: 400 }}>Adaptive learning</h2>
          <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
            {adaptive.map((a) => (
              <Link key={a.href + a.title} href={a.href} style={{ padding: 14, background: '#0F1014', borderRadius: 6, textDecoration: 'none', color: '#8A8A8E', fontSize: 13 }}>
                <span style={{ color: '#E8E8EC' }}>{a.title}</span> — {a.reason}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 14, color: '#6B6B70', fontWeight: 400 }}>Today&apos;s threads</h2>
        <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
          {hooks.map((h) => (
            <Link key={h.id} href={h.href} style={{ padding: 14, background: '#111114', borderRadius: 6, textDecoration: 'none', color: '#8A8A8E', fontSize: 13 }}>
              <span style={{ color: '#E8E8EC' }}>{h.headline}</span> {h.body}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
