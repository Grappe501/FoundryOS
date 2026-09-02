import type { ReactNode } from 'react';
import type { DraftTrace, ObjectPresence } from '../../../../lib/talent-foundry/implementations/company/traces';

const NOTES = `last night
keep the import path
do not wipe the bench
ask before replace`;

export function LastDraft({
  presence,
  trace,
  reachable = false,
  onReach,
  notes,
}: {
  presence: ObjectPresence;
  trace: DraftTrace;
  reachable?: boolean;
  onReach?: () => void;
  notes?: ReactNode;
}) {
  if (presence === 'absent') return null;

  let body = NOTES;
  if (trace === 'gone') body = '';
  if (trace === 'question') body = `${NOTES}\n\nwho does this belong to?`;
  if (trace === 'copy') body = `${NOTES}\n\n— copy`;

  return (
    <aside
      className="ws-object ws-draft"
      data-presence={presence}
      data-place="draft"
      data-origin="found"
      data-trace={trace}
      data-reachable={reachable ? 'true' : 'false'}
      aria-label="The last draft"
      aria-hidden={presence === 'ghost' && !reachable}
    >
      {trace === 'gone' ? <p className="ws-draft-empty"> </p> : <pre>{body}</pre>}
      {notes}
      {reachable && !notes ? (
        <button type="button" className="ws-reach" onClick={onReach} aria-label="The last draft is still on the bench">
          <span className="ws-threshold-mark" aria-hidden />
        </button>
      ) : null}
    </aside>
  );
}
