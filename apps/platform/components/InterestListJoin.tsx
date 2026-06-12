'use client';

import { useState } from 'react';
import { trackValidationEvent } from '../lib/validation-tracker';
import { CUSTOMER_SEGMENTS, type CustomerSegment } from '../lib/future-proof-assessment';

export function InterestListJoin({ pathSlug, pathName }: { pathSlug: string; pathName: string }) {
  const [email, setEmail] = useState('');
  const [segment, setSegment] = useState<CustomerSegment>('young-professional');
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await trackValidationEvent({
      event_type: 'interest_submitted',
      landing_page: `/explore/${pathSlug}`,
      path_slug: pathSlug,
      metadata: {
        desired_path: pathSlug,
        path_name: pathName,
        segment,
        has_email: Boolean(email.trim()),
        email_domain: email.trim() ? email.split('@')[1] ?? 'unknown' : null,
      },
    });
    setDone(true);
  }

  if (done) {
    return (
      <p style={{ color: 'var(--foundry-success)', fontSize: 14, marginTop: 16 }}>
        Thanks — we&apos;ll notify you when {pathName} opens.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, margin: '0 0 8px' }}>Desired path</p>
        <p style={{ color: 'var(--foundry-text)', fontSize: 14, margin: 0 }}>{pathName}</p>
      </div>
      <div>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, margin: '0 0 8px' }}>Who are you?</p>
        <select
          value={segment}
          onChange={(e) => setSegment(e.target.value as CustomerSegment)}
          style={{
            width: '100%',
            padding: '12px 14px',
            background: 'var(--foundry-surface)',
            border: '1px solid var(--foundry-border)',
            borderRadius: 6,
            color: 'var(--foundry-text)',
            fontSize: 14,
          }}
        >
          {CUSTOMER_SEGMENTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, margin: '0 0 8px' }}>Email (optional)</p>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px',
            background: 'var(--foundry-surface)',
            border: '1px solid var(--foundry-border)',
            borderRadius: 6,
            color: 'var(--foundry-text)',
            fontSize: 14,
            boxSizing: 'border-box',
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          padding: '12px 20px',
          background: 'var(--foundry-success-bg)',
          border: 'none',
          borderRadius: 6,
          color: 'var(--foundry-text)',
          fontSize: 14,
          cursor: 'pointer',
          alignSelf: 'flex-start',
        }}
      >
        Join interest list
      </button>
    </form>
  );
}
