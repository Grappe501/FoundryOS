'use client';

import type { DraftTrace } from '../../../../lib/talent-foundry/implementations/company/traces';

const NOTES = `last night
keep the import path
do not wipe the bench
ask before replace`;

export function DraftWork({
  trace,
  body,
  onBody,
  onTyping,
}: {
  trace: DraftTrace;
  body: string;
  onBody: (value: string) => void;
  onTyping: () => void;
}) {
  let prior = NOTES;
  if (trace === 'gone') prior = '';
  if (trace === 'question') prior = `${NOTES}\n\nwho does this belong to?`;
  if (trace === 'copy') prior = `${NOTES}\n\n— copy`;

  return (
    <aside
      className="ws-object ws-draft"
      data-presence="focus"
      data-place="draft"
      data-origin="found"
      data-object-state="opened"
      data-work="true"
      data-trace={trace}
      aria-label="The last draft"
    >
      {prior ? <pre className="ws-draft-prior">{prior}</pre> : <p className="ws-draft-empty"> </p>}
      <textarea
        className="ws-field"
        value={body}
        onChange={(e) => onBody(e.target.value)}
        onInput={onTyping}
        rows={5}
        aria-label="The work"
      />
    </aside>
  );
}
