export function dateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function weekKey(d = new Date()): string {
  const start = new Date(d);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - start.getDay());
  return start.toISOString().slice(0, 10);
}

export function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function pick<T>(arr: T[], seed: string): T {
  if (arr.length === 0) throw new Error('empty pool');
  return arr[hash(seed) % arr.length];
}

/** Week-long window */
export function weekWindow(d = new Date()): { starts_at: string; ends_at: string } {
  const start = new Date(d);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - start.getDay());
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return { starts_at: start.toISOString(), ends_at: end.toISOString() };
}

/** Day window */
export function dayWindow(d = new Date()): { starts_at: string; ends_at: string } {
  const start = new Date(d);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { starts_at: start.toISOString(), ends_at: end.toISOString() };
}

/** Seeded rivalry split percentages (sum ~100) */
export function rivalrySplit(optionIds: string[], seed: string): Record<string, number> {
  if (optionIds.length < 2) return { [optionIds[0] ?? 'a']: 100 };
  const h = hash(seed);
  const base = 35 + (h % 26);
  const a = optionIds[0];
  const b = optionIds[1];
  return { [a]: base, [b]: 100 - base };
}
