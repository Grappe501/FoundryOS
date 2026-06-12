import { BOURBON_BOTTLES, getBottle, type BourbonBottle } from '../bottles';

export type BottleProgression = {
  slug: string;
  whatItTeaches: string[];
  whoItsFor: string;
  whenToBuy: string;
  nextBottle: { slug: string; name: string; why: string } | null;
  thenBottle: { slug: string; name: string; why: string } | null;
};

const PROGRESSION: Record<string, Omit<BottleProgression, 'slug'>> = {
  'wild-turkey-101': {
    whatItTeaches: ['Proof balance', 'High-rye spice without barrel-proof chaos', 'Daily pour discipline'],
    whoItsFor: 'Anyone ready to taste what 101 proof means before chasing barrel strength.',
    whenToBuy: 'Your second or third bottle — after one gentle sipper and one corn-forward pour.',
    nextBottle: { slug: 'russells-reserve-10', name: "Russell's Reserve 10", why: 'Same house, decade of mellow — Turkey without the punch.' },
    thenBottle: { slug: 'bookers', name: "Booker's", why: 'Uncut barrel proof — graduate when you trust water drops.' },
  },
  'evan-williams-black': {
    whatItTeaches: ['Value baseline', 'What real bourbon tastes like under $20', 'BiB alternative path'],
    whoItsFor: 'First bottle buyers and house-pour builders.',
    whenToBuy: 'Day one — or whenever you need a guilt-free daily pour.',
    nextBottle: { slug: 'old-forester-86', name: 'Old Forester 86', why: 'Compare heritage brand approachability at same price tier.' },
    thenBottle: { slug: 'wild-turkey-101', name: 'Wild Turkey 101', why: 'Step up proof when you want more flavor density.' },
  },
  'makers-mark': {
    whatItTeaches: ['Wheated profile', 'Hosting-friendly pours', 'Softness vs rye spice'],
    whoItsFor: 'Hosts and wheat-curious drinkers — especially guests who "don\'t like bourbon."',
    whenToBuy: 'When you need a crowd bottle or want to understand wheat mash.',
    nextBottle: { slug: 'larceny', name: 'Larceny', why: 'Wheated from Heaven Hill — compare wheat vs wheat.' },
    thenBottle: { slug: 'weller-special-reserve', name: 'Weller Special Reserve', why: 'Wheated allocation culture — if you can find it at fair price.' },
  },
  'buffalo-trace': {
    whatItTeaches: ['House baseline', 'BT campus DNA', 'Gateway to allocation siblings'],
    whoItsFor: 'Explorers entering the Buffalo Trace universe without the hunt.',
    whenToBuy: 'When you want the classic "this tastes like bourbon" pour.',
    nextBottle: { slug: 'eagle-rare', name: 'Eagle Rare 10', why: 'Age statement on same house — taste what time adds.' },
    thenBottle: { slug: 'four-roses-single-barrel', name: 'Four Roses Single Barrel', why: 'Leave BT orbit — learn high-rye single barrel variation.' },
  },
  'eagle-rare': {
    whatItTeaches: ['Age statement value', 'Oak integration', 'Allocation awareness'],
    whoItsFor: 'Enthusiasts ready for daily premium — not beginners on bottle one.',
    whenToBuy: 'At MSRP — skip secondary markup until your palate confirms the premium.',
    nextBottle: { slug: 'michters-us1', name: "Michter's US*1", why: 'Different texture philosophy — mouthfeel education.' },
    thenBottle: { slug: 'old-forester-1920', name: 'Old Forester 1920', why: 'Barrel-proof step-up — heat vs flavor.' },
  },
};

function defaultProgression(b: BourbonBottle): BottleProgression {
  return {
    slug: b.slug,
    whatItTeaches: [b.oneLiner, ...b.tags.slice(0, 2).map((t) => `${t} character`)],
    whoItsFor: b.tags.includes('beginner') ? 'Curious drinkers and new collectors.' : 'Enthusiasts building a varied shelf.',
    whenToBuy: b.tags.includes('value') ? 'Early in your journey — low risk learning.' : 'When your palate has context from 3–5 baseline bottles.',
    nextBottle: null,
    thenBottle: null,
  };
}

export function getBottleProgression(slug: string): BottleProgression | undefined {
  const b = getBottle(slug);
  if (!b) return undefined;
  const custom = PROGRESSION[slug];
  if (custom) return { slug, ...custom };
  return defaultProgression(b);
}

export function listBottleProgressions(): BottleProgression[] {
  return BOURBON_BOTTLES.map((b) => getBottleProgression(b.slug)!);
}
