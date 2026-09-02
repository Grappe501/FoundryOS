'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  advanceWorkshop,
  enterWorkshop,
  linger,
  markNoticeRegion,
  noteTyping,
  revealDoorLine,
  submitMess,
  submitNotice,
} from '../../../lib/talent-foundry/implementations/company/journey';
import { chooseMakeTrack, openMake, submitMake } from '../../../lib/talent-foundry/implementations/company/make/engine';
import {
  composeBuildBody,
  makeEligible,
  makeSurface,
  objectForTrack,
  pulseSided,
  tracksVisibleOn,
  type BenchObject,
} from '../../../lib/talent-foundry/implementations/company/make/surface';
import {
  loadWorkshopDrafts,
  loadWorkshopSession,
  resetWorkshopSession,
  saveWorkshopDrafts,
  saveWorkshopSession,
} from '../../../lib/talent-foundry/implementations/company/persist';
import { workshopDepth } from '../../../lib/talent-foundry/implementations/company/room';
import { fragmentsFromSession } from '../../../lib/talent-foundry/implementations/company/soul/fragments';
import { hasFact } from '../../../lib/talent-foundry/implementations/company/soul/memory';
import { addReceipt, bringBack, comeBack, inquiryOf, inquirySurface, leaveToLook } from '../../../lib/talent-foundry/implementations/company/soul/research';
import { readSoul } from '../../../lib/talent-foundry/implementations/company/soul/engine';
import type { ArtifactTrack } from '../../../lib/talent-foundry/implementations/company/spine/envelope';
import {
  artifactPresence,
  attendedRegionIds,
  draftPresence,
  draftTrace,
  pulsePresence,
} from '../../../lib/talent-foundry/implementations/company/traces';
import type { DoorLineId, WorkshopSession } from '../../../lib/talent-foundry/implementations/company/types';
import { DoorBeat } from './beats/DoorBeat';
import { MakeAttemptVoice, MakeEquipped, MakeNeed } from './beats/MakeBeat';
import { ResearchAway, ResearchBack, ResearchLook, ResearchReceipt } from './beats/ResearchBeat';
import { LingerRest, NamedReveal } from './beats/NamedBeat';
import { MessAftermath, MessChoices } from './beats/MessBeat';
import { NoticeAck, NoticeWrite } from './beats/NoticeBeat';
import { DraftWork } from './objects/DraftWork';
import { LastDraft } from './objects/LastDraft';
import { PulseFirstRun } from './objects/PulseFirstRun';
import { PulseWork } from './objects/PulseWork';
import { FragmentTrail } from './objects/FragmentTrail';
import { TheirWork } from './objects/TheirWork';
import { WorkshopRoom } from './WorkshopRoom';

function messConsequence(session: WorkshopSession): string {
  const item = [...session.evidence].reverse().find((e) => e.type === 'consequence');
  return typeof item?.value === 'string' ? item.value : '';
}

function lastNoticeText(session: WorkshopSession): string {
  const item = [...session.evidence].reverse().find((e) => e.type === 'response' && e.label === 'notice+change');
  const value = item?.value as { notice?: string } | undefined;
  return value?.notice ?? '';
}

function artifactReady(trackId: ArtifactTrack | null, artifact: string, happens: string): boolean {
  if (!trackId) return false;
  if (trackId === 'build') return composeBuildBody(artifact, happens).length > 0;
  return artifact.trim().length > 0;
}

