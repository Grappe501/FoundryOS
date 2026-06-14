'use client';

import { useSearchParams } from 'next/navigation';
import { LabelDecoderTool } from '../../../components/bourbon/level-4/LabelDecoderTool';

export function LabelDecoderPageClient() {
  const params = useSearchParams();
  const drill = params.get('drill') ?? undefined;
  return <LabelDecoderTool initialDrillId={drill} />;
}
