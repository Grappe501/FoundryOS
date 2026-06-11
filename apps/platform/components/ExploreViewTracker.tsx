'use client';

import { useEffect } from 'react';
import { trackValidationEvent } from '../lib/validation-tracker';

export function ExploreViewTracker() {
  useEffect(() => {
    void trackValidationEvent({ event_type: 'explore_viewed', landing_page: '/explore' });
  }, []);
  return null;
}
