import { getBottle, type BourbonBottle } from '../bottles';

export type ShelfInsight = {
  headline: string;
  traits: string[];
  shareText: string;
};

export function analyzeShelf(slugs: string[]): ShelfInsight | null {
  const bottles = slugs.map((s) => getBottle(s)).filter(Boolean) as BourbonBottle[];
  if (bottles.length === 0) return null;

  const mashCounts: Record<string, number> = {};
  const tagCounts: Record<string, number> = {};
  let proofSum = 0;
  let priceSum = 0;
  let valueHunter = 0;

  for (const b of bottles) {
    mashCounts[b.mashbill] = (mashCounts[b.mashbill] ?? 0) + 1;
    proofSum += b.proof;
    priceSum += b.priceUsd;
    if (b.tags.includes('value') || b.priceUsd < 30) valueHunter++;
    for (const t of b.tags) tagCounts[t] = (tagCounts[t] ?? 0) + 1;
  }

  const traits: string[] = [];
  const topMash = Object.entries(mashCounts).sort((a, b) => b[1] - a[1])[0];
  if (topMash) {
    const labels: Record<string, string> = {
      wheated: 'wheated bourbons',
      'high-rye': 'high-rye spice',
      traditional: 'classic corn-forward pours',
      'corn-heavy': 'corn-heavy sweetness',
    };
    if (topMash[1] >= 2) traits.push(labels[topMash[0]] ?? topMash[0]);
  }

  const avgProof = proofSum / bottles.length;
  if (avgProof >= 100) traits.push('high proof');
  else if (avgProof <= 88) traits.push('gentle, lower-proof sippers');

  if (valueHunter >= bottles.length / 2) traits.push('value hunting');
  if ((tagCounts.collector ?? 0) >= 2) traits.push('collector energy');
  if ((tagCounts.host ?? 0) >= 2) traits.push('hosting and sharing');
  if ((tagCounts.fruity ?? 0) >= 2) traits.push('fruit-forward profiles');
  if ((tagCounts.oak ?? 0) >= 2) traits.push('oak-heavy, structured pours');

  const avgPrice = priceSum / bottles.length;
  if (avgPrice >= 60) traits.push('premium shelf positioning');
  else if (avgPrice <= 28) traits.push('smart budget stacking');

  if (traits.length === 0) traits.push('eclectic exploration — no single lane yet');

  const headline = `Your shelf says you are building a ${traits.slice(0, 2).join(' + ')} collection.`;
  const shareText = `My Foundry bourbon shelf: ${traits.join(', ')}. What does yours say?`;

  return { headline, traits, shareText };
}
