'use client';

import { useEffect, useState } from 'react';
import { PHASE_1_NOTICE } from '../../../../lib/talent-foundry/implementations/company/scenarios/lab';
import { echoNotice } from '../../../../lib/talent-foundry/implementations/company/echo';

export function NoticeWrite({
  notice,
  change,
  opened,
  onNotice,
  onChange,
  onTyping,
  onSubmit,
}: {
  notice: string;
  change: string;
  opened: boolean;
  onNotice: (value: string) => void;
  onChange: (value: string) => void;
  onTyping: () => void;
  onSubmit: () => void;
}) {
  const [allowAsk, setAllowAsk] = useState(opened);

  useEffect(() => {
    if (opened) {
      setAllowAsk(true);
      return;
    }
    const reduce =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wait = reduce ? 0 : 7000;
    const t = window.setTimeout(() => setAllowAsk(true), wait);
    return () => window.clearTimeout(t);
  }, [opened]);

  if (!allowAsk) return null;

  return (
    <>
      <p className="ws-prompt">{PHASE_1_NOTICE.prompts.notice}</p>
      <label className="sr-only" htmlFor="ws-notice">
        {PHASE_1_NOTICE.prompts.notice}
      </label>
      <textarea
        id="ws-notice"
        className="ws-field"
        value={notice}
        onChange={(e) => onNotice(e.target.value)}
        onInput={onTyping}
        autoComplete="off"
        rows={3}
      />
      <p className="ws-prompt">{PHASE_1_NOTICE.prompts.change}</p>
      <label className="sr-only" htmlFor="ws-change">
        {PHASE_1_NOTICE.prompts.change}
      </label>
      <textarea
        id="ws-change"
        className="ws-field"
        value={change}
        onChange={(e) => onChange(e.target.value)}
        onInput={onTyping}
        autoComplete="off"
        rows={3}
      />
      {notice.trim() && change.trim() ? (
        <button type="button" className="ws-threshold" onClick={onSubmit} aria-label="Continue">
          <span className="ws-threshold-mark" aria-hidden />
        </button>
      ) : null}
    </>
  );
}

export function NoticeAck({ notice, onContinue }: { notice: string; onContinue: () => void }) {
  return (
    <>
      <p className="ws-echo">{echoNotice(notice)}</p>
      <button type="button" className="ws-threshold" onClick={onContinue} aria-label="Continue">
        <span className="ws-threshold-mark" aria-hidden />
      </button>
    </>
  );
}
