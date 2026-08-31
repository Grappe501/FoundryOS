import type { CampaignConfig } from '../types';

export const kellyCampaign: CampaignConfig = {
  id: 'kelly',
  sessionKey: 'tf.kelly.v1',
  implementedThrough: 'willingness',
  flags: {
    layer2Enabled: false,
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
};

export const kellyCopy = {
  changePrompt: 'What would you change if you had the chance?',
  changePlaceholder: 'Type it. Even a sentence.',
  peopleRuleEyebrow: 'Arkansas',
  peopleRuleTitle: 'The People Rule.',
  peopleRuleLatin: 'Regnat Populus',
  peopleRuleBody: 'Power does not live in a building. It lives with people — including the person holding this phone.',
  willingnessPrompt: 'If you had a chance to help, what would you actually do?',
};
