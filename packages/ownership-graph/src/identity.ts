import type {
  FoundryIdentity,
  IdentityShareCard,
  MasteryTitle,
  ActivePathProgress,
  ActiveProjectProgress,
  FoundryRole,
} from './types';

/** The outcome users buy — not machinery */
export const FOUNDRY_OUTCOME = 'Help me become the person I want to be.';

/** Long-term mission — one sentence for everyone */
export const FOUNDRY_MISSION =
  'Foundry helps people become who they are capable of becoming.';

/** Foundry helps people become experts — the public vision statement */
export const FOUNDRY_VISION_STATEMENT = {
  headline: FOUNDRY_OUTCOME,
  lines: [
    'Every subject has a path.',
    'Every path has a community.',
    'Every community creates knowledge.',
    'Every contribution helps someone else master the craft.',
  ],
  contrast: {
    teaches: 'Watch this.',
    transforms: 'Become this.',
  },
} as const;

export const VIRAL_SHARE_HOOK = "What I'm becoming.";

/**
 * Build portable Foundry Identity — follows the user across all verticals and devices.
 * Production: aggregate from user_profiles, path_progress, relationships, clubs.
 */
export function buildFoundryIdentity(
  userId: string,
  profile: {
    display_name: string;
    region?: string;
    roles?: FoundryRole[];
    mastery_titles?: MasteryTitle[];
    active_paths?: ActivePathProgress[];
    active_projects?: ActiveProjectProgress[];
    collections_count?: number;
    reviews_count?: number;
    paths_completed?: number;
    projects_completed?: number;
    people_mentored?: number;
    communities_led?: number;
    trust_score?: number;
  }
): FoundryIdentity {
  return {
    user_id: userId,
    display_name: profile.display_name,
    roles: profile.roles ?? [],
    mastery_titles: profile.mastery_titles ?? [],
    active_paths: profile.active_paths ?? [],
    active_projects: profile.active_projects ?? [],
    collections_count: profile.collections_count ?? 0,
    reviews_count: profile.reviews_count ?? 0,
    paths_completed: profile.paths_completed ?? 0,
    projects_completed: profile.projects_completed ?? 0,
    people_mentored: profile.people_mentored ?? 0,
    communities_led: profile.communities_led ?? 0,
    region: profile.region,
    trust_score: profile.trust_score,
  };
}

/** Viral loop card — share progress, not consumption */
export function buildIdentityShareCard(identity: FoundryIdentity): IdentityShareCard {
  const primaryPath = identity.active_paths[0];
  return {
    display_name: identity.display_name,
    hook: VIRAL_SHARE_HOOK,
    primary_path: primaryPath
      ? {
          display_name: primaryPath.display_name,
          progress_pct: primaryPath.progress_pct,
        }
      : undefined,
    mastery_titles: identity.mastery_titles.map((t) => t.title),
    stats: {
      collections: identity.collections_count,
      reviews: identity.reviews_count,
      paths_completed: identity.paths_completed,
      communities_led: identity.communities_led,
    },
  };
}

/** Example: Steve Grappe — identity follows everywhere */
export const EXAMPLE_STEVE_IDENTITY: FoundryIdentity = buildFoundryIdentity('steve-grappe', {
  display_name: 'Steve Grappe',
  region: 'Central Arkansas',
  mastery_titles: [
    { title: 'Bourbon Steward', vertical_slug: 'bourbon', path_slug: 'road-to-bourbon-steward' },
    { title: 'BBQ Pitmaster', vertical_slug: 'bbq', path_slug: 'road-to-backyard-pitmaster' },
    { title: 'Civil War Enthusiast', vertical_slug: 'books', path_slug: 'road-to-literary-scholar' },
    { title: 'Arkansas Political Strategist', vertical_slug: 'politics', path_slug: 'road-to-arkansas-political-organizer' },
  ],
  active_paths: [
    { path_slug: 'road-to-bourbon-master', display_name: 'Road to Bourbon Master', progress_pct: 62 },
    { path_slug: 'road-to-civil-war-historian', display_name: 'Road to Civil War Historian', progress_pct: 41 },
    { path_slug: 'road-to-backyard-pitmaster', display_name: 'Road to Backyard Pitmaster', progress_pct: 87 },
    { path_slug: 'road-to-arkansas-political-organizer', display_name: 'Road to Arkansas Political Organizer', progress_pct: 73 },
  ],
  active_projects: [
    { project_slug: 'blind-tasting-night', display_name: 'Blind Tasting Night', progress_pct: 75 },
    { project_slug: 'host-bourbon-club', display_name: 'Host a Bourbon Club', progress_pct: 40 },
  ],
  collections_count: 48,
  reviews_count: 1294,
  paths_completed: 12,
  projects_completed: 8,
  people_mentored: 48,
  communities_led: 4,
  trust_score: 94,
});
