-- PASS-016D — Stranger conversion funnel events

ALTER TABLE validation_events DROP CONSTRAINT IF EXISTS validation_events_event_type_check;

ALTER TABLE validation_events ADD CONSTRAINT validation_events_event_type_check
  CHECK (event_type IN (
    'visitor_landed',
    'assessment_started',
    'assessment_completed',
    'path_started',
    'project_started',
    'session_visit',
    'explore_viewed',
    'path_clicked',
    'interest_submitted',
    'account_created',
    'trial_started',
    'paid'
  ));
