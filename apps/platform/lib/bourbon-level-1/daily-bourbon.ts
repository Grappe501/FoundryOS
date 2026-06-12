import { BOURBON_BOTTLES } from './bottles';
import { BOURBON_MYTHS } from './myths';
import { DISTILLERY_WARS } from './wars';
import { MYSTERY_CHALLENGES } from './blind-games';

export type DailyBourbon = {
  dateKey: string;
  fact: { text: string; source?: string };
  bottle: { name: string; slug: string; hook: string };
  comparison: { a: string; b: string; question: string };
  challenge: { text: string; href: string };
  question: { text: string; href: string };
};

function hashDate(d: Date): number {
  const s = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const FACTS = [
  'Bourbon must be aged in new charred oak — never reused barrels like scotch often uses.',
  'The word "proof" comes from sailors testing spirit by soaking gunpowder — if it ignited, it was "proved."',
  'Kentucky produces about 95% of the world\'s bourbon, but bourbon can be made anywhere in the U.S.',
  'A standard barrel holds about 53 gallons — roughly 240–280 bottles depending on proof and angel\'s share.',
  'Char levels (#1–#4) affect caramel and vanilla extraction — most bourbon uses #3 or #4.',
  'Bottled in Bond (1897) was America\'s first consumer protection law for whiskey.',
  'Sour mash means each batch uses a portion of the previous ferment — for consistency, not sour flavor.',
  'Angel\'s share — evaporation in the barrel — can be 2–4% per year in Kentucky rickhouses.',
];

export function getDailyBourbon(date = new Date()): DailyBourbon {
  const h = hashDate(date);
  const dateKey = date.toISOString().slice(0, 10);
  const bottle = BOURBON_BOTTLES[h % BOURBON_BOTTLES.length];
  const war = DISTILLERY_WARS[h % DISTILLERY_WARS.length];
  const myth = BOURBON_MYTHS[h % BOURBON_MYTHS.length];
  const mystery = MYSTERY_CHALLENGES[h % MYSTERY_CHALLENGES.length];

  return {
    dateKey,
    fact: { text: FACTS[h % FACTS.length] },
    bottle: { name: bottle.name, slug: bottle.slug, hook: bottle.oneLiner },
    comparison: { a: war.a.name, b: war.b.name, question: `Which house fits your shelf better — ${war.a.name} or ${war.b.name}?` },
    challenge: { text: 'Play one Mystery Bottle round', href: '/bourbon/games' },
    question: { text: myth.statement, href: '/bourbon/myths' },
  };
}
