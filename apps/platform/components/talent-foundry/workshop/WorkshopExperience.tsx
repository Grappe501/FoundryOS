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
import { makeEligible, makeSurface, pulseSided } from '../../../lib/talent-foundry/implementations/company/make/surface';
import {
  loadWorkshopDrafts,
  loadWorkshopSession,
  resetWorkshopSession,
  saveWorkshopDrafts,
  saveWorkshopSession,
} from '../../../lib/talent-foundry/implementations/company/persist';
import { workshopDepth } from '../../../lib/talent-foundry/implementations/company/room';
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
import { MakeAttempt, MakeEquipped, MakeNeed } from './beats/MakeBeat';
import { LingerRest, NamedReveal } from './beats/NamedBeat';
import { MessAftermath, MessChoices } from './beats/MessBeat';
import { NoticeAck, NoticeWrite } from './beats/NoticeBeat';
import { LastDraft } from './objects/LastDraft';
import { PulseFirstRun } from './objects/PulseFirstRun';
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

export function WorkshopExperience() {
  const [session, setSession] = useState<WorkshopSession | null>(null);
  const [notice, setNotice] = useState('');
  const [change, setChange] = useState('');
  const [artifact, setArtifact] = useState('');
  const [benchPresent, setBenchPresent] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(loadWorkshopSession());
    const drafts = loadWorkshopDrafts();
    setNotice(drafts.notice);
    setChange(drafts.change);
    setArtifact(drafts.artifact);
    setReady(true);
  }, []);

  useEffect(() => {
    if (session) saveWorkshopSession(session);
  }, [session]);

  useEffect(() => {
    if (ready) saveWorkshopDrafts({ notice, change, artifact });
  }, [notice, change, artifact, ready]);

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

  const onReachBench = useCallback(() => {
    setSession((current) => {
      if (!current || !makeEligible(current)) return current;
      const opened = openMake(current);
      return opened.ok ? opened.session : current;
    });
  }, []);

  const reset = useCallback(() => {
    setNotice('');
    setChange('');
    setArtifact('');
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
  const reachable = makeEligible(session) && benchPresent;
  const pulse = surface === 'attempt' && pulseSided(trackId) ? 'focus' : pulsePresence(session.stateId);
  const draft = surface === 'attempt' && trackId && !pulseSided(trackId) ? 'focus' : draftPresence(session.stateId);

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
        onContinue={() => apply((current) => advanceWorkshop(current))}
      />
    );
  } else if (session.stateId === 'named') {
    voice = <NamedReveal onContinue={() => apply((current) => linger(current))} />;
  } else if (surface === 'need') {
    voice = (
      <MakeNeed
        onChoose={(id) => apply((current) => chooseMakeTrack(current, id))}
      />
    );
  } else if (surface === 'attempt' && trackId) {
    voice = (
      <MakeAttempt
        trackId={trackId as ArtifactTrack}
        body={artifact}
        onBody={setArtifact}
        onTyping={() => apply((current) => noteTyping(current, 'make'))}
        onFinish={() => {
          if (!artifact.trim()) return;
          apply((current) => submitMake(current, { body: artifact, finished: true }));
        }}
      />
    );
  } else if (surface === 'equipped') {
    voice = <MakeEquipped onReset={reset} />;
  } else {
    voice = <LingerRest onReset={reset} onBenchPresent={() => setBenchPresent(true)} />;
  }

  return (
    <WorkshopRoom
      depth={depth}
      stateId={session.stateId}
      surface={surface}
      traces={
        <>
          <PulseFirstRun
            presence={pulse}
            attended={attended}
            interactive={session.stateId === 'notice'}
            reachable={reachable}
            onReach={onReachBench}
            onAttend={(regionId, dwellMs) =>
              apply((current) => markNoticeRegion(current, regionId, new Date(), dwellMs))
            }
          />
          <LastDraft
            presence={draft}
            trace={draftTrace(session)}
            reachable={reachable}
            onReach={onReachBench}
          />
          <TheirWork presence={artifactPresence(session)} body={session.envelope.artifact?.body ?? artifact} />
        </>
      }
      voice={voice}
    />
  );
}
