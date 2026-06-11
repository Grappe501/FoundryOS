'use client';

import { useState } from 'react';
import { trackValidationEvent } from '../lib/validation-tracker';

export function InterestListJoin({ pathSlug, pathName }: { pathSlug: string; pathName: string }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    await trackValidationEvent({
      event_type: 'assessment_started',
      landing_page: `/explore/${pathSlug}`,
      path_slug: pathSlug,
      metadata: { interest_list: true, email_domain: email.split('@')[1] ?? 'unknown', path_name: pathName },
    });
    setDone(true);
  }

  if (done) {
    return (
      <p style={{ color: '#6B9B6B', fontSize: 14, marginTop: 16 }}>
        You&apos;re on the list. We&apos;ll notify you when {pathName} opens.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <input
        type="email"
        required
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          flex: 1,
          minWidth: 200,
          padding: '12px 14px',
          background: '#0F0F12',
          border: '1px solid #2A2A2E',
          borderRadius: 6,
          color: '#E8E8EC',
          fontSize: 14,
        }}
      />
      <button
        type="submit"
        style={{
          padding: '12px 20px',
          background: '#2A4A2A',
          border: 'none',
          borderRadius: 6,
          color: '#E8E8EC',
          fontSize: 14,
          cursor: 'pointer',
        }}
      >
        Join interest list
      </button>
    </form>
  );
}
