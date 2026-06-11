import type { IdentityDomain } from '../types';

export const BOURBON_DOMAIN: IdentityDomain = {
  slug: 'bourbon',
  display_name: 'Bourbon',
  tagline: 'From curious pour to recognized steward',
  category: 'communities',
  care_reason: 'Bourbon is a lifelong identity domain — taste, history, community, and mentorship compound over decades.',
  paths: [
    'road-to-bourbon-enthusiast',
    'road-to-bourbon-collector',
    'road-to-bourbon-historian',
    'road-to-bourbon-steward',
    'road-to-bourbon-master',
  ],
  projects: ['blind-tasting-night', 'build-bourbon-shelf', 'visit-10-distilleries', 'host-bourbon-club'],
  community_types: ['Bourbon societies', 'Tasting circles', 'Collector groups'],
  legacy_signals: ['Paths completed', 'Tastings hosted', 'Members mentored', 'Guides written'],
  collection_types: ['Bottle shelf', 'Tasting notes', 'Distillery visits'],
  status: 'exemplar',
};
