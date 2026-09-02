import type { ReactNode } from 'react';
import { objectLife, type DraftTrace, type ObjectPresence } from '../../../../lib/talent-foundry/implementations/company/traces';

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
  remembered,
}: {
  presence: ObjectPresence;
  trace: DraftTrace;
  reachable?: boolean;
  onReach?: () => void;
  notes?: ReactNode;
  remembered?: 'gone' | 'question' | 'copy' | 'restored';
}) {
  if (presence === 'absent') return null;

  let body = NOTES;
  if (trace === 'gone') body = '';
  if (trace === 'question') body = `${NOTES}\n\nwho does this belong to?`;
  if (trace === 'copy') body = `${NOTES}\n\n— copy`;

  const life = objectLife({ reachable, opened: Boolean(notes) });

  return (
    <aside
      className="ws-object ws-leaf ws-draft"
      data-presence={presence}
      data-place="draft"
      data-origin="found"
      data-life={life}
      data-remembered={remembered}
      data-trace={trace}
      data-reachable={reachable ? 'true' : 'false'}
      aria-label="The last draft"
      aria-hidden={presence === 'ghost' && !reachable}
    >
      <i className="ws-leaf-age" aria-hidden />
      <i className="ws-leaf-back" aria-hidden />
      <div className="ws-leaf-face">
        {trace === 'gone' ? <p className="ws-draft-empty"> </p> : <pre>{body}</pre>}
      </div>
      <div className="ws-leaf-margin" data-awake={notes ? 'true' : 'false'}>
        {notes}
      </div>
      {reachable && !notes ? (
        <button type="button" className="ws-reach" onClick={onReach} aria-label="The last draft is still on the bench">
          <span className="ws-threshold-mark" aria-hidden />
        </button>
      ) : null}
    </aside>
  );
}
