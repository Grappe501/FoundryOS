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
    | 'sign_up_started';
  landing_page?: string;
  source?: string;
  path_slug?: string;
  metadata?: Record<string, unknown>;
};

const VISITOR_KEY = 'foundry-visitor-id';

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
