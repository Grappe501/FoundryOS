'use client';

import { kellyCampaign, kellyCopy, kellyDoors } from '../../../lib/talent-foundry/campaigns/kelly';
import type { CommitmentChoice, ConsequenceCard, OptionalDoor, VolunteerCommitment } from '../../../lib/talent-foundry/types';

export function CommitmentScreen({
  onChoose,
}: {
  onChoose: (choice: CommitmentChoice) => void;
}) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">{kellyCopy.commitmentEyebrow}</p>
      <h1 className="tf-display">{kellyCopy.commitmentTitle}</h1>
      <p className="tf-body">{kellyCopy.commitmentBody}</p>
      <div className="tf-actions">
        {kellyCampaign.commitmentChoices.map((choice) => (
          <button key={choice.id} type="button" className="tf-btn" onClick={() => onChoose(choice)}>
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CommitmentHoldScreen({
  commitment,
  onContinue,
}: {
  commitment: VolunteerCommitment | null;
  onContinue: () => void;
}) {
  if (commitment !== 'not_now') return null;
  return (
    <div className="tf-hold">
      <p className="tf-kicker">{kellyCopy.commitmentEyebrow}</p>
      <p className="tf-body">{kellyCopy.commitmentAfterNo}</p>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export function LeadChallengeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">{kellyCopy.leadEyebrow}</p>
      <div className="tf-lines">
        <p>{kellyCopy.leadLine1}</p>
        <p>{kellyCopy.leadLine2}</p>
      </div>
      <p className="tf-body">{kellyCopy.leadBody}</p>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onContinue}>
          {kellyCopy.leadCta}
        </button>
      </div>
    </div>
  );
}

export function ScenarioBriefScreen({ step, onContinue }: { step: number; onContinue: () => void }) {
  const slides = [
    { lines: ['Five volunteers just showed up.'] },
    { lines: ['Nobody left instructions for them.'] },
    { lines: ['You’re the person at headquarters.', 'What do you do?'] },
  ];
  const slide = slides[Math.min(step, slides.length - 1)] ?? slides[0];
  return (
    <div className="tf-hold">
      <p className="tf-kicker">{kellyCopy.briefEyebrow}</p>
      <div className="tf-lines">
        {slide.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <div className="tf-actions" style={{ marginTop: 32 }}>
        <button type="button" className="tf-btn tf-btn-primary" onClick={onContinue}>
          {step >= slides.length - 1 ? 'Begin' : 'Continue'}
        </button>
      </div>
    </div>
  );
}

export function ConsequencesScreen({
  cards,
  onContinue,
}: {
  cards: ConsequenceCard[];
  onContinue: () => void;
}) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">Later</p>
      <h1 className="tf-display tf-display-sm">The room is different now.</h1>
      <ul className="tf-consequences">
        {cards.map((card) => (
          <li key={card.title + card.body}>
            <strong>{card.title}</strong>
            <span>{card.body}</span>
          </li>
        ))}
      </ul>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export function RevisionScreen({
  answer,
  explanation,
  onAnswer,
  onExplanation,
  onSubmit,
}: {
  answer: 'yes' | 'no' | null;
  explanation: string;
  onAnswer: (value: 'yes' | 'no') => void;
  onExplanation: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">{kellyCopy.revisionEyebrow}</p>
      <h1 className="tf-display tf-display-sm">{kellyCopy.revisionTitle}</h1>
      <p className="tf-body">{kellyCopy.revisionQuestion}</p>
      <div className="tf-actions">
        <button
          type="button"
          className={answer === 'yes' ? 'tf-btn tf-btn-selected' : 'tf-btn'}
          aria-pressed={answer === 'yes'}
          onClick={() => onAnswer('yes')}
        >
          Yes
        </button>
        <button
          type="button"
          className={answer === 'no' ? 'tf-btn tf-btn-selected' : 'tf-btn'}
          aria-pressed={answer === 'no'}
          onClick={() => onAnswer('no')}
        >
          No
        </button>
      </div>
      <label className="tf-reason-label" htmlFor="tf-revision">
        {kellyCopy.revisionPlaceholder}
      </label>
      <textarea
        id="tf-revision"
        className="tf-field tf-field-short"
        value={explanation}
        onChange={(e) => onExplanation(e.target.value)}
        maxLength={500}
        autoComplete="off"
      />
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onSubmit} disabled={!answer}>
          Continue
        </button>
      </div>
    </div>
  );
}

export function OptionalDoorsScreen({
  completed,
  onEnter,
  onContinue,
}: {
  completed: string[];
  onEnter: (door: OptionalDoor) => void;
  onContinue: () => void;
}) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">{kellyCopy.doorsEyebrow}</p>
      <h1 className="tf-display tf-display-sm">{kellyCopy.doorsTitle}</h1>
      <p className="tf-body">{kellyCopy.doorsBody}</p>
      <div className="tf-doors">
        {kellyDoors.map((door) => {
          const done = completed.includes(door.id);
          return (
            <button key={door.id} type="button" className="tf-door" onClick={() => onEnter(door)}>
              <span>{door.title}</span>
              {done ? <em>Visited</em> : <em>{kellyCopy.doorsKeep}</em>}
            </button>
          );
        })}
      </div>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onContinue}>
          {kellyCopy.doorsContinue}
        </button>
      </div>
    </div>
  );
}

export function KeyOneScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="tf-hold tf-key">
      <p className="tf-kicker">{kellyCopy.keyEyebrow}</p>
      <p className="tf-key-mark" aria-hidden>
        01
      </p>
      <h1 className="tf-display">{kellyCopy.keyTitle}</h1>
      <p className="tf-latin">{kellyCopy.keyRule}</p>
      <p className="tf-body">{kellyCopy.keyBody}</p>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export function IdentifyThresholdScreen() {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">{kellyCopy.identifyEyebrow}</p>
      <h1 className="tf-display">{kellyCopy.identifyTitle}</h1>
      <p className="tf-body">{kellyCopy.identifyBody}</p>
      <form className="tf-id-form" onSubmit={(e) => e.preventDefault()} autoComplete="off">
        <label>
          First name
          <input className="tf-input" name="firstName" autoComplete="given-name" />
        </label>
        <label>
          Last name
          <input className="tf-input" name="lastName" autoComplete="family-name" />
        </label>
        <label>
          Phone
          <input className="tf-input" name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          Email
          <input className="tf-input" name="email" type="email" autoComplete="email" />
        </label>
        <label>
          ZIP
          <input className="tf-input" name="zip" inputMode="numeric" autoComplete="postal-code" />
        </label>
        <label>
          When can you start?
          <input className="tf-input" name="startWhen" autoComplete="off" />
        </label>
        <p className="tf-id-note">{kellyCopy.identifyPending}</p>
        <button type="button" className="tf-btn tf-btn-primary" disabled>
          Not this door
        </button>
      </form>
    </div>
  );
}
