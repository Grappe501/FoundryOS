'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AMBITION_IDENTITIES,
  DREAM_WANTS,
  getAmbitionSlugs,
  getDreamSlugs,
  setAmbitionSlugs,
  setDreamSlugs,
  addStatedGoal,
  getStatedGoals,
} from '../../lib/living-worlds/identity-storage';

const ACCENT = '#6B9B6B';

export function MyFutureDashboard() {
  const [ambitions, setAmbitions] = useState<string[]>([]);
  const [dreams, setDreams] = useState<string[]>([]);
  const [goalText, setGoalText] = useState('');
  const [goals, setGoals] = useState<{ text: string; at: string }[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAmbitions(getAmbitionSlugs());
    setDreams(getDreamSlugs());
    setGoals(getStatedGoals());
  }, []);

  function toggleAmbition(slug: string) {
    const next = ambitions.includes(slug) ? ambitions.filter((s) => s !== slug) : [...ambitions, slug].slice(0, 3);
    setAmbitions(next);
    setAmbitionSlugs(next);
  }

  function toggleDream(slug: string) {
    const next = dreams.includes(slug) ? dreams.filter((s) => s !== slug) : [...dreams, slug];
    setDreams(next);
    setDreamSlugs(next);
  }

  function saveGoal() {
    if (!goalText.trim()) return;
    addStatedGoal(goalText.trim());
    setGoals(getStatedGoals());
    setGoalText('');
  }

  if (!mounted) return <p style={{ color: '#6B6B70' }}>Loading…</p>;

  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
        Not a category — an identity. Mentors read this when they suggest what matters next.
      </p>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: ACCENT, fontWeight: 400 }}>What are you trying to become?</h2>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 6 }}>Pick up to 3</p>
        <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {AMBITION_IDENTITIES.map((a) => (
            <button
              key={a.slug}
              type="button"
              onClick={() => toggleAmbition(a.slug)}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: `1px solid ${ambitions.includes(a.slug) ? ACCENT : '#2A2A2E'}`,
                background: ambitions.includes(a.slug) ? '#1A2A1A' : '#111114',
                color: ambitions.includes(a.slug) ? '#E8E8EC' : '#8A8A8E',
                cursor: 'pointer',
                textAlign: 'left',
                maxWidth: 220,
              }}
            >
              <span style={{ display: 'block', fontSize: 14 }}>{a.label}</span>
              <span style={{ display: 'block', fontSize: 11, color: '#6B6B70', marginTop: 4 }}>{a.tagline}</span>
            </button>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 36 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', fontWeight: 400 }}>What do you want?</h2>
        <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {DREAM_WANTS.map((d) => (
            <button
              key={d.slug}
              type="button"
              onClick={() => toggleDream(d.slug)}
              style={{
                padding: '8px 14px',
                borderRadius: 999,
                border: `1px solid ${dreams.includes(d.slug) ? '#C8A96E' : '#2A2A2E'}`,
                background: dreams.includes(d.slug) ? '#2A2520' : 'transparent',
                color: dreams.includes(d.slug) ? '#E8E8EC' : '#8A8A8E',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {d.label}
            </button>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 36, padding: 22, background: '#111114', borderRadius: 10 }}>
        <h2 style={{ fontSize: 14, color: '#6B6B70', fontWeight: 400 }}>Tell your mentor in your own words</h2>
        <textarea
          value={goalText}
          onChange={(e) => setGoalText(e.target.value)}
          placeholder="e.g. I want to build something people would pay for by summer…"
          rows={3}
          style={{ width: '100%', marginTop: 12, padding: 12, background: '#0F0F12', border: '1px solid #2A2A2E', borderRadius: 6, color: '#E8E8EC', fontSize: 14, resize: 'vertical' }}
        />
        <button type="button" onClick={saveGoal} style={{ marginTop: 10, padding: '10px 18px', background: '#2A4A2A', border: 'none', borderRadius: 6, color: '#E8E8EC', cursor: 'pointer' }}>
          Save for mentor memory
        </button>
        {goals.length > 0 && (
          <ul style={{ marginTop: 16, paddingLeft: 18, color: '#8A8A8E', fontSize: 13 }}>
            {goals.slice(0, 3).map((g) => (
              <li key={g.at} style={{ marginBottom: 6 }}>{g.text}</li>
            ))}
          </ul>
        )}
      </section>

      <Link href="/my-journey" style={{ display: 'inline-block', marginTop: 28, color: ACCENT, fontSize: 14 }}>
        See how mentors use this → My Journey
      </Link>
    </div>
  );
}
