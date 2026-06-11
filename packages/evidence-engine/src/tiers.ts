/**
 * Evidence Tiers — strengthen trust, not police people (PASS-011).
 */
export type EvidenceTier =
  | 'claimed'
  | 'verified'
  | 'community_confirmed'
  | 'demonstrated'
  | 'mentored';

export type EvidenceTierDefinition = {
  tier: EvidenceTier;
  label: string;
  description: string;
  example: string;
  trust_weight: number;
};

export const EVIDENCE_TIERS: EvidenceTierDefinition[] = [
  {
    tier: 'claimed',
    label: 'Claimed',
    description: 'Self-reported transformation activity',
    example: 'I gave a speech.',
    trust_weight: 20,
  },
  {
    tier: 'verified',
    label: 'Verified',
    description: 'System or organizer confirmed the event occurred',
    example: 'Event recorded.',
    trust_weight: 50,
  },
  {
    tier: 'community_confirmed',
    label: 'Community Confirmed',
    description: 'Peers attested to the outcome',
    example: 'Peers confirmed.',
    trust_weight: 70,
  },
  {
    tier: 'demonstrated',
    label: 'Demonstrated',
    description: 'Artifact or outcome exists and is inspectable',
    example: 'Artifact exists.',
    trust_weight: 85,
  },
  {
    tier: 'mentored',
    label: 'Mentored',
    description: 'Others learned from this person\'s transformation',
    example: 'Others learned from it.',
    trust_weight: 95,
  },
];

export const EVIDENCE_TIERS_PRINCIPLE =
  'Not for policing people — for strengthening trust.';
