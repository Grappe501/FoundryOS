import { choiceOn } from '../../scenario-engine';
import type { ConsequenceCard, ScenarioDecision, ScenarioDef } from '../../types';

export const VOLUNTEERS_SCENARIO_ID = 'volunteers-hq';

export const volunteersScenario: ScenarioDef = {
  id: VOLUNTEERS_SCENARIO_ID,
  title: 'The volunteers',
  beats: [
    {
      id: 'first_move',
      kind: 'decision',
      kicker: 'Headquarters',
      title: 'Five people just walked in. Nobody left instructions. What do you do first?',
      body: 'Open PEOPLE if you want the room. You are not being tested on memory.',
      choices: [
        { id: 'welcome_ask', label: 'Welcome everyone. Ask names and why they came.' },
        { id: 'assign_now', label: 'Give everyone a task immediately so they feel useful.' },
        { id: 'do_it_myself', label: 'Start the work yourself while they watch.' },
        { id: 'drew_first', label: 'Pull Drew aside first. They’re already directing people.' },
        { id: 'find_instructions', label: 'Step out and try to find who was supposed to leave a plan.' },
      ],
      dimensions: ['leadership_readiness', 'delegation', 'interpersonal'],
    },
    {
      id: 'learn',
      kind: 'decision',
      kicker: 'The room',
      title: 'How do you learn what people can do?',
      choices: [
        { id: 'ask_each', label: 'Ask each person what they’re good at and what they came to do.' },
        { id: 'assume', label: 'Assign from what you can already see.' },
        { id: 'wait_offer', label: 'Wait. Someone will offer a skill if it matters.' },
        { id: 'pair_off', label: 'Pair people immediately and let them figure it out.' },
      ],
      allowReasoning: true,
      reasoningLabel: 'What are you trying to make true in the next hour?',
      dimensions: ['people_development', 'skill_breadth', 'delegation'],
    },
    {
      id: 'chris',
      kind: 'decision',
      kicker: 'Chris',
      title: 'Chris drove an hour. They thought Kelly would be here.',
      body: '“If she isn’t coming, why are we?”',
      choices: [
        { id: 'explain_work', label: 'Tell the truth: Kelly isn’t always at HQ. The work still matters.' },
        { id: 'ask_hope', label: 'Ask Chris what they hoped to do today.' },
        { id: 'keep_moving', label: 'Keep moving. The mood will pass.' },
        { id: 'promise_kelly', label: 'Promise Kelly will come by later.' },
      ],
      dimensions: ['trust_discretion', 'interpersonal', 'verbal_communication'],
    },
    {
      id: 'protect',
      kind: 'decision',
      kicker: 'Jordan',
      title: 'Drew tells Jordan to start calling voters from a personal phone.',
      body: 'Jordan looks at you.',
      choices: [
        { id: 'stop_explain', label: 'Stop it. That isn’t how this campaign does voter contact.' },
        { id: 'let_try', label: 'Let Jordan try. They’ll learn.' },
        { id: 'ask_jordan', label: 'Ask Jordan if they’re comfortable. Then decide.' },
        { id: 'take_calls', label: 'Take the calls yourself.' },
        { id: 'coach_drew', label: 'Ask Drew to coach Jordan on the approved process instead.' },
      ],
      dimensions: ['trust_discretion', 'people_development', 'delegation'],
    },
  ],
};

export function volunteerConsequences(decisions: ScenarioDecision[]): ConsequenceCard[] {
  const first = choiceOn(decisions, 'first_move');
  const learn = choiceOn(decisions, 'learn');
  const chris = choiceOn(decisions, 'chris');
  const protect = choiceOn(decisions, 'protect');

  const cards: ConsequenceCard[] = [];

  if (first === 'welcome_ask') {
    cards.push({ title: 'The room', body: 'People are still here. A few names are on a scrap of paper.' });
  } else if (first === 'assign_now') {
    cards.push({ title: 'The room', body: 'Two people have jobs. Jordan is doing something they do not understand.' });
  } else if (first === 'do_it_myself') {
    cards.push({ title: 'The room', body: 'The work moved. Four people are watching you do it.' });
  } else if (first === 'drew_first') {
    cards.push({ title: 'The room', body: 'Drew is waiting for you to confirm a plan. The others are waiting on Drew.' });
  } else {
    cards.push({ title: 'The room', body: 'You were gone long enough that the group started inventing a plan.' });
  }

  if (learn === 'ask_each') {
    cards.push({ title: 'Maya', body: 'Maya slid the tablet over. The flyer is almost finished.' });
  } else {
    cards.push({ title: 'Maya', body: 'The tablet is face-down. Nobody has asked Maya a question.' });
  }

  if (chris === 'ask_hope') {
    cards.push({ title: 'Chris', body: 'Chris is still in the chair. They came to be useful, not to meet someone famous.' });
  } else if (chris === 'promise_kelly') {
    cards.push({ title: 'Chris', body: 'Chris is at the window, watching the parking lot.' });
  } else if (chris === 'keep_moving') {
    cards.push({ title: 'Chris', body: 'Chris is quieter. They also moved closer to the door.' });
  } else {
    cards.push({ title: 'Chris', body: 'Chris heard you. They haven’t decided whether that is enough.' });
  }

  if (protect === 'stop_explain' || protect === 'coach_drew') {
    cards.push({ title: 'Jordan', body: 'Jordan is still in the room. The personal-phone idea is dead.' });
  } else if (protect === 'let_try') {
    cards.push({ title: 'Jordan', body: 'Jordan has a personal phone in their hand.' });
  } else if (protect === 'take_calls') {
    cards.push({ title: 'Jordan', body: 'You have the task. Jordan is back near the door.' });
  } else {
    cards.push({ title: 'Jordan', body: 'Jordan answered you. They have not picked up the phone yet.' });
  }

  return cards;
}
