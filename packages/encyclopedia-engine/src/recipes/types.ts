/**
 * Recipe Engine — unified structure across verticals.
 * Bourbon: cocktails. BBQ: brisket. Movies: top 100 lists. Books: reading paths.
 */

export type RecipeItemType =
  | 'recipe'
  | 'cocktail'
  | 'guide'
  | 'list'
  | 'reading_path'
  | 'comparison'
  | 'learning_path';

export type RecipeItem = {
  slug: string;
  item_type: RecipeItemType;
  title: string;
  description: string;
  entity_slugs: string[];
  vertical_id: string;
  steps?: string[];
  items?: Array<{ name: string; slug?: string; note?: string }>;
  path: string;
  status: 'draft';
};

export type RecipeCollection = {
  vertical_id: string;
  entity_slug?: string;
  items: RecipeItem[];
};
