/** Bourbon Level 4 — decoder progress, compare lab, checkpoint */

export type LabelDecodeSession = {
  drillId: string;
  prediction: string;
  notes: string;
  completedAt: string;
};

export type CompareFiveLabSession = {
  presetId: string;
  hypothesis: string;
  winnerSlug: string;
  lesson: string;
  completedAt: string;
};

export type DspHuntSession = {
  huntId: string;
  notes: string;
  completedAt: string;
};

export type Level4Progress = {
  drillsCompleted: string[];
  compareLabsCompleted: string[];
  dspHuntsCompleted: string[];
  labsViewed: string[];
  checkpointReady: boolean;
  updatedAt: string;
};

const KEYS = {
  labelDecodes: 'foundry-bourbon-l4-label-decodes',
  compareLabs: 'foundry-bourbon-l4-compare-labs',
  dspHunts: 'foundry-bourbon-l4-dsp-hunts',
  progress: 'foundry-bourbon-l4-progress',
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getProgressRaw(): Level4Progress {
  const decodes = read<LabelDecodeSession[]>(KEYS.labelDecodes, []);
  const compares = read<CompareFiveLabSession[]>(KEYS.compareLabs, []);
  const hunts = read<DspHuntSession[]>(KEYS.dspHunts, []);
  const base = read<Partial<Level4Progress>>(KEYS.progress, {});
  return {
    drillsCompleted: [...new Set(decodes.map((d) => d.drillId))],
    compareLabsCompleted: [...new Set(compares.map((c) => c.presetId))],
    dspHuntsCompleted: [...new Set(hunts.map((h) => h.huntId))],
    labsViewed: base.labsViewed ?? [],
    checkpointReady: base.checkpointReady ?? false,
    updatedAt: base.updatedAt ?? new Date().toISOString(),
  };
}

function recomputeCheckpoint(p: Level4Progress): Level4Progress {
  const drills = p.drillsCompleted.length;
  const compares = p.compareLabsCompleted.length;
  const hunts = p.dspHuntsCompleted.length;
  p.checkpointReady =
    (compares >= 1 && drills >= 2 && hunts >= 1) ||
    compares >= 2 ||
    (drills >= 4 && compares >= 1) ||
    hunts >= 2;
  p.updatedAt = new Date().toISOString();
  return p;
}

export function saveLabelDecodeSession(session: LabelDecodeSession) {
  const all = read<LabelDecodeSession[]>(KEYS.labelDecodes, []);
  all.unshift(session);
  write(KEYS.labelDecodes, all.slice(0, 40));
  write(KEYS.progress, recomputeCheckpoint(getProgressRaw()));
}

export function saveCompareFiveLabSession(session: CompareFiveLabSession) {
  const all = read<CompareFiveLabSession[]>(KEYS.compareLabs, []);
  all.unshift(session);
  write(KEYS.compareLabs, all.slice(0, 40));
  write(KEYS.progress, recomputeCheckpoint(getProgressRaw()));
}

export function saveDspHuntSession(session: DspHuntSession) {
  const all = read<DspHuntSession[]>(KEYS.dspHunts, []);
  all.unshift(session);
  write(KEYS.dspHunts, all.slice(0, 30));
  write(KEYS.progress, recomputeCheckpoint(getProgressRaw()));
}

export function markLabViewed(labId: string) {
  const p = getProgressRaw();
  if (!p.labsViewed.includes(labId)) p.labsViewed.push(labId);
  write(KEYS.progress, recomputeCheckpoint(p));
}

export function getLevel4Progress(): Level4Progress {
  return recomputeCheckpoint(getProgressRaw());
}

export function getLevel4Stats() {
  const p = getLevel4Progress();
  return {
    drills: p.drillsCompleted.length,
    compareLabs: p.compareLabsCompleted.length,
    dspHunts: p.dspHuntsCompleted.length,
    labsViewed: p.labsViewed.length,
    checkpointReady: p.checkpointReady,
  };
}
