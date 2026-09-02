import type { TalentFoundrySession } from '../types';

export function resumeLinkCopy(session: TalentFoundrySession): { title: string; body: string } {
  if (session.stateId === 'layer2_operator') {
    return { title: 'Welcome back.', body: 'You left the shift in motion.' };
  }
  if (session.stateId === 'layer3_leader') {
    return { title: 'Welcome back.', body: 'The people are still yours to develop.' };
  }
  if (session.flags.keyTwo) {
    return { title: 'Welcome back.', body: 'You still have Key Two.' };
  }
  if (session.flags.keyOne) {
    return { title: 'Welcome back.', body: 'You still have Key One.' };
  }
  return { title: 'Welcome back.', body: 'Your place is still here.' };
}
