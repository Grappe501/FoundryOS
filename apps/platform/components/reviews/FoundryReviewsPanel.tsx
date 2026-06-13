'use client';

import { useEffect, useMemo, useState } from 'react';
import type { FoundryReview } from '@foundry/review-engine';
import { ARTIFACTS_CHANGED_EVENT } from '../../lib/artifacts/client-store';
import { getEntityReviews, submitReview } from '../../lib/reviews/client';
import { getEntityRecommendations, submitRecommendationFromReview } from '../../lib/recommendations/client';

const ACCENT = 'var(--foundry-primary)';

function ReviewCard({ review }: { review: FoundryReview }) {
  return (
    <article
      style={{
        padding: 18,
        background: 'var(--foundry-surface-raised)',
        borderRadius: 10,
        border: '1px solid var(--foundry-border-subtle)',
      }}
    >
      <p style={{ color: ACCENT, fontSize: 11, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Your review · {review.privacy}
      </p>
      <h4 style={{ color: 'var(--foundry-text)', fontSize: 16, fontWeight: 400, margin: '10px 0 0' }}>
        {review.title}
      </h4>
      <dl style={{ margin: '14px 0 0', fontSize: 13, lineHeight: 1.65 }}>
        <Field label="Best for" value={review.who_this_is_for} />
        {review.who_should_skip && <Field label="Avoid if" value={review.who_should_skip} />}
        <Field label="What surprised me" value={review.what_surprised_me} />
        <Field label="Try next" value={review.what_to_try_next} />
      </dl>
      {review.body && (
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 14, lineHeight: 1.7 }}>
          {review.body}
        </p>
      )}
      {(review.beginner_note || review.value_note) && (
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--foundry-text-faint)' }}>
          {review.beginner_note && <p style={{ margin: '4px 0' }}>Beginner note: {review.beginner_note}</p>}
          {review.value_note && <p style={{ margin: '4px 0' }}>Value note: {review.value_note}</p>}
        </div>
      )}
    </article>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <dt style={{ color: 'var(--foundry-text-faint)', margin: 0, fontSize: 11 }}>{label}</dt>
      <dd style={{ color: 'var(--foundry-text)', margin: '4px 0 0' }}>{value}</dd>
    </div>
  );
}

type Props = {
  worldSlug: string;
  entityType: string;
  slug: string;
  entityName: string;
};

