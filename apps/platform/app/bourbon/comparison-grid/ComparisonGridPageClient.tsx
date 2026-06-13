'use client';

import { useSearchParams } from 'next/navigation';
import { ComparisonGridTool } from '../../../components/bourbon/level-2/ComparisonGridTool';

export function ComparisonGridPageClient() {
  const params = useSearchParams();
  const preset = params.get('preset') ?? undefined;
  return <ComparisonGridTool initialPresetId={preset} />;
}
