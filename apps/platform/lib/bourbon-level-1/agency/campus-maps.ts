export type CampusPoint = {
  id: string;
  label: string;
  x: number;
  y: number;
  whyItMatters: string;
};

export type DistilleryCampus = {
  producerSlug: string;
  name: string;
  tagline: string;
  points: CampusPoint[];
};

export const DISTILLERY_CAMPUSES: DistilleryCampus[] = [
  {
    producerSlug: 'buffalo-trace',
    name: 'Buffalo Trace Campus',
    tagline: 'Frankfort — where allocation culture meets rickhouse reality.',
    points: [
      { id: 'visitor', label: 'Visitor center', x: 20, y: 70, whyItMatters: 'Free tours — start here to see scale before you chase bottles.' },
      { id: 'still', label: 'Still house', x: 45, y: 40, whyItMatters: 'Mash #1 and other bills begin here — house DNA starts at fermentation.' },
      { id: 'rickhouse', label: 'Rickhouses', x: 70, y: 25, whyItMatters: 'Thousands of barrels aging — floor position drives single barrel variation.' },
      { id: 'bottling', label: 'Bottling line', x: 55, y: 65, whyItMatters: 'Where proof is set and labels applied — BiB vs barrel proof diverge here.' },
      { id: 'warehouse-h', label: 'Experimental warehouses', x: 80, y: 50, whyItMatters: 'BT experiments with microclimate — future picks often originate here.' },
    ],
  },
  {
    producerSlug: 'heaven-hill',
    name: 'Heaven Hill / Bardstown',
    tagline: 'Value king campus — where shelf staples and picks share rickhouses.',
    points: [
      { id: 'visitor', label: 'Experience center', x: 25, y: 65, whyItMatters: 'Context for Evan Williams, Elijah Craig, Larceny — same house, different tiers.' },
      { id: 'rickhouse', label: 'Rickhouse rows', x: 60, y: 30, whyItMatters: 'Heaven Hill picks are barrel lottery — floor and age drive spice vs caramel.' },
      { id: 'still', label: 'Distillation', x: 40, y: 45, whyItMatters: 'Traditional mash bills at scale — why HH can hit $18 and $60 with same craft.' },
      { id: 'bottling', label: 'Bottling', x: 55, y: 70, whyItMatters: 'BiB Evan Williams White Label exits here — transparency at entry price.' },
    ],
  },
  {
    producerSlug: 'jim-beam',
    name: 'Jim Beam Clermont',
    tagline: 'World\'s largest bourbon producer — Beam to Booker\'s on one hill.',
    points: [
      { id: 'visitor', label: 'American Stillhouse', x: 30, y: 60, whyItMatters: 'Beam family story — connects white label to Knob Creek to Booker\'s ladder.' },
      { id: 'still', label: 'Column stills', x: 50, y: 35, whyItMatters: 'Volume production — understanding scale explains price ladders.' },
      { id: 'rickhouse', label: 'On-site aging', x: 72, y: 28, whyItMatters: 'Booker\'s barrels selected from specific floors — uncut proof philosophy.' },
      { id: 'bottling', label: 'Bottling & proofing', x: 58, y: 68, whyItMatters: 'Where 80 proof Beam diverges from 126 proof Booker\'s — same family, different intent.' },
    ],
  },
  {
    producerSlug: 'wild-turkey',
    name: 'Wild Turkey Lawrenceburg',
    tagline: 'Campari-era campus — high rye, rickhouse heat, Jimmy Russell legacy.',
    points: [
      { id: 'visitor', label: 'Visitor center', x: 28, y: 62, whyItMatters: '101 vs Russell\'s Reserve story starts at the welcome desk — same mash, different age and proof.' },
      { id: 'still', label: 'Column stills', x: 48, y: 38, whyItMatters: 'Wild Turkey yeast strain — pepper and dark fruit signature born in fermentation.' },
      { id: 'rickhouse', label: 'Rickhouses', x: 68, y: 28, whyItMatters: 'Top-floor barrels drive 101 intensity — warehouse position explains single barrel picks.' },
      { id: 'bottling', label: 'Bottling hall', x: 52, y: 72, whyItMatters: 'Rye and bourbon lines diverge here — compare WT Rye to 101 from same campus.' },
    ],
  },
  {
    producerSlug: 'makers-mark',
    name: "Maker's Mark Loretto",
    tagline: 'Wheated campus — red wax, rotating barrels, visitor intimacy.',
    points: [
      { id: 'visitor', label: 'Ambassador experience', x: 22, y: 68, whyItMatters: 'Hand-dipping wax — brand theater that matches the soft wheat pour.' },
      { id: 'still', label: 'Roller mill & cook', x: 42, y: 42, whyItMatters: 'No rye in the mash — wheat replaces spice grain; taste starts at the grain bill board.' },
      { id: 'rickhouse', label: 'Barrel rotation', x: 65, y: 32, whyItMatters: 'Maker\'s rotates barrels between floors — engineered consistency vs single-floor lottery.' },
      { id: 'bottling', label: 'Bottling line', x: 55, y: 66, whyItMatters: 'Cask strength vs 90 proof diverge — same wheated juice, different bottling intent.' },
    ],
  },
  {
    producerSlug: 'four-roses',
    name: 'Four Roses Coxs Creek',
    tagline: 'Two distilleries, ten recipes — blending campus as flavor laboratory.',
    points: [
      { id: 'visitor', label: 'Cox\'s Creek warehouse', x: 25, y: 65, whyItMatters: 'Single barrel picks happen here — OBSV vs OESO literacy starts on the tour.' },
      { id: 'still', label: 'Cypress & FK distilleries', x: 50, y: 35, whyItMatters: 'Two still sites feed ten mash bill + yeast combos — why Four Roses tastes like a system, not one recipe.' },
      { id: 'rickhouse', label: 'Rickhouse rows', x: 72, y: 28, whyItMatters: 'Single barrel variation is the product — floor and season matter more here than at blended houses.' },
      { id: 'bottling', label: 'Bottling', x: 58, y: 70, whyItMatters: 'Yellow Label vs Single Barrel — same campus, different barrel selection philosophy.' },
    ],
  },
  {
    producerSlug: 'old-forester',
    name: 'Old Forester Louisville',
    tagline: 'Urban distillery on Whiskey Row — history in brick, banana in the glass.',
    points: [
      { id: 'visitor', label: 'Whiskey Row experience', x: 30, y: 60, whyItMatters: 'First bottled bourbon brand story — connects 86 Proof daily pour to 1920 Prohibition Style.' },
      { id: 'still', label: 'Copper pot column hybrid', x: 48, y: 38, whyItMatters: 'Downtown production visible through glass — fermentation esters drive banana notes.' },
      { id: 'rickhouse', label: 'Off-site aging', x: 70, y: 30, whyItMatters: 'Barrels age away from downtown — urban distilling, rural rickhouse reality.' },
      { id: 'bottling', label: 'Proofing & label', x: 54, y: 68, whyItMatters: '1920 at 115 proof vs 86 Proof — same house, heat as a product line.' },
    ],
  },
  {
    producerSlug: 'woodford-reserve',
    name: 'Woodford Reserve Versailles',
    tagline: 'Pot still heritage campus — copper, limestone, premium positioning.',
    points: [
      { id: 'visitor', label: 'National Historic Landmark', x: 26, y: 64, whyItMatters: 'Pot stills on display — texture story before you taste the flagship.' },
      { id: 'still', label: 'Copper pot stills', x: 46, y: 36, whyItMatters: 'Triple pot still run adds weight — compare to column-only production on same trip.' },
      { id: 'rickhouse', label: 'Heat-cycled warehouses', x: 68, y: 28, whyItMatters: 'Woodford heat-cycles warehouses — accelerates interaction vs passive aging.' },
      { id: 'bottling', label: 'Bottling', x: 56, y: 70, whyItMatters: 'Double Oaked and standard Reserve diverge after primary barrel — finish happens downstream.' },
    ],
  },
  {
    producerSlug: 'new-riff',
    name: 'New Riff Newport',
    tagline: 'Modern craft campus — BiB discipline, non-chill filtered transparency.',
    points: [
      { id: 'visitor', label: 'Tasting room', x: 24, y: 66, whyItMatters: 'BiB bourbon and rye side by side — craft category literacy in one flight.' },
      { id: 'still', label: 'Vendome column still', x: 44, y: 40, whyItMatters: 'Grain-to-glass on the Ohio River — no sourced juice narrative.' },
      { id: 'rickhouse', label: 'On-site rickhouse', x: 66, y: 30, whyItMatters: 'Single campus aging — DSP and tour tell the same story.' },
      { id: 'bottling', label: 'Bottling line', x: 52, y: 72, whyItMatters: 'NCF bottling preserves mouthfeel — compare to chill-filtered majors blind.' },
    ],
  },
  {
    producerSlug: 'wilderness-trail',
    name: 'Wilderness Trail Danville',
    tagline: 'Science-forward craft — sweet mash, wheated BiB, research distillery energy.',
    points: [
      { id: 'visitor', label: 'Campus tour', x: 26, y: 62, whyItMatters: 'Sweet mash vs sour mash explained on the floor — craft process literacy.' },
      { id: 'still', label: 'Still house', x: 46, y: 38, whyItMatters: 'Wheated mash bill posted openly — compare to Maker\'s on your next shelf.' },
      { id: 'rickhouse', label: 'Rickhouse', x: 68, y: 28, whyItMatters: 'BiB age requirements visible in barrel inventory — transparency as marketing.' },
      { id: 'bottling', label: 'Bottling', x: 54, y: 70, whyItMatters: '100 proof BiB exit — same proof as Rittenhouse rye, different category.' },
    ],
  },
  {
    producerSlug: 'jack-daniel',
    name: "Jack Daniel's Lynchburg",
    tagline: 'Tennessee charcoal campus — not bourbon label, same grain laws.',
    points: [
      { id: 'visitor', label: 'Visitor center', x: 22, y: 68, whyItMatters: 'Dry county pilgrimage — category story before the pour.' },
      { id: 'charcoal', label: 'Charcoal mellowing vats', x: 44, y: 38, whyItMatters: 'Lincoln County Process — new make drips through maple charcoal before barrel. This is why Jack is Tennessee whiskey.' },
      { id: 'still', label: 'Still house', x: 58, y: 48, whyItMatters: 'Corn-forward mash qualifies as bourbon-class — charcoal step moves the label.' },
      { id: 'rickhouse', label: 'Barrel houses', x: 74, y: 28, whyItMatters: 'Single barrel and Barrel Proof picks expose warehouse variance on Tennessee juice.' },
      { id: 'bottling', label: 'Bottling', x: 52, y: 72, whyItMatters: 'Old No. 7 at 80 proof vs Barrel Proof — same campus, heat as product tier.' },
    ],
  },
];

export function getCampus(producerSlug: string): DistilleryCampus | undefined {
  return DISTILLERY_CAMPUSES.find((c) => c.producerSlug === producerSlug);
}
