'use client';

import { useSearchParams } from 'next/navigation';
import { NasAgeLabTool } from '../../../components/bourbon/level-4/NasAgeLabTool';

export function NasAgeLabPageClient() {
  const params = useSearchParams();
  const lab = params.get('lab') ?? undefined;
  return <NasAgeLabTool initialLabId={lab} />;
}
