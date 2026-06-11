'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trackValidationEvent } from '../../lib/validation-tracker';

const WORLDS = [
  { slug: 'ai-builder', label: 'AI Builder' },
  { slug: 'financial-independence', label: 'Financial Independence' },
  { slug: 'public-speaking', label: 'Public Speaking' },
  { slug: 'bourbon', label: 'Bourbon' },
  { slug: 'bbq', label: 'BBQ' },
  { slug: 'poker', label: 'Poker' },
  { slug: 'civic-engagement', label: 'Civic Engagement' },
] as const;

const SEGMENTS = [
  { value: 'student', label: 'Student' },
  { value: 'parent', label: 'Parent' },
  { value: 'adult_learner', label: 'Adult learner' },
  { value: 'educator', label: 'Educator' },
] as const;

export function BetaJoinForm() {
  const [email, setEmail] = useState('');
  const [segment, setSegment] = useState<string>('adult_learner');
  const [worlds, setWorlds] = useState<string[]>(['ai-builder']);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  function toggleWorld(slug: string) {
    setWorlds((prev) => (prev.includes(slug) ? prev.filter((w) => w !== slug) : [...prev, slug]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    const res = await fetch('/api/beta/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, segment, interested_worlds: worlds }),
    });

    const data = await res.json();
    if (!res.ok) {
      setStatus('error');
      setError(data.error ?? 'Something went wrong');
      return;
    }

    void trackValidationEvent({ event_type: 'beta_joined', landing_page: '/beta', metadata: { segment, worlds } });
    setStatus('done');
  }

  if (status === 'done') {
    return (
      <section style={{ padding: 28, background: '#1A2A1A', borderRadius: 8, border: '1px solid #2A4A2A' }}>
        <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>You&apos;re on the list</p>
        <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 12, lineHeight: 1.6 }}>
          We&apos;ll invite handpicked testers soon. Meanwhile, explore worlds or create an account to save progress.
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/create-account" style={{ padding: '12px 20px', background: '#2A4A2A', borderRadius: 6, color: '#E8E8EC', fontSize: 14, textDecoration: 'none' }}>
            Create account →
          </Link>
          <Link href="/explore" style={{ padding: '12px 20px', border: '1px solid #1A1A1E', borderRadius: 6, color: '#8A8A8E', fontSize: 14, textDecoration: 'none' }}>
            Explore paths
          </Link>
        </div>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ display: 'block', color: '#8A8A8E', fontSize: 13 }}>
        Email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '12px 14px', marginTop: 8, background: '#111114', border: '1px solid #1A1A1E', borderRadius: 6, color: '#E8E8EC', fontSize: 14 }}
          placeholder="you@example.com"
        />
      </label>

      <label style={{ display: 'block', color: '#8A8A8E', fontSize: 13, marginTop: 20 }}>
        I am a…
        <select
          value={segment}
          onChange={(e) => setSegment(e.target.value)}
          style={{ width: '100%', padding: '12px 14px', marginTop: 8, background: '#111114', border: '1px solid #1A1A1E', borderRadius: 6, color: '#E8E8EC', fontSize: 14 }}
        >
          {SEGMENTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </label>

      <fieldset style={{ border: 'none', padding: 0, marginTop: 20 }}>
        <legend style={{ color: '#8A8A8E', fontSize: 13 }}>Interested worlds</legend>
        <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {WORLDS.map((w) => {
            const active = worlds.includes(w.slug);
            return (
              <button
                key={w.slug}
                type="button"
                onClick={() => toggleWorld(w.slug)}
                style={{
                  padding: '8px 14px',
                  fontSize: 12,
                  borderRadius: 6,
                  border: `1px solid ${active ? '#2A4A2A' : '#1A1A1E'}`,
                  background: active ? '#1A2A1A' : '#111114',
                  color: active ? '#6B9B6B' : '#8A8A8E',
                  cursor: 'pointer',
                }}
              >
                {w.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {error && <p style={{ color: '#C8A96E', fontSize: 13, marginTop: 16 }}>{error}</p>}

      <button
        type="submit"
        disabled={status === 'loading' || worlds.length === 0}
        style={{
          marginTop: 24,
          padding: '14px 28px',
          background: '#2A4A2A',
          border: 'none',
          borderRadius: 6,
          color: '#E8E8EC',
          fontSize: 14,
          cursor: status === 'loading' ? 'wait' : 'pointer',
        }}
      >
        {status === 'loading' ? 'Joining…' : 'Join early access'}
      </button>
    </form>
  );
}
