import type { ConsequenceChain } from '../types';

function actionNode(
  id: string,
  world: string,
  label: string,
  description?: string,
): ConsequenceChain['nodes'][0] {
  return { id, world_slug: world, label, kind: 'action', description };
}

/** Weller mystery → allocation economics → wheated explorer → steward */
export const BOURBON_WELLER_CHAIN: ConsequenceChain = {
  id: 'bourbon-weller-mystery',
  title: 'Weller Allocation Mystery',
  trigger: { world_slug: 'bourbon', action_type: 'detective_case_closed', action_id: 'weller-ghost' },
  nodes: [
    actionNode('weller-ghost', 'bourbon', 'Weller Mystery Solved', 'Closed the ghost bottle case'),
    {
      id: 'debate-weller-makers',
      world_slug: 'bourbon',
      label: "Debate: Is Weller Better Than Maker's?",
      kind: 'unlock_debate',
      target_id: 'weller-vs-makers',
      href: '/bourbon/lore#lore-debates',
      description: 'Pick a side — wheated allocation vs daily drinker',
    },
    {
      id: 'object-weller-antique',
      world_slug: 'bourbon',
      label: 'Legendary Object: Weller Antique 107',
      kind: 'unlock_legendary_object',
      target_id: 'weller-antique-107',
      href: '/my-journey',
      description: 'Named treasure — the hunt target worth knowing',
    },
    {
      id: 'collector-wheated-explorer',
      world_slug: 'bourbon',
      label: 'Wheated Explorer (+1)',
      kind: 'unlock_collector_progress',
      target_id: 'wheated-explorer',
      href: '/bourbon/portfolio',
      description: 'Progress toward the wheated shelf story',
      metadata: { item_id: 'weller-case' },
    },
    {
      id: 'collector-blind-detective',
      world_slug: 'bourbon',
      label: 'Blind Tasting Detective (+1)',
      kind: 'unlock_collector_progress',
      target_id: 'blind-tasting-detective',
      href: '/bourbon/portfolio',
      metadata: { item_id: 'detective-case' },
    },
    {
      id: 'rabbit-allocation-economics',
      world_slug: 'bourbon',
      label: 'Allocation Economics Rabbit Hole',
      kind: 'unlock_rabbit_hole',
      href: '/bourbon/economy',
      description: 'MSRP, lottery, secondary — the hunt math',
    },
    {
      id: 'mentor-allocation-interest',
      world_slug: 'bourbon',
      label: 'Mentor remembers allocation interest',
      kind: 'mentor_memory',
      description: 'You seem interested in allocation economics.',
    },
    {
      id: 'identity-explorer-signal',
      world_slug: 'bourbon',
      label: 'Identity: Explorer signal',
      kind: 'identity_signal',
      target_id: 'explorer',
      description: 'Moving from newcomer toward enthusiast',
    },
    {
      id: 'path-bourbon-steward',
      world_slug: 'bourbon',
      label: 'Bourbon Steward path unlocked',
      kind: 'unlock_path',
      target_id: 'bourbon-steward',
      href: '/bourbon/academy',
      description: 'Long arc — host, teach, steward',
    },
  ],
  edges: [
    { from: 'weller-ghost', to: 'debate-weller-makers' },
    { from: 'debate-weller-makers', to: 'object-weller-antique' },
    { from: 'object-weller-antique', to: 'collector-wheated-explorer' },
    { from: 'collector-wheated-explorer', to: 'collector-blind-detective' },
    { from: 'collector-blind-detective', to: 'rabbit-allocation-economics' },
    { from: 'rabbit-allocation-economics', to: 'mentor-allocation-interest' },
    { from: 'mentor-allocation-interest', to: 'identity-explorer-signal' },
    { from: 'identity-explorer-signal', to: 'path-bourbon-steward' },
  ],
};

export const BOURBON_BIB_CHAIN: ConsequenceChain = {
  id: 'bourbon-bib-guarantee',
  title: 'BiB Guarantee Case',
  trigger: { world_slug: 'bourbon', action_type: 'detective_case_closed', action_id: 'bib-guarantee' },
  nodes: [
    actionNode('bib-guarantee', 'bourbon', 'BiB Case Closed'),
    {
      id: 'collector-bib-explorer',
      world_slug: 'bourbon',
      label: 'Bottled-in-Bond Collection (+1)',
      kind: 'unlock_collector_progress',
      target_id: 'bottled-in-bond-collection',
      href: '/bourbon/portfolio',
      metadata: { item_id: 'bib-case' },
    },
    {
      id: 'debate-bib-worth',
      world_slug: 'bourbon',
      label: 'Debate: Is BiB Still Relevant?',
      kind: 'unlock_debate',
      target_id: 'bib-still-matters',
      href: '/bourbon/lore#lore-debates',
    },
    {
      id: 'mentor-bib-transparency',
      world_slug: 'bourbon',
      label: 'Mentor: transparency mindset',
      kind: 'mentor_memory',
      description: 'You trust labels that tell the truth — BiB is your shortcut.',
    },
  ],
  edges: [
    { from: 'bib-guarantee', to: 'collector-bib-explorer' },
    { from: 'collector-bib-explorer', to: 'debate-bib-worth' },
    { from: 'debate-bib-worth', to: 'mentor-bib-transparency' },
  ],
};

export const BOURBON_DETECTIVE_CHAINS: ConsequenceChain[] = [BOURBON_WELLER_CHAIN, BOURBON_BIB_CHAIN];
