import type { LegendaryCollectionSchema } from './types';

export const LEGENDARY_COLLECTIONS: LegendaryCollectionSchema[] = [
  {
    world_slug: 'bourbon',
    label: 'My Bourbon Journal',
    storage_key: 'foundry-bourbon-legendary',
    sections: [
      { id: 'tastings', title: 'Tasting notes', description: 'Nose, palate, finish, water drop', icon: '🥃' },
      { id: 'shelf', title: 'My shelf', description: 'Bottles you own and why', icon: '📚' },
      { id: 'wishlist', title: 'Wish list', description: 'Targets from Producer Atlas', icon: '⭐' },
      { id: 'blind', title: 'Blind history', description: 'Rankings before reveals', icon: '🎭' },
      { id: 'visits', title: 'Distillery visits', description: 'Field notes and photos', icon: '🏭' },
      { id: 'flavor', title: 'Flavor wheel', description: 'Words you actually use', icon: '🎯' },
    ],
  },
  {
    world_slug: 'bbq',
    label: 'My BBQ Journal',
    storage_key: 'foundry-bbq-legendary',
    sections: [
      { id: 'cooks', title: 'Cooks', description: 'Temp, time, wood, weather', icon: '🔥' },
      { id: 'photos', title: 'Photos', description: 'Bark, smoke ring, plate shots', icon: '📷' },
      { id: 'rub', title: 'Rubs & sauces', description: 'Recipes that worked', icon: '🧂' },
      { id: 'feedback', title: 'Judge feedback', description: 'Competition and friend notes', icon: '🏆' },
    ],
  },
  {
    world_slug: 'poker',
    label: 'My Poker Journal',
    storage_key: 'foundry-poker-legendary',
    sections: [
      { id: 'hands', title: 'Hand history', description: 'Key pots and mistakes', icon: '🃏' },
      { id: 'sessions', title: 'Sessions', description: 'Home game and study nights', icon: '📅' },
      { id: 'bankroll', title: 'Bankroll', description: 'Practice ledger — no real-money play', icon: '📊' },
      { id: 'leaks', title: 'Leaks', description: 'Patterns you are fixing', icon: '🔍' },
    ],
  },
];

export function getLegendaryCollection(worldSlug: string): LegendaryCollectionSchema | undefined {
  return LEGENDARY_COLLECTIONS.find((c) => c.world_slug === worldSlug);
}

export type LegendaryEntry = {
  id: string;
  section: string;
  title: string;
  body: string;
  createdAt: string;
  tags?: string[];
};
