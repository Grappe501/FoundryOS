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
import {
  loadWorkshopDrafts,
  loadWorkshopSession,
  resetWorkshopSession,
  saveWorkshopDrafts,
  saveWorkshopSession,
} from '../../../lib/talent-foundry/implementations/company/persist';
import { roomDepth } from '../../../lib/talent-foundry/implementations/company/room';
import {
  attendedRegionIds,
  draftPresence,
  draftTrace,
  pulsePresence,
} from '../../../lib/talent-foundry/implementations/company/traces';
import type { DoorLineId, WorkshopSession } from '../../../lib/talent-foundry/implementations/company/types';
import { DoorBeat } from './beats/DoorBeat';
import { LingerRest, NamedReveal } from './beats/NamedBeat';
import { MessAftermath, MessChoices } from './beats/MessBeat';
import { NoticeAck, NoticeWrite } from './beats/NoticeBeat';
import { LastDraft } from './objects/LastDraft';
import { PulseFirstRun } from './objects/PulseFirstRun';
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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(loadWorkshopSession());
    const drafts = loadWorkshopDrafts();
    setNotice(drafts.notice);
    setChange(drafts.change);
    setReady(true);
  }, []);

  useEffect(() => {
    if (session) saveWorkshopSession(session);
  }, [session]);

  useEffect(() => {
    if (ready) saveWorkshopDrafts({ notice, change });
  }, [notice, change, ready]);

  const apply = useCallback((fn: (current: WorkshopSession) => WorkshopSession) => {
    setSession((current) => (current ? fn(current) : current));
  }, []);

  const onReveal = useCallback((line: DoorLineId) => {
    apply((current) => revealDoorLine(current, line));
  }, [apply]);

  const onEnter = useCallback(() => {
    apply((current) => enterWorkshop(current));
  }, [apply]);

  if (!session) {
    return <WorkshopRoom depth="void" stateId="boot" voice={<p className="ws-line">YOU FOUND THE WORKSHOP.</p>} />;
  }

  const depth = roomDepth(session.stateId);
  const attended = attendedRegionIds(session);

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
  } else {
    voice = (
      <LingerRest
        onReset={() => {
          setNotice('');
          setChange('');
          setSession(resetWorkshopSession());
        }}
      />
    );
  }

  return (
    <WorkshopRoom
      depth={depth}
      stateId={session.stateId}
      traces={
        <>
          <PulseFirstRun
            presence={pulsePresence(session.stateId)}
            attended={attended}
            interactive={session.stateId === 'notice'}
            onAttend={(regionId, dwellMs) =>
              apply((current) => markNoticeRegion(current, regionId, new Date(), dwellMs))
            }
          />
          <LastDraft presence={draftPresence(session.stateId)} trace={draftTrace(session)} />
        </>
      }
      voice={voice}
    />
  );
}
