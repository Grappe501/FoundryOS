/** PASS-034A — Identity ambitions (who you're becoming, not categories) */

export type AmbitionIdentity = {
  slug: string;
  label: string;
  tagline: string;
  relatedWorlds: string[];
};

export const AMBITION_IDENTITIES: AmbitionIdentity[] = [
  { slug: 'entrepreneur', label: 'Entrepreneur', tagline: 'Build something people pay for', relatedWorlds: ['ai-builder', 'financial-independence'] },
  { slug: 'investor', label: 'Investor', tagline: 'Make money work while you sleep', relatedWorlds: ['financial-independence'] },
  { slug: 'public-speaker', label: 'Public Speaker', tagline: 'Move rooms with clarity', relatedWorlds: ['public-speaking'] },
  { slug: 'ai-builder', label: 'AI Builder', tagline: 'Ship automations and products', relatedWorlds: ['ai-builder'] },
  { slug: 'community-leader', label: 'Community Leader', tagline: 'Gather people around a cause', relatedWorlds: ['civic-engagement', 'public-speaking'] },
  { slug: 'pitmaster', label: 'Pitmaster', tagline: 'Feed people with fire and patience', relatedWorlds: ['bbq'] },
  { slug: 'bourbon-steward', label: 'Bourbon Steward', tagline: 'Taste with vocabulary, host with intention', relatedWorlds: ['bourbon'] },
  { slug: 'financially-independent', label: 'Financially Independent Adult', tagline: 'Options, security, freedom', relatedWorlds: ['financial-independence'] },
  { slug: 'nonprofit-founder', label: 'Nonprofit Founder', tagline: 'Organize for impact', relatedWorlds: ['civic-engagement'] },
  { slug: 'software-creator', label: 'Software Creator', tagline: 'Build tools the world uses', relatedWorlds: ['ai-builder'] },
  { slug: 'event-host', label: 'Event Host', tagline: 'Create nights people remember', relatedWorlds: ['bourbon', 'public-speaking', 'bbq'] },
  { slug: 'home-game-host', label: 'Home Game Host', tagline: 'Run the table with confidence', relatedWorlds: ['poker'] },
];

export function getAmbition(slug: string): AmbitionIdentity | undefined {
  return AMBITION_IDENTITIES.find((a) => a.slug === slug);
}
