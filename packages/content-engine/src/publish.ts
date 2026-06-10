import type { ContentSource } from './types';

/** Default threshold — pages below this stay draft (no thin content) */
export const DEFAULT_MINIMUM_PUBLISH_SCORE = 70;

export function canPublishContent(
  contentScore: number,
  minimumScore = DEFAULT_MINIMUM_PUBLISH_SCORE
): boolean {
  return contentScore >= minimumScore;
}

export const CONTENT_SOURCES: ContentSource[] = [
  'generated',
  'community',
  'editorial',
  'verified',
];

/**
 * Example content layers per entity (reserved — not built yet):
 * Buffalo Trace → Generated Overview, Community Reviews, Editorial Guide, Verified Facts
 */
export function contentLayersForEntity(entityDisplayName: string): Array<{
  source: ContentSource;
  label: string;
}> {
  return [
    { source: 'generated', label: `Generated Overview — ${entityDisplayName}` },
    { source: 'community', label: `Community Reviews — ${entityDisplayName}` },
    { source: 'editorial', label: `Editorial Guide — ${entityDisplayName}` },
    { source: 'verified', label: `Verified Facts — ${entityDisplayName}` },
  ];
}
