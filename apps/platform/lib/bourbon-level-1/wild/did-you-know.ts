/** Did You Know? — daily-return cards */

export type DidYouKnowCard = {
  id: string;
  headline: string;
  body: string;
  rabbitHoleHref?: string;
  rabbitHoleLabel?: string;
};

export const DID_YOU_KNOW_CARDS: DidYouKnowCard[] = [
  {
    id: 'bourbon-street-not-whiskey',
    headline: 'Bourbon Street was not named after bourbon whiskey.',
    body: 'Both trace to the French House of Bourbon — the street through colonial Louisiana, whiskey through Kentucky counties. Same royal family, separate branches.',
    rabbitHoleHref: '/bourbon/origins',
    rabbitHoleLabel: 'See the origin map',
  },
  {
    id: 'makers-name',
    headline: "Maker's Mark almost had a different name.",
    body: 'The Samuels family debated several names before settling on Maker\'s Mark — the "mark" refers to the distillery\'s quality seal, not a grade of whiskey.',
    rabbitHoleHref: '/bourbon/producers/makers-mark',
    rabbitHoleLabel: 'Maker\'s deep dive',
  },
  {
    id: 'red-wax',
    headline: 'The red wax was not originally marketing genius.',
    body: 'Hand-dipping started as a production signature. It became iconic because it photographed well and felt handmade — ritual over accident, but accident-adjacent.',
    rabbitHoleHref: '/bourbon/stories/makers-wax',
    rabbitHoleLabel: 'Red wax story',
  },
  {
    id: 'prohibition-medicinal',
    headline: 'Bourbon survived Prohibition partly through medicinal permits.',
    body: 'Six companies held licenses to sell "medicinal whiskey." Inventory aged in warehouses while most distilleries died. Repeal rebuilt from that skeleton.',
    rabbitHoleHref: '/bourbon/stories/prohibition',
    rabbitHoleLabel: 'Prohibition story',
  },
  {
    id: 'kentucky-not-required',
    headline: 'Bourbon does not have to come from Kentucky.',
    body: 'Federal law requires USA production — not Kentucky. Excellent bourbon is made in Indiana, Texas, New York, and beyond. Kentucky is culture, not law.',
    rabbitHoleHref: '/bourbon/myths',
    rabbitHoleLabel: 'More myths',
  },
  {
    id: 'derby-julep',
    headline: 'Churchill Downs serves mint juleps in silver cups for a reason.',
    body: 'The Derby julep tradition ties Kentucky identity to bourbon and horse racing — crushed ice, mint, and a souvenir cup that outsells the race for some fans.',
    rabbitHoleHref: '/bourbon/pop-culture#sports',
    rabbitHoleLabel: 'Bourbon & sports',
  },
  {
    id: 'dsp-matters',
    headline: 'The DSP number on a label tells you who actually distilled it.',
    body: 'Many brands source whiskey. The Distilled Spirits Plant ID reveals the campus — essential for understanding what you are paying for.',
    rabbitHoleHref: '/bourbon/academy/what-bourbon-actually-is',
    rabbitHoleLabel: 'Read labels',
  },
  {
    id: 'water-opens',
    headline: 'Adding water often reveals flavor — it does not "ruin" good bourbon.',
    body: 'Water releases aromatic compounds and reduces alcohol burn. Master distillers proof down when evaluating barrels. High-proof pours especially benefit.',
    rabbitHoleHref: '/bourbon/pour-guide',
    rabbitHoleLabel: 'Pour impact guide',
  },
  {
    id: 'large-ice',
    headline: 'One large ice cube changes a pour differently than crushed ice.',
    body: 'Surface area controls dilution speed. Large cubes chill with less water rush — crushed ice in a julep is intentional fast dilution and cold.',
    rabbitHoleHref: '/bourbon/pour-guide',
    rabbitHoleLabel: 'Ice & dilution',
  },
  {
    id: 'country-music',
    headline: 'Country music mentions bourbon because it is shorthand for South, work, and honesty.',
    body: 'Not product placement — cultural code. From Merle to modern Nashville, bourbon signals authenticity the way wine signals California.',
    rabbitHoleHref: '/bourbon/pop-culture#music',
    rabbitHoleLabel: 'Bourbon in music',
  },
];

export function getDidYouKnowForDate(date = new Date()): DidYouKnowCard {
  const key = date.getFullYear() * 1000 + date.getMonth() * 31 + date.getDate();
  return DID_YOU_KNOW_CARDS[key % DID_YOU_KNOW_CARDS.length];
}
