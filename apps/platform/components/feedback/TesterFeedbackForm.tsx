'use client';

import { useState } from 'react';
import { ANALYTICS_WORLDS } from '../../lib/analytics-worlds';
import { getVisitorId } from '../../lib/validation-tracker';

const SEGMENTS = [
  { value: 'student', label: 'Student' },
  { value: 'parent', label: 'Parent' },
  { value: 'adult_learner', label: 'Adult learner' },
  { value: 'educator', label: 'Educator' },
  { value: 'hobbyist', label: 'Hobbyist' },
];

export function TesterFeedbackForm() {
  const [segment, setSegment] = useState('adult_learner');
  const [worldSlug, setWorldSlug] = useState('ai-builder');
  const [missionSlug, setMissionSlug] = useState('');
  const [confused, setConfused] = useState('');
  const [liked, setLiked] = useState('');
  const [buildNext, setBuildNext] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    const res = await fetch('/api/feedback/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitor_id: getVisitorId(),
        segment,
        world_slug: worldSlug,
        mission_slug: missionSlug || undefined,
        confused,
        liked,
        build_next: buildNext,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setStatus('error');
      setError(data.error ?? 'Something went wrong');
      return;
    }
    setStatus('done');
  }

  if (status === 'done') {
    return (
      <section style={{ padding: 24, background: '#1A2A1A', borderRadius: 8, border: '1px solid #2A4A2A' }}>
        <p style={{ color: '#6B9B6B', margin: 0 }}>Thank you — your feedback shapes what we build next.</p>
      </section>
    );
  }

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    marginTop: 6,
    background: '#111114',
    border: '1px solid #1A1A1E',
    borderRadius: 6,
    color: '#E8E8EC',
    fontSize: 14,
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <label style={{ fontSize: 13, color: '#8A8A8E' }}>
          Segment
          <select value={segment} onChange={(e) => setSegment(e.target.value)} style={fieldStyle}>
            {SEGMENTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>
        <label style={{ fontSize: 13, color: '#8A8A8E' }}>
          World
          <select value={worldSlug} onChange={(e) => setWorldSlug(e.target.value)} style={fieldStyle}>
            {ANALYTICS_WORLDS.map((w) => (
              <option key={w.slug} value={w.slug}>{w.label}</option>
            ))}
          </select>
        </label>
      </div>

      <label style={{ display: 'block', fontSize: 13, color: '#8A8A8E', marginTop: 16 }}>
        Mission (optional)
        <input value={missionSlug} onChange={(e) => setMissionSlug(e.target.value)} placeholder="e.g. homework-assistant" style={fieldStyle} />
      </label>

      <label style={{ display: 'block', fontSize: 13, color: '#8A8A8E', marginTop: 16 }}>
        What confused you?
        <textarea required value={confused} onChange={(e) => setConfused(e.target.value)} rows={3} style={fieldStyle} />
      </label>

      <label style={{ display: 'block', fontSize: 13, color: '#8A8A8E', marginTop: 16 }}>
        What did you like?
        <textarea required value={liked} onChange={(e) => setLiked(e.target.value)} rows={3} style={fieldStyle} />
      </label>

      <label style={{ display: 'block', fontSize: 13, color: '#8A8A8E', marginTop: 16 }}>
        What should we build next?
        <textarea required value={buildNext} onChange={(e) => setBuildNext(e.target.value)} rows={3} style={fieldStyle} />
      </label>

      {error && <p style={{ color: '#C96B6B', fontSize: 13, marginTop: 12 }}>{error}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{ marginTop: 20, padding: '12px 24px', background: '#2A4A2A', border: 'none', borderRadius: 6, color: '#E8E8EC', fontSize: 14, cursor: 'pointer' }}
      >
        {status === 'loading' ? 'Sending…' : 'Submit feedback'}
      </button>
    </form>
  );
}
