'use client';

import { useSearchParams } from 'next/navigation';
import { TastingLabTool } from '../../../components/bourbon/level-2/TastingLabTool';

export function TastingLabPageClient() {
  const params = useSearchParams();
  const proofMode = params.get('mode') === 'proof';
  const flight = params.get('flight') ?? undefined;
  return <TastingLabTool initialFlightId={flight} proofMode={proofMode} />;
}
