import { ensureAiBuilderDomainProof } from '@foundry/db';
import {
  AI_BUILDER_DOMAIN_BLUEPRINT,
  AI_BUILDER_FIRST_PROJECT,
  AI_BUILDER_SUCCESS_NARRATIVE,
  AI_BUILDER_TOMORROW_HOOK,
  isDomainProofOperational,
  PASS_016_PASS_GATE,
  PASS_016_PRINCIPLE,
  PASS_016_TITLE,
} from '@foundry/domain-blueprint';

export async function loadPass016Verification() {
  const result = await ensureAiBuilderDomainProof();
  const { blueprint, loop, identity, checklist, complete, persisted, error } = result;

  return {
    blueprint: blueprint ?? AI_BUILDER_DOMAIN_BLUEPRINT,
    loop,
    identity,
    checklist,
    complete: complete && isDomainProofOperational(checklist, persisted),
    narrative: AI_BUILDER_SUCCESS_NARRATIVE,
    tomorrowHook: AI_BUILDER_TOMORROW_HOOK,
    firstProject: AI_BUILDER_FIRST_PROJECT,
    passGate: PASS_016_PASS_GATE,
    principle: PASS_016_PRINCIPLE,
    title: PASS_016_TITLE,
    db: {
      persisted,
      error: error ?? null,
    },
  };
}
