import { BOURBON_BOTTLES, type BourbonBottle, type MashbillStyle } from './bottles';
import { getBracketVotes, getBlindScores, getDnaPreferences, getFlavorWheel, getWarVotes, type DnaPreferences } from './storage';
import { topFlavorNotes } from './agency/flavor-wheel';

export type BourbonDnaProfile = {
  mashbill: { style: MashbillStyle; label: string; confidence: number }[];
  proofPreference: string;
  agePreference: string;
  flavorProfile: string[];
  recommendedBottles: BourbonBottle[];
  summary: string;
};

export function computeBourbonDna(): BourbonDnaProfile | null {
  const votes = getBracketVotes();
  const wars = getWarVotes();
  const blind = getBlindScores();
  const saved = getDnaPreferences();

  if (votes.length === 0 && wars.length === 0 && blind.length === 0 && !saved) {
    return null;
  }

  const winCounts: Record<string, number> = {};
  for (const v of votes) {
    winCounts[v.winnerSlug] = (winCounts[v.winnerSlug] ?? 0) + 1;
  }

  const preferred = Object.entries(winCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([slug]) => BOURBON_BOTTLES.find((b) => b.slug === slug))
    .filter(Boolean) as BourbonBottle[];

  const mashbillCounts: Record<MashbillStyle, number> = { 'high-rye': 0, wheated: 0, traditional: 0, 'corn-heavy': 0 };
  const flavorCounts: Record<string, number> = {};
  let proofSum = 0;
  let proofN = 0;
  let ageSum = 0;
  let ageN = 0;

  const influence = preferred.length > 0 ? preferred : BOURBON_BOTTLES.slice(0, 5);
  for (const b of influence) {
    mashbillCounts[b.mashbill]++;
    proofSum += b.proof;
    proofN++;
    if (b.ageYears) { ageSum += b.ageYears; ageN++; }
    for (const t of b.tags) {
      if (['sweet', 'spicy', 'fruity', 'oak', 'smoke'].includes(t)) {
        flavorCounts[t] = (flavorCounts[t] ?? 0) + 1;
      }
    }
  }

  if (saved) {
    for (const m of saved.mashbill) mashbillCounts[m === 'traditional' ? 'traditional' : m]++;
    for (const f of saved.flavorNotes) flavorCounts[f] = (flavorCounts[f] ?? 0) + 2;
  }

  const wheel = getFlavorWheel();
  if (wheel) {
    for (const note of topFlavorNotes(wheel, 6)) {
      const mapped = note === 'spice' ? 'spicy' : note === 'fruit' ? 'fruity' : note;
      if (['sweet', 'spicy', 'fruity', 'oak', 'smoke'].includes(mapped)) {
        flavorCounts[mapped] = (flavorCounts[mapped] ?? 0) + 3;
      }
    }
  }

  const mashbill = (Object.entries(mashbillCounts) as [MashbillStyle, number][])
    .filter(([, c]) => c > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([style, count]) => ({
      style,
      label: mashbillLabel(style),
      confidence: Math.min(95, 40 + count * 15),
    }));

  const avgProof = proofN ? proofSum / proofN : 90;
  const proofPreference =
    avgProof >= 110 ? '100–110 proof — you like intensity' :
    avgProof >= 100 ? '90–100 proof — flavor with some heat' :
    avgProof >= 90 ? '86–92 proof — balanced daily pours' : '80–86 proof — gentle sippers';

  const avgAge = ageN ? ageSum / ageN : 6;
  const agePreference =
    avgAge >= 12 ? '12+ years — you appreciate deep oak' :
    avgAge >= 8 ? '6–10 years — sweet spot for many enthusiasts' :
    avgAge >= 4 ? '4–6 years — youthful energy' : 'No strong age preference yet';

  const flavorProfile = Object.entries(flavorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([f]) => f);

  const recommendedBottles = recommendFromDna(mashbill[0]?.style, avgProof, flavorProfile);

  const summary = buildSummary(mashbill, proofPreference, flavorProfile, votes.length + wars.length + blind.length);

  return { mashbill, proofPreference, agePreference, flavorProfile, recommendedBottles, summary };
}

function mashbillLabel(style: MashbillStyle): string {
  const map: Record<MashbillStyle, string> = {
    'high-rye': 'High rye — spice and fruit',
    wheated: 'Wheated — soft and sweet',
    traditional: 'Traditional corn-forward',
    'corn-heavy': 'Corn-heavy — caramel baseline',
  };
  return map[style];
}

function recommendFromDna(topMash: MashbillStyle | undefined, avgProof: number, flavors: string[]): BourbonBottle[] {
  return BOURBON_BOTTLES.filter((b) => {
    if (topMash && b.mashbill === topMash) return true;
    if (flavors.some((f) => b.tags.includes(f as BourbonBottle['tags'][number]))) return true;
    if (Math.abs(b.proof - avgProof) < 8) return true;
    return false;
  })
    .slice(0, 5);
}

function buildSummary(
  mashbill: BourbonDnaProfile['mashbill'],
  proof: string,
  flavors: string[],
  activityCount: number,
): string {
  const top = mashbill[0]?.label ?? 'Still forming';
  const flavorStr = flavors.length ? flavors.join(', ') : 'exploring';
  return `Based on ${activityCount} interactions, you lean ${top.toLowerCase()}. Proof preference: ${proof.toLowerCase()}. Flavor lean: ${flavorStr}.`;
}

export function updateDnaFromQuiz(prefs: Partial<DnaPreferences>) {
  const existing = getDnaPreferences();
  saveDnaMerged({ ...existing, ...prefs, updatedAt: new Date().toISOString() } as DnaPreferences);
}

function saveDnaMerged(prefs: DnaPreferences) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('foundry-bourbon-dna', JSON.stringify(prefs));
}
