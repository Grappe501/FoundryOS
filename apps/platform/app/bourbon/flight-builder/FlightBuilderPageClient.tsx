'use client';

import { useSearchParams } from 'next/navigation';
import { FlightBuilderTool } from '../../../components/bourbon/level-2/FlightBuilderTool';

export function FlightBuilderPageClient() {
  const params = useSearchParams();
  const template = params.get('template') ?? undefined;
  return <FlightBuilderTool initialTemplateId={template} />;
}
