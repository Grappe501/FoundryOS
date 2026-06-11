export {
  PASS_010_EXECUTION_MODE,
  VISION_LOCKED,
  PASS_010_AVOID,
  PASS_010_EXECUTION_QUESTION,
  PASS_010_EXIT_CRITERIA,
  PASS_010_PRODUCTION_ROUTES,
} from './execution';

export {
  TRANSFORMATION_LOOP_COMPLETION_RATE,
  MEANINGFUL_PROGRESS_EVENTS,
  MEANINGFUL_PROGRESS_EVENT_EXEMPLARS,
  getLoopKpiSnapshot,
  type LoopKpiSnapshot,
  type MeaningfulProgressEvent,
} from './kpis';

export {
  DEMO_USER,
  DEMO_EVIDENCE,
  DEMO_REFLECTIONS,
  DEMO_INSIGHT,
  DEMO_NEXT_ACTION,
  DEMO_USER_EXIT_MESSAGE,
  DEMO_ACTION,
} from './demo-user';

export {
  buildDemoUserLoopRecord,
  getDemoUserProofSummary,
} from './demo-proof';

export {
  PASS_010_VERIFICATION_TITLE,
  buildVerificationChecklist,
  isLoopVerificationComplete,
  type VerificationStep,
} from './verification';

export type { TransformationLoopRecord } from './types';

export {
  PUBLIC_SPEAKER_PROOF,
  initiatePublicSpeakerLoop,
  completePublicSpeakerLoop,
  runPublicSpeakerProofDemo,
  type PublicSpeakerLoopPlan,
  type LoopCompletionInput,
  type LoopCompletionResult,
  type LoopStage,
} from './public-speaker-loop';
