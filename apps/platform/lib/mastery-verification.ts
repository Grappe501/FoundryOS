import { ensureDemoMasteryAssignment } from '@foundry/db';
import {
  buildMasteryVerificationChecklist,
  isMasteryVerificationComplete,
  PASS_013_MASTERY_EXIT,
} from '@foundry/mastery-engine';
import { PASS_013_CHAIN } from '@foundry/reputation-engine';

export async function loadPass013MasteryVerification() {
  const { evidence, reputationCalculated, assignment, persisted, error } =
    await ensureDemoMasteryAssignment();

  const evidenceLinked = Boolean(evidence?.id);
  const checklist = buildMasteryVerificationChecklist(
    evidenceLinked,
    reputationCalculated,
    assignment
  );
  const complete = isMasteryVerificationComplete(checklist) && persisted;

  return {
    evidence,
    assignment,
    checklist,
    complete,
    chain: PASS_013_CHAIN,
    db: {
      persisted,
      error: error ?? null,
      tables: ['mastery_assignments', 'reputation_records', 'community_members'],
    },
  };
}

export { PASS_013_MASTERY_EXIT };
