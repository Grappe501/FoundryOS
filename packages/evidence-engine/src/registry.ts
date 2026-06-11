import type { EvidenceProfile } from './types';

/** The biggest missing registry — prevents badge-system drift */
export const EVIDENCE_PRINCIPLE = {
  chain: 'Identity → requires → Evidence',
  without: 'Expertise becomes self-declared',
  with: 'Expertise becomes earned',
} as const;

export const PASS_011_TITLE = 'Evidence Engine';

export const EVIDENCE_REGISTRY: EvidenceProfile[] = [
  {
    slug: 'public-speaker',
    display_name: 'Public Speaker',
    domain_slug: 'public-speaking',
    role_slug: 'speaker',
    evidence_items: [
      { slug: 'delivered-5-speeches', display_name: 'Delivered 5 speeches', evidence_type: 'project', weight: 90 },
      { slug: 'hosted-workshop', display_name: 'Hosted workshop', evidence_type: 'event', weight: 85 },
      { slug: 'peer-ratings', display_name: 'Received peer ratings', evidence_type: 'rating', weight: 75 },
      { slug: 'mentored-speaker', display_name: 'Mentored speaker', evidence_type: 'mentorship', weight: 95 },
    ],
    status: 'exemplar',
  },
  {
    slug: 'bourbon-steward',
    display_name: 'Bourbon Steward',
    domain_slug: 'bourbon',
    role_slug: 'steward',
    evidence_items: [
      { slug: 'completed-tastings', display_name: 'Completed tastings', evidence_type: 'project', weight: 70 },
      { slug: 'published-reviews', display_name: 'Published reviews', evidence_type: 'contribution', weight: 80 },
      { slug: 'hosted-events', display_name: 'Hosted events', evidence_type: 'event', weight: 88 },
      { slug: 'mentored-members', display_name: 'Mentored members', evidence_type: 'mentorship', weight: 92 },
    ],
    status: 'exemplar',
  },
  {
    slug: 'campaign-strategist',
    display_name: 'Campaign Strategist',
    domain_slug: 'campaign-management',
    role_slug: 'strategist',
    evidence_items: [
      { slug: 'managed-campaign', display_name: 'Managed campaign', evidence_type: 'project', weight: 95 },
      { slug: 'recruited-volunteers', display_name: 'Recruited volunteers', evidence_type: 'contribution', weight: 85 },
      { slug: 'built-field-plan', display_name: 'Built field plan', evidence_type: 'project', weight: 90 },
      { slug: 'trained-organizers', display_name: 'Trained organizers', evidence_type: 'mentorship', weight: 88 },
    ],
    status: 'exemplar',
  },
];

export function getEvidenceProfile(slug: string): EvidenceProfile | undefined {
  return EVIDENCE_REGISTRY.find((p) => p.slug === slug);
}

export function getEvidenceForDomain(domainSlug: string): EvidenceProfile[] {
  return EVIDENCE_REGISTRY.filter((p) => p.domain_slug === domainSlug);
}
