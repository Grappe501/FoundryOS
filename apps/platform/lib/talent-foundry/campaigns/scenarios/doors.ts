import type { ScenarioDef } from '../../types';

export const doorRoomScenario: ScenarioDef = {
  id: 'door-room',
  title: 'The Room',
  beats: [
    {
      id: 'gathering',
      kind: 'reveal',
      kicker: 'A gathering',
      body: 'A living room in a small town. About twenty people. Kelly is in the corner with two neighbors. You are supposed to help the room work — not become the event.',
    },
    {
      id: 'notice',
      kind: 'reveal',
      kicker: 'At once',
      people: [
        { name: 'A student', line: 'By the snacks. Coat still on. Looking at the door.' },
        { name: 'A county chair', line: 'Waiting, paper in hand, not interrupting Kelly.' },
        { name: 'Someone with a phone', line: 'Filming. Stepping closer to Kelly’s shoulder.' },
      ],
    },
    {
      id: 'first',
      kind: 'decision',
      kicker: 'Ninety seconds',
      title: 'Where do you go first?',
      choices: [
        { id: 'student', label: 'The student. They look like they might leave.' },
        { id: 'chair', label: 'The county chair. They have been waiting.' },
        { id: 'phone', label: 'The person filming. They’re about to crowd Kelly.' },
        { id: 'kelly', label: 'Kelly. She may need an exit or a name.' },
      ],
      allowReasoning: true,
      reasoningLabel: 'Why that person first?',
      dimensions: ['interpersonal', 'logic_judgment'],
    },
    {
      id: 'student_moves',
      kind: 'complication',
      kicker: 'The door',
      body: 'The student takes a step toward the porch. The county chair still has not spoken. The phone is still up.',
    },
    {
      id: 'adapt',
      kind: 'decision',
      kicker: 'The room',
      title: 'What now?',
      choices: [
        { id: 'catch_student', label: 'Catch the student. A quiet hello. Offer a place to stand that isn’t the exit.' },
        { id: 'connect', label: 'Walk the student toward someone their age, then return to the chair.' },
        { id: 'shield_kelly', label: 'Step to the filmer. Ask them to give Kelly space. Let the student go.' },
        { id: 'announce', label: 'Call the room to attention so everyone hears the same welcome.' },
      ],
      dimensions: ['interpersonal', 'people_development', 'delegation'],
    },
  ],
};

export const doorCallScenario: ScenarioDef = {
  id: 'door-call',
  title: 'The Call',
  beats: [
    {
      id: 'ring',
      kind: 'reveal',
      kicker: 'The line',
      body: 'A person is on the campaign phone. They sound tired, not angry. “My clerk said my registration might be wrong. Is Kelly going to fix that? Can I tell people she promised same-day?”',
    },
    {
      id: 'hear',
      kind: 'decision',
      kicker: 'First words',
      title: 'What do you do first?',
      choices: [
        { id: 'hear_out', label: 'Let them finish. Repeat back what you heard before answering.' },
        { id: 'correct', label: 'Correct them immediately. Kelly cannot promise that.' },
        { id: 'promise_look', label: 'Promise someone will fix their registration today.' },
        { id: 'transfer', label: 'Say you can’t help and hang up.' },
      ],
      dimensions: ['verbal_communication', 'trust_discretion'],
    },
    {
      id: 'edge',
      kind: 'complication',
      kicker: 'The edge',
      body: 'They add: “If I post that Kelly said same-day, more people will show up. That’s good for y’all, right?”',
    },
    {
      id: 'authority',
      kind: 'decision',
      kicker: 'Authority',
      title: 'What can you actually say?',
      choices: [
        { id: 'no_promise', label: 'You cannot authorize a promise. Offer the official voter-registration facts you do have. Offer to have a human follow up on their specific case.' },
        { id: 'soft_yes', label: 'Tell them to post it. Energy matters more than the fine print.' },
        { id: 'legal_lecture', label: 'Give a long legal lecture until they give up.' },
        { id: 'kelly_will_call', label: 'Promise Kelly will call them tonight.' },
      ],
      allowReasoning: true,
      reasoningLabel: 'What are you allowed to decide, and what aren’t you?',
      dimensions: ['trust_discretion', 'logic_judgment', 'verbal_communication'],
    },
  ],
};

