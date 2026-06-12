/** Bourbon Beyond the Bottle — House of Bourbon origin (two branches) */

export type OriginNode = {
  id: string;
  label: string;
  detail: string;
  branch: 'whiskey' | 'street' | 'root';
};

export type OriginBranch = {
  id: 'whiskey' | 'street';
  title: string;
  subtitle: string;
  nodes: OriginNode[];
};

export const HOUSE_OF_BOURBON_ROOT = {
  title: 'House of Bourbon',
  body:
    'The French royal family known as the House of Bourbon ruled France for centuries. Two American icons — bourbon whiskey and Bourbon Street — both trace back here, but not to each other directly. Same family tree, separate branches.',
};

export const ORIGIN_BRANCHES: OriginBranch[] = [
  {
    id: 'whiskey',
    title: 'Branch 1 → Bourbon Whiskey',
    subtitle: 'France → Kentucky → the bottle on your shelf',
    nodes: [
      { id: 'france-whiskey', label: 'France · House of Bourbon', branch: 'whiskey', detail: 'French royal dynasty; name honored American allies after Revolutionary War support.' },
      { id: 'bourbon-county', label: 'Bourbon County, Kentucky', branch: 'whiskey', detail: 'County named for the French family — gratitude for France backing the colonies.' },
      { id: 'bourbon-district', label: 'Old Bourbon District', branch: 'whiskey', detail: 'Whiskey shipped from this region was stamped "Old Bourbon" — origin of the category name.' },
      { id: 'kentucky-spirit', label: 'Kentucky Straight Bourbon', branch: 'whiskey', detail: 'Limestone water, corn abundance, and rickhouse culture made Kentucky the spiritual home.' },
      { id: 'bottle', label: 'Bourbon Whiskey Today', branch: 'whiskey', detail: 'Federal standards: 51%+ corn, new charred oak, made in the USA. Kentucky produces most — but not all.' },
    ],
  },
  {
    id: 'street',
    title: 'Branch 2 → Bourbon Street',
    subtitle: 'France → New Orleans → the street everyone photographs',
    nodes: [
      { id: 'france-street', label: 'France · House of Bourbon', branch: 'street', detail: 'Same royal family — different colonial honor.' },
      { id: 'louisiana', label: 'Spanish Colonial Louisiana', branch: 'street', detail: '1700s: Louisiana passed between colonial powers; French allies remembered.' },
      { id: 'nola', label: 'New Orleans · Vieux Carré', branch: 'street', detail: 'French Quarter grid — Bourbon Street named to honor the Bourbon dynasty, not whiskey.' },
      { id: 'bourbon-street', label: 'Bourbon Street', branch: 'street', detail: 'Most people assume whiskey. It was royalty. The confusion is the best bar trivia in America.' },
      { id: 'jazz-juleps', label: 'Jazz · Mint Juleps · Nightlife', branch: 'street', detail: 'Culture layered on top — music, cocktails, Mardi Gras. Bourbon whiskey arrived separately through trade and tourism.' },
    ],
  },
];

export const ORIGIN_MYTH = {
  myth: 'Bourbon Street was named after bourbon whiskey.',
  truth: 'False. Both were named after the French House of Bourbon — whiskey through Kentucky counties, the street through colonial Louisiana.',
};
