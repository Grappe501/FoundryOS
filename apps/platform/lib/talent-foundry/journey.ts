import type {
  CampaignConfig,
  EvidenceItem,
  JourneyStateId,
  OptionalDoorId,
  TalentFoundryFlags,
  TalentFoundrySession,
} from './types';
import { nextVisitState } from './visit';

export const OPTIONAL_DOOR_IDS: OptionalDoorId[] = ['room', 'call', 'breakdown', 'ask'];

const P0_SPINE: JourneyStateId[] = [
  'entry',
  'change_prompt',
  'people_rule',
  'kelly_video',
  'intent',
  'paid_brief',
  'lead_challenge',
  'scenario_volunteers',
  'scenario_consequences',
  'optional_doors',
  'identify',
  'youre_in',
  'opportunity',
  'availability',
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
  visitIntent: null,
  firstVisitComplete: false,
  layer2Deferred: false,
  layer3Deferred: false,
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
    conversion: {
      paidInterest: null,
      weekly: null,
      times: [],
      littleRock: null,
      driving: null,
      travel: null,
      remote: null,
      campus: '',
      student: false,
      leadership: null,
      areas: [],
    },
    pathwayId: null,
    missionId: null,
    operator: null,
    leader: null,
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
    identity?: TalentFoundrySession['identity'];
    conversion?: Partial<TalentFoundrySession['conversion']>;
    pathwayId?: string | null;
    missionId?: string | null;
    operator?: TalentFoundrySession['operator'];
    leader?: TalentFoundrySession['leader'];
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
    identity: input.identity !== undefined ? input.identity : session.identity,
    conversion: input.conversion ? { ...session.conversion, ...input.conversion } : session.conversion,
    pathwayId: input.pathwayId !== undefined ? input.pathwayId : session.pathwayId,
    missionId: input.missionId !== undefined ? input.missionId : session.missionId,
    operator: input.operator !== undefined ? input.operator : session.operator,
    leader: input.leader !== undefined ? input.leader : session.leader,
  };
}

export function advanceSession(
  session: TalentFoundrySession,
  _campaign: CampaignConfig,
  evidence?: Omit<EvidenceItem, 'id' | 'at'>[],
  flagPatch?: Partial<TalentFoundryFlags>,
  now = new Date(),
): TalentFoundrySession {
  const next = nextVisitState(session);
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
  return patchSession(
    session,
    {
      stateId: session.flags.keyOne ? 'key_one' : 'identify',
      flags: {
        optionalDoorsCompleted: completed,
        keyOne: session.flags.keyOne,
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

const RECOVERABLE_STATES = new Set<string>([
  ...P0_SPINE,
  'key_one',
  'door_room',
  'door_call',
  'door_breakdown',
  'door_ask',
  'opening_hold',
  'still_in',
  'layer2_offer',
  'layer2_operator',
  'key_two',
  'layer3_offer',
  'layer3_leader',
  'people_rule_close',
  'mystery',
  'acknowledgment',
  'willingness',
  'volunteer_commitment',
  'scenario_brief',
  'scenario_revision',
  'pathway',
]);

export function migrateSessionState(stateId: JourneyStateId): JourneyStateId {
  if (stateId === 'opening_hold') return 'kelly_video';
  if (stateId === 'mystery') return 'change_prompt';
  if (stateId === 'acknowledgment') return 'people_rule';
  if (stateId === 'willingness') return 'kelly_video';
  if (stateId === 'volunteer_commitment') return 'intent';
  if (stateId === 'scenario_brief') return 'lead_challenge';
  if (stateId === 'scenario_revision') return 'optional_doors';
  if (stateId === 'pathway') return 'mission_one';
  if (!RECOVERABLE_STATES.has(stateId)) return 'entry';
  return stateId;
}
