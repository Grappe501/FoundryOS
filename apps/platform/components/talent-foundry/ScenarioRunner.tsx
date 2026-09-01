'use client';

import { useState } from 'react';
import {
  advanceReveal,
  currentBeat,
  isScenarioComplete,
  recordDecision,
} from '../../lib/talent-foundry/scenario-engine';
import type { MemoryPerson } from '../../lib/talent-foundry/people-memory';
import type { ScenarioDef, ScenarioRunState } from '../../lib/talent-foundry/types';
import { PeopleDrawer } from './PeopleDrawer';

export function ScenarioRunner({
  def,
  run,
  onChange,
  onComplete,
  people,
}: {
  def: ScenarioDef;
  run: ScenarioRunState;
  onChange: (next: ScenarioRunState) => void;
  onComplete: (next: ScenarioRunState) => void;
  people?: MemoryPerson[];
}) {
  const [reasoning, setReasoning] = useState('');
  const beat = currentBeat(def, run);

  if (!beat || isScenarioComplete(def, run)) {
    return null;
  }

  const continueReveal = () => {
    const next = advanceReveal(run);
    if (isScenarioComplete(def, next)) onComplete(next);
    else onChange(next);
  };

  const choose = (choiceId: string, choiceLabel: string) => {
    const next = recordDecision(run, beat, choiceId, choiceLabel, reasoning);
    setReasoning('');
    if (isScenarioComplete(def, next)) onComplete(next);
    else onChange(next);
  };

  return (
    <div className="tf-hold">
      {people?.length ? <PeopleDrawer people={people} /> : null}
      {beat.kicker ? <p className="tf-kicker">{beat.kicker}</p> : null}
      {beat.title ? <h1 className="tf-display tf-display-sm">{beat.title}</h1> : null}
      {beat.lines?.length ? (
        <div className="tf-lines">
          {beat.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}
      {beat.body ? <p className="tf-body">{beat.body}</p> : null}
      {beat.people?.length ? (
        <ul className="tf-people">
          {beat.people.map((person) => (
            <li key={person.name}>
              <strong>{person.name}</strong>
              <span>{person.line}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {beat.kind === 'decision' && beat.choices ? (
        <>
          {beat.allowReasoning ? (
            <>
              <label className="tf-reason-label" htmlFor={`tf-reason-${beat.id}`}>
                {beat.reasoningLabel ?? 'A sentence, if you have one.'}
              </label>
              <textarea
                id={`tf-reason-${beat.id}`}
                className="tf-field tf-field-short"
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                maxLength={400}
                autoComplete="off"
              />
            </>
          ) : null}
          <div className="tf-actions">
            {beat.choices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                className="tf-btn"
                onClick={() => choose(choice.id, choice.label)}
              >
                {choice.label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="tf-actions" style={{ marginTop: beat.people ? 8 : 24 }}>
          <button type="button" className="tf-btn tf-btn-primary" onClick={continueReveal}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
