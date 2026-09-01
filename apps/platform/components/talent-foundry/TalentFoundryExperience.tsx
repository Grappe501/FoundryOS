'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { kellyCampaign, kellyCopy, kellyDoors } from '../../lib/talent-foundry/campaigns/kelly';
import { doorScenarios } from '../../lib/talent-foundry/campaigns/scenarios/doors';
import { volunteerConsequences, volunteersScenario, VOLUNTEERS_SCENARIO_ID } from '../../lib/talent-foundry/campaigns/scenarios/volunteers';
import { advanceSession, completeOptionalDoor, createSession, excerptText, patchSession } from '../../lib/talent-foundry/journey';
import { LAYER1_PEOPLE, LAYER2_PEOPLE, LAYER3_PEOPLE } from '../../lib/talent-foundry/people-memory';
import {
  FIRST_VISIT_DOOR,
  INTENT_TO_PAID,
  afterHandoff,
  afterResume,
  chapterFor,
  finishVisitOne,
  intentSummary,
  resumeCopy,
  wantsPaid,
  youreInCopy,
} from '../../lib/talent-foundry/visit';
import {
  afterLayer3,
  applyLeaderPatch,
  canEnterLayer3,
  createLeaderRun,
  layer3Evidence,
  markLayer3DevSession,
  readLayer3DevIntent,
  seedLayer3DevSession,
} from '../../lib/talent-foundry/leader';
import {
  afterKeyTwo,
  afterLayer3Hook,
  applyOperatorPatch,
  canEnterLayer2,
  createOperatorRun,
  isTalentFoundryDev,
  layer2Evidence,
  layer2PublicSurface,
  layer3HookRendersOn,
  markLayer2DevSession,
  readLayer2DevIntent,
  seedLayer2DevSession,
} from '../../lib/talent-foundry/operator';
import { pickMission, suggestPathway } from '../../lib/talent-foundry/routing';
import { createRun } from '../../lib/talent-foundry/scenario-engine';
import { tfHaptic } from '../../lib/talent-foundry/haptic';
import { loadSession, resetSession, saveSession } from '../../lib/talent-foundry/session';
import type { LeaderRunState } from '../../lib/talent-foundry/leader/types';
import type { OperatorRunState } from '../../lib/talent-foundry/operator/types';
import type {
  CommitmentChoice,
  ConversionState,
  IdentityRecord,
  OptionalDoor,
  ScenarioRunState,
  TalentFoundrySession,
  VisitIntent,
  WillingnessChoice,
} from '../../lib/talent-foundry/types';
import { KellyVideoStage } from './KellyVideoStage';
import { ShareQrTakeover } from './ShareQrTakeover';
import { ScenarioRunner } from './ScenarioRunner';
import { OpeningScreens } from './screens/OpeningScreens';
import {
  CommitmentScreen,
  ConsequencesScreen,
  KeyOneScreen,
  LeadChallengeScreen,
  RevisionScreen,
  ScenarioBriefScreen,
} from './screens/SpineScreens';
import {
  AvailabilityScreen,
  HandoffScreen,
  IdentifyFormScreen,
  MissionScreen,
  YoureInScreen,
} from './screens/ConversionScreens';
import {
  ChapterMark,
  ExploreRouteScreen,
  IntentScreen,
  Layer3OfferScreen,
  OneDoorScreen,
  PaidBriefScreen,
  ResumeBanner,
  Layer2OfferScreen,
  StillInScreen,
  VisitCompleteScreen,
  VolunteerRouteScreen,
} from './screens/VisitScreens';
import { KeyOneShareScreen } from './screens/KeyOneShareScreen';
import { PeopleDrawer } from './PeopleDrawer';
import { SaveMyPlace } from './SaveMyPlace';
import { LeaderMission } from './leader/LeaderMission';
import { KeyTwoScreen, Layer3HookScreen, OperatorMission, PeopleRuleCloseScreen } from './operator/OperatorMission';

