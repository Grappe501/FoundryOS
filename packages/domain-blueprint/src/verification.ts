import type { DomainProofStep, DomainTransformationLoop } from './types';
import {
  BOURBON_ACTION_SLUG,
  BOURBON_DOMAIN_BLUEPRINT,
  BOURBON_DOMAIN_SLUG,
  DEMO_USER_SLUG,
} from './bourbon-blueprint';

export type BourbonProofState = {
  loop: DomainTransformationLoop | null;
  evidenceSubmitted: boolean;
  collectionCreated: boolean;
  communityJoined: boolean;
  reputationUpdated: boolean;
  masteryAssigned: boolean;
  identityUpdated: boolean;
  persisted: boolean;
};

export function buildBourbonLoopRecord(): Omit<DomainTransformationLoop, 'id'> {
  const bp = BOURBON_DOMAIN_BLUEPRINT;
  return {
    user_slug: DEMO_USER_SLUG,
    domain_slug: BOURBON_DOMAIN_SLUG,
    goal: 'Become a Bourbon Enthusiast',
    outcome_slug: bp.outcome.slug,
    outcome_display_name: bp.outcome.display_name,
    path_slug: bp.paths[0]!.slug,
    path_display_name: bp.paths[0]!.display_name,
    project_slug: bp.projects[0]!.slug,
    project_display_name: bp.projects[0]!.display_name,
    action_text: 'Compare 4 bourbons and record notes',
    action_slug: BOURBON_ACTION_SLUG,
    insight:
      'You consistently preferred wheated bourbons — wheated mash bills produce softer, sweeter profiles that resonate with your palate.',
    next_action: "Explore Maker's Mark, Weller, Larceny",
    next_action_why:
      '78% of enthusiasts who preferred wheated profiles expanded successfully through those expressions.',
    loop_complete: true,
  };
}

export function buildDomainProofChecklist(state: BourbonProofState): DomainProofStep[] {
  return [
    {
      key: 'path',
      label: 'Transformation Path',
      complete: Boolean(state.loop?.path_slug),
    },
    {
      key: 'project',
      label: 'Project Assigned',
      complete: Boolean(state.loop?.project_slug),
    },
    {
      key: 'evidence',
      label: 'Evidence Submitted',
      complete: state.evidenceSubmitted,
    },
    {
      key: 'collection',
      label: 'Collection Created',
      complete: state.collectionCreated,
    },
    {
      key: 'community',
      label: 'Community Joined',
      complete: state.communityJoined,
    },
    {
      key: 'reputation',
      label: 'Reputation Updated',
      complete: state.reputationUpdated,
    },
    {
      key: 'mastery',
      label: 'Mastery Assigned',
      complete: state.masteryAssigned,
    },
    {
      key: 'identity',
      label: 'Identity Updated',
      complete: state.identityUpdated,
    },
  ];
}

export function isDomainProofComplete(steps: DomainProofStep[], persisted: boolean): boolean {
  return persisted && steps.every((s) => s.complete);
}

export const BOURBON_SUCCESS_NARRATIVE = {
  start: 'I know nothing about bourbon.',
  end: 'I completed my first tasting. I have a bourbon shelf. I belong to a bourbon community. I earned my first mastery milestone. I know exactly what to do next.',
};
