/** Bourbon Level 3 — themed shelves, defense, progress */

export type SavedThemedShelf = {
  themeId: string;
  note: string;
  savedAt: string;
};

export type ShelfDefense = {
  themeId: string;
  themeStatement: string;
  giftBottleSlug: string;
  giftRationale: string;
  nextBottleSlug: string;
  nextBottleWhy: string;
  gapNotes: string;
  savedAt: string;
};

export type Level3Progress = {
  themesViewed: string[];
  shelvesSaved: number;
  defensesSaved: number;
  gapAnalysesRun: number;
  checkpointReady: boolean;
  updatedAt: string;
};

const KEYS = {
  themedShelves: 'foundry-bourbon-l3-themed-shelves',
  defense: 'foundry-bourbon-l3-defense',
  progress: 'foundry-bourbon-l3-progress',
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

function recomputeCheckpoint(p: Level3Progress): Level3Progress {
  const defenses = p.defensesSaved;
  const shelves = p.shelvesSaved;
  const gaps = p.gapAnalysesRun;
  const themes = p.themesViewed.length;
  p.checkpointReady =
    defenses >= 1 ||
    (shelves >= 2 && gaps >= 1) ||
    (themes >= 4 && shelves >= 1 && gaps >= 1);
  p.updatedAt = new Date().toISOString();
  return p;
}

export function markThemeViewed(themeId: string) {
  const p = getLevel3Progress();
  if (!p.themesViewed.includes(themeId)) p.themesViewed.push(themeId);
  write(KEYS.progress, recomputeCheckpoint(p));
}

export function saveThemedShelf(entry: SavedThemedShelf) {
  const all = read<SavedThemedShelf[]>(KEYS.themedShelves, []);
  all.unshift(entry);
  write(KEYS.themedShelves, all.slice(0, 30));
  const p = getLevel3Progress();
  p.shelvesSaved = all.length;
  write(KEYS.progress, recomputeCheckpoint(p));
}

export function getThemedShelves(): SavedThemedShelf[] {
  return read<SavedThemedShelf[]>(KEYS.themedShelves, []);
}

export function saveShelfDefense(defense: ShelfDefense) {
  const all = read<ShelfDefense[]>(KEYS.defense, []);
  all.unshift(defense);
  write(KEYS.defense, all.slice(0, 20));
  const p = getLevel3Progress();
  p.defensesSaved = all.length;
  write(KEYS.progress, recomputeCheckpoint(p));
}

export function getShelfDefenses(): ShelfDefense[] {
  return read<ShelfDefense[]>(KEYS.defense, []);
}

export function markGapAnalysisRun() {
  const p = getLevel3Progress();
  p.gapAnalysesRun += 1;
  write(KEYS.progress, recomputeCheckpoint(p));
}

export function getLevel3Progress(): Level3Progress {
  const shelves = read<SavedThemedShelf[]>(KEYS.themedShelves, []);
  const defenses = read<ShelfDefense[]>(KEYS.defense, []);
  const base = read<Partial<Level3Progress>>(KEYS.progress, {});
  return recomputeCheckpoint({
    themesViewed: base.themesViewed ?? [],
    shelvesSaved: shelves.length,
    defensesSaved: defenses.length,
    gapAnalysesRun: base.gapAnalysesRun ?? 0,
    checkpointReady: base.checkpointReady ?? false,
    updatedAt: base.updatedAt ?? new Date().toISOString(),
  });
}

export function getLevel3Stats() {
  const p = getLevel3Progress();
  return {
    themesViewed: p.themesViewed.length,
    shelvesSaved: p.shelvesSaved,
    defensesSaved: p.defensesSaved,
    gapAnalyses: p.gapAnalysesRun,
    checkpointReady: p.checkpointReady,
  };
}
