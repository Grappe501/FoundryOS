import type { IdentityDomain } from '../types';

export const MASTER_GARDENER_DOMAIN: IdentityDomain = {
  slug: 'master-gardener',
  display_name: 'Master Gardener',
  tagline: 'Nearly perfect for Foundry — seasons of growth',
  category: 'hobbies',
  care_reason: 'Gardening is seasonal mastery — soil, harvest, community plots, and teaching compound over years.',
  paths: [
    'road-to-home-gardener',
    'road-to-vegetable-grower',
    'road-to-orchard-steward',
    'road-to-community-garden-leader',
    'road-to-master-gardener',
  ],
  projects: [
    'first-raised-bed',
    'first-harvest',
    'grow-summer-vegetables',
    'build-pollinator-garden',
    'teach-gardening-class',
  ],
  community_types: ['Community gardens', 'Master gardener networks', 'Seed exchanges'],
  legacy_signals: ['Harvests logged', 'Gardeners taught', 'Plots stewarded'],
  collection_types: ['Seed library', 'Harvest log', 'Garden journal'],
  status: 'exemplar',
};
