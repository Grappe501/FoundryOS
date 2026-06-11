'use client';

import { useEffect } from 'react';
import { trackValidationEvent } from '../../lib/validation-tracker';

export function CommunityJoinTracker({ worldSlug }: { worldSlug: string }) {
  useEffect(() => {
    const key = `foundry-community-${worldSlug}`;
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, '1');
    void trackValidationEvent({
      event_type: 'community_joined',
      landing_page: `/${worldSlug}/community`,
      path_slug: worldSlug,
    });
  }, [worldSlug]);

  return null;
}
