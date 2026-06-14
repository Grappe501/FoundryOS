/** Level 3 — themed shelf presets (5–8 bottles with roles) */

import type { ShelfRole } from './shelf-slots';

export type ThemeBottle = {
  bottleSlug: string;
  role: ShelfRole;
  rationale: string;
};

export type ShelfTheme = {
  id: string;
  title: string;
  tagline: string;
  budgetBand: string;
  group: 'value' | 'education' | 'host' | 'craft' | 'premium';
  bottles: ThemeBottle[];
  gapPrompt: string;
  academySlug: string;
};

export const SHELF_THEMES: ShelfTheme[] = [
  {
    id: 'value-under-40',
    title: 'Under-$40 value all-stars',
    tagline: 'Four staples that teach mash, proof, and BiB — no hype tax.',
    budgetBand: '$90–$120 total',
    group: 'value',
    academySlug: 'value-ladder-under-40',
    gapPrompt: 'Missing wheated or BiB? Add Larceny or Evan BiB.',
    bottles: [
      { bottleSlug: 'evan-williams-black', role: 'daily', rationale: 'Traditional value baseline under $20.' },
      { bottleSlug: 'wild-turkey-101', role: 'learning', rationale: 'High-rye at 101 — proof discipline.' },
      { bottleSlug: 'larceny', role: 'learning', rationale: 'Wheated fork vs Maker\'s homework.' },
      { bottleSlug: 'evan-williams-bib', role: 'bib-anchor', rationale: 'BiB transparency at value price.' },
      { bottleSlug: 'four-roses-yellow', role: 'backup', rationale: 'Gentle high-rye daily alternate.' },
    ],
  },
  {
    id: 'proof-ladder',
    title: 'Proof ladder shelf',
    tagline: '80 → 90 → 100 → barrel proof — feel heat without brand chaos.',
    budgetBand: '$120–$160 total',
    group: 'education',
    academySlug: 'vertical-thinking-shelf',
    gapPrompt: 'Add water note on highest proof only.',
    bottles: [
      { bottleSlug: 'old-forester-86', role: 'daily', rationale: '86 proof house baseline.' },
      { bottleSlug: 'buffalo-trace', role: 'learning', rationale: '90 proof NAS polish.' },
      { bottleSlug: 'knob-creek-9', role: 'learning', rationale: '100 proof + age statement.' },
      { bottleSlug: 'rare-breed', role: 'splurge', rationale: 'Barrel proof Turkey — tiny pours.' },
    ],
  },
  {
    id: 'mashbill-education',
    title: 'Mash bill education row',
    tagline: 'Traditional · high-rye · wheated — same session, three forks.',
    budgetBand: '$100–$130 total',
    group: 'education',
    academySlug: 'shelf-themes-that-teach',
    gapPrompt: 'Run Level 2 mash bill triangle before buying duplicates.',
    bottles: [
      { bottleSlug: 'buffalo-trace', role: 'learning', rationale: 'Traditional corn-forward baseline.' },
      { bottleSlug: 'wild-turkey-101', role: 'learning', rationale: 'High-rye spice reference.' },
      { bottleSlug: 'makers-mark', role: 'host', rationale: 'Wheated guest gateway.' },
      { bottleSlug: 'bulleit-bourbon', role: 'backup', rationale: 'High-rye alternate profile.' },
    ],
  },
  {
    id: 'distillery-tour',
    title: 'Kentucky distillery tour',
    tagline: 'BT · Heaven Hill · Beam · Turkey — geography of house style.',
    budgetBand: '$130–$170 total',
    group: 'education',
    academySlug: 'craft-vs-major-houses',
    gapPrompt: 'Add one Tennessee or craft for process contrast.',
    bottles: [
      { bottleSlug: 'buffalo-trace', role: 'daily', rationale: 'Frankfort campus gateway.' },
      { bottleSlug: 'evan-williams-black', role: 'daily', rationale: 'Heaven Hill value story.' },
      { bottleSlug: 'knob-creek-9', role: 'learning', rationale: 'Beam age + proof ladder.' },
      { bottleSlug: 'wild-turkey-101', role: 'learning', rationale: 'Lawrenceburg spice DNA.' },
      { bottleSlug: 'woodford-reserve', role: 'host', rationale: 'Pot still texture — giftable.' },
    ],
  },
  {
    id: 'category-shelf',
    title: 'Category shelf — bourbon · rye · TN',
    tagline: 'Legal lines on one shelf — grain vs process vs proof.',
    budgetBand: '$100–$130 total',
    group: 'education',
    academySlug: 'shelf-themes-that-teach',
    gapPrompt: 'Close Level 2 category triangle if labels still blur.',
    bottles: [
      { bottleSlug: 'buffalo-trace', role: 'daily', rationale: 'Bourbon baseline.' },
      { bottleSlug: 'rittenhouse-rye', role: 'category', rationale: 'BiB rye — cocktail + sip.' },
      { bottleSlug: 'jack-daniels-old-no-7', role: 'category', rationale: 'Tennessee process reference.' },
      { bottleSlug: 'bulleit-rye', role: 'learning', rationale: 'Same brand bourbon vs rye pair.' },
    ],
  },
  {
    id: 'bib-anchor-row',
    title: 'BiB anchor row',
    tagline: 'Bond rules as shelf shortcuts — 100 proof transparency.',
    budgetBand: '$80–$110 total',
    group: 'value',
    academySlug: 'bib-on-the-shelf',
    gapPrompt: 'Run detective case bib-guarantee after pouring.',
    bottles: [
      { bottleSlug: 'evan-williams-bib', role: 'bib-anchor', rationale: 'Value BiB bourbon.' },
      { bottleSlug: 'rittenhouse-rye', role: 'bib-anchor', rationale: 'Value BiB rye.' },
      { bottleSlug: 'wilderness-trail-bib', role: 'craft', rationale: 'Craft BiB NCF contrast.' },
      { bottleSlug: 'old-overholt-bib', role: 'backup', rationale: 'Second rye BiB anchor.' },
    ],
  },
  {
    id: 'craft-vs-major',
    title: 'Craft vs major houses',
    tagline: 'Process literacy — grain-to-glass next to BT baseline.',
    budgetBand: '$140–$190 total',
    group: 'craft',
    academySlug: 'craft-vs-major-houses',
    gapPrompt: 'Visit one craft campus map before splurge craft.',
    bottles: [
      { bottleSlug: 'buffalo-trace', role: 'daily', rationale: 'Major NAS baseline.' },
      { bottleSlug: 'green-river-kentucky-straight', role: 'craft', rationale: 'Value craft straight.' },
      { bottleSlug: 'new-riff-bourbon', role: 'craft', rationale: 'BiB craft discipline.' },
      { bottleSlug: 'wilderness-trail-bib', role: 'learning', rationale: 'Wheated craft BiB.' },
      { bottleSlug: 'peerless-bourbon', role: 'splurge', rationale: 'Splurge craft — blind test required.' },
    ],
  },
  {
    id: 'host-friendly',
    title: 'Host-friendly shelf',
    tagline: 'Skeptics welcome — gentle proof, three gateways, no lecture.',
    budgetBand: '$90–$120 total',
    group: 'host',
    academySlug: 'daily-vs-occasion',
    gapPrompt: 'Pair with Level 2 host night skeptic three kit.',
    bottles: [
      { bottleSlug: 'makers-mark', role: 'host', rationale: 'Wheated soft opener.' },
      { bottleSlug: 'buffalo-trace', role: 'host', rationale: '"What bourbon tastes like" baseline.' },
      { bottleSlug: 'four-roses-yellow', role: 'backup', rationale: 'Low-proof friendly option.' },
      { bottleSlug: 'woodford-reserve', role: 'splurge', rationale: 'Giftable step-up for impress pour.' },
    ],
  },
  {
    id: 'daily-only',
    title: 'Daily drinkers only',
    tagline: 'No trophies — five repeat buys that earn shelf space.',
    budgetBand: '$120–$150 total',
    group: 'value',
    academySlug: 'daily-vs-occasion',
    gapPrompt: 'Remove one bottle you haven\'t opened in 90 days.',
    bottles: [
      { bottleSlug: 'evan-williams-black', role: 'daily', rationale: 'Under $20 workhorse.' },
      { bottleSlug: 'wild-turkey-101', role: 'daily', rationale: 'Spice daily driver.' },
      { bottleSlug: 'buffalo-trace', role: 'daily', rationale: 'Corn-sweet NAS repeat.' },
      { bottleSlug: '1792-small-batch', role: 'backup', rationale: 'High-rye value alternate.' },
      { bottleSlug: 'larceny', role: 'backup', rationale: 'Wheated daily option.' },
    ],
  },
  {
    id: 'wheated-row',
    title: 'Wheated row',
    tagline: 'Wheat slot across major and craft — texture comparison.',
    budgetBand: '$110–$160 total',
    group: 'education',
    academySlug: 'shelf-themes-that-teach',
    gapPrompt: 'Blind wheated four from Level 2 before adding Weller hunt.',
    bottles: [
      { bottleSlug: 'makers-mark', role: 'daily', rationale: 'Major wheated baseline.' },
      { bottleSlug: 'larceny', role: 'learning', rationale: 'Heaven Hill wheated fork.' },
      { bottleSlug: 'weller-special-reserve', role: 'splurge', rationale: 'BT wheated tree — MSRP not secondary.' },
      { bottleSlug: 'wilderness-trail-bib', role: 'craft', rationale: 'Craft wheated BiB.' },
    ],
  },
  {
    id: 'high-rye-row',
    title: 'High-rye row',
    tagline: 'Spice forward — not rye whiskey, but rye-heavy bourbon.',
    budgetBand: '$100–$140 total',
    group: 'education',
    academySlug: 'value-ladder-under-40',
    gapPrompt: 'Add Rittenhouse to separate bourbon-spice from rye category.',
    bottles: [
      { bottleSlug: 'wild-turkey-101', role: 'daily', rationale: 'Textbook high-rye bourbon.' },
      { bottleSlug: 'bulleit-bourbon', role: 'learning', rationale: 'Front-loaded rye spice.' },
      { bottleSlug: 'four-roses-single-barrel', role: 'splurge', rationale: 'Single recipe personality.' },
      { bottleSlug: '1792-small-batch', role: 'backup', rationale: 'Barton high-rye value.' },
    ],
  },
  {
    id: 'splurge-worth-it',
    title: 'Splurge worth-it shelf',
    tagline: 'Value anchor + three splurge candidates — blind rank homework.',
    budgetBand: '$180–$250 total',
    group: 'premium',
    academySlug: 'building-without-hype',
    gapPrompt: 'Run Level 2 splurge blind before keeping ultra tier.',
    bottles: [
      { bottleSlug: 'buffalo-trace', role: 'daily', rationale: '$30 jury anchor — must beat this blind.' },
      { bottleSlug: 'eagle-rare', role: 'splurge', rationale: 'Age statement major tier.' },
      { bottleSlug: 'blue-run-8-year', role: 'splurge', rationale: 'Craft age transparency.' },
      { bottleSlug: 'eh-taylor-small-batch', role: 'splurge', rationale: 'BiB collector tier.' },
    ],
  },
];

export const THEME_GROUPS: { id: ShelfTheme['group']; label: string }[] = [
  { id: 'value', label: 'Value — under $40 staples' },
  { id: 'education', label: 'Education — mash, proof, category' },
  { id: 'host', label: 'Host — guest-friendly' },
  { id: 'craft', label: 'Craft — process literacy' },
  { id: 'premium', label: 'Premium — splurge discipline' },
];

export function getShelfTheme(id: string): ShelfTheme | undefined {
  return SHELF_THEMES.find((t) => t.id === id);
}
