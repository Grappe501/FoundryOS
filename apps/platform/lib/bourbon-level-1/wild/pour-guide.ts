/** How serve method changes what you taste — by bottle style */

export type ServeMethod = {
  id: string;
  label: string;
  description: string;
  dilution: 'none' | 'slow' | 'fast' | 'variable';
  heat: 'full' | 'reduced' | 'hidden';
};

export type BottleStyle = {
  id: string;
  label: string;
  examples: string;
  neat: string;
  rocks: string;
  largeCube: string;
  smallIce: string;
  splash: string;
  soda: string;
  cola: string;
  juice: string;
  julep: string;
};

export const SERVE_METHODS: ServeMethod[] = [
  { id: 'neat', label: 'Neat', description: 'Room temp or slightly warm — full proof, full aroma, maximum alcohol burn on high-proof pours.', dilution: 'none', heat: 'full' },
  { id: 'rocks', label: 'On the rocks', description: 'Standard ice cubes — chills fast, dilutes moderately over 10–15 minutes.', dilution: 'slow', heat: 'reduced' },
  { id: 'large-cube', label: 'Large ice cube', description: 'One big cube — slower melt, less water rush, preserves structure longer.', dilution: 'slow', heat: 'reduced' },
  { id: 'small-ice', label: 'Small / crushed ice', description: 'Julep-style — fast chill, fast dilution, sweetness and mint dominate.', dilution: 'fast', heat: 'hidden' },
  { id: 'splash', label: 'Splash of water', description: 'A few drops to a teaspoon — opens aroma, tames 100+ proof without full dilution.', dilution: 'variable', heat: 'reduced' },
  { id: 'soda', label: 'With soda / highball', description: 'Bourbon lengthened — ratio matters. 1:2 or 1:3 keeps whiskey forward.', dilution: 'fast', heat: 'hidden' },
  { id: 'cola', label: 'With cola', description: 'Sweetness masks youth and rye spice — high-rye bourbons can taste sharper; wheated smoother.', dilution: 'fast', heat: 'hidden' },
  { id: 'juice', label: 'With juice / sour', description: 'Acid and sugar reshape perception — whiskey becomes cocktail ingredient, not solo star.', dilution: 'fast', heat: 'hidden' },
  { id: 'julep', label: 'Mint julep', description: 'Crushed ice, mint, sugar — Derby tradition. Bourbon should be bold enough to survive.', dilution: 'fast', heat: 'hidden' },
];

export const BOTTLE_STYLES: BottleStyle[] = [
  {
    id: 'wheated',
    label: 'Wheated bourbon',
    examples: "Maker's Mark, Larceny, Weller",
    neat: 'Soft caramel, minimal rye bite — approachable but can feel sweet at full proof.',
    rocks: 'Ice tames any heat; vanilla and honey expand — crowd favorite on the rocks.',
    largeCube: 'Ideal serve — slow dilution preserves wheat softness without washing out.',
    smallIce: 'Very cold, very diluted — dessert-like; juleps work if bourbon is 90+ proof.',
    splash: 'Opens nose dramatically on 100+ proof wheated — try before ice.',
    soda: 'Highball works; wheat reads as gentle — do not over-dilute.',
    cola: 'Classic combo — wheated reads smoother than high-rye in cola.',
    juice: 'Orange or apple juice — smooth base; avoid masking entirely with cheap wheat.',
    julep: 'Good choice — but use enough bourbon (2 oz+) to punch through mint and sugar.',
  },
  {
    id: 'high-rye',
    label: 'High-rye bourbon',
    examples: 'Wild Turkey 101, Bulleit, Four Roses',
    neat: 'Spice, pepper, fruit — rye bite front and center. High proof amplifies.',
    rocks: 'Ice mellows rye heat; cherry and citrus notes often emerge after 5 minutes.',
    largeCube: 'Best rocks serve for tasting — structure holds while spice softens.',
    smallIce: 'Fast dilution can flatten rye character — prefer large cube or splash.',
    splash: 'Essential on 101+ proof — rye spice stays, burn drops.',
    soda: 'Use less soda than wheated — rye fights through and can taste sharp if too long.',
    cola: 'Rye spice cuts through cola sweetness — polarizing; some love the bite.',
    juice: 'Whiskey sour territory — rye adds structure to citrus.',
    julep: 'Bold choice — high-rye juleps need extra sugar balance.',
  },
  {
    id: 'barrel-proof',
    label: 'Barrel proof / high proof',
    examples: "Booker's, Elijah Craig BP, Old Forester 1920",
    neat: 'Intense — heat can mask flavor for beginners. Not wrong, but demanding.',
    rocks: 'Often too much dilution too fast with small ice — prefer large cube or splash only.',
    largeCube: 'Recommended — one cube, wait 3 minutes, nose again.',
    smallIce: 'Usually over-dilutes before you taste structure — avoid unless in cocktail.',
    splash: 'Professional move — 1:1 water drops until burn drops, flavor rises.',
    soda: 'Wasteful of barrel proof — you paid for intensity; dilute intentionally not accidentally.',
    cola: 'Possible but defeats the point — use 86 proof bourbon for mixed drinks.',
    juice: 'Premium sours only — aged bourbon in craft cocktails.',
    julep: 'Unusual — age and mint fight; use younger bourbon for juleps.',
  },
  {
    id: 'young-value',
    label: 'Young / value NAS',
    examples: 'Evan Williams Black, Old Forester 86',
    neat: 'Direct, sometimes ethanol-forward — honest daily drinker.',
    rocks: 'Ice helps young NAS — ethanol softens, corn sweetness opens.',
    largeCube: 'Great match — value bottles shine with controlled dilution.',
    smallIce: 'Fine for casual drinking — juleps and highballs.',
    splash: 'Quick upgrade path for neat pours that feel hot.',
    soda: 'Highball hero — ratio 1:3, lemon peel optional.',
    cola: 'Classic well-pour use — rye-forward value bottles hold up in cola.',
    juice: 'Mixers mask youth — acceptable for party pours, not tasting education.',
    julep: 'Derby on a budget — bold enough at 86–90 proof with enough volume.',
  },
  {
    id: 'aged',
    label: 'Aged / 10+ year',
    examples: 'Eagle Rare 10, Russell\'s Reserve 10',
    neat: 'Oak, leather, dried fruit — you paid for this profile; taste it first.',
    rocks: 'Controversial among purists — large cube only if proof is high; else splash.',
    largeCube: 'Acceptable — watch dilution; aged pours lose magic if watered too fast.',
    smallIce: 'Risky — tannin can turn bitter with heavy melt.',
    splash: 'Preferred over ice for high-proof aged — preserves oak elegance.',
    soda: 'Generally skip — age complexity lost in fizz.',
    cola: 'Skip — use mixer bourbon.',
    juice: 'Premium sours only — aged bourbon in craft cocktails.',
    julep: 'Unusual — age and mint fight; use younger bourbon for juleps.',
  },
];

export function getPourAdvice(styleId: string, methodId: string): string | undefined {
  const style = BOTTLE_STYLES.find((s) => s.id === styleId);
  if (!style) return undefined;
  const map: Record<string, keyof BottleStyle> = {
    neat: 'neat',
    rocks: 'rocks',
    'large-cube': 'largeCube',
    'small-ice': 'smallIce',
    splash: 'splash',
    soda: 'soda',
    cola: 'cola',
    juice: 'juice',
    julep: 'julep',
  };
  const key = map[methodId];
  return key ? String(style[key]) : undefined;
}
