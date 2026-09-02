import type { ObjectPresence } from '../../../../lib/talent-foundry/implementations/company/traces';

export function TheirWork({ presence, body }: { presence: ObjectPresence; body: string }) {
  if (presence === 'absent' || !body.trim()) return null;
  return (
    <aside
      className="ws-object ws-persist"
      data-presence={presence}
      data-place="made"
      data-origin="made"
      data-life="persisted"
      aria-label="What they made"
    >
      <i className="ws-persist-dock" aria-hidden />
      <pre>{body}</pre>
    </aside>
  );
}
