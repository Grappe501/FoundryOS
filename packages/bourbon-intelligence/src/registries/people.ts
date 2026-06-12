import type { PersonRecord } from '../types';
import { BUFFALO_TRACE_HARLEN, WILD_TURKEY_OFFICIAL, sv } from '../sources/citations';

/**
 * People registry — sourced facts only. No invented biographies.
 * Full profile pages require profile_publishable + leader slot verification.
 */
export const PEOPLE_REGISTRY: PersonRecord[] = [
  {
    slug: 'harlen-wheatley',
    name: sv('Harlen Wheatley', 'verified', 'verified', [BUFFALO_TRACE_HARLEN]),
    roles: [
      {
        role: 'master_distiller',
        producer_slug: 'buffalo-trace',
        confidence: 'producer_disclosed',
        citations: [BUFFALO_TRACE_HARLEN],
      },
    ],
    facts: [
      {
        claim: 'Master Distiller at Buffalo Trace Distillery',
        confidence: 'producer_disclosed',
        content_source: 'verified',
        citations: [BUFFALO_TRACE_HARLEN],
      },
      {
        claim: 'Named Master Distiller in 2005',
        confidence: 'producer_disclosed',
        content_source: 'verified',
        citations: [BUFFALO_TRACE_HARLEN],
      },
    ],
    leader_slot_id: 'buffalo-trace-master',
    profile_publishable: true,
    related_producer_slugs: ['buffalo-trace'],
    related_bottle_slugs: ['buffalo-trace', 'eagle-rare', 'weller-special-reserve'],
  },
  {
    slug: 'eddie-russell',
    name: sv('Eddie Russell', 'verified', 'verified', [WILD_TURKEY_OFFICIAL]),
    roles: [
      {
        role: 'master_distiller',
        producer_slug: 'wild-turkey',
        confidence: 'producer_disclosed',
        citations: [WILD_TURKEY_OFFICIAL],
      },
    ],
    facts: [
      {
        claim: 'Master Distiller at Wild Turkey — distillation and aging leadership publicly described on official Wild Turkey materials',
        confidence: 'producer_disclosed',
        content_source: 'verified',
        citations: [WILD_TURKEY_OFFICIAL],
      },
    ],
    leader_slot_id: 'wild-turkey-master',
    profile_publishable: true,
    related_producer_slugs: ['wild-turkey'],
    related_bottle_slugs: ['wild-turkey-101', 'russells-reserve-10'],
  },
  {
    slug: 'jimmy-russell',
    name: sv('Jimmy Russell', 'commonly_reported', 'editorial', [WILD_TURKEY_OFFICIAL]),
    roles: [
      {
        role: 'master_distiller',
        producer_slug: 'wild-turkey',
        confidence: 'commonly_reported',
        citations: [WILD_TURKEY_OFFICIAL],
      },
    ],
    facts: [
      {
        claim: 'Long-tenured Wild Turkey distiller emeritus figure — career span widely documented in official and trade sources',
        confidence: 'commonly_reported',
        content_source: 'editorial',
        citations: [WILD_TURKEY_OFFICIAL],
      },
    ],
    profile_publishable: false,
    related_producer_slugs: ['wild-turkey'],
    related_bottle_slugs: ['wild-turkey-101'],
  },
  {
    slug: 'bruce-russell',
    name: sv('Bruce Russell', 'commonly_reported', 'editorial'),
    roles: [
      {
        role: 'family_operator',
        producer_slug: 'wild-turkey',
        confidence: 'commonly_reported',
      },
    ],
    facts: [
      {
        claim: 'Next-generation Russell family releases referenced in recent industry coverage — verify each release independently',
        confidence: 'commonly_reported',
        content_source: 'editorial',
        citations: [],
      },
    ],
    profile_publishable: false,
    related_producer_slugs: ['wild-turkey'],
  },
];

export function getPerson(slug: string): PersonRecord | undefined {
  return PEOPLE_REGISTRY.find((p) => p.slug === slug);
}

export function peopleForProducer(producerSlug: string): PersonRecord[] {
  return PEOPLE_REGISTRY.filter(
    (p) =>
      p.related_producer_slugs?.includes(producerSlug) ||
      p.roles.some((r) => r.producer_slug === producerSlug),
  );
}
