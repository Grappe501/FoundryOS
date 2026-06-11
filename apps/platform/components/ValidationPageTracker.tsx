'use client';

import { useEffect } from 'react';
import { trackPageLanding } from '../lib/validation-tracker';

export function ValidationPageTracker({ page }: { page: string }) {
  useEffect(() => {
    trackPageLanding(page);
  }, [page]);
  return null;
}
