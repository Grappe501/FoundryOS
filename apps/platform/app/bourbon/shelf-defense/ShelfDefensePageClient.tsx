'use client';

import { useSearchParams } from 'next/navigation';
import { ShelfDefenseTool } from '../../../components/bourbon/level-3/ShelfDefenseTool';

export function ShelfDefensePageClient() {
  const params = useSearchParams();
  const theme = params.get('theme') ?? undefined;
  return <ShelfDefenseTool initialThemeId={theme} />;
}
