/** Curated Rabbit Hole of the Day — one weird thing, five minutes, return tomorrow */

export type DailyRabbitHole = {
  id: string;
  title: string;
  tease: string;
  body: string;
  href: string;
  readMinutes: number;
};

export const RABBIT_HOLES: DailyRabbitHole[] = [
  { id: 'no-age', title: 'Why is there no age statement?', tease: 'NAS does not mean young — it means flexible.', body: 'Distillers dropped age statements during the shortage era — but many NAS bourbons are 6–8 years. The label hides numbers, not quality — sometimes.', href: '/bourbon/detective/bib-guarantee', readMinutes: 4 },
  { id: 'barrel-floors', title: 'Why do barrel floors matter?', tease: 'Top floor vs bottom — same recipe, different whiskey.', body: 'Heat rises in rickhouses. Top barrels age faster, extract more, lose more to angel\'s share. Single barrels expose this lottery.', href: '/bourbon/detective/barrel-floor', readMinutes: 5 },
  { id: 'medicinal', title: 'Why was bourbon medicinal?', tease: 'Prohibition did not kill whiskey — it hid it.', body: 'Six distilleries held medicinal permits. Doctors prescribed whiskey. Inventory aged while speakeasies flourished elsewhere.', href: '/bourbon/lore#lore-timeline', readMinutes: 4 },
  { id: 'weller-impossible', title: 'Why is Weller impossible to find?', tease: 'Pappy\'s cousin got pulled into the allocation orbit.', body: 'Wheated juice from Buffalo Trace + Van Winkle mythology + lottery economics = shelf ghost.', href: '/bourbon/detective/weller-ghost', readMinutes: 5 },
  { id: 'char-level', title: 'Why does char level change everything?', tease: 'Char #4 is not marketing — it is chemistry.', body: 'More char = more wood sugar caramelization — but risk tannin overload on young whiskey. Same mash, different char, different pour.', href: '/bourbon/lab', readMinutes: 4 },
  { id: 'dsp-truth', title: 'What is the DSP hiding in plain sight?', tease: 'The label confesses if you know where to look.', body: 'Distilled Spirits Plant numbers reveal who actually distilled — not who designed the story on the front.', href: '/bourbon/detective/dsp-numbers', readMinutes: 5 },
  { id: 'proof-entry', title: 'Why does barrel entry proof matter if you cannot taste it?', tease: 'You taste its consequences ten years later.', body: 'Lower entry proof often yields softer aged whiskey. Same distillery, different entry, different outcome.', href: '/bourbon/x-ray', readMinutes: 4 },
  { id: 'secondary-insanity', title: 'Why does secondary market exist?', tease: 'MSRP is fiction when demand exceeds allocation.', body: 'Bourbon became an asset class for some bottles — the liquid did not change, the context did.', href: '/bourbon/economy', readMinutes: 5 },
  { id: 'wheated-vs-rye', title: 'Why do wheated and rye drinkers never agree?', tease: 'Mash bill is personality — not preference.', body: 'Wheat softens. Rye spices. Most beginners do not know which camp they are in until they blind both.', href: '/bourbon/lore#lore-debates', readMinutes: 4 },
  { id: 'dusty-bottle', title: 'What is a dusty bottle?', tease: 'Sealed whiskey from a different production era.', body: 'Old Turkey, old Stitzel — hunters swear juice changed. Archaeology with ethanol.', href: '/bourbon/objects/dusty-turkey-101', readMinutes: 5 },
  { id: 'store-pick-lottery', title: 'Why are store picks a lottery?', tease: 'One barrel chosen from dozens.', body: 'Standard bottles blend for consistency. Picks celebrate variance — for better or worse.', href: '/bourbon/store-picks', readMinutes: 5 },
  { id: 'bib-green', title: 'What does the green BiB label promise?', tease: '1897 consumer protection still on shelves at $15.', body: 'One season, one distiller, four years, 100 proof — transparency shortcut.', href: '/bourbon/detective/bib-guarantee', readMinutes: 4 },
];

function dateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function getRabbitHoleOfDay(d = new Date()): DailyRabbitHole & { dateKey: string } {
  const key = dateKey(d);
  const hole = RABBIT_HOLES[hash(`rabbit:${key}`) % RABBIT_HOLES.length];
  return { ...hole, dateKey: key };
}
