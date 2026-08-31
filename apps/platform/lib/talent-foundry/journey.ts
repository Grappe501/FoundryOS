import type {
  CampaignConfig,
  EvidenceItem,
  JourneyStateId,
  OptionalDoorId,
  TalentFoundryFlags,
  TalentFoundrySession,
} from './types';

export const OPTIONAL_DOOR_IDS: OptionalDoorId[] = ['room', 'call', 'breakdown', 'ask'];

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
    runs: {},
    identity: null,
    pathwayId: null,
    missionId: null,
  };
}

export function nextStateOnSpine(stateId: JourneyStateId): JourneyStateId | null {
  const i = P0_SPINE.indexOf(stateId);
  if (i < 0 || i === P0_SPINE.length - 1) return null;
  return P0_SPINE[i + 1] ?? null;
}

function stampEvidence(
  items: Omit<EvidenceItem, 'id' | 'at'>[] | undefined,
  now: Date,
): EvidenceItem[] {
  return (items ?? []).map((item, index) => ({
    ...item,
    id: `${now.getTime().toString(36)}-${index}`,
    at: now.toISOString(),
  }));
}

export function patchSession(
  session: TalentFoundrySession,
  input: {
    stateId?: JourneyStateId;
    evidence?: Omit<EvidenceItem, 'id' | 'at'>[];
    flags?: Partial<TalentFoundryFlags>;
    runs?: TalentFoundrySession['runs'];
  },
  now = new Date(),
): TalentFoundrySession {
  const extras = stampEvidence(input.evidence, now);
  return {
    ...session,
    stateId: input.stateId ?? session.stateId,
    evidence: extras.length ? [...session.evidence, ...extras] : session.evidence,
    flags: input.flags ? { ...session.flags, ...input.flags } : session.flags,
    runs: input.runs ?? session.runs,
  };
}

export function advanceSession(
  session: TalentFoundrySession,
  _campaign: CampaignConfig,
  evidence?: Omit<EvidenceItem, 'id' | 'at'>[],
  flagPatch?: Partial<TalentFoundryFlags>,
  now = new Date(),
): TalentFoundrySession {
  const next = nextStateOnSpine(session.stateId);
  return patchSession(
    session,
    {
      stateId: next ?? session.stateId,
      evidence,
      flags: flagPatch,
    },
    now,
  );
}

export function allOptionalDoorsComplete(completed: string[]): boolean {
  return OPTIONAL_DOOR_IDS.every((id) => completed.includes(id));
}

export function completeOptionalDoor(
  session: TalentFoundrySession,
  doorId: OptionalDoorId,
  now = new Date(),
): TalentFoundrySession {
  const completed = session.flags.optionalDoorsCompleted.includes(doorId)
    ? session.flags.optionalDoorsCompleted
    : [...session.flags.optionalDoorsCompleted, doorId];
  const unlockKey = allOptionalDoorsComplete(completed);
  return patchSession(
    session,
    {
      stateId: unlockKey && !session.flags.keyOne ? 'key_one' : 'optional_doors',
      flags: {
        optionalDoorsCompleted: completed,
        keyOne: unlockKey || session.flags.keyOne,
      },
    },
    now,
  );
}

export function excerptText(value: string, max = 72): string {
  const cleaned = value.replace(/\s+/g, ' ').trim();
  if (!cleaned) return '';
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}

export function migrateSessionState(stateId: JourneyStateId): JourneyStateId {
  if (stateId === 'opening_hold') return 'kelly_video';
  return stateId;
}
