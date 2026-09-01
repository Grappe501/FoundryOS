export type MemoryPerson = {
  id: string;
  name: string;
  facts: string[];
};

export const LAYER1_PEOPLE: MemoryPerson[] = [
  { id: 'jordan', name: 'Jordan', facts: ['First time.', 'Just wanted to help.'] },
  { id: 'maya', name: 'Maya', facts: ['Quiet.', 'Has a tablet.', 'Hasn’t introduced themselves.'] },
  { id: 'chris', name: 'Chris', facts: ['Drove an hour.', 'Expected Kelly.'] },
  { id: 'drew', name: 'Drew', facts: ['Already talking.', 'Wants to pick something and go.'] },
  { id: 'sam', name: 'Sam', facts: ['Has a car.', 'Hard stop at two.'] },
];

export const LAYER2_PEOPLE: MemoryPerson[] = [
  { id: 'maya', name: 'Maya', facts: ['First shift.', 'Organized.', 'Nervous with strangers.'] },
  { id: 'jordan', name: 'Jordan', facts: ['Knows the town.', 'Has a car.', 'Available until 7.'] },
  { id: 'eli', name: 'Eli', facts: ['Digital instincts.', 'Sometimes moves before confirming.'] },
  { id: 'taylor', name: 'Taylor', facts: ['Dependable.', 'Worked several events.', 'Arrives 20 minutes late.'] },
  { id: 'new', name: 'New volunteer', facts: ['Just walked in.', 'No campaign experience.'] },
];

export const LAYER3_PEOPLE: MemoryPerson[] = [
  { id: 'noelle', name: 'Noelle', facts: ['Small-town living room.', 'Work arrives finished.', 'Quiet capability.'] },
  { id: 'cam', name: 'Cam', facts: ['First month.', 'Posted before confirming.', 'Wants more.'] },
  { id: 'imani', name: 'Imani', facts: ['Campus organizer.', 'Hours break at exams.', 'Asked about the paid internship.'] },
  { id: 'wes', name: 'Wes', facts: ['Remote nights.', 'Already doing the work.', 'Has not asked for a title.'] },
];
