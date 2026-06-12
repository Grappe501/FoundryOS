/** Bourbon Hunt Engine — monthly missions, check off, participate */

export type HuntMission = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export function getMonthlyHunt(d = new Date()): { monthKey: string; label: string; missions: HuntMission[] } {
  const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  const monthName = d.toLocaleString('default', { month: 'long', year: 'numeric' });

  const pools: HuntMission[][] = [
    [
      { id: 'bib', title: 'Find a bottled-in-bond', description: 'Evan Williams White Label counts — green label, 100 proof, BiB promise.', href: '/bourbon/detective/bib-guarantee' },
      { id: 'store-pick', title: 'Find or taste a store pick', description: 'Compare to standard expression if you can.', href: '/bourbon/store-picks' },
      { id: 'wheat-compare', title: 'Compare two wheated bourbons blind', description: "Maker's vs Larceny — can you tell the house?", href: '/bourbon/compare' },
    ],
    [
      { id: 'high-proof', title: 'Try something 100+ proof with water drops', description: 'Wild Turkey 101 or Old Forester 1920 — learn the open.', href: '/bourbon/x-ray?bottle=wild-turkey-101' },
      { id: 'producer-new', title: 'Explore a producer you have ignored', description: 'Visit Producer Atlas — pick an unvisited house.', href: '/bourbon/producers' },
      { id: 'blind-league', title: 'Submit Blind Tasting League score', description: 'Monthly challenge — track your palate.', href: '/bourbon/league' },
    ],
    [
      { id: 'detective', title: 'Close one detective case', description: 'Investigate — reach a verdict — mark closed.', href: '/bourbon/detective' },
      { id: 'chain-step', title: 'Advance one progression chain', description: 'Buy or taste the next bottle in a chain.', href: '/bourbon/chains' },
      { id: 'journal', title: 'Log one tasting note', description: 'Nose, palate, finish — one pour, three lines.', href: '/bourbon/portfolio' },
    ],
  ];

  const missions = pools[d.getMonth() % pools.length];
  return { monthKey, label: `${monthName} Hunt`, missions };
}

export type HuntProgress = {
  monthKey: string;
  completed: string[];
  updatedAt: string;
};
