export type JourneyStateId =
  | 'entry'
  | 'mystery'
  | 'change_prompt'
  | 'acknowledgment'
  | 'people_rule'
  | 'willingness'
  | 'opening_hold'
  | 'kelly_video'
  | 'volunteer_commitment'
  | 'lead_challenge'
  | 'scenario_brief'
  | 'scenario_volunteers'
  | 'scenario_consequences'
  | 'scenario_revision'
  | 'optional_doors'
  | 'door_room'
  | 'door_call'
  | 'door_breakdown'
  | 'door_ask'
  | 'key_one'
  | 'identify'
  | 'youre_in'
  | 'opportunity'
  | 'pathway'
  | 'mission_one'
  | 'handoff'
  | 'layer2_operator'
  | 'key_two'
  | 'layer3_leader'
  | 'people_rule_close';

export type EvidenceKind = 'text' | 'choice' | 'decision' | 'revision' | 'identity' | 'mission';

export type EvidenceDimension =
  | 'leadership_readiness'
  | 'passion'
  | 'availability'
  | 'willingness_to_volunteer'
  | 'skill_breadth'
  | 'interpersonal'
  | 'trust_discretion'
  | 'written_communication'
  | 'verbal_communication'
  | 'logic_judgment'
  | 'delegation'
  | 'people_development'
  | 'big_picture'
  | 'leadership_desire'
  | 'follow_through';

export type EvidenceItem = {
  id: string;
  at: string;
  stateId: JourneyStateId;
  kind: EvidenceKind;
  label: string;
  value: unknown;
  dimensions?: EvidenceDimension[];
};

export type VolunteerCommitment = 'yes' | 'limited' | 'not_now';

export type IdentityRecord = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  zip: string;
  startWhen: string;
  submissionId?: string;
  userId?: string;
  workflowIntakeId?: string;
};

export type TalentFoundryFlags = {
  willingToAct: boolean | null;
  volunteerCommitment: VolunteerCommitment | null;
  internPathwayEligible: boolean;
  requiredScenarioComplete: boolean;
  optionalDoorsCompleted: string[];
  keyOne: boolean;
  keyTwo: boolean;
  identified: boolean;
  missionOneComplete: boolean;
  layer2Enabled: boolean;
  layer3Enabled: boolean;
};

export type TalentFoundrySession = {
  v: 1;
  campaignId: string;
  stateId: JourneyStateId;
  startedAt: string;
  evidence: EvidenceItem[];
  flags: TalentFoundryFlags;
  identity: IdentityRecord | null;
  pathwayId: string | null;
  missionId: string | null;
};

export type WillingnessChoice = {
  id: string;
  label: string;
  willingToAct: boolean;
};

export type CampaignConfig = {
  id: string;
  sessionKey: string;
  implementedThrough: JourneyStateId;
  willingnessChoices: WillingnessChoice[];
  flags: Pick<TalentFoundryFlags, 'layer2Enabled' | 'layer3Enabled'>;
};
