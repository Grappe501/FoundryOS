/** PASS-032 — Growth Flywheel UI constants */

export const FLYWHEEL_FACTORIES = [
  'World Factory',
  'Marketing Factory',
  'Learning Engine',
  'Revenue Engine',
] as const;

export const FLYWHEEL_STRATEGIC_LOCK = {
  no_new_domains: true,
  no_new_academies: true,
  no_new_glossaries: true,
  focus: 'Depth on live worlds first — rank new paths on the incoming list',
  detail:
    'No ad hoc world builds. Chess is a ranked prototype (#8). Add worlds to incoming-worlds.ts with acquisition avenues before engineering depth.',
} as const;

export const JANUARY_2027_MARKET_SIGNALS = [
  { label: 'Active testers', target: '100', note: 'Learning lane scaled carefully' },
  { label: 'Paying users', target: '25', note: 'Prove market — not vanity signups' },
  { label: 'MRR', target: '$250', note: 'Early revenue proof before Jan 2027 scale' },
  { label: 'Domains with proven retention', target: '3', note: 'Return rate + mission completion' },
  { label: 'Domain with proven conversion', target: '1', note: 'Paid conversion on one world' },
] as const;
