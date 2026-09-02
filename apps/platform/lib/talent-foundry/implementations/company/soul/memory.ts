import { messChoiceId } from '../traces';
import type { WorkshopSession } from '../types';
import { inquiryOf, inquirySurface } from './research';

/** A fact the room can truthfully remember. Never a type on a person. */
export type PlaceFact = {
  id: string;
  about: 'pulse' | 'draft' | 'made' | 'room';
  kind: 'attended' | 'named' | 'chose' | 'left' | 'finished' | 'changed' | 'looked' | 'brought';
  /** One restrained line. May be spoken or kept as a mark. */
  line: string;
};

export function placeFacts(session: WorkshopSession): PlaceFact[] {
  const facts: PlaceFact[] = [];
  const attended = session.addressedRegionIds;

  if (attended.includes('primary')) {
    facts.push({
      id: 'noticed-delete',
      about: 'pulse',
      kind: 'attended',
      line: 'You noticed Delete.',
    });
  }
  if (attended.includes('import')) {
    facts.push({
      id: 'noticed-import',
      about: 'pulse',
      kind: 'attended',
      line: 'You found last night.',
    });
  }

  const notice = [...session.evidence].reverse().find((e) => e.type === 'response' && e.label === 'notice+change');
  const noticeValue = notice?.value as { change?: string } | undefined;
  if (noticeValue?.change?.trim()) {
    facts.push({
      id: 'named-change',
      about: 'pulse',
      kind: 'named',
      line: 'You named what you would change.',
    });
  }

  const choice = messChoiceId(session);
  if (choice === 'continue') {
    facts.push({
      id: 'notes-gone',
      about: 'draft',
      kind: 'chose',
      line: 'The notes are gone.',
    });
  }
  if (choice === 'restore') {
    facts.push({
      id: 'notes-back',
      about: 'draft',
      kind: 'chose',
      line: 'The notes came back.',
    });
  }
  if (choice === 'ask') {
    facts.push({
      id: 'question-stays',
      about: 'draft',
      kind: 'chose',
      line: 'A question is still on the bench.',
    });
  }
  if (choice === 'split') {
    facts.push({
      id: 'copy-exists',
      about: 'draft',
      kind: 'chose',
      line: 'A copy exists.',
    });
  }

  const artifact = session.envelope.artifact;
  if (session.envelope.artifactTrack && artifact && !artifact.finished) {
    facts.push({
      id: 'left-unfinished',
      about: 'made',
      kind: 'left',
      line: 'You left this unfinished.',
    });
  }
  if (artifact?.finished && artifact.body.trim()) {
    facts.push({
      id: 'work-stayed',
      about: 'made',
      kind: 'finished',
      line: 'This is still here.',
    });
  }
  if (artifact?.finished && artifact.track === 'build') {
    const thin = artifact.body.trim().split(/\s+/).length < 12;
    if (thin) {
      facts.push({
        id: 'fixed-symptom',
        about: 'pulse',
        kind: 'changed',
        line: 'You fixed the symptom.',
      });
    }
  }

  const inquiry = inquiryOf(session);
  const surface = inquirySurface(session);
  if (surface === 'away') {
    facts.push({
      id: 'went-to-look',
      about: 'room',
      kind: 'looked',
      line: 'The work is still on the bench.',
    });
  }
  if (inquiry.history.length > 0) {
    facts.push({
      id: 'brought-back',
      about: 'made',
      kind: 'brought',
      line: 'You brought something back.',
    });
  }
  if (inquiry.history.some((turn) => turn.rejected.trim()) || inquiry.receipts.some((r) => /reject|wrong|fail/i.test(r.usedFor))) {
    facts.push({
      id: 'rejected-something',
      about: 'made',
      kind: 'changed',
      line: 'You rejected something.',
    });
  }
  if (inquiry.history.some((turn) => turn.changed.trim())) {
    facts.push({
      id: 'changed-because',
      about: 'made',
      kind: 'changed',
      line: 'Something changed because of it.',
    });
  }
  if (inquiry.receipts.length > 0 || inquiry.history.some((turn) => turn.tools.length > 0)) {
    facts.push({
      id: 'used-a-tool',
      about: 'room',
      kind: 'brought',
      line: 'You used a tool.',
    });
  }

  return facts;
}

export function factAbout(facts: PlaceFact[], about: PlaceFact['about']): PlaceFact | undefined {
  return [...facts].reverse().find((f) => f.about === about);
}

export function hasFact(facts: PlaceFact[], id: string): boolean {
  return facts.some((f) => f.id === id);
}
