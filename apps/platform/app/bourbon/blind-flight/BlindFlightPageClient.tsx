'use client';

import { useSearchParams } from 'next/navigation';
import { BlindFlightTool } from '../../../components/bourbon/level-2/BlindFlightTool';

export function BlindFlightPageClient() {
  const params = useSearchParams();
  const preset = params.get('preset') ?? undefined;
  return <BlindFlightTool initialPresetId={preset} />;
}
