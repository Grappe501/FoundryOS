import type { UserEntityRelationship, UserIdentitySnapshot, OwnershipRelationshipType } from './types';

/**
 * PASS-003 success criteria — answer identity questions from relationship data.
 * Production: Supabase queries. Dev: in-memory filter.
 */
export function buildUserIdentitySnapshot(
  userId: string,
  profile: { display_name?: string; region?: string },
  relationships: UserEntityRelationship[],
  expertiseTitles: string[] = [],
  trustScore?: number,
  collectionsCount = 0
): UserIdentitySnapshot {
  const forUser = relationships.filter((r) => r.user_id === userId);

  return {
    user_id: userId,
    display_name: profile.display_name,
    region: profile.region,
    owns: ids(forUser, 'owns'),
    favorites: ids(forUser, 'favorites'),
    reviewed: ids(forUser, 'reviewed'),
    ranked: forUser
      .filter((r) => r.relationship_type === 'ranked' && r.rank_position)
      .map((r) => ({ entity_id: r.entity_id, position: r.rank_position! }))
      .sort((a, b) => a.position - b.position),
    wants: ids(forUser, 'wants'),
    collections_count: collectionsCount,
    expertise_titles: expertiseTitles,
    trust_score: trustScore,
  };
}

function ids(rows: UserEntityRelationship[], type: OwnershipRelationshipType): string[] {
  return rows.filter((r) => r.relationship_type === type).map((r) => r.entity_id);
}

/** Example: Steve owns Buffalo Trace, ranked The Godfather, wants Pappy Van Winkle */
export const EXAMPLE_STEVE_RELATIONSHIPS: Array<{
  entity_slug: string;
  relationship_type: OwnershipRelationshipType;
  rank_position?: number;
}> = [
  { entity_slug: 'buffalo-trace', relationship_type: 'owns' },
  { entity_slug: 'the-godfather', relationship_type: 'ranked', rank_position: 1 },
  { entity_slug: 'led-zeppelin-iv', relationship_type: 'reviewed' },
  { entity_slug: 'arkansas-razorbacks-baseball', relationship_type: 'favorites' },
  { entity_slug: 'pappy-van-winkle', relationship_type: 'wants' },
];
