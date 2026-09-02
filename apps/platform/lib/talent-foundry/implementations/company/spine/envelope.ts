import type { SpineStageId } from './stages';
import { SPINE_STAGE_IDS } from './stages';

export type StageProgress = 'locked' | 'open' | 'complete';

export type ArtifactTrack = 'build' | 'explain' | 'investigate' | 'design' | 'operate' | 'grow' | 'organize';

export type ArtifactDraft = {
  track: ArtifactTrack;
  body: string;
  finished: boolean;
  chosenAt: string;
  submittedAt: string | null;
};

export type RememberFields = {
  firstName: string;
  lastName: string;
  email: string;
  location?: string;
  schoolOrWork?: string;
};

export type RememberChoice = 'remember_me' | 'keep_exploring';

export type CollaborateTurn = {
  partnerId: string;
  promptId: string;
  sent: string;
  needBack: string;
  finished: boolean;
  openedAt: string;
  submittedAt: string | null;
};

export type RespondStance = 'incorporate' | 'hold' | 'ask';

export type RespondTurn = {
  noteId: string;
  stance: RespondStance | null;
  body: string;
  finished: boolean;
  openedAt: string;
  submittedAt: string | null;
};

export type DeliverOutcome = 'complete' | 'abandon';

export type DeliverTurn = {
  barId: string;
  outcome: DeliverOutcome | null;
  body: string;
  openedAt: string;
  submittedAt: string | null;
};

export type MultiplyTurn = {
  promptId: string;
  newerId: string;
  help: string;
  unblocks: string;
  finished: boolean;
  openedAt: string;
  submittedAt: string | null;
};

export type LeadTurn = {
  constraintId: string;
  keep: string;
  assign: string;
  cut: string;
  finished: boolean;
  openedAt: string;
  submittedAt: string | null;
};

export type BuildTurn = {
  surfaceId: string;
  changed: string;
  left: string;
  finished: boolean;
  openedAt: string;
  submittedAt: string | null;
};

export type EarnTurn = {
  agreementId: string;
  gateKind: 'paid_project' | 'internship' | 'employment';
  work: string;
  accepted: boolean;
  finished: boolean;
  openedAt: string;
  submittedAt: string | null;
};

export type OwnTurn = {
  conversationId: string;
  subject: string;
  entered: boolean;
  finished: boolean;
  openedAt: string;
  submittedAt: string | null;
};

export type ReturnVisit = {
  challengeId: string;
  gapMs: number | null;
  body: string;
  finished: boolean;
  returnedAt: string;
  submittedAt: string | null;
};

export type HumanGateKind =
  | 'cohort_invite'
  | 'interview'
  | 'paid_project'
  | 'internship'
  | 'employment'
  | 'leadership'
  | 'ownership_conversation'
  | 'real_work_access';

export type HumanGateRecord = {
  kind: HumanGateKind;
  at: string;
  actor: string;
  note?: string;
};

/** One time they left the bench to find something out. No score. */
export type InquiryTurn = {
  id: string;
  question: string;
  finding: string;
  changed: string;
  rejected: string;
  tools: string[];
  leftAt: string;
  returnedAt: string | null;
  broughtAt: string | null;
};

/** Voluntary. Attached to work, not a profile badge. */
export type ToolReceipt = {
  id: string;
  at: string;
  tool: string;
  usedFor: string;
  about: 'pulse' | 'draft' | 'made' | 'room';
};

export type InquiryState = {
  current: InquiryTurn | null;
  history: InquiryTurn[];
  receipts: ToolReceipt[];
};

export function emptyInquiry(): InquiryState {
  return { current: null, history: [], receipts: [] };
}

/** Uniform layer over every spine stage. Stubs carry the same shape. */
export type SpineEnvelope = {
  spineStage: SpineStageId;
  progress: Record<SpineStageId, StageProgress>;
  remember: RememberFields | null;
  rememberChoice: RememberChoice | null;
  /** True after Remember Me. Token/table come later — no account yet. */
  placeEligible: boolean;
  artifactTrack: ArtifactTrack | null;
  artifact: ArtifactDraft | null;
  returnVisit: ReturnVisit | null;
  collaborate: CollaborateTurn | null;
  respond: RespondTurn | null;
  deliver: DeliverTurn | null;
  multiply: MultiplyTurn | null;
  lead: LeadTurn | null;
  build: BuildTurn | null;
  earn: EarnTurn | null;
  own: OwnTurn | null;
  gates: HumanGateRecord[];
  cohortId: string | null;
  inquiry: InquiryState;
};

export function emptyProgress(): Record<SpineStageId, StageProgress> {
  const progress = {} as Record<SpineStageId, StageProgress>;
  for (const id of SPINE_STAGE_IDS) {
    progress[id] = id === 'discover' ? 'open' : 'locked';
  }
  return progress;
}

export function createEnvelope(): SpineEnvelope {
  return {
    spineStage: 'discover',
    progress: emptyProgress(),
    remember: null,
    rememberChoice: null,
    placeEligible: false,
    artifactTrack: null,
    artifact: null,
    returnVisit: null,
    collaborate: null,
    respond: null,
    deliver: null,
    multiply: null,
    lead: null,
    build: null,
    earn: null,
    own: null,
    gates: [],
    cohortId: null,
    inquiry: emptyInquiry(),
  };
}
