import type { SpineStageId } from './stages';
import { SPINE_STAGE_IDS } from './stages';

export type StageProgress = 'locked' | 'open' | 'complete';

export type ArtifactTrack = 'build' | 'explain' | 'investigate' | 'design' | 'operate' | 'grow' | 'organize';

export type RememberFields = {
  firstName: string;
  lastName: string;
  email: string;
  location?: string;
  schoolOrWork?: string;
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

/** Uniform layer over every spine stage. Stubs carry the same shape. */
export type SpineEnvelope = {
  spineStage: SpineStageId;
  progress: Record<SpineStageId, StageProgress>;
  remember: RememberFields | null;
  artifactTrack: ArtifactTrack | null;
  gates: HumanGateRecord[];
  cohortId: string | null;
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
    artifactTrack: null,
    gates: [],
    cohortId: null,
  };
}
