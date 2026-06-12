import type { ArtifactType } from '@foundry/artifact-engine';

/** Module slug → artifact type per world */
export const MODULE_ARTIFACT_TYPES: Record<string, Record<string, ArtifactType>> = {
  bourbon: {
    'tasting-journal': 'journal',
    'distillery-explorer': 'visit',
    'bourbon-shelf-builder': 'project',
    'food-pairing-guide': 'note',
    'bottle-comparison-tool': 'comparison',
    'flavor-wheel': 'note',
  },
  'ai-builder': {
    'prompt-lab': 'prompt',
    'agent-builder-lab': 'workflow',
    'automation-blueprint-builder': 'workflow',
    'ai-project-gallery': 'project',
    'tool-stack-explorer': 'research',
  },
  'public-speaking': {
    'speech-builder': 'speech',
    'story-arc-lab': 'speech',
    'nerves-coach': 'journal',
    'recording-review-checklist': 'journal',
    'audience-feedback-form': 'note',
  },
  'civic-engagement': {
    'local-government-map': 'research',
    'meeting-tracker': 'note',
    'local-issue-research-worksheet': 'research',
    'civic-action-planner': 'project',
    'public-comment-builder': 'note',
  },
  bbq: {
    'cook-log': 'journal',
    'brisket-timeline-builder': 'project',
    'rub-and-sauce-journal': 'recipe',
    'temperature-tracker': 'note',
    'competition-prep-checklist': 'project',
  },
  poker: {
    'hand-review-journal': 'journal',
    'bankroll-tracker': 'note',
    'tournament-log': 'event',
    'position-strategy-guide': 'research',
    'decision-tree-trainer': 'note',
  },
};

export function resolveModuleArtifactType(worldSlug: string, moduleSlug: string): ArtifactType {
  return MODULE_ARTIFACT_TYPES[worldSlug]?.[moduleSlug] ?? 'note';
}
