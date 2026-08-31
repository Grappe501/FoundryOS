'use client';

import { kellyCopy } from '../../../lib/talent-foundry/campaigns/kelly';
import {
  AREA_OPTIONS,
  PAID_CHOICES,
  PATHWAY_COPY,
  type MissionDef,
  type PathwayId,
} from '../../../lib/talent-foundry/routing';
import type { ConversionState, IdentityRecord, PaidInterest } from '../../../lib/talent-foundry/types';

const privacyUrl = process.env.NEXT_PUBLIC_CAMPAIGN_PRIVACY_URL;

export function IdentifyFormScreen({
  values,
  errors,
  submitting,
  retryMessage,
  onChange,
  onSubmit,
}: {
  values: Omit<IdentityRecord, 'submissionId' | 'userId' | 'workflowIntakeId'>;
  errors: Record<string, string>;
  submitting: boolean;
  retryMessage: string | null;
  onChange: (field: keyof typeof values, value: string) => void;
  onSubmit: (consent: boolean) => void;
}) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">{kellyCopy.identifyEyebrow}</p>
      <h1 className="tf-display">{kellyCopy.identifyTitle}</h1>
      <p className="tf-body">{kellyCopy.identifyBody}</p>
      <form
        className="tf-id-form"
        onSubmit={(e) => {
          e.preventDefault();
          const consent = new FormData(e.currentTarget).get('consent') === 'on';
          onSubmit(consent);
        }}
      >
        <label>
          First name
          <input
            className="tf-input"
            name="firstName"
            autoComplete="given-name"
            value={values.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
          />
          {errors.firstName ? <span className="tf-field-error">{errors.firstName}</span> : null}
        </label>
        <label>
          Last name
          <input
            className="tf-input"
            name="lastName"
            autoComplete="family-name"
            value={values.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
          />
          {errors.lastName ? <span className="tf-field-error">{errors.lastName}</span> : null}
        </label>
        <label>
          Phone
          <input
            className="tf-input"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
          {errors.phone ? <span className="tf-field-error">{errors.phone}</span> : null}
        </label>
        <label>
          Email
          <input
            className="tf-input"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
          {errors.email ? <span className="tf-field-error">{errors.email}</span> : null}
        </label>
        <label>
          ZIP
          <input
            className="tf-input"
            name="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            value={values.zip}
            onChange={(e) => onChange('zip', e.target.value)}
          />
          {errors.zip ? <span className="tf-field-error">{errors.zip}</span> : null}
        </label>
        <label>
          When can you start?
          <input
            className="tf-input"
            name="startWhen"
            autoComplete="off"
            value={values.startWhen}
            onChange={(e) => onChange('startWhen', e.target.value)}
          />
          {errors.startWhen ? <span className="tf-field-error">{errors.startWhen}</span> : null}
        </label>
        <label className="tf-consent">
          <input type="checkbox" name="consent" />
          <span>
            Share this with the Kelly Grappe campaign so they can follow up about volunteering and recruiting. This
            becomes part of a campaign participation record. It is not a job application and not a hire.
            {privacyUrl ? (
              <>
                {' '}
                <a href={privacyUrl} target="_blank" rel="noreferrer">
                  Campaign privacy page
                </a>
              </>
            ) : null}
          </span>
        </label>
        {errors.consent ? <span className="tf-field-error">{errors.consent}</span> : null}
        {retryMessage ? <p className="tf-retry">{retryMessage}</p> : null}
        <button type="submit" className="tf-btn tf-btn-primary" disabled={submitting}>
          {submitting ? 'Connecting…' : 'Step in'}
        </button>
      </form>
    </div>
  );
}

