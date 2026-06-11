/**
 * The Foundry Equation — simplify the entire company.
 * Everything else is implementation.
 */
export const FOUNDRY_EQUATION = [
  {
    phase: 'potential',
    label: 'Potential',
    question: 'What do I want to become?',
    implements: ['Outcomes', 'Life Journeys', 'Purpose'],
  },
  {
    phase: 'capability',
    label: 'Capability',
    question: 'What knowledge, skills, habits, and experience do I need?',
    implements: ['Knowledge', 'Mastery', 'Academy', 'Paths', 'Domains'],
  },
  {
    phase: 'agency',
    label: 'Agency',
    question: 'Can I take meaningful action?',
    implements: ['Projects', 'Next Best Step', 'Momentum', 'Transformation Impact'],
  },
  {
    phase: 'contribution',
    label: 'Contribution',
    question: 'How do I use those capabilities in the real world?',
    implements: ['Community', 'Roles', 'Identity', 'Evidence'],
  },
  {
    phase: 'legacy',
    label: 'Legacy',
    question: 'How do I help others and leave something behind?',
    implements: ['Mentorship', 'Legacy', 'Transformation Data'],
  },
] as const;

/** One sentence — works for everyone */
export const FOUNDRY_MISSION =
  'Foundry helps people become who they are capable of becoming.';

export const FOUNDRY_EQUATION_FLOW = 'Potential → Capability → Agency → Contribution → Legacy';

export const AGENCY_BRIDGE =
  'Agency is the bridge between knowing and doing. Without it, people consume. With it, people transform.';
