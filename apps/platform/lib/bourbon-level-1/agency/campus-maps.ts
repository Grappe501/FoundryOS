export type CampusPoint = {
  id: string;
  label: string;
  x: number;
  y: number;
  whyItMatters: string;
};

export type DistilleryCampus = {
  producerSlug: string;
  name: string;
  tagline: string;
  points: CampusPoint[];
};

export const DISTILLERY_CAMPUSES: DistilleryCampus[] = [
  {
    producerSlug: 'buffalo-trace',
    name: 'Buffalo Trace Campus',
    tagline: 'Frankfort — where allocation culture meets rickhouse reality.',
    points: [
      { id: 'visitor', label: 'Visitor center', x: 20, y: 70, whyItMatters: 'Free tours — start here to see scale before you chase bottles.' },
      { id: 'still', label: 'Still house', x: 45, y: 40, whyItMatters: 'Mash #1 and other bills begin here — house DNA starts at fermentation.' },
      { id: 'rickhouse', label: 'Rickhouses', x: 70, y: 25, whyItMatters: 'Thousands of barrels aging — floor position drives single barrel variation.' },
      { id: 'bottling', label: 'Bottling line', x: 55, y: 65, whyItMatters: 'Where proof is set and labels applied — BiB vs barrel proof diverge here.' },
      { id: 'warehouse-h', label: 'Experimental warehouses', x: 80, y: 50, whyItMatters: 'BT experiments with microclimate — future picks often originate here.' },
    ],
  },
  {
    producerSlug: 'heaven-hill',
    name: 'Heaven Hill / Bardstown',
    tagline: 'Value king campus — where shelf staples and picks share rickhouses.',
    points: [
      { id: 'visitor', label: 'Experience center', x: 25, y: 65, whyItMatters: 'Context for Evan Williams, Elijah Craig, Larceny — same house, different tiers.' },
      { id: 'rickhouse', label: 'Rickhouse rows', x: 60, y: 30, whyItMatters: 'Heaven Hill picks are barrel lottery — floor and age drive spice vs caramel.' },
      { id: 'still', label: 'Distillation', x: 40, y: 45, whyItMatters: 'Traditional mash bills at scale — why HH can hit $18 and $60 with same craft.' },
      { id: 'bottling', label: 'Bottling', x: 55, y: 70, whyItMatters: 'BiB Evan Williams White Label exits here — transparency at entry price.' },
    ],
  },
  {
    producerSlug: 'jim-beam',
    name: 'Jim Beam Clermont',
    tagline: 'World\'s largest bourbon producer — Beam to Booker\'s on one hill.',
    points: [
      { id: 'visitor', label: 'American Stillhouse', x: 30, y: 60, whyItMatters: 'Beam family story — connects white label to Knob Creek to Booker\'s ladder.' },
      { id: 'still', label: 'Column stills', x: 50, y: 35, whyItMatters: 'Volume production — understanding scale explains price ladders.' },
      { id: 'rickhouse', label: 'On-site aging', x: 72, y: 28, whyItMatters: 'Booker\'s barrels selected from specific floors — uncut proof philosophy.' },
      { id: 'bottling', label: 'Bottling & proofing', x: 58, y: 68, whyItMatters: 'Where 80 proof Beam diverges from 126 proof Booker\'s — same family, different intent.' },
    ],
  },
];

export function getCampus(producerSlug: string): DistilleryCampus | undefined {
  return DISTILLERY_CAMPUSES.find((c) => c.producerSlug === producerSlug);
}
