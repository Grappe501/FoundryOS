'use client';

import { useState } from 'react';
import type { TalentFoundrySession } from '../../lib/talent-foundry/types';

export function SaveMyPlace({ session }: { session: TalentFoundrySession }) {
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [nativeShare, setNativeShare] = useState(false);

  if (!session.flags.identified || !session.identity) return null;

  const save = async () => {
    setBusy(true);
    setHint(null);
    try {
      const res = await fetch('/api/talent-foundry/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session }),
      });
      const json = (await res.json()) as { ok?: boolean; token?: string };
      if (!res.ok || !json.token) {
        setHint("We couldn't save this yet. Your place is still on this phone until you close the tab.");
        return;
      }
      const next = `${window.location.origin}/talent-foundry/resume/${json.token}`;
      setUrl(next);
      setNativeShare(typeof navigator.share === 'function');
    } catch {
      setHint("We couldn't save this yet. Your place is still on this phone until you close the tab.");
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setHint('Link copied. Keep it private.');
    } catch {
      setHint('Long-press the link to copy it.');
    }
  };

  const share = async () => {
    if (!url || typeof navigator.share !== 'function') return;
    try {
      await navigator.share({ title: 'My Talent Foundry place', url });
    } catch {
      /* dismissed */
    }
  };

  return (
    <div className="tf-save-place">
      <p className="tf-kicker">Later</p>
      <h2 className="tf-display tf-display-sm">Save my place</h2>
      <p className="tf-body">A private link. No password. Anyone with the link can continue this journey.</p>
      {!url ? (
        <div className="tf-actions">
          <button type="button" className="tf-btn tf-btn-primary" onClick={() => void save()} disabled={busy}>
            {busy ? 'Saving…' : 'Save my place'}
          </button>
        </div>
      ) : (
        <div className="tf-actions">
          <p className="tf-echo tf-save-link">{url}</p>
          <button type="button" className="tf-btn tf-btn-primary" onClick={() => void copy()}>
            Copy resume link
          </button>
          {nativeShare ? (
            <button type="button" className="tf-btn" onClick={() => void share()}>
              Share link
            </button>
          ) : null}
        </div>
      )}
      {hint ? <p className="tf-retry">{hint}</p> : null}
    </div>
  );
}
