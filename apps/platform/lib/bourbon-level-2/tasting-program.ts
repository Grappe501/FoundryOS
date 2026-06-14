/** Level 2 v3 — 8-week Confident Taster program */

export type ProgramWeek = {
  week: number;
  title: string;
  goal: string;
  flightId?: string;
  gridId?: string;
  blindId?: string;
  hostKitId?: string;
  academySlug: string;
  homework: string;
};

export const TASTING_PROGRAM_WEEKS: ProgramWeek[] = [
  { week: 1, title: 'Mash bill fork', goal: 'Taste grain personality — traditional, rye, wheat.', flightId: 'mashbill-triangle', gridId: 'mashbill-three', academySlug: 'mash-bill-in-the-mouth', homework: 'One journal entry — wheated vs high-rye in one sentence.' },
  { week: 2, title: 'Flavor vocabulary', goal: 'Five families — ban "smooth."', academySlug: 'flavor-wheel-practice', homework: 'Update flavor wheel · 3 family words in journal.' },
  { week: 3, title: 'Category literacy', goal: 'Bourbon · rye · Tennessee in one session.', flightId: 'category-triangle', gridId: 'category-three', academySlug: 'rye-and-tennessee-cousins', homework: 'Close rye-vs-high-rye detective case.' },
  { week: 4, title: 'Proof & water', goal: 'Proof ladder + one drop discipline.', flightId: 'proof-ladder', gridId: 'proof-five', academySlug: 'water-and-proof-experiment', homework: 'Water note on highest proof pour only.' },
  { week: 5, title: 'Blind humility', goal: 'Bag value bottles — score before reveal.', blindId: 'value-four-blind', flightId: 'value-blind-prep', academySlug: 'blind-one-pour-drill', homework: 'Host kit: value showdown OR solo blind four.' },
  { week: 6, title: 'Craft inventory', goal: 'Value craft → BiB → wheated craft.', flightId: 'craft-campus', gridId: 'craft-inventory-five', academySlug: 'craft-kentucky-tasting', homework: 'Visit one new craft producer in atlas.' },
  { week: 7, title: 'Finish & splurge', goal: 'Straight vs finish — splurge blind test.', flightId: 'finish-lab', blindId: 'craft-splurge-blind', academySlug: 'finish-tasting-lab', homework: 'Splurge worth-it paragraph in journal.' },
  { week: 8, title: 'Host + checkpoint', goal: 'Run one host night · submit Level 2 evidence.', hostKitId: 'skeptic-three', academySlug: 'level-2-checkpoint', homework: 'Checkpoint checklist · Bourbon Circle post with best flavor word.' },
];

export function getProgramWeek(n: number): ProgramWeek | undefined {
  return TASTING_PROGRAM_WEEKS.find((w) => w.week === n);
}
