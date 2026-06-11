'use client';

import { useEffect } from 'react';
import { trackValidationEvent } from '../../lib/validation-tracker';

export function CommunityFeedTracker({ worldSlug }: { worldSlug: string }) {
  useEffect(() => {
    void trackValidationEvent({
      event_type: 'community_feed_viewed',
      path_slug: worldSlug,
      landing_page: `/community/${worldSlug}`,
    });
  }, [worldSlug]);

  return null;
}
