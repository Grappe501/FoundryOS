'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { ImmersionModule } from '../../lib/world-experience/types';
import { createArtifactFromModuleSave } from '../../lib/artifacts/create-from-action';

type SavedEntry = { savedAt: string; values: Record<string, string> };

function storageKey(slug: string, moduleSlug: string) {
  return `foundry-${slug}-module-${moduleSlug}`;
}

export function WorldImmersionModuleWorkbench({
  worldSlug,
  module,
  accent,
  basePath,
}: {
  worldSlug: string;
  module: ImmersionModule;
  accent: string;
  basePath: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(worldSlug, module.slug));
      if (raw) {
        const parsed = JSON.parse(raw) as SavedEntry;
        setValues(parsed.values ?? {});
      }
    } catch {
      /* ignore */
    }
  }, [worldSlug, module.slug]);

  function save() {
    const entry: SavedEntry = { savedAt: new Date().toISOString(), values };
    localStorage.setItem(storageKey(worldSlug, module.slug), JSON.stringify(entry));
    createArtifactFromModuleSave(worldSlug, module.slug, module.title, values);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <section style={{ marginTop: 16 }}>
      <Link href={`${basePath}/experiences`} style={{ color: 'var(--foundry-text-faint)', fontSize: 13, textDecoration: 'none' }}>
        ← All tools
      </Link>
      <p style={{ color: accent, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 16 }}>
        {module.category}
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{module.title}</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{module.description}</p>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>~{module.estimatedMinutes} min · saves to this device</p>

      <div style={{ marginTop: 28, padding: 24, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
        {(module.fields ?? []).map((f) => (
          <label key={f.key} style={{ display: 'block', marginBottom: 20 }}>
            <span style={{ color: 'var(--foundry-text-muted)', fontSize: 13 }}>{f.label}</span>
            {f.type === 'textarea' ? (
              <textarea
                value={values[f.key] ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                rows={4}
                style={{
                  width: '100%',
                  marginTop: 8,
                  padding: 12,
                  background: 'var(--foundry-surface-raised)',
                  border: '1px solid var(--foundry-border)',
                  borderRadius: 6,
                  color: 'var(--foundry-text)',
                  fontSize: 14,
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            ) : f.type === 'select' ? (
              <select
                value={values[f.key] ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                style={{
                  width: '100%',
                  marginTop: 8,
                  padding: 12,
                  background: 'var(--foundry-surface-raised)',
                  border: '1px solid var(--foundry-border)',
                  borderRadius: 6,
                  color: 'var(--foundry-text)',
                  fontSize: 14,
                }}
              >
                <option value="">Select…</option>
                {(f.options ?? []).map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={f.type === 'number' ? 'number' : 'text'}
                value={values[f.key] ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                style={{
                  width: '100%',
                  marginTop: 8,
                  padding: 12,
                  background: 'var(--foundry-surface-raised)',
                  border: '1px solid var(--foundry-border)',
                  borderRadius: 6,
                  color: 'var(--foundry-text)',
                  fontSize: 14,
                  boxSizing: 'border-box',
                }}
              />
            )}
          </label>
        ))}
        {!module.fields?.length && (
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>Open your journal and capture notes for this session.</p>
        )}
        <button
          type="button"
          onClick={save}
          style={{
            marginTop: 8,
            padding: '12px 24px',
            background: accent,
            border: 'none',
            borderRadius: 6,
            color: 'var(--foundry-bg)',
            fontSize: 14,
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          {saved ? 'Saved ✓' : 'Save artifact'}
        </button>
      </div>

      <Link
        href={`${basePath}/portfolio`}
        style={{ display: 'inline-block', marginTop: 24, color: accent, fontSize: 13, textDecoration: 'none' }}
      >
        View portfolio →
      </Link>
    </section>
  );
}
