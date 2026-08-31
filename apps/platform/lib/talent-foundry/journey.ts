import type { CampaignConfig, EvidenceItem, JourneyStateId, TalentFoundryFlags, TalentFoundrySession } from './types';

const P0_SPINE: JourneyStateId[] = [
  'entry',
  'mystery',
  'change_prompt',
  'acknowledgment',
  'people_rule',
  'willingness',
  'kelly_video',
  'volunteer_commitment',
  'lead_challenge',
  'scenario_brief',
  'scenario_volunteers',
  'scenario_consequences',
  'scenario_revision',
  'optional_doors',
  'identify',
  'youre_in',
  'opportunity',
  'pathway',
  'mission_one',
  'handoff',
];

const DEFAULT_FLAGS: TalentFoundryFlags = {
  willingToAct: null,
  volunteerCommitment: null,
  internPathwayEligible: true,
  requiredScenarioComplete: false,
  optionalDoorsCompleted: [],
  keyOne: false,
  keyTwo: false,
  identified: false,
  missionOneComplete: false,
  layer2Enabled: false,
  layer3Enabled: false,
};

export function createSession(campaign: CampaignConfig, now = new Date()): TalentFoundrySession {
  return {
    v: 1,
    campaignId: campaign.id,
    stateId: 'entry',
    startedAt: now.toISOString(),
    evidence: [],
    flags: {
      ...DEFAULT_FLAGS,
      layer2Enabled: campaign.flags.layer2Enabled,
      layer3Enabled: campaign.flags.layer3Enabled,
    },
    identity: null,
    pathwayId: null,
    missionId: null,
  };
}

export function nextStateOnSpine(stateId: JourneyStateId): JourneyStateId | null {
  const i = P0_SPINE.indexOf(stateId);
  if (i < 0 || i === P0_SPINE.length - 1) return null;
  return P0_SPINE[i + 1];
}

export function canAdvanceTo(from: JourneyStateId, to: JourneyStateId, session: TalentFoundrySession): boolean {
  if (to === from) return true;
  if (to === 'identify' && !session.flags.requiredScenarioComplete) return false;
  if (to === 'key_one' && !session.flags.keyOne) return false;
  return true;
}

export function advanceSession(
  session: TalentFoundrySession,
  campaign: CampaignConfig,
  evidence?: Omit<EvidenceItem, 'id' | 'at'>[],
  flagPatch?: Partial<TalentFoundryFlags>,
  now = new Date(),
): TalentFoundrySession {
  const next = nextStateOnSpine(session.stateId);
  const implementedThroughIndex = P0_SPINE.indexOf(campaign.implementedThrough);
  const nextIndex = next ? P0_SPINE.indexOf(next) : -1;
  const stateId =
    next && nextIndex >= 0 && nextIndex <= implementedThroughIndex
      ? next
      : session.stateId === campaign.implementedThrough
        ? 'opening_hold'
        : session.stateId;

  const extras: EvidenceItem[] = (evidence ?? []).map((item, index) => ({
    ...item,
    id: `${now.getTime().toString(36)}-${index}`,
    at: now.toISOString(),
  }));

  return {
    ...session,
    stateId,
    evidence: extras.length ? [...session.evidence, ...extras] : session.evidence,
    flags: flagPatch ? { ...session.flags, ...flagPatch } : session.flags,
  };
}

export function excerptText(value: string, max = 72): string {
  const cleaned = value.replace(/\s+/g, ' ').trim();
  if (!cleaned) return '';
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}

export function isImplementedState(stateId: JourneyStateId, campaign: CampaignConfig): boolean {
  const through = P0_SPINE.indexOf(campaign.implementedThrough);
  const current = P0_SPINE.indexOf(stateId);
  return current >= 0 && current <= through;
}
