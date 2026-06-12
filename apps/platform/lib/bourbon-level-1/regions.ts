export type KyRegion = {
  slug: string;
  name: string;
  x: number;
  y: number;
  distilleries: string[];
  history: string;
  famousBrands: string[];
};

/** Approximate positions on simplified KY map (percent 0–100) */
export const KENTUCKY_REGIONS: KyRegion[] = [
  { slug: 'louisville', name: 'Louisville / Shively', x: 62, y: 38, distilleries: ['Stitzel-Weller site', 'Angel\'s Envy', 'Copper & Kings'], history: 'Historic blending and warehousing hub; urban cocktail culture.', famousBrands: ['Old Forester', 'Evan Williams'] },
  { slug: 'frankfort', name: 'Frankfort', x: 55, y: 42, distilleries: ['Buffalo Trace', 'Glenns Creek'], history: 'Buffalo Trace campus — one of America\'s oldest continuously operating distilleries.', famousBrands: ['Buffalo Trace', 'Eagle Rare', 'Weller'] },
  { slug: 'bardstown', name: 'Bardstown', x: 58, y: 52, distilleries: ['Heaven Hill', 'Barton 1792', 'Lux Row'], history: 'The bourbon capital — rickhouse rows and the Bourbon Festival.', famousBrands: ['Elijah Craig', 'Evan Williams', '1792'] },
  { slug: 'clermont', name: 'Clermont', x: 68, y: 35, distilleries: ['Jim Beam', 'Little Book'], history: 'Beam family campus since 1935; largest bourbon producer by volume.', famousBrands: ['Jim Beam', 'Knob Creek', 'Booker\'s'] },
  { slug: 'lawrenceburg', name: 'Lawrenceburg', x: 52, y: 48, distilleries: ['Four Roses', 'Wild Turkey'], history: 'Anderson County — high-rye heritage and Turkey Hill.', famousBrands: ['Four Roses', 'Wild Turkey', 'Russell\'s Reserve'] },
  { slug: 'versailles', name: 'Versailles', x: 60, y: 45, distilleries: ['Woodford Reserve', 'Castle & Key'], history: 'Picturesque horse country; premium tourism stops.', famousBrands: ['Woodford Reserve'] },
  { slug: 'loretto', name: 'Loretto', x: 56, y: 55, distilleries: ['Maker\'s Mark'], history: 'Samuels family wheated bourbon; red wax dipping experience.', famousBrands: ["Maker's Mark"] },
  { slug: 'owensboro', name: 'Owensboro', x: 38, y: 48, distilleries: ['Green River', 'O.Z. Tyler'], history: 'Western Kentucky distilling tradition along the Ohio River.', famousBrands: ['Green River'] },
];

export type TrailStop = {
  day: number;
  region: string;
  stops: { name: string; why: string; hours: string }[];
};

export const BOURBON_TRAIL_PLANNER: TrailStop[] = [
  { day: 1, region: 'Frankfort', stops: [{ name: 'Buffalo Trace', why: 'Free tour, massive rickhouses, iconic campus', hours: '3–4 hrs' }, { name: 'Frankfort tasting room', why: 'Compare BT pour to shelf bottle at home', hours: '1 hr' }] },
  { day: 2, region: 'Bardstown', stops: [{ name: 'Heaven Hill visitor center', why: 'Bardstown bourbon capital context', hours: '2 hrs' }, { name: 'Barton 1792', why: 'Contrast heritage vs value positioning', hours: '2 hrs' }] },
  { day: 3, region: 'Lawrenceburg', stops: [{ name: 'Wild Turkey', why: 'Jimmy Russell legacy, rickhouse views', hours: '2 hrs' }, { name: 'Four Roses', why: 'Ten recipes — blend vs single barrel mindset', hours: '2 hrs' }] },
  { day: 4, region: 'Versailles + Loretto', stops: [{ name: 'Woodford Reserve', why: 'Copper pot still visual education', hours: '2 hrs' }, { name: "Maker's Mark", why: 'Wheat mash bill + wax dip ritual', hours: '2 hrs' }] },
];
