import type { RecipeCollection, RecipeItem } from './types';

const BOURBON_COCKTAILS: RecipeItem[] = [
  { slug: 'old-fashioned', item_type: 'cocktail', title: 'Old Fashioned', description: 'Classic bourbon cocktail', entity_slugs: [], vertical_id: 'spirits-beverages', path: '/recipes/old-fashioned', status: 'draft' },
  { slug: 'manhattan', item_type: 'cocktail', title: 'Manhattan', description: 'Rye-forward classic', entity_slugs: [], vertical_id: 'spirits-beverages', path: '/recipes/manhattan', status: 'draft' },
  { slug: 'boulevardier', item_type: 'cocktail', title: 'Boulevardier', description: 'Bourbon Negroni variation', entity_slugs: [], vertical_id: 'spirits-beverages', path: '/recipes/boulevardier', status: 'draft' },
];

export function generateRecipesForEntity(
  entitySlug: string,
  entityType: string,
  verticalId: string
): RecipeCollection {
  if (entityType === 'spirit' && entitySlug === 'buffalo-trace') {
    return {
      vertical_id: verticalId,
      entity_slug: entitySlug,
      items: BOURBON_COCKTAILS.map((r) => ({
        ...r,
        entity_slugs: [entitySlug],
      })),
    };
  }

  return { vertical_id: verticalId, entity_slug: entitySlug, items: [] };
}
