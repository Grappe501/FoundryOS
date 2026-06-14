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
  blindsCompleted: string[];
  programWeeksCompleted: number[];
  hostNightsCompleted: string[];
  checkpointReady: boolean;
  updatedAt: string;
};

const KEYS = {
  sessions: 'foundry-bourbon-l2-sessions',
  grids: 'foundry-bourbon-l2-grids',
  journal: 'foundry-bourbon-l2-journal',
  progress: 'foundry-bourbon-l2-progress',
  blinds: 'foundry-bourbon-l2-blinds',
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

export type BlindSession = {
  presetId: string;
  ranks: string[];
  notes: string;
  completedAt: string;
};

function normalizeProgress(raw: Partial<Level2Progress>, journalLen: number): Level2Progress {
  return {
    flightsCompleted: raw.flightsCompleted ?? [],
    gridsCompleted: raw.gridsCompleted ?? [],
    journalEntries: journalLen,
    blindsCompleted: raw.blindsCompleted ?? [],
    programWeeksCompleted: raw.programWeeksCompleted ?? [],
    hostNightsCompleted: raw.hostNightsCompleted ?? [],
    checkpointReady: raw.checkpointReady ?? false,
    updatedAt: raw.updatedAt ?? new Date().toISOString(),
  };
}

function recomputeCheckpoint(p: Level2Progress): Level2Progress {
  const flights = p.flightsCompleted.length;
  const grids = p.gridsCompleted.length;
  const journal = p.journalEntries;
  const blinds = p.blindsCompleted.length;
  const programWeeks = p.programWeeksCompleted.length;
  p.checkpointReady =
    flights >= 3 ||
    (flights >= 2 && grids >= 2) ||
    (flights >= 2 && grids >= 1 && journal >= 3) ||
    (programWeeks >= 6 && flights >= 2) ||
    (blinds >= 2 && flights >= 1 && grids >= 1);
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
  const base = normalizeProgress(read<Partial<Level2Progress>>(KEYS.progress, {}), journal.length);
  return recomputeCheckpoint(base);
}

export function saveBlindSession(session: BlindSession) {
  const all = read<BlindSession[]>(KEYS.blinds, []);
  all.unshift(session);
  write(KEYS.blinds, all.slice(0, 50));
  markBlindComplete(session.presetId);
}

export function getBlindSessions(): BlindSession[] {
  return read<BlindSession[]>(KEYS.blinds, []);
}

function markBlindComplete(presetId: string) {
  const p = getLevel2Progress();
  if (!p.blindsCompleted.includes(presetId)) p.blindsCompleted.push(presetId);
  write(KEYS.progress, recomputeCheckpoint(p));
}

export function markProgramWeekComplete(week: number) {
  const p = getLevel2Progress();
  if (!p.programWeeksCompleted.includes(week)) p.programWeeksCompleted.push(week);
  write(KEYS.progress, recomputeCheckpoint(p));
}

export function markHostNightComplete(kitId: string) {
  const p = getLevel2Progress();
  if (!p.hostNightsCompleted.includes(kitId)) p.hostNightsCompleted.push(kitId);
  write(KEYS.progress, recomputeCheckpoint(p));
}

export function getLevel2Stats() {
  const p = getLevel2Progress();
  return {
    flights: p.flightsCompleted.length,
    grids: p.gridsCompleted.length,
    journal: p.journalEntries,
    blinds: p.blindsCompleted.length,
    programWeeks: p.programWeeksCompleted.length,
    hostNights: p.hostNightsCompleted.length,
    sessions: getTastingSessions().length,
    gridSessions: getGridSessions().length,
    blindSessions: getBlindSessions().length,
    checkpointReady: p.checkpointReady,
  };
}
