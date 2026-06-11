import type { KnowledgeAssetItem, PersonalKnowledgeAsset } from './types';

export const DEMO_USER_SLUG = 'demo-user';
export const DEMO_ASSET_SLUG = 'my-speech-library';

/** Demo User — My Speech Library (PASS-010/011 public speaking path) */
export function buildDemoKnowledgeAsset(): Omit<PersonalKnowledgeAsset, 'id'> {
  return {
    user_slug: DEMO_USER_SLUG,
    slug: DEMO_ASSET_SLUG,
    display_name: 'My Speech Library',
    description:
      'Documented speeches, ratings, and tasting notes for the road to confident speaker — a Personal Knowledge Asset.',
    domain_slug: 'public-speaking',
    asset_type: 'speech_library',
    identity_impact:
      'Aspiring Public Speaker — documented repertoire with verified first-speech evidence.',
    evidence_linked: true,
    entity_count: 1,
    metadata: {
      rankings: [{ rank: 1, entity_slug: 'rotary-club-speech-march-2026' }],
      reviews_count: 1,
      progress_pct: 12,
    },
  };
}

export function buildDemoKnowledgeAssetItem(
  assetId?: string,
  evidenceSubmissionId?: string | null
): Omit<KnowledgeAssetItem, 'id'> {
  return {
    asset_id: assetId,
    entity_slug: 'rotary-club-speech-march-2026',
    entity_display_name: 'Rotary Club Speech — March 2026',
    sort_order: 1,
    personal_rating: 7.5,
    personal_notes: 'First 5-minute speech. Nerves in opening, strong close. Linked to verified evidence.',
    evidence_submission_id: evidenceSubmissionId ?? null,
  };
}
