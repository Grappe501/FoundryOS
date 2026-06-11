import type { AcademicDomain } from '../types';
import { CALCULUS_DOMAIN } from './calculus';
import { PHYSICS_DOMAIN } from './physics';
import { COMPUTER_SCIENCE_DOMAIN } from './computer-science';
import { HISTORY_DOMAIN } from './history';
import { CHEMISTRY_DOMAIN } from './chemistry';

export const ACADEMIC_DOMAIN_CATALOG: AcademicDomain[] = [
  CALCULUS_DOMAIN,
  PHYSICS_DOMAIN,
  CHEMISTRY_DOMAIN,
  HISTORY_DOMAIN,
  COMPUTER_SCIENCE_DOMAIN,
];

/** Full academic registry — PASS-009+ expansion */
export const ACADEMIC_DOMAIN_EXAMPLES = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Literature',
  'Grammar', 'Writing', 'Economics', 'Political Science', 'Psychology',
  'Philosophy', 'Computer Science',
];

export function getAcademicDomain(slug: string): AcademicDomain | undefined {
  return ACADEMIC_DOMAIN_CATALOG.find((d) => d.slug === slug);
}
