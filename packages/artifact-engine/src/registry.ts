import type { ArtifactType } from './types';

export const ARTIFACT_TYPES: ArtifactType[] = [
  'review',
  'note',
  'recommendation',
  'visit',
  'event',
  'speech',
  'project',
  'recipe',
  'prompt',
  'workflow',
  'research',
  'comparison',
  'journal',
  'collection_entry',
];

/** Example artifact shapes per world — types only, not fabricated user records */
export const WORLD_ARTIFACT_EXAMPLES: Record<string, string[]> = {
  bourbon: [
    'First blind tasting',
    'WT101 review',
    'Buffalo Trace distillery visit',
    'Bottled-in-Bond comparison',
    'First hosted tasting',
  ],
  'ai-builder': [
    'Homework assistant',
    'Prompt library',
    'Workflow',
    'Agent',
    'Automation',
    'Business idea',
  ],
  'public-speaking': [
    'First speech',
    'Toastmasters session',
    'Fundraiser speech',
    'Wedding toast',
    'Recorded presentation',
  ],
  'civic-engagement': [
    'Candidate forum attended',
    'Volunteer shift',
    'Petition completed',
    'Town hall notes',
    'Research brief',
  ],
  bbq: ['Cook log', 'Recipe', 'Competition entry', 'Temp log'],
  poker: ['Session log', 'Hand analysis', 'Bankroll entry', 'Tournament record'],
};

export function artifactTypesForWorld(worldSlug: string): ArtifactType[] {
  switch (worldSlug) {
    case 'bourbon':
      return ['review', 'note', 'recommendation', 'visit', 'event', 'comparison', 'journal', 'collection_entry'];
    case 'ai-builder':
      return ['prompt', 'workflow', 'project', 'research', 'note', 'recommendation'];
    case 'public-speaking':
      return ['speech', 'note', 'event', 'journal', 'recommendation'];
    case 'civic-engagement':
      return ['visit', 'event', 'research', 'note', 'project', 'journal'];
    case 'bbq':
      return ['recipe', 'note', 'event', 'journal', 'comparison'];
    case 'poker':
      return ['journal', 'research', 'note', 'comparison', 'event'];
    default:
      return ['note', 'journal', 'project', 'research'];
  }
}

export function semanticRolesForType(type: ArtifactType): string[] {
  const base = ['artifact', 'identity_signal', 'atlas_connection'];
  if (type === 'review' || type === 'recommendation') {
    return [...base, 'review', 'recommendation_source', 'reputation_source', 'collection_item'];
  }
  if (type === 'collection_entry') return [...base, 'collection_item'];
  if (type === 'event') return [...base, 'reputation_source'];
  return base;
}
