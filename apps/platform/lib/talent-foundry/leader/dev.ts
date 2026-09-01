import { createSession, patchSession } from '../journey';
import { createOperatorRun } from '../operator/engine';
import type { CampaignConfig, TalentFoundrySession } from '../types';
import { createLeaderRun } from './engine';

/** Development-only. Never honor this in production builds. */
export function isTalentFoundryDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function readLayer3DevIntent(): boolean {
  if (!isTalentFoundryDev() || typeof window === 'undefined') return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('tfDev') === 'layer3') return true;
    return window.sessionStorage.getItem('tf.dev.layer3') === '1';
  } catch {
    return false;
  }
}

export function markLayer3DevSession(): void {
  if (!isTalentFoundryDev() || typeof window === 'undefined') return;
  window.sessionStorage.setItem('tf.dev.layer3', '1');
}

export function seedLayer3DevSession(campaign: CampaignConfig): TalentFoundrySession {
  const base = createSession(campaign);
  return patchSession(base, {
    stateId: 'layer3_leader',
    flags: {
      keyOne: true,
      keyTwo: true,
      identified: true,
      requiredScenarioComplete: true,
      layer2Enabled: true,
      layer3Enabled: true,
      internPathwayEligible: true,
      volunteerCommitment: 'yes',
      willingToAct: true,
    },
    identity: {
      firstName: 'Dev',
      lastName: 'Leader',
      phone: '5015550103',
      email: 'tf.dev.layer3@example.com',
      zip: '72201',
      startWhen: 'Development shortcut',
    },
    operator: createOperatorRun(),
    leader: createLeaderRun(),
  });
}
