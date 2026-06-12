import type { AtlasEntry, AtlasForwardLink, AtlasSeed } from './types';
import { defaultRabbitHoleLinks } from './rabbit-holes';

const CATEGORY_CONTEXT: Record<AtlasSeed['category'], { taste: string; history: string; buy: string }> = {
  production: {
    taste: 'Production choices shape texture, estery fruit, and how aggressively oak reads on the palate. A longer ferment or a careful hearts cut can make the same mash bill taste rounder or sharper.',
    history: 'American bourbon scaled on continuous column stills in the late 1800s, but pot stills and doublers never disappeared — many brands still blend methods to protect house character.',
    buy: 'When a label highlights production (pot still, sour mash, yeast strain), treat it as a clue about style — not automatic quality. Compare two pours that differ only in process to learn your preference.',
  },
  barrel: {
    taste: 'Barrel work is where vanilla, caramel, tannin, and spice meet time and temperature. Rickhouse position and entry proof often explain why two bourbons from the same distillery feel unrelated.',
    history: 'Cooperages and warehouse design evolved alongside railroad shipping — Kentucky rickhouses became the default image of aging, but the physics apply anywhere barrels breathe.',
    buy: 'Barrel-forward terms help you decode picks: single barrel, store pick, barrel proof, and BiB each imply different transparency about what is in the bottle.',
  },
  legal: {
    taste: 'Legal categories do not guarantee flavor, but they constrain what can be in the bottle — straight, bonded, and age statements remove some blending games.',
    history: 'Post-Prohibition labeling rules and the Bottled-in-Bond Act of 1897 were consumer-protection responses to adulterated whiskey. Modern debates over sourcing and NAS still echo that era.',
    buy: 'Read legal terms as minimum standards and disclosure tools. BiB and straight labels are baselines; absence of age statement is not a flaw — it is a blending strategy you should notice.',
  },
  tasting: {
    taste: 'Tasting vocabulary turns subjective impressions into comparable notes. Training nose and palate makes blind tasting, store pick decisions, and host duties less intimidating.',
    history: 'Structured tasting moved from trade panels to enthusiast culture through whiskey societies, competition judging, and online communities sharing flavor wheels.',
    buy: 'Terms like nose, finish, and mouthfeel help you articulate why a bottle is worth rebuying — useful when allocation forces hard choices.',
  },
  market: {
    taste: 'Market language rarely changes juice, but it changes what you pay and what hype you bring to the glass — expectations alter perception.',
    history: 'Secondary markets exploded after limited releases and celebrity picks collided with social media. Allocation seasons are as much about distribution math as about quality.',
    buy: 'MSRP, secondary, and allocation terms help you decide when to chase, when to walk, and when a shelf staple outperforms the line.',
  },
  culture: {
    taste: 'Culture terms connect what is in the glass to Derby traditions, tourism, music, and regional identity — context that makes hosting and collecting richer.',
    history: 'Bourbon’s story intertwines with Kentucky settlement, Prohibition loopholes, medicinal prescriptions, and the global revival of American whiskey.',
    buy: 'Cultural literacy helps you buy with context — trail visits, event bottlings, and heritage labels sell story plus spirit.',
  },
  grain: {
    taste: 'Grain bills set the chord: corn sweetness, rye spice, wheat softness, barley body. Mash bill literacy is the fastest way to predict flavor direction.',
    history: 'Distillers migrated recipes from farm stills to industrial scale, but the same four grains still dominate — debates over rye percentage are older than craft bourbon.',
    buy: 'Knowing wheated vs high-rye vs standard bourbon saves money on blind buys and sharpens flight design.',
  },
  chemistry: {
    taste: 'Chemistry terms explain why oak reads as vanilla, why proof burns, and why chill filtration changes mouthfeel — useful for advanced tasters, not required for enjoyment.',
    history: 'Science entered whiskey marketing as labs could measure congeners, esters, and vanillin — sometimes educating consumers, sometimes obscuring with jargon.',
    buy: 'Use chemistry vocabulary to compare brands that advertise non-chill filtered, cask strength, or long finishes — ask what you should feel, not just what sounds technical.',
  },
};

function defaultForwardLinks(slug: string): AtlasForwardLink[] {
  const hole = defaultRabbitHoleLinks(slug);
  return [
    ...hole.lessonLinks,
    ...hole.toolLinks,
    ...hole.producerLinks,
    ...hole.detectiveLinks,
    ...hole.storyLinks,
    ...hole.historyLinks,
    ...hole.geographyLinks,
  ].slice(0, 6);
}

export function buildAtlasEntry(seed: AtlasSeed): AtlasEntry {
  const ctx = CATEGORY_CONTEXT[seed.category];
  const plainEnglish =
    seed.extra?.plainEnglish ??
    `${seed.title} — ${seed.shortDefinition} In plain terms, this is one of the words bourbon enthusiasts use to connect what happens in the distillery and rickhouse to what you actually smell, taste, and pay for. When you see it on a label, in a review, or in a friend’s tasting note, it is pointing at a real decision someone made: grain, still, barrel, time, proof, or market. Understanding it does not require chemistry — it requires curiosity and a willingness to follow the thread from recipe to glass.`;
  const whyItMatters =
    seed.extra?.whyItMatters ??
    `If you ignore ${seed.title.toLowerCase()}, you treat bourbon like a black box — hype and price do the thinking for you. When you know it, you can compare bottles fairly, ask better questions on a tour, and host tastings that teach instead of intimidate. ${ctx.buy}`;
  const history =
    seed.extra?.history ??
    `${ctx.history} For ${seed.title.toLowerCase()}, the commonly told story among enthusiasts is that mastery here separates casual drinkers from people who can explain why two bourbons from the same shelf taste like different worlds. Exact dates vary by distillery; when history is uncertain, we say “often attributed” rather than invent precision.`;
  const tasteBuyingCollecting =
    seed.extra?.tasteBuyingCollecting ??
    `${ctx.taste} ${ctx.buy} Collectors document examples — ${seed.examples.slice(0, 2).join(' and ')} — when building themed shelves or comparing proofs side by side.`;
  const beginnerMisunderstanding =
    seed.extra?.beginnerMisunderstanding ??
    `Beginners often assume ${seed.title.toLowerCase()} is either marketing fluff or impossibly expert-only. Neither is true. It is a doorway: learn the short definition, taste one example, then follow a related term. Another common mistake is treating one pour as proof of the whole category — always compare two bottles when learning a new concept.`;

  return {
    slug: seed.slug,
    title: seed.title,
    shortDefinition: seed.shortDefinition,
    plainEnglish,
    whyItMatters,
    history,
    tasteBuyingCollecting,
    beginnerMisunderstanding,
    examples: seed.examples,
    relatedTerms: seed.relatedSlugs,
    cousinIdeas: seed.cousinIdeas,
    geography: seed.geography,
    forwardLinks: defaultForwardLinks(seed.slug),
  };
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function atlasNarrativeWords(entry: AtlasEntry): number {
  return wordCount(
    [
      entry.plainEnglish,
      entry.whyItMatters,
      entry.history,
      entry.tasteBuyingCollecting,
      entry.beginnerMisunderstanding,
      entry.examples.join(' '),
      entry.geography ?? '',
    ].join(' '),
  );
}
