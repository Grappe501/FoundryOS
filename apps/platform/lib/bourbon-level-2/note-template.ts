/** Structured tasting journal — Level 2 note discipline */

export const FLAVOR_FAMILIES = [
  { id: 'sweet', label: 'Sweet', examples: ['caramel', 'honey', 'brown sugar', 'vanilla'] },
  { id: 'spice', label: 'Spice', examples: ['pepper', 'cinnamon', 'rye heat', 'clove'] },
  { id: 'fruit', label: 'Fruit', examples: ['cherry', 'apple', 'banana', 'citrus'] },
  { id: 'oak', label: 'Oak', examples: ['vanilla', 'sawdust', 'tannin', 'char'] },
  { id: 'texture', label: 'Texture', examples: ['oily', 'thin', 'creamy', 'hot'] },
] as const;

export const FORBIDDEN_NOTE_WORDS = ['smooth', 'strong', 'good', 'nice', 'easy'] as const;

export type JournalEntryTemplate = {
  date: string;
  bottleSlug: string;
  proof: number;
  serve: 'neat' | 'water' | 'rock';
  nose: string;
  palate: string;
  finish: string;
  context: 'solo' | 'host' | 'blind' | 'flight';
  lesson: string;
  flavorFamilies: string[];
};

export const JOURNAL_FIELDS: { key: keyof JournalEntryTemplate; label: string; hint: string }[] = [
  { key: 'nose', label: 'Nose', hint: 'One aroma word — assign a flavor family' },
  { key: 'palate', label: 'Palate', hint: 'Two words max — sweet/spice/fruit balance' },
  { key: 'finish', label: 'Finish', hint: 'Length (short/medium/long) + one word' },
  { key: 'lesson', label: 'One lesson', hint: 'What did this pour teach tonight?' },
];

export function validateNoteWord(word: string): { ok: boolean; reason?: string } {
  const w = word.trim().toLowerCase();
  if (!w) return { ok: false, reason: 'Empty note' };
  if (FORBIDDEN_NOTE_WORDS.includes(w as (typeof FORBIDDEN_NOTE_WORDS)[number])) {
    return { ok: false, reason: `"${w}" is a reflex, not a note — pick a flavor family word` };
  }
  return { ok: true };
}

export function emptyJournalEntry(bottleSlug: string, proof: number): JournalEntryTemplate {
  return {
    date: new Date().toISOString().slice(0, 10),
    bottleSlug,
    proof,
    serve: 'neat',
    nose: '',
    palate: '',
    finish: '',
    context: 'solo',
    lesson: '',
    flavorFamilies: [],
  };
}
