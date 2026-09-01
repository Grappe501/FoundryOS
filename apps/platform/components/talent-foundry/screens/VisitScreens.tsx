'use client';

import { CHAPTER_LABEL, FIRST_VISIT_DOOR, VISIT_INTENTS, intentSummary } from '../../../lib/talent-foundry/visit';
import { kellyDoors } from '../../../lib/talent-foundry/campaigns/kelly';
import type { ChapterId, ConversionState, VisitIntent } from '../../../lib/talent-foundry/types';
import { AREA_OPTIONS, type MissionDef, type PathwayId, PATHWAY_COPY } from '../../../lib/talent-foundry/routing';

export function ChapterMark({ chapter }: { chapter: ChapterId | null }) {
  if (!chapter) return null;
  return (
    <p className="tf-chapter" aria-live="polite">
      {CHAPTER_LABEL[chapter]}
    </p>
  );
}

export function IntentScreen({ onChoose }: { onChoose: (intent: VisitIntent) => void }) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">A question</p>
      <h1 className="tf-display">What brings you here?</h1>
      <p className="tf-body">This is not an application. Say what is true.</p>
      <div className="tf-actions">
        {VISIT_INTENTS.map((choice) => (
          <button key={choice.id} type="button" className="tf-btn tf-btn-primary" onClick={() => onChoose(choice.id)}>
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PaidBriefScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">One role</p>
      <h1 className="tf-display tf-display-sm">One paid lead-intern role is open now.</h1>
      <p className="tf-body">$20/hour. It needs real flexibility and the ability to work in Little Rock.</p>
      <p className="tf-body">Future paid positions may become possible as resources grow. Nothing else is promised.</p>
      <p className="tf-latin">Interest is not selection.</p>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export function OneDoorScreen({
  onOpen,
  onSkip,
}: {
  onOpen: () => void;
  onSkip: () => void;
}) {
  const door = kellyDoors.find((d) => d.id === FIRST_VISIT_DOOR) ?? kellyDoors[0];
  return (
    <div className="tf-hold">
      <p className="tf-kicker">Optional</p>
      <h1 className="tf-display">You noticed another door.</h1>
      <p className="tf-body">Going deeper is optional. Skipping this does not count against you.</p>
      <p className="tf-latin">{door.title}</p>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onOpen}>
          Open it
        </button>
        <button type="button" className="tf-btn" onClick={onSkip}>
          Keep moving
        </button>
      </div>
    </div>
  );
}

export function VolunteerRouteScreen({
  conversion,
  onPatch,
  onContinue,
}: {
  conversion: ConversionState;
  onPatch: (patch: Partial<ConversionState>) => void;
  onContinue: () => void;
}) {
  const places = [
    ['remote', 'Home / remote'],
    ['campus', 'School / campus'],
    ['community', 'Local community'],
    ['office', 'Little Rock'],
    ['events', 'Events / road'],
  ];
  return (
    <div className="tf-hold">
      <p className="tf-kicker">Your path</p>
      <h1 className="tf-display tf-display-sm">Where can you help?</h1>
      <div className="tf-actions">
        {places.map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={conversion.areas.includes(id) ? 'tf-btn tf-btn-selected' : 'tf-btn'}
            aria-pressed={conversion.areas.includes(id)}
            onClick={() => {
              const areas = conversion.areas.includes(id)
                ? conversion.areas.filter((a) => a !== id)
                : [...conversion.areas, id];
              onPatch({ areas, remote: id === 'remote' ? 'yes' : conversion.remote });
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="tf-reason-label">What interests you?</p>
      <div className="tf-actions">
        {AREA_OPTIONS.filter((a) => ['social', 'community', 'campus', 'events', 'creative', 'office', 'remote'].includes(a.id)).map((area) => (
          <button
            key={area.id}
            type="button"
            className={conversion.areas.includes(area.id) ? 'tf-btn tf-btn-selected' : 'tf-btn'}
            aria-pressed={conversion.areas.includes(area.id)}
            onClick={() => {
              const areas = conversion.areas.includes(area.id)
                ? conversion.areas.filter((a) => a !== area.id)
                : [...conversion.areas, area.id];
              onPatch({ areas });
            }}
          >
            {area.label}
          </button>
        ))}
      </div>
      <p className="tf-reason-label">Time you can actually give</p>
      <div className="tf-actions">
        {[
          ['few', 'A few hours'],
          ['part', 'Part of the week'],
          ['flex', 'Flexible'],
          ['other', 'Other'],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={conversion.weekly === id ? 'tf-btn tf-btn-selected' : 'tf-btn'}
            onClick={() => onPatch({ weekly: id })}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" disabled={!conversion.areas.length} onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export function ExploreRouteScreen({
  onSeeWays,
  onGoodForNow,
}: {
  onSeeWays: () => void;
  onGoodForNow: () => void;
}) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">Looking</p>
      <h1 className="tf-display tf-display-sm">You don’t have to apply tonight.</h1>
      <p className="tf-body">See a way you could help, or stop here. Both are welcome.</p>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onSeeWays}>
          See ways I could help
        </button>
        <button type="button" className="tf-btn" onClick={onGoodForNow}>
          I’m good for now
        </button>
      </div>
    </div>
  );
}

export function StillInScreen({
  firstName,
  intent,
  pathwayId,
  mission,
  onDeeper,
  onFinish,
  deeperLabel,
}: {
  firstName?: string;
  intent: VisitIntent | null;
  pathwayId: PathwayId | string | null;
  mission: MissionDef | null;
  onDeeper?: () => void;
  onFinish: () => void;
  deeperLabel?: string;
}) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">{firstName ? firstName : 'In'}</p>
      <h1 className="tf-display">You’re still in.</h1>
      <p className="tf-body">We’ve got what we need for now.</p>
      <p className="tf-body">{intentSummary(intent)}</p>
      {pathwayId && pathwayId in PATHWAY_COPY ? (
        <p className="tf-body">
          {PATHWAY_COPY[pathwayId as PathwayId].title}. {PATHWAY_COPY[pathwayId as PathwayId].body}
        </p>
      ) : null}
      {mission ? (
        <div className="tf-mission">
          <strong>First mission</strong>
          <p>
            {mission.title}. {mission.body}
          </p>
        </div>
      ) : null}
      <p className="tf-latin">A human on the campaign can review this.</p>
      <div className="tf-actions">
        {onDeeper ? (
          <button type="button" className="tf-btn tf-btn-primary" onClick={onDeeper}>
            {deeperLabel ?? 'Go deeper'}
          </button>
        ) : null}
        <button type="button" className="tf-btn" onClick={onFinish}>
          Finish for now
        </button>
      </div>
    </div>
  );
}

export function VisitCompleteScreen({ hasMission }: { hasMission: boolean }) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">In</p>
      <h1 className="tf-display">You’re in.</h1>
      <p className="tf-body">We’ve got what we need for now.</p>
      {hasMission ? <p className="tf-body">Your mission is yours whenever you’re ready.</p> : null}
      <p className="tf-latin">The People Rule.</p>
    </div>
  );
}

