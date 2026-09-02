import type { ObjectPresence } from '../../../../lib/talent-foundry/implementations/company/traces';

export function TheirWork({ presence, body }: { presence: ObjectPresence; body: string }) {
  if (presence === 'absent' || !body.trim()) return null;
  return (
    <aside className="ws-object ws-draft" data-presence={presence} data-trace="restored" aria-label="What they made">
      <pre>{body}</pre>
    </aside>
  );
}