const FLOW_STATES = new Set([
  'scenario_volunteers',
  'scenario_consequences',
  'optional_doors',
  'door_room',
  'door_call',
  'door_breakdown',
  'door_ask',
  'intent',
  'paid_brief',
  'identify',
  'opportunity',
  'availability',
  'pathway',
  'mission_one',
  'handoff',
  'still_in',
  'visit_complete',
  'key_one_share',
  'layer2_offer',
  'layer2_operator',
  'key_two',
  'layer3_offer',
  'layer3_leader',
]);

const emptyIdentity = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  zip: '',
  startWhen: '',
};

const BRIEF_ID = 'scenario-brief';

function ensureRun(session: TalentFoundrySession, scenarioId: string): ScenarioRunState {
  return session.runs[scenarioId] ?? createRun(scenarioId);
}

export function TalentFoundryExperience() {
  const [session, setSession] = useState<TalentFoundrySession>(() => createSession(kellyCampaign));
  const [hydrated, setHydrated] = useState(false);
  const [changeText, setChangeText] = useState('');
  const [commitmentGrace, setCommitmentGrace] = useState(false);
  const [revisionAnswer, setRevisionAnswer] = useState<'yes' | 'no' | null>(null);
  const [revisionText, setRevisionText] = useState('');
  const [idForm, setIdForm] = useState(emptyIdentity);
  const [idErrors, setIdErrors] = useState<Record<string, string>>({});
  const [idSubmitting, setIdSubmitting] = useState(false);
  const [idRetry, setIdRetry] = useState<string | null>(null);
  const [continueSaving, setContinueSaving] = useState(false);
  const [continueRetry, setContinueRetry] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const closeShare = useCallback(() => setShareOpen(false), []);

  useEffect(() => {
    if (isTalentFoundryDev() && readLayer3DevIntent()) {
      markLayer3DevSession();
      setSession(seedLayer3DevSession(kellyCampaign));
      setHydrated(true);
      return;
    }
    if (isTalentFoundryDev() && readLayer2DevIntent()) {
      markLayer2DevSession();
      setSession(seedLayer2DevSession(kellyCampaign));
      setHydrated(true);
      return;
    }
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
    if (loaded.identity) {
      setIdForm({
        firstName: loaded.identity.firstName,
        lastName: loaded.identity.lastName,
        phone: loaded.identity.phone,
        email: loaded.identity.email,
        zip: loaded.identity.zip,
        startWhen: loaded.identity.startWhen,
      });
    }
    const justRestored =
      typeof window !== 'undefined' && window.sessionStorage.getItem('tf.kelly.resumeJustRestored') === '1';
    if (justRestored) {
      window.sessionStorage.removeItem('tf.kelly.resumeJustRestored');
      setResumeOpen(false);
    } else {
      setResumeOpen(Boolean(loaded.flags.identified && loaded.stateId !== 'entry'));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveSession(kellyCampaign, session);
  }, [hydrated, session]);

  useEffect(() => {
    if (session?.stateId !== 'key_one') return;
    tfHaptic('key');
  }, [session?.stateId]);

  const acknowledgment = useMemo(() => excerptText(changeText) || 'Even the pause says something.', [changeText]);

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

  const chooseIntent = (intent: VisitIntent) => {
    go(
      patchSession(session, {
        stateId: wantsPaid(intent) ? 'paid_brief' : 'lead_challenge',
        flags: {
          visitIntent: intent,
          willingToAct: intent !== 'exploring',
          volunteerCommitment: intent === 'exploring' ? 'not_now' : 'yes',
          internPathwayEligible: wantsPaid(intent),
        },
        conversion: { paidInterest: INTENT_TO_PAID[intent] },
        evidence: [
          {
            stateId: 'intent',
            kind: 'choice',
            label: 'What brings you here?',
            value: intent,
            dimensions: ['willingness_to_volunteer', 'leadership_desire'],
          },
        ],
      }),
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
        flags: { requiredScenarioComplete: true, keyOne: true },
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

  const closeVisit = (flags?: Parameters<typeof patchSession>[1]['flags']) => {
    const next = patchSession(session, {
      stateId: finishVisitOne(),
      flags: { firstVisitComplete: true, ...flags },
    });
    go(next);
    persistQuiet(next);
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
        stateId: session.flags.keyOne && !sawKey ? 'key_one' : session.flags.keyOneSharePromptSeen ? 'identify' : 'key_one_share',
      }),
    );
  };

  const finishKey = () => {
    go(
      patchSession(session, {
        stateId: session.flags.keyOneSharePromptSeen ? 'identify' : 'key_one_share',
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

  const submitIdentify = async (consent: boolean) => {
    setIdSubmitting(true);
    setIdRetry(null);
    setIdErrors({});
    try {
      const res = await fetch('/api/talent-foundry/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...idForm, consent, session }),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        fields?: Record<string, string>;
        submissionId?: string;
        userId?: string | null;
        workflowIntakeId?: string;
      };
      if (!res.ok || !json.ok) {
        if (json.fields) setIdErrors(json.fields);
        setIdRetry(
          json.error === 'validation'
            ? null
            : "We couldn't finish that connection yet. Your progress is still here. Try again.",
        );
        return;
      }
      const identity: IdentityRecord = {
        ...idForm,
        submissionId: json.submissionId,
        userId: json.userId ?? undefined,
        workflowIntakeId: json.workflowIntakeId,
      };
      go(
        patchSession(session, {
          stateId: 'youre_in',
          identity,
          flags: { identified: true },
        }),
      );
    } catch {
      setIdRetry("We couldn't finish that connection yet. Your progress is still here. Try again.");
    } finally {
      setIdSubmitting(false);
    }
  };

  const persistQuiet = (next: TalentFoundrySession) => {
    if (!next.identity?.submissionId) return;
    void fetch('/api/talent-foundry/continue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session: next }),
    }).catch(() => {
      /* local progress remains */
    });
  };

  const operatorRun = session.operator ?? createOperatorRun();
  const leaderRun = session.leader ?? createLeaderRun();

  const setLeader = (nextRun: LeaderRunState, extras?: Parameters<typeof patchSession>[1]) => {
    const next = patchSession(session, { leader: nextRun, ...extras });
    go(next);
    return next;
  };

  const setOperator = (nextRun: OperatorRunState, extras?: Parameters<typeof patchSession>[1]) => {
    const next = patchSession(session, { operator: nextRun, ...extras });
    go(next);
    return next;
  };

  const startLayer2 = () => {
    const started = applyOperatorPatch(session.operator ?? createOperatorRun(), { phase: 'unlock', persistAt: 'start' });
    const next = patchSession(session, {
      stateId: 'layer2_operator',
      operator: started,
      evidence: session.evidence.some((e) => e.label === 'Layer 2 started')
        ? undefined
        : layer2Evidence(started, false).filter((e) => e.label === 'Layer 2 started'),
    });
    go(next);
    persistQuiet(next);
  };

  const finishLayer2 = (nextRun: OperatorRunState) => {
    const evidence = layer2Evidence(nextRun, true).filter(
      (item) => !session.evidence.some((e) => e.label === item.label),
    );
    const next = patchSession(session, {
      stateId: 'key_two',
      operator: nextRun,
      flags: { keyTwo: true },
      evidence,
    });
    go(next);
    persistQuiet(next);
  };

  const startLayer3 = () => {
    const started = applyLeaderPatch(session.leader ?? createLeaderRun(), { phase: 'opening', persistAt: 'start' });
    const next = patchSession(session, {
      stateId: 'layer3_leader',
      leader: started,
      evidence: session.evidence.some((e) => e.label === 'Layer 3 started')
        ? undefined
        : layer3Evidence(started, false).filter((e) => e.label === 'Layer 3 started'),
    });
    go(next);
    persistQuiet(next);
  };

  const finishLayer3 = (nextRun: LeaderRunState) => {
    const evidence = layer3Evidence(nextRun, true).filter(
      (item) => !session.evidence.some((e) => e.label === item.label),
    );
    const next = patchSession(session, {
      stateId: afterLayer3(),
      leader: nextRun,
      evidence,
    });
    go(next);
    persistQuiet(next);
  };

  const submitContinue = async () => {
    setContinueSaving(true);
    setContinueRetry(null);
    try {
      const res = await fetch('/api/talent-foundry/continue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session }),
      });
      const json = (await res.json()) as { ok?: boolean };
      if (!res.ok || !json.ok) {
        setContinueRetry("We couldn't finish that connection yet. Your progress is still here. Try again.");
        return;
      }
      go(
        patchSession(session, {
          stateId: 'handoff',
          flags: { missionOneComplete: true },
          evidence: [
            {
              stateId: 'mission_one',
              kind: 'mission',
              label: 'First mission',
              value: session.missionId,
              dimensions: ['follow_through'],
            },
          ],
        }),
      );
    } catch {
      setContinueRetry("We couldn't finish that connection yet. Your progress is still here. Try again.");
    } finally {
      setContinueSaving(false);
    }
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
      <nav className="tf-nav" aria-label="Talent Foundry">
        <button
          type="button"
          className="tf-nav-share"
          aria-haspopup="dialog"
          aria-expanded={shareOpen}
          onClick={() => setShareOpen(true)}
        >
          Share
        </button>
        <button
          type="button"
          className="tf-reset"
          onClick={() => {
            setChangeText('');
            setCommitmentGrace(false);
            setRevisionAnswer(null);
            setRevisionText('');
            setIdForm(emptyIdentity);
            setIdErrors({});
            setIdRetry(null);
            go(resetSession(kellyCampaign));
          }}
        >
          Start over
        </button>
      </nav>
      <ShareQrTakeover open={shareOpen} onClose={closeShare} />
      <div className={stageClass} key={`${session.stateId}-${briefRun.beatIndex}-${volunteerRun.beatIndex}-${operatorRun.phase}-${leaderRun.phase}`}>
        <ChapterMark chapter={chapterFor(session.stateId)} />
        {resumeOpen && resumeCopy(session) ? (
          <ResumeBanner
            title={resumeCopy(session)!.title}
            body={resumeCopy(session)!.body}
            onContinue={() => {
              setResumeOpen(false);
              const nextState = afterResume(session);
              if (nextState !== session.stateId) {
                const next = patchSession(session, { stateId: nextState });
                go(next);
                persistQuiet(next);
              }
            }}
          />
        ) : null}
        {resumeOpen && resumeCopy(session) ? null : (
        <>
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

        {session.stateId === 'intent' ? <IntentScreen onChoose={chooseIntent} /> : null}
        {session.stateId === 'paid_brief' ? <PaidBriefScreen onContinue={continueSpine} /> : null}

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
            people={LAYER1_PEOPLE}
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
          <OneDoorScreen
            onOpen={() => {
              const found = kellyDoors.find((d) => d.id === FIRST_VISIT_DOOR) ?? kellyDoors[0];
              enterDoor(found);
            }}
            onSkip={leaveDoors}
          />
        ) : null}

        {doorDef && doorId ? (
          <ScenarioRunner
            def={doorDef}
            run={ensureRun(session, doorDef.id)}
            people={LAYER1_PEOPLE}
            onChange={(run) => setRun(run)}
            onComplete={(run) => finishDoor(doorId, doorDef.id, run)}
          />
        ) : null}

        {session.stateId === 'key_one' ? <KeyOneScreen onContinue={finishKey} /> : null}

        {session.stateId === 'key_one_share' ? (
          <KeyOneShareScreen
            onShare={() => {
              go(patchSession(session, { flags: { keyOneSharePromptSeen: true } }));
              setShareOpen(true);
            }}
            onKeepGoing={() =>
              go(patchSession(session, { stateId: 'identify', flags: { keyOne: true, keyOneSharePromptSeen: true } }))
            }
          />
        ) : null}

        {session.stateId === 'identify' ? (
          <IdentifyFormScreen
            values={idForm}
            errors={idErrors}
            submitting={idSubmitting}
            retryMessage={idRetry}
            onChange={(field, value) => setIdForm((prev) => ({ ...prev, [field]: value }))}
            onSubmit={(consent) => void submitIdentify(consent)}
          />
        ) : null}

        {session.stateId === 'youre_in' && session.identity ? (
          <YoureInScreen
            firstName={session.identity.firstName}
            title={youreInCopy(session.flags.visitIntent, session.identity.firstName).title}
            body={youreInCopy(session.flags.visitIntent, session.identity.firstName).body}
            onContinue={continueSpine}
          />
        ) : null}

        {session.stateId === 'opportunity' && session.flags.visitIntent === 'exploring' ? (
          <ExploreRouteScreen
            onSeeWays={() => {
              const pathwayId = suggestPathway(session.conversion, session.flags);
              const mission = pickMission(session.conversion.areas, pathwayId);
              go(patchSession(session, { stateId: 'mission_one', pathwayId, missionId: mission.id, conversion: { areas: session.conversion.areas.length ? session.conversion.areas : ['community'] } }));
            }}
            onGoodForNow={() => closeVisit()}
          />
        ) : null}

        {session.stateId === 'opportunity' && session.flags.visitIntent !== 'exploring' ? (
          <VolunteerRouteScreen
            conversion={session.conversion}
            onPatch={(patch) => go(patchSession(session, { conversion: patch }))}
            onContinue={() => {
              const pathwayId = suggestPathway(session.conversion, session.flags);
              const mission = pickMission(session.conversion.areas, pathwayId);
              go(
                patchSession(session, {
                  stateId: wantsPaid(session.flags.visitIntent) ? 'availability' : 'mission_one',
                  pathwayId,
                  missionId: mission.id,
                }),
              );
            }}
          />
        ) : null}

        {session.stateId === 'availability' ? (
          <AvailabilityScreen
            conversion={session.conversion}
            onPatch={(patch: Partial<ConversionState>) => go(patchSession(session, { conversion: patch }))}
            onContinue={() => {
              const pathwayId = suggestPathway(session.conversion, session.flags);
              const mission = pickMission(session.conversion.areas, pathwayId);
              go(patchSession(session, { stateId: 'mission_one', pathwayId, missionId: mission.id }));
            }}
          />
        ) : null}

        {session.stateId === 'mission_one' && session.missionId ? (
          <MissionScreen
            mission={pickMission(session.conversion.areas, suggestPathway(session.conversion, session.flags))}
            saving={continueSaving}
            retryMessage={continueRetry}
            onContinue={() => void submitContinue()}
          />
        ) : null}

        {session.stateId === 'handoff' && session.missionId ? (
          <HandoffScreen
            firstName={session.identity?.firstName}
            interest={intentSummary(session.flags.visitIntent)}
            areas={session.conversion.areas}
            mission={pickMission(session.conversion.areas, suggestPathway(session.conversion, session.flags))}
            keyOneOpen={canEnterLayer2(session) && !session.flags.keyTwo}
            onGoDeeper={() => go(patchSession(session, { stateId: afterHandoff(session) }))}
            onFinish={() => closeVisit()}
          />
        ) : null}

        {session.stateId === 'layer2_offer' ? (
          <Layer2OfferScreen
            onUse={startLayer2}
            onSave={() => closeVisit({ layer2Deferred: true })}
          />
        ) : null}

        {session.stateId === 'still_in' ? (
          <StillInScreen
            firstName={session.identity?.firstName}
            intent={session.flags.visitIntent}
            pathwayId={session.pathwayId}
            mission={session.missionId ? pickMission(session.conversion.areas, suggestPathway(session.conversion, session.flags)) : null}
            onDeeper={
              canEnterLayer2(session) && !session.flags.keyTwo
                ? () => go(patchSession(session, { stateId: 'layer2_offer' }))
                : canEnterLayer3(session)
                  ? () => go(patchSession(session, { stateId: 'layer3_offer' }))
                  : undefined
            }
            deeperLabel={canEnterLayer2(session) && !session.flags.keyTwo ? 'Go deeper' : canEnterLayer3(session) ? 'Keep going' : undefined}
            onFinish={() => closeVisit()}
          />
        ) : null}

        {session.stateId === 'visit_complete' ? (
          <>
            <VisitCompleteScreen hasMission={Boolean(session.missionId)} />
            <SaveMyPlace session={session} />
          </>
        ) : null}

        {session.stateId === 'layer2_operator' && canEnterLayer2(session) ? (
          <>
          <PeopleDrawer people={LAYER2_PEOPLE} />
          <OperatorMission
            run={operatorRun}
            onChange={(nextRun) => setOperator(nextRun)}
            onAdvance={(nextRun) => {
              const next = setOperator(nextRun, { stateId: 'layer2_operator' });
              if (nextRun.persistAt === 'start' || nextRun.persistAt === 'mid') persistQuiet(next);
            }}
            onFinish={finishLayer2}
          />
          <SaveMyPlace session={session} />
          </>
        ) : null}

        {session.stateId === 'layer2_operator' && !canEnterLayer2(session) ? (
          <div className="tf-hold">
            <p className="tf-kicker">Closed</p>
            <h1 className="tf-display tf-display-sm">This door is not open.</h1>
            <p className="tf-body">The shift is for someone who already found the first key.</p>
          </div>
        ) : null}

        {layer2PublicSurface(session.stateId) === 'key_two' ? (
          <KeyTwoScreen
            onContinue={() => {
              if (canEnterLayer3({ ...session, flags: { ...session.flags, keyTwo: true } })) {
                go(patchSession(session, { stateId: 'layer3_offer' }));
              } else go(patchSession(session, { stateId: afterKeyTwo() }));
            }}
          />
        ) : null}

        {session.stateId === 'layer3_offer' ? (
          <Layer3OfferScreen
            onKeep={startLayer3}
            onSave={() => closeVisit({ layer3Deferred: true })}
          />
        ) : null}

        {session.stateId === 'layer3_leader' && canEnterLayer3(session) ? (
          <>
          <PeopleDrawer people={LAYER3_PEOPLE} />
          <LeaderMission
            run={leaderRun}
            onChange={(nextRun) => setLeader(nextRun)}
            onAdvance={(nextRun) => {
              const next = setLeader(nextRun, { stateId: 'layer3_leader' });
              if (nextRun.persistAt === 'start' || nextRun.persistAt === 'mid') persistQuiet(next);
            }}
            onFinish={finishLayer3}
          />
          <SaveMyPlace session={session} />
          </>
        ) : null}

        {session.stateId === 'layer3_leader' && !canEnterLayer3(session) && layer3HookRendersOn(session.stateId, session.flags.layer3Enabled) ? (
          <Layer3HookScreen onHold={() => go(patchSession(session, { stateId: afterLayer3Hook() }))} />
        ) : null}

        {session.stateId === 'layer3_leader' && session.flags.layer3Enabled && !session.flags.keyTwo ? (
          <div className="tf-hold">
            <p className="tf-kicker">Closed</p>
            <h1 className="tf-display tf-display-sm">This door is not open.</h1>
            <p className="tf-body">The people are for someone who already finished the shift.</p>
          </div>
        ) : null}

        {layer2PublicSurface(session.stateId) === 'people_rule_close' ? <PeopleRuleCloseScreen /> : null}

        {(session.stateId === 'youre_in' && !session.identity) ||
        ((session.stateId === 'mission_one' || session.stateId === 'handoff') && !session.missionId) ? (
          <div className="tf-hold">
            <p className="tf-kicker">Hold</p>
            <h1 className="tf-display tf-display-sm">This step needs a clean start.</h1>
            <p className="tf-body">Your progress on this phone got interrupted. Nothing was lost on the campaign side if you already stepped in.</p>
            <div className="tf-actions">
              <button
                type="button"
                className="tf-btn tf-btn-primary"
                onClick={() => {
                  setChangeText('');
                  setIdForm(emptyIdentity);
                  go(resetSession(kellyCampaign));
                }}
              >
                Start over
              </button>
            </div>
          </div>
        ) : null}
        </>
        )}
      </div>
    </>
  );
}
