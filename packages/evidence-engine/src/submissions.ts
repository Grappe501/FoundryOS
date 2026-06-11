import type { EvidenceTier } from './tiers';

export type EvidenceVerificationStatus =
  | 'pending'
  | 'verified'
  | 'community_confirmed'
  | 'demonstrated'
  | 'mentored'
  | 'rejected';

export type EvidenceSubmissionType =
  | 'project'
  | 'event'
  | 'rating'
  | 'mentorship'
  | 'certification'
  | 'contribution';

/** User-submitted proof tied to a transformation loop action */
export type EvidenceSubmission = {
  id?: string;
  user_slug: string;
  transformation_loop_id?: string | null;
  action_slug: string;
  action_text: string;
  project_slug?: string | null;
  path_slug?: string | null;
  domain_slug?: string | null;
  tier: EvidenceTier;
  verification_status: EvidenceVerificationStatus;
  title: string;
  description?: string | null;
  evidence_type: EvidenceSubmissionType;
  metadata: Record<string, unknown>;
  trust_weight: number;
  identity_impact?: string | null;
  next_step_guidance?: string | null;
  submitted_at?: string;
  verified_at?: string | null;
};

export type EvidenceVerificationStep = {
  key: string;
  label: string;
  complete: boolean;
};

export type EvidenceGuidance = {
  identity_strength: string;
  progress_signal: string;
  next_step_influence: string;
};
