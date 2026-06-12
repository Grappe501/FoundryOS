/** PASS-034C — Legendary objects (treasures, not inventory rows) */

export type LegendaryObjectDef = {
  id: string;
  world_slug: string;
  title: string;
  story: string;
  icon: string;
  /** Client-side trigger hint for unlock detection */
  trigger: string;
};

export const LEGENDARY_OBJECTS: LegendaryObjectDef[] = [
  { id: 'first-wheated', world_slug: 'bourbon', title: 'First Wheated Bourbon', story: 'You tasted softness instead of rye spice — a door opened.', icon: '🌾', trigger: 'wheated' },
  { id: 'first-blind-win', world_slug: 'bourbon', title: 'First Blind Tasting Win', story: 'You guessed right when the label was hidden. Trust your nose.', icon: '🎭', trigger: 'blind_win' },
  { id: 'first-distillery', world_slug: 'bourbon', title: 'First Distillery Visit', story: 'Rickhouses smell like patience. You were there.', icon: '🏭', trigger: 'distillery_visit' },
  { id: 'first-gift-bottle', world_slug: 'bourbon', title: 'First Gift Bottle', story: 'You gave pourable generosity — steward behavior.', icon: '🎁', trigger: 'gifted' },
  { id: 'first-bracket', world_slug: 'bourbon', title: 'First Bracket Victory', story: 'You chose between two bottles and defended your pick.', icon: '🏆', trigger: 'bracket' },
  { id: 'first-standing-o', world_slug: 'public-speaking', title: 'First Standing Ovation', story: 'The room moved because you moved them.', icon: '👏', trigger: 'standing_o' },
  { id: 'first-recorded-talk', world_slug: 'public-speaking', title: 'First Recorded Talk', story: 'You watched yourself speak — uncomfortable and essential.', icon: '🎥', trigger: 'recorded' },
  { id: 'first-audience-q', world_slug: 'public-speaking', title: 'First Audience Question', story: 'Someone leaned in. You answered without fleeing.', icon: '❓', trigger: 'audience_q' },
  { id: 'first-automation', world_slug: 'ai-builder', title: 'First Automation', story: 'A machine did work so you did not have to.', icon: '⚙', trigger: 'automation' },
  { id: 'first-website', world_slug: 'ai-builder', title: 'First Website', story: 'Something live on the internet with your fingerprints.', icon: '🌐', trigger: 'website' },
  { id: 'first-paying-user', world_slug: 'ai-builder', title: 'First Paying User', story: 'Someone exchanged money for your creation.', icon: '💵', trigger: 'paying_user' },
  { id: 'first-product', world_slug: 'ai-builder', title: 'First Product', story: 'Not a demo — a thing with a name and a user.', icon: '📦', trigger: 'product' },
  { id: 'first-brisket', world_slug: 'bbq', title: 'First Brisket', story: 'Hours of smoke. One cut that taught patience.', icon: '🥩', trigger: 'brisket' },
  { id: 'first-home-game', world_slug: 'poker', title: 'First Home Game Hosted', story: 'You ran the table — cards, chips, and culture.', icon: '🃏', trigger: 'home_game' },
];

import type { UnlockedLegendaryObject } from './types';

export type { UnlockedLegendaryObject };

export function getLegendaryObject(id: string): LegendaryObjectDef | undefined {
  return LEGENDARY_OBJECTS.find((o) => o.id === id);
}

export function legendaryObjectsForWorld(worldSlug: string): LegendaryObjectDef[] {
  return LEGENDARY_OBJECTS.filter((o) => o.world_slug === worldSlug);
}
