'use client';

import { useSearchParams } from 'next/navigation';
import { TastingProgramTool } from '../../../components/bourbon/level-2/TastingProgramTool';

export function TastingProgramPageClient() {
  const params = useSearchParams();
  const week = params.get('week');
  const initialWeek = week ? parseInt(week, 10) : undefined;
  return <TastingProgramTool initialWeek={initialWeek} />;
}
