'use client';

import { useEffect, useMemo, useState } from 'react';
import { kellyCampaign, kellyCopy } from '../../lib/talent-foundry/campaigns/kelly';
import { doorScenarios } from '../../lib/talent-foundry/campaigns/scenarios/doors';
import { volunteerConsequences, volunteersScenario, VOLUNTEERS_SCENARIO_ID } from '../../lib/talent-foundry/campaigns/scenarios/volunteers';
import { advanceSession, completeOptionalDoor, excerptText, patchSession } from '../../lib/talent-foundry/journey';
import { createRun } from '../../lib/talent-foundry/scenario-engine';
import { loadSession, resetSession, saveSession } from '../../lib/talent-foundry/session';
import type {
  CommitmentChoice,
  OptionalDoor,
  ScenarioRunState,
  TalentFoundrySession,
  WillingnessChoice,
} from '../../lib/talent-foundry/types';
import { KellyVideoStage } from './KellyVideoStage';
import { ScenarioRunner } from './ScenarioRunner';
import { OpeningScreens } from './screens/OpeningScreens';
import {
  CommitmentScreen,
  ConsequencesScreen,
  IdentifyThresholdScreen,
  KeyOneScreen,
  LeadChallengeScreen,
  OptionalDoorsScreen,
  RevisionScreen,
  ScenarioBriefScreen,
} from './screens/SpineScreens';

const FLOW_STATES = new Set([
  'scenario_volunteers',
  'scenario_consequences',
  'optional_doors',
  'door_room',
  'door_call',
  'door_breakdown',
  'door_ask',
  'identify',
]);

const BRIEF_ID = 'scenario-brief';

function ensureRun(session: TalentFoundrySession, scenarioId: string): ScenarioRunState {
  return session.runs[scenarioId] ?? createRun(scenarioId);
}

