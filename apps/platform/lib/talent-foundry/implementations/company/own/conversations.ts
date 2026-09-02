export type OwnConversation = {
  id: string;
  subject: string;
  bound: string;
};

/** One legal conversation. The software does not grant equity. */
export const OWN_CONVERSATION: OwnConversation = {
  id: 'O-founders',
  subject: 'A founder conversation about whether ownership is even on the table.',
  bound: 'Not a grant. Not a partner track. Finishing the Foundry did not create this.',
};

export function ownConversation(): OwnConversation {
  return OWN_CONVERSATION;
}
