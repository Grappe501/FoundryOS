/** Level 4 learning modules */

export type Level4Module = {
  id: string;
  title: string;
  goal: string;
  toolHref?: string;
  drillId?: string;
  presetId?: string;
  huntId?: string;
  labId?: string;
  academySlug: string;
  order: number;
};

export const LEVEL_4_MODULES: Level4Module[] = [
  { id: 'label-anatomy', title: 'Label anatomy', goal: 'Read DSP, proof, straight, category cold.', toolHref: '/bourbon/label-decoder', drillId: 'nas-bt', academySlug: 'label-anatomy', order: 1 },
  { id: 'dsp-hunt', title: 'DSP scavenger', goal: 'Match five bottles to distillery numbers.', toolHref: '/bourbon/dsp-scavenger', huntId: 'major-campus', academySlug: 'dsp-sourcing-literacy', order: 2 },
  { id: 'single-barrel', title: 'Single barrel variance', goal: 'SB vs blend on one campus.', toolHref: '/bourbon/single-barrel-lab', labId: 'four-roses-ladder', academySlug: 'single-barrel-variance', order: 3 },
  { id: 'nas-age', title: 'NAS vs age', goal: 'Stated age vs NAS polish — angel\'s share.', toolHref: '/bourbon/nas-age-lab', labId: 'bt-er', academySlug: 'age-nas-angels-share', order: 4 },
  { id: 'compare-five', title: 'Compare Five lab', goal: 'Hypothesis before pour — defend winner.', toolHref: '/bourbon/compare-five-lab', presetId: 'nas-vs-age', academySlug: 'compare-five-mission-prep', order: 5 },
  { id: 'ncf-lab', title: 'NCF vs filtered', goal: 'Mouthfeel fork — craft vs Michter\'s.', toolHref: '/bourbon/compare-five-lab?preset=ncf-vs-filtered', presetId: 'ncf-vs-filtered', academySlug: 'chill-filtration-lab', order: 6 },
  { id: 'cask-strength', title: 'Cask strength', goal: 'Barrel proof — water discipline.', toolHref: '/bourbon/compare-five-lab?preset=cask-strength-five', presetId: 'cask-strength-five', academySlug: 'cask-strength-dilution', order: 7 },
  { id: 'store-picks', title: 'Store picks', goal: 'When picks beat standard — markup test.', toolHref: '/bourbon/store-pick-lab', academySlug: 'store-picks-worth-it', order: 8 },
  { id: 'x-ray', title: 'Bottle X-Ray', goal: 'Entry proof, warehouse, analyst take.', toolHref: '/bourbon/x-ray', academySlug: 'label-anatomy', order: 9 },
  { id: 'region', title: 'Kentucky vs beyond', goal: 'Region literacy — DSP over romance.', toolHref: '/bourbon/compare-five-lab?preset=world-contrast', presetId: 'world-contrast', academySlug: 'kentucky-vs-beyond', order: 10 },
  { id: 'detective', title: 'Detective cases', goal: 'Close DSP and NAS cases.', toolHref: '/bourbon/detective/dsp-numbers', academySlug: 'dsp-sourcing-literacy', order: 11 },
  { id: 'checkpoint', title: 'Level 4 checkpoint', goal: 'Compare Five + DSP + SB note.', academySlug: 'level-4-checkpoint', order: 12 },
];

export function getLevel4Module(id: string): Level4Module | undefined {
  return LEVEL_4_MODULES.find((m) => m.id === id);
}
