import type { DomainPurpose } from './types';

/** Purpose Engine — why does this matter to me? */
export const PURPOSE_QUESTION = 'Why does this matter to me?';

export const DOMAIN_PURPOSE_EXAMPLES: DomainPurpose[] = [
  {
    domain_slug: 'calculus',
    domain_display_name: 'Calculus',
    wikipedia_answer: 'Study derivatives and integrals.',
    foundry_answer:
      'Calculus helps explain motion, growth, change, optimization, and prediction. It powers engineering, physics, finance, AI, medicine, and space travel.',
  },
  {
    domain_slug: 'public-speaking',
    domain_display_name: 'Public Speaking',
    wikipedia_answer: 'Learn speeches.',
    foundry_answer:
      'Influence people. Lead organizations. Teach ideas. Build movements.',
  },
  {
    domain_slug: 'campaign-management',
    domain_display_name: 'Campaign Management',
    wikipedia_answer: 'Run campaigns.',
    foundry_answer:
      'Help communities organize. Help citizens participate. Help leaders emerge.',
  },
];

export function getDomainPurpose(domainSlug: string): DomainPurpose | undefined {
  return DOMAIN_PURPOSE_EXAMPLES.find((p) => p.domain_slug === domainSlug);
}
