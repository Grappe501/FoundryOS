/** Bourbon Level 2 — tasting lab sessions, grids, journal, progress */

import type { JournalEntryTemplate } from './note-template';

export type PourNote = {
  bottleSlug: string;
  nose: string;
  palate: string;
  finish: string;
  flavorWords: string[];
  rank?: number;
  waterNote?: string;
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
  journalEntries: number;
  checkpointReady: boolean;
  updatedAt: string;
};

const KEYS = {
  sessions: 'foundry-bourbon-l2-sessions',
  grids: 'foundry-bourbon-l2-grids',
  journal: 'foundry-bourbon-l2-journal',
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

function recomputeCheckpoint(p: Level2Progress): Level2Progress {
  const flights = p.flightsCompleted.length;
  const grids = p.gridsCompleted.length;
  const journal = p.journalEntries;
  p.checkpointReady =
    flights >= 3 ||
    (flights >= 2 && grids >= 2) ||
    (flights >= 2 && grids >= 1 && journal >= 3);
  p.updatedAt = new Date().toISOString();
  return p;
}

export function saveTastingSession(session: TastingSession) {
  const all = read<TastingSession[]>(KEYS.sessions, []);
  all.unshift(session);
  write(KEYS.sessions, all.slice(0, 50));
  markFlightComplete(session.flightId);
}

export function getTastingSessions(): TastingSession[] {
  return read<TastingSession[]>(KEYS.sessions, []);
}

export function saveGridSession(session: GridSession) {
  const all = read<GridSession[]>(KEYS.grids, []);
  all.unshift(session);
  write(KEYS.grids, all.slice(0, 50));
  markGridComplete(session.presetId);
}

export function getGridSessions(): GridSession[] {
  return read<GridSession[]>(KEYS.grids, []);
}

export function saveJournalEntry(entry: JournalEntryTemplate) {
  const all = read<(JournalEntryTemplate & { savedAt: string })[]>(KEYS.journal, []);
  all.unshift({ ...entry, savedAt: new Date().toISOString() });
  write(KEYS.journal, all.slice(0, 100));
  const p = getLevel2Progress();
  p.journalEntries = all.length;
  write(KEYS.progress, recomputeCheckpoint(p));
}

export function getJournalEntries(): (JournalEntryTemplate & { savedAt: string })[] {
  return read(KEYS.journal, []);
}

function markFlightComplete(flightId: string) {
  const p = getLevel2Progress();
  if (!p.flightsCompleted.includes(flightId)) p.flightsCompleted.push(flightId);
  write(KEYS.progress, recomputeCheckpoint(p));
}

function markGridComplete(presetId: string) {
  const p = getLevel2Progress();
  if (!p.gridsCompleted.includes(presetId)) p.gridsCompleted.push(presetId);
  write(KEYS.progress, recomputeCheckpoint(p));
}

export function getLevel2Progress(): Level2Progress {
  const journal = read<(JournalEntryTemplate & { savedAt: string })[]>(KEYS.journal, []);
  const base = read<Level2Progress>(KEYS.progress, {
    flightsCompleted: [],
    gridsCompleted: [],
    journalEntries: journal.length,
    checkpointReady: false,
    updatedAt: new Date().toISOString(),
  });
  base.journalEntries = journal.length;
  return recomputeCheckpoint(base);
}

export function getLevel2Stats() {
  const p = getLevel2Progress();
  return {
    flights: p.flightsCompleted.length,
    grids: p.gridsCompleted.length,
    journal: p.journalEntries,
    sessions: getTastingSessions().length,
    gridSessions: getGridSessions().length,
    checkpointReady: p.checkpointReady,
  };
}
