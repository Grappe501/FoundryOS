'use client';

import { useSearchParams } from 'next/navigation';
import { ThemedShelfTool } from '../../../components/bourbon/level-3/ThemedShelfTool';

export function ThemedShelfPageClient() {
  const params = useSearchParams();
  const theme = params.get('theme') ?? undefined;
  return <ThemedShelfTool initialThemeId={theme} />;
}
