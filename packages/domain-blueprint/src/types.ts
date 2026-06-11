/** Reusable domain template — PASS-014 Domain Proof */

export type BlueprintMasteryLevel = {
  slug: string;
  display_name: string;
  order: number;
};

export type BlueprintPath = {
  slug: string;
  display_name: string;
  tier: string;
};

export type BlueprintProject = {
  slug: string;
  display_name: string;
};

export type BlueprintCollection = {
  slug: string;
  display_name: string;
  asset_type: string;
};

export type BlueprintCommunity = {
  slug: string;
  display_name: string;
  community_type: string;
};

export type BlueprintOutcome = {
  slug: string;
  display_name: string;
};

export type DomainBlueprint = {
  slug: string;
  display_name: string;
  vertical_slug: string;
  care_reason: string;
  outcome: BlueprintOutcome;
  mastery_levels: BlueprintMasteryLevel[];
  paths: BlueprintPath[];
  projects: BlueprintProject[];
  collection: BlueprintCollection;
  community: BlueprintCommunity;
  roles: string[];
};

export type DomainProofStep = {
  key: string;
  label: string;
  complete: boolean;
};

export type DomainTransformationLoop = {
  id?: string;
  user_slug: string;
  domain_slug: string;
  goal: string;
  outcome_slug: string | null;
  outcome_display_name: string | null;
  path_slug: string | null;
  path_display_name: string | null;
  project_slug: string | null;
  project_display_name: string | null;
  action_text: string | null;
  action_slug: string | null;
  insight: string | null;
  next_action: string | null;
  next_action_why: string | null;
  loop_complete: boolean;
};

export type IdentityDomainSnapshot = {
  user_slug: string;
  identity_titles: string[];
  domains: Array<{ slug: string; title: string; progress_label?: string }>;
  cross_domain_summary: string | null;
};
