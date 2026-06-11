export type MasteryAssignment = {
  id?: string;
  user_slug: string;
  evidence_submission_id: string;
  reputation_record_id: string | null;
  domain_slug: string;
  path_slug: string;
  path_display_name: string;
  milestone_slug: string;
  milestone_label: string;
  mastery_title: string;
  identity_impact: string | null;
  community_instance_slug: string | null;
  community_recognition_updated: boolean;
  assigned_at?: string;
};

export type MasteryVerificationStep = {
  key: string;
  label: string;
  complete: boolean;
};

export type ReputationRef = {
  id?: string;
  reputation_title: string;
  trust_weight: number;
};
