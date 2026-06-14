/** Level 4 — label decoder drills (predict before reveal) */

export type LabelDrill = {
  id: string;
  title: string;
  bottleSlug: string;
  prompt: string;
  fieldsToRead: string[];
  predictQuestion: string;
  revealInsight: string;
};

export const LABEL_DECODER_DRILLS: LabelDrill[] = [
  {
    id: 'bib-evan',
    title: 'BiB white label',
    bottleSlug: 'evan-williams-bib',
    prompt: 'Read bond statement, proof, distiller — ignore brand romance.',
    fieldsToRead: ['Bottled in Bond', '100 proof', 'Distilled at DSP-KY-31'],
    predictQuestion: 'Expect corn-forward BiB at 100 proof — youth or age floor?',
    revealInsight: 'BiB guarantees 4+ years at 100 proof — value transparency without age number on front.',
  },
  {
    id: 'nas-bt',
    title: 'NAS gateway',
    bottleSlug: 'buffalo-trace',
    prompt: 'No age statement — predict house style from proof and category.',
    fieldsToRead: ['Kentucky straight bourbon', '90 proof', 'Buffalo Trace DSP'],
    predictQuestion: 'Corn-sweet NAS polish or young heat?',
    revealInsight: 'BT NAS is blender skill — age hidden but profile consistent. Compare to Eagle Rare for age fork.',
  },
  {
    id: 'age-eagle',
    title: 'Age stated',
    bottleSlug: 'eagle-rare',
    prompt: 'Ten years on label — predict oak vs BT NAS.',
    fieldsToRead: ['Aged 10 years', '90 proof', 'Same campus as BT'],
    predictQuestion: 'More oak tannin or just smoother NAS?',
    revealInsight: 'Age statement is one variable — ER10 often reads smoother, not always more oaky than KC9 at 100 proof.',
  },
  {
    id: 'sb-four-roses',
    title: 'Single barrel pick',
    bottleSlug: 'four-roses-single-barrel',
    prompt: 'Single barrel — one recipe, one barrel. Predict vs Yellow Label.',
    fieldsToRead: ['Single Barrel', '100 proof', 'Recipe code on label (OESO etc.)'],
    predictQuestion: 'More variance or just higher proof Yellow?',
    revealInsight: 'SB exposes one of ten recipes — can diverge wildly from blended Yellow/Small Batch.',
  },
  {
    id: 'rye-category',
    title: 'Rye whiskey line',
    bottleSlug: 'rittenhouse-rye',
    prompt: 'Category line — not bourbon. Read rye proof and bond.',
    fieldsToRead: ['Rye whiskey', '100 proof', 'Bottled in Bond'],
    predictQuestion: 'Pepper forward vs high-rye bourbon spice?',
    revealInsight: 'BiB rye at 100 proof — cocktail backbone that sips hotter than bourbon at same proof.',
  },
  {
    id: 'tn-jack',
    title: 'Tennessee process',
    bottleSlug: 'jack-daniels-old-no-7',
    prompt: 'Tennessee whiskey — process not just state.',
    fieldsToRead: ['Tennessee whiskey', 'Charcoal mellowed', '80 proof'],
    predictQuestion: 'Bourbon-class mash with charcoal banana?',
    revealInsight: 'Process label — mash may qualify as bourbon but charcoal mellowing shifts nose and palate.',
  },
  {
    id: 'barrel-proof-rare',
    title: 'Barrel proof batch',
    bottleSlug: 'rare-breed',
    prompt: 'Barrel proof — batch numbers, no water added.',
    fieldsToRead: ['Barrel proof', 'Batch code', 'Wild Turkey DSP'],
    predictQuestion: 'Heat with flavor or heat without?',
    revealInsight: 'Rare Breed uncut — tiny pours, one drop water. Batch variance is the connoisseur lesson.',
  },
  {
    id: 'craft-ncf',
    title: 'Craft NCF',
    bottleSlug: 'new-riff-bourbon',
    prompt: 'Craft BiB — NCF often implied. Read DSP and proof.',
    fieldsToRead: ['Bottled in Bond', 'New Riff DSP', '100 proof'],
    predictQuestion: 'Oily weight vs filtered major at 100?',
    revealInsight: 'NCF craft BiB vs Evan BiB — same bond rules, different mouthfeel. Filtration is the fork.',
  },
];

export function getLabelDrill(id: string): LabelDrill | undefined {
  return LABEL_DECODER_DRILLS.find((d) => d.id === id);
}
