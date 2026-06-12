/** Bourbon Pop Culture — movies, music, sports, politics */

export type PopCultureEntry = {
  id: string;
  title: string;
  medium: string;
  whyBourbon: string;
  brands?: string;
  href?: string;
};

export type PopCultureSection = {
  id: string;
  title: string;
  intro: string;
  entries: PopCultureEntry[];
};

export const POP_CULTURE_SECTIONS: PopCultureSection[] = [
  {
    id: 'movies',
    title: 'Bourbon in Movies & TV',
    intro: 'Bourbon on screen signals American masculinity, Southern identity, or quiet sophistication — rarely random product placement.',
    entries: [
      { id: 'lost-in-translation', title: 'Lost in Translation', medium: 'Film', whyBourbon: 'Bill Murray\'s Suntory scene parodies whiskey marketing — bourbon adjacent in the "Japanese whiskey" joke that launched a thousand bar orders.', brands: 'Suntory (whiskey, not bourbon — but the scene drives whiskey curiosity)' },
      { id: 'justified', title: 'Justified', medium: 'TV', whyBourbon: 'Kentucky setting makes bourbon ambient realism — Raylan Givens\' Harlan County world assumes bourbon in every kitchen.', brands: 'Regional Kentucky brands implied' },
      { id: 'kingsman', title: 'Kingsman: The Secret Service', medium: 'Film', whyBourbon: 'Colin Firth\'s line about bourbon — "There is no bourbon in this country" — became meme and bar debate fodder.', brands: 'Generic bourbon culture' },
      { id: 'mad-men', title: 'Mad Men', medium: 'TV', whyBourbon: 'Post-war American office culture — whiskey in the drawer; bourbon as weekday default before craft cocktail era.', brands: 'Period-appropriate pours' },
    ],
  },
  {
    id: 'music',
    title: 'Bourbon in Music',
    intro: 'Country and Southern rock use bourbon as shorthand for honesty, hard work, and heartbreak — not usually a specific brand deal.',
    entries: [
      { id: 'country-shorthand', title: 'Country lyrics', medium: 'Genre', whyBourbon: 'Merle Haggard to modern Nashville — "bourbon" evokes porch, pickup, and regret in one syllable.', brands: 'Rarely specific — cultural code' },
      { id: 'southern-rock', title: 'Southern rock', medium: 'Genre', whyBourbon: 'Skynyrd-era South paired bourbon with bar bands and long drives — rock tour bus mythology.', brands: 'Jack and bourbon often blurred in lyrics' },
      { id: 'honky-tonk', title: 'Honky-tonk bars', medium: 'Culture', whyBourbon: 'Rail bourbon and well pours — the song is about the bar, not the bottle.', brands: 'Well bourbon' },
    ],
  },
  {
    id: 'sports',
    title: 'Bourbon & Sports',
    intro: 'Horse racing owns the official marriage; tailgating spreads it everywhere else.',
    entries: [
      { id: 'kentucky-derby', title: 'Kentucky Derby', medium: 'Horse racing', whyBourbon: '120,000+ mint juleps each Derby — Churchill Downs makes bourbon unavoidable on the first Saturday in May.', brands: 'Derby official bourbon partnerships rotate' },
      { id: 'mint-julep', title: 'Mint Julep tradition', medium: 'Cocktail', whyBourbon: 'Crushed ice, silver cup, mint — designed for hot afternoons and photo ops.', brands: 'High-proof bourbon stands up to ice' },
      { id: 'tailgate', title: 'Tailgating culture', medium: 'Sports', whyBourbon: 'College football in the South — bourbon in flasks and mixed drinks alongside BBQ.', brands: 'Crowd-pleasers: Maker\'s, Buffalo Trace' },
    ],
  },
  {
    id: 'politics',
    title: 'Bourbon & Politics',
    intro: 'Presidents and diplomats use bourbon as Americana — export diplomacy in a glass.',
    entries: [
      { id: 'state-dinners', title: 'State dinners', medium: 'Politics', whyBourbon: 'American spirit served to foreign leaders — Kentucky as soft power.', brands: 'Premium Kentucky exports' },
      { id: 'congress-bottles', title: 'Congressional bourbon', medium: 'History', whyBourbon: 'Kentucky delegations historically gifted barrels — lobbying with liquid.', brands: 'Varies by era' },
      { id: 'lincoln-kentucky', title: 'Lincoln & Kentucky', medium: 'History', whyBourbon: 'Birthplace state identity — bourbon as Kentucky export post-Civil War.', brands: 'Heritage brands' },
    ],
  },
];

export function getPopCultureSection(id: string): PopCultureSection | undefined {
  return POP_CULTURE_SECTIONS.find((s) => s.id === id);
}
