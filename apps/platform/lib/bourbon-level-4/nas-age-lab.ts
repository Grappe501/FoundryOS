/** Level 4 — NAS vs stated age lab pairings */

export type NasAgeLab = {
  id: string;
  title: string;
  variable: string;
  nasSlug: string;
  ageSlug: string;
  anchorSlug: string;
  prompt: string;
  angelsShareNote: string;
};

export const NAS_AGE_LABS: NasAgeLab[] = [
  {
    id: 'bt-er',
    title: 'BT NAS vs Eagle Rare 10',
    variable: 'Same campus — age stated vs NAS',
    nasSlug: 'buffalo-trace',
    ageSlug: 'eagle-rare',
    anchorSlug: 'knob-creek-9',
    prompt: 'Rank oak vs polish — not age worship.',
    angelsShareNote: 'Angel\'s share removes volume — age costs money; NAS blends hide year variance.',
  },
  {
    id: 'kc-er',
    title: 'Knob Creek 9 vs Eagle Rare 10',
    variable: 'Age + proof — different houses',
    nasSlug: 'buffalo-trace',
    ageSlug: 'eagle-rare',
    anchorSlug: 'knob-creek-9',
    prompt: '100 proof age vs 90 proof age — which reads older?',
    angelsShareNote: 'Proof density can mimic age — score separately.',
  },
  {
    id: 'russell-kc',
    title: 'Russell\'s 10 vs Knob Creek 9',
    variable: 'Stated age rivals',
    nasSlug: 'wild-turkey-101',
    ageSlug: 'russells-reserve-10',
    anchorSlug: 'knob-creek-9',
    prompt: 'Turkey spice age vs Beam oak age.',
    angelsShareNote: 'Two 9–10 year statements — house yeast still diverges.',
  },
  {
    id: 'craft-age',
    title: 'Craft age transparency',
    variable: 'Blue Run 8 vs NAS majors',
    nasSlug: 'buffalo-trace',
    ageSlug: 'blue-run-8-year',
    anchorSlug: 'eagle-rare',
    prompt: 'Craft stated age vs major stated age — splurge jury.',
    angelsShareNote: 'Young craft age statement vs ER10 — price vs palate.',
  },
  {
    id: 'nas-splurge',
    title: 'NAS splurge vs age value',
    variable: 'Rhetoric 24 vs daily NAS',
    nasSlug: 'buffalo-trace',
    ageSlug: 'rhetoric-24',
    anchorSlug: 'evan-williams-black',
    prompt: 'Extreme age vs $18 daily — occasion only lesson.',
    angelsShareNote: 'Over-oak risk rises at 20+ years — age not automatic win.',
  },
];

export function getNasAgeLab(id: string): NasAgeLab | undefined {
  return NAS_AGE_LABS.find((l) => l.id === id);
}
