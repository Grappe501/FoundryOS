import { TALENT_FOUNDRY_SOURCE } from './constants';
import type { TalentFoundryPayload } from './evidence';

export type IdentifyFields = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  zip: string;
  startWhen: string;
};

export type RedDirtFormsResult = {
  ok: true;
  submissionId: string;
  userId: string | null;
  workflowIntakeId: string;
};

export function reddirtFormsUrl(): string | null {
  const raw = process.env.REDDIRT_FORMS_URL?.trim();
  return raw || null;
}

export async function postVolunteerToRedDirt(input: {
  identity: IdentifyFields;
  talentFoundry: TalentFoundryPayload;
  availability?: string;
  skills?: string;
  leadershipInterest?: boolean;
  interests?: string[];
  notes?: string;
}): Promise<RedDirtFormsResult | { ok: false; error: string; status: number }> {
  const url = reddirtFormsUrl();
  if (!url) {
    return { ok: false, error: 'not_configured', status: 503 };
  }

  const body = {
    formType: 'volunteer',
    firstName: input.identity.firstName.slice(0, 80),
    lastName: input.identity.lastName.slice(0, 80),
    email: input.identity.email.trim().toLowerCase(),
    phone: input.identity.phone.slice(0, 40),
    zip: input.identity.zip.slice(0, 12),
    preferredRole: 'not_sure',
    preferredLanguage: 'english',
    student: Boolean(input.talentFoundry.routing && input.talentFoundry.routing.student),
    schoolCampus:
      typeof input.talentFoundry.routing?.campus === 'string'
        ? input.talentFoundry.routing.campus.slice(0, 200)
        : undefined,
    leadershipInterest: Boolean(input.leadershipInterest),
    interests: [TALENT_FOUNDRY_SOURCE, ...(input.interests ?? [])].slice(0, 20),
    availability: input.availability?.slice(0, 500) || input.identity.startWhen.slice(0, 500),
    skills: input.skills?.slice(0, 2000),
    notes: input.notes?.slice(0, 3000),
    sourcePage: '/talent-foundry',
    sourceComponent: input.talentFoundry.phase === 'continue' ? 'continue' : 'identify',
    sourceCampaign: TALENT_FOUNDRY_SOURCE,
    consentEmail: true,
    talentFoundry: input.talentFoundry,
  };

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, error: 'unreachable', status: 503 };
  }

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    return { ok: false, error: 'invalid_response', status: 502 };
  }

  const rec = json && typeof json === 'object' ? (json as Record<string, unknown>) : {};
  if (!res.ok || rec.ok !== true) {
    return { ok: false, error: typeof rec.error === 'string' ? rec.error : 'persist_failed', status: res.status || 502 };
  }

  return {
    ok: true,
    submissionId: String(rec.submissionId ?? ''),
    userId: rec.userId ? String(rec.userId) : null,
    workflowIntakeId: String(rec.workflowIntakeId ?? ''),
  };
}
