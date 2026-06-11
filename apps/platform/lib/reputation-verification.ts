import { ensureDemoReputationRecord } from '@foundry/db';
import {
  buildReputationVerificationChecklist,
  isReputationVerificationComplete,
  PASS_013_CHAIN,
} from '@foundry/reputation-engine';

export async function loadPass013ReputationVerification() {
  const { evidence, record, persisted, error } = await ensureDemoReputationRecord();

  const checklist = buildReputationVerificationChecklist(evidence, record);
  const complete = isReputationVerificationComplete(checklist) && persisted;

  return {
    evidence,
    record,
    checklist,
    complete,
    chain: PASS_013_CHAIN,
    db: {
      persisted,
      error: error ?? null,
      tables: ['reputation_records'],
    },
  };
}