export function Layer2OfferScreen({
  onUse,
  onSave,
}: {
  onUse: () => void;
  onSave: () => void;
}) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">Earlier</p>
      <h1 className="tf-display">You found something earlier.</h1>
      <p className="tf-body">You can use it now.</p>
      <p className="tf-body">This next experience takes about 10 minutes.</p>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onUse}>
          Use the key
        </button>
        <button type="button" className="tf-btn" onClick={onSave}>
          Save it for later
        </button>
      </div>
    </div>
  );
}

export function Layer3OfferScreen({
  onKeep,
  onSave,
}: {
  onKeep: () => void;
  onSave: () => void;
}) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">Tomorrow</p>
      <div className="tf-lines">
        <p>The shift is over.</p>
        <p>There is another door.</p>
      </div>
      <p className="tf-body">The next experience is about the people you lead. It takes about 10 minutes.</p>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onKeep}>
          Keep going
        </button>
        <button type="button" className="tf-btn" onClick={onSave}>
          Save this for later
        </button>
      </div>
    </div>
  );
}

export function ResumeBanner({
  title,
  body,
  onContinue,
}: {
  title: string;
  body: string;
  onContinue: () => void;
}) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">Welcome back</p>
      <h1 className="tf-display tf-display-sm">{title}</h1>
      <p className="tf-body">{body}</p>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
