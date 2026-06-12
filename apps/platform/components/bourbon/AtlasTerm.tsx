'use client';

import { useCallback, useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { recordAtlasView } from '../../lib/world-continuity/client-state';
import { getAtlasEntry } from '../../lib/bourbon-atlas/registry';
import { atlasTermHref } from '../../lib/bourbon-atlas/slug';

type Props = {
  term: string;
  children?: React.ReactNode;
};

export function AtlasTerm({ term, children }: Props) {
  const slug = term.toLowerCase().replace(/['']/g, '').replace(/\s+/g, '-');
  const entry = getAtlasEntry(slug);
  const label = children ?? term;
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const tooltipId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!entry) {
    return <span>{label}</span>;
  }

  const showTooltip = hover && !open;

  return (
    <>
      <span
        style={{ position: 'relative', display: 'inline' }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <button
          type="button"
          aria-describedby={showTooltip ? tooltipId : undefined}
          onClick={() => {
            recordAtlasView('bourbon', slug, entry.title);
            setOpen(true);
          }}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            margin: 0,
            color: '#C8A96E',
            textDecoration: 'underline',
            textDecorationStyle: 'dotted',
            textUnderlineOffset: 3,
            cursor: 'pointer',
            font: 'inherit',
          }}
        >
          {label}
        </button>

        {showTooltip && (
          <span
            id={tooltipId}
            role="tooltip"
            style={{
              position: 'absolute',
              left: 0,
              bottom: 'calc(100% + 8px)',
              zIndex: 40,
              width: 280,
              padding: 14,
              background: '#0F0F12',
              border: '1px solid #3A3530',
              borderRadius: 8,
              boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
              textAlign: 'left',
            }}
          >
            <span style={{ display: 'block', color: '#E8E8EC', fontSize: 13, fontWeight: 500 }}>{entry.title}</span>
            <span style={{ display: 'block', color: '#8A8A8E', fontSize: 12, marginTop: 6, lineHeight: 1.5 }}>
              {entry.shortDefinition}
            </span>
            <span style={{ display: 'block', color: '#6B6B70', fontSize: 11, marginTop: 8, lineHeight: 1.4 }}>
              {entry.whyItMatters.slice(0, 120)}…
            </span>
            <Link
              href={atlasTermHref(entry.slug)}
              style={{ display: 'inline-block', marginTop: 10, color: '#C8A96E', fontSize: 11, textDecoration: 'none' }}
            >
              Go deeper →
            </Link>
          </span>
        )}
      </span>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${entry.title} definition`}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.65)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={close}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 420,
              padding: 20,
              background: '#111114',
              borderRadius: '12px 12px 0 0',
              border: '1px solid #2A2A3A',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={{ color: '#6B6B70', fontSize: 10, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              The Atlas
            </p>
            <p style={{ color: '#E8E8EC', fontSize: 18, margin: '8px 0 0', fontWeight: 400 }}>{entry.title}</p>
            <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.6 }}>{entry.shortDefinition}</p>
            <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 10, lineHeight: 1.5 }}>{entry.whyItMatters.slice(0, 200)}…</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <Link
                href={atlasTermHref(entry.slug)}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '12px 16px',
                  background: '#2A2520',
                  borderRadius: 8,
                  color: '#E8E8EC',
                  fontSize: 14,
                  textDecoration: 'none',
                }}
              >
                Go deeper
              </Link>
              <button
                type="button"
                onClick={close}
                style={{
                  padding: '12px 16px',
                  background: 'transparent',
                  border: '1px solid #2A2A2E',
                  borderRadius: 8,
                  color: '#6B6B70',
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
