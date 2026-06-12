/** Bourbon Watchtower — signals, not ratings */

export type WatchtowerSignal = {
  id: string;
  kind: 'discussed' | 'rising' | 'value' | 'controversial' | 'distillery-debate';
  label: string;
  subject: string;
  signal: string;
  href: string;
};

export type WatchtowerWeek = {
  weekKey: string;
  signals: WatchtowerSignal[];
};

function weekKey(d = new Date()): string {
  const start = new Date(d);
  start.setDate(d.getDate() - d.getDay());
  return start.toISOString().slice(0, 10);
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

const SIGNAL_POOL: Omit<WatchtowerSignal, 'id'>[] = [
  { kind: 'discussed', label: 'Most discussed this week', subject: 'Pappy / Van Winkle allocation', signal: 'Secondary chatter up — MSRP vs street debate everywhere', href: '/bourbon/legends/pappy-hunt' },
  { kind: 'discussed', label: 'Most discussed this week', subject: 'Wild Turkey 101', signal: 'Value king threads — "still the best $28 pour"', href: '/bourbon/bottles/wild-turkey-101' },
  { kind: 'rising', label: 'Fastest rising curiosity', subject: 'Store picks', signal: 'Pick season — everyone comparing barrel codes', href: '/bourbon/store-picks' },
  { kind: 'rising', label: 'Fastest rising curiosity', subject: 'BiB expressions', signal: 'Green label Evan Williams — gateway to transparency', href: '/bourbon/detective/bib-guarantee' },
  { kind: 'value', label: 'Biggest value signal', subject: 'Evan Williams BiB', signal: 'BiB discipline under $20 — insiders\' open secret', href: '/bourbon/bottles/evan-williams-black' },
  { kind: 'value', label: 'Biggest value signal', subject: 'Old Forester 86', signal: 'Heritage + approachability — banana bread crowd pleaser', href: '/bourbon/bottles/old-forester-86' },
  { kind: 'controversial', label: 'Most controversial bottle', subject: 'Eagle Rare', signal: 'MSRP saint or markup villain — depends who you ask', href: '/bourbon/detective/eagle-rare-price' },
  { kind: 'controversial', label: 'Most controversial bottle', subject: 'Allocated wheated', signal: 'Weller hunt fatigue vs lottery devotion', href: '/bourbon/detective/weller-ghost' },
  { kind: 'distillery-debate', label: 'Distillery everyone is debating', subject: 'Buffalo Trace vs Heaven Hill', signal: 'Romance vs value — both camps have receipts', href: '/bourbon/wars/buffalo-trace-vs-heaven-hill' },
  { kind: 'distillery-debate', label: 'Distillery everyone is debating', subject: 'Four Roses vs Wild Turkey', signal: 'High-rye fruit vs high-rye punch', href: '/bourbon/wars' },
];

export function getWatchtowerWeek(d = new Date()): WatchtowerWeek {
  const wk = weekKey(d);
  const seed = `watchtower:${wk}`;
  const used = new Set<number>();
  const signals: WatchtowerSignal[] = [];
  const kindsNeeded: WatchtowerSignal['kind'][] = ['discussed', 'rising', 'value', 'controversial', 'distillery-debate'];

  for (const kind of kindsNeeded) {
    const candidates = SIGNAL_POOL.map((s, i) => ({ s, i })).filter(({ s }) => s.kind === kind);
    let pick = candidates[hash(seed + kind) % candidates.length];
    let attempts = 0;
    while (used.has(pick.i) && attempts < 20) {
      pick = candidates[(hash(seed + kind + String(attempts)) % candidates.length)];
      attempts++;
    }
    used.add(pick.i);
    signals.push({ id: `${kind}-${wk}`, ...pick.s });
  }

  return { weekKey: wk, signals };
}
