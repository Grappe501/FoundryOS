import { ensureBourbonDomainProof } from '@foundry/db';
import {
  BOURBON_DOMAIN_BLUEPRINT,
  BOURBON_SUCCESS_NARRATIVE,
  isDomainProofComplete,
  PASS_014_PASS_GATE,
  PASS_014_PRINCIPLE,
} from '@foundry/domain-blueprint';

export async function loadPass014Verification() {
  const result = await ensureBourbonDomainProof();
  const { blueprint, loop, identity, checklist, complete, persisted, error } = result;

  return {
    blueprint: blueprint ?? BOURBON_DOMAIN_BLUEPRINT,
    loop,
    identity,
    checklist,
    complete: complete && isDomainProofComplete(checklist, persisted),
    narrative: BOURBON_SUCCESS_NARRATIVE,
    passGate: PASS_014_PASS_GATE,
    principle: PASS_014_PRINCIPLE,
    db: {
      persisted,
      error: error ?? null,
      tables: [
        'domain_blueprints',
        'domain_transformation_loops',
        'evidence_submissions',
        'personal_knowledge_assets',
        'community_instances',
        'reputation_records',
        'mastery_assignments',
        'identity_domain_snapshots',
      ],
    },
  };
}
