export type ReputationScope = 'platform' | 'domain';

export type ReputationRecord = {
  id?: string;
  user_slug: string;
  evidence_submission_id: string;
  domain_slug: string | null;
  scope: ReputationScope;
  reputation_title: string;
  trust_weight: number;
  identity_impact: string | null;
  calculated_at?: string;
};

export type ReputationVerificationStep = {
  key: string;
  label: string;
  complete: boolean;
};

export type EvidenceInput = {
  id?: string;
  user_slug: string;
  action_slug: string;
  domain_slug: string | null;
  tier: string;
  verification_status: string;
  trust_weight: number;
  title: string;
};
