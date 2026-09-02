'use client';

import { PHASE_1_NOTICE } from '../../../../lib/talent-foundry/implementations/company/scenarios/lab';
import { echoNotice } from '../../../../lib/talent-foundry/implementations/company/echo';

export function NoticeWrite({
  notice,
  change,
  onNotice,
  onChange,
  onTyping,
  onSubmit,
}: {
  notice: string;
  change: string;
  onNotice: (value: string) => void;
  onChange: (value: string) => void;
  onTyping: () => void;
  onSubmit: () => void;
}) {
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
      <button type="button" className="ws-next" onClick={onSubmit} disabled={!notice.trim() || !change.trim()}>
        Continue
      </button>
    </>
  );
}

export function NoticeAck({ notice, onContinue }: { notice: string; onContinue: () => void }) {
  return (
    <>
      <p className="ws-echo">{echoNotice(notice)}</p>
      <button type="button" className="ws-next" onClick={onContinue}>
        Continue
      </button>
    </>
  );
}
