import type { CampaignConfig, OptionalDoor } from '../types';

export const kellyCampaign: CampaignConfig = {
  id: 'kelly',
  sessionKey: 'tf.kelly.v1',
  implementedThrough: 'layer3_leader',
  // Drop the approved 30s direct-to-camera MP4 at
  // apps/platform/public/talent-foundry/kelly-grappe-intro.mp4
  // then set this to "/talent-foundry/kelly-grappe-intro.mp4".
  // Optional poster: /talent-foundry/kelly-grappe-intro.jpg
  // Optional captions: /talent-foundry/kelly-grappe-intro.vtt
  // Transcript already lives in kellyCopy.kellyScript. Do not invent a fake video.
  kellyVideoUrl: null,
  flags: {
    layer2Enabled: true,
    layer3Enabled: false,
  },
  willingnessChoices: [
    { id: 'where_i_live', label: 'Help from where I live', willingToAct: true },
    { id: 'campus', label: 'Help from campus or school', willingToAct: true },
    { id: 'home_hours', label: 'A few hours from home', willingToAct: true },
    { id: 'in_person', label: 'Show up in person when I can', willingToAct: true },
    { id: 'unsure', label: "I'm not sure yet", willingToAct: true },
    { id: 'not_now', label: 'Not now', willingToAct: false },
  ],
  commitmentChoices: [
    { id: 'yes', label: 'I can show up and help' },
    { id: 'limited', label: 'I can do a little from where I am' },
    { id: 'not_now', label: 'Not now' },
  ],
};

export const kellyCopy = {
  changePrompt: 'What would you change if you had the chance?',
  changePlaceholder: 'Type it. Even a sentence.',
  peopleRuleEyebrow: 'Arkansas',
  peopleRuleTitle: 'The People Rule.',
  peopleRuleLatin: 'Regnat Populus',
  peopleRuleBody: 'Power does not live in a building. It lives with people — including the person holding this phone.',
  willingnessPrompt: 'If you had a chance to help, what would you actually do?',
  kellyName: 'Kelly Grappe',
  kellyRole: 'Arkansas',
  videoEyebrow: 'A person',
  videoContinue: 'Continue',
  transcriptLabel: 'Read what she says',
  transcriptHide: 'Hide words',
  videoMissing: 'The film goes here. The words are already true.',
  kellyScript: [
    "Hi, I'm Kelly Grappe.",
    "If you've made it this far, thank you. Because this campaign isn't really about me. It's about the idea that ordinary people should have a voice in what happens next.",
    "We're building something across Arkansas, and we need people willing to show up, learn, lead, and help others find their place too.",
    "You don't need political experience. You just need to care.",
    'If that sounds like you, keep going.',
    "Let's see what we can build together.",
  ],
  commitmentEyebrow: 'Showing up',
  commitmentTitle: 'This work is real.',
  commitmentBody: 'It starts with people who will contribute — from a living room, a campus, a small town, or a headquarters. Can you be one of them, even a little?',
  commitmentAfterNo:
    "That's all right. You can still see what this is. Nothing here is a job offer, and nothing you do next is a promise.",
  leadEyebrow: 'A shift',
  leadLine1: 'Think you can lead this?',
  leadLine2: 'Show us.',
  leadBody: "There aren't perfect answers. We want to see how you think.",
  leadCta: "I'm in",
  briefEyebrow: 'Headquarters',
  revisionEyebrow: 'A pause',
  revisionTitle: 'Knowing what you know now…',
  revisionQuestion: 'Would you do anything differently?',
  revisionPlaceholder: 'What would you change, or why would you keep it?',
  doorsEyebrow: 'If you want more',
  doorsTitle: 'There are other doors.',
  doorsBody: 'None of them are required. Walk through what you have time for.',
  doorsContinue: 'Continue my journey',
  doorsKeep: 'Keep going',
  keyEyebrow: 'Discovered',
  keyTitle: 'KEY 01 ACQUIRED',
  keyRule: 'The People Rule',
  keyBody: "You'll know when you need it.",
  identifyEyebrow: 'A threshold',
  identifyTitle: 'Who are you?',
  identifyBody: "You've shown us how you think. Now we'd like to know who you are.",
  identifyPending: 'The campaign record is written when you step in.',
};

export const kellyDoors: OptionalDoor[] = [
  { id: 'room', stateId: 'door_room', title: 'The Room', scenarioId: 'door-room' },
  { id: 'call', stateId: 'door_call', title: 'The Call', scenarioId: 'door-call' },
  { id: 'breakdown', stateId: 'door_breakdown', title: 'The Breakdown', scenarioId: 'door-breakdown' },
  { id: 'ask', stateId: 'door_ask', title: 'The Ask', scenarioId: 'door-ask' },
];
