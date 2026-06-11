import type { TransformationTemplateSlug } from './templates';

/**
 * Foundry DNA Record — machine-readable blueprint per domain.
 * Enables consistent generation of thousands of domains.
 */
export type FoundryDNARecord = {
  domain: string;
  display_name: string;
  template: TransformationTemplateSlug;
  outcomes: string[];
  roles: string[];
  paths: string[];
  projects: string[];
  communities: string[];
  entities?: string[];
  knowledge?: string[];
  mentorship?: string[];
  legacy?: string[];
  journeys?: string[];
};

export const PUBLIC_SPEAKING_DNA: FoundryDNARecord = {
  domain: 'public-speaking',
  display_name: 'Public Speaking',
  template: 'leadership',
  journeys: ['become-community-leader'],
  outcomes: ['become-better-speaker', 'become-better-leader'],
  roles: ['speaker', 'trainer', 'mentor'],
  paths: ['road-to-confident-speaker', 'road-to-keynote-speaker'],
  projects: ['deliver-first-speech', 'community-presentation'],
  entities: ['speech-structure', 'opening-hooks', 'rhetorical-devices'],
  knowledge: ['opening-hooks', 'audience-analysis', 'story-structure'],
  communities: ['speaker-circle'],
  mentorship: ['coach-new-speaker'],
  legacy: ['helped-50-complete-path'],
};

/** Academic exemplar — outcomes pull domains together, not isolated subjects */
export const AI_BUILDER_DNA: FoundryDNARecord = {
  domain: 'ai-builder',
  display_name: 'Road to AI Builder',
  template: 'academic',
  journeys: ['become-successful-entrepreneur', 'become-research-scientist'],
  outcomes: ['become-ai-builder'],
  roles: ['builder', 'architect', 'mentor'],
  paths: ['road-to-ai-builder'],
  projects: ['build-first-deck', 'build-crm', 'api-integration'],
  entities: ['computer-science', 'programming', 'databases', 'statistics', 'prompting', 'architecture'],
  knowledge: ['algorithms', 'system-design', 'llm-patterns'],
  communities: ['ai-builders-circle'],
  mentorship: ['mentor-new-builders'],
  legacy: ['open-source-contributions'],
};

export const DNA_REGISTRY: FoundryDNARecord[] = [PUBLIC_SPEAKING_DNA, AI_BUILDER_DNA];

export function getDomainDNA(domainSlug: string): FoundryDNARecord | undefined {
  return DNA_REGISTRY.find((d) => d.domain === domainSlug);
}
