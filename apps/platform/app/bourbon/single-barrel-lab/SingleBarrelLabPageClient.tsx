'use client';

import { useSearchParams } from 'next/navigation';
import { SingleBarrelLabTool } from '../../../components/bourbon/level-4/SingleBarrelLabTool';

export function SingleBarrelLabPageClient() {
  const params = useSearchParams();
  const lab = params.get('lab') ?? undefined;
  return <SingleBarrelLabTool initialLabId={lab} />;
}
