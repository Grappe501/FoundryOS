import { BOURBON_BOTTLES, getBottle, type BourbonBottle, type MashbillStyle } from '../bottles';

export type ShelfInsightItem = {
  type: 'gap' | 'next' | 'blind-spot';
  headline: string;
  body: string;
  bottleSlug?: string;
  href?: string;
};

export type ShelfIntelligenceReport = {
  shelfSize: number;
  insights: ShelfInsightItem[];
  summary: string;
};

const PRODUCER_BLIND_SPOTS: Record<string, { producer: string; slug: string; name: string }> = {
  'buffalo-trace': { producer: 'four-roses', slug: 'four-roses-yellow', name: 'Four Roses Yellow Label' },
  'wild-turkey': { producer: 'makers-mark', slug: 'makers-mark', name: "Maker's Mark" },
  'heaven-hill': { producer: 'buffalo-trace', slug: 'buffalo-trace', name: 'Buffalo Trace' },
  'four-roses': { producer: 'jim-beam', slug: 'knob-creek-9', name: 'Knob Creek 9 Year' },
  'makers-mark': { producer: 'wild-turkey', slug: 'wild-turkey-101', name: 'Wild Turkey 101' },
  'jim-beam': { producer: 'heaven-hill', slug: 'larceny', name: 'Larceny' },
};

export function analyzeShelfIntelligence(bottleSlugs: string[]): ShelfIntelligenceReport {
  const bottles = bottleSlugs.map((s) => getBottle(s)).filter(Boolean) as BourbonBottle[];
  if (bottles.length === 0) {
    return {
      shelfSize: 0,
      insights: [{
        type: 'next',
        headline: 'Your shelf is empty — start the hunt',
        body: 'Wild Turkey 101 and Evan Williams Black are the textbook first two bottles.',
        bottleSlug: 'wild-turkey-101',
        href: '/bourbon/bottles/wild-turkey-101',
      }],
      summary: 'Add bottles to My Shelf — intelligence activates when you collect.',
    };
  }

  const insights: ShelfInsightItem[] = [];
  const mashCounts: Record<MashbillStyle, number> = { wheated: 0, 'high-rye': 0, traditional: 0, 'corn-heavy': 0 };
  const producers = new Set<string>();

  for (const b of bottles) {
    mashCounts[b.mashbill]++;
    producers.add(b.producerSlug);
  }

  if (mashCounts.wheated >= 2 && mashCounts['high-rye'] === 0) {
    insights.push({
      type: 'gap',
      headline: 'Shelf gap: no rye-forward bottles',
      body: `You have ${mashCounts.wheated} wheated pour${mashCounts.wheated > 1 ? 's' : ''} and zero high-rye. Wild Turkey 101 or Four Roses Yellow opens the spice door.`,
      bottleSlug: 'wild-turkey-101',
      href: '/bourbon/compare',
    });
  }
  if (mashCounts['high-rye'] >= 2 && mashCounts.wheated === 0) {
    insights.push({
      type: 'gap',
      headline: 'Shelf gap: no wheated bottles',
      body: "High-rye dominates your shelf. Maker's Mark or Larceny teaches wheat softness — essential for blind flights.",
      bottleSlug: 'makers-mark',
      href: '/bourbon/compare',
    });
  }

  const hasBT = producers.has('buffalo-trace');
  const hasTurkey = producers.has('wild-turkey');
  if (hasBT && hasTurkey && !producers.has('four-roses')) {
    insights.push({
      type: 'next',
      headline: 'Next logical bottle: Four Roses',
      body: "You've explored Buffalo Trace and Wild Turkey. Four Roses is the next comparison — ten recipes, high-rye fruit.",
      bottleSlug: 'four-roses-yellow',
      href: '/bourbon/bottles/four-roses-yellow',
    });
  }
  if (hasBT && !hasTurkey) {
    insights.push({
      type: 'next',
      headline: 'Next logical bottle: Wild Turkey 101',
      body: 'Buffalo Trace is corn-forward balance. Turkey adds high-rye punch at 101 proof — the classic step-up.',
      bottleSlug: 'wild-turkey-101',
      href: '/bourbon/chains',
    });
  }

  for (const p of producers) {
    const spot = PRODUCER_BLIND_SPOTS[p];
    if (spot && !producers.has(spot.producer) && !bottleSlugs.includes(spot.slug)) {
      insights.push({
        type: 'blind-spot',
        headline: `Blind spot: try ${spot.name}`,
        body: `Most shelves with ${p.replace(/-/g, ' ')} eventually compare ${spot.producer.replace(/-/g, ' ')} — you haven't yet.`,
        bottleSlug: spot.slug,
        href: `/bourbon/bottles/${spot.slug}`,
      });
      break;
    }
  }

  if (insights.length === 0) {
    insights.push({
      type: 'next',
      headline: 'Shelf is balanced — time to hunt',
      body: 'Try a store pick or step up one chain — see Progression Chains.',
      href: '/bourbon/chains',
    });
  }

  const summary = `Analyzing ${bottles.length} bottle${bottles.length !== 1 ? 's' : ''} on your shelf — ${insights.length} signal${insights.length !== 1 ? 's' : ''} for you.`;

  return { shelfSize: bottles.length, insights: insights.slice(0, 4), summary };
}

export function slugsFromCollection(items: { bottleSlug: string; status: string }[]): string[] {
  return [...new Set(
    items.filter((c) => ['owned', 'tasted', 'favorite'].includes(c.status)).map((c) => c.bottleSlug),
  )];
}
