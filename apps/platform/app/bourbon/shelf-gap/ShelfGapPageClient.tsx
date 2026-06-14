'use client';

import { useSearchParams } from 'next/navigation';
import { ShelfGapTool } from '../../../components/bourbon/level-3/ShelfGapTool';

export function ShelfGapPageClient() {
  const params = useSearchParams();
  const theme = params.get('theme') ?? undefined;
  return <ShelfGapTool initialThemeId={theme} />;
}
