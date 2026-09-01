import type { LeaderMissionDef } from '../../leader/types';

export const LEADER_MISSION_ID = 'the-leader';

/** Fictional composites only. Never real applicants. */
export const leaderMission: LeaderMissionDef = {
  id: LEADER_MISSION_ID,
  internalTitle: 'THE LEADER',
  people: [
    {
      id: 'noelle',
      name: 'Noelle',
      from: 'Small town · living room',
      pattern: 'Quiet capability',
      facts: [
        'Recruits by text from her kitchen table.',
        'Work shows up finished. She rarely announces it.',
        'Asked once whether she was “actually useful.”',
      ],
    },
    {
      id: 'cam',
      name: 'Cam',
      from: 'Headquarters volunteer',
      pattern: 'Enthusiasm plus overstep',
      facts: [
        'First month. High energy. People like being around them.',
        'Posted an event time before it was confirmed.',
        'Apologized quickly and asked for more responsibility.',
      ],
    },
    {
      id: 'imani',
      name: 'Imani',
      from: 'Campus',
      pattern: 'Hunger plus a real calendar',
      facts: [
        'Organizes friends without being asked.',
        'Hours break hard during exams.',
        'Has asked about the paid internship twice.',
      ],
    },
    {
      id: 'wes',
      name: 'Wes',
      from: 'Remote · nights',
      pattern: 'Reliable and unadvertised',
      facts: [
        'Already running graphics and call lists from home.',
        'Never late. Never loud.',
        'Has not asked for a title, money, or a bigger seat.',
      ],
    },
  ],
  seats: [
    { id: 'hq', label: 'Headquarters presence', hint: 'In the room. Visible. Limited seats.' },
    { id: 'town', label: 'Small-town recruiting', hint: 'People they already know. Distance is the point.' },
    { id: 'campus', label: 'Campus organizing', hint: 'Friends, boards, hours that disappear at midterms.' },
    { id: 'remote', label: 'Remote digital / content', hint: 'Living rooms and late nights. Statewide.' },
    { id: 'hold', label: 'Hold / smaller first', hint: 'Not ready for this seat. Still theirs to develop.' },
  ],
  coachHow: [
    { id: 'beside', label: 'Sit beside them and do the next one together.' },
    { id: 'ask', label: 'Ask what they already see before you instruct.' },
    { id: 'private', label: 'Correct in private. Leave their standing intact.' },
    { id: 'stretch', label: 'Give a slightly harder version with a net under it.' },
    { id: 'watch', label: 'Name what is already working and watch longer.' },
  ],
  correctChoices: [
    { id: 'they_fix', label: 'They take the post down and write the correction.' },
    { id: 'you_teach', label: 'You pull it. Then you teach the check they skipped.' },
    { id: 'pair', label: 'Pair them with someone who confirms before publishing.' },
    { id: 'off_comms', label: 'Move them off public comms for now.' },
  ],
  protectHow: [
    { id: 'smaller', label: 'Give a smaller real version of what they asked for.' },
    { id: 'pair', label: 'Pair them with someone steadier. Keep the ambition.' },
    { id: 'wait', label: 'Protect them from the seat. Tell them why, and when you will look again.' },
    { id: 'try', label: 'Let them try. Stay close enough to catch the drop.' },
  ],
  investHow: [
    { id: 'weekly', label: 'A standing weekly coaching conversation.' },
    { id: 'stretch', label: 'One stretch assignment with a named backup.' },
    { id: 'pair', label: 'Pair them so skill transfers in both directions.' },
    { id: 'leave', label: 'Leave them where they are. Watch what they do with it.' },
  ],
  paidNeeds: [
    { id: 'statewide', label: 'Statewide organizing capacity — someone who can grow people where they already live.' },
    { id: 'campus', label: 'Campus leadership — the next wave of first-time volunteers.' },
    { id: 'digital', label: 'Remote digital / content — the work that already happens after hours.' },
    { id: 'hq', label: 'Headquarters presence — the room still has to run.' },
  ],
};

export const leaderCopy = {
  kicker: 'Tomorrow',
  openingLines: ['The shift is over.', "Tomorrow, you're not getting tasks.", "You're getting people."],
  compositeNotice: 'These are composite records. They are not real applicants, and this is not a real hiring decision.',
  rosterTitle: 'Four people. None of them are finished.',
  rosterBody: 'You are responsible for how they get better. Facts only. No scores.',
  placeTitle: 'Where does each person belong first?',
  placeBody: 'Place all four. A hold is a decision. Leaving someone unplaced is not.',
  coachTitle: 'Who needs you first — and how will you make them better?',
  coachNote: 'What would you actually say to them?',
  correctKicker: 'This morning',
  correctTitle: 'Cam posted Kelly’s arrival time before it was confirmed.',
  correctBody: 'The organizer saw it. Cam knows. How do you correct this without wasting the person?',
  correctNote: 'What does Cam learn from how you handle this?',
  protectTitle: 'Imani wants the visible seat. Exams start in nine days.',
  protectBody: 'Protecting someone is not the same as shrinking them.',
  investTitle: 'Who do you invest in first?',
  investBody: 'Not the paid decision. The development decision. Time is limited. You cannot coach everyone the same.',
  investPlan: 'What does the next thirty days look like for them?',
  paidNeedTitle: 'There is funding for one additional paid position.',
  paidNeedBody: 'What work does the campaign actually need — not who you like most.',
  paidWhoTitle: 'Who would you recommend, and how will you develop them?',
  paidWhoBody: 'The name matters less than the plan. If the plan is thin, the hire is theater.',
  leftoverTitle: 'The other three will hear about this.',
  leftoverBody: 'What do you tell the people you did not choose — so they still have a future here?',
  mirrorLines: [
    'Those people were built from patterns we see in people like you.',
    'Quiet work. Fast hands. A calendar that breaks. Ambition that arrives before the skill.',
  ],
  selfKicker: 'One last person',
  selfTitle: 'You.',
  selfBody: 'If you were coaching yourself, what would you tell yourself you still need to work on?',
  thankYou: 'Thank you for taking the people seriously.',
  continue: 'Continue',
  closedTitle: 'This door is not open.',
  closedBody: 'The people are for someone who already finished the shift.',
};
