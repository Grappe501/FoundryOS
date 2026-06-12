import type { ProducerDepthOverlay } from './types';

export const PRODUCER_DEPTH: Record<string, ProducerDepthOverlay> = {
  'buffalo-trace': {
    slug: 'buffalo-trace',
    foundingStory:
      'George T. Stagg built a distilling empire on the Kentucky River in the 19th century. The modern Buffalo Trace name arrived in 1999, but the site never stopped producing — through Prohibition (medicinal permits), through the bourbon crash of the 1970s, through fire and flood. Sazerac\'s bet was simple: keep filling rickhouses when rivals sold stock.',
    survivalStory:
      'When bourbon was unfashionable, Buffalo Trace kept aging barrels nobody wanted to buy. That inventory became Weller, Eagle Rare, and the Stagg line when the 2000s boom hit. Survival was patience — not pivoting to vodka, not cutting age, not selling the campus.',
    distinguishingFacts: [
      'Single campus produces dozens of brands — shared stock culture',
      'DSP-KY-113 — among America\'s most visited distillery destinations',
      'Colonel E.H. Taylor line revives Bottled-in-Bond as premium tier',
      'Allocation culture is a side effect of stock depth — not scarcity marketing alone',
      'Store pick program teaches barrel variation at national scale',
    ],
    pairings: [
      { occasion: 'First bourbon night with curious friends', why: 'Buffalo Trace — approachable, textbook vanilla-caramel.', serve: 'Neat in Glencairn after 5 min rest' },
      { occasion: 'Cool weather porch sip', why: 'Eagle Rare 10 — oak and dark fruit reward slow sipping.', serve: 'Neat or one large ice cube' },
      { occasion: 'Steak or dark chocolate dessert', why: 'E.H. Taylor Small Batch — BiB structure cuts richness.', serve: 'Neat, room temp' },
    ],
    whenBest: 'Weeknight pours and teaching moments — save Stagg and full-proof siblings for when your palate expects heat.',
    masterSlugs: ['elmer-t-lee'],
    competitorView:
      'Rivals respect the stock depth; critics argue allocation hype overshadows the excellent $25 bottle. Both can be true.',
  },
  'wild-turkey': {
    slug: 'wild-turkey',
    foundingStory:
      'Wild Turkey name comes from a 1940 hunting trip — executive Ripy family bourbon shared with friends became legend. Lawrenceburg production consolidated under Austin Nichols, then Campari Group. The brand was built on bold flavor when America wanted mild.',
    survivalStory:
      'Jimmy Russell stayed through every industry cycle — when bourbon sales collapsed, Russell kept proof at 101 when others watered down. Wild Turkey almost became a commodity; Russell refused.',
    distinguishingFacts: [
      'Wild Turkey 101 is deliberately over-standard proof — a Russell signature',
      'High-rye mash bill vs wheated trend — spice is the house identity',
      'Russell\'s Reserve shows the same house without 101 punch',
      'Rare Breed and Master\'s Keep prove premium without abandoning character',
      'Father-son Russell duo — longest active distiller lineage',
    ],
    pairings: [
      { occasion: 'Bold cocktail base', why: '101 stands up to bitters and vermouth — Manhattan backbone.', serve: 'Stirred, rye-forward recipes' },
      { occasion: 'Post-dinner contemplative pour', why: 'Russell\'s Reserve 10 — spice mellowed by decade.', serve: 'Neat' },
      { occasion: 'BBQ and charred meats', why: '101 rye cuts fat — pepper meets smoke.', serve: 'Neat or splash of water' },
    ],
    whenBest: 'When you want honesty — Turkey does not apologize for proof or rye.',
    masterSlugs: ['jimmy-russell'],
    competitorView: 'Some find Turkey "hot" — that is the design. Compare to wheated rivals on purpose.',
  },
  'four-roses': {
    slug: 'four-roses',
    foundingStory:
      'Four Roses began as Paul Jones Jr.\'s Atlanta brand, named for a romantic legend. Seagram era nearly reduced it to blended export-only. Kirin restoration of Lawrenceburg distillery reclaimed American identity — ten recipes became the story.',
    survivalStory:
      'The distillery was mothballed during bourbon\'s dark years. Kirin\'s investment rebuilt US single-barrel culture from a brand many Americans forgot existed.',
    distinguishingFacts: [
      'Ten distinct recipes — two mash bills × five yeast strains',
      'OBSV vs OESK is the enthusiast gateway pair',
      'Yellow Label is gentle entry; Single Barrel is personality lottery',
      'Private store picks often specify recipe code on label',
      'High-rye fruit without Turkey-level heat',
    ],
    pairings: [
      { occasion: 'Spring afternoon tasting', why: 'Yellow Label — floral, gentle, low proof.', serve: 'Neat, warm day' },
      { occasion: 'Blind tasting education', why: 'Single Barrel — teaches barrel variation.', serve: 'Side-by-side two bottles if possible' },
      { occasion: 'Floral dessert pairing', why: 'High-rye fruit complements berry tarts.', serve: 'Small pour neat' },
    ],
    whenBest: 'When you want to learn recipe literacy — Four Roses rewards curiosity about yeast.',
    masterSlugs: ['brent-elliott'],
    competitorView: 'Buffalo Trace fans call Four Roses "technical" — enthusiasts call it transparent.',
  },
  'makers-mark': {
    slug: 'makers-mark',
    foundingStory:
      'Bill Samuels Sr. purchased Loretto distillery in 1953 and rejected his family\'s rye-heavy recipe. Wheated mash bill + red wax + 90 proof = hospitality bourbon before "smooth" was a marketing cliché.',
    survivalStory:
      'Survived acquisition by Beam Suntory without losing hand-dipped identity. Loretto still hand-dips — labor cost competitors cut decades ago.',
    distinguishingFacts: [
      'No age statement — consistency over numbers since 1958',
      'Wheated mash — wheat replaces rye for soft finish',
      'Red wax was manual branding before craft aesthetics existed',
      'Cask strength and private select expand line without losing core',
      'Most common "gateway bourbon" for non-whiskey drinkers',
    ],
    pairings: [
      { occasion: 'Hosting non-bourbon friends', why: 'Core Maker\'s — wheat softness converts skeptics.', serve: 'Neat or highball with large cube' },
      { occasion: 'Charcuterie and soft cheese', why: 'Wheat complements salt without fighting it.', serve: 'Room temp pour' },
      { occasion: 'Summer porch', why: '90 proof wheated — less heat in humidity.', serve: 'Over one large ice cube' },
    ],
    whenBest: 'Social settings where you want inclusion over intimidation.',
    masterSlugs: ['bill-samuels-sr'],
    competitorView: 'Purists call it "sweet" — hosts call it "empty bottle at end of night."',
  },
  'heaven-hill': {
    slug: 'heaven-hill',
    foundingStory:
      'Heaven Hill founded 1935 by Shapira family — five brothers who bet on Bardstown when others fled. Independent ownership continues today — rare at this volume.',
    survivalStory:
      '1996 fire destroyed original distillery. Company rebuilt, relocated production, and kept aging stock — bankruptcy vultures circled; family held.',
    distinguishingFacts: [
      'Largest family-owned spirits producer in America',
      'Evan Williams Black — textbook under-$20 daily pour',
      'Larceny wheated line — Weller alternative when allocated',
      'Elijah Craig invented "barrel proof" marketing language',
      'Bardstown Bourbon Heritage Center — tourism anchor',
    ],
    pairings: [
      { occasion: 'House pour / cocktails', why: 'Evan Williams — quality vs price unbeatable.', serve: 'Highball or Old Fashioned' },
      { occasion: 'Wheated comparison night', why: 'Larceny vs Maker\'s — blind wheat education.', serve: 'Neat side-by-side' },
      { occasion: 'Budget blind tasting party', why: 'EW Black surprises people who snub price.', serve: 'Blind pour #1' },
    ],
    whenBest: 'Daily drinkers and value hunters — Heaven Hill rewards pragmatists.',
    masterSlugs: ['parker-beam'],
    competitorView: 'Premium hunters overlook Evan Williams — enthusiasts keep it as secret weapon.',
  },
  'jim-beam': {
    slug: 'jim-beam',
    foundingStory:
      'Jacob Beam sold first barrels in 1795 — eight generations later, Fred Noe stewards the world\'s best-selling bourbon. Clermont, Kentucky is bourbon democracy at industrial scale.',
    survivalStory:
      'Beam survived Prohibition, globalization, and craft rebellion by owning the entry point — millions learn bourbon here first.',
    distinguishingFacts: [
      'World\'s best-selling bourbon brand',
      'Booker\'s invented by Booker Noe — family barrel-proof tradition',
      'Knob Creek proves Beam can age-statement with authority',
      'Little Book experimental line — generational innovation',
      '8th generation master distiller — Fred Noe',
    ],
    pairings: [
      { occasion: 'Classic Old Fashioned', why: 'White label Beam — cocktail workhorse.', serve: 'Muddled sugar, bitters, orange' },
      { occasion: 'Special occasion heat', why: 'Booker\'s — barrel proof with water optional.', serve: 'Neat + water dropper' },
      { occasion: 'Step-up daily', why: 'Knob Creek 9 — age + 100 proof structure.', serve: 'Neat' },
    ],
    whenBest: 'Cocktails and crowds — save Booker\'s for when you want a story with the heat.',
    masterSlugs: ['fred-noe'],
    competitorView: 'Craft fans dismiss Beam — every craft distiller learned on Jim Beam first.',
  },
  'old-forester': {
    slug: 'old-forester',
    foundingStory:
      'George Garvin Brown put bourbon in sealed bottles in 1870 — first brand sold only in glass, guaranteeing integrity from distillery to customer. Brown-Forman family still involved 150+ years later.',
    survivalStory:
      'Old Forester survived when bulk-barrel sales were norm — trust as business model. Whiskey Row restoration made urban Louisville distilling viable again.',
    distinguishingFacts: [
      'America\'s first bottled bourbon brand (1870)',
      'Whiskey Row — downtown Louisville production + tourism',
      '1920 Prohibition Style — 115 proof historical narrative',
      'Birthday Bourbon annual — collector calendar anchor',
      'Banana-forward profile — divisive, distinctive, memorable',
    ],
    pairings: [
      { occasion: 'History lesson pour', why: 'Old Forester 86 — banana bread and caramel heritage.', serve: 'Neat' },
      { occasion: 'Cold night by fire', why: '1920 line — heat and cherry depth.', serve: 'Neat, splash water optional' },
      { occasion: 'Bourbon education flight', why: 'Compare 86 vs 1920 — proof evolution.', serve: 'Side-by-side' },
    ],
    whenBest: 'When you want bourbon with a documentary attached — Old Forester always has a chapter.',
    masterSlugs: ['campbell-brown'],
    competitorView: 'Banana note polarizes — fans call it signature; skeptics call it fusel.',
  },
  'woodford-reserve': {
    slug: 'woodford-reserve',
    foundingStory:
      'Labrot & Graham Distillery in Versailles dates to 1812. Chris Morris relaunched Woodford Reserve in 1996 as premium pot-still bourbon — texture as luxury.',
    survivalStory:
      'Site was mothballed mid-century — Brown-Forman restoration bet that Americans would pay for mouthfeel, not just age statements.',
    distinguishingFacts: [
      'Copper pot still distillation — rare at major brand scale',
      'National Historic Landmark campus',
      'Distillery Series teaches finishing without leaving brand',
      'Double Oaked created mainstream "secondary barrel" category',
      'Gift bottle default — packaging matches liquid ambition',
    ],
    pairings: [
      { occasion: 'Anniversary gift', why: 'Core Woodford — polished, balanced, recognizable.', serve: 'Neat in nice glass' },
      { occasion: 'Dark chocolate', why: 'Oak and cocoa align — dessert pairing.', serve: 'Small neat pour' },
      { occasion: 'First "nice bottle" purchase', why: 'Step-up without intimidation.', serve: 'Neat' },
    ],
    whenBest: 'Celebrations and gift moments — Woodford is bourbon that dresses up.',
    masterSlugs: ['chris-morris'],
    competitorView: 'Value hunters find it pricey for 90 proof — gift givers find it perfect.',
  },
  'barton-1792': {
    slug: 'barton-1792',
    foundingStory:
      'Barton 1792 Distillery in Bardstown — name references Kentucky statehood year. Sazerac ownership connects to Buffalo Trace ecosystem while maintaining distinct high-rye profile.',
    survivalStory:
      '1792 Small Batch became the "overlooked value" bottle — rye spice and caramel at shelf price while hype chased allocation.',
    distinguishingFacts: [
      'High-rye mash — spice without Wild Turkey heat',
      '1792 Full Proof and Single Barrel expand premium tier',
      'Bardstown campus — separate pilgrimage from Frankfort',
      'Often sits next to Buffalo Trace on shelf — different house style',
      'Store picks increasingly available nationally',
    ],
    pairings: [
      { occasion: 'Value rye-spice fix', why: 'Small Batch — punch above price.', serve: 'Neat or Old Fashioned' },
      { occasion: 'Blind value tasting', why: 'Hides well against $45 bottles.', serve: 'Blind pour' },
    ],
    whenBest: 'When BT shelf is empty but you want Kentucky character.',
    masterSlugs: [],
    competitorView: 'Buffalo Trace fans pass it — blind tasters often pick it first.',
  },
  'michters': {
    slug: 'michters',
    foundingStory:
      'Michter\'s name dates to 1753 Pennsylvania — modern revival under Chatham Imports rebuilt Kentucky production for ultra-premium positioning. US*1 is flagship.',
    survivalStory:
      'Bankruptcy and name loss in 1980s — revival proves heritage brand can be resurrected with quality-first positioning.',
    distinguishingFacts: [
      'Chill-filtered vs non-chill — mouthfeel obsession',
      'US*1 targets silky texture over age statement',
      'Barrel strength releases — limited but respected',
      'Pennsylvania heritage, Kentucky production — dual story',
      'Premium pricing without BT-style allocation lines',
    ],
    pairings: [
      { occasion: 'Quiet solo pour', why: 'US*1 — texture-focused meditation.', serve: 'Neat, rested' },
      { occasion: 'Upscale dinner', why: 'Silky profile won\'t fight food.', serve: 'Small neat pour' },
    ],
    whenBest: 'When mouthfeel matters more than mash bill debate.',
    masterSlugs: [],
    competitorView: 'Age hunters want numbers — texture lovers want Michter\'s.',
  },
  'new-riff': {
    slug: 'new-riff',
    foundingStory:
      'New Riff Distillery launched 2014 in Newport, Kentucky — modern craft with high-rye mash, non-chill filtration, and transparency ethos. Built for enthusiasts, not entry-level only.',
    survivalStory:
      'Craft boom produced hundreds of distilleries — New Riff survived by prioritizing mature stock release over young juice hype.',
    distinguishingFacts: [
      'Non-chill filtered — fuller body, cloud at cold temps',
      '100 proof standard — enthusiast-first positioning',
      'Single barrel program — barrel picker culture',
      'Kentucky urban craft — not rural-only pilgrimage',
      'Balboa rye and bourbon — modern mash bill transparency',
    ],
    pairings: [
      { occasion: 'Craft comparison flight', why: 'New Riff vs legacy — youth vs heritage.', serve: 'Neat side-by-side' },
      { occasion: 'Rye-forward cocktail', why: 'High rye cuts through citrus.', serve: 'Sour or Manhattan' },
    ],
    whenBest: 'When you want modern Kentucky without legacy baggage.',
    masterSlugs: [],
    competitorView: 'Traditionalists want age — craft fans want transparency. New Riff splits the room.',
  },
};

export function getProducerDepth(slug: string): ProducerDepthOverlay | undefined {
  return PRODUCER_DEPTH[slug];
}
