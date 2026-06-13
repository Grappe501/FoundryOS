/**
 * Unified people resolver — depth bios + intelligence registry without duplicate slugs.
 */
import { getPerson as getIntelPerson, PEOPLE_REGISTRY, type PersonRecord } from '@foundry/bourbon-intelligence';
import {
  getBourbonPerson,
  listBourbonPeople,
  peopleForProducer as depthPeopleForProducer,
} from '../bourbon-depth/people';
import type { BourbonPerson } from '../bourbon-depth/types';

function intelToDisplayPerson(record: PersonRecord): BourbonPerson {
  const roleTitle = record.roles.map((r) => r.role.replace(/_/g, ' ')).join(' · ');
  const producerSlugs =
    record.related_producer_slugs ?? record.roles.map((r) => r.producer_slug).filter(Boolean) as string[];

  return {
    slug: record.slug,
    name: record.name.value,
    title: roleTitle || 'Bourbon industry',
    producerSlugs: [...new Set(producerSlugs)],
    era: record.profile_publishable ? 'Verified profile' : 'Reference slot',
    hook: record.facts[0]?.claim ?? `${record.name.value} — sourced role in bourbon production.`,
    originStory: record.facts.map((f) => f.claim).join(' '),
    careerHighlights: record.facts.slice(0, 3).map((f, i) => ({
      year: String(2000 + i),
      event: f.claim,
    })),
    philosophy: record.facts[1]?.claim ?? record.facts[0]?.claim ?? '',
    legacy: record.facts[record.facts.length - 1]?.claim ?? '',
    distinguishingFacts: record.facts.map((f) => f.claim),
    relatedBottleSlugs: record.related_bottle_slugs,
  };
}

export function getUnifiedPerson(slug: string): BourbonPerson | undefined {
  return getBourbonPerson(slug) ?? (getIntelPerson(slug) ? intelToDisplayPerson(getIntelPerson(slug)!) : undefined);
}

export function listAllPeopleSlugs(): string[] {
  const slugs = new Set<string>();
  for (const p of listBourbonPeople()) slugs.add(p.slug);
  for (const p of PEOPLE_REGISTRY) slugs.add(p.slug);
  return [...slugs];
}

/** Producer masters — depth profiles first, then verified intelligence slots. */
export function mastersForProducer(producerSlug: string): BourbonPerson[] {
  const bySlug = new Map<string, BourbonPerson>();

  for (const p of depthPeopleForProducer(producerSlug)) {
    bySlug.set(p.slug, p);
  }

  for (const record of PEOPLE_REGISTRY) {
    const linked =
      record.related_producer_slugs?.includes(producerSlug) ||
      record.roles.some((r) => r.producer_slug === producerSlug);
    if (!linked || bySlug.has(record.slug)) continue;
    if (record.profile_publishable || record.leader_slot_id) {
      bySlug.set(record.slug, intelToDisplayPerson(record));
    }
  }

  return [...bySlug.values()];
}

export function isKnownPersonSlug(slug: string): boolean {
  return Boolean(getUnifiedPerson(slug));
}