export function YoureInScreen({ firstName, onContinue }: { firstName: string; onContinue: () => void }) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">In</p>
      <h1 className="tf-display">
        {firstName}, you’re in.
      </h1>
      <p className="tf-body">
        You stepped forward to participate. That is belonging — not a job, not a finalist list, not a promise of pay.
      </p>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export function OpportunityScreen({
  onChoose,
}: {
  onChoose: (value: PaidInterest) => void;
}) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">One role</p>
      <h1 className="tf-display tf-display-sm">One paid position is available now.</h1>
      <p className="tf-body">
        A lead-intern role at $20/hour. The campaign is looking for someone who can show up in Little Rock with real
        flexibility. Hours will follow the work and the funding — not a guaranteed schedule on this screen.
      </p>
      <p className="tf-body">
        As the campaign raises additional resources, we hope to add more paid positions, including opportunities around
        Arkansas. We can&apos;t promise when or where those positions will become available. People already participating
        and demonstrating what they can do may be considered when future opportunities open.
      </p>
      <p className="tf-body">Would you like to be considered for the role that exists now?</p>
      <div className="tf-actions">
        {PAID_CHOICES.map((choice) => (
          <button key={choice.id} type="button" className="tf-btn" onClick={() => onChoose(choice.id)}>
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AvailabilityScreen({
  conversion,
  onPatch,
  onContinue,
}: {
  conversion: ConversionState;
  onPatch: (patch: Partial<ConversionState>) => void;
  onContinue: () => void;
}) {
  const toggleTime = (id: string) => {
    const times = conversion.times.includes(id)
      ? conversion.times.filter((t) => t !== id)
      : [...conversion.times, id];
    onPatch({ times });
  };

  return (
    <div className="tf-hold">
      <p className="tf-kicker">Practical</p>
      <h1 className="tf-display tf-display-sm">How can you actually help?</h1>
      <p className="tf-body">Enough to route you. A human will still talk with you.</p>

      <p className="tf-reason-label">In a typical week</p>
      <div className="tf-actions">
        {[
          ['few', 'A few hours'],
          ['part', 'Part of the week'],
          ['most', 'Most of the week'],
          ['flex', 'It changes — I can stay flexible'],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={conversion.weekly === id ? 'tf-btn tf-btn-selected' : 'tf-btn'}
            aria-pressed={conversion.weekly === id}
            onClick={() => onPatch({ weekly: id })}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="tf-reason-label">When (choose any)</p>
      <div className="tf-actions">
        {[
          ['day', 'Daytime'],
          ['evening', 'Evening'],
          ['weekend', 'Weekend'],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={conversion.times.includes(id) ? 'tf-btn tf-btn-selected' : 'tf-btn'}
            aria-pressed={conversion.times.includes(id)}
            onClick={() => toggleTime(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="tf-reason-label">Little Rock</p>
      <div className="tf-actions">
        {[
          ['yes', 'I can work there'],
          ['sometimes', 'Sometimes'],
          ['no', 'Not in person there'],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={conversion.littleRock === id ? 'tf-btn tf-btn-selected' : 'tf-btn'}
            onClick={() => onPatch({ littleRock: id })}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="tf-reason-label">Travel / driving</p>
      <div className="tf-actions">
        {[
          ['drive_yes', 'I can drive when needed'],
          ['drive_no', 'I don’t drive for this'],
          ['travel_yes', 'I can travel some'],
          ['travel_no', 'I need to stay local'],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={
              (id.startsWith('drive') ? conversion.driving === id : conversion.travel === id)
                ? 'tf-btn tf-btn-selected'
                : 'tf-btn'
            }
            onClick={() =>
              id.startsWith('drive') ? onPatch({ driving: id }) : onPatch({ travel: id })
            }
          >
            {label}
          </button>
        ))}
      </div>

      <p className="tf-reason-label">Remote work from where you are</p>
      <div className="tf-actions">
        {[
          ['yes', 'Yes'],
          ['maybe', 'Maybe'],
          ['no', 'I’d rather be in person'],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={conversion.remote === id ? 'tf-btn tf-btn-selected' : 'tf-btn'}
            onClick={() => onPatch({ remote: id })}
          >
            {label}
          </button>
        ))}
      </div>

      <label className="tf-reason-label" htmlFor="tf-campus">
        School or campus, if any
      </label>
      <input
        id="tf-campus"
        className="tf-input"
        value={conversion.campus}
        onChange={(e) => onPatch({ campus: e.target.value, student: Boolean(e.target.value.trim()) })}
        autoComplete="organization"
      />

      <p className="tf-reason-label">Helping other people find their place</p>
      <div className="tf-actions">
        {[
          ['yes', 'I want to help lead that'],
          ['maybe', 'Maybe later'],
          ['no', 'I want to contribute, not lead yet'],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={conversion.leadership === id ? 'tf-btn tf-btn-selected' : 'tf-btn'}
            onClick={() => onPatch({ leadership: id })}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="tf-actions" style={{ marginTop: 22 }}>
        <button type="button" className="tf-btn tf-btn-primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export function PathwayScreen({
  conversion,
  pathwayId,
  onToggleArea,
  onContinue,
}: {
  conversion: ConversionState;
  pathwayId: PathwayId;
  onToggleArea: (id: string) => void;
  onContinue: () => void;
}) {
  const pathway = PATHWAY_COPY[pathwayId];
  return (
    <div className="tf-hold">
      <p className="tf-kicker">Arkansas</p>
      <h1 className="tf-display tf-display-sm">The People Rule where you are.</h1>
      <p className="tf-body">
        Home. School. College. Your town. Your county. Little Rock. Events. The road. We are building leaders across
        Arkansas — not a single room in one city.
      </p>
      <p className="tf-reason-label">Where would you genuinely like to contribute?</p>
      <div className="tf-actions">
        {AREA_OPTIONS.map((area) => (
          <button
            key={area.id}
            type="button"
            className={conversion.areas.includes(area.id) ? 'tf-btn tf-btn-selected' : 'tf-btn'}
            aria-pressed={conversion.areas.includes(area.id)}
            onClick={() => onToggleArea(area.id)}
          >
            {area.label}
          </button>
        ))}
      </div>
      <div className="tf-echo" style={{ marginTop: 22 }}>
        {pathway.title}
      </div>
      <p className="tf-body">{pathway.body}</p>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onContinue} disabled={conversion.areas.length === 0}>
          Continue
        </button>
      </div>
    </div>
  );
}

export function MissionScreen({
  mission,
  saving,
  retryMessage,
  onContinue,
}: {
  mission: MissionDef;
  saving: boolean;
  retryMessage: string | null;
  onContinue: () => void;
}) {
  const copyMission = async () => {
    const text = `YOUR FIRST MISSION\n${mission.title}\n\n${mission.body}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="tf-hold">
      <p className="tf-kicker">Begin</p>
      <h1 className="tf-display tf-display-sm">Your first mission</h1>
      <div className="tf-mission">
        <strong>{mission.title}</strong>
        <p>{mission.body}</p>
      </div>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-ghost" onClick={() => void copyMission()}>
          Copy mission
        </button>
        {retryMessage ? <p className="tf-retry">{retryMessage}</p> : null}
        <button type="button" className="tf-btn tf-btn-primary" onClick={onContinue} disabled={saving}>
          {saving ? 'Saving this step…' : 'I have this'}
        </button>
      </div>
    </div>
  );
}

export function HandoffScreen({
  areas,
  mission,
}: {
  areas: string[];
  mission: MissionDef;
}) {
  const labels = AREA_OPTIONS.filter((a) => areas.includes(a.id)).map((a) => a.label);
  return (
    <div className="tf-hold">
      <p className="tf-kicker">Handoff</p>
      <h1 className="tf-display">You showed up. Now we do.</h1>
      <p className="tf-body">
        A campaign team member will follow up. There is no automated next mission after this. That is the point.
      </p>
      {labels.length ? <p className="tf-body">You asked to help with: {labels.join(', ')}.</p> : null}
      <div className="tf-mission">
        <strong>First mission</strong>
        <p>
          {mission.title}. {mission.body}
        </p>
      </div>
    </div>
  );
}
