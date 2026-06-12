import type { WorldEventDefinition } from '../types';

type Seed = Omit<WorldEventDefinition, 'world_slug'> & { world_slug?: string };

function ev(world: string, e: Seed): WorldEventDefinition {
  return { ...e, world_slug: world };
}

export const BOURBON_EVENTS: WorldEventDefinition[] = [
  ev('bourbon', {
    event_id: 'bourbon-mystery-weller',
    event_type: 'daily_mystery',
    title: 'Why is Weller impossible to find?',
    short_hook: 'Allocation, hype, and wheated mash — not a single villain.',
    deep_description:
      'Weller scarcity is a story about distributor math, fan obsession, and a wheated profile that tastes expensive even when it is not. The ghost is not one clerk hiding bottles — it is a system that rewards rarity narratives.',
    why_it_matters: 'Understanding allocation saves you from shame-spirals and helps you host honest conversations about what is worth chasing.',
    primary_action: { label: 'Open Weller case', href: '/bourbon/detective/weller-ghost' },
    related_missions: ['first-tasting'],
    related_collections: ['wheated-explorer'],
    related_atlas_terms: ['allocation', 'wheated-bourbon'],
    user_interaction_type: 'view',
  }),
  ev('bourbon', {
    event_id: 'bourbon-rivalry-bt-heaven',
    event_type: 'weekly_rivalry',
    title: 'Buffalo Trace vs Heaven Hill',
    short_hook: 'Two Kentucky giants — different campuses, different default pours.',
    deep_description:
      'Buffalo Trace owns allocation mythology and campus tourism. Heaven Hill owns BiB value and Bardstown smoke. This week: which house matches your shelf story?',
    why_it_matters: 'Producer literacy beats label loyalty — knowing houses collapses aisle chaos.',
    primary_action: { label: 'Producer Atlas', href: '/bourbon/producers' },
    related_collections: ['distillery-pilgrim'],
    user_interaction_type: 'vote',
    rivalry_options: [
      { id: 'buffalo-trace', label: 'Buffalo Trace' },
      { id: 'heaven-hill', label: 'Heaven Hill' },
    ],
  }),
  ev('bourbon', {
    event_id: 'bourbon-spotlight-wt101',
    event_type: 'spotlight',
    title: 'Wild Turkey 101',
    short_hook: 'High-rye workhorse — spice, value, and Jimmy Russell legacy.',
    deep_description:
      '101 is the bottle that teaches proof without pretension. It is not flashy; it is honest about what bourbon can be at a fair price.',
    why_it_matters: 'Spotlights like this anchor your shelf — a daily drinker that calibrates your palate.',
    primary_action: { label: 'Compare pours', href: '/bourbon/compare' },
    related_atlas_terms: ['high-rye-bourbon', 'proof'],
    user_interaction_type: 'view',
  }),
  ev('bourbon', {
    event_id: 'bourbon-debate-age',
    event_type: 'debate',
    title: 'Is age overrated?',
    short_hook: 'Older is not always better — oak can bully, NAS can dazzle.',
    deep_description:
      'Age statements promise transparency but NAS blends can outperform tired barrels. The debate is not anti-age — it is pro-context.',
    why_it_matters: 'Hosts who understand this stop apologizing for young pours and stop overpaying for numbers.',
    primary_action: { label: 'Read myths', href: '/bourbon/myths' },
    related_atlas_terms: ['age-statement', 'non-age-stated'],
    user_interaction_type: 'respond',
    debate_options: [
      { id: 'age-matters', label: 'Age tells a real story' },
      { id: 'age-overrated', label: 'Age is often overrated' },
    ],
  }),
  ev('bourbon', {
    event_id: 'bourbon-challenge-bib',
    event_type: 'challenge',
    title: 'Taste one bottled-in-bond bourbon',
    short_hook: '100 proof, one season, four years — the 1897 promise on a modern shelf.',
    deep_description:
      'Log a BiB pour this week. Read the label. Name the DSP if you can. BiB is a baseline for honest whiskey.',
    why_it_matters: 'Challenges turn vocabulary into evidence — your portfolio remembers.',
    primary_action: { label: 'BiB detective case', href: '/bourbon/detective/bib-guarantee' },
    related_missions: ['first-tasting'],
    related_collections: ['bottled-in-bond-collection'],
    related_atlas_terms: ['bottled-in-bond'],
    related_community_prompt: 'Post your BiB label read — what did the fine print say?',
    user_interaction_type: 'complete',
    collector_action: { action_type: 'event_challenge_completed', action_id: 'bourbon-challenge-bib' },
  }),
  ev('bourbon', {
    event_id: 'bourbon-rabbit-stitzel',
    event_type: 'rabbit_hole',
    title: 'What happened to Stitzel-Weller?',
    short_hook: 'The ghost distillery behind Weller mythology.',
    deep_description:
      'Closed doors, sold brands, and juice that lived on under other roofs — Stitzel-Weller is bourbon archaeology.',
    why_it_matters: 'Rabbit holes teach sourcing literacy — labels outlive stills.',
    primary_action: { label: 'Wander lore', href: '/bourbon/lore' },
    user_interaction_type: 'save',
  }),
  ev('bourbon', {
    event_id: 'bourbon-legend-pappy23',
    event_type: 'legendary_object',
    title: 'Pappy 23',
    short_hook: 'Religion in a bottle — myth, secondary market, and the pour behind the hype.',
    deep_description:
      'Whether you have tasted it or not, Pappy 23 shaped modern bourbon culture — allocation, envy, and the story of age.',
    why_it_matters: 'Legendary objects explain why people behave strangely in liquor stores.',
    primary_action: { label: 'Economy page', href: '/bourbon/economy' },
    related_collections: ['wheated-explorer'],
    user_interaction_type: 'view',
  }),
  ev('bourbon', {
    event_id: 'bourbon-history-prohibition-rx',
    event_type: 'history',
    title: 'Prohibition medicinal whiskey permits',
    short_hook: 'When doctors wrote prescriptions for pints.',
    deep_description:
      'Six distilleries kept legal production; pharmacies became front doors. The loophole shaped who survived to sell you bourbon today.',
    why_it_matters: 'History explains modern labeling instincts and nostalgia marketing.',
    primary_action: { label: 'Origins map', href: '/bourbon/origins' },
    related_atlas_terms: ['prohibition', 'medicinal-whiskey'],
    user_interaction_type: 'view',
  }),
];
