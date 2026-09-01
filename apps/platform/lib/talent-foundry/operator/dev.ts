import { createSession, patchSession } from '../journey';
import type { CampaignConfig, TalentFoundrySession } from '../types';
import { createOperatorRun } from './engine';

/** Development-only. Never honor this in production builds. */
export function isTalentFoundryDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function readLayer2DevIntent(): boolean {
  if (!isTalentFoundryDev() || typeof window === 'undefined') return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('tfDev') === 'layer2') return true;
    return window.sessionStorage.getItem('tf.dev.layer2') === '1';
  } catch {
    return false;
  }
}

export function markLayer2DevSession(): void {
  if (!isTalentFoundryDev() || typeof window === 'undefined') return;
  window.sessionStorage.setItem('tf.dev.layer2', '1');
}

export function seedLayer2DevSession(campaign: CampaignConfig): TalentFoundrySession {
  const base = createSession(campaign);
  return patchSession(base, {
    stateId: 'layer2_operator',
    flags: {
      keyOne: true,
      identified: true,
      requiredScenarioComplete: true,
      layer2Enabled: true,
      internPathwayEligible: true,
      volunteerCommitment: 'yes',
      willingToAct: true,
    },
    identity: {
      firstName: 'Dev',
      lastName: 'Operator',
      phone: '5015550100',
      email: 'tf.dev.layer2@example.com',
      zip: '72201',
      startWhen: 'Development shortcut',
    },
    operator: createOperatorRun(),
  });
}
