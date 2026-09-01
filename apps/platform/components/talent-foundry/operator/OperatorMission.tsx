'use client';

import { useEffect, useId, useState } from 'react';
import { shiftCopy, shiftMission } from '../../../lib/talent-foundry/campaigns/operator/shift';
import { deriveWorld, finaleFacts } from '../../../lib/talent-foundry/operator/consequences';
import {
  applyOperatorPatch,
  nextOperatorPhase,
  setAssignment,
} from '../../../lib/talent-foundry/operator/engine';
import type { OperatorPhase, OperatorRunState } from '../../../lib/talent-foundry/operator/types';

function haptic(kind: 'time' | 'interrupt' | 'key') {
  if (typeof navigator === 'undefined' || !navigator.vibrate) return;
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try {
    navigator.vibrate(kind === 'key' ? [20, 30, 40] : kind === 'interrupt' ? [16, 24, 16] : [12]);
  } catch {
    /* ignore */
  }
}

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
  multi,
}: {
  options: { id: string; label: string }[];
  selected: string | string[] | null;
  onPick: (id: string) => void;
  multi?: boolean;
}) {
  return (
    <div className="tf-actions" role={multi ? 'group' : undefined}>
      {options.map((opt) => {
        const on = Array.isArray(selected) ? selected.includes(opt.id) : selected === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            className={on ? 'tf-btn tf-btn-selected' : 'tf-btn'}
            aria-pressed={on}
            onClick={() => onPick(opt.id)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Board({
  run,
  clock,
  assignable,
  onAssign,
}: {
  run: OperatorRunState;
  clock: 'open' | 'waveOne' | 'waveTwo' | 'finale';
  assignable?: boolean;
  onAssign?: (needId: string, actorId: string | null) => void;
}) {
  const world = deriveWorld(run, shiftMission, clock);
  const [openNeed, setOpenNeed] = useState<string | null>(null);
  return (
    <div className="tf-op-board">
      <p className="tf-op-clock" aria-live="polite">
        <span>{world.clock}</span>
        <span>{shiftMission.place}</span>
      </p>
      <ul className="tf-op-needs">
        {shiftMission.needs.map((need) => {
          const row = world.board.find((b) => b.needId === need.id);
          return (
            <li key={need.id}>
              <button
                type="button"
                className={`tf-op-need tf-op-need-${row?.status ?? 'open'}`}
                disabled={!assignable}
                aria-expanded={assignable ? openNeed === need.id : undefined}
                onClick={() => assignable && setOpenNeed((cur) => (cur === need.id ? null : need.id))}
              >
                <strong>{need.label}</strong>
                <em>{row?.note ?? 'Open'}</em>
              </button>
              {assignable && openNeed === need.id ? (
                <div className="tf-op-pick" role="group" aria-label={`Assign ${need.label}`}>
                  {shiftMission.people.map((person) => (
                    <button
                      key={person.id}
                      type="button"
                      className="tf-btn"
                      onClick={() => {
                        onAssign?.(need.id, person.id);
                        setOpenNeed(null);
                      }}
                    >
                      {person.isSelf ? shiftCopy.handleSelf : person.name}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="tf-btn tf-btn-ghost"
                    onClick={() => {
                      onAssign?.(need.id, null);
                      setOpenNeed(null);
                    }}
                  >
                    {shiftCopy.unassigned}
                  </button>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
      <ul className="tf-people">
        {world.people.map((p) => {
          const person = shiftMission.people.find((x) => x.id === p.actorId);
          return (
            <li key={p.actorId}>
              <strong>
                {person?.name} · {p.status}
              </strong>
              <span>{p.note}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function OperatorMission({
  run,
  onChange,
  onAdvance,
  onFinish,
}: {
  run: OperatorRunState;
  onChange: (next: OperatorRunState) => void;
  onAdvance: (next: OperatorRunState) => void;
  onFinish: (next: OperatorRunState) => void;
}) {
  const reasonId = useId();
  const msgId = useId();
  const handoffId = useId();
  const selfId = useId();
  const teamId = useId();

  useEffect(() => {
    if (run.phase === 'wave_one' || run.phase === 'wave_two' || run.phase === 'finale') haptic('time');
    if (run.phase === 'interruption') haptic('interrupt');
  }, [run.phase]);

  const go = (phase: OperatorPhase, patch: Partial<OperatorRunState> = {}) => {
    onAdvance(applyOperatorPatch(run, { ...patch, phase }));
  };

  const continueNext = (patch: Partial<OperatorRunState> = {}) => {
    const merged = applyOperatorPatch(run, patch);
    go(nextOperatorPhase(merged), merged);
  };

  if (run.phase === 'entry') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{shiftCopy.foundEyebrow}</p>
        <h1 className="tf-display tf-display-sm">{shiftCopy.foundTitle}</h1>
        <p className="tf-key-mark tf-key-mark-sm" aria-hidden>
          01
        </p>
        <div className="tf-actions">
          <button type="button" className="tf-btn tf-btn-primary" onClick={() => continueNext()}>
            {shiftCopy.useKey}
          </button>
        </div>
      </div>
    );
  }

  if (run.phase === 'unlock') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{shiftMission.clocks.open}</p>
        <h1 className="tf-display">{shiftCopy.unlockTitle}</h1>
        <p className="tf-body">{shiftCopy.unlockBody}</p>
        <div className="tf-actions">
          <button type="button" className="tf-btn tf-btn-primary" onClick={() => continueNext()}>
            {shiftCopy.enter}
          </button>
        </div>
      </div>
    );
  }

  if (run.phase === 'opening') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{shiftMission.clocks.open}</p>
        <p className="tf-latin">{shiftMission.place}</p>
        <div className="tf-lines">
          {shiftMission.openingLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="tf-actions">
          <button type="button" className="tf-btn tf-btn-primary" onClick={() => continueNext()}>
            {shiftCopy.continue}
          </button>
        </div>
      </div>
    );
  }

  if (run.phase === 'picture') {
    return (
      <div className="tf-hold">
        <Board run={run} clock="open" />
        <ul className="tf-consequences">
          {shiftMission.facts.map((fact) => (
            <li key={fact.id}>
              <span>{fact.text}</span>
            </li>
          ))}
        </ul>
        <h2 className="tf-display tf-display-sm">{shiftCopy.firstAsk}</h2>
        <Choices
          options={shiftMission.firstPriorities}
          selected={run.firstPriority}
          onPick={(id) => onChange({ ...run, firstPriority: id })}
        />
        <Field
          id={reasonId}
          label={shiftCopy.firstReason}
          value={run.firstReasoning}
          onChange={(firstReasoning) => onChange({ ...run, firstReasoning })}
        />
        <div className="tf-actions">
          <button
            type="button"
            className="tf-btn tf-btn-primary"
            disabled={!run.firstPriority}
            onClick={() => continueNext()}
          >
            {shiftCopy.continue}
          </button>
        </div>
      </div>
    );
  }

  if (run.phase === 'delegation') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{shiftCopy.assignTitle}</p>
        <p className="tf-body">{shiftCopy.assignHint}</p>
        <ul className="tf-people">
          {shiftMission.people
            .filter((p) => !p.isSelf)
            .map((p) => (
              <li key={p.id}>
                <strong>{p.name}</strong>
                <span>{p.facts.join(' ')}</span>
              </li>
            ))}
        </ul>
        <Board
          run={run}
          clock="open"
          assignable
          onAssign={(needId, actorId) => onChange(setAssignment(run, needId, actorId))}
        />
        <div className="tf-actions">
          <button type="button" className="tf-btn tf-btn-primary" onClick={() => continueNext()}>
            {shiftCopy.continue}
          </button>
        </div>
      </div>
    );
  }

  if (run.phase === 'clarification') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">Incoming</p>
        <h1 className="tf-display tf-display-sm">{shiftMission.clarificationPrompt}</h1>
        <Choices
          options={shiftMission.clarificationChoices}
          selected={run.clarification}
          onPick={(id) => onChange({ ...run, clarification: id })}
        />
        <div className="tf-actions">
          <button
            type="button"
            className="tf-btn tf-btn-primary"
            disabled={!run.clarification}
            onClick={() => continueNext()}
          >
            {shiftCopy.continue}
          </button>
        </div>
      </div>
    );
  }

  if (run.phase === 'communication') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">Message</p>
        <h1 className="tf-display tf-display-sm">{shiftMission.communicationPrompt}</h1>
        <Field
          id={msgId}
          label="One to three sentences."
          value={run.organizerMessage}
          onChange={(organizerMessage) => onChange({ ...run, organizerMessage })}
        />
        <div className="tf-actions">
          <button
            type="button"
            className="tf-btn tf-btn-primary"
            disabled={run.organizerMessage.trim().length < 8}
            onClick={() => continueNext()}
          >
            {shiftCopy.send}
          </button>
        </div>
      </div>
    );
  }

  if (run.phase === 'wave_one' || run.phase === 'wave_two') {
    const clock = run.phase === 'wave_one' ? 'waveOne' : 'waveTwo';
    const world = deriveWorld(run, shiftMission, clock);
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{world.clock}</p>
        <h1 className="tf-display tf-display-sm">{shiftCopy.waveKicker}</h1>
        <Board run={run} clock={clock} />
        <ul className="tf-consequences">
          {world.outcomes.map((o) => (
            <li key={o.id}>
              <span>{o.text}</span>
            </li>
          ))}
        </ul>
        <div className="tf-actions">
          <button type="button" className="tf-btn tf-btn-primary" onClick={() => continueNext()}>
            {shiftCopy.continue}
          </button>
        </div>
      </div>
    );
  }

  if (run.phase === 'interruption') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">Now</p>
        <h1 className="tf-display tf-display-sm">{shiftMission.interruptionPrompt}</h1>
        <Choices
          options={shiftMission.interruptionChoices}
          selected={run.interruption}
          onPick={(id) => onChange({ ...run, interruption: id })}
        />
        <div className="tf-actions">
          <button
            type="button"
            className="tf-btn tf-btn-primary"
            disabled={!run.interruption}
            onClick={() => continueNext()}
          >
            {shiftCopy.continue}
          </button>
        </div>
      </div>
    );
  }

  if (run.phase === 'people_first') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">A person</p>
        <h1 className="tf-display tf-display-sm">{shiftMission.peopleFirstPrompt}</h1>
        <Choices
          options={shiftMission.peopleFirstChoices}
          selected={run.peopleFirst}
          onPick={(id) => onChange({ ...run, peopleFirst: id })}
        />
        <div className="tf-actions">
          <button
            type="button"
            className="tf-btn tf-btn-primary"
            disabled={!run.peopleFirst}
            onClick={() => continueNext()}
          >
            {shiftCopy.continue}
          </button>
        </div>
      </div>
    );
  }

  if (run.phase === 'unknown') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">Unknown</p>
        <h1 className="tf-display tf-display-sm">{shiftMission.unknownPrompt}</h1>
        <Choices
          options={shiftMission.unknownChoices}
          selected={run.unknown}
          onPick={(id) => onChange({ ...run, unknown: id, usedAi: id === 'ai' || run.usedAi })}
        />
        <div className="tf-actions">
          <button
            type="button"
            className="tf-btn tf-btn-primary"
            disabled={!run.unknown}
            onClick={() => continueNext()}
          >
            {shiftCopy.continue}
          </button>
        </div>
      </div>
    );
  }

  if (run.phase === 'ai_result') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{shiftCopy.aiKicker}</p>
        <p className="tf-echo">{shiftMission.aiReply}</p>
        <p className="tf-body">{shiftCopy.aiLead}</p>
        <div className="tf-actions">
          <button type="button" className="tf-btn tf-btn-primary" onClick={() => continueNext()}>
            {shiftCopy.continue}
          </button>
        </div>
      </div>
    );
  }

  if (run.phase === 'unknown_act') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">Decide</p>
        <h1 className="tf-display tf-display-sm">What do you do with that?</h1>
        <Choices
          options={shiftMission.unknownActChoices}
          selected={run.unknownAct}
          onPick={(id) => onChange({ ...run, unknownAct: id })}
        />
        <div className="tf-actions">
          <button
            type="button"
            className="tf-btn tf-btn-primary"
            disabled={!run.unknownAct}
            onClick={() => continueNext()}
          >
            {shiftCopy.continue}
          </button>
        </div>
      </div>
    );
  }

  if (run.phase === 'prioritize') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{shiftMission.clocks.waveTwo}</p>
        <h1 className="tf-display tf-display-sm">{shiftMission.criticalPrompt}</h1>
        <Choices
          options={shiftMission.criticalChoices}
          selected={run.critical}
          multi
          onPick={(id) => {
            const has = run.critical.includes(id);
            const next = has
              ? run.critical.filter((x) => x !== id)
              : run.critical.length >= shiftMission.criticalLimit
                ? run.critical
                : [...run.critical, id];
            onChange({ ...run, critical: next });
          }}
        />
        <p className="tf-body">
          {run.critical.length} of {shiftMission.criticalLimit}.
        </p>
        <div className="tf-actions">
          <button
            type="button"
            className="tf-btn tf-btn-primary"
            disabled={run.critical.length === 0}
            onClick={() => continueNext()}
          >
            {shiftCopy.continue}
          </button>
        </div>
      </div>
    );
  }

  if (run.phase === 'handoff') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">Leaving</p>
        <h1 className="tf-display tf-display-sm">{shiftMission.handoffPrompt}</h1>
        <Field
          id={handoffId}
          label="What they need to know."
          value={run.handoffNote}
          onChange={(handoffNote) => onChange({ ...run, handoffNote })}
        />
        <div className="tf-actions">
          <button
            type="button"
            className="tf-btn tf-btn-primary"
            disabled={run.handoffNote.trim().length < 8}
            onClick={() => continueNext()}
          >
            {shiftCopy.continue}
          </button>
        </div>
      </div>
    );
  }

  if (run.phase === 'finale') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{shiftMission.clocks.finale}</p>
        <h1 className="tf-display">{shiftCopy.finaleLead}</h1>
        <ul className="tf-consequences">
          {finaleFacts(run).map((text) => (
            <li key={text}>
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <div className="tf-actions">
          <button type="button" className="tf-btn tf-btn-primary" onClick={() => continueNext()}>
            {shiftCopy.continue}
          </button>
        </div>
      </div>
    );
  }

  if (run.phase === 'reflect_self') {
    return (
      <div className="tf-hold">
        <p className="tf-kicker">{shiftCopy.twoMinutes}</p>
        <h1 className="tf-display tf-display-sm">{shiftMission.reflectSelfPrompt}</h1>
        <Field
          id={selfId}
          label="A sentence is enough."
          value={run.reflectSelf}
          onChange={(reflectSelf) => onChange({ ...run, reflectSelf })}
        />
        <div className="tf-actions">
          <button
            type="button"
            className="tf-btn tf-btn-primary"
            disabled={run.reflectSelf.trim().length < 4}
            onClick={() => continueNext()}
          >
            {shiftCopy.continue}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tf-hold">
      <p className="tf-kicker">{shiftCopy.twoMinutes}</p>
      <h1 className="tf-display tf-display-sm">{shiftMission.reflectTeamPrompt}</h1>
      <Field
        id={teamId}
        label="Name the work that was not yours alone."
        value={run.reflectTeam}
        onChange={(reflectTeam) => onChange({ ...run, reflectTeam })}
      />
      <div className="tf-actions">
        <button
          type="button"
          className="tf-btn tf-btn-primary"
          disabled={run.reflectTeam.trim().length < 4}
          onClick={() => onFinish(applyOperatorPatch(run, { phase: 'reflect_team', persistAt: 'complete' }))}
        >
          {shiftCopy.continue}
        </button>
      </div>
    </div>
  );
}

export function KeyTwoScreen({ onContinue }: { onContinue: () => void }) {
  useEffect(() => {
    haptic('key');
  }, []);
  return (
    <div className="tf-hold tf-key">
      <p className="tf-kicker">{shiftCopy.keyEyebrow}</p>
      <p className="tf-key-mark" aria-hidden>
        02
      </p>
      <h1 className="tf-display">{shiftCopy.keyTitle}</h1>
      <p className="tf-latin">{shiftCopy.keyRule}</p>
      <p className="tf-body">{shiftCopy.keyBody}</p>
      <p className="tf-body">{shiftCopy.keyHint}</p>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onContinue}>
          {shiftCopy.continue}
        </button>
      </div>
    </div>
  );
}

export function Layer3HookScreen({ onHold }: { onHold: () => void }) {
  return (
    <div className="tf-hold">
      <p className="tf-kicker">Later</p>
      <div className="tf-lines">
        {shiftCopy.hookLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <p className="tf-latin">{shiftCopy.notYet}</p>
      <div className="tf-actions">
        <button type="button" className="tf-btn tf-btn-primary" onClick={onHold}>
          {shiftCopy.continueWhenReady}
        </button>
      </div>
    </div>
  );
}