export function FoundryReviewsPanel({ worldSlug, entityType, slug, entityName }: Props) {
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [tick, setTick] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const [title, setTitle] = useState('');
  const [whoFor, setWhoFor] = useState('');
  const [surprised, setSurprised] = useState('');
  const [tryNext, setTryNext] = useState('');
  const [body, setBody] = useState('');
  const [beginnerNote, setBeginnerNote] = useState('');
  const [valueNote, setValueNote] = useState('');
  const [privacy, setPrivacy] = useState<'private' | 'public'>('private');

  useEffect(() => {
    setMounted(true);
    const refresh = () => setTick((n) => n + 1);
    window.addEventListener(ARTIFACTS_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(ARTIFACTS_CHANGED_EVENT, refresh);
  }, []);

  const myReview = useMemo(() => {
    if (!mounted) return null;
    return getEntityReviews(worldSlug, entityType, slug, { mineOnly: true })[0] ?? null;
  }, [mounted, worldSlug, entityType, slug, tick]);

  const hasRecommendation = useMemo(() => {
    if (!mounted) return false;
    return getEntityRecommendations(worldSlug, entityType, slug, { mineOnly: true }).length > 0;
  }, [mounted, worldSlug, entityType, slug, tick]);

  const publicReviews = useMemo(() => {
    if (!mounted) return [];
    return getEntityReviews(worldSlug, entityType, slug, { publicOnly: true });
  }, [mounted, worldSlug, entityType, slug, tick]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    const result = submitReview({
      world_slug: worldSlug,
      entity_slug: slug,
      entity_type: entityType,
      entity_title: entityName,
      title,
      body,
      who_this_is_for: whoFor,
      what_surprised_me: surprised,
      what_to_try_next: tryNext,
      beginner_note: beginnerNote || undefined,
      value_note: valueNote || undefined,
      privacy,
    });
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setShowForm(false);
    setTitle('');
    setWhoFor('');
    setSurprised('');
    setTryNext('');
    setBody('');
    setBeginnerNote('');
    setValueNote('');
  }

  if (!mounted) return null;

  return (
    <section style={{ marginTop: 28 }}>
      <p style={{ color: ACCENT, fontSize: 11, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Foundry Reviews
      </p>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 10, lineHeight: 1.65 }}>
        Not ratings. Thoughtful reviews that help people decide — and become identity evidence.
      </p>

      {myReview ? (
        <div style={{ marginTop: 16 }}>
          <ReviewCard review={myReview} />
          {!hasRecommendation && (
            <button
              type="button"
              onClick={() => {
                const result = submitRecommendationFromReview(myReview);
                if (!result.ok) setErrors(result.errors);
              }}
              style={{
                marginTop: 12,
                padding: '8px 14px',
                background: 'var(--foundry-surface-raised)',
                border: '1px solid var(--foundry-primary-border-dim)',
                borderRadius: 6,
                color: ACCENT,
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              Turn this into a recommendation
            </button>
          )}
        </div>
      ) : (
        <div
          style={{
            marginTop: 16,
            padding: 20,
            background: 'var(--foundry-surface)',
            borderRadius: 10,
            border: '1px dashed var(--foundry-border-warm)',
          }}
        >
          <p style={{ color: 'var(--foundry-text)', fontSize: 14, margin: 0 }}>Write a thoughtful review</p>
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>
            Who is this bottle for? What surprised you? What should someone try next?
          </p>
          {!showForm && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              style={{
                marginTop: 14,
                padding: '10px 16px',
                background: 'var(--foundry-primary-bg-subtle)',
                border: '1px solid var(--foundry-primary-border-dim)',
                borderRadius: 6,
                color: ACCENT,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Start your review
            </button>
          )}
        </div>
      )}

      {showForm && !myReview && (
        <form onSubmit={handleSubmit} style={{ marginTop: 16, display: 'grid', gap: 12 }}>
          {errors.length > 0 && (
            <ul style={{ color: 'var(--foundry-accent)', fontSize: 12, margin: 0, paddingLeft: 18 }}>
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
          <FormField label="Title" value={title} onChange={setTitle} required />
          <FormField label="Who this is for" value={whoFor} onChange={setWhoFor} required />
          <FormField label="What surprised me" value={surprised} onChange={setSurprised} required />
          <FormField label="What to try next" value={tryNext} onChange={setTryNext} required />
          <FormField label="Review body" value={body} onChange={setBody} required multiline />
          <FormField label="Beginner note (optional)" value={beginnerNote} onChange={setBeginnerNote} />
          <FormField label="Value note (optional)" value={valueNote} onChange={setValueNote} />
          <label style={{ fontSize: 13, color: 'var(--foundry-text-muted)' }}>
            Privacy
            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value as 'private' | 'public')}
              style={{
                display: 'block',
                marginTop: 6,
                width: '100%',
                padding: 10,
                background: 'var(--foundry-surface-raised)',
                border: '1px solid var(--foundry-border-subtle)',
                borderRadius: 6,
                color: 'var(--foundry-text)',
              }}
            >
              <option value="private">Private — only you</option>
              <option value="public">Public — share with community when ready</option>
            </select>
          </label>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="foundry-btn foundry-btn--primary" style={{ padding: '10px 18px' }}>
              Save review
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="foundry-btn foundry-btn--secondary"
              style={{ padding: '10px 18px' }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {publicReviews.length > 0 ? (
        <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
          {publicReviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 16 }}>
          No public community reviews yet — Foundry does not fabricate social proof.
        </p>
      )}
    </section>
  );
}

function FormField({
  label,
  value,
  onChange,
  required,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  multiline?: boolean;
}) {
  const style = {
    display: 'block' as const,
    marginTop: 6,
    width: '100%',
    padding: 10,
    background: 'var(--foundry-surface-raised)',
    border: '1px solid var(--foundry-border-subtle)',
    borderRadius: 6,
    color: 'var(--foundry-text)',
    fontSize: 14,
    fontFamily: 'inherit',
  };

  return (
    <label style={{ fontSize: 13, color: 'var(--foundry-text-muted)' }}>
      {label}
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} required={required} rows={4} style={style} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} required={required} style={style} />
      )}
    </label>
  );
}
