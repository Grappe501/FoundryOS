/**
 * First real KPIs — not users, pages, or entities.
 */
export const TRANSFORMATION_LOOP_COMPLETION_RATE = {
  key: 'transformation_loop_completion_rate',
  label: 'Transformation Loop Completion Rate',
  definition:
    'Goal → Action → Evidence → Reflection → Next Action completed successfully',
  loop_stages: ['goal', 'action', 'evidence', 'reflection', 'next_action'],
} as const;

export type MeaningfulProgressEvent = {
  slug: string;
  display_name: string;
  domain_slug: string;
  agency_signal: string;
};

/** Agency events — matter far more than content consumption */
export const MEANINGFUL_PROGRESS_EVENT_EXEMPLARS: MeaningfulProgressEvent[] = [
  { slug: 'first-speech-delivered', display_name: 'First speech delivered', domain_slug: 'public-speaking', agency_signal: 'high' },
  { slug: 'first-brisket-completed', display_name: 'First brisket completed', domain_slug: 'bbq', agency_signal: 'high' },
  { slug: 'first-app-built', display_name: 'First app built', domain_slug: 'ai-builder', agency_signal: 'high' },
  { slug: 'first-garden-harvested', display_name: 'First garden harvested', domain_slug: 'gardening', agency_signal: 'high' },
  { slug: 'first-canvass-organized', display_name: 'First campaign canvass organized', domain_slug: 'campaign-management', agency_signal: 'high' },
];

export const MEANINGFUL_PROGRESS_EVENTS = {
  key: 'meaningful_progress_events',
  label: 'Meaningful Progress Events',
  definition: 'Agency events — first speech, first brisket, first app, first harvest, first canvass',
} as const;

export type LoopKpiSnapshot = {
  transformation_loop_completion_rate: number;
  meaningful_progress_events: number;
  loops_started: number;
  loops_completed: number;
};

export function getLoopKpiSnapshot(live?: Partial<LoopKpiSnapshot>): LoopKpiSnapshot {
  const loops_started = live?.loops_started ?? 0;
  const loops_completed = live?.loops_completed ?? 0;
  return {
    loops_started,
    loops_completed,
    transformation_loop_completion_rate:
      live?.transformation_loop_completion_rate ??
      (loops_started > 0 ? loops_completed / loops_started : 0),
    meaningful_progress_events: live?.meaningful_progress_events ?? 0,
  };
}
