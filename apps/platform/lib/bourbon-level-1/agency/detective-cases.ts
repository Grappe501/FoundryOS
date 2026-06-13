/** Bourbon Detective — investigation cases (agency, not curriculum) */

export type DetectiveCase = {
  slug: string;
  title: string;
  hook: string;
  difficulty: 'beginner' | 'enthusiast' | 'deep';
  clues: string[];
  investigation: { heading: string; body: string }[];
  verdict: string;
  rabbitHole?: { label: string; href: string };
  relatedCases: string[];
};

export const DETECTIVE_CASES: DetectiveCase[] = [
  {
    slug: 'eagle-rare-price',
    title: 'Why is Eagle Rare $40 in one state and $140 in another?',
    hook: 'Same bottle. Same proof. Wildly different shelf reality.',
    difficulty: 'beginner',
    clues: ['Check the label — same DSP?', 'Ask: is this MSRP or secondary?', 'Who controls distribution in your state?'],
    investigation: [
      { heading: 'MSRP vs street', body: 'Eagle Rare has an MSRP band around $35–45. In controlled states, you may see near-MSRP. In open markets with hype, stores mark up because demand exceeds allocation.' },
      { heading: 'Allocation math', body: 'Buffalo Trace allocates Eagle Rare by state and account tier. A rural store might get six bottles a month; a bourbon bar in NYC might get zero — and both end up on secondary forums.' },
      { heading: 'The psychology premium', body: 'Ten-year age statement + BT lineage = "I should grab this." Scarcity turns a $40 pour into a trophy. The liquid did not change — the context did.' },
    ],
    verdict: 'Price variance is almost never about quality. It is allocation, state law, store markup, and hype stacking on a genuinely good bottle.',
    rabbitHole: { label: 'Why bourbon costs what it costs', href: '/bourbon/economy' },
    relatedCases: ['weller-ghost', 'store-pick-magic'],
  },
  {
    slug: 'weller-ghost',
    title: 'Why can\'t I find Weller?',
    hook: 'Pappy\'s cousin is everywhere on Instagram, nowhere on your shelf.',
    difficulty: 'beginner',
    clues: ['Weller is wheated — same family tree as Van Winkle', 'Buffalo Trace produces it on the same campus', 'Allocation lists are real'],
    investigation: [
      { heading: 'Same house, different destiny', body: 'Weller Special Reserve shares DNA with the Van Winkle line — wheated mash, BT campus. It was once a shelf staple. Then Pappy mythology pulled every wheated bottle into the allocation orbit.' },
      { heading: 'The lottery economy', body: 'Many stores cannot sell Weller openly — lottery, loyalty programs, or back-room allocation. If you see it at MSRP, buy one and share a pour. If you see it at 3× MSRP, ask what you are actually paying for.' },
      { heading: 'The substitute move', body: 'Larceny, Maker\'s Mark, and even standard Buffalo Trace teach similar lessons without the hunt. Weller is great — but the hunt often teaches more about markets than mash bills.' },
    ],
    verdict: 'You cannot find Weller because demand outran supply by an order of magnitude — not because it is impossible to make.',
    rabbitHole: { label: 'Compare wheated bottles', href: '/bourbon/compare' },
    relatedCases: ['eagle-rare-price', 'allocated-worth'],
  },
  {
    slug: 'dsp-numbers',
    title: 'Why do some bottles have DSP numbers?',
    hook: 'The tiny code on the label that tells the truth.',
    difficulty: 'enthusiast',
    clues: ['Find "Distilled in Kentucky" fine print', 'DSP-KY-### format', 'Compare brand story to DSP owner'],
    investigation: [
      { heading: 'What DSP means', body: 'Distilled Spirits Plant — a federally registered production site. Every drop legally distilled in the US traces to a DSP number. The marketing name on the front may not match the still on the back.' },
      { heading: 'Sourced vs distilled', body: 'Many brands source bulk whiskey from MGP, Heaven Hill, or Barton and bottle under their label. DSP reveals who actually distilled — not who designed the label.' },
      { heading: 'Why enthusiasts care', body: 'Two "craft" brands with identical DSP numbers are the same juice with different stories. That is not always bad — but you should know when you are paying for story vs still.' },
    ],
    verdict: 'DSP is the label\'s confession booth. Read it before you pay premium for "small batch."',
    rabbitHole: { label: 'Secret knowledge in World Lore', href: '/bourbon/lore#lore-secrets' },
    relatedCases: ['store-pick-magic', 'barrel-floor'],
  },
  {
    slug: 'barrel-floor',
    title: 'Why are some barrels better?',
    hook: 'Same mash. Same char. Different rickhouse floor — different whiskey.',
    difficulty: 'enthusiast',
    clues: ['Top floor = hotter aging', 'Angel\'s share varies by position', 'Single barrels expose this'],
    investigation: [
      { heading: 'Heat rises', body: 'Rickhouse top floors run hotter in summer. More expansion into wood, faster extraction, more angel\'s share. Bottom floors age slower — sometimes more elegant, sometimes less intense.' },
      { heading: 'Single barrel lottery', body: 'When you buy single barrel picks, you are buying one floor, one season, one barrel. Barrel #12 from top floor can taste nothing like barrel #40 from bottom — same recipe.' },
      { heading: 'Store picks exploit this', body: 'Good pickers taste multiple barrels and choose winners. That is why two "same" bottles from different picks diverge — you are tasting warehouse position, not just age.' },
    ],
    verdict: 'Barrels are not interchangeable. Warehouse microclimate is a hidden variable in every pour.',
    rabbitHole: { label: 'Store Pick Academy', href: '/bourbon/store-picks' },
    relatedCases: ['store-pick-magic', 'bib-guarantee'],
  },
  {
    slug: 'bib-guarantee',
    title: 'What does Bottled-in-Bond actually guarantee?',
    hook: 'The 1897 law that still matters on modern shelves.',
    difficulty: 'beginner',
    clues: ['One distilling season', 'One distiller', 'Four years minimum', '100 proof exactly'],
    investigation: [
      { heading: 'The trust era', body: 'Bottled-in-Bond was America\'s first consumer protection for whiskey — after adulterated "bourbon" flooded markets. The stamp meant: this is real, aged, undiluted below 100 proof.' },
      { heading: 'What you get today', body: 'BiB labels still require one distilling season (Jan–Jun or Jul–Dec), one distillery, 4+ years in bonded warehouse, 100 proof entry to bottle. Evan Williams White Label BiB is the textbook — quality at $15.' },
      { heading: 'Why it matters now', body: 'In an age of sourced juice and vague age statements, BiB is a transparency shortcut. When you see the green label, someone signed their name to the specs.' },
    ],
    verdict: 'BiB is not automatically "best" — but it is legally specific. That matters when labels lie by omission.',
    rabbitHole: { label: 'Evan Williams progression path', href: '/bourbon/bottles/evan-williams-black' },
    relatedCases: ['dsp-numbers', 'eagle-rare-price'],
  },
  {
    slug: 'store-pick-magic',
    title: 'Why are some store picks incredible?',
    hook: 'Same brand. Same proof. One barrel chosen by someone who cared.',
    difficulty: 'deep',
    clues: ['Ask who picked and when', 'Single barrel vs small batch', 'Compare to standard expression'],
    investigation: [
      { heading: 'The picker effect', body: 'A store pick is a single barrel (or small selection) chosen by a buyer who tasted options. Standard shelf bottles are blended for consistency. Picks celebrate variation — for better or worse.' },
      { heading: 'When worth the premium', body: 'Worth it when: you trust the picker, you can compare to standard, and the premium is modest. Skip when: markup is extreme and nobody tasted alternatives.' },
      { heading: 'The learning move', body: 'Buy standard and pick side by side. Same distillery, same proof — different barrel. That one experiment teaches more than ten reviews.' },
    ],
    verdict: 'Great store picks are curated barrels, not magic. The skill is selection — and your palate confirming it.',
    rabbitHole: { label: 'Full Store Pick Academy', href: '/bourbon/store-picks' },
    relatedCases: ['barrel-floor', 'weller-ghost'],
  },
  {
    slug: 'allocated-worth',
    title: 'Is allocated bourbon worth the hunt?',
    hook: 'Hours in line. Secondary markup. Or just buy something excellent at $40?',
    difficulty: 'enthusiast',
    clues: ['Calculate opportunity cost', 'Blind taste vs shelf staple', 'What are you collecting — juice or story?'],
    investigation: [
      { heading: 'The hunt tax', body: 'Time, gas, lottery stress, and FOMO are costs never printed on the receipt. A $35 bottle that took six store visits is not a $35 bottle.' },
      { heading: 'Blind truth', body: 'Many enthusiasts blind Wild Turkey 101 against allocated bottles and prefer the $28 pour. Hype survives because labels are hidden in social settings, not blind flights.' },
      { heading: 'When allocation makes sense', body: 'When you love the house, want the experience, and MSRP is real — allocation is a hobby layer. When you pay secondary for status, you are buying furniture for your identity.' },
    ],
    verdict: 'Allocation is worth it when the pour justifies the hunt at fair price — not when secondary market owns the story.',
    rabbitHole: { label: 'Bourbon Economy deep dive', href: '/bourbon/economy' },
    relatedCases: ['eagle-rare-price', 'weller-ghost'],
  },
  {
    slug: 'craft-marketing-truth',
    title: 'Is this craft whiskey or sourced bulk juice?',
    hook: 'Small batch label. Big distillery DSP on the back.',
    difficulty: 'enthusiast',
    clues: ['Read the DSP number', 'Ask if grain-to-glass', 'Compare to MGP or HH sourced profiles'],
    investigation: [
      { heading: 'Craft vs curated', body: 'Craft can mean: distilled on site, aged on site, bottled on site — or merely "we picked barrels from a bulk producer." Both are legal; only one is grain-to-glass.' },
      { heading: 'The MGP tell', body: 'Many NDP brands share Indiana or Kentucky bulk profiles — high rye, consistent, good. You are often paying for story and finish, not still ownership.' },
      { heading: 'When it still makes sense', body: 'Sourced juice at fair price with honest labeling is fine. Pay premium only when you know who distilled and why the blend is special.' },
    ],
    verdict: 'Craft is a process claim, not a quality guarantee. DSP and transparency beat front-label romance.',
    rabbitHole: { label: 'Producer Atlas — craft houses', href: '/bourbon/producers/new-riff' },
    relatedCases: ['dsp-numbers', 'store-pick-magic'],
  },
  {
    slug: 'rye-vs-high-rye-bourbon',
    title: 'High-rye bourbon vs rye whiskey — why the label matters',
    hook: 'Both taste spicy. Only one is legally rye whiskey.',
    difficulty: 'beginner',
    clues: ['Check category line on label', '51% rye minimum for rye whiskey', 'Compare Bulleit Bourbon vs Bulleit Rye'],
    investigation: [
      { heading: 'The legal line', body: 'Rye whiskey requires ≥51% rye grain. High-rye bourbon is still ≥51% corn — rye is the flavor grain, not the majority. The spice feels similar; the law is not.' },
      { heading: 'Taste the pair', body: 'Pour Wild Turkey 101 next to Wild Turkey Rye. Same house, different category. Bourbon brings more corn sweetness; rye pushes pepper and dry spice forward.' },
      { heading: 'Cocktail consequences', body: 'Rye holds up in Manhattan and Old Fashioned specs written for spice. High-rye bourbon works but reads sweeter — neither is wrong, category literacy prevents wrong orders.' },
    ],
    verdict: 'High-rye bourbon and rye whiskey are cousins, not twins. Compare both from the same producer once and you will never confuse the labels.',
    rabbitHole: { label: 'Category compare flight', href: '/bourbon/compare?preset=category-flight' },
    relatedCases: ['bib-guarantee', 'craft-marketing-truth'],
  },
  {
    slug: 'tennessee-vs-bourbon-label',
    title: 'Why Jack Daniel\'s is not labeled bourbon',
    hook: 'Corn mash. New oak. Charcoal step — category shift.',
    difficulty: 'beginner',
    clues: ['Lincoln County Process', 'Tennessee whiskey on label', 'Compare to Buffalo Trace same proof'],
    investigation: [
      { heading: 'Mash qualifies, process diverges', body: 'Jack\'s mash bill meets bourbon grain rules. Charcoal mellowing before barreling and Tennessee identity move the marketing category to Tennessee whiskey — a choice, not a quality downgrade.' },
      { heading: 'What charcoal changes', body: 'Sugar maple charcoal filters new make — softer entry, less harshness, banana-forward profile many recognize. Same proof bourbon often reads sharper on first sip.' },
      { heading: 'Jack vs Dickel', body: 'Two Tennessee houses, two charcoal philosophies. Pour No. 7 vs Dickel No. 8 blind at 80 proof — category literacy through contrast, not loyalty.' },
    ],
    verdict: 'Tennessee whiskey is process-defined. The label teaches you a production step happened — not that the whiskey is "less than" bourbon.',
    rabbitHole: { label: 'Whiskey category map', href: '/bourbon/whiskey-map' },
    relatedCases: ['rye-vs-high-rye-bourbon', 'bib-guarantee'],
  },
  {
    slug: 'nas-age-drift',
    title: 'Where did the age statement go?',
    hook: 'Your favorite bottle lost its number — did the juice change?',
    difficulty: 'enthusiast',
    clues: ['Compare old label photos', 'Check NAS fine print', 'Taste against age-stated rivals'],
    investigation: [
      { heading: 'Inventory math', body: 'When demand outruns aged stock, brands drop age statements to blend younger whiskey without relabeling every batch. NAS is not automatically bad — it is less transparent.' },
      { heading: 'What you lose', body: 'Age statements set a minimum — you know nothing is younger than the number. NAS removes that floor; blenders gain flexibility, buyers lose a shortcut.' },
      { heading: 'How to respond', body: 'Blind taste against a fixed-age competitor at similar price. If NAS wins, keep buying. If not, switch — let palate override nostalgia for an old label.' },
    ],
    verdict: 'Missing age statements usually mean supply pressure, not conspiracy. Taste and compare — the number was never the whole story.',
    rabbitHole: { label: 'Age statement flight', href: '/bourbon/compare?preset=age-flight' },
    relatedCases: ['eagle-rare-price', 'bib-guarantee'],
  },
  {
    slug: 'ncf-haze',
    title: 'Why did my whiskey turn cloudy in the freezer?',
    hook: 'Non-chill filtered whiskey can haze — that is often a feature.',
    difficulty: 'beginner',
    clues: ['Check NCF on label', 'Chill a small pour', 'Compare to chill-filtered bottle'],
    investigation: [
      { heading: 'What causes haze', body: 'Fatty acids and esters precipitate when cold — chill filtration removes them for cosmetic clarity. NCF bottles keep them for mouthfeel; ice or freezer exposure can cloud the glass.' },
      { heading: 'Quality signal or flaw?', body: 'Haze in NCF whiskey is normal — not contamination. Many enthusiasts prefer the texture that chill filtration strips away.' },
      { heading: 'The experiment', body: 'Chill two pours: one NCF craft BiB, one major chill-filtered shelf staple. Watch one cloud, one stay clear — then taste both neat. Texture difference often beats appearance.' },
    ],
    verdict: 'Cloudiness in non-chill filtered whiskey is chemistry, not defect. Read the label before you blame the bottle.',
    rabbitHole: { label: 'New Riff — NCF craft', href: '/bourbon/bottles/new-riff-bourbon' },
    relatedCases: ['craft-marketing-truth', 'bib-guarantee'],
  },
  {
    slug: 'secondary-market-math',
    title: 'Is $150 on secondary ever rational?',
    hook: 'MSRP was $45. Reseller wants triple. What are you actually buying?',
    difficulty: 'deep',
    clues: ['Calculate $/oz vs open bottle', 'Opportunity cost of the hunt', 'Blind score vs shelf staple'],
    investigation: [
      { heading: 'Juice vs trophy', body: 'Secondary price bundles scarcity, status, and FOMO. The liquid inside often has a $40–70 open-market equivalent that blind tastings regularly beat.' },
      { heading: 'The rational exception', body: 'Paying secondary can make sense for a once-in-a-lifetime pour shared with people who will remember it — if you treat it as experience budget, not investment.' },
      { heading: 'The substitute ladder', body: 'Weller hunt? Try Larceny. Eagle Rare markup? Try Russell\'s Reserve 10. Pappy chase? Blind Weller, 1920, and a BiB — let results embarrass the markup.' },
    ],
    verdict: 'Secondary market prices measure hype velocity, not palate truth. Run the blind test before you fund someone else\'s flip.',
    rabbitHole: { label: 'Bourbon Economy', href: '/bourbon/economy' },
    relatedCases: ['allocated-worth', 'eagle-rare-price', 'weller-ghost'],
  },
];

export function getDetectiveCase(slug: string): DetectiveCase | undefined {
  return DETECTIVE_CASES.find((c) => c.slug === slug);
}