export function WorkshopExperience() {
  const [session, setSession] = useState<WorkshopSession | null>(null);
  const [notice, setNotice] = useState('');
  const [change, setChange] = useState('');
  const [artifact, setArtifact] = useState('');
  const [happens, setHappens] = useState('');
  const [reach, setReach] = useState<BenchObject | ''>('');
  const [finding, setFinding] = useState('');
  const [inquiryChanged, setInquiryChanged] = useState('');
  const [inquiryRejected, setInquiryRejected] = useState('');
  const [inquiryTools, setInquiryTools] = useState('');
  const [receiptTool, setReceiptTool] = useState('');
  const [receiptUsedFor, setReceiptUsedFor] = useState('');
  const [benchPresent, setBenchPresent] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(loadWorkshopSession());
    const drafts = loadWorkshopDrafts();
    setNotice(drafts.notice);
    setChange(drafts.change);
    setArtifact(drafts.artifact);
    setHappens(drafts.happens);
    setReach(drafts.reach);
    setFinding(drafts.finding);
    setInquiryChanged(drafts.inquiryChanged);
    setInquiryRejected(drafts.inquiryRejected);
    setInquiryTools(drafts.inquiryTools);
    setReceiptTool(drafts.receiptTool);
    setReceiptUsedFor(drafts.receiptUsedFor);
    setReady(true);
  }, []);

  useEffect(() => {
    if (session) saveWorkshopSession(session);
  }, [session]);

  useEffect(() => {
    if (ready) {
      saveWorkshopDrafts({
        notice,
        change,
        artifact,
        reach,
        happens,
        finding,
        inquiryChanged,
        inquiryRejected,
        inquiryTools,
        receiptTool,
        receiptUsedFor,
      });
    }
  }, [notice, change, artifact, reach, happens, finding, inquiryChanged, inquiryRejected, inquiryTools, receiptTool, receiptUsedFor, ready]);

  useEffect(() => {
    const opened = session?.clocks.linger?.openedAt;
    if (opened && Date.now() - Date.parse(opened) >= 4200) setBenchPresent(true);
  }, [session?.clocks.linger?.openedAt]);

  const apply = useCallback((fn: (current: WorkshopSession) => WorkshopSession) => {
    setSession((current) => (current ? fn(current) : current));
  }, []);

  const onReveal = useCallback((line: DoorLineId) => {
    apply((current) => revealDoorLine(current, line));
  }, [apply]);

  const onEnter = useCallback(() => {
    apply((current) => enterWorkshop(current));
  }, [apply]);

  const onReachBench = useCallback((object: BenchObject) => {
    setReach(object);
    setSession((current) => {
      if (!current) return current;
      if (makeEligible(current)) {
        const opened = openMake(current);
        return opened.ok ? opened.session : current;
      }
      return current;
    });
  }, []);

  const reset = useCallback(() => {
    setNotice('');
    setChange('');
    setArtifact('');
    setHappens('');
    setReach('');
    setFinding('');
    setInquiryChanged('');
    setInquiryRejected('');
    setInquiryTools('');
    setReceiptTool('');
    setReceiptUsedFor('');
    setBenchPresent(false);
    setSession(resetWorkshopSession());
  }, []);

  if (!session) {
    return <WorkshopRoom depth="void" stateId="boot" voice={<p className="ws-line">YOU FOUND THE WORKSHOP.</p>} />;
  }

  const surface = makeSurface(session);
  const depth = workshopDepth(session);
  const attended = attendedRegionIds(session);
  const trackId = session.envelope.artifactTrack;
  const bench = reach || (trackId ? objectForTrack(trackId) : surface === 'need' ? 'pulse' : '');
  const reachable = (makeEligible(session) || surface === 'need') && benchPresent;
  const workingPulse = surface === 'attempt' && pulseSided(trackId);
  const workingDraft = surface === 'attempt' && trackId && !pulseSided(trackId);
  const pulse =
    workingPulse || (surface === 'need' && bench === 'pulse')
      ? 'focus'
      : pulsePresence(session.stateId);
  const draft =
    workingDraft || (surface === 'need' && bench === 'draft')
      ? 'focus'
      : draftPresence(session.stateId);
  const looking = inquirySurface(session);
  const researched = inquiryOf(session).history.length > 0 || inquiryOf(session).receipts.length > 0;
  const trail = fragmentsFromSession(session);

  let voice = null;
  if (session.stateId === 'door') {
    voice = <DoorBeat session={session} onReveal={onReveal} onEnter={onEnter} />;
  } else if (session.stateId === 'notice') {
    voice = (
      <NoticeWrite
        notice={notice}
        change={change}
        opened={attended.length > 0}
        onNotice={setNotice}
        onChange={setChange}
        onTyping={() => apply((current) => noteTyping(current, 'notice'))}
        onSubmit={() => {
          if (!notice.trim() || !change.trim()) return;
          apply((current) => submitNotice(current, { notice, change }));
        }}
      />
    );
  } else if (session.stateId === 'notice_ack') {
    voice = (
      <NoticeAck
        notice={lastNoticeText(session) || notice}
        onContinue={() => apply((current) => advanceWorkshop(current))}
      />
    );
  } else if (session.stateId === 'mess') {
    voice = <MessChoices onChoose={(id) => apply((current) => submitMess(current, id))} />;
  } else if (session.stateId === 'mess_consequence') {
    voice = (
      <MessAftermath
        consequence={messConsequence(session)}
        soulLine={readSoul(session).voice.line}
        onContinue={() => apply((current) => advanceWorkshop(current))}
      />
    );
  } else if (session.stateId === 'named') {
    voice = <NamedReveal onContinue={() => apply((current) => linger(current))} />;
  } else if (surface === 'need') {
    voice = null;
  } else if (surface === 'attempt' && trackId && looking === 'away') {
    voice = <ResearchAway onBack={() => apply((current) => comeBack(current))} />;
  } else if (surface === 'attempt' && trackId && looking === 'back') {
    voice = (
      <ResearchBack
        finding={finding}
        changed={inquiryChanged}
        rejected={inquiryRejected}
        tools={inquiryTools}
        onFinding={setFinding}
        onChanged={setInquiryChanged}
        onRejected={setInquiryRejected}
        onTools={setInquiryTools}
        onBring={() => {
          if (!finding.trim()) return;
          apply((current) =>
            bringBack(current, {
              finding,
              changed: inquiryChanged,
              rejected: inquiryRejected,
              tools: inquiryTools,
            }),
          );
          setFinding('');
          setInquiryChanged('');
          setInquiryRejected('');
          setInquiryTools('');
        }}
      />
    );
  } else if (surface === 'attempt' && trackId) {
    voice = (
      <>
        <MakeAttemptVoice
          trackId={trackId as ArtifactTrack}
          ready={artifactReady(trackId, artifact, happens)}
          onFinish={() => {
            const body = trackId === 'build' ? composeBuildBody(artifact, happens) : artifact;
            if (!body.trim()) return;
            apply((current) => submitMake(current, { body, finished: true }));
          }}
        />
        <ResearchLook soulLine={readSoul(session).voice.line} onLook={() => apply((current) => leaveToLook(current))} />
        {researched ? (
          <ResearchReceipt
            tool={receiptTool}
            usedFor={receiptUsedFor}
            onTool={setReceiptTool}
            onUsedFor={setReceiptUsedFor}
            onLeave={() => {
              if (!receiptTool.trim() || !receiptUsedFor.trim()) return;
              apply((current) => addReceipt(current, { tool: receiptTool, usedFor: receiptUsedFor }));
              setReceiptTool('');
              setReceiptUsedFor('');
            }}
          />
        ) : null}
      </>
    );
  } else if (surface === 'equipped') {
    voice = <MakeEquipped onReset={reset} soulLine={readSoul(session).voice.line} />;
  } else {
    voice = (
      <LingerRest
        onReset={reset}
        onBenchPresent={() => setBenchPresent(true)}
        soulLine={readSoul(session).voice.line}
      />
    );
  }

  const soul = readSoul(session);
  const pulseNotes =
    surface === 'need' && bench === 'pulse' ? (
      <MakeNeed tracks={tracksVisibleOn('pulse')} onChoose={(id) => apply((current) => chooseMakeTrack(current, id))} />
    ) : undefined;
  const draftNotes =
    surface === 'need' && bench === 'draft' ? (
      <MakeNeed
        tracks={tracksVisibleOn('draft', draftTrace(session))}
        onChoose={(id) => apply((current) => chooseMakeTrack(current, id))}
      />
    ) : undefined;

  return (
    <WorkshopRoom
      depth={depth}
      stateId={session.stateId}
      surface={surface}
      open={surface === 'need' || surface === 'attempt' ? bench : ''}
      soul={soul}
      inquiry={looking}
      history={trail.length > 0}
      traces={
        <>
          {workingPulse && trackId ? (
            <PulseWork
              trackId={trackId as ArtifactTrack}
              label={artifact}
              happens={happens}
              onLabel={setArtifact}
              onHappens={setHappens}
              onTyping={() => apply((current) => noteTyping(current, 'make'))}
            />
          ) : (
            <PulseFirstRun
              presence={surface === 'attempt' ? 'ghost' : pulse}
              attended={attended}
              interactive={session.stateId === 'notice'}
              reachable={reachable && bench !== 'pulse'}
              onReach={() => onReachBench('pulse')}
              onAttend={(regionId, dwellMs) =>
                apply((current) => markNoticeRegion(current, regionId, new Date(), dwellMs))
              }
              notes={pulseNotes}
              remembered={hasFact(soul.facts, 'noticed-delete') ? 'noticed' : undefined}
            />
          )}
          {workingDraft ? (
            <DraftWork
              trace={draftTrace(session)}
              body={artifact}
              onBody={setArtifact}
              onTyping={() => apply((current) => noteTyping(current, 'make'))}
            />
          ) : (
            <LastDraft
              presence={surface === 'attempt' ? 'ghost' : draft}
              trace={draftTrace(session)}
              reachable={reachable && bench !== 'draft'}
              onReach={() => onReachBench('draft')}
              notes={draftNotes}
              remembered={
                hasFact(soul.facts, 'notes-gone')
                  ? 'gone'
                  : hasFact(soul.facts, 'question-stays')
                    ? 'question'
                    : hasFact(soul.facts, 'copy-exists')
                      ? 'copy'
                      : hasFact(soul.facts, 'notes-back')
                        ? 'restored'
                        : undefined
              }
            />
          )}
          <TheirWork presence={artifactPresence(session)} body={session.envelope.artifact?.body ?? artifact} />
          <FragmentTrail fragments={trail} />
        </>
      }
      voice={voice}
    />
  );
}
