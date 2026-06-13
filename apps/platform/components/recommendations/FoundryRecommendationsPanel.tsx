'use client';

import { useEffect, useMemo, useState } from 'react';
import type { FoundryRecommendation } from '@foundry/recommendation-engine-v2';
import { BOURBON_RECOMMENDATION_CONTEXTS } from '@foundry/recommendation-engine-v2';
import { ARTIFACTS_CHANGED_EVENT } from '../../lib/artifacts/client-store';
import { getEntityRecommendations, submitRecommendation } from '../../lib/recommendations/client';

const ACCENT = 'var(--foundry-primary)';

function RecommendationCard({ rec }: { rec: FoundryRecommendation }) {
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
        Your recommendation · {rec.privacy}
        {rec.based_on_reviews.length > 0 ? ' · review-backed' : ''}
      </p>
      <h4 style={{ color: 'var(--foundry-text)', fontSize: 16, fontWeight: 400, margin: '10px 0 0' }}>{rec.title}</h4>
      <dl style={{ margin: '14px 0 0', fontSize: 13, lineHeight: 1.65 }}>
        <Field label="Recommended for" value={rec.who_this_is_for} />
        <Field label="Why" value={rec.recommendation_reason} />
        <Field label="What to try next" value={rec.best_next_action} />
        {rec.what_to_watch_for && <Field label="Watch for" value={rec.what_to_watch_for} />}
        {rec.bourbon_context && <Field label="Context" value={rec.bourbon_context} />}
      </dl>
      {(rec.beginner_note || rec.budget_note || rec.comparison_note) && (
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--foundry-text-faint)' }}>
          {rec.beginner_note && <p style={{ margin: '4px 0' }}>Beginner note: {rec.beginner_note}</p>}
          {rec.budget_note && <p style={{ margin: '4px 0' }}>Budget note: {rec.budget_note}</p>}
          {rec.comparison_note && <p style={{ margin: '4px 0' }}>Comparison note: {rec.comparison_note}</p>}
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

export function FoundryRecommendationsPanel({ worldSlug, entityType, slug, entityName }: Props) {
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [tick, setTick] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const [title, setTitle] = useState('');
  const [whoFor, setWhoFor] = useState('');
  const [reason, setReason] = useState('');
  const [nextAction, setNextAction] = useState('');
  const [watchFor, setWatchFor] = useState('');
  const [budgetNote, setBudgetNote] = useState('');
  const [beginnerNote, setBeginnerNote] = useState('');
  const [comparisonNote, setComparisonNote] = useState('');
  const [bourbonContext, setBourbonContext] = useState('');
  const [privacy, setPrivacy] = useState<'private' | 'public'>('private');

  useEffect(() => {
    setMounted(true);
    const refresh = () => setTick((n) => n + 1);
    window.addEventListener(ARTIFACTS_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(ARTIFACTS_CHANGED_EVENT, refresh);
  }, []);

  const myRec = useMemo(() => {
    if (!mounted) return null;
    return getEntityRecommendations(worldSlug, entityType, slug, { mineOnly: true })[0] ?? null;
  }, [mounted, worldSlug, entityType, slug, tick]);

  const publicRecs = useMemo(() => {
    if (!mounted) return [];
    return getEntityRecommendations(worldSlug, entityType, slug, { publicOnly: true });
  }, [mounted, worldSlug, entityType, slug, tick]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    const result = submitRecommendation({
      world_slug: worldSlug,
      entity_slug: slug,
      entity_type: entityType,
      entity_title: entityName,
      title,
      recommendation_reason: reason,
      who_this_is_for: whoFor,
      best_next_action: nextAction,
      what_to_watch_for: watchFor || undefined,
      budget_note: budgetNote || undefined,
      beginner_note: beginnerNote || undefined,
      comparison_note: comparisonNote || undefined,
      bourbon_context: bourbonContext || undefined,
      privacy,
    });
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setShowForm(false);
  }

  if (!mounted) return null;

  return (
    <section style={{ marginTop: 28 }}>
      <p style={{ color: ACCENT, fontSize: 11, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Foundry Recommendations
      </p>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 10, lineHeight: 1.65 }}>
        Not popularity. Your judgment as evidence — who should try this and why.
      </p>

      {myRec ? (
        <div style={{ marginTop: 16 }}>
          <RecommendationCard rec={myRec} />
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
          <p style={{ color: 'var(--foundry-text)', fontSize: 14, margin: 0 }}>Recommend this thoughtfully</p>
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>
            Who should try this? Why do you recommend it? What should they try next?
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
              Write a recommendation
            </button>
          )}
        </div>
      )}

      {showForm && !myRec && (
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
          <FormField label="Why I recommend it" value={reason} onChange={setReason} required multiline />
          <FormField label="Best next action" value={nextAction} onChange={setNextAction} required />
          <FormField label="What to watch for" value={watchFor} onChange={setWatchFor} />
          {worldSlug === 'bourbon' && (
            <label style={{ fontSize: 13, color: 'var(--foundry-text-muted)' }}>
              Bourbon context
              <select
                value={bourbonContext}
                onChange={(e) => setBourbonContext(e.target.value)}
                style={inputStyle}
              >
                <option value="">Select context (optional)</option>
                {BOURBON_RECOMMENDATION_CONTEXTS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          )}
          <FormField label="Budget note (optional)" value={budgetNote} onChange={setBudgetNote} />
          <FormField label="Beginner note (optional)" value={beginnerNote} onChange={setBeginnerNote} />
          <FormField label="Comparison note (optional)" value={comparisonNote} onChange={setComparisonNote} />
          <label style={{ fontSize: 13, color: 'var(--foundry-text-muted)' }}>
            Privacy
            <select value={privacy} onChange={(e) => setPrivacy(e.target.value as 'private' | 'public')} style={inputStyle}>
              <option value="private">Private — only you</option>
              <option value="public">Public — share when ready</option>
            </select>
          </label>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="foundry-btn foundry-btn--primary" style={{ padding: '10px 18px' }}>
              Save recommendation
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="foundry-btn foundry-btn--secondary" style={{ padding: '10px 18px' }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {publicRecs.length > 0 ? (
        <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
          {publicRecs.map((r) => (
            <RecommendationCard key={r.id} rec={r} />
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 16 }}>
          No public community recommendations yet — Foundry does not fabricate social proof.
        </p>
      )}
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  marginTop: 6,
  width: '100%',
  padding: 10,
  background: 'var(--foundry-surface-raised)',
  border: '1px solid var(--foundry-border-subtle)',
  borderRadius: 6,
  color: 'var(--foundry-text)',
  fontSize: 14,
};

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
  return (
    <label style={{ fontSize: 13, color: 'var(--foundry-text-muted)' }}>
      {label}
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} required={required} rows={4} style={{ ...inputStyle, fontFamily: 'inherit' }} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} required={required} style={inputStyle} />
      )}
    </label>
  );
}
