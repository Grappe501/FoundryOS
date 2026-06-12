import type { ConsequenceChain } from '../types';

function actionNode(
  id: string,
  world: string,
  label: string,
  description?: string,
): ConsequenceChain['nodes'][0] {
  return { id, world_slug: world, label, kind: 'action', description };
}

/** Weekly challenge completions — mentor remembers participation */
const CHALLENGE_EVENTS: { world: string; eventId: string; title: string }[] = [
  { world: 'bourbon', eventId: 'bourbon-challenge-bib', title: 'BiB challenge completed' },
  { world: 'ai-builder', eventId: 'ai-challenge-automate', title: 'Automation challenge completed' },
  {
    world: 'financial-independence',
    eventId: 'fi-challenge-track-7',
    title: 'Track-every-dollar challenge completed',
  },
  { world: 'public-speaking', eventId: 'ps-challenge-record', title: 'Record-a-talk challenge completed' },
  { world: 'civic-engagement', eventId: 'civic-challenge-meeting', title: 'Public meeting challenge completed' },
  { world: 'bbq', eventId: 'bbq-challenge-log-cook', title: 'Log-a-cook challenge completed' },
  { world: 'poker', eventId: 'poker-challenge-ten-hands', title: 'Ten-hand review challenge completed' },
];

/** Weekly rivalry votes — mentor remembers preference */
const RIVALRY_EVENTS: { world: string; eventId: string; title: string }[] = [
  { world: 'bourbon', eventId: 'bourbon-rivalry-bt-heaven', title: 'Buffalo Trace vs Heaven Hill vote' },
  { world: 'ai-builder', eventId: 'ai-rivalry-nocode-code', title: 'No-code vs code vote' },
  {
    world: 'financial-independence',
    eventId: 'fi-rivalry-index-pick',
    title: 'Index funds vs stock picking vote',
  },
  { world: 'public-speaking', eventId: 'ps-rivalry-prep-extemp', title: 'Prepared vs extemporaneous vote' },
  { world: 'civic-engagement', eventId: 'civic-rivalry-local-state', title: 'Local vs state government vote' },
  { world: 'bbq', eventId: 'bbq-rivalry-offset-pellet', title: 'Offset vs pellet vote' },
  { world: 'poker', eventId: 'poker-rivalry-gto-exploit', title: 'GTO vs exploitative vote' },
];

function challengeChain(world: string, eventId: string, title: string): ConsequenceChain {
  const actionId = `action-${eventId}`;
  const mentorId = `mentor-${eventId}`;
  return {
    id: `${eventId}-challenge`,
    title,
    trigger: {
      world_slug: world,
      action_type: 'event_challenge_completed',
      action_id: eventId,
    },
    nodes: [
      actionNode(actionId, world, title, 'Completed this week\'s world challenge'),
      {
        id: mentorId,
        world_slug: world,
        label: 'Mentor remembers your action',
        kind: 'mentor_memory',
        target_id: eventId,
        href: `/${world}/today`,
        description: 'This week\'s challenge becomes part of your story.',
      },
      {
        id: `collector-signal-${eventId}`,
        world_slug: world,
        label: 'Collector signal',
        kind: 'unlock_collector_progress',
        target_id: eventId,
        description: 'Challenge evidence feeds your collections.',
      },
    ],
    edges: [
      { from: actionId, to: mentorId },
      { from: actionId, to: `collector-signal-${eventId}` },
    ],
  };
}

function voteChain(world: string, eventId: string, title: string): ConsequenceChain {
  const actionId = `action-vote-${eventId}`;
  const mentorId = `mentor-vote-${eventId}`;
  return {
    id: `${eventId}-vote`,
    title,
    trigger: {
      world_slug: world,
      action_type: 'event_voted',
      action_id: eventId,
    },
    nodes: [
      actionNode(actionId, world, title, 'Cast your weekly rivalry vote'),
      {
        id: mentorId,
        world_slug: world,
        label: 'Mentor remembers your pick',
        kind: 'mentor_memory',
        target_id: eventId,
        href: `/${world}/today`,
        description: 'Your rivalry preference shapes future recommendations.',
      },
    ],
    edges: [{ from: actionId, to: mentorId }],
  };
}

export const WORLD_EVENT_CONSEQUENCE_CHAINS: ConsequenceChain[] = [
  ...CHALLENGE_EVENTS.map((e) => challengeChain(e.world, e.eventId, e.title)),
  ...RIVALRY_EVENTS.map((e) => voteChain(e.world, e.eventId, e.title)),
];
