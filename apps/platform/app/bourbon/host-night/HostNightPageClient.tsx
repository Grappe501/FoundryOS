'use client';

import { useSearchParams } from 'next/navigation';
import { HostNightTool } from '../../../components/bourbon/level-2/HostNightTool';

export function HostNightPageClient() {
  const params = useSearchParams();
  const kit = params.get('kit') ?? undefined;
  return <HostNightTool initialKitId={kit} />;
}
