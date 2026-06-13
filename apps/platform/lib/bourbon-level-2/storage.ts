/** Bourbon Level 2 — tasting lab sessions and grid saves */

export type PourNote = {
  bottleSlug: string;
  nose: string;
  palate: string;
  finish: string;
  flavorWords: string[];
};

export type TastingSession = {
  flightId: string;
  pours: PourNote[];
  reflection: string;
  completedAt: string;
};

export type GridCell = Partial<Record<string, string>>;

export type GridSession = {
  presetId: string;
  cells: Record<string, GridCell>;
  winnerSlug: string;
  lesson: string;
  savedAt: string;
};

export type Level2Progress = {
  flightsCompleted: string[];
  gridsCompleted: string[];
  checkpointReady: boolean;
  updatedAt: string;
};

const KEYS = {
  sessions: 'foundry-bourbon-l2-sessions',
  grids: 'foundry-bourbon-l2-grids',
  progress: 'foundry-bourbon-l2-progress',
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

export function saveTastingSession(session: TastingSession) {
  const all = read<TastingSession[]>(KEYS.sessions, []);
  all.unshift(session);
  write(KEYS.sessions, all.slice(0, 50));
  markFlightComplete(session.flightId);
}

export function getTastingSessions(): TastingSession[] {
  return read(KEYS.sessions, []);
}

export function saveGridSession(session: GridSession) {
  const all = read<GridSession[]>(KEYS.grids, []);
  all.unshift(session);
  write(KEYS.grids, all.slice(0, 50));
  markGridComplete(session.presetId);
}

export function getGridSessions(): GridSession[] {
  return read(KEYS.grids, []);
}

function markFlightComplete(flightId: string) {
  const p = getLevel2Progress();
  if (!p.flightsCompleted.includes(flightId)) p.flightsCompleted.push(flightId);
  p.updatedAt = new Date().toISOString();
  p.checkpointReady = p.flightsCompleted.length >= 2 && p.gridsCompleted.length >= 1;
  write(KEYS.progress, p);
}

function markGridComplete(presetId: string) {
  const p = getLevel2Progress();
  if (!p.gridsCompleted.includes(presetId)) p.gridsCompleted.push(presetId);
  p.updatedAt = new Date().toISOString();
  p.checkpointReady = p.flightsCompleted.length >= 2 && p.gridsCompleted.length >= 1;
  write(KEYS.progress, p);
}

export function getLevel2Progress(): Level2Progress {
  return read<Level2Progress>(KEYS.progress, {
    flightsCompleted: [],
    gridsCompleted: [],
    checkpointReady: false,
    updatedAt: new Date().toISOString(),
  });
}
