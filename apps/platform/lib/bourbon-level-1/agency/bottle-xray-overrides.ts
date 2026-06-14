/** Per-bottle X-Ray overrides — entry proof, warehouse, analyst notes */

export type BottleXRayOverride = {
  entryProof?: string;
  warehouse?: string;
  analystTake?: string;
  extraFlavor?: { note: string; from: string }[];
};

export const BOTTLE_XRAY_OVERRIDES: Record<string, BottleXRayOverride> = {
  'evan-williams-black': {
    entryProof: '~125 proof barrel entry — standard Heaven Hill sour mash protocol',
    warehouse: 'Heaven Hill Bardstown rickhouses — mid-floor aging typical for NAS daily line',
    analystTake: 'The textbook under-$20 pour. Evan Black teaches that bourbon flavor does not require age statements or hype — compare to Old Forester 86 same night.',
  },
  'old-forester-86': {
    entryProof: '~125 proof — Brown-Forman house entry, banana esters from yeast',
    warehouse: 'Louisville distillation, off-site Kentucky rickhouses — urban still, rural aging',
    analystTake: 'Banana bread on the nose is Old Forester DNA — the 86 proof line is your wheated-adjacent intro before 1920 heat.',
  },
  'wild-turkey-101': {
    entryProof: '~115 proof entry — Wild Turkey lower entry vs industry max preserves body',
    warehouse: 'Lawrenceburg rickhouses — upper floors drive pepper and dark fruit intensity',
    analystTake: '101 is the enthusiast\'s value king. High proof carries rye spice without Booker\'s wallet — blind it against allocated bottles and watch it win.',
  },
  'makers-mark': {
    entryProof: '~125 proof — wheated mash, no rye in flavor grain slot',
    warehouse: 'Rotating barrel program between floors — engineered consistency vs single-floor picks',
    analystTake: 'Crowd-pleaser by design. Wheat replaces rye — compare to Larceny and Weller to taste the wheated family tree without lottery pricing.',
  },
  'four-roses-yellow': {
    entryProof: '~120 proof — blended OBSV/OESO-style recipes at lower proof exit',
    warehouse: 'Cox\'s Creek warehouses — multiple recipes blended for Yellow Label consistency',
    analystTake: 'Gateway to Four Roses system — gentle 80 proof masks the ten-recipe complexity underneath. Step up to Single Barrel when ready for barrel lottery.',
  },
  'buffalo-trace': {
    entryProof: '~125 proof Mash Bill #1 — low rye Buffalo Trace house profile',
    warehouse: 'Frankfort campus rickhouses — experimental warehouses feed future picks',
    analystTake: 'Vanilla-caramel bourbon platonic ideal. NAS but consistent — the bottle that teaches "house style" before you chase Eagle Rare.',
  },
  'woodford-reserve': {
    entryProof: '~125 proof — pot still component adds weight before barreling',
    warehouse: 'Heat-cycled Versailles warehouses — accelerated extraction vs passive rickhouses',
    analystTake: 'Premium positioning earned through pot still texture and heat cycling — giftable without being inaccessible.',
  },
  'knob-creek-9': {
    entryProof: '~125 proof Jim Beam traditional mash — age statement at 100 proof',
    warehouse: 'Clermont and Booker Noe rickhouses — 9 years mid-floor typical',
    analystTake: 'Age + proof in one bottle. Knob Creek 9 teaches what years do to Beam family mash without Booker\'s heat tax.',
  },
  'bulleit-bourbon': {
    entryProof: '~120 proof — Four Roses sourced high-rye profile (DSP varies by batch)',
    warehouse: 'Aged at sourcing distillery — bottled by Bulleit/Diageo chain',
    analystTake: 'High-rye bourbon, not rye whiskey — pair with Bulleit Rye for category homework on the same brand.',
  },
  'larceny': {
    entryProof: '~125 proof wheated Heaven Hill mash — Weller family tree',
    warehouse: 'Heaven Hill Bardstown — wheated barrels often mid-rick for balance',
    analystTake: 'Weller substitute at sane prices when you can find it. Side-by-side with Maker\'s is mandatory wheated education.',
  },
  '1792-small-batch': {
    entryProof: '~125 proof Barton high-rye — punchy entry for value tier',
    warehouse: 'Barton 1792 Bardstown rickhouses — often overlooked single barrel source',
    analystTake: 'Spice bomb for the price. 1792 rewards high-rye fans who ignore the bottom shelf prejudice.',
  },
  'eagle-rare': {
    entryProof: '~125 proof Mash Bill #1 — same family as Buffalo Trace, 10 years stated',
    warehouse: 'Frankfort rickhouses — allocation pressure, not production rarity',
    analystTake: 'Ten years in oak at 90 proof — elegance over heat. Price variance is allocation theater; the pour at MSRP is fair education in age.',
  },
  'four-roses-single-barrel': {
    entryProof: '~120 proof — single OBSV/OESK-style recipe per barrel',
    warehouse: 'Single barrel, single floor, single season — variation is the product',
    analystTake: 'Every bottle can differ. NCF option adds mouthfeel — store picks from Cox\'s Creek are the enthusiast lottery worth learning.',
  },
  'old-forester-1920': {
    entryProof: '~125 proof — Prohibition Style at 115 proof exit, minimal watering',
    warehouse: 'Off-site Kentucky aging — selected barrels for 1920 line intensity',
    analystTake: 'Barrel-proof discipline without full cask strength chaos. Chocolate-cherry heat — add water and watch it open.',
  },
  'russells-reserve-10': {
    entryProof: '~115 proof Wild Turkey entry — 10 years mellows 101 spice',
    warehouse: 'Lawrenceburg rickhouses — Jimmy Eddie Russell barrel selection',
    analystTake: 'Turkey character refined. When Eagle Rare is marked up, Russell\'s 10 is the age-statement substitute homework.',
  },
  'michters-us1': {
    entryProof: '~103 proof entry — Michter\'s barrels often entered lower for texture',
    warehouse: 'Louisville — chill filtration common on US*1 line',
    analystTake: 'Silky mouthfeel is the pitch — compare to NCF craft BiB to taste filtration choices, not just mash bills.',
  },
  'new-riff-bourbon': {
    entryProof: '100 proof BiB — entered at ≤125, bottled at exactly 100',
    warehouse: 'Newport campus rickhouse — grain-to-glass, single DSP story',
    analystTake: 'Modern craft reference bottle. NCF BiB high-rye — the bottle that teaches transparency vs sourced NDP brands.',
  },
  'wilderness-trail-bib': {
    entryProof: '100 proof BiB — sweet mash wheated, entry ≤125',
    warehouse: 'Danville on-site rickhouse — science-forward craft aging',
    analystTake: 'Wheated craft BiB — compare to Maker\'s and Larceny with age and proof locked via bond rules.',
  },
  'willett-pot-still': {
    entryProof: '~120 proof wheated — Willett family mash, sourced vs distilled batches vary',
    warehouse: 'Bardstown campus — iconic pot still decanter, heritage revival site',
    analystTake: 'Soft wheated craft with Bardstown romance — read DSP on your bottle; Willett history includes sourced eras.',
  },
  'peerless-bourbon': {
    entryProof: '107 proof exit — sweet mash, bottled-in-bond discipline',
    warehouse: 'Louisville vertical campus — grain to glass, no sour mash backset',
    analystTake: 'Dark fruit and molasses from sweet mash — Louisville craft that earns its splurge tier with BiB transparency.',
  },
  'rabbit-hole-cavehill': {
    entryProof: '~125 proof four-grain — honey malt and rye spice in mash',
    warehouse: 'Louisville Rabbit Hole campus — Pernod Ricard scale craft',
    analystTake: 'Four-grain literacy — not bourbon-by-numbers but labeled honestly. Modern mash bill education in one pour.',
  },
  'bardstown-bourbon': {
    entryProof: '~125 proof — collaboration distillery baseline straight bourbon',
    warehouse: 'Bardstown campus — fusion finishes live alongside this entry',
    analystTake: 'Gateway to Bardstown fusion line — know this straight profile before chasing cask finishes.',
  },
  'castle-key-bourbon': {
    entryProof: '~125 proof — Frankfort revival, gentle floral new make',
    warehouse: 'Historic Old Taylor site rickhouses — tour-worthy campus',
    analystTake: 'Floral gentle craft without barrel-proof intimidation — ideal craft intro before Wilderness Trail BiB heat.',
  },
  'bookers': {
    entryProof: 'Barrel proof varies batch — often 125–130+ uncut from barrel',
    warehouse: 'Booker Noe rickhouse selections — uncut philosophy, batch variation expected',
    analystTake: 'Heat as feature. Add water, teach someone why barrel proof exists — not for shot-taking, for flavor density.',
  },
  'weller-special-reserve': {
    entryProof: '~114 proof wheated — Buffalo Trace wheated mash, NAS',
    warehouse: 'Frankfort — same campus as Pappy line, allocation not production limit',
    analystTake: 'Pappy\'s approachable cousin when MSRP is real. Hunt tax often exceeds juice value — Larceny blind homework first.',
  },
  'rhetoric-24': {
    entryProof: 'Unknown orphan barrel — Orphan Barrel program, sourced aged stock',
    warehouse: 'Aged off-site before Orphan Barrel selection — NDP luxury tier',
    analystTake: 'Deep oak lesson in over-aging risk — compare to Eagle Rare 10 and Russell\'s 10 before paying for age alone.',
  },
  'rittenhouse-rye': {
    entryProof: '100 proof BiB — ≥51% rye, Heaven Hill rye mash bond rules',
    warehouse: 'Heaven Hill Bardstown — rye barrels often high-rick for spice integration',
    analystTake: 'The Manhattan backbone. True rye whiskey at BiB value — compare to WT101 and taste the legal category line.',
  },
  'wild-turkey-rye': {
    entryProof: '~115 proof rye mash — same campus as 101, different grain majority',
    warehouse: 'Lawrenceburg — rye line shares rickhouses with bourbon',
    analystTake: 'Turkey rye at 81 proof is gentle intro — pair with 101 for same-house bourbon vs rye category contrast.',
  },
  'old-overholt-bib': {
    entryProof: '100 proof BiB — Beam Overholt rye heritage, bond age minimum',
    warehouse: 'Clermont production chain — America\'s oldest rye brand, modern Beam scale',
    analystTake: 'Under-$25 rye whiskey with bond transparency — cocktail and sip baseline without bourbon category confusion.',
  },
  'bulleit-rye': {
    entryProof: '~120 proof sourced rye — high rye mash, Diageo bottling chain',
    warehouse: 'Sourced aging — compare DSP on label to Bulleit bourbon sourced story',
    analystTake: 'Pepper-forward rye for hosts — Bulleit Bourbon vs Bulleit Rye is the fastest category lesson on one shelf.',
  },
  'jack-daniels-old-no-7': {
    entryProof: '~125 proof before charcoal mellowing — Lincoln County Process pre-barrel',
    warehouse: 'Lynchburg barrel houses — charcoal mellowing defines Tennessee category',
    analystTake: 'Not bourbon label, bourbon-class mash. Charcoal step softens entry — compare to Buffalo Trace 80 proof for process literacy.',
  },
  'george-dickel-no-8': {
    entryProof: '~125 proof — chill charcoal mellowing Cascade Hollow protocol',
    warehouse: 'Tullahoma barrel warehouses — Diageo Tennessee value anchor',
    analystTake: 'Jack\'s quiet rival at value pricing — pour both Tennessee bottles blind before picking a camp.',
  },
  'evan-williams-bib': {
    entryProof: '100 proof BiB — Heaven Hill white label bond line',
    warehouse: 'Heaven Hill Bardstown — same campus as Evan Black, bond age floor',
    analystTake: 'Best BiB value in America — compare to Evan Black same night for proof and age transparency.',
  },
  'elijah-craig-small-batch': {
    entryProof: '~125 proof — charred barrel namesake line',
    warehouse: 'Heaven Hill off-site rickhouses — NAS small batch selection',
    analystTake: 'Oak and baking spice step-up — bridges Evan Black to Eagle Rare on the same house ladder.',
  },
  'jim-beam-black': {
    entryProof: '~125 proof — extra-aged Beam traditional mash',
    warehouse: 'Clermont rickhouses — longer aging than white label',
    analystTake: 'Beam family age lesson under $25 — compare to Knob Creek 9 for years vs proof.',
  },
  'makers-mark-46': {
    entryProof: '~125 proof — seared French oak staves in barrel',
    warehouse: 'Rotating barrel program — wood treatment post-primary aging',
    analystTake: 'Finish via staves, not second barrel — compare to standard Maker\'s and Woodford Double Oaked.',
  },
  'four-roses-small-batch': {
    entryProof: '~120 proof — blend of four recipes',
    warehouse: 'Cox\'s Creek — recipe blending for consistency',
    analystTake: 'Bridges Yellow Label to Single Barrel — blending literacy before barrel lottery.',
  },
  'old-forester-100': {
    entryProof: '~125 proof — 100 proof Forester line',
    warehouse: 'Louisville distillation, Kentucky aging — banana ester house DNA',
    analystTake: 'Proof ladder on one mash — pour 86, 100, and 1920 in one session when budget allows.',
  },
  'woodford-double-oaked': {
    entryProof: '~125 proof — second new char oak barrel finish',
    warehouse: 'Heat-cycled Versailles — finish accelerates dark chocolate notes',
    analystTake: 'Major-house finish reference — dessert bourbon without leaving Brown-Forman campus.',
  },
  'rare-breed': {
    entryProof: 'Barrel proof ~116.8 — Wild Turkey uncut batch blend',
    warehouse: 'Lawrenceburg upper floors — rye spice at full intensity',
    analystTake: '101\'s big sibling — blind against 1792 Full Proof for high-rye barrel proof value.',
  },
  '1792-bib': {
    entryProof: '100 proof BiB — Barton high-rye bond line',
    warehouse: 'Barton 1792 Bardstown — often overlooked pick source',
    analystTake: 'BiB step between Small Batch and Full Proof — spice locked at 100 proof.',
  },
  '1792-full-proof': {
    entryProof: '125 proof barrel exit — Barton uncut selection',
    warehouse: 'Barton campus — caramel and fire without BT allocation',
    analystTake: 'High proof value king — compare to Rare Breed and OF1920 on one night.',
  },
  'eh-taylor-small-batch': {
    entryProof: '100 proof BiB — Buffalo Trace mash bill #1',
    warehouse: 'Frankfort — collector tier with bond transparency',
    analystTake: 'BiB at BT campus — gateway before Single Barrel store picks and Eagle Rare hunt.',
  },
  'new-riff-single-barrel': {
    entryProof: 'Varies ~108 — single barrel craft picks',
    warehouse: 'Newport campus — grain-to-glass, one barrel personality',
    analystTake: 'After BiB baseline — variation is the product; read store pick details.',
  },
  'bardstown-fusion-wheated': {
    entryProof: '~125 proof — finished wheated fusion line',
    warehouse: 'Bardstown collaboration campus — cask finish program',
    analystTake: 'Fusion after straight Bardstown — compare to Angel\'s Envy port finish same night.',
  },
  'angels-envy-bourbon': {
    entryProof: '~125 proof base — port cask finish post-primary aging',
    warehouse: 'Louisville finish house — ruby port barrels',
    analystTake: 'Port finish craft gateway — raisin and vanilla dessert pour vs straight bourbon.',
  },
  'log-still-diving-bell': {
    entryProof: '107 proof — Nelson County wheated craft',
    warehouse: 'Gethsemane on-site rickhouses — Dant family revival',
    analystTake: 'Wheated craft triangle with Wilderness Trail BiB and Willett — blind rank three.',
  },
  'jeptha-creed-bloody-butcher': {
    entryProof: '~125 proof — heirloom Bloody Butcher corn mash',
    warehouse: 'Shelbyville farm distillery — estate grain',
    analystTake: 'Grain variety literacy — blind against Buffalo Trace for corn story vs taste.',
  },
  'green-river-kentucky-straight': {
    entryProof: '~125 proof — Owensboro revival mash',
    warehouse: 'Green River campus — value craft daily line',
    analystTake: 'Under-$40 craft daily — heritage name, modern juice; compare to Evan Black.',
  },
  'blue-run-8-year': {
    entryProof: '109 proof — 8 year stated craft stocks',
    warehouse: 'Georgetown — NCF emphasis, high-rye leaning mash',
    analystTake: 'Splurge craft homework — blind against Eagle Rare 10 before paying $85+.',
  },
  'new-riff-rye': {
    entryProof: '100 proof BiB rye — same campus as New Riff bourbon',
    warehouse: 'Newport — NCF craft rye',
    analystTake: 'Category switch on one DSP — rye vs bourbon legal line from same still philosophy.',
  },
  'wilderness-trail-rye': {
    entryProof: '100 proof BiB rye — sweet mash craft',
    warehouse: 'Danville campus — science-forward rye program',
    analystTake: 'Pair with WT wheated BiB bourbon — same house, category contrast.',
  },
  'michters-rye': {
    entryProof: '~103 proof entry — Michter\'s rye line, chill filtered',
    warehouse: 'Louisville — silky craft rye vs punchy BiB ryes',
    analystTake: 'Softer rye mouthfeel — compare to Rittenhouse BiB same cocktail night.',
  },
  'rabbit-hole-boxergrail': {
    entryProof: '~125 proof — 100% malted rye mash',
    warehouse: 'Louisville Rabbit Hole — malted rye craft',
    analystTake: 'Rye extension after Cavehill — honey and pepper vs bourbon four-grain.',
  },
  'woodford-rye': {
    entryProof: '~125 proof — Woodford rye mash, 53% rye typical',
    warehouse: 'Versailles heat-cycled warehouses — polished major-house rye',
    analystTake: 'Woodford bourbon vs rye on same shelf — category literacy from flagship house.',
  },
};
