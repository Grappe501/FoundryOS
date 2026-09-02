import type { DraftTrace, ObjectPresence } from '../../../../lib/talent-foundry/implementations/company/traces';

const NOTES = `last night
keep the import path
do not wipe the bench
ask before replace`;

export function LastDraft({ presence, trace }: { presence: ObjectPresence; trace: DraftTrace }) {
  if (presence === 'absent') return null;

  let body = NOTES;
  if (trace === 'gone') body = '';
  if (trace === 'question') body = `${NOTES}\n\nwho does this belong to?`;
  if (trace === 'copy') body = `${NOTES}\n\n— copy`;

  return (
    <aside
      className="ws-object ws-draft"
      data-presence={presence}
      data-trace={trace}
      aria-label="The last draft"
      aria-hidden={presence === 'ghost'}
    >
      {trace === 'gone' ? <p className="ws-draft-empty"> </p> : <pre>{body}</pre>}
    </aside>
  );
}
