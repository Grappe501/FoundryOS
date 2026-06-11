'use client';

export type TrackValidationPayload = {
  event_type:
    | 'visitor_landed'
    | 'assessment_started'
    | 'assessment_completed'
    | 'path_started'
    | 'project_started'
    | 'session_visit'
    | 'explore_viewed'
    | 'path_clicked'
    | 'interest_submitted'
    | 'account_created'
    | 'trial_started'
    | 'paid'
    | 'beta_joined'
    | 'pricing_viewed'
    | 'pricing_clicked'
    | 'sign_in_started'
    | 'sign_up_started'
    | 'mission_started'
    | 'mission_completed'
    | 'mission_step_viewed'
    | 'return_tomorrow'
    | 'return_this_week'
    | 'portfolio_created'
    | 'community_joined'
    | 'paid_conversion'
    | 'challenge_submitted'
    | 'showcase_posted'
    | 'peer_feedback_given'
    | 'community_feed_viewed';
  landing_page?: string;
  source?: string;
  path_slug?: string;
  metadata?: Record<string, unknown>;
};

const VISITOR_KEY = 'foundry-visitor-id';
const LAST_VISIT_KEY = 'foundry-last-visit';

function checkReturnVisit(): void {
  if (typeof window === 'undefined') return;
  try {
    const last = localStorage.getItem(LAST_VISIT_KEY);
    const now = Date.now();
    if (last) {
      const diffDays = (now - Number(last)) / (1000 * 60 * 60 * 24);
      if (diffDays >= 1 && diffDays <= 2) {
        void trackValidationEvent({ event_type: 'return_tomorrow' });
      }
      if (diffDays >= 1 && diffDays <= 7) {
        void trackValidationEvent({ event_type: 'return_this_week' });
      }
    }
    localStorage.setItem(LAST_VISIT_KEY, String(now));
  } catch {
    /* ignore */
  }
}

export function getVisitorId(): string {
  if (typeof window === 'undefined') return 'server';
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = `v_${crypto.randomUUID().slice(0, 12)}`;
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return `v_anon_${Date.now()}`;
  }
}

function inferSource(): string {
  if (typeof document === 'undefined') return 'direct';
  const ref = document.referrer;
  if (!ref) return 'direct';
  try {
    const host = new URL(ref).hostname;
    if (host.includes('google')) return 'google';
    if (host.includes('facebook')) return 'facebook';
    if (host.includes('twitter') || host.includes('x.com')) return 'twitter';
    return host;
  } catch {
    return 'referral';
  }
}

export async function trackValidationEvent(payload: TrackValidationPayload): Promise<void> {
  try {
    await fetch('/api/validation/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitor_id: getVisitorId(),
        source: payload.source ?? inferSource(),
        ...payload,
      }),
    });
  } catch {
    /* validation must not break UX */
  }
}

export function trackPageLanding(page: string): void {
  checkReturnVisit();
  void trackValidationEvent({
    event_type: 'visitor_landed',
    landing_page: page,
  });
  void trackValidationEvent({
    event_type: 'session_visit',
    landing_page: page,
  });
}

export function trackPathClicked(pathSlug: string, landingPage: string, href: string): void {
  void trackValidationEvent({
    event_type: 'path_clicked',
    landing_page: landingPage,
    path_slug: pathSlug,
    metadata: { href },
  });
}