export function TalentFoundryExperience() {
  const [session, setSession] = useState<TalentFoundrySession | null>(null);
  const [changeText, setChangeText] = useState('');
  const [commitmentGrace, setCommitmentGrace] = useState(false);
  const [revisionAnswer, setRevisionAnswer] = useState<'yes' | 'no' | null>(null);
  const [revisionText, setRevisionText] = useState('');

  useEffect(() => {
    const loaded = loadSession(kellyCampaign);
    setSession(loaded);
    const prior = loaded.evidence.find((item) => item.stateId === 'change_prompt' && item.kind === 'text');
    if (typeof prior?.value === 'string') setChangeText(prior.value);
    const revision = loaded.evidence.find((item) => item.stateId === 'scenario_revision');
    if (revision && typeof revision.value === 'object' && revision.value) {
      const v = revision.value as { answer?: 'yes' | 'no'; explanation?: string };
      if (v.answer) setRevisionAnswer(v.answer);
      if (v.explanation) setRevisionText(v.explanation);
    }
  }, []);

  useEffect(() => {
    if (session) saveSession(kellyCampaign, session);
  }, [session]);

  useEffect(() => {
    if (session?.stateId !== 'key_one') return;
    if (typeof navigator === 'undefined' || !navigator.vibrate) return;
    try {
      navigator.vibrate([20, 30, 40]);
    } catch {
      /* ignore */
    }
  }, [session?.stateId]);

  const acknowledgment = useMemo(() => excerptText(changeText) || 'Even the pause says something.', [changeText]);

  if (!session) {
    return <div className="tf-stage" aria-hidden />;
  }

  const go = (next: TalentFoundrySession) => setSession(next);
  const continueSpine = () => go(advanceSession(session, kellyCampaign));

  const submitChange = () => {
    go(
      advanceSession(session, kellyCampaign, [
        {
          stateId: 'change_prompt',
          kind: 'text',
          label: kellyCopy.changePrompt,
          value: changeText.trim(),
          dimensions: ['written_communication', 'passion'],
        },
      ]),
    );
  };

  const chooseWillingness = (choice: WillingnessChoice) => {
    go(
      advanceSession(
        session,
        kellyCampaign,
        [
          {
            stateId: 'willingness',
            kind: 'choice',
            label: kellyCopy.willingnessPrompt,
            value: { id: choice.id, label: choice.label },
            dimensions: ['willingness_to_volunteer', 'availability'],
          },
        ],
        { willingToAct: choice.willingToAct },
      ),
    );
  };

  const chooseCommitment = (choice: CommitmentChoice) => {
    const next = advanceSession(
      session,
      kellyCampaign,
      [
        {
          stateId: 'volunteer_commitment',
          kind: 'choice',
          label: kellyCopy.commitmentTitle,
          value: { id: choice.id, label: choice.label },
          dimensions: ['willingness_to_volunteer', 'leadership_desire'],
        },
      ],
      {
        volunteerCommitment: choice.id,
        internPathwayEligible: choice.id !== 'not_now',
      },
    );
    if (choice.id === 'not_now') {
      setCommitmentGrace(true);
      go(patchSession(session, {
        flags: { volunteerCommitment: choice.id, internPathwayEligible: false },
        evidence: [{
          stateId: 'volunteer_commitment',
          kind: 'choice',
          label: kellyCopy.commitmentTitle,
          value: { id: choice.id, label: choice.label },
          dimensions: ['willingness_to_volunteer', 'leadership_desire'],
        }],
      }));
      return;
    }
    go(next);
  };

  const briefRun = ensureRun(session, BRIEF_ID);
  const volunteerRun = ensureRun(session, VOLUNTEERS_SCENARIO_ID);

  const setRun = (run: ScenarioRunState, stateId = session.stateId) => {
    go(patchSession(session, { stateId, runs: { ...session.runs, [run.scenarioId]: run } }));
  };

  const finishVolunteers = (run: ScenarioRunState) => {
    go(
      patchSession(session, {
        stateId: 'scenario_consequences',
        runs: { ...session.runs, [run.scenarioId]: run },
        evidence: run.decisions.map((d) => ({
          stateId: 'scenario_volunteers' as const,
          kind: 'decision' as const,
          label: d.beatId,
          value: { choiceId: d.choiceId, label: d.choiceLabel, reasoning: d.reasoning, order: d.order },
          dimensions: volunteersScenario.beats.find((b) => b.id === d.beatId)?.dimensions,
        })),
      }),
    );
  };

  const submitRevision = () => {
    if (!revisionAnswer) return;
    go(
      advanceSession(
        session,
        kellyCampaign,
        [
          {
            stateId: 'scenario_revision',
            kind: 'revision',
            label: kellyCopy.revisionQuestion,
            value: { answer: revisionAnswer, explanation: revisionText.trim() },
            dimensions: ['follow_through', 'logic_judgment'],
          },
        ],
        { requiredScenarioComplete: true },
      ),
    );
  };

  const enterDoor = (door: OptionalDoor) => {
    const existing = session.runs[door.scenarioId];
    const restart = !existing || existing.beatIndex >= (doorScenarios[door.scenarioId]?.beats.length ?? 0);
    go(
      patchSession(session, {
        stateId: door.stateId,
        runs: { ...session.runs, [door.scenarioId]: restart ? createRun(door.scenarioId) : existing },
      }),
    );
  };

  const finishDoor = (doorId: OptionalDoor['id'], scenarioId: string, run: ScenarioRunState) => {
    const already = session.flags.optionalDoorsCompleted.includes(doorId);
    const withRun = patchSession(session, {
      runs: { ...session.runs, [scenarioId]: run },
      evidence: already
        ? undefined
        : run.decisions.map((d) => ({
            stateId: session.stateId,
            kind: 'decision' as const,
            label: `${doorId}:${d.beatId}`,
            value: { choiceId: d.choiceId, label: d.choiceLabel, reasoning: d.reasoning, order: d.order },
          })),
    });
    go(completeOptionalDoor(withRun, doorId));
  };

  const leaveDoors = () => {
    const sawKey = session.evidence.some((item) => item.stateId === 'key_one');
    go(
      patchSession(session, {
        stateId: session.flags.keyOne && !sawKey ? 'key_one' : 'identify',
      }),
    );
  };

  const finishKey = () => {
    go(
      patchSession(session, {
        stateId: 'identify',
        flags: { keyOne: true },
        evidence: session.evidence.some((e) => e.stateId === 'key_one')
          ? undefined
          : [
              {
                stateId: 'key_one',
                kind: 'choice',
                label: kellyCopy.keyTitle,
                value: 'acquired',
                dimensions: ['follow_through', 'leadership_desire'],
              },
            ],
      }),
    );
  };

  const doorDef =
    session.stateId === 'door_room'
      ? doorScenarios['door-room']
      : session.stateId === 'door_call'
        ? doorScenarios['door-call']
        : session.stateId === 'door_breakdown'
          ? doorScenarios['door-breakdown']
          : session.stateId === 'door_ask'
            ? doorScenarios['door-ask']
            : null;
  const doorId =
    session.stateId === 'door_room'
      ? 'room'
      : session.stateId === 'door_call'
        ? 'call'
        : session.stateId === 'door_breakdown'
          ? 'breakdown'
          : session.stateId === 'door_ask'
            ? 'ask'
            : null;

  const stageClass = FLOW_STATES.has(session.stateId) ? 'tf-stage tf-stage-flow' : 'tf-stage';

  return (
    <>
      <button
        type="button"
        className="tf-reset"
        onClick={() => {
          setChangeText('');
          setCommitmentGrace(false);
          setRevisionAnswer(null);
          setRevisionText('');
          go(resetSession(kellyCampaign));
        }}
      >
        Start over
      </button>
      <div className={stageClass} key={`${session.stateId}-${briefRun.beatIndex}-${volunteerRun.beatIndex}`}>
        <OpeningScreens
          stateId={session.stateId}
          changeText={changeText}
          acknowledgment={acknowledgment}
          onChangeText={setChangeText}
          onBegin={continueSpine}
          onContinue={continueSpine}
          onSubmitChange={submitChange}
          onWillingness={chooseWillingness}
        />

        {session.stateId === 'kelly_video' ? (
          <KellyVideoStage videoUrl={kellyCampaign.kellyVideoUrl} onContinue={continueSpine} />
        ) : null}

        {session.stateId === 'volunteer_commitment' && !commitmentGrace ? (
          <CommitmentScreen onChoose={chooseCommitment} />
        ) : null}
        {session.stateId === 'volunteer_commitment' && commitmentGrace ? (
          <div className="tf-hold">
            <p className="tf-kicker">{kellyCopy.commitmentEyebrow}</p>
            <p className="tf-body">{kellyCopy.commitmentAfterNo}</p>
            <div className="tf-actions">
              <button type="button" className="tf-btn tf-btn-primary" onClick={continueSpine}>
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {session.stateId === 'lead_challenge' ? <LeadChallengeScreen onContinue={continueSpine} /> : null}

        {session.stateId === 'scenario_brief' ? (
          <ScenarioBriefScreen
            step={briefRun.beatIndex}
            onContinue={() => {
              if (briefRun.beatIndex >= 2) {
                go(
                  patchSession(session, {
                    stateId: 'scenario_volunteers',
                    runs: { ...session.runs, [BRIEF_ID]: { ...briefRun, beatIndex: 3 }, [VOLUNTEERS_SCENARIO_ID]: volunteerRun },
                  }),
                );
              } else {
                setRun({ ...briefRun, beatIndex: briefRun.beatIndex + 1 });
              }
            }}
          />
        ) : null}

        {session.stateId === 'scenario_volunteers' ? (
          <ScenarioRunner
            def={volunteersScenario}
            run={volunteerRun}
            onChange={(run) => setRun(run)}
            onComplete={finishVolunteers}
          />
        ) : null}

        {session.stateId === 'scenario_consequences' ? (
          <ConsequencesScreen cards={volunteerConsequences(volunteerRun.decisions)} onContinue={continueSpine} />
        ) : null}

        {session.stateId === 'scenario_revision' ? (
          <RevisionScreen
            answer={revisionAnswer}
            explanation={revisionText}
            onAnswer={setRevisionAnswer}
            onExplanation={setRevisionText}
            onSubmit={submitRevision}
          />
        ) : null}

        {session.stateId === 'optional_doors' ? (
          <OptionalDoorsScreen
            completed={session.flags.optionalDoorsCompleted}
            onEnter={enterDoor}
            onContinue={leaveDoors}
          />
        ) : null}

        {doorDef && doorId ? (
          <ScenarioRunner
            def={doorDef}
            run={ensureRun(session, doorDef.id)}
            onChange={(run) => setRun(run)}
            onComplete={(run) => finishDoor(doorId, doorDef.id, run)}
          />
        ) : null}

        {session.stateId === 'key_one' ? <KeyOneScreen onContinue={finishKey} /> : null}

        {session.stateId === 'identify' ? <IdentifyThresholdScreen /> : null}
      </div>
    </>
  );
}
