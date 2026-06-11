import type { IdentityDomain } from '../types';
import { POKER_DOMAIN } from './poker';
import { PUBLIC_SPEAKING_DOMAIN } from './public-speaking';
import { CAMPAIGN_MANAGEMENT_DOMAIN } from './campaign-management';
import { MASTER_GARDENER_DOMAIN } from './master-gardener';
import { MAGIC_DOMAIN } from './magic';
import { BOURBON_DOMAIN } from './bourbon';

/** Exemplar identity domains — self-assembly templates */
export const IDENTITY_DOMAIN_CATALOG: IdentityDomain[] = [
  BOURBON_DOMAIN,
  POKER_DOMAIN,
  PUBLIC_SPEAKING_DOMAIN,
  CAMPAIGN_MANAGEMENT_DOMAIN,
  MASTER_GARDENER_DOMAIN,
  MAGIC_DOMAIN,
];

export function getIdentityDomain(slug: string): IdentityDomain | undefined {
  return IDENTITY_DOMAIN_CATALOG.find((d) => d.slug === slug);
}

export function getDomainsByCategory(category: IdentityDomain['category']): IdentityDomain[] {
  return IDENTITY_DOMAIN_CATALOG.filter((d) => d.category === category);
}
