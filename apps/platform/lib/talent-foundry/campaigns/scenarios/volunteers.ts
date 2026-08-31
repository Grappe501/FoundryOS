import { choiceOn } from '../../scenario-engine';
import type { ConsequenceCard, ScenarioDecision, ScenarioDef } from '../../types';

export const VOLUNTEERS_SCENARIO_ID = 'volunteers-hq';

export const volunteersScenario: ScenarioDef = {
  id: VOLUNTEERS_SCENARIO_ID,
  title: 'The volunteers',
  beats: [
    {
      id: 'room_empty',
      kind: 'reveal',
      kicker: 'The room',
      lines: ['Five people are standing in the front room.', 'There is no list on the table.', 'Nobody left instructions.'],
    },
    {
      id: 'faces',
      kind: 'reveal',
      kicker: 'Who is here',
      body: 'You do not know them. They do not know each other yet.',
      people: [
        { name: 'Jordan', line: 'Near the door. “I’ve never done this. I just wanted to help.”' },
        { name: 'Maya', line: 'Quiet, on a tablet. Hasn’t introduced themselves.' },
        { name: 'Chris', line: 'Arms crossed. Drove an hour.' },
        { name: 'Drew', line: 'Already talking. “Let’s just pick something and go.”' },
        { name: 'Sam', line: 'Keys in hand. Looking at the clock.' },
      ],
    },
    {
      id: 'first_move',
      kind: 'decision',
      kicker: 'First move',
      title: 'What do you do first?',
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
      id: 'maya_tablet',
      kind: 'reveal',
      kicker: 'A detail',
      body: 'Maya tilts the tablet. A half-finished flyer is on the screen. Nobody asked about it.',
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
      reasoningLabel: 'What are you trying to make true in this room in the next hour?',
      dimensions: ['people_development', 'skill_breadth', 'delegation'],
    },
    {
      id: 'chris_speaks',
      kind: 'complication',
      kicker: 'Chris',
      title: 'Chris is not quiet anymore.',
      body: '“I thought Kelly would be here. If she isn’t coming, why are we?”',
    },
    {
      id: 'chris',
      kind: 'decision',
      kicker: 'Chris',
      title: 'What do you do with that?',
      choices: [
        { id: 'explain_work', label: 'Tell the truth: Kelly isn’t always at HQ. The work still matters.' },
        { id: 'ask_hope', label: 'Ask Chris what they hoped to do today.' },
        { id: 'keep_moving', label: 'Keep moving. The mood will pass.' },
        { id: 'promise_kelly', label: 'Promise Kelly will come by later.' },
      ],
      dimensions: ['trust_discretion', 'interpersonal', 'verbal_communication'],
    },
    {
      id: 'sam_time',
      kind: 'reveal',
      kicker: 'Sam',
      body: 'Sam jingles the keys. “I have a car. I can stay until two. That’s it.”',
    },
    {
      id: 'sam',
      kind: 'decision',
      kicker: 'Two hours',
      title: 'Sam has transportation and a hard stop.',
      choices: [
        { id: 'ask_two_hours', label: 'Ask what they can finish in two hours that actually helps.' },
        { id: 'send_event', label: 'Send them toward an event immediately.' },
        { id: 'hold_room', label: 'Keep them in the room until you decide the whole plan.' },
        { id: 'ask_rides', label: 'Ask the group who might need a ride later.' },
      ],
      dimensions: ['availability', 'delegation', 'logic_judgment'],
    },
    {
      id: 'phone',
      kind: 'complication',
      kicker: 'The phone',
      title: 'The campaign phone rings.',
      body: 'A coordinator in another county: a porch event needs two people in forty-five minutes. Someone could also help from here — a post, a list, a call. They need an answer now.',
    },
    {
      id: 'phone_call',
      kind: 'decision',
      kicker: 'The ask',
      title: 'What do you do with the call?',
      choices: [
        { id: 'ask_who', label: 'Ask who can travel and who should stay. Then decide.' },
        { id: 'send_confident', label: 'Send the two most confident people.' },
        { id: 'send_nearest', label: 'Send Sam and whoever is closest to the door.' },
        { id: 'gather_facts', label: 'Stay on the phone. Get facts before you move anyone.' },
        { id: 'nobody', label: 'Tell them nobody is available.' },
      ],
      dimensions: ['logic_judgment', 'delegation', 'big_picture'],
    },
    {
      id: 'drew_jordan',
      kind: 'complication',
      kicker: 'Behind you',
      title: 'Drew is already assigning work.',
      body: 'You hear it: “Jordan, just start calling voters from your personal phone. We don’t have time to wait.” Jordan looks at you.',
    },
    {
      id: 'protect',
      kind: 'decision',
      kicker: 'Jordan',
      title: 'What do you do?',
      choices: [
        { id: 'stop_explain', label: 'Stop it. Explain that isn’t how this campaign does voter contact.' },
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
  const sam = choiceOn(decisions, 'sam');
  const phone = choiceOn(decisions, 'phone_call');
  const protect = choiceOn(decisions, 'protect');

  const cards: ConsequenceCard[] = [];

  if (first === 'welcome_ask') {
    cards.push({
      title: 'The room',
      body: 'People are still here. The noise dropped. A few names are on a scrap of paper.',
    });
  } else if (first === 'assign_now') {
    cards.push({
      title: 'The room',
      body: 'Two people have jobs. Jordan is doing something they do not understand.',
    });
  } else if (first === 'do_it_myself') {
    cards.push({
      title: 'The room',
      body: 'The work moved. Four people are watching you do it.',
    });
  } else if (first === 'drew_first') {
    cards.push({
      title: 'The room',
      body: 'Drew is waiting for you to confirm a plan. The others are waiting on Drew.',
    });
  } else {
    cards.push({
      title: 'The room',
      body: 'You were gone long enough that the group started inventing a plan without you.',
    });
  }

  if (learn === 'ask_each') {
    cards.push({
      title: 'Maya',
      body: 'Maya slid the tablet over. The flyer is almost finished. She asked who it was for.',
    });
  } else {
    cards.push({
      title: 'Maya',
      body: 'The tablet is face-down now. Nobody has asked Maya a question.',
    });
  }

  if (chris === 'ask_hope') {
    cards.push({
      title: 'Chris',
      body: 'Chris is still in the chair. They said they came to be useful, not to meet someone famous.',
    });
  } else if (chris === 'promise_kelly') {
    cards.push({
      title: 'Chris',
      body: 'Chris is at the window, watching the parking lot.',
    });
  } else if (chris === 'keep_moving') {
    cards.push({
      title: 'Chris',
      body: 'Chris is quieter. They also moved closer to the door.',
    });
  } else {
    cards.push({
      title: 'Chris',
      body: 'Chris heard you. They haven’t decided whether that is enough.',
    });
  }

  if (sam === 'ask_two_hours') {
    cards.push({
      title: 'The car',
      body: 'Sam has a two-hour job written down. The keys are still on the table.',
    });
  } else if (sam === 'send_event') {
    cards.push({
      title: 'The car',
      body: 'Sam is already gone. The room has no car.',
    });
  } else if (sam === 'ask_rides') {
    cards.push({
      title: 'The car',
      body: 'One other person mentioned they might need a ride later. Sam is listening.',
    });
  } else {
    cards.push({
      title: 'The car',
      body: 'Sam checked the time again. Nothing has used the two hours yet.',
    });
  }

  if (phone === 'ask_who' || phone === 'gather_facts') {
    cards.push({
      title: 'The other county',
      body: 'The coordinator is still on the line. They have a clearer picture than they did a minute ago.',
    });
  } else if (phone === 'nobody') {
    cards.push({
      title: 'The other county',
      body: 'The coordinator said they would try someone else. The porch still needs people.',
    });
  } else {
    cards.push({
      title: 'The other county',
      body: 'Two people are in motion. You do not yet know whether they were the right two.',
    });
  }

  if (protect === 'stop_explain' || protect === 'coach_drew') {
    cards.push({
      title: 'Jordan',
      body: 'Jordan is still in the room. The personal-phone idea is dead.',
    });
  } else if (protect === 'let_try') {
    cards.push({
      title: 'Jordan',
      body: 'Jordan has a personal phone in their hand and a look you cannot read.',
    });
  } else if (protect === 'take_calls') {
    cards.push({
      title: 'Jordan',
      body: 'You have the task. Jordan is back near the door.',
    });
  } else {
    cards.push({
      title: 'Jordan',
      body: 'Jordan answered you. They have not picked up the phone yet.',
    });
  }

  return cards.slice(0, 6);
}
