/** Level 4 — DSP scavenger hunt exercises */

import { getBourbonProducer } from '../world-depth/bourbon-producers';
import { getBottle } from '../bourbon-level-1/bottles';

export type DspHuntItem = {
  bottleSlug: string;
  clue: string;
  dspHint: string;
};

export type DspScavengerHunt = {
  id: string;
  title: string;
  goal: string;
  items: DspHuntItem[];
  detectiveSlug?: string;
};

export const DSP_SCAVENGER_HUNTS: DspScavengerHunt[] = [
  {
    id: 'major-campus',
    title: 'Major campus DSP hunt',
    goal: 'Match five major house bottles to DSP numbers.',
    detectiveSlug: 'dsp-numbers',
    items: [
      { bottleSlug: 'buffalo-trace', clue: 'Frankfort — most visited distillery in America', dspHint: 'DSP-KY-113' },
      { bottleSlug: 'wild-turkey-101', clue: 'Lawrenceburg — Jimmy & Eddie Russell legacy', dspHint: 'DSP-KY-52' },
      { bottleSlug: 'makers-mark', clue: 'Loretto — red wax rotating barrel program', dspHint: 'DSP-KY-11' },
      { bottleSlug: 'four-roses-yellow', clue: 'Coxs Creek — ten recipes system', dspHint: 'DSP-KY-05' },
      { bottleSlug: 'evan-williams-black', clue: 'Bardstown — massive independent inventory', dspHint: 'DSP-KY-31' },
    ],
  },
  {
    id: 'craft-campus',
    title: 'Craft grain-to-glass hunt',
    goal: 'Verify craft bottles against campus DSP — not NDP mystery.',
    detectiveSlug: 'craft-marketing-truth',
    items: [
      { bottleSlug: 'new-riff-bourbon', clue: 'Newport — NCF BiB craft', dspHint: 'DSP-KY-500 area' },
      { bottleSlug: 'wilderness-trail-bib', clue: 'Danville — wheated craft BiB', dspHint: 'Check label DSP' },
      { bottleSlug: 'green-river-kentucky-straight', clue: 'Owensboro revival', dspHint: 'Green River campus' },
      { bottleSlug: 'peerless-bourbon', clue: 'Louisville vertical integration', dspHint: 'Peerless DSP' },
      { bottleSlug: 'castle-key-bourbon', clue: 'Frankfort historic site reborn', dspHint: 'Castle & Key DSP' },
    ],
  },
  {
    id: 'sourced-spotter',
    title: 'Sourced juice spotter',
    goal: 'Which brand story matches who actually distilled?',
    items: [
      { bottleSlug: 'bulleit-bourbon', clue: 'High rye — often Four Roses sourced historically', dspHint: 'Match to FR campus' },
      { bottleSlug: 'buffalo-trace', clue: 'BT campus grain-to-glass', dspHint: 'DSP-KY-113' },
      { bottleSlug: 'bardstown-fusion-wheated', clue: 'NDP blender — read fine print', dspHint: 'Sourced + finish' },
      { bottleSlug: 'new-riff-bourbon', clue: 'Single campus craft', dspHint: 'New Riff DSP' },
      { bottleSlug: 'elijah-craig-small-batch', clue: 'Heaven Hill house', dspHint: 'DSP-KY-31 family' },
    ],
  },
  {
    id: 'rye-dsp',
    title: 'Rye whiskey DSP hunt',
    goal: 'Rye category — same DSP rules as bourbon.',
    items: [
      { bottleSlug: 'rittenhouse-rye', clue: 'Heaven Hill BiB rye value', dspHint: 'HH DSP' },
      { bottleSlug: 'wild-turkey-rye', clue: 'Turkey rye — same campus as 101', dspHint: 'DSP-KY-52' },
      { bottleSlug: 'new-riff-rye', clue: 'Craft BiB rye', dspHint: 'New Riff' },
      { bottleSlug: 'bulleit-rye', clue: 'High rye — separate from Bulleit bourbon', dspHint: 'Check label' },
      { bottleSlug: 'buffalo-trace', clue: 'Bourbon baseline for category compare', dspHint: 'DSP-KY-113' },
    ],
  },
  {
    id: 'tennessee-dsp',
    title: 'Tennessee DSP hunt',
    goal: 'Process state + DSP — Jack vs Dickel.',
    items: [
      { bottleSlug: 'jack-daniels-old-no-7', clue: 'Lynchburg — charcoal mellowing', dspHint: 'Jack DSP TN' },
      { bottleSlug: 'george-dickel-no-8', clue: 'Cascade Hollow — TN competitor', dspHint: 'Dickel DSP' },
      { bottleSlug: 'buffalo-trace', clue: 'KY bourbon baseline', dspHint: 'DSP-KY-113' },
      { bottleSlug: 'makers-mark', clue: 'KY wheated compare', dspHint: 'DSP-KY-11' },
      { bottleSlug: 'rittenhouse-rye', clue: 'Rye category anchor', dspHint: 'HH DSP' },
    ],
  },
  {
    id: 'shelf-audit',
    title: 'Your shelf DSP audit',
    goal: 'Pick five bottles you own — log DSP from label or atlas.',
    items: [
      { bottleSlug: 'buffalo-trace', clue: 'Template: read back label fine print', dspHint: 'Producer atlas → campus' },
      { bottleSlug: 'evan-williams-black', clue: 'Value tier — same HH as Elijah Craig', dspHint: 'DSP-KY-31' },
      { bottleSlug: 'wild-turkey-101', clue: 'High rye Turkey mash', dspHint: 'DSP-KY-52' },
      { bottleSlug: 'larceny', clue: 'Wheated HH fork', dspHint: 'DSP-KY-31' },
      { bottleSlug: 'four-roses-single-barrel', clue: 'Single recipe SB', dspHint: 'DSP-KY-05' },
    ],
  },
];

export function getDspHunt(id: string): DspScavengerHunt | undefined {
  return DSP_SCAVENGER_HUNTS.find((h) => h.id === id);
}

export function resolveDspForBottle(slug: string): string {
  const b = getBottle(slug);
  if (!b) return 'Unknown';
  const p = getBourbonProducer(b.producerSlug);
  return p?.dspNote ?? `Check atlas for ${b.producerName}`;
}
