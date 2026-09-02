'use client';

import { useEffect, useState } from 'react';
import { kellyCampaign } from '../../lib/talent-foundry/campaigns/kelly';
import { resumeLinkCopy } from '../../lib/talent-foundry/resume/copy';
import { saveSession } from '../../lib/talent-foundry/session';
import type { TalentFoundrySession } from '../../lib/talent-foundry/types';

export function ResumeReturn({ token }: { token: string }) {
  const [status, setStatus] = useState<'load' | 'ready' | 'missing'>('load');
  const [session, setSession] = useState<TalentFoundrySession | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetch(`/api/talent-foundry/resume/${encodeURIComponent(token)}`)
      .then((res) => res.json() as Promise<{ ok?: boolean; session?: TalentFoundrySession }>)
      .then((json) => {
        if (cancelled) return;
        if (!json.ok || !json.session) {
          setStatus('missing');
          return;
        }
        setSession(json.session);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('missing');
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (status === 'load') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">Returning</p>
        <h1 className="tf-display">Welcome back.</h1>
      </div>
    );
  }

  if (status === 'missing' || !session) {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">Closed</p>
        <h1 className="tf-display tf-display-sm">This saved place isn’t available anymore.</h1>
        <div className="tf-actions">
          <a className="tf-btn tf-btn-primary" href="/talent-foundry">
            Start again
          </a>
        </div>
      </div>
    );
  }

  const copy = resumeLinkCopy(session);

  return (
    <div className="tf-hold">
      <p className="tf-kicker">Welcome back</p>
      <h1 className="tf-display">{copy.title}</h1>
      <p className="tf-body">{copy.body}</p>
      <div className="tf-actions">
        <button
          type="button"
          className="tf-btn tf-btn-primary"
          onClick={() => {
            window.sessionStorage.setItem('tf.kelly.resumeJustRestored', '1');
            saveSession(kellyCampaign, session);
            window.location.assign('/talent-foundry');
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
