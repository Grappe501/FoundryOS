/** Where to buy bourbon — geographic guide (educational, not affiliate) */

export type BuyRegion = {
  id: string;
  region: string;
  context: string;
  bestBets: string[];
  tips: string[];
  watchFor: string[];
};

export const WHERE_TO_BUY: BuyRegion[] = [
  {
    id: 'kentucky',
    region: 'Kentucky',
    context: 'Ground zero — distillery gift shops, Trail stops, and local allocation culture.',
    bestBets: ['Buffalo Trace gift shop (free tour, gift shop exclusives)', 'Heaven Hill Bourbon Experience (Bardstown)', 'Independent shops in Louisville & Lexington'],
    tips: ['Visit Tuesday–Thursday for thinner crowds', 'Gift shop bottles cannot always be shipped — check laws', 'Compare big-box vs local — locals know allocation drops'],
    watchFor: ['Allocated bottles at MSRP in gift shops — worth the line', 'Secondary market scalping outside distilleries'],
  },
  {
    id: 'tennessee',
    region: 'Tennessee & Nashville',
    context: 'Tourism hub — great selection, bourbon adjacent to Tennessee whiskey culture.',
    bestBets: ['Total Wine superstores (breadth)', 'Independent Nashville shops (staff picks)', 'Liquor stores near Broadway for tourist hours'],
    tips: ['Tennessee whiskey competes for shelf space — bourbon section still deep', 'Sunday sales rules vary by county'],
    watchFor: ['Tourist markup on "exclusive" labels available elsewhere'],
  },
  {
    id: 'texas',
    region: 'Texas',
    context: 'Huge market — Total Wine, Spec\'s, and independent chains fight on price.',
    bestBets: ['Spec\'s (Texas institution)', 'Total Wine & More', 'Local craft-adjacent shops in Austin & Dallas'],
    tips: ['Texas produces bourbon too — ask for local craft', 'Warehouse stores sometimes carry Kirkland bourbon (sourced)'],
    watchFor: ['Heat in parked cars — do not leave bottles in trunk summer'],
  },
  {
    id: 'california',
    region: 'California',
    context: 'Strict shipping; excellent selection in metro areas; higher prices.',
    bestBets: ['K&L Wine Merchants', 'Total Wine CA', 'Costco (rotation bottles)'],
    tips: ['Ship-to-home from out-of-state retailers varies — check ABC rules', 'Bay Area vs LA — independent shops with curator picks'],
    watchFor: ['Price vs MSRP — CA taxes and cost of business add up'],
  },
  {
    id: 'nyc',
    region: 'New York City & Northeast',
    context: 'Every brand fights for Manhattan shelf space — depth and price premium.',
    bestBets: ['Astor Wines & Spirits', 'Warehouse Wine & Spirit', 'NJ liquor stores (short trip for tri-state)'],
    tips: ['NJ often cheaper than NYC — legal cross-border shopping for personal use within limits', 'Specialty bars for pours before you buy bottles'],
    watchFor: ['Tiny apartments — buy what you will drink; storage matters'],
  },
  {
    id: 'midwest',
    region: 'Midwest (OH, IN, IL, MI)',
    context: 'Indiana produces massive sourced bourbon (MGP) — stores know the pipeline.',
    bestBets: ['Binny\'s (Illinois)', 'Indiana independent chains', 'Ohio state liquor agency (OLCC) — consistent pricing'],
    tips: ['Indiana locals understand MGP sourcing — ask what is distilled vs sourced', 'Chicago bar scene for tastes before commits'],
    watchFor: ['State-controlled states — limited sales on Sundays'],
  },
  {
    id: 'south',
    region: 'Deep South (GA, AL, LA, MS)',
    context: 'Culture-heavy — bourbon beside BBQ, football, and hospitality.',
    bestBets: ['New Orleans French Quarter shops (culture + selection)', 'Atlanta mega-stores', 'Biloxi coast casinos — odd hours availability'],
    tips: ['Dry counties still exist — plan routes', 'Bourbon Street is not a whiskey store — leave the Quarter for bottles'],
    watchFor: ['Humidity and heat — store bottles upright, cool, dark'],
  },
  {
    id: 'online',
    region: 'Online & shipping (USA)',
    context: 'ReserveBar, Caskers, distillery direct — laws vary wildly by state.',
    bestBets: ['Distillery direct shipping where legal', 'Reputable online retailers with state compliance', 'Allocation lotteries from major brands'],
    tips: ['Always check ship-to state', 'Compare shipped price vs local after tax', 'Join brand mailing lists for drops'],
    watchFor: ['Scalper sites on allocated bottles', 'Counterfeit rare bottles — buy from authorized dealers only'],
  },
];

export function getBuyRegion(id: string): BuyRegion | undefined {
  return WHERE_TO_BUY.find((r) => r.id === id);
}
