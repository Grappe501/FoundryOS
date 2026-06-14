'use client';

import { useSearchParams } from 'next/navigation';
import { CompareFiveLabTool } from '../../../components/bourbon/level-4/CompareFiveLabTool';

export function CompareFiveLabPageClient() {
  const params = useSearchParams();
  const preset = params.get('preset') ?? undefined;
  return <CompareFiveLabTool initialPresetId={preset} />;
}
