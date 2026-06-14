/** Level 3 — bottle role tags on a themed shelf */

export type ShelfRole =
  | 'daily'
  | 'host'
  | 'learning'
  | 'splurge'
  | 'backup'
  | 'bib-anchor'
  | 'craft'
  | 'category';

export const SHELF_ROLES: { id: ShelfRole; label: string; hint: string }[] = [
  { id: 'daily', label: 'Daily drinker', hint: 'Wide availability — house pour, low regret' },
  { id: 'host', label: 'Host pour', hint: 'Guest-friendly proof and profile' },
  { id: 'learning', label: 'Learning bottle', hint: 'Teaches one variable — mash, proof, process' },
  { id: 'splurge', label: 'Splurge / occasion', hint: 'Special night — must earn rank blind' },
  { id: 'backup', label: 'Backup', hint: 'Repeat buy when daily runs out' },
  { id: 'bib-anchor', label: 'BiB anchor', hint: '100 proof bond transparency' },
  { id: 'craft', label: 'Craft representative', hint: 'Grain-to-glass or NCF story' },
  { id: 'category', label: 'Category slot', hint: 'Rye or Tennessee — not bourbon label' },
];

export function getShelfRoleLabel(role: ShelfRole): string {
  return SHELF_ROLES.find((r) => r.id === role)?.label ?? role;
}
