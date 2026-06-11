/** PASS-028A — Community seed types */

export type SeedDiscussion = {
  title: string;
  body: string;
  author: string;
};

export type SeedShowcase = {
  title: string;
  body: string;
  author: string;
};

export type SeedWeeklyChallenge = {
  theme: string;
  prompt: string;
};

export type SeedMentor = {
  display_name: string;
  bio: string;
  help_count: number;
  recognition: string;
};

export type SeedMember = {
  display_name: string;
  role: string;
  help_count?: number;
};

export type SeedWorldBundle = {
  world_slug: string;
  mentor: SeedMentor;
  members: SeedMember[];
  discussions: SeedDiscussion[];
  showcases: SeedShowcase[];
  weeklyChallenges: SeedWeeklyChallenge[];
};

export function slugForSeedUser(world: string, name: string): string {
  return `seed-${world}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}
