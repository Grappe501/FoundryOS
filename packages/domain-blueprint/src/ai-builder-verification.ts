import type { DomainProofStep, DomainTransformationLoop } from './types';
import {
  AI_BUILDER_ACTION_SLUG,
  AI_BUILDER_DOMAIN_BLUEPRINT,
  AI_BUILDER_DOMAIN_SLUG,
} from './ai-builder-blueprint';
import { DEMO_USER_SLUG } from './bourbon-blueprint';

export type DomainProofState = {
  loop: DomainTransformationLoop | null;
  evidenceSubmitted: boolean;
  collectionCreated: boolean;
  communityJoined: boolean;
  reputationUpdated: boolean;
  masteryAssigned: boolean;
  identityUpdated: boolean;
  persisted: boolean;
};

export function buildAiBuilderLoopRecord(): Omit<DomainTransformationLoop, 'id'> {
  const bp = AI_BUILDER_DOMAIN_BLUEPRINT;
  return {
    user_slug: DEMO_USER_SLUG,
    domain_slug: AI_BUILDER_DOMAIN_SLUG,
    goal: 'Become an AI Builder',
    outcome_slug: bp.outcome.slug,
    outcome_display_name: bp.outcome.display_name,
    path_slug: bp.paths[0]!.slug,
    path_display_name: bp.paths[0]!.display_name,
    project_slug: bp.projects[0]!.slug,
    project_display_name: bp.projects[0]!.display_name,
    action_text: 'Use AI to solve a real problem and document what you built',
    action_slug: AI_BUILDER_ACTION_SLUG,
    insight:
      'You solved a scheduling problem with a simple AI workflow — small shipped projects beat endless tutorial consumption.',
    next_action: 'Build your first automation',
    next_action_why:
      '83% of AI Builders who complete their first project ship an automation within two weeks.',
    loop_complete: true,
  };
}

export function buildDomainProofChecklistFromState(state: DomainProofState): DomainProofStep[] {
  return [
    { key: 'path', label: 'Transformation Path', complete: Boolean(state.loop?.path_slug) },
    { key: 'project', label: 'Project Assigned', complete: Boolean(state.loop?.project_slug) },
    { key: 'evidence', label: 'Evidence Submitted', complete: state.evidenceSubmitted },
    { key: 'collection', label: 'Collection Created', complete: state.collectionCreated },
    { key: 'community', label: 'Community Joined', complete: state.communityJoined },
    { key: 'reputation', label: 'Reputation Updated', complete: state.reputationUpdated },
    { key: 'mastery', label: 'Mastery Assigned', complete: state.masteryAssigned },
    { key: 'identity', label: 'Identity Updated', complete: state.identityUpdated },
  ];
}

export function isDomainProofOperational(steps: DomainProofStep[], persisted: boolean): boolean {
  return persisted && steps.every((s) => s.complete);
}
