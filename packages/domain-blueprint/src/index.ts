export type {
  BlueprintMasteryLevel,
  BlueprintPath,
  BlueprintProject,
  BlueprintCollection,
  BlueprintCommunity,
  BlueprintOutcome,
  DomainBlueprint,
  DomainProofStep,
  DomainTransformationLoop,
  IdentityDomainSnapshot,
} from './types';

export {
  PASS_014_TITLE,
  PASS_014_PASS_GATE,
  PASS_014_PRINCIPLE,
  PASS_014_NOT_DELIVERABLE,
  DEMO_USER_SLUG,
  BOURBON_DOMAIN_SLUG,
  BOURBON_ACTION_SLUG,
  BOURBON_ASSET_SLUG,
  BOURBON_COMMUNITY_SLUG,
  BOURBON_DOMAIN_BLUEPRINT,
  getDomainBlueprint,
  listDomainBlueprints,
  blueprintToRecord,
} from './bourbon-blueprint';

export {
  buildBourbonLoopRecord,
  buildDomainProofChecklist,
  isDomainProofComplete,
  BOURBON_SUCCESS_NARRATIVE,
  type BourbonProofState,
} from './verification';

export type DomainProofKpiSnapshot = {
  domain_blueprints_active: number;
  domain_proofs_complete: number;
};

export function getDomainProofKpiSnapshot(live?: Partial<DomainProofKpiSnapshot>): DomainProofKpiSnapshot {
  return {
    domain_blueprints_active: live?.domain_blueprints_active ?? 0,
    domain_proofs_complete: live?.domain_proofs_complete ?? 0,
  };
}
