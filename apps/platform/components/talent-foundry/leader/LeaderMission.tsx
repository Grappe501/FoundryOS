'use client';

import { useId, useState } from 'react';
import { leaderCopy, leaderMission } from '../../../lib/talent-foundry/campaigns/leader/people';
import {
  applyLeaderPatch,
  canAdvanceLeader,
  nextLeaderPhase,
  placementFor,
  setPlacement,
} from '../../../lib/talent-foundry/leader/engine';
import type { LeaderPhase, LeaderRunState } from '../../../lib/talent-foundry/leader/types';

function Field({
  id,
  label,
  value,
  onChange,
  rows = 3,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <>
      <label className="tf-reason-label" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className="tf-field tf-field-short"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={500}
        rows={rows}
        autoComplete="off"
      />
    </>
  );
}

function Choices({
  options,
  selected,
  onPick,
}: {
  options: { id: string; label: string }[];
  selected: string | null;
  onPick: (id: string) => void;
}) {
  return (
    <div className="tf-actions" role="group">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          className={selected === opt.id ? 'tf-btn tf-btn-selected' : 'tf-btn'}
          aria-pressed={selected === opt.id}
          onClick={() => onPick(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Continue({
  run,
  onAdvance,
  onFinish,
  label = leaderCopy.continue,
}: {
  run: LeaderRunState;
  onAdvance: (next: LeaderRunState) => void;
  onFinish?: (next: LeaderRunState) => void;
  label?: string;
}) {
  const ready = canAdvanceLeader(run);
  return (
    <div className="tf-actions">
      <button
        type="button"
        className="tf-btn tf-btn-primary"
        disabled={!ready}
        onClick={() => {
          if (!ready) return;
          if (run.phase === 'self' && onFinish) {
            onFinish(applyLeaderPatch(run, { phase: 'self', persistAt: 'complete' }));
            return;
          }
          onAdvance(applyLeaderPatch(run, { phase: nextLeaderPhase(run) }));
        }}
      >
        {label}
      </button>
    </div>
  );
}

function PersonCard({
  personId,
  selected,
  seatLabel,
  onSelect,
}: {
  personId: string;
  selected?: boolean;
  seatLabel?: string;
  onSelect?: () => void;
}) {
  const person = leaderMission.people.find((p) => p.id === personId);
  if (!person) return null;
  const inner = (
    <>
      <strong>{person.name}</strong>
      <span className="tf-ld-from">{person.from}</span>
      <em>{person.pattern}</em>
      {seatLabel ? <b>{seatLabel}</b> : null}
      <ul>
        {person.facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
    </>
  );
  if (!onSelect) return <div className="tf-ld-card">{inner}</div>;
  return (
    <button type="button" className={selected ? 'tf-ld-card tf-ld-card-on' : 'tf-ld-card'} onClick={onSelect} aria-pressed={selected}>
      {inner}
    </button>
  );
}

function PlacementBoard({
  run,
  onChange,
}: {
  run: LeaderRunState;
  onChange: (next: LeaderRunState) => void;
}) {
  const [openPerson, setOpenPerson] = useState<string | null>(null);
  return (
    <ul className="tf-ld-roster">
      {leaderMission.people.map((person) => {
        const seatId = placementFor(run, person.id);
        const seat = leaderMission.seats.find((s) => s.id === seatId);
        const open = openPerson === person.id;
        return (
          <li key={person.id}>
            <button
              type="button"
              className={`tf-ld-card ${seatId ? 'tf-ld-card-set' : ''} ${open ? 'tf-ld-card-on' : ''}`}
              aria-expanded={open}
              onClick={() => setOpenPerson((cur) => (cur === person.id ? null : person.id))}
            >
              <strong>{person.name}</strong>
              <span className="tf-ld-from">{person.from}</span>
              <em>{person.pattern}</em>
              <b>{seat?.label ?? 'Unplaced'}</b>
            </button>
            {open ? (
              <div className="tf-op-pick">
                {leaderMission.seats.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={seatId === option.id ? 'tf-btn tf-btn-selected' : 'tf-btn'}
                    onClick={() => {
                      onChange(setPlacement(run, person.id, option.id));
                      setOpenPerson(null);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function LeaderMission({
  run,
  onChange,
  onAdvance,
  onFinish,
}: {
  run: LeaderRunState;
  onChange: (next: LeaderRunState) => void;
  onAdvance: (next: LeaderRunState) => void;
  onFinish: (next: LeaderRunState) => void;
}) {
  const coachId = useId();
  const correctId = useId();
  const investId = useId();
  const paidId = useId();
  const leftoverId = useId();
  const selfId = useId();
  const phase: LeaderPhase = run.phase;

  if (phase === 'opening') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{leaderCopy.kicker}</p>
        <div className="tf-lines">
          {leaderCopy.openingLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <Continue run={run} onAdvance={onAdvance} />
      </div>
    );
  }

  if (phase === 'roster') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{leaderCopy.kicker}</p>
        <h1 className="tf-display tf-display-sm">{leaderCopy.rosterTitle}</h1>
        <p className="tf-body">{leaderCopy.rosterBody}</p>
        <p className="tf-latin">{leaderCopy.compositeNotice}</p>
        <div className="tf-ld-stack">
          {leaderMission.people.map((person) => (
            <PersonCard key={person.id} personId={person.id} />
          ))}
        </div>
        <Continue run={run} onAdvance={onAdvance} />
      </div>
    );
  }

  if (phase === 'place') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{leaderCopy.kicker}</p>
        <h1 className="tf-display tf-display-sm">{leaderCopy.placeTitle}</h1>
        <p className="tf-body">{leaderCopy.placeBody}</p>
        <PlacementBoard run={run} onChange={onChange} />
        <Continue run={run} onAdvance={onAdvance} />
      </div>
    );
  }

  if (phase === 'coach') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{leaderCopy.kicker}</p>
        <h1 className="tf-display tf-display-sm">{leaderCopy.coachTitle}</h1>
        <p className="tf-reason-label">Who</p>
        <Choices
          options={leaderMission.people.map((p) => ({ id: p.id, label: p.name }))}
          selected={run.coachWho}
          onPick={(coachWho) => onChange({ ...run, coachWho })}
        />
        <p className="tf-reason-label">How</p>
        <Choices options={leaderMission.coachHow} selected={run.coachHow} onPick={(coachHow) => onChange({ ...run, coachHow })} />
        <Field id={coachId} label={leaderCopy.coachNote} value={run.coachNote} onChange={(coachNote) => onChange({ ...run, coachNote })} />
        <Continue run={run} onAdvance={onAdvance} />
      </div>
    );
  }

  if (phase === 'correct') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{leaderCopy.correctKicker}</p>
        <h1 className="tf-display tf-display-sm">{leaderCopy.correctTitle}</h1>
        <p className="tf-body">{leaderCopy.correctBody}</p>
        <PersonCard personId="cam" />
        <Choices options={leaderMission.correctChoices} selected={run.correctAct} onPick={(correctAct) => onChange({ ...run, correctAct })} />
        <Field id={correctId} label={leaderCopy.correctNote} value={run.correctNote} onChange={(correctNote) => onChange({ ...run, correctNote })} />
        <Continue run={run} onAdvance={onAdvance} />
      </div>
    );
  }

  if (phase === 'protect') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{leaderCopy.kicker}</p>
        <h1 className="tf-display tf-display-sm">{leaderCopy.protectTitle}</h1>
        <p className="tf-body">{leaderCopy.protectBody}</p>
        <PersonCard personId="imani" />
        <Choices options={leaderMission.protectHow} selected={run.protectHow} onPick={(protectHow) => onChange({ ...run, protectHow })} />
        <Continue run={run} onAdvance={onAdvance} />
      </div>
    );
  }

  if (phase === 'invest') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{leaderCopy.kicker}</p>
        <h1 className="tf-display tf-display-sm">{leaderCopy.investTitle}</h1>
        <p className="tf-body">{leaderCopy.investBody}</p>
        <Choices
          options={leaderMission.people.map((p) => ({ id: p.id, label: p.name }))}
          selected={run.investWho}
          onPick={(investWho) => onChange({ ...run, investWho })}
        />
        <Choices options={leaderMission.investHow} selected={run.investHow} onPick={(investHow) => onChange({ ...run, investHow })} />
        <Field id={investId} label={leaderCopy.investPlan} value={run.investPlan} onChange={(investPlan) => onChange({ ...run, investPlan })} />
        <Continue run={run} onAdvance={onAdvance} />
      </div>
    );
  }

  if (phase === 'paid_need') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{leaderCopy.kicker}</p>
        <h1 className="tf-display tf-display-sm">{leaderCopy.paidNeedTitle}</h1>
        <p className="tf-body">{leaderCopy.paidNeedBody}</p>
        <p className="tf-latin">{leaderCopy.compositeNotice}</p>
        <Choices options={leaderMission.paidNeeds} selected={run.paidNeed} onPick={(paidNeed) => onChange({ ...run, paidNeed })} />
        <Continue run={run} onAdvance={onAdvance} />
      </div>
    );
  }

  if (phase === 'paid_who') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{leaderCopy.kicker}</p>
        <h1 className="tf-display tf-display-sm">{leaderCopy.paidWhoTitle}</h1>
        <p className="tf-body">{leaderCopy.paidWhoBody}</p>
        <Choices
          options={leaderMission.people.map((p) => ({ id: p.id, label: p.name }))}
          selected={run.paidWho}
          onPick={(paidWho) => onChange({ ...run, paidWho })}
        />
        <Field
          id={paidId}
          label="Why them — and how you will develop them in the role."
          value={run.paidWhy}
          onChange={(paidWhy) => onChange({ ...run, paidWhy })}
          rows={4}
        />
        <Continue run={run} onAdvance={onAdvance} />
      </div>
    );
  }

  if (phase === 'leftover') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{leaderCopy.kicker}</p>
        <h1 className="tf-display tf-display-sm">{leaderCopy.leftoverTitle}</h1>
        <p className="tf-body">{leaderCopy.leftoverBody}</p>
        <Field id={leftoverId} label="What the others hear." value={run.leftoverNote} onChange={(leftoverNote) => onChange({ ...run, leftoverNote })} rows={4} />
        <Continue run={run} onAdvance={onAdvance} />
      </div>
    );
  }

  if (phase === 'mirror') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{leaderCopy.kicker}</p>
        <div className="tf-lines">
          {leaderCopy.mirrorLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <Continue run={run} onAdvance={onAdvance} />
      </div>
    );
  }

  return (
    <div className="tf-hold">
      <p className="tf-kicker">{leaderCopy.selfKicker}</p>
      <h1 className="tf-display">{leaderCopy.selfTitle}</h1>
      <p className="tf-body">{leaderCopy.selfBody}</p>
      <Field id={selfId} label="What you would tell yourself." value={run.selfCoach} onChange={(selfCoach) => onChange({ ...run, selfCoach })} rows={4} />
      <p className="tf-latin">{leaderCopy.thankYou}</p>
      <Continue run={run} onAdvance={onAdvance} onFinish={onFinish} />
    </div>
  );
}
