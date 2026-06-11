import { ensureDemoEvidenceSubmission } from '@foundry/db';
import {
  buildDemoEvidenceSubmission,
  buildEvidenceVerificationChecklist,
  deriveEvidenceGuidance,
  isEvidenceVerificationComplete,
  type EvidenceSubmission,
} from '@foundry/evidence-engine';

export async function loadPass011Verification() {
  const built = buildDemoEvidenceSubmission();
  const { row, persisted, error, loopLinked } = await ensureDemoEvidenceSubmission((loopId) =>
    buildDemoEvidenceSubmission(loopId)
  );

  const submission: EvidenceSubmission = row ?? { ...built, id: undefined };
  const guidance = deriveEvidenceGuidance(submission);
  const linked = loopLinked || Boolean(submission.transformation_loop_id) || !persisted;
  const checklist = buildEvidenceVerificationChecklist(submission, linked);
  const complete = isEvidenceVerificationComplete(checklist);

  return {
    submission,
    guidance,
    checklist,
    complete,
    loopLinked: linked,
    db: {
      persisted,
      error: error ?? null,
      table: 'evidence_submissions',
    },
  };
}