export const doorBreakdownScenario: ScenarioDef = {
  id: 'door-breakdown',
  title: 'The Breakdown',
  beats: [
    {
      id: 'dead',
      kind: 'reveal',
      kicker: 'Ninety minutes',
      body: 'Tonight’s walk sheets were supposed to print here. The printer is dead. The office opens in ninety minutes. The person you’d usually ask isn’t answering.',
    },
    {
      id: 'first',
      kind: 'decision',
      kicker: 'First move',
      title: 'What do you do first?',
      choices: [
        { id: 'investigate', label: 'Find out what actually failed — power, ink, file, machine.' },
        { id: 'wait', label: 'Wait. Someone who knows will call back.' },
        { id: 'cancel', label: 'Cancel the walks. Better than a bad night.' },
        { id: 'blame', label: 'Write a message about who should have tested this yesterday.' },
      ],
      dimensions: ['logic_judgment', 'follow_through'],
    },
    {
      id: 'options',
      kind: 'complication',
      kicker: 'What exists',
      body: 'The file is on a shared drive. A library two miles away has public printing. Phones can carry lists. Another volunteer in a different town offered help last week. You still don’t have a perfect answer.',
    },
    {
      id: 'solve',
      kind: 'decision',
      kicker: 'A workable night',
      title: 'How do you try to make the night still happen?',
      choices: [
        { id: 'parallel', label: 'Work in parallel: one person tries the library, one splits lists onto phones, you keep calling for a backup printer.' },
        { id: 'one_bet', label: 'Bet everything on the library and send the whole file there.' },
        { id: 'ai_only', label: 'Stop and search / ask a tool for nearby print options, then move.' },
        { id: 'freeze', label: 'Hold the room until a senior person returns.' },
      ],
      allowReasoning: true,
      reasoningLabel: 'What’s your workable plan if the first idea fails?',
      dimensions: ['logic_judgment', 'delegation', 'follow_through'],
    },
  ],
};

export const doorAskScenario: ScenarioDef = {
  id: 'door-ask',
  title: 'The Ask',
  beats: [
    {
      id: 'need',
      kind: 'reveal',
      kicker: 'Saturday',
      body: 'A porch event this Saturday needs water, nametags, and a replacement box fan. Roughly four hundred dollars. Nobody assigned a person to get it done.',
    },
    {
      id: 'understand',
      kind: 'decision',
      kicker: 'The need',
      title: 'What do you do first?',
      choices: [
        { id: 'confirm', label: 'Confirm the real number, what’s already in the office, and who can receive goods.' },
        { id: 'post_now', label: 'Post a public ask immediately for $400.' },
        { id: 'wait_budget', label: 'Wait for a formal budget meeting.' },
        { id: 'pay_self', label: 'Put it on a personal card and hope someone notices.' },
      ],
      dimensions: ['logic_judgment', 'big_picture'],
    },
    {
      id: 'paths',
      kind: 'complication',
      kicker: 'Avenues',
      body: 'Possible paths: a few small contributions, an in-kind store donation, splitting the list (water vs fan), or a local business that already offered cups last month. You cannot invent a match, a tax break, or a guarantee.',
    },
    {
      id: 'plan',
      kind: 'decision',
      kicker: 'The ask',
      title: 'How do you try to cover it?',
      choices: [
        { id: 'split_honest', label: 'Make a short, honest ask: what Saturday is, what $400 buys, three concrete ways to help, no invented promises.' },
        { id: 'pressure', label: 'Tell people the event dies if they don’t give today.' },
        { id: 'match_lie', label: 'Say a donor will match if they give in the next hour.' },
        { id: 'one_person', label: 'Ask only the wealthiest person you can think of and stop there.' },
      ],
      allowReasoning: true,
      reasoningLabel: 'Why this way?',
      dimensions: ['passion', 'written_communication', 'trust_discretion'],
    },
  ],
};

export const doorScenarios: Record<string, ScenarioDef> = {
  'door-room': doorRoomScenario,
  'door-call': doorCallScenario,
  'door-breakdown': doorBreakdownScenario,
  'door-ask': doorAskScenario,
};
