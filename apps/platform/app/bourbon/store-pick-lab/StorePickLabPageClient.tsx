'use client';

import { useSearchParams } from 'next/navigation';
import { StorePickLabTool } from '../../../components/bourbon/level-4/StorePickLabTool';

export function StorePickLabPageClient() {
  const params = useSearchParams();
  const lab = params.get('lab') ?? undefined;
  return <StorePickLabTool initialLabId={lab} />;
}
