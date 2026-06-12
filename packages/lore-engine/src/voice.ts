/** PASS-034I — Secret-society voice (insider framing, not curriculum) */

import type { LoreSection } from './types';

export const LORE_VOICE: Record<LoreSection, { label: string; kicker: string }> = {
  heroes: { label: 'The ones who changed everything', kicker: 'Not biographies — obsessions, failures, breakthroughs' },
  legends: { label: 'Stories bourbon fans tell at 2am', kicker: 'Not history — mythology you remember' },
  rivalries: { label: 'Pick a side', kicker: 'People return for years to argue this' },
  mysteries: { label: 'Rabbit holes', kicker: 'The questions that eat a Saturday' },
  debates: { label: 'Settle the argument', kicker: 'No right answers — only camps' },
  pilgrimages: { label: 'Bucket list', kicker: 'Legendary objects waiting at the end' },
  controversies: { label: 'Debates that never die', kicker: 'Still arguing after the third pour' },
  secrets: { label: 'Most people never learn this', kicker: 'Insiders notice — beginners miss it' },
  timeline: { label: 'The story fans eventually stumble into', kicker: 'Wander through time — not a lesson' },
  'legendary-objects': { label: 'Legendary pours & objects', kicker: 'Not reviews — stories attached to glass' },
  'why-matters': { label: 'Why you should care', kicker: 'Care before facts' },
  experience: { label: 'Beyond the liquid', kicker: 'Glass, air, context — what nobody puts on the label' },
};

export const LIVING_MEDIA_VOICE = {
  headline: "What's alive in this world today",
  kicker: 'Not a lesson — a reason to open Foundry on a random Tuesday',
  mystery: 'Bourbon mystery of the day',
  debate: "Today's argument",
  story: 'Legend on rotation',
  history: 'This day in the mythology',
  rabbitHole: 'Random rabbit hole',
  object: 'Legendary object spotlight',
  original: 'Foundry Original',
};
