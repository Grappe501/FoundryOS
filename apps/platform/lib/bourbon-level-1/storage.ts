/** Bourbon Level 1 — client-side activity storage (DNA, brackets, votes, collector track) */

export type CollectorTrack = 'beginner' | 'enthusiast' | 'collector';

export type DnaPreferences = {
  mashbill: MashbillPref[];
  proofRange: '80-90' | '90-100' | '100-110' | '110+';
  agePreference: 'young' | 'mid' | 'aged' | 'any';
  flavorNotes: ('sweet' | 'spicy' | 'fruity' | 'oak' | 'smoke')[];
  updatedAt: string;
};

type MashbillPref = 'high-rye' | 'wheated' | 'traditional';

export type BracketVote = { winnerSlug: string; loserSlug: string; at: string };
export type WarVote = { warSlug: string; choice: 'a' | 'b'; at: string };
export type BlindScore = { game: string; score: number; total: number; at: string };
export type ShelfEntry = { bottleSlug: string; tier: 'starter' | 'advanced' | 'collector'; at: string };

const KEYS = {
  dna: 'foundry-bourbon-dna',
  brackets: 'foundry-bourbon-brackets',
  wars: 'foundry-bourbon-war-votes',
  blind: 'foundry-bourbon-blind-scores',
  shelf: 'foundry-bourbon-shelf-built',
  collectorTrack: 'foundry-bourbon-collector-track',
  buyQuiz: 'foundry-bourbon-buy-quiz',
  dailySeen: 'foundry-bourbon-daily-seen',
  collection: 'foundry-bourbon-collection-v2',
  flavorWheel: 'foundry-bourbon-flavor-wheel',
  leagueScores: 'foundry-bourbon-league-scores',
  detectiveSolved: 'foundry-bourbon-detective-solved',
  personality: 'foundry-bourbon-personality',
  huntProgress: 'foundry-bourbon-hunt-progress',
} as const;

export type CollectionItem = {
  bottleSlug: string;
  status: 'owned' | 'tasted' | 'wishlist' | 'gifted' | 'traded' | 'empty' | 'favorite';
  notes?: string;
  at: string;
};

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

export function getCollectorTrack(): CollectorTrack {
  return read(KEYS.collectorTrack, 'beginner' as CollectorTrack);
}

export function setCollectorTrack(track: CollectorTrack) {
  write(KEYS.collectorTrack, track);
}

export function getDnaPreferences(): DnaPreferences | null {
  return read<DnaPreferences | null>(KEYS.dna, null);
}

export function saveDnaPreferences(prefs: DnaPreferences) {
  write(KEYS.dna, prefs);
}

export function recordBracketVote(winnerSlug: string, loserSlug: string) {
  const votes = read<BracketVote[]>(KEYS.brackets, []);
  votes.push({ winnerSlug, loserSlug, at: new Date().toISOString() });
  write(KEYS.brackets, votes.slice(-200));
}

export function getBracketVotes(): BracketVote[] {
  return read(KEYS.brackets, []);
}

export function recordWarVote(warSlug: string, choice: 'a' | 'b') {
  const votes = read<WarVote[]>(KEYS.wars, []);
  const filtered = votes.filter((v) => v.warSlug !== warSlug);
  filtered.push({ warSlug, choice, at: new Date().toISOString() });
  write(KEYS.wars, filtered);
}

export function getWarVotes(): WarVote[] {
  return read(KEYS.wars, []);
}

export function recordBlindScore(game: string, score: number, total: number) {
  const scores = read<BlindScore[]>(KEYS.blind, []);
  scores.push({ game, score, total, at: new Date().toISOString() });
  write(KEYS.blind, scores.slice(-50));
}

export function getBlindScores(): BlindScore[] {
  return read(KEYS.blind, []);
}

export function saveShelfBuilt(entries: ShelfEntry[]) {
  write(KEYS.shelf, entries);
}

export function getShelfBuilt(): ShelfEntry[] {
  return read(KEYS.shelf, []);
}

export function getCollection(): CollectionItem[] {
  return read(KEYS.collection, []);
}

export function upsertCollectionItem(item: CollectionItem) {
  const list = getCollection().filter((c) => !(c.bottleSlug === item.bottleSlug && c.status === item.status));
  list.push(item);
  write(KEYS.collection, list);
}

export function removeCollectionItem(bottleSlug: string, status: CollectionItem['status']) {
  write(KEYS.collection, getCollection().filter((c) => !(c.bottleSlug === bottleSlug && c.status === status)));
}

export function markDailySeen(dateKey: string) {
  write(KEYS.dailySeen, dateKey);
}

export function getDailySeen(): string | null {
  return read(KEYS.dailySeen, null);
}

export function getFlavorWheel(): import('./agency/flavor-wheel').FlavorWheelProfile | null {
  return read(KEYS.flavorWheel, null);
}

export function saveFlavorWheel(profile: import('./agency/flavor-wheel').FlavorWheelProfile) {
  write(KEYS.flavorWheel, profile);
}

export function recordLeagueScore(entry: import('./agency/blind-league').LeagueScore) {
  const scores = read<import('./agency/blind-league').LeagueScore[]>(KEYS.leagueScores, []);
  const filtered = scores.filter((s) => s.monthKey !== entry.monthKey);
  filtered.push(entry);
  write(KEYS.leagueScores, filtered);
}

export function getLeagueScores(): import('./agency/blind-league').LeagueScore[] {
  return read(KEYS.leagueScores, []);
}

export function markDetectiveSolved(caseSlug: string) {
  const solved = read<string[]>(KEYS.detectiveSolved, []);
  if (!solved.includes(caseSlug)) {
    write(KEYS.detectiveSolved, [...solved, caseSlug]);
  }
}

export function getDetectiveSolved(): string[] {
  return read(KEYS.detectiveSolved, []);
}

export function savePersonality(id: string) {
  write(KEYS.personality, id);
}

export function getSavedPersonality(): string | null {
  return read(KEYS.personality, null);
}

export function getHuntProgress(): import('./intelligence/hunt-engine').HuntProgress | null {
  return read(KEYS.huntProgress, null);
}

export function toggleHuntMission(monthKey: string, missionId: string) {
  const existing = getHuntProgress();
  const completed = existing?.monthKey === monthKey ? [...existing.completed] : [];
  const idx = completed.indexOf(missionId);
  if (idx >= 0) completed.splice(idx, 1);
  else completed.push(missionId);
  write(KEYS.huntProgress, { monthKey, completed, updatedAt: new Date().toISOString() });
}
