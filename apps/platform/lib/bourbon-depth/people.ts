/**
 * @deprecated Do not use for consumer UI — fabricated seed bios violate CONTENT_INTEGRITY.
 * Use entity-slots/leaders.ts for empty leader slots until editorial/verified content exists.
 * Kept for operator reference only during 034Q absorption into 040B graph seeds.
 */
import type { BourbonPerson } from './types';

export const BOURBON_PEOPLE: BourbonPerson[] = [
  {
    slug: 'jimmy-russell',
    name: 'Jimmy Russell',
    title: 'Master Distiller Emeritus, Wild Turkey',
    producerSlugs: ['wild-turkey'],
    era: '1954–present (60+ years at one distillery)',
    hook: 'The man who stayed at one rickhouse long enough to become bourbon itself.',
    originStory:
      'Jimmy Russell joined Wild Turkey in 1954 at age 16 — sweeping floors in Lawrenceburg, Kentucky. His father Eddie Russell also worked in bourbon, but Jimmy did not inherit the title; he earned it by learning every warehouse position before anyone let him near the mash tun. In an industry of job-hopping consultants, Russell became the counter-argument: depth comes from staying.',
    careerHighlights: [
      { year: '1954', event: 'Hired at Wild Turkey — floor sweeper, then every production role.' },
      { year: '1970s', event: 'Developed the high-rye Wild Turkey profile that defines the brand.' },
      { year: '1990s', event: 'Russell\'s Reserve line named — rare honor while still active.' },
      { year: '2010s', event: 'Jimmy & Eddie Russell become the longest father-son distiller duo in Kentucky.' },
      { year: 'Today', event: 'Eddie Russell carries production; Jimmy remains the living archive of Turkey lore.' },
    ],
    philosophy:
      'Russell famously said bourbon should have "character" — meaning rye spice and proof that announce themselves. He resisted the wheated softness trend and the race to ultra-premium pricing. Wild Turkey 101 exists because Russell believed enthusiasts want honesty in the glass, not marketing in the label.',
    legacy:
      'If you have tasted rye-forward bourbon with backbone, you have tasted Jimmy Russell\'s worldview. Lawrenceburg is a pilgrimage site because one man stayed long enough to connect every barrel to a story.',
    distinguishingFacts: [
      'One of the longest-tenured active distillers in American history',
      'Wild Turkey 101 proof was a deliberate Russell choice — not industry default',
      'Father Eddie Russell continues the lineage — rare multi-generational mastery',
      'Russell\'s Reserve was created to show Turkey spice without 101 heat',
    ],
    relatedBottleSlugs: ['wild-turkey-101', 'russells-reserve-10'],
  },
  {
    slug: 'elmer-t-lee',
    name: 'Elmer T. Lee',
    title: 'Master Distiller Emeritus, Buffalo Trace (created Blanton\'s)',
    producerSlugs: ['buffalo-trace'],
    era: '1949–2013',
    hook: 'He invented single-barrel bourbon as a category — and the horse stopper became a symbol of patience.',
    originStory:
      'Elmer T. Lee joined the George T. Stagg Distillery (now Buffalo Trace) after WWII engineering work. He rose through production during decades when bourbon was unfashionable — the "brown spirits slump" of the 1970s–80s. While competitors cut age and proof, Lee preserved aged stock nobody wanted to buy yet.',
    careerHighlights: [
      { year: '1984', event: 'Blanton\'s Single Barrel launches — first modern single-barrel bourbon.' },
      { year: '1980s', event: 'Develops the single-barrel program that later powers Eagle Rare, Weller prestige.' },
      { year: '2000s', event: 'Namesake E.H. Taylor line honors Bottled-in-Bond heritage he championed.' },
      { year: '2013', event: 'Passes at 93 — same year bourbon tourism peaks at Buffalo Trace.' },
    ],
    philosophy:
      'Lee believed bourbon drinkers would pay for transparency — which barrel, which warehouse, which proof — if you gave them flavor worth the story. He treated single-barrel selection as curation, not gimmick.',
    legacy:
      'Every store pick, every "barrel #7" conversation, every allocated single-barrel hunt traces to Lee\'s Blanton\'s bet. Weller\'s prestige also sits on stock Lee helped steward.',
    distinguishingFacts: [
      'Created Blanton\'s — the first commercially marketed single-barrel bourbon',
      'Engineering background — approached aging as systems problem, not romance',
      'Buffalo Trace visitor culture expanded under his later-career advocacy',
      'E.H. Taylor line preserves his Bottled-in-Bond evangelism',
    ],
    relatedBottleSlugs: ['buffalo-trace', 'eagle-rare', 'weller-special-reserve'],
  },
  {
    slug: 'brent-elliott',
    name: 'Brent Elliott',
    title: 'Master Distiller, Four Roses',
    producerSlugs: ['four-roses'],
    era: '2015–present',
    hook: 'Ten recipes, two mash bills, one yeast library — he runs bourbon like a laboratory with soul.',
    originStory:
      'Brent Elliott represents the modern scientific master distiller: chemistry background, deep yeast knowledge, and respect for Four Roses\' unique split mash-bill system. Four Roses was nearly a blended-only export brand before Lawrenceburg investment restored distillery identity. Elliott inherited a system where OBSV vs OESK is not marketing — it is biology.',
    careerHighlights: [
      { year: '2015', event: 'Named Master Distiller — fifth in Four Roses history.' },
      { year: '2018', event: 'Expands single-barrel and private selection programs nationally.' },
      { year: '2020s', event: 'Champions yeast strain education — OBSV/OESK comparisons become enthusiast ritual.' },
    ],
    philosophy:
      'Elliott teaches that mash bill is only half the recipe — yeast determines fruit, spice, and finish. Four Roses exists to prove that "bourbon" is not one flavor but a matrix of deliberate choices.',
    legacy:
      'If Buffalo Trace is warehouse mythology, Four Roses is recipe literacy. Elliott made yeast strains conversation starters for a generation of new enthusiasts.',
    distinguishingFacts: [
      'Four Roses uses five yeast strains × two mash bills = ten distinct recipes',
      'OBSV and OESK are the gateway pair for understanding yeast impact',
      'Lawrenceburg distillery restored US identity after Seagram export era',
      'Single-barrel program lets stores pick specific recipes — not just barrels',
    ],
    relatedBottleSlugs: ['four-roses-yellow', 'four-roses-single-barrel', 'bulleit-bourbon'],
  },
  {
    slug: 'bill-samuels-sr',
    name: 'Bill Samuels Sr.',
    title: 'Founder, Maker\'s Mark',
    producerSlugs: ['makers-mark'],
    era: '1953–1990s',
    hook: 'He burned the family recipe and rejected rye — the red wax seal is a promise of softness.',
    originStory:
      'Bill Samuels Sr. came from a distilling family (T.W. Samuels) but rejected the hot, rye-forward bourbon of his era. In 1953 he purchased the Burks Spring Distillery in Loretto, Kentucky and formulated a wheated mash bill — trading rye spice for wheat softness. Legend says he burned the old family recipe. Whether literal or symbolic, the act defined Maker\'s identity: we are not trying to taste like everyone else.',
    careerHighlights: [
      { year: '1953', event: 'Purchases Loretto distillery; develops wheated Maker\'s Mark formula.' },
      { year: '1958', event: 'First bottles — hand-dipped red wax becomes instant shelf icon.' },
      { year: '1980s', event: 'Maker\'s becomes the "gateway bourbon" for non-whiskey drinkers.' },
      { year: '1990s', event: 'Family transitions; brand survives acquisition waves intact.' },
    ],
    philosophy:
      'Samuels optimized for approachability without apologizing for proof. Maker\'s at 90 proof, wheated, and polished was a deliberate contrast to 101 rye bombs — hospitality in a bottle.',
    legacy:
      'Wheated bourbon as a category owes its mainstream identity to Samuels. Pappy, Weller hype, and Larceny comparisons all sit on the path he cleared.',
    distinguishingFacts: [
      'Rejected high-rye family tradition — rare founder pivot in Kentucky',
      'Red wax dipping was manual labor branding before craft was a word',
      'Never added age statements — focused on flavor consistency over numbers',
      'Loretto campus still tours — one of the most photographed distilleries',
    ],
    relatedBottleSlugs: ['makers-mark', 'larceny'],
  },
  {
    slug: 'fred-noe',
    name: 'Fred Noe',
    title: 'Master Distiller, Jim Beam (8th generation Beam)',
    producerSlugs: ['jim-beam'],
    era: '2007–present',
    hook: 'Eight generations of Beam — he carries America\'s best-selling bourbon lineage.',
    originStory:
      'Fred Noe is the great-grandson of Jim Beam himself. While craft distilleries chase novelty, Noe stewards the world\'s highest-volume bourbon brand — learning that consistency at scale is its own mastery. Booker Noe (his father) created Booker\'s barrel-proof line; Fred expanded small batch culture while keeping white label Beam honest.',
    careerHighlights: [
      { year: '2007', event: 'Named Master Distiller — eighth generation Beam family.' },
      { year: '2010s', event: 'Expands Little Book experimental line with Freddie Noe.' },
      { year: '2020s', event: 'Knob Creek and Booker\'s remain proof that Beam can play premium.' },
    ],
    philosophy:
      'Noe argues bourbon democracy matters — millions of people learn flavor on Jim Beam before they hunt allocated bottles. Scale is not the enemy of craft; indifference is.',
    legacy:
      'If Russell is Turkey character and Lee is single-barrel invention, Noe is bourbon as American default — the bottle on every back bar that funds everything else.',
    distinguishingFacts: [
      'Jim Beam is the world\'s best-selling bourbon — Noe stewards that responsibility',
      'Booker\'s line invented by his father — family barrel-proof tradition',
      'Clermont campus produces Knob Creek, Basil Hayden, and Booker\'s under one roof',
      '8th generation — rare continuity in corporate bourbon era',
    ],
    relatedBottleSlugs: ['knob-creek-9', 'bookers'],
  },
  {
    slug: 'parker-beam',
    name: 'Parker Beam',
    title: 'Master Distiller Emeritus, Heaven Hill (created Elijah Craig small batch era)',
    producerSlugs: ['heaven-hill'],
    era: '1960–2014',
    hook: 'Heaven Hill survived fire, flood, and consolidation — Parker Beam kept the stock alive.',
    originStory:
      'Parker Beam (cousin to the Beam family but at Heaven Hill) joined in 1960 and became the face of a distillery that refused to die. When the 1996 Bardstown fire destroyed Heaven Hill\'s original plant, the company rebuilt rather than sell. Parker stewarded millions of aging barrels through bankruptcy scares and industry consolidation — Evan Williams became the value king because Parker kept juice flowing.',
    careerHighlights: [
      { year: '1960', event: 'Joins Heaven Hill — production through bourbon\'s darkest decades.' },
      { year: '1996', event: 'Survives catastrophic Bardstown distillery fire; production relocates.' },
      { year: '2000s', event: 'Elijah Craig and Larceny expand wheated/high-value portfolio.' },
      { year: '2014', event: 'Passes after ALS battle — Heaven Hill honors with Parker\'s Heritage releases.' },
    ],
    philosophy:
      'Heaven Hill\'s model is inventory patience — hold barrels others sold, release when ready. Parker embodied the independent survivor mentality in an era of mega-mergers.',
    legacy:
      'Every $18 Evan Williams bottle carries Heaven Hill\'s survival story. Parker proved independent ownership could outlast conglomerate scale if you kept filling rickhouses.',
    distinguishingFacts: [
      'Heaven Hill is largest family-owned spirits producer in America',
      '1996 fire could have ended the company — rebuilt instead',
      'Evan Williams Black is the #2 selling bourbon in the US by volume',
      'Larceny wheated line competes directly with Maker\'s at lower price',
    ],
    relatedBottleSlugs: ['evan-williams-black', 'larceny'],
  },
  {
    slug: 'chris-morris',
    name: 'Chris Morris',
    title: 'Master Distiller, Woodford Reserve / Brown-Forman',
    producerSlugs: ['woodford-reserve'],
    era: '1990s–present',
    hook: 'He turned a National Historic Landmark into bourbon\'s most polished step-up bottle.',
    originStory:
      'Chris Morris leads Brown-Forman\'s Woodford Reserve — distilled in copper pot stills at the Labrot & Graham Distillery in Versailles, Kentucky. The site dates to 1812; Morris\'s work restored premium credibility to a facility that had been mothballed. Woodford became the "gift bottle" that taught millions what triple-distillation and pot still texture feel like.',
    careerHighlights: [
      { year: '1996', event: 'Woodford Reserve brand relaunch at historic Versailles site.' },
      { year: '2000s', event: 'Master\'s Collection experiments — brandy cask, honey barrel, etc.' },
      { year: '2010s', event: 'Distillery Series doubles down on finishing education.' },
    ],
    philosophy:
      'Morris treats Woodford as bourbon\'s finishing school — texture, balance, and presentation matter as much as mash bill. The pot still is not gimmick; it is mouthfeel engineering.',
    legacy:
      'Woodford Reserve is the bottle people buy when they want to look like they know bourbon — Morris made that work by ensuring the liquid matches the packaging.',
    distinguishingFacts: [
      'One of few major bourbons using pot still distillation',
      'Versailles campus is National Historic Landmark — tourism + production combined',
      'Brown-Forman owns own cooperage — vertical integration rare at this scale',
      'Distillery Series teaches finishing without leaving the brand ecosystem',
    ],
    relatedBottleSlugs: ['woodford-reserve'],
  },
  {
    slug: 'campbell-brown',
    name: 'Campbell Brown',
    title: 'President, Old Forester / Brown-Forman Heritage',
    producerSlugs: ['old-forester'],
    era: '2010s–present',
    hook: 'Old Forester was America\'s first bottled bourbon — Brown brought the origin story back to life.',
    originStory:
      'Campbell Brown represents the Brown-Forman family\'s direct stake in bourbon history. Old Forester claims continuous production and first bottled-in-bond marketing under George Garvin Brown. Campbell\'s leadership restored Louisville Whiskey Row campus, launched the Whiskey Row series, and made 1920 Prohibition Style and Birthday Bourbon annual events — turning heritage from footnote to plot.',
    careerHighlights: [
      { year: '2010s', event: 'Louisville Whiskey Row distillery opens — urban bourbon tourism pioneer.' },
      { year: '2018', event: 'Old Forester 1920 Prohibition Style becomes enthusiast favorite.' },
      { year: '2020s', event: 'Birthday Bourbon annual release drives collector calendar.' },
    ],
    philosophy:
      'Brown treats Old Forester as living history — every release should teach a chapter (Prohibition, BiB law, barrel proof evolution) while tasting excellent.',
    legacy:
      'Old Forester 1920 and Birthday Bourbon prove heritage brands can innovate without abandoning identity — urban distillery tourism model copied across Kentucky.',
    distinguishingFacts: [
      'Old Forester — first bourbon sold exclusively in sealed bottles (1870)',
      'Whiskey Row campus in downtown Louisville — not rural pilgrimage only',
      "1920 line at 115 proof teaches barrel proof without Booker's chaos",
      'Brown-Forman family still involved — not pure conglomerate anonymity',
    ],
    relatedBottleSlugs: ['old-forester-86', 'old-forester-1920'],
  },
];

export function getBourbonPerson(slug: string): BourbonPerson | undefined {
  return BOURBON_PEOPLE.find((p) => p.slug === slug);
}

export function listBourbonPeople(): BourbonPerson[] {
  return BOURBON_PEOPLE;
}

export function peopleForProducer(producerSlug: string): BourbonPerson[] {
  return BOURBON_PEOPLE.filter((p) => p.producerSlugs.includes(producerSlug));
}
